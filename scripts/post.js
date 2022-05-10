// Example usage:
// node ./scripts/post.js 1938-05-05

const fs = require('fs');
const path = require('path');
const dataDir = path.join(process.cwd(), 'data');
const postsDir = path.join(process.cwd(), 'posts');
const assetsDir = path.join(process.cwd(), 'public', 'assets');

// The date for post ID (e.g. 1938-05-05)
let postID = process.argv.slice(2);

if (postID.length) {
  postID = postID[0];

  const postKey = postID.replace(/-/g, '_');
  const postFile = path.join(postsDir, `${postID}.md`);
  const assetsFolder = path.join(assetsDir, postID);
  const dataAssets = path.join(dataDir, postKey, '_Retouched');

  fs.writeFileSync(postFile, '---');

  console.log(`Created file: ${postFile}`);

  fs.mkdirSync(assetsFolder);

  console.log(`Created folder: ${assetsFolder}`);

  fs.readdirSync(dataAssets).forEach((fileName) => {
    const filePath = path.join(dataAssets, fileName);
    const cpFilePath = path.join(assetsFolder, fileName);

    fs.copyFileSync(filePath, cpFilePath);

    console.log(`Copied asset ${filePath} to ${cpFilePath}`);
  });
}