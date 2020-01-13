var regex = /(\.[\w -]*{\n}\n)+/g;
var string = '"/* =============== 以下结果追加于: 1/10/2020, 7:21:31 PM =============== */\n.container {\n}\n\n.top-area {\n}\n\n.top-background {\n}';

var matches = [];
var match;
while (match = regex.exec(string)) {
  matches.push(match[0]);
}

console.info(matches.join('\n'));