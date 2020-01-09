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
            console.log(name + " - " + attribs);
            if (!attribs)
                return;

            if (attribs.indexOf(' ') > 0) {
                const arrays = attribs.split(' ');
                arrays.forEach(element => {
                    if (!element)
                        return;
                    classValueArray.add("." + element + "{}\n");
                });
                return;
            }

            classValueArray.add("." + attribs + "{}\n");
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
    onend: function () {

    },
    // 由getResult返回最终处理结果，这里的结果会最终写入文件中
    getResult: function () {
        return Array.from(classValueArray).join('\n');
    }
};

module.exports = originCallback;