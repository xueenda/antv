<!--
index: 5
title: 图形属性
-->

# canvas 属性

由于F2 使用的是canvas,绘制的所有图形都支持 canvas 的属性，本章列出常用的属性，详细信息参考[canvas 属性](http://www.w3school.com.cn/tags/html_ref_canvas.asp)

## 通用属性

* fill | fillStyle 设置用于填充绘画的颜色、渐变或模式
* stroke | strokeStyle 设置用于笔触的颜色、渐变或模式
* shadowColor 设置用于阴影的颜色
* shadowBlur  设置用于阴影的模糊级别
* shadowOffsetX 设置阴影距形状的水平距离
* shadowOffsetY 设置阴影距形状的垂直距离
* globalAlpha 设置绘图的当前 alpha 或透明值
* globalCompositeOperation  设置新图像如何绘制到已有的图像上

`注意`

F2对图形属性进行了缩写

* fillStyle 缩写为 fill
* stokeStyle 缩写为 stroke
* globalAlpha 缩写为 opacity

## 线条样式

* lineCap 设置线条的结束端点样式
* lineJoin  设置两条线相交时，所创建的拐角类型
* lineWidth 设置当前的线条宽度
* miterLimit  设置最大斜接长度

`注意`
F2 在现有线的样式基础上增加了虚线的支持

* lineDash：设置线的虚线样式，可以指定一个数组。一组描述交替绘制线段和间距（坐标空间单位）长度的数字。 如果数组元素的数量是奇数， 数组的元素会被复制并重复。例如， [5, 15, 25] 会变成 [5, 15, 25, 5, 15, 25]。

## 文本属性

* font  设置文本内容的当前字体属性
* textAlign 设置文本内容的当前对齐方式
* textBaseline  设置在绘制文本时使用的当前文本基线

`注意`

F2 提供了额外的几个文本属性，便于用户设置字体， 具体的含义参考[font 组成](http://www.w3school.com.cn/tags/canvas_font.asp)

* fontStyle 对应 font-style
* fontVariant 对应 font-variant
* fontWeight 对应 font-weight
* fontSize 对应 font-size
* fontFamily 对应 font-family
