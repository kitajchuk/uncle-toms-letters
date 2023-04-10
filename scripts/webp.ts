const fs = require("fs");
const path = require("path");

const sharp = require("sharp");
const shell = require("shelljs");
const mkdirp = require("mkdirp");

// Source images in local `data` directory -- ignored
const shellCmd = "find ./data -type f";
const shellOpts = { silent: true };

// The width for the `webp` versions
const imgSize = 1440;

// Viable local source image formats
const rImage = /\.(png|jpg|jpeg)$/;
const rRetouched = /_Retouched\/(.*?)\.(png|jpg|jpeg)$/;

// Shell out to `find` for quick recurse
const files = shell
  .exec(shellCmd, shellOpts)
  .stdout.split("\n")
  .filter((f: string) => rRetouched.test(f));

// Process each file for Next's public directory
files.forEach(async (file: string) => {
  // Get post ID to build directories
  const postID = file.replace(/\.\/data\/(.*?)\/.*?$/, (m, p1) =>
    p1.replace(/_/g, "-")
  );
  const assetDir = path.join(process.cwd(), "public", "assets", postID);
  const fileName = file.split("/").pop();
  const fileWebp = fileName.replace(rImage, ".webp");
  const outFile = path.join(assetDir, fileWebp);

  if (!fs.existsSync(assetDir)) {
    await mkdirp(assetDir);
    console.log(`Making asset directory: ${assetDir}`);
  }

  if (!fs.existsSync(outFile)) {
    await sharp(file).resize(imgSize).toFile(outFile);
    console.log(`Making asset file: ${outFile}`);
  }
});
