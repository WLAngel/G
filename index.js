const awsSlsExpress = require('aws-serverless-express');

const app = require('./app');

const server = awsSlsExpress.createServer(app);

exports.handler = (event, context) => awsSlsExpress.proxy(server, event, context);
