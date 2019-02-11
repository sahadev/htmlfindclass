// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
var htmlparser = require("htmlparser2");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "htmlfindclass" is now active!');

	context.subscriptions.push(vscode.commands.registerCommand("extension.htmlfindclass", function (args) {
		const file = args.fsPath;

		fs.access(file, fs.constants.F_OK, (err) => {
			console.log(`${file} ${err ? 'does not exist' : 'exists'}`);

			fs.readFile(file, 'utf8', (err, fd) => {
				if (err) {
					if (err.code === 'ENOENT') {
						console.error('myfile does not exist');
						return;
					}

					throw err;
				}

				readMyData(fd, {
					onResult: function (result) {

						const writeFilePath = file + ".css";

						let resultStr = '';
						if (result) {
							result.forEach(element => {
								resultStr += element;
							});
						}

						fs.writeFile(writeFilePath, resultStr, function (error) {

							if (error)
								vscode.window.showErrorMessage(error + "");
							else
								vscode.window.showInformationMessage('The file has been saved! Path -> ' + writeFilePath);
						});

					},

					onError: function () {
						vscode.window.showErrorMessage("文件解析出错");
					}
				});
			});
		});
	}));
}

function readMyData(fileData, parserCallback) {

	const classValueArray = new Set();

	var parser = new htmlparser.Parser({
		onopentag: function (name, attribs) {
		},
		ontext: function (text) {
		},
		onclosetag: function (tagname) {
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
		onend: function () {
			console.error('onend');
			if (parserCallback) {
				parserCallback.onResult(Array.from(classValueArray));
			}
		},
		onerror: function () {
			console.error('onerror');
			if (parserCallback) {
				parserCallback.onError();
			}
		}
	}, { decodeEntities: true });
	parser.write(fileData);
	parser.end();
}

exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
