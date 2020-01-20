// @ts-nocheck
/* eslint-disable no-unused-vars */
// @ts-nocheck

const classValueArray = new Set();
const uniqueSelector = [];

// 当前运行深度
let currentRunDeep = 0;

// 当前节点的指针
let currentNodePointer = null;

// DOM解析各个生命周期回调
const originCallback = {
    onopentag: function (name, attribs) {
    },
    onopentagname: function (name, attribs) {

        if (currentNodePointer === null) {
            // 初始化根节点
            currentNodePointer = {};
            currentNodePointer.deep = 0;
            currentNodePointer.tag = name;
        } else {
            // 处理子节点
            if (!currentNodePointer.childNode) {
                currentNodePointer.childNode = [];
            }
            let tempNode = {};
            tempNode.parentNode = currentNodePointer;
            currentNodePointer.childNode.push(tempNode);

            // 当前指针指向当前节点
            currentNodePointer = tempNode;
            currentNodePointer.deep = currentNodePointer.parentNode.deep + 1;
            currentNodePointer.tag = name;
        }
    },
    onattribute: function (name, attribs) {
        currentNodePointer[name] = attribs;

        if (name == "class") {
            if (!attribs)
                return;

            // 优先处理处理多个class
            if (attribs.indexOf(' ') > 0) {
                const arrays = attribs.split(' ');
                arrays.forEach((element, index) => {
                    if (!element)
                        return;
                    classValueArray.add("." + element + " {\n}\n");
                    // 这里只处理只有一个class属性的情况，如果一个标签含有多个class，则后面会将前面覆盖
                    currentNodePointer['class' + index] = element;
                });
                return;
            } else 
            // 如果class属性以'-开头'，则触发唯一选择器
            if (attribs.indexOf('-') === 0) {
                uniqueSelector.push(currentNodePointer);
            }



            classValueArray.add("." + attribs + " {\n}\n");
        }
    },
    ontext: function (name, attribs) {
    },
    onclosetag: function (name, attribs) {
        // 关闭深度 -1
        if (currentNodePointer.parentNode) {
            currentNodePointer = currentNodePointer.parentNode;
        }

        // 最终所有节点关闭时，currentNodePointer指向的是根节点
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
        debugger
    },
    getResult: function () {
        // 从文档中遍历的结果
        return Array.from(classValueArray);
    },
    // 表达式校验规则，用于检测之前的内容是否匹配这一规则
    getCheckRegExp: function () {
        return /(\.[\w -]*{\n}\n)+/g;
    }
};

module.exports = originCallback;