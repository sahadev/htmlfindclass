// @ts-nocheck
/* eslint-disable no-unused-vars */
// @ts-nocheck

// 本文件的主要能力是做文件的读取与解析

const fileSystem = require('fs');
const htmlparser = require("htmlparser2");

// Demo
const originCallback = {
    onopentag: function (name, attribs) {
    },
    onopentagname: function (name, attribs) {
    },
    onattribute: function (name, attribs) {
    },
    ontext: function (name, attribs) {
    },
    onclosetag: function (name, attribs) {
    },
    onprocessinginstruction: function (name, attribs) {
    },
    oncomment: function (name, attribs) {
    },
    oncommentend: function (text) {
    },
    oncdatastart: function (tagname) {
    },
    oncdataend: function (name, attribs) {
    },
    onerror: function () {
    },
    onend: function () {
    },
    getResult: function () {
        return 'return sth to write.'
    }
};

// 创建代理控制对象
function createCallbackProxy(originCallback, dealCallback) {
    return new Proxy(originCallback, {
        get: function (target, propKey, receiver) {
            const result = Reflect.get(target, propKey, receiver)
            if (propKey === 'onend') {
                dealCallback(target.getResult());
            }
            return result;
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
        fileSystem.access(filePath, fileSystem.constants.F_OK, (err) => {
            console.log(`${filePath} ${err ? 'does not exist' : 'exists'}`);
            if (err) {
                reject(`${err} does not exist`);
            } else {
                resolve(filePath);
            }
        });
    }).then(res => {
        return new Promise((resolve, reject) => {
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
        return new Promise((resolve) => {
            const writeFilePath = filePath + ".css";
            fileSystem.writeFile(writeFilePath, result, function (error) {

                if (error)
                    throw error
                else
                    resolve('The file has been saved! Path -> ' + writeFilePath);
            });
        })
    })
}