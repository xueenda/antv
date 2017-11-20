<!--
index: 2
title: 字体
-->

# 字体

AntV 的字体是基于 Ant Design 设计体系下衍生的字体，Ant Design 字体详见 [链接](https://ant.design/docs/spec/font-cn)。

## 字体家族

字体家族 css 代码如下：

优秀的字体系统的核心是选择一个好的字体。Ant Design 的字体家族中优先使用系统默认的界面字体，同时提供了一套利于屏显的备用字体库，来维护在不同平台以及浏览器的显示下字体始终保持良好的易读性和可读性，体现了友好，稳定和专业的特性。

```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimSun, sans-serif;
```

> 参考自：[https://www.smashingmagazine.com/2015/11/using-system-ui-fonts-practical-guide/](https://www.smashingmagazine.com/2015/11/using-system-ui-fonts-practical-guide/)


另外，在中后台系统中，数字经常需要进行纵向对比展示，我们单独将数字的字体设置为`Helvetica Neue`，使其为等宽字体。

> 技术方案：[http://stackoverflow.com/questions/13611420/set-a-font-specifically-for-all-numbers-on-the-page](http://stackoverflow.com/questions/13611420/set-a-font-specifically-for-all-numbers-on-the-page)

  

## 图表字号

使用不同的字号和字重来传递图表中的视觉信息层次。默认字体为`12pt。`
![图表文字大小.jpg | center | 704x253](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/jpeg/40eae47a-c2bd-4304-a8a6-cf2f45c70665.jpeg "")


## 图表字体颜色
![字体颜色.jpg | center | 704x253](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/jpeg/91131701-401c-4c0d-9daf-d6e24684d022.jpeg "")
注：表格中 @Black = #000000、@White = #FFFFFF 