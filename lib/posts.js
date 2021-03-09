const fs = require("fs");
const path = require("path");
const matter = require('gray-matter');
const postsDir = path.join(process.cwd(), "posts");

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDir);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export function getAllPosts() {
  const fileNames = fs.readdirSync(postsDir);

  return fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fileData = getPostData(id);

    return {
      id,
      ...fileData,
    };
  });
}

export function getPostData(id) {
  const fullPath = path.join(postsDir, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const fileData = matter(fileContents).data;
  const translations = fileData.pages.length;
  let documents = fileData.pages.length;

  if (fileData.attachments) {
    documents += fileData.attachments.length;
  }

  // Combine the data with the id
  return {
    id,
    documents,
    translations,
    ...fileData,
  };
}
