// @ts-nocheck
/* eslint-disable no-unused-vars */
// @ts-nocheck

const idValueArray = new Set();

// DOM解析各个生命周期回调
const originCallback = {
	onopentag: function (name, attribs) {
	},
	onopentagname: function (name, attribs) {

	},
	onattribute: function (name, attribs) {
		if (name === 'id') {
			idValueArray.add("#" + attribs + " {\n}\n");
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
		idValueArray.clear();
	},
	getResult: function () {
		return Array.from(idValueArray);
	},
	// 表达式校验规则，用于检测之前的内容是否匹配这一规则
	getCheckRegExp: function () {
		return /(\#[\w -]*{\n}\n)+/g;
	}
};

module.exports = originCallback;