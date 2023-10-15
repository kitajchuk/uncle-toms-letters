import type { RawData, RawEntity } from "../src/types";
import type { DetectLanguage } from "cld";

import path from "path";
import cld from "cld";
import textract from "@nosferatu500/textract";
import {
  log,
  slug,
  unslug,
  dataDir,
  // getFlag,
  // getFlags,
  postsDir,
  readFolder,
  readDirectory,
} from "../src/lib/utils";

const textExtraction = async (
  folder: string,
  file: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    textract.fromFileWithPath(
      path.join(dataDir, unslug(folder), file),
      {
        preserveLineBreaks: true,
      },
      (error: Error, text: string) => {
        if (error) {
          reject(error);
        } else {
          resolve(text);
        }
      }
    );
  });
};

const langDetection = async (text: string): Promise<DetectLanguage> =>
  cld.detect(text);

const combineLetters = async (id: string, letters: string[]) => {
  const texts = await Promise.all(
    letters.map(async (file: string) => await textExtraction(id, file))
  );

  const text = texts.join("\n");

  return text.replace(/\n+/g, "\n");
};

const parseEntities = async (text: string): Promise<RawEntity[]> => {
  const regex = /Letter\s\d{0,3}/g;
  const entities: RawEntity[] = [];
  const duplicates: string[] = [];

  let execArray: RegExpExecArray | null;

  while ((execArray = regex.exec(text)) !== null) {
    entities.push({
      title: execArray[0],
      offset: execArray.index,
      length: 0, // Will be calculated later
      chunk: "", // Will be calculated later
    });
  }

  entities.forEach((entity: RawEntity, i: number) => {
    const nextEntity = entities[i + 1];
    const nextOffset =
      nextEntity !== undefined ? nextEntity.offset : text.length;

    if (nextEntity && nextEntity.title === entity.title) {
      // One of two things is happening here:
      // 1. The next entity was mislabeled with the same title
      //    e.g. labeled "Letter 165" but should be "Letter 166"
      // 2. The next entity is a part of the current entity
      //    e.g. "Letter 149" german and "Letter 149" english
      // There is nothiing we can do about this so we just need to
      // capture and throw an error so we can fix it manually.
      duplicates.push(entity.title);
    }

    // Include the title in the length
    entity.length = nextOffset - entity.offset;

    // Exlude the title from the chunk
    const chunkStart = entity.offset + entity.title.length;
    const chunkEnd = chunkStart + (entity.length - entity.title.length);

    entity.chunk = text.substring(chunkStart, chunkEnd);
  });

  if (duplicates.length > 0) {
    log(`Duplicate entities found for letters \"${duplicates.join(", ")}\"`);
    throw new Error(
      `Duplicate entities found for letters \"${duplicates.join(", ")}\"`
    );
  }

  return entities;
};

(async () => {
  const mappedData = {};
  const appPosts = readDirectory(postsDir);
  const sourcePosts = readDirectory(dataDir).map((file: string) => slug(file));
  const diffPosts = sourcePosts.filter(
    (file: string) => !appPosts.includes(file)
  );

  await Promise.all(
    diffPosts.map(async (id: string) => {
      const directory = readFolder(path.join(dataDir, unslug(id)));
      const dataMapper: RawData = {
        id,
        id_: unslug(id),
        pages: [],
        letters: [],
        documents: [],
        attachments: [],
      };

      directory.forEach((file: string) => {
        if (/^Letter.*?\.(doc|docx|txt)$/.test(file)) {
          dataMapper.letters.push(file);
        } else if (/^Letter.*?\.(jpg|jpeg)$/.test(file)) {
          dataMapper.documents.push(file);
        } else if (/\.(jpg|jpeg)$/.test(file)) {
          dataMapper.attachments.push(file);
        } else {
          console.log("Could not map file", id, file);
        }
      });

      // Combine multiple letters into one text extraction
      const text = await combineLetters(id, dataMapper.letters);
      const entities = await parseEntities(text);

      await Promise.all(
        entities.map(async (entity) => {
          try {
            const langResult = await langDetection(entity.chunk);

            if (langResult.chunks.length === 0) {
              // throw new Error(`No chunks detected for \"${entity.title}\"`);
              // TODO: Handle this case manually...
            } else {
              console.log(entity.title, langResult);

              dataMapper.pages.push({
                title: entity.title,
                german: [],
                english: [],
                // Matches the page text to it's corresponding scanned
                // document via file naming convention. This produces
                // something like the following:
                // Given "Letter 142" as the title we can match it to
                // the image with fileName "Letter_142_19381012_L_P5.jpeg"
                document: dataMapper.documents.find((doc) =>
                  doc.startsWith(entity.title.replace(/\s/, "_"))
                ),
              });
            }
          } catch (error) {
            console.error(error);
          }
        })
      );

      mappedData[id] = dataMapper;
    })
  );

  // console.log(mappedData);
})();
