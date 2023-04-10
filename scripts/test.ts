const fs = require("fs");
const path = require("path");

const textract = require("@nosferatu500/textract");

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

const appPosts = readDirectory(postsDir);
const sourcePosts = readDirectory(dataDir).map((file: string) => slug(file));
const diffPosts = sourcePosts.filter(
  (file: string) => !appPosts.includes(file)
);

// console.log(appPosts);
// console.log(diffPosts);

const mappedData = {};

diffPosts.forEach((folder: string) => {
  const directory = readFolder(path.join(dataDir, unslug(folder)));
  const dataMapper = {
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
      console.log("Could not map file", folder, file);
    }
  });

  // console.log(folder, dataMapper);

  mappedData[folder] = dataMapper;
});

console.log(mappedData);

for (const id in mappedData) {
  mappedData[id].letters.forEach((file: string) => {
    textract.fromFileWithPath(
      path.join(dataDir, unslug(id), file),
      (error, text) => {
        if (error) {
          console.error(error);
        } else {
          console.log(text.match(/Letter\s\d{0,3}/g));
          console.log("");
          console.log("");
        }
      }
    );
  });
}
