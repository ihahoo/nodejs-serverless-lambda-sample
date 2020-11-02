const utils = require('../../src/utils');
const config = require('../../src/config');

describe('utils', () => {
  describe('isCorrectDataType()', () => {
    test('符合条件的数据格式', () => {
      const result = utils.isCorrectDataType(['-43.58299805', '146.89373497', '840 COCKLE CREEK RD, RECHERCHE TAS 7109']);
      expect(result).toBe(true);
    });

    test('不符合条件的数据格式', () => {
      // 纬度不合法
      let result = utils.isCorrectDataType(['-243.58299805', '146.89373497', '840 COCKLE CREEK RD, RECHERCHE TAS 7109']);
      expect(result).toBe(false);

      // 经度不合法
      result = utils.isCorrectDataType(['-43.58299805', '246.89373497', '840 COCKLE CREEK RD, RECHERCHE TAS 7109']);
      expect(result).toBe(false);

      // 纬度不合法
      result = utils.isCorrectDataType(['abc', '146.89373497', '840 COCKLE CREEK RD, RECHERCHE TAS 7109']);
      expect(result).toBe(false);

      // 经度不合法
      result = utils.isCorrectDataType(['-43.58299805', 'bde', '840 COCKLE CREEK RD, RECHERCHE TAS 7109']);
      expect(result).toBe(false);

      // 地址为空
      result = utils.isCorrectDataType(['-43.58299805', '146.89373497', '']);
      expect(result).toBe(false);

      // 数据不是三列
      result = utils.isCorrectDataType(['-43.58299805', '146.89373497', '840 COCKLE CREEK RD, RECHERCHE TAS 7109', '234']);
      expect(result).toBe(false);
    });
  });

  describe('isCorrectDataFile()', () => {
    test('符合条件的数据文件', () => {
      const data = [
        ['-43.58299805', '146.89373497', '840 COCKLE CREEK RD, RECHERCHE TAS 7109'],
        ['-43.58259635', '146.89402117', '833 COCKLE CREEK RD, RECHERCHE TAS 7109'],
        ['-43.58169878', '146.89824631', '870 COCKLE CREEK RD, RECHERCHE TAS 7109'],
        ['-43.58095637', '146.88651178', '810 COCKLE CREEK RD, RECHERCHE TAS 7109'],
        ['-43.58079479', '146.88701991', '812 COCKLE CREEK RD, RECHERCHE TAS 7109']
      ];
      const result = utils.isCorrectDataFile(data);
      expect(result).toBe(true);
    });

    test('不符合条件的数据文件', () => {
      const data = [
        ['-43.58299805', '146.89373497', '840 COCKLE CREEK RD, RECHERCHE TAS 7109'],
        ['abc', '146.89373497', '840 COCKLE CREEK RD, RECHERCHE TAS 7109', '1234'],
        ['-43.58169878', '146.89824631', '870 COCKLE CREEK RD, RECHERCHE TAS 7109'],
        ['-43.58095637', '146.88651178', '810 COCKLE CREEK RD, RECHERCHE TAS 7109'],
        ['-43.58079479', '146.88701991', '812 COCKLE CREEK RD, RECHERCHE TAS 7109']
      ];
      const result = utils.isCorrectDataFile(data);
      expect(result).toBe(false);
    });
  });

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
