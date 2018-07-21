const aws = require('aws-sdk');

require('dotenv').config();

const s3 = new aws.S3({
  region: 'us-west-2',
});

function get(path) {
  const params = {
    Bucket: process.env.G_BUCKET,
    Key: path,
  };
  return s3.getObject(params).promise();
}

function put(Key, file) {
  const params = {
    Bucket: process.env.G_BUCKET,
    Key,
    Body: file.buffer,
    ContentType: file.mimetype,
  };
  return s3.putObject(params).promise();
}

module.exports = {
  get,
  put,
};
