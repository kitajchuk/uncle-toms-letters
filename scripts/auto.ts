// Automate the post process...

import type { RawData, RawEntity } from "../src/types";
import type { DetectLanguage } from "cld";

import fs from "fs";
import path from "path";

import cld from "cld";
import textract from "@nosferatu500/textract";

const dataDir = path.join(process.cwd(), "data");
const postsDir = path.join(process.cwd(), "posts");

const dotFormat = /^\./;
const postFormat = /^\d\d\d\d(-|_)\d\d(-|_)\d\d$/;

const slug = (file: string) => file.replace(/_/g, "-");

const unslug = (file: string) => file.replace(/-/g, "_");

const readFolder = (dir: string) =>
  fs.readdirSync(dir).filter((file: string) => !dotFormat.test(file));

const readDirectory = (dir: string) =>
  readFolder(dir)
    .map((file: string) => file.replace(/\.yml$/, ""))
    .filter((file: string) => postFormat.test(file));

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

const parseEntities = async (
  id: string,
  file: string,
  text: string
): Promise<RawEntity[]> => {
  const regex = /Letter\s\d{0,3}/g;
  const entities: RawEntity[] = [];

  let execArray: RegExpExecArray | null;

  while ((execArray = regex.exec(text)) !== null) {
    entities.push({
      title: execArray[0],
      offset: execArray.index,
      length: regex.lastIndex,
    });
  }

  entities.forEach((entity: RawEntity, i: number) => {
    const nextEntity = entities[i + 1];
    const nextOffset =
      nextEntity !== undefined ? nextEntity.offset : text.length;

    entity.length = nextOffset - entity.offset;
  });

  return entities;
};

const appPosts = readDirectory(postsDir);
const sourcePosts = readDirectory(dataDir).map((file: string) => slug(file));
const diffPosts = sourcePosts.filter(
  (file: string) => !appPosts.includes(file)
);

// console.log(appPosts);
// console.log(diffPosts);

(async () => {
  const mappedData = {};

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

      // console.log(folder, directory);

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

      await Promise.all(
        dataMapper.letters.map(async (file: string) => {
          // Text extraction could result in error...
          try {
            const text = await textExtraction(id, file);
            const entities = await parseEntities(id, file, text);

            await Promise.all(
              entities.map(async (entity) => {
                const textChunk = text.substring(
                  entity.offset,
                  entity.offset + entity.length
                );

                try {
                  const langResult = await langDetection(textChunk);

                  console.log(entity.title, langResult);

                  // TODO: Why is this not working?
                  if (entity.title === "Letter 154") {
                    console.log(textChunk);
                  }

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
                } catch (error) {
                  console.error(error);
                }
              })
            );
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
