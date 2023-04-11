import type { RawData } from "../src/types";

import fs from "fs";
import path from "path";

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
          console.error(error);
          reject(error);
        } else {
          resolve(text);
        }
      }
    );
  });
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
        if (/^Letter.*?\.(docx|txt)$/.test(file)) {
          dataMapper.letters.push(file);
        } else if (/^Letter.*?\.(jpg|jpeg)$/.test(file)) {
          dataMapper.documents.push(file);
        } else if (/\.(jpg|jpeg)$/.test(file)) {
          dataMapper.attachments.push(file);
        } else {
          console.log("Could not map file", id, file);
        }
      });

      if (dataMapper.letters.length) {
        await Promise.all(
          dataMapper.letters.map(async (file: string) => {
            const text = await textExtraction(id, file);
            const titles = text.match(/Letter\s\d{0,3}/g);

            titles.forEach((title) => {
              dataMapper.pages.push({
                title,
                // TODO: parse the translations from text content
                //       which will require using match indexes and
                //       length of text content until next match etc...
                german: [],
                english: [],
                // Matches the page text to it's corresponding scanned
                // document via file naming convention. This produces
                // something like the following:
                // Given "Letter 142" as the title we can match it to
                // the image with fileName "Letter_142_19381012_L_P5.jpeg"
                document: dataMapper.documents.find((doc) =>
                  doc.startsWith(title.replace(/\s/, "_"))
                ),
              });
            });
          })
        );
      }

      mappedData[id] = dataMapper;
    })
  );

  console.log(mappedData);
})();
