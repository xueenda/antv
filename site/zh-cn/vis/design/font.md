<!--
index: 2
title: 字体使用原则
-->

# 字体

AntV 的字体是基于[ Ant Design 字体体系](https://ant.design/docs/spec/font-cn)，并结合数据可视化特性而选定。遵循 AntV 数据可视化中 “清晰” 的设计原则，需具备“可读性”、“易读性”，避免不必要修饰。

选用字体需有以下三个注意点：
* 为方便数据的比较和阅读，建议选取等宽字体；
* 跨平台的字体设定，力求在各个操作系统下都有最佳展示效果；
* 合理的使用不同的字重、字号和颜色来强调图表中信息重要等级；



## 字体家族
AntV 的字体家族优先使用系统默认的界面字体，同时提供了一套利于屏显的备用字体库，来维护在不同平台以及浏览器的显示下字体始终保持良好的可读性和易读性，体现了友好，稳定和专业的特性。

字体家族 css 代码如下：  
（@绝云(wensen.lws) 代码格式化一下~ ） 
```
font-family
:
 -apple-system, BlinkMacSystemFont, 
"Segoe UI"
, Roboto,
             
"Helvetica Neue"
, Helvetica, 
"PingFang SC"
, 
"Hiragino Sans GB"
, 
"Microsoft YaHei"
,
             SimSun, sans-serif
;
```

另外，在中后台系统中，数字经常需要进行纵向对比展示，我们单独将数字的字体设置为`Helvetica Neue`，使其为等宽字体。


## 字号
使用不同的字号和字重来传递图表中的视觉信息层次。默认字体为`12pt`。
![图表文字大小.jpg | center | 704x253](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/jpeg/40eae47a-c2bd-4304-a8a6-cf2f45c70665.jpeg "")


## 字体颜色
![image.png | left | 562x205](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/png/abd22c74-b438-4ffa-8000-1431ed034b98.png "")
