const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const imageSize = require('image-size');
const postsDir = path.join(process.cwd(), 'posts');

function readDirectory(dir) {
  return fs.readdirSync(dir).filter((file) => !/^\./.test(file));
}

function getAssetData(id, img) {
  const imgPath = path.join(process.cwd(), `public/assets/${id}/${img}`);
  const imgSrc = `/assets/${id}/${img}`;
  const imgDims = imageSize(imgPath);
  const imgOrientation = imgDims.height > imgDims.width ? 'portrait' : 'landscape';

  // { src, dims { width, height, type } }
  return {
    orientation: imgOrientation,
    aspect: imgDims.height / imgDims.width * 100,
    dims: imgDims,
    src: imgSrc,
    alt: img,
  };
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
  const documents = fileData.pages.reduce((acc, record) => {
    if (record.documents) return acc + record.documents.length;
    return acc + 1;
  }, 0) + (fileData.attachments ? fileData.attachments.length : 0);
  const newData = {
    ...fileData,
  };

  newData.pages = newData.pages.map((p) => {
    const page = {
      ...p,
    };

    if (page.documents) {
      page.documents = page.documents.map((img) => {
        return getAssetData(id, img);
      });
    }

    if (page.document) {
      page.document = getAssetData(id, page.document);
    }

    return page;
  });

  if (newData.attachments) {
    newData.attachments = newData.attachments.map((img) => {
      return getAssetData(id, img);
    });
  }

  // Combine the data with the id
  return {
    id,
    documents,
    translations,
    ...newData,
  };
}
