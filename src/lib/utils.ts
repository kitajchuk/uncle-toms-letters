import fs from "fs";
import path from "path";
import shell from "shelljs";
import { parseISO, format } from "date-fns";

export const distDir = path.join(process.cwd(), "dist");
export const dataDir = path.join(process.cwd(), "data");
export const postsDir = path.join(process.cwd(), "posts");
export const dryRunDir = path.join(process.cwd(), "dry-run");
export const logFile = path.join(process.cwd(), "scripts.log");

export const dotFormat = /^\./;
export const postFormat = /^\d\d\d\d(-|_)\d\d(-|_)\d\d$/;
export const retouchedFormat = /_Retouched/;
export const imageFormat = /\.(jpg|jpeg)$/;
export const docFormat = /\.(doc|docx|txt)$/;

export const slug = (file: string) => file.replace(/_/g, "-");

export const unslug = (file: string) => file.replace(/-/g, "_");

export const readFolder = (dir: string) =>
  fs
    .readdirSync(dir)
    .filter(
      (file: string) => !dotFormat.test(file) && !retouchedFormat.test(file)
    );

export const readDirectory = (dir: string) =>
  readFolder(dir)
    .map((file: string) => file.replace(/\.yml$/, ""))
    .filter((file: string) => postFormat.test(file));

export const emptyDir = (dir: string) => shell.rm("-rf", `${dir}/*`);

export const formatDate = (dateString: string) =>
  format(parseISO(dateString), "LLLL d, yyyy");

const flags = process.argv.slice(2);

export const getFlag = (flag: string) => flags.includes(flag);

export const getFlags = () => flags;

export const emptyLogs = () => fs.writeFileSync(logFile, "");

export const log = (message: string) => {
  const date = new Date();
  const timestamp = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  const log = `${timestamp}: ${message}

`;
  fs.appendFileSync(logFile, log);
};
