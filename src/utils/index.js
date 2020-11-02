const AWS = require('aws-sdk');
const { v1: uuidv1 } = require('uuid');
const config = require('../config');

AWS.config.update({ region: 'us-west-1' });

const s3 = new AWS.S3();
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const sns = new AWS.SNS();

// 从s3读取csv文件
const readCsvFile = async (bucket, key) => {
  try {
    const csvFile = await s3.getObject({ Bucket: bucket, Key: key }).promise();
    if (csvFile && csvFile.ContentType === 'text/csv') {
      return csvFile.Body;
    }
  } catch (e) {
    console.log(e);
  }

  return undefined;
};

// 保存数据到dynamoDb
/* eslint-disable no-param-reassign */
const saveData = async (item) => {
  if (item && !item.id) item.id = uuidv1();
  const params = {
    TableName: config.addressTableName,
    Item: item
  };

  try {
    await dynamoDb.put(params).promise();
  } catch (e) {
    console.log(e);
  }
};

// 发送错误消息到AWS SNS
const sendErrorMsg = async (msg) => {
  const params = {
    Message: JSON.stringify(msg),
    TopicArn: config.snsTopicArn
  };

  try {
    await sns.publish(params).promise();
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  readCsvFile,
  saveData,
  sendErrorMsg,
};
