const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const imageSize = require("image-size");

// Imaginary API function
// https://imaginary.dev/docs/installing-with-next-js
const { titleForPost } = require("../../pages/api/title-for-post");

const postsDir = path.join(process.cwd(), "posts");

function readDirectory(dir) {
  return fs.readdirSync(dir).filter((file) => !/^\./.test(file));
}

function getPostFiles() {
  const fileNames = readDirectory(postsDir);
  return fileNames.filter((file) => /\.md$/.test(file));
}

function getAssetData(id, img) {
  const imgPath = path.join(process.cwd(), `public/assets/${id}/${img}`);
  const imgSrc = `/assets/${id}/${img}`;
  const imgDims = imageSize(imgPath);
  const imgOrientation =
    imgDims.height > imgDims.width ? "portrait" : "landscape";

  // { src, dims { width, height, type } }
  return {
    orientation: imgOrientation,
    aspect: (imgDims.height / imgDims.width) * 100,
    dims: imgDims,
    src: imgSrc,
    alt: img,
  };
}

export function getAllPostIds() {
  const fileNames = getPostFiles();

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getAllPosts() {
  const fileNames = getPostFiles();

  return await Promise.all(
    fileNames.map(async (fileName) => {
      const id = fileName.replace(/\.md$/, "");
      const fileData = await getPostData(id);
      const { documents, translations } = fileData;

      // Only return what is necessary to render the timeline...
      return {
        id,
        recent: fileData.recent || null,
        documents,
        translations,
      };
    })
  );
}

export async function getPostData(id) {
  const fullPath = path.join(postsDir, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const fileData = matter(fileContents).data;
  const translations = fileData.pages.length;

  // Generate documents aggregate count
  const documents =
    fileData.pages.reduce((acc, record) => {
      if (record.documents) return acc + record.documents.length;
      return acc + 1;
    }, 0) + (fileData.attachments ? fileData.attachments.length : 0);

  // New data to map asset data onto
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

  // Imaginary-dev implementation
  let titles = [];

  if (process.env.OPENAI_API_KEY !== undefined) {
    const postTitlesFile = path.join(postsDir, `${id}-titles.json`);

    if (!fs.existsSync(postTitlesFile)) {
      try {
        const postText = newData.pages
          .flatMap((page) => page.english.join(" "))
          .join(" ");
        const postTitles = await titleForPost(postText);

        fs.writeFileSync(postTitlesFile, JSON.stringify(postTitles, null, 2));
        console.log(`Created file: ${postTitlesFile}`);
      } catch (error) {
        // console.debug(error);
      }
    } else {
      try {
        titles = JSON.parse(fs.readFileSync(postTitlesFile));
      } catch (error) {
        // console.debug(error);
      }
    }
  }

  // Combine the data with the id
  return {
    id,
    titles,
    documents,
    translations,
    ...newData,
  };
}
