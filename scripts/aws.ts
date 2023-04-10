const fs = require("fs");
const path = require("path");

const AWS = require("aws-sdk");
const mkdirp = require("mkdirp");

const s3 = new AWS.S3({
  region: process.env.UTL_AWS_REGION,
  accessKeyId: process.env.UTL_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.UTL_AWS_SECRET_ACCESS_KEY,
});

["posts", "public"].forEach((Prefix) => {
  s3.listObjects({
    Prefix,
    Bucket: process.env.UTL_S3_REPOSITORY,
  })
    .promise()
    .then(({ Contents }) => {
      Contents.forEach(({ Key }) => {
        const dir = Key.split("/");
        const file = path.join(process.cwd(), Key);

        dir.pop();

        const dirp = dir.join("/");

        mkdirp(dirp).then(() => {
          if (!fs.existsSync(file)) {
            s3.getObject({
              Key,
              Bucket: process.env.UTL_S3_REPOSITORY,
            })
              .promise()
              .then(({ Body }) => {
                fs.writeFile(file, Body.toString(), (error) => {
                  if (!error) {
                    console.log(`Wrote file ${Key}`);
                  }
                });
              });
          } else {
            console.log(`File already downloaded ${Key}`);
          }
        });
      });
    });
});
