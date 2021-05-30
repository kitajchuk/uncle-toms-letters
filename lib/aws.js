const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  region: process.env.UTL_AWS_REGION,
  accessKeyId: process.env.UTL_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.UTL_AWS_SECRET_ACCESS_KEY,
});

['posts', 'public'].forEach((prefix) => {
  const listParams = {
    Bucket: process.env.UTL_S3_REPOSITORY,
    Prefix: prefix,
  };

  s3.listObjects(listParams).promise().then((data) => {
    data.Contents.forEach((listObj) => {
      const file = path.join(process.cwd(), listObj.Key);
      let dir = listObj.Key.split('/');

      dir.pop();
      dir = dir.join('/');

      mkdirp(dir).then(() => {
        const getParams = {
          Bucket: process.env.UTL_S3_REPOSITORY,
          Key: listObj.Key,
        };

        s3.getObject(getParams).promise().then((getObj) => {
          fs.writeFile(file, getObj.Body, (error) => {
            if (!error) {
              console.log(`Wrote file ${listObj.Key}`);
            }
          });
        });
      });
    });
  });
});