// @ts-nocheck
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const htmlfindclassCmd = require('../command/htmlfindclass');
const htmlfindidCmd = require('../command/htmlfindid');
const htmlfindtagCmd = require('../command/htmlfindtag');
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand("extension.htmlfindclass", htmlfindclassCmd));
    context.subscriptions.push(vscode.commands.registerCommand("extension.htmlfindtag", htmlfindtagCmd));
    context.subscriptions.push(vscode.commands.registerCommand("extension.htmlfindid", htmlfindidCmd));
    context.subscriptions.push(vscode.commands.registerCommand("extension.htmlfindtest", function(){
        vscode.window.showInformationMessage('hello!');
    }));
}

function deactivate() {
}

module.exports = {
    activate,
    deactivate
}
