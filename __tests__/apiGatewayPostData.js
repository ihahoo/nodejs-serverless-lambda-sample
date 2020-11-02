const apiGatewayPostData = require('../src/apiGatewayPostData');

describe('apiGatewayPostData()', () => {
  test('保存通过post接收的数组', async () => {
    const data = [
      [-40.58299805, 140.89373497, '840 COCKLE CREEK RD, RECHERCHE TAS 7109'],
      [300, 'abc', '833 COCKLE CREEK RD, RECHERCHE TAS 7109', 'test'],
      [-41.58259635, 141.89402117, '833 COCKLE CREEK RD, RECHERCHE TAS 7109']
    ];
    await expect(apiGatewayPostData(data)).resolves.toBeUndefined();
  });
});
