const aws = require('aws-sdk');
const randomString = require('./randomStringGenerator');

require('dotenv').config();

const TableName = process.env.G_MAP_TABLE;

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
    TableName,
  };
  return dynamodb.putItem(params).promise();
}

function get(ri) {
  const params = {
    Key: {
      ri: {
        S: ri,
      },
    },
    TableName,
  };
  return dynamodb.getItem(params).promise();
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
    TableName,
  };
  return dynamodb.query(params).promise();
}

function save(path) {
  const ri = randomString.base64(6);
  return get(ri)
    .then((data) => {
      if (data.Item === undefined) {
        return put(ri, path);
      }
      return save(path);
    })
    .then(() => ri);
}

module.exports = {
  put,
  get,
  query,
  save,
};
