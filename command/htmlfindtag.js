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
	// 由getResult返回最终处理结果，这里的结果会最终写入文件中
	getResult: function () {
		return Array.from(tagValueArray).join('\n');
	}
};

module.exports = originCallback;