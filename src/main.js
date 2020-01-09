// @ts-nocheck
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const htmlfindclassCmd = require('../command/htmlfindclass');
const htmlfindidCmd = require('../command/htmlfindid');
const htmlfindtagCmd = require('../command/htmlfindtag');

const vscode = require('vscode');

const commandEntryHelper = require('../helper/commandEntryHelper');
const htmlParseHelper = require('../helper/htmlParseHelper');

// 命令与处理函数的对应关系
const commandCB = {
    htmlfindclass: htmlfindclassCmd,
    htmlfindtag: htmlfindtagCmd,
    htmlfindid: htmlfindidCmd,
};

function onCommandCallback(commandStr) {
    console.info(`命令 ${commandStr} 已注册`);
    return function (args) {
        commandEntryHelper(args).then(function (filePath) {
            // 对指定路径的文件进行解析，解析结果传递至第二个参数
            htmlParseHelper(filePath, commandCB[commandStr]).catch(err => {
                vscode.window.showErrorMessage('文件读取/解析过程发生错误？' + err);
            }).then(res => {
                vscode.window.showInformationMessage(res);
            })
        }, function (error) {
            vscode.window.showErrorMessage('一个不可能的事情发生了，文件路径读取错误？' + error);
        });
    }
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand("extension.htmlfindclass", onCommandCallback('htmlfindclass')));
    context.subscriptions.push(vscode.commands.registerCommand("extension.htmlfindtag", onCommandCallback('htmlfindtag')));
    context.subscriptions.push(vscode.commands.registerCommand("extension.htmlfindid", onCommandCallback('htmlfindid')));

    // test command
    context.subscriptions.push(vscode.commands.registerCommand("extension.htmlfindtest", function () {
        vscode.window.showInformationMessage('hello!');
    }));
}

function deactivate() {
}

module.exports = {
    activate,
    deactivate
}
