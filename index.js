const awsSlsExpress = require('aws-serverless-express');

const app = require('./app');

const mimeTypes = [
  'application/javascript',
  'application/json',
  'application/octet-stream',
  'application/xml',
  'font/eot',
  'font/opentype',
  'font/otf',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'text/comma-separated-values',
  'text/css',
  'text/html',
  'text/javascript',
  'text/plain',
  'text/text',
  'text/xml',
];

const server = awsSlsExpress.createServer(app, null, mimeTypes);

exports.handler = (event, context) => awsSlsExpress.proxy(server, event, context);
