// @ts-nocheck
/* eslint-disable no-unused-vars */
// @ts-nocheck

const classValueArray = new Set();

// DOM解析各个生命周期回调
const originCallback = {
    onopentag: function (name, attribs) {
    },
    onopentagname: function (name, attribs) {
    },
    onattribute: function (name, attribs) {
        if (name == "class") {
            if (!attribs)
                return;

            // 处理多个class
            if (attribs.indexOf(' ') > 0) {
                const arrays = attribs.split(' ');
                arrays.forEach(element => {
                    if (!element)
                        return;
                    classValueArray.add("." + element + " {\n}\n");
                });
                return;
            }

            classValueArray.add("." + attribs + " {\n}\n");
        }
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
    // 做清理工作，将Set清空
    onend: function () {
        classValueArray.clear();
    },
    getResult: function () {
        // 从文档中遍历的结果
        return Array.from(classValueArray);
    }
};

module.exports = originCallback;