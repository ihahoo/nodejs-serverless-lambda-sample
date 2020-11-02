const config = {
  bucket: 'hahoo',
  addressTableName: 'address', // 保存地址用的dynamoDb数据库表名称
  snsTopicArn: 'arn:aws:sns:us-west-1:267749912849:Error' // sns主题的ARN
};

module.exports = config;
