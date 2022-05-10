const fs = require('fs');
const path = require('path');
const dataDir = path.join(process.cwd(), 'data');
const postsDir = path.join(process.cwd(), 'posts');
const postsPub = path.join(process.cwd(), 'public', 'assets');

const makeMarkdown = (file) => {
  fs.writeFileSync(file, `---
attachments:
  - filename
pages:
  - title: Page 1
    document: filename
    english:
      - paragraphs
    german:
      - paragraphs
---
  `);
};

const readDirectory = (dir) => {
  return fs.readdirSync(dir).filter((file) => {
    return !/^\./.test(file);
  });
};

const moveRetouched = (postId) => {
  const postId2 = postId.replace(/_/g, '-');
  const dir = path.join(dataDir, postId, '_Retouched');
  const dir2 = path.join(postsPub, postId2);
  const file = path.join(postsDir, `${postId2}.md`);
  const images = readDirectory(dir);

  if (images.length) {
    if (!fs.existsSync(dir2)) {
      fs.mkdirSync(dir2);
      console.log(`Creating public post dir: ${dir2}`);
    }

    if (!fs.existsSync(file)) {
      makeMarkdown(file);
      console.log(`Creating post markdown file: ${file}`);
    }

    images.forEach((image) => {
      fs.copyFileSync(
        path.join(dir, image),
        path.join(dir2, image)
      );
      console.log(`Copying retouched image: ${path.join(dir2, image)}`);
    });
  }
};

readDirectory(dataDir).forEach((postId) => {
  // Do stuff here...
  moveRetouched(postId);
});