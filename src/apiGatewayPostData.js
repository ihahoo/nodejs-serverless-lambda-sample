const { isCorrectDataType, saveData } = require('./utils');

const apiGatewayPostData = async (records) => {
  if (records && Array.isArray(records) && records.length > 0) {
    for (const record of records) {
      if (isCorrectDataType(record)) {
        await saveData({
          address: record[2],
          latitude: Number(record[0]),
          longitude: Number(record[1])
        });
      }
    }
  }
};

module.exports = apiGatewayPostData;
