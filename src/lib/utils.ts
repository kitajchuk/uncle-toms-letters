import fs from "fs";
import path from "path";
import { parseISO, format } from "date-fns";

export const dataDir = path.join(process.cwd(), "data");
export const postsDir = path.join(process.cwd(), "posts");

export const dotFormat = /^\./;
export const postFormat = /^\d\d\d\d(-|_)\d\d(-|_)\d\d$/;

export const slug = (file: string) => file.replace(/_/g, "-");

export const unslug = (file: string) => file.replace(/-/g, "_");

export const readFolder = (dir: string) =>
  fs.readdirSync(dir).filter((file: string) => !dotFormat.test(file));

export const readDirectory = (dir: string) =>
  readFolder(dir)
    .map((file: string) => file.replace(/\.yml$/, ""))
    .filter((file: string) => postFormat.test(file));

export const formatDate = (dateString: string) =>
  format(parseISO(dateString), "LLLL d, yyyy");
