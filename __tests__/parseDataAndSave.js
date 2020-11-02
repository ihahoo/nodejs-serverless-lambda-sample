const parseDataAndSave = require('../src/parseDataAndSave');
const config = require('../src/config');

describe('parseDataAndSave()', () => {
  test('读取文件解析数据并保存', async () => {
    await expect(parseDataAndSave(config.bucket, 'test.csv')).resolves.toBe('success');
  });

  test('错误的文件格式', async () => {
    await expect(parseDataAndSave(config.bucket, 'testWrong.csv')).rejects.toBe('Wrong file format');
  });
});
