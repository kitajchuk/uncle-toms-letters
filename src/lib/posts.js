const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const postsDir = path.join(process.cwd(), 'posts');

function readDirectory(dir) {
  return fs.readdirSync(dir).filter((file) => !/^\./.test(file));
}

export function getAllPostIds() {
  const fileNames = readDirectory(postsDir);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export function getAllPosts() {
  const fileNames = readDirectory(postsDir);

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
  let documents = 0;

  fileData.pages.forEach((doc) => {
    if (doc.documents) {
      documents += doc.documents.length;
    } else {
      documents += 1;
    }
  });

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