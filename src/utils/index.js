const validator = require('validator');
const AWS = require('aws-sdk');
const { v1: uuidv1 } = require('uuid');
const config = require('../config');

AWS.config.update({ region: 'us-west-1' });

const s3 = new AWS.S3();
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const sns = new AWS.SNS();

// 是否是符合条件的数据
const isCorrectDataType = (record) => record && Array.isArray(record) && record.length === 3
  && validator.isLatLong(`${record[0]},${record[1]}`) && record[2].length > 0;

// 是否是符合条件的文件，（取前三条和最后一条数据判断是否是符合条件的数据)
const isCorrectDataFile = (records) => {
  let result = false;
  if (records && Array.isArray(records)) {
    const selectrecords = records.slice(0, 3);
    if (records.length > 3) selectrecords.push(records[records.length - 1]);

    result = selectrecords.every((v) => isCorrectDataType(v));
  }
  return result;
};

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
  isCorrectDataType,
  isCorrectDataFile,
  readCsvFile,
  saveData,
  sendErrorMsg,
};
