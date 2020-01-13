// @ts-nocheck
/* eslint-disable no-unused-vars */
// @ts-nocheck
// 本文件的主要能力是做文件的读取与解析
const fileSystem = require('fs');
const htmlparser = require("htmlparser2");

// 创建代理控制对象
function createCallbackProxy(originCallback, dealCallback) {
    return new Proxy(originCallback, {
        get: function (target, propKey, receiver) {
            if (propKey === 'onend') {
                dealCallback(target.getResult());
            }
            return Reflect.get(target, propKey, receiver);
        },
        set: function (target, propKey, value, receiver) {
            return Reflect.set(target, propKey, value, receiver);
        }
    })
}

/**
 * 读取并遍历DOM，并存入文件
 */
module.exports = function (filePath, parserCallback) {
    return new Promise((resolve, reject) => {
        // 文件访问
        // Tests a user's permissions for the file or directory specified by path.
        fileSystem.access(filePath, fileSystem.constants.F_OK | fileSystem.constants.R_OK, (err) => {
            console.log(`${filePath} ${err ? 'does not exist' : 'exists'}`);
            if (err) {
                reject(`${err} does not exist`);
            } else {
                resolve(filePath);
            }
        });
    }).then(res => {
        return new Promise((resolve, reject) => {
            // 文件读取
            fileSystem.readFile(res, 'utf8', (err, fd) => {
                if (err) {
                    if (err.code === 'ENOENT') {
                        reject(`${res} does not exist`);
                    }
                    reject(err);
                }
                resolve(fd);
            });
        });
    }).then(fileData => {
        return new Promise(resolve => {
            // 开始执行解析
            const parser = new htmlparser.Parser(createCallbackProxy(parserCallback, function (result) {
                resolve(result);
            }), { decodeEntities: true });
            parser.write(fileData);
            parser.end();
        })
    }).then(result => {
        return new Promise((resolve, reject) => {
            // 源文件读取
            const writeFilePath = filePath + ".css";
            fileSystem.readFile(writeFilePath, 'utf8', (err, fd) => {
                if (err) {
                    reject({ result });
                }
                resolve({ fd, result });
            });
        })
    }).then(result => {
        // 如果文件存在, 则对新老结果进行比对
        return new Promise(resolve => {
            const regex = parserCallback.getCheckRegExp();
            const string = result.fd;

            // 存储文件中已存在的选择器
            const matches = new Set();
            let match;
            while (match = regex.exec(string)) {
                matches.add(match[0]);
            }

            // 用于存放最终写入的结果
            let finallyArray = [];
            result.result.forEach(element => {
                if (!matches.has(element)) {
                    finallyArray.push(element);
                }
            });
            resolve(finallyArray)
        })
    }, emptyResult => {
        // 如果不存在
        return Promise.resolve(emptyResult.result);
    }).then(result => {
        return new Promise((resolve, reject) => {
            const writeFilePath = filePath + ".css";

            // 对数组转化为字符串
            if (result instanceof Array) {
                result = result.join('\n');
            }

            // 添加新增时间
            result = `/* =============== 以下结果追加于: ${new Date().toLocaleString()} =============== */\n${result}`

            // 结果写入
            fileSystem.appendFile(writeFilePath, result, function (error) {
                if (error)
                    throw error
                else
                    resolve('The file has been saved! Path -> ' + writeFilePath);
            });

            // createReadStream
        })
    }).finally(() => {
        fileSystem.close(2);
    })
}