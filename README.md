# nodejs-serverless-lambda-sample
Nodejs开发serverless的lambda函数样例，可通过serverless.yml脚本自动在云端部署，[serverless](https://www.serverless.com/) 工具可方便部署serverless服务。本例使用AWS做测试，其他云服务商的serverless服务大同小异。

本例用AWS的s3做文件存储，当有csv格式的文件上传到s3的时候，会触发lambda函数，对上传的csv文件判断是否是符合条件的数据，如果是符合条件的数据就存储到AWS的DynamoDb中，如果格式错误发送一条SNS错误主题的消息。另外使用API Gateway增加外部访问的接口，可以通过POST上传JSON格式的数据并保存。

`src/`下的文件为lambda函数发布用到的文件，用到的第三方包要一同打包发布，所以单独建立了`package.json`来维护使用的包。

本例中使用的s3 bucket为事先建立的bucket，可以通过修改 `serverless.yml` 和 `src/config.js`中的相关配置，配置成自己的bucket，另外DynamoDb和SNS也是直接在AWS控制台中建的，`src/config.js`中有相关的配置。

`__tests__` 下的 `test.csv` 和 `testWrong.csv`为测试用到的文件，上传到bucket中方便测试。


## 安装
You'll need to have [Node.js](https://nodejs.org) to get started.
````
$ git clone https://github.com/ihahoo/nodejs-serverless-lambda-sample.git
$ npm install
````

## 部署lambda函数到云端
````
$ npm run deploy
````

## 删除部署在云端的lambda函数
````
$ npm run remove
````

## 测试
````
$ npm run test
````
