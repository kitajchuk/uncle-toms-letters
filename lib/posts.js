const fs = require("fs");
const path = require("path");
const postsDir = path.join(process.cwd(), "posts");

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDir);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.json$/, ''),
      },
    };
  });
}

export function getAllPosts() {
  const fileNames = fs.readdirSync(postsDir);

  return fileNames.map((fileName) => {
    const id = fileName.replace(/\.json$/, '');
    const fileData = getPostData(id);

    return {
      id,
      ...fileData,
    };
  });
}

export function getPostData(id) {
  const fullPath = path.join(postsDir, `${id}.json`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const fileData = JSON.parse(String(fileContents));

  // Combine the data with the id
  return {
    id,
    ...fileData,
  };
}
