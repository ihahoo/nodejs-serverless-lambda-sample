// const util = require('util');
const parseDataAndSave = require('./parseDataAndSave');
const apiGatewayPostData = require('./apiGatewayPostData');

// s3 event
exports.handler = async (event) => {
  // console.log('Reading options from event:\n', util.inspect(event, { depth: 5 }));

  if (event && event.Records && event.Records.length > 0 && event.Records[0] && event.Records[0].eventSource === 'aws:s3'
    && event.Records[0].s3 && event.Records[0].s3.bucket && event.Records[0].s3.object) {
    await parseDataAndSave(event.Records[0].s3.bucket.name, event.Records[0].s3.object.key);
  }
};

// API Gateway
exports.api = async (event) => {
  if (event && event.content) {
    await apiGatewayPostData(event.content);
  }

  return { msg: 'sucess' };
};
