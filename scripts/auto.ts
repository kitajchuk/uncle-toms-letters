import type { RawData, RawLang, RawEntity } from "../src/types";

import fs from "fs";
import cld from "cld";
import path from "path";
import YAML from "yamljs";
import textract from "@nosferatu500/textract";
import {
  log,
  slug,
  unslug,
  dataDir,
  postsDir,
  emptyLogs,
  dryRunDir,
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

const langDetection = async (
  text: string,
  chunks: string[]
): Promise<RawLang> => {
  const result = await cld.detect(text);
  const rawLang = {
    german: [],
    english: [],
  };
  const deChunks = result.chunks.find((chunk) => chunk.code === "de");
  const enChunks = result.chunks.find((chunk) => chunk.code === "en");

  if (!deChunks || !enChunks) {
    return rawLang;
  }

  let cursor = 0;

  chunks.forEach((chunk) => {
    const nextCursor = cursor + chunk.length;

    if (cursor >= deChunks.offset && nextCursor <= deChunks.bytes) {
      rawLang.german.push(chunk);
    } else {
      rawLang.english.push(chunk);
    }

    cursor += chunk.length;
  });

  return rawLang;
};

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
      splitChunks: [], // Will be calculated later
    });
  }

  await Promise.all(
    entities.map(async (entity: RawEntity, i: number) => {
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
      entity.splitChunks = entity.chunk
        .split(/\n/)
        .filter((line) => line.length > 0);
    })
  );

  if (duplicates.length > 0) {
    log(`Duplicate entities found for letters \"${duplicates.join(", ")}\"`);
    // throw new Error(
    //   `Duplicate entities found for letters \"${duplicates.join(", ")}\"`
    // );
  }

  return entities;
};

const convertImages = (file: string) =>
  file.replace(/\.(png|jpg|jpeg)$/, ".webp");

(async () => {
  const mappedData: Record<string, RawData> = {};
  const appPosts = readDirectory(postsDir);
  const sourcePosts = readDirectory(dataDir).map((file: string) => slug(file));
  const diffPosts = sourcePosts.filter(
    (file: string) => !appPosts.includes(file)
  );

  emptyLogs();

  await Promise.all(
    diffPosts.map(async (id: string) => {
      const directory = readFolder(path.join(dataDir, unslug(id)));
      const dataMapper: RawData = {
        id,
        pages: [],
        recent: true,
        letters: [],
        documents: [],
        attachments: [],
      };

      directory.forEach((file: string) => {
        if (/^Letter.*?\.(doc|docx|txt)$/.test(file)) {
          dataMapper.letters.push(file);
        } else if (/^Letter.*?\.(jpg|jpeg)$/.test(file)) {
          dataMapper.documents.push(convertImages(file));
        } else if (/\.(jpg|jpeg)$/.test(file)) {
          dataMapper.attachments.push(convertImages(file));
        } else {
          console.log("Could not map file", id, file);
        }
      });

      // Combine multiple letters into one text extraction
      const text = await combineLetters(id, dataMapper.letters);
      const entities = await parseEntities(text);

      // console.log(entities);

      await Promise.all(
        entities.map(async (entity, idx) => {
          try {
            const langResult = await langDetection(
              entity.chunk,
              entity.splitChunks
            );

            // console.log(langResult);

            if (
              langResult.german.length === 0 ||
              langResult.english.length === 0
            ) {
              // throw new Error(`No chunks detected for \"${entity.title}\"`);
              log(
                `No chunks detected for title: \"${entity.title}\", id: \"${id}\"`
              );
            }

            // Use map index to ensure the page is added in the correct
            // order as we parse the entities.
            dataMapper.pages[idx] = {
              title: entity.title,
              german: langResult.german,
              english: langResult.english,
              // Matches the page text to it's corresponding scanned
              // document via file naming convention. This produces
              // something like the following:
              // Given "Letter 142" as the title we can match it to
              // the image with fileName "Letter_142_19381012_L_P5.jpeg"
              document: dataMapper.documents.find((doc) =>
                doc.startsWith(entity.title.replace(/\s/, "_"))
              ),
            };
          } catch (error) {
            console.error(error);
            log(`Error processing \"${entity.title}\": ${error.message}`);
          }
        })
      );

      mappedData[id] = dataMapper;

      // console.log(dataMapper);
    })
  );

  console.log(mappedData);

  for (const [id, data] of Object.entries(mappedData)) {
    const { letters, ...rest } = data;
    const yaml = YAML.stringify(rest, 10, 2);
    fs.writeFileSync(path.join(dryRunDir, `${id}.yml`), yaml);
  }
})();
