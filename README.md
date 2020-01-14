# HtmlFindClass README

## Features
在支持的文件中，单击右键->选择HtmlFindClass。如若选中的文件格式正确，则会在选中文件的所在目录输出一个以"文件名+.css"的文件，右下角会提示生成文件的路径。这样就省去了单独拷贝class样式的时间。

目前支持的文件格式有：html、vue、wxml。

Wxml文件示例：

![](resource/htmlfindclass.main.gif)

我的联系方式：sahadev@foxmail.com

## Release Notes

### 1.1.0
- 去除冗余依赖库
- 去除冗余命令
- 去除冗余输出日志
- 完善输出结果内容
- 降低最低兼容版本号
- 增加对html, wxml, vue文件的支持

### 1.3.0
- 对class的值去重
- 支持多个class值，例如：class="a b c" 将会生成=> .a{} .b{} .c{}

### 1.4.0
- 支持ID选择器与TAG选择器
- 对结构进行了重构，支持多种命令注入执行
- 修复一些Bug

### 1.5.0
- 对新增的class/id/tag做文件追加。也就是说在原来的文件中新添加了class，那么再运行插件，则会在*.css文件中追加这部分新增。结果可参考/test/product-price.wxml.css
```css
    /* =============== 以下结果追加于: 1/14/2020, 2:18:59 PM =============== */
    .xxxxxx {
    }

    .yyyyy {
    }

    .zzzzz {
    }
```

## TODO
- 支持对Vue文件做专门处理，会自动在Vue文件的Style标签内追加新属性。
- 对Sass、Less写法做支持。
- 支持pug类型的文件
- 开启文件监听器实现实时生成的能力 -watch //https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_fs_watch_filename_options_listener