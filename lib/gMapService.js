const aws = require('aws-sdk');
const randomString = require('./randomStringGenerator');

require('dotenv').config();

const dynamodb = new aws.DynamoDB({
  region: 'us-west-2',
});

function put(ri, path) {
  const params = {
    Item: {
      ri: {
        S: ri,
      },
      path: {
        S: path,
      },
    },
    TableName: process.env.G_MAP_TABLE,
  };
  return dynamodb.putItem(params).promise();
}

function query(ri) {
  const params = {
    ExpressionAttributeValues: {
      ':v1': {
        S: ri,
      },
    },
    ExpressionAttributeNames: {
      '#p': 'path',
    },
    KeyConditionExpression: 'ri = :v1',
    ProjectionExpression: '#p',
    TableName: process.env.G_MAP_TABLE,
  };
  return dynamodb.query(params).promise();
}

function save(path) {
  const ri = randomString.base64(6);
  return query(ri)
    .then(({ Items }) => {
      if (Items.length === 0) {
        return put(ri, path);
      }
      return save(path);
    })
    .then(() => ri);
}

module.exports = {
  put,
  query,
  save,
};
