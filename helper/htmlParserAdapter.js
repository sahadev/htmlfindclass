// @ts-nocheck
/* eslint-disable no-unused-vars */
// @ts-nocheck

function createAdapterParserCallback(originCallback) {
    // 当前节点的指针
    let currentNodePointer = null;

    function onopentagname(name) {
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
    }
    function onattribute(name, attribs) {
        currentNodePointer[name] = attribs;

    }
    function onclosetag() {
        // 关闭深度 -1
        if (currentNodePointer.parentNode) {
            currentNodePointer = currentNodePointer.parentNode;
        }

        // 最终所有节点关闭时，currentNodePointer指向的是根节点
    }

    // DOM解析各个生命周期回调
    return new Proxy(originCallback, {
        apply(target, object, args){
            debugger
            // if (propKey === 'onopentagname') {
            //     onopentagname();
            // } else if (propKey === 'onattribute') {
            //     onattribute();
            // } else if (propKey === 'onclosetag') {
            //     onclosetag();
            // }
        }
    })
}

module.exports = createAdapterParserCallback;