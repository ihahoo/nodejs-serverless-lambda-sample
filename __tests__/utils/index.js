const utils = require('../../src/utils');
const config = require('../../src/config');

describe('utils', () => {
  describe('readCsvFile()', () => {
    test('从s3读取csv文件', async () => {
      const data = await utils.readCsvFile(config.bucket, 'test.csv');
      expect(data).toBeTruthy();
    });
  });

  describe('saveData()', () => {
    test('保存数据到dynamoDb', async () => {
      const item = {
        id: '73b36908-17a7-48a5-8302-a6497d3d6e53',
        address: 'test',
        latitude: -43.58299805,
        longitude: 146.89373497
      };
      await expect(utils.saveData(item)).resolves.toBeUndefined();
    });
  });

  describe('sendErrorMsg()', () => {
    test('发送错误消息到SNS', async () => {
      await expect(utils.sendErrorMsg({ aa: 'bb' })).resolves.toBeUndefined();
    });
  });
});
