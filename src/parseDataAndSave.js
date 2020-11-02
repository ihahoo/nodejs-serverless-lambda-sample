const parse = require('csv-parse/lib/sync');
const { readCsvFile, sendErrorMsg, isCorrectDataFile, isCorrectDataType, saveData } = require('./utils');

// 从s3读取csv文件，判断是否符合格式，对符合格式的文件，数据保存到dynamoDb数据库中，不符合的文件发送消息到SNS的错误主题
const parseDataAndSave = async (bucket, key) => {
  if (!bucket || !key) return Promise.reject('bucket and key cannot be empty');

  // 从s3读取csv文件
  const csvFile = await readCsvFile(bucket, key);
  if (!csvFile) {
    await sendErrorMsg({ msg: 'Wrong file format', bucket, key });
    return Promise.reject('Wrong file format');
  }

  // 解析csv为数组
  let records;
  try {
    records = parse(csvFile);
  } catch (e) {
    await sendErrorMsg({ msg: 'Wrong file format', bucket, key });
    return Promise.reject('Wrong file format');
  }

  // 判断解析的csv是否符合格式
  // 合法格式：latitude,longitude,address
  // 合法格式用例：-43.58299805,146.89373497,"840 COCKLE CREEK RD, RECHERCHE TAS 7109"
  if (!isCorrectDataFile(records)) {
    await sendErrorMsg({ msg: 'Wrong file format', bucket, key });
    return Promise.reject('Wrong file format');
  }

  // 对于符合格式的数据保存到dynamoDb数据库
  for (const record of records) {
    if (isCorrectDataType(record)) { // 对于每条记录再判断一下是否符合格式再保存
      await saveData({
        address: record[2],
        latitude: Number(record[0]),
        longitude: Number(record[1])
      });
    }
  }

  return Promise.resolve('success');
};

module.exports = parseDataAndSave;
