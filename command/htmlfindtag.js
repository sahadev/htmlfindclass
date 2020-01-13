// @ts-nocheck
/* eslint-disable no-unused-vars */
// @ts-nocheck

const tagValueArray = new Set();

// DOM解析各个生命周期回调
const originCallback = {
	onopentag: function (name, attribs) {
	},
	onopentagname: function (name, attribs) {
		tagValueArray.add(name + " {\n}\n");
	},
	onattribute: function (name, attribs) {
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
		tagValueArray.clear();
	},
	getResult: function () {
		return Array.from(tagValueArray);
	},
	// 表达式校验规则，用于检测之前的内容是否匹配这一规则
	getCheckRegExp: function () {
		return /([\w -]*{\n}\n)+/g;
	}
};

module.exports = originCallback;