function parseCallback(vscode) {
    function onResult(result) {

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

    }

    function onError() {
        vscode.window.showErrorMessage("文件解析出错");
    }
}


module.exports = parseCallback;