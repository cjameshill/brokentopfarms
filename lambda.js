'use strict';

const awsServerlessExpress = require('aws-serverless-express');
const app = require('./server/index.js');

const binaryMimeTypes = [
    'application/javascript',
    'application/json',
    'application/octet-stream',
    'image/jpeg',
    'image/png',
    'text/css',
    'text/html',
    'text/javascript'
];

const server = awsServerlessExpress.createServer(app, null, binaryMimeTypes);

exports.handler = (event, context, callback) => {
    if (event.source === 'serverless-plugin-warmup') {

        console.log('WarmUP - Lambda is warm!');

        return callback(null, 'Lambda is warm!');

    }

    awsServerlessExpress.proxy(server, event, context);
};