import type {
  Asset,
  Post,
  Page,
  BasePost,
  RawPost,
  RawPage,
  StaticParams,
} from "@/types";

import fs from "fs";
import path from "path";
import YAML from "yamljs";
import imageSize from "image-size";
import { readFolder, postsDir, formatDate } from "@/lib/utils";

function getPostFiles() {
  const fileNames = readFolder(postsDir);
  return fileNames.filter((file) => /\.yml$/.test(file));
}

function getAssetData(id: string, img: string): Asset {
  const imgPath = path.join(process.cwd(), `public/assets/${id}/${img}`);
  const imgSrc = `/assets/${id}/${img}`;

  if (!fs.existsSync(imgPath)) {
    return {
      alt: img,
      src: "https://placehold.co/600x400",
      dims: { width: 600, height: 400 },
      aspect: (400 / 600) * 100,
      orientation: "landscape",
    };
  }

  const imgDims = imageSize(imgPath);
  const imgOrientation =
    imgDims.height > imgDims.width ? "portrait" : "landscape";

  return {
    alt: img,
    src: imgSrc,
    dims: imgDims,
    aspect: (imgDims.height / imgDims.width) * 100,
    orientation: imgOrientation,
  };
}

export function getAllPostIds(): StaticParams[] {
  const fileNames = getPostFiles();

  return fileNames.map((fileName) => {
    return {
      id: fileName.replace(/\.yml$/, ""),
    };
  });
}

export async function getAllPosts(): Promise<BasePost[]> {
  const fileNames = getPostFiles();

  return await Promise.all(
    fileNames.map(async (fileName) => {
      const id = fileName.replace(/\.yml$/, "");
      const fileData = await getPostData(id);
      const { recent, documents, translations } = fileData;

      // Only return what is necessary to render the timeline...
      return {
        id,
        date: formatDate(id),
        recent: recent || false,
        documents,
        translations,
      };
    })
  );
}

export async function getPostData(id: string): Promise<Post> {
  const fullPath = path.join(postsDir, `${id}.yml`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const fileData = YAML.parse(fileContents) as RawPost;

  // Generate translations aggregate count
  const translations = fileData.pages.length;

  // Generate documents aggregate count
  const documents =
    fileData.pages.reduce((acc: number, record: RawPage) => {
      if (record.documents) return acc + record.documents.length;
      return acc + 1;
    }, 0) + (fileData.attachments ? fileData.attachments.length : 0);

  // Fresh post data object to be populated
  const post: Post = {
    id,
    date: formatDate(id),
    pages: [],
    recent: fileData.recent || false,
    documents,
    attachments: [],
    translations,
  };

  // Populate post data object with pages
  post.pages = fileData.pages.map((p) => {
    const page: Page = {
      title: p.title,
      german: p.german,
      english: p.english,
    };

    if (p.documents) {
      page.documents = p.documents.map((img) => {
        return getAssetData(id, img);
      });
    }

    if (p.document) {
      page.document = getAssetData(id, p.document);
    }

    return page;
  });

  // Populate post data object with attachments
  if (fileData.attachments) {
    post.attachments = fileData.attachments.map((img) => {
      return getAssetData(id, img);
    });
  }

  return post;
}
