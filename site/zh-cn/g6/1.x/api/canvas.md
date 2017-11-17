<!--
 index: 10
 title: Canvas
 resource:
   jsFiles:
     - ${url.g6}
-->

<style>
.inner-page-toc{
  display: none;
}
</style>

# Canvas

本文档是G6图形库-G6.Canvas的API文档, 您能从该文档中快速查找到我们的绘图引擎提供的所有**对外发布**的`方法`、`配置`、`属性` 及它们的使用方法。如果有你觉得描述的不够清晰的地方敬请[联系我们](/about/index.html)！

* [直线-line](#_直线-line)
* [二阶bezier曲线-quadratic](#_二阶bezier曲线-quadratic)
* [三阶bezier曲线-cubic](#_三阶bezier曲线-cubic)
* [圆弧线-arc](#_圆弧线-arc)
* [多段线-polyline](#_多段线-polyline)
* [矩形-rect](#_矩形-rect)
* [圆-circle](#_圆-circle)
* [椭圆形-ellipse](#_椭圆形-ellipse)
* [扇形-fan](#_扇形-fan)
* [多边形-polygon](#_多边形-polygon)
* [图像-image](#_图像-image)
* [文本-text](#_文本-text)
* [svg的path-path](#_svg的path-path)
* [动画-animate](#_动画-animate)
* [变换-transform](#_变换-transform)
* [通用属性](#_通用属性)
* [通用方法](#_通用方法)

## 直线-line

<div id="c1"></div>

```js+
  const canvas = new G6.Canvas({
    containerId: 'c1',
    width: 600,
    height: 600
  });
  canvas.scale(0.5, 0.5);
  canvas.addShape('line', {
    attrs: {
      x1: 20,
      y1: 20,
      x2: 280,
      y2: 280,
      stroke: 'red'                       // 颜色名字
    }
  });
  canvas.addShape('line', {
    attrs: {
      x1: 20,
      y1: 300 + 20,
      x2: 280,
      y2: 300 + 280,
      arrow: true,                                             // 显示箭头
      stroke: '#00ff00'                   // 6位十六进制
    }
  });
  canvas.addShape('line', {
    attrs: {
      x2: 300 + 20,
      y2: 300 + 20,
      x1: 300 + 280,
      y1: 300 + 280,
      arrow: true,                                             // 显示箭头
      stroke: '#00f'                      // 3位十六进制
    }
  });
  canvas.addShape('line', {
    attrs: {
      x1: 20,
      y1: 600 + 20,
      x2: 280,
      y2: 600 + 280,
      lineDash: [10,10],
      stroke: 'rgb(100, 100, 200)'         // rgb数字模式
    }
  });
  canvas.addShape('line', {
    attrs: {
      x1: 300 + 20,
      y1: 600 + 20,
      x2: 300 + 280,
      y2: 600 + 280,
      lineDash: [10,20, 10],
      stroke: 'rgba(100, 100, 200, 0.5)'   // rgba数字模式
    }
  });
  canvas.addShape('line', {
    attrs: {
      x1: 600 + 20,
      y1: 600 + 20,
      x2: 600 + 280,
      y2: 600 + 280,
      lineDash: [50,50],
      stroke: 'rgb(34%, 85%, 48%)'         // rgb百分比模式
    }
  });
  canvas.addShape('line', {
    attrs: {
      x1: 900 + 20,
      y1: 600 + 20,
      x2: 900 + 280,
      y2: 600 + 280,
      lineDash: [50,5,50,5],
      stroke: 'rgba(34%, 85%, 48%, 0.5)'   // rgba百分比模式
    }
  });
  canvas.addShape('line', {
    attrs: {
      x1: 20,
      y1: 900 + 20,
      x2: 280,
      y2: 900 + 280,
      stroke: 'l (0) 0:#ff0000 1:#0000ff'                      // 线性渐变
    }
  });
  canvas.addShape('line', {
    attrs: {
      x1: 300 + 20,
      y1: 900 + 20,
      x2: 300 + 280,
      y2: 900 + 280,
      stroke: 'r (0.5, 0.5, 0) 0:rgb(0, 0, 255) 1:#ff0000'    // 迳向渐变
    }
  });
  canvas.draw();
```

## 属性
### x1
[Number]，默认值: 0 第一个点的 x 值。

### y1
[Number]，默认值: 0 第一个点的 y 值。

### x2
[Number]，默认值: 0 第二个点的 x 值。

### y2
[Number]默认值: 0 第二点的 y 值。

### arrow
[Boolean]，箭头有第一个点指向第二个点

### lineWidth
[Number]，线宽。

### lineDash
[String || Array]，虚线。

### stroke
[String]，边框颜色。

### storkeOpacity
[Number]，边框透明度。

## 方法

### getPoint

#### 参数
- t 百分比

#### 返回
- point 画布坐标点

## 二阶bezier曲线-quadratic

<div id="c2"></div>

```js+
  const canvas = new G6.Canvas({
    containerId: 'c2',
    width: 600,
    height: 600
  });
  canvas.scale(0.5, 0.5);
  canvas.addShape('quadratic', {
    attrs: {
      p1: [100, 600-250],
      p2: [300, 500-250],
      p3: [500, 600-250],
      arrow: true,
      stroke: 'black'
    }
  });
  canvas.addShape('quadratic', {
    attrs: {
      p1: [700, 600-250],
      p2: [900, 800-250],
      p3: [1100, 500-250],
      lineDash: [20, 20],
      stroke: 'black'
    }
  });
  canvas.addShape('quadratic', {
    attrs: {
      p1: [100, 600],
      p2: [300, 500],
      p3: [500, 600],
      stroke: 'black'
    }
  });
  canvas.addShape('quadratic', {
    attrs: {
      p1: [700, 600],
      p2: [900, 800],
      p3: [1100, 500],
      stroke: 'black'
    }
  });
  addMarker(canvas, [
    [100, 600],
    [300, 500],
    [500, 600],
    [700, 600],
    [900, 800],
    [1100, 500]
  ]);
  function addMarker(canvas, points, cfg){
    for (var i = 0; i < points.length; i++) {
      var circle = canvas.addShape('circle', {
        attrs: {
          x: points[i][0],
          y: points[i][1],
          r: 8,
          stroke: '#F93D26'
        }
      });
    }
  }
  canvas.draw();
```

## 属性
### p1
二阶贝赛尔曲线的第一个点，曲线总是开始于这个点。

<span style="font-style:italic;color:#F93D26">
警告：不要仅仅设置一点的某一个分量，要设置就把整个点进行替换。quadratic.attr('p1', [200, 300]) 这样做是正确的。
</span>

### p2
二阶贝赛尔曲线控制点，曲线总是不经过这个点，不过这个点会影响曲线的形状

<span style="font-style:italic;color:#F93D26">
警告：不要仅仅设置一点的某一个分量，要设置就把整个点进行替换。quadratic.attr('p2', [200, 300]) 这样做是正确的。
</span>

### p3
二阶贝赛尔曲线的终点，曲线总是结束于这个点

<span style="font-style:italic;color:#F93D26">
警告：不要仅仅设置一点的某一个分量，要设置就把整个点进行替换。quadratic.attr('p3', [200, 300]) 这样做是正确的。
</span>

### arrow
箭头只会出现在p3这个点

### stroke
边框颜色

### storkeOpacity
边框透明度

## 方法

### getPoint
##### 参数
- t 百分比

#### 返回

- point 画布坐标点

## 三阶bezier曲线-cubic

<div id="c3"></div>

```js+
  const canvas = new G6.Canvas({
    containerId: 'c3',
    width: 600,
    height: 600
  });
  canvas.scale(0.5, 0.5);
  canvas.addShape('cubic', {
    attrs: {
      p1: [75, 300],
      p2: [200, 120],
      p3: [450, 350],
      p4: [510, 150],
      stroke: 'black',
      lineDash: [20,20]
    }
  });
  canvas.addShape('cubic', {
    attrs: {
      p1: [600 + 90, 150],
      p2: [600 + 150, 350],
      p3: [600 + 300, 120],
      p4: [600 + 525, 300],
      stroke: '#42E1DC',
      arrow: true
    }
  });
  canvas.addShape('cubic', {
    attrs: {
      p1: [20, 600 + 100],
      p2: [200, 600 + 100],
      p3: [400, 600 + 500],
      p4: [520, 600 + 200],
      stroke: 'r (0.5, 0.5, 1) 0:#ffaa00 1:#11aacc'
    }
  });
  canvas.addShape('cubic', {
    attrs: {
      p1: [600 + 20, 600 + 100],
      p2: [600 + 200, 600 + 100],
      p3: [600 + 400, 600 + 500],
      p4: [600 + 520, 600 + 200],
      stroke: 'r (0.5, 0.5, 1) 0:#ffaa00 0.5:#00ffff 1:#11aacc'
    }
  });
  addMarker(canvas, [
    [75, 300],
    [200, 120],
    [450, 350],
    [510, 150]
  ]);
  function addMarker(canvas, points, cfg){
    for (var i = 0; i < points.length; i++) {
      var circle = canvas.addShape('circle', {
        attrs: {
          x: points[i][0],
          y: points[i][1],
          r: 8,
          stroke: '#F93D26'
        }
      });
    }
  }
  canvas.draw();
```

## 属性
### p1
cubic的第一个点，曲线总是开始于这个点。

<span style="font-style:italic;color:#F93D26">
警告：不要仅仅设置一点的某一个分量，要设置就把整个点进行替换。quadratic.attr('p1', [200, 300]) 这样做是正确的。
</span>

### p2
cubic第一个控制点，曲线总是不经过这个点，不过这个点会影响曲线的形状

<span style="font-style:italic;color:#F93D26">
警告：不要仅仅设置一点的某一个分量，要设置就把整个点进行替换。quadratic.attr('p2', [200, 300]) 这样做是正确的。
</span>

### p3
cubic第二个控制点，曲线总是不经过这个点，不过这个点会影响曲线的形状

<span style="font-style:italic;color:#F93D26">
警告：不要仅仅设置一点的某一个分量，要设置就把整个点进行替换。quadratic.attr('p3', [200, 300]) 这样做是正确的。
</span>

### p4
cubic的终点，曲线总是结束于这个点

<span style="font-style:italic;color:#F93D26">
警告：不要仅仅设置一点的某一个分量，要设置就把整个点进行替换。quadratic.attr('p4', [200, 300]) 这样做是正确的。
</span>

### arrow
箭头只会出现在p3这个点

### stroke
边框颜色

### storkeOpacity
边框透明度

## 方法

### getPoint
##### 参数
- t 百分比

##### 返回
- point 画布坐标点

## 圆弧线-arc

<div id="c4"></div>

```js+
  const canvas = new G6.Canvas({
    containerId: 'c4',
    width: 600,
    height: 600
  });
  canvas.scale(0.5, 0.5);
  canvas.addShape('arc', {
    attrs: {
      x: 300,
      y: 300,
      r: 200,
      startAngle: 1/6 * Math.PI,
      endAngle: 5/4 * Math.PI,
      stroke: 'black',
      lineDash: [20,20]
    }
  });
  canvas.addShape('arc', {
    attrs: {
      x: 300,
      y: 600,
      r: 200,
      startAngle: 1/6 * Math.PI,
      endAngle: 1/2 * Math.PI,
      stroke: '#0D2031',
    }
  });
  canvas.addShape('arc', {
    attrs: {
      x: 900,
      y: 600,
      r: 150,
      startAngle: 1/6 * Math.PI,
      endAngle: 5/4 * Math.PI,
      stroke: 'red',
      arrow: true
    }
  });
  canvas.draw();
```

## 属性
### x
默认值: 0 圆心的x值

### y
默认值: 0 圆心的y值

### r
默认值: 0 圆弧的半径

### startAngle
默认值: 0 开始角度 角度制

### endAngle
默认值: 0 结束角度 角度制

### clockwise
默认值: false

表示画轴的方向

值的范围: true表示逆时针，false顺时针

### arrow
默认值: false

圆弧是否带有箭头，false不带，true带

箭头总是出现在endAngle这个位置

### stroke
边框颜色

### storkeOpacity
边框透明度

## 方法

### getPoint

##### 参数
- t 百分比

##### 返回
- point 画布坐标点

## 多段线-polyline

<div id="c5"></div>

```js+
  const canvas = new G6.Canvas({
    containerId: 'c5',
    width: 600,
    height: 600
  });
  canvas.scale(0.5, 0.5);
  canvas.addShape('polyline', {
    attrs: {
      points: [[741.6487813219777,1183.92131359719],[583.1709046233477,33.93352498571885],[1098.3455104904451,246.13363066051957],[211.30437444177633,420.3306748934016],[980.3732054245157,756.2252762234709],[374.28495603818607,108.15975006182006],[422.7940564389682,1119.2144105552136],[833.5078092462321,586.7198136138784]],
      stroke: 'red'
    }
  });
  canvas.draw();
```

## 属性
### points
多个点组成的数组, 数组的每一项是一个数组[x, y], 这个样个数组代表一个点，x是这个点的x坐标，y是这个点的y坐标

### arrow
默认值: false

是否显示箭头, true显示, false不显示

箭头只会出现在points中最后一个点

### stroke
边框颜色

### storkeOpacity
边框透明度

## 方法

### getPoint
##### 参数
- t 百分比

##### 返回
- point 画布坐标点

## 矩形-rect

<div id="c6"></div>

```js+
  const canvas = new G6.Canvas({
    containerId: 'c6',
    width: 600,
    height: 600
  });
  canvas.addShape('rect', {
    attrs: {
      x: 150,
      y: 150,
      width: 150,
      height: 150,
      stroke: 'black'
    }
  });
  canvas.addShape('rect', {
    attrs: {
      x: 150-50,
      y: 150-50,
      width: 150,
      height: 150,
      stroke: 'red'
    }
  });
  canvas.addShape('rect', {
    attrs: {
      x: 150+50,
      y: 150+50,
      width: 150,
      height: 150,
      fill: 'rgba(129,9,39,0.5)',
      stroke: 'blue'
    }
  });
  canvas.draw();
```

## 属性
### x
矩形的左上角x的坐标

### y
矩形的左上角y的坐标

### width
矩形的宽度

### height
矩形的高度

### radius
矩形的圆角半径

### fill
填充颜色

### fillOpacity
填充透明度

### stroke
边框颜色

### storkeOpacity
边框透明度

## 圆-circle

<div id="c7"></div>

```js+
  const canvas = new G6.Canvas({
    containerId: 'c7',
    width: 600,
    height: 600
  });
  canvas.addShape('circle', {
    attrs: {
      x: 150+200,
      y: 150,
      r: 70,
      stroke: 'black'
    }
  });
  canvas.addShape('circle', {
    attrs: {
      x: 150-50,
      y: 150-50,
      r: 60,
      lineDash: [20, 20],
      stroke: 'red'
    }
  });
  canvas.addShape('circle', {
    attrs: {
      x: 150+50,
      y: 150+150,
      r: 100,
      fill: 'rgba(129,9,39,0.5)',
      stroke: 'blue'
    }
  });
  canvas.draw();
```

## 属性
### x
圆心坐标的x坐标

### y
圆心坐标的y坐标

### r
圆的半径

### fill
填充颜色

### fillOpacity
填充透明度

### stroke
边框颜色

### storkeOpacity
边框透明度

## 椭圆形-ellipse

<div id="c8"></div>

```js+
  const canvas = new G6.Canvas({
    containerId: 'c8',
    width: 600,
    height: 600
  });
  canvas.addShape('ellipse', {
    attrs: {
      x: 150+200,
      y: 150,
      rx: 70,
      ry: 30,
      stroke: 'black'
    }
  });
  canvas.addShape('ellipse', {
    attrs: {
      x: 150-50,
      y: 150-50,
      rx: 50,
      ry: 50,
      lineDash: [20, 20],
      stroke: 'red'
    }
  });
  canvas.addShape('ellipse', {
    attrs: {
      x: 150+50,
      y: 150+150,
      rx: 30,
      ry: 100,
      fill: 'rgba(129,9,39,0.5)',
      stroke: 'blue'
    }
  });
  canvas.draw();
```

## 属性
### x
椭圆圆心坐标，x坐标的值

### y
椭圆圆心坐标，y坐标的值

### rx
椭圆横半轴的大小

### ry
椭圆纵半轴的大小

### fill
填充颜色

### fillOpacity
填充透明度

### stroke
边框颜色

### storkeOpacity
边框透明度

# 扇形-fan

<div id="c9"></div>

```js+
  const canvas = new G6.Canvas({
    containerId: 'c9',
    width: 600,
    height: 600
  });
  canvas.addShape('fan', {
    attrs: {
      x: 150+200,
      y: 150,
      rs: 20,
      re: 80,
      startAngle: 1/6*Math.PI,
      endAngle: 3/2*Math.PI,
      stroke: 'black'
    }
  });
  canvas.addShape('fan', {
    attrs: {
      x: 150-50,
      y: 150-50,
      rs: 30,
      re: 70,
      startAngle: 0,
      endAngle: 3/2*Math.PI,
      lineDash: [10, 10],
      stroke: 'red'
    }
  });
  canvas.addShape('fan', {
    attrs: {
      x: 150+50,
      y: 150+150,
      rs: 5,
      re: 40,
      startAngle: 1/6*Math.PI,
      endAngle: 13/9*Math.PI,
      fill: 'rgba(129,9,39,0.5)',
      stroke: 'blue'
    }
  });
  canvas.draw();
```

## 属性
### x
扇形圆心的坐标的x坐标

### y
扇形圆心的坐标的y坐标

### rs
扇形半径的内半径

### re
扇形半径的外半径

### startAngle
扇形的起始角度

### endAngle
扇形的结束角度

### clockwise
开始角度到结束角度的旋转方向

### fill
填充颜色

### fillOpacity
填充透明度

### stroke
边框颜色

### storkeOpacity
边框透明度

## 多边形-polygon

<div id="c9.1"></div>

```js+
  const canvas = new G6.Canvas({
    containerId: 'c9.1',
    width: 600,
    height: 600
  });
  canvas.addShape('polygon', {
    attrs: {
      points: [
        [150, 350],
        [100, 90],
        [150, 160],
        [240, 120]
      ],
      stroke: 'l (0) 0.2:#ff00ff 1:#0000ff'
    }
  });
  canvas.draw();
```

## 属性
### points
多边形的各个顶点

### fill
填充颜色

### fillOpacity
填充透明度

### stroke
边框颜色

### storkeOpacity
边框透明度

## 图像-image

<div id="c10"></div>

```js+
  const canvas = new G6.Canvas({
    containerId: 'c10',
    width: 600,
    height: 600
  });
  canvas.addShape('image', {
    attrs: {
      x: 150+200,
      y: 150,
      img: 'https://zos.alipayobjects.com/rmsportal/FDWrsEmamcNvtEf.png'
    }
  });
  canvas.addShape('image', {
    attrs: {
      x: 150-50,
      y: 150-50,
      img: 'https://zos.alipayobjects.com/rmsportal/nAVchPnSaAWncPj.png'
    }
  });
  canvas.addShape('image', {
    attrs: {
      x: 150+50,
      y: 150+150,
      img: 'https://zos.alipayobjects.com/rmsportal/GHGrgIDTVMCaYZT.png'
    }
  });
  canvas.draw();
```

## 属性
### x
图片左上角坐标的x值

### y
图片左上角坐标的y值

### img
图片，可以是图片的地址，或者是一个image对象

### width
图片的宽度，如果不设，则按照源图像的宽度进行设置

### height
图片的高度，如果不设，则按照源图形的高度进行设置

### sx
可以在源图形中截取一个矩形区域的源图形，这是截取的区域左上角坐标的x值

### sy
可以在源图形中截取一个矩形区域的源图形，这是截取的区域左上角坐标的y值

### swidth
可以在源图形中截取一个矩形区域的源图形，这是截取的区域左上角坐标的swidth值

### sheight
可以在源图形中截取一个矩形区域的源图形，这是截取的区域左上角坐标的sheight值

### fill
填充颜色

### fillOpacity
填充透明度

### stroke
边框颜色

### storkeOpacity
边框透明度

## 文本-text

<div id="c11"></div>

```js+
  const canvas = new G6.Canvas({
    containerId: 'c11',
    width: 600,
    height: 600
  });
  canvas.addShape('text', {
    attrs: {
      x: 150,
      y: 150,
      fontFamily: 'PingFang SC',
      text: '文本文本',
      fontSize: 90,
      stroke: 'black'
    }
  });
  canvas.addShape('text', {
    attrs: {
      x: 150+100,
      y: 250,
      fontFamily: 'PingFang SC',
      fontSize: 90,
      text: '字体',
      lineDash: [10, 10],
      stroke: 'red'
    }
  });
  canvas.addShape('text', {
    attrs: {
      x: 150+50,
      y: 150+150,
      text: '对齐方式',
      fontFamily: 'Hiragino Sans GB',
      fontSize: 100,
      textAlign: 'center',
      textBaseline: 'top',
      fill: 'rgba(129,9,39,0.5)',
      stroke: 'blue'
    }
  });
  canvas.draw();
```

## 属性
### x
文字的左上角的x值

### y
文字的左上角的y值

### text
文字内容

### fontFamily
字体 [参见](http://www.w3school.com.cn/tags/canvas_font.asp)

### fontSize
字体大小 [参见](http://www.w3school.com.cn/tags/canvas_font.asp)

### fontWeight
字体粗细 [参见](http://www.w3school.com.cn/tags/canvas_font.asp)

### fontStyle
字体样式 [参见](http://www.w3school.com.cn/tags/canvas_font.asp)

### textAlign
左右对齐方式

![image](https://zos.alipayobjects.com/rmsportal/oMVFeaVCYNkDCeN.png)

### textBaseline
上下对齐方式

![image](https://zos.alipayobjects.com/rmsportal/VejEpbzakKrESzH.png)

### fill
填充颜色

### fillOpacity
填充透明度

### stroke
边框颜色

### storkeOpacity
边框透明度

## svg的path-path

<div id="c12"></div>

```js+
  const canvas = new G6.Canvas({
    containerId: 'c12',
    width: 600,
    height: 600
  });
  const path = canvas.addShape('path', {
    attrs: {
      path: 'M100,600' +
            'l 50,-25' +
            'a25,25 -30 0,1 50,-25' +
            'l 50,-25' +
            'a25,50 -30 0,1 50,-25' +
            'l 50,-25' +
            'a25,75 -30 0,1 50,-25' +
            'l 50,-25' +
            'a25,100 -30 0,1 50,-25' +
            'l 50,-25' +
            'l 0, 200,' +
            'z',
      lineWidth: 10,
      lineJoin: 'round',
      stroke: '#54BECC'
    }
  });
  path.translate(0, -200);
  canvas.draw();
```

## 属性
path规范的命令 [参见](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Paths)

### fill
填充颜色

### fillOpacity
填充透明度

### stroke
边框颜色

### storkeOpacity
边框透明度

### getPoint

#### 参数

- t 百分比

##### 返回
- point 画布坐标点

## 动画-animate

动画

## 方法

### animate
`cfg` 配置项{Object}含：

* attrs     图形属性
* matrix    图形矩阵
* repeat    是否重复
* destroy   是否执行完自动销毁

`duration` 持续时间{Number}毫秒 ms

`easing` 缓动函数{Sring}含：

* linear
* easeInQuad
* easeOutQuad
* easeInOutQuad
* easeInCubic
* easeOutCubic
* easeInOutCubic
* easeInQuart
* easeOutQuart
* easeInOutQuart
* easeInQuint
* easeOutQuint
* easeInOutQuint
* easeInSine
* easeOutSine
* easeInOutSine
* easeInExpo
* easeOutExpo
* easeInOutExpo
* easeInCirc
* easeOutCirc
* easeInOutCirc
* easeInElastic
* easeOutElastic
* easeInOutElastic
* easeInBack
* easeOutBack
* easeInOutBack
* easeInBounce
* easeOutBounce
* easeInOutBounce


`callback` 回调函数动画执行完毕执行

```js+
shape.animate(cfg, duration, easing, callback);
```

## 示例

<div id="c_animate"></div>

```js+
  const canvas = new G6.Canvas({
    containerId: 'c_animate',
    width: 600,
    height: 300
  });
  const circle = canvas.addShape('circle', {
    attrs: {
      x: 0,
      y: 150,
      r: 70,
      fill: 'blue',
      opacity: 0.6
    }
  });
  circle.animate({
    x: 500,
    fill: 'red',
    repeat: true,
    r: 40
  },5000, 'linear');
```

## 通用属性

下列属性是所有元素都共有的。

### capture

是否可被捕捉

### zIndex

图层层级

### lineWidth

线宽

画布坐标

### lineDash
虚线

a1, a2 …… 分别指的是实线和空线所占像素的多少

- [a1, a2, a3……]
- "a1 a2"

### clip

剪切

图形可以接受另外一个图形作为它的剪切图形, 用作剪切的图形必须是能够填充(fill)的图形。

<div id="c100"></div>

```js+
  var canvas = new G6.Canvas({
    containerId: 'c100',
    width: 600,
    height: 600
  });
  canvas.scale(0.5, 0.5);
  var line1 = canvas.addShape('line', {
    attrs: {
      x1: 20,
      y1: 120,
      x2: 580,
      y2: 120,
      stroke: 'l (0) 0:#ff0000 1:#0000ff'
    }
  });

  var polygon1 = canvas.addShape('polygon', {
    attrs: {
      points: [
        [600 + 100, 20],
        [600 + 20, 200],
        [1200 - 20, 100],
        [1200 - 100, 300 - 20]
      ],
      fill: 'green'
    }
  });

  var line2 = canvas.addShape('line', {
    attrs: {
      x1: 20 + 300,
      y1: 120 + 300 ,
      x2: 580 + 300,
      y2: 120 + 300,
      stroke: 'l (0) 0:#ff0000 1:#0000ff'
    }
  });

  var polygon2 = canvas.addShape('polygon', {
    attrs: {
      points: [
        [600 + 100 - 300, 20 + 300],
        [600 + 20 - 300, 200 + 300],
        [1200 - 20 - 300, 100 + 300],
        [1200 - 100 - 300, 300 - 20 + 300]
      ],
      fill: 'green'
    }
  });

  var line3 = canvas.addShape('line', {
    attrs: {
      x1: 20 + 300,
      y1: 120 + 600 ,
      x2: 580 + 300,
      y2: 120 + 600,
      stroke: 'l (0) 0:#ff0000 1:#0000ff'
    }
  });

  var polygon3 = canvas.addShape('polygon', {
    attrs: {
      points: [
        [600 + 100 - 300, 20 + 600],
        [600 + 20 - 300, 200 + 600],
        [1200 - 20 - 300, 100 + 600],
        [1200 - 100 - 300, 300 - 20 + 600]
      ],
      stroke: 'green'
    }
  });

  var polygon4 = canvas.addShape('polygon', {
    attrs: {
      points: [
        [600 + 100 - 300, 20 + 900],
        [600 + 20 - 300, 200 + 900],
        [1200 - 20 - 300, 100 + 900],
        [1200 - 100 - 300, 300 - 20 + 900]
      ]
    }
  });

  var line4 = canvas.addShape('line', {
    attrs: {
      x1: 20 + 300,
      y1: 120 + 900 ,
      x2: 580 + 300,
      y2: 120 + 900,
      stroke: 'l (0) 0:#ff0000 1:#0000ff',
      clip: polygon4
    }
  });
  canvas.draw();
```

## 变换-transform

#### translate(tx, ty)

![](https://zos.alipayobjects.com/rmsportal/NPknvcCQMFCFsSjBNwdc.png)

平移方法

tx表示x方向的平移量

ty表示y方向的平移量

#### rotate(r)

![](https://zos.alipayobjects.com/rmsportal/sBfEFXCtPpSdZTNlXeOb.png)

angle表示旋转角度, 弧度制(0 ～ 2*PI)

旋转，旋转中心是其父元素的自身坐标轴原点

#### scale(sx, sy) 缩放
缩放，缩放中心是其父元素的自身坐标轴原点

sx表示x方向的缩放量

sy表示y方向的缩放量

#### setMatrix(Matrix)
设置变换矩阵

#### getMatrix()
获取变换矩阵

## 通用属性值

#### 颜色
- 纯色 #fff || #ffffff || red || rgb(255,255,255) || rgba(255,255,255,1) || hsl(255, 100%, 50%)
- 渐变色
  -  线性渐变 'l (45) 0:#ffff00 1:#00ffff'         // 一个斜向45度的渐变
  -  径向渐变 'r (0.5, 0.5, 0) 0:#fff 1:#ff0000'   // 渐变在正中心发生

#### 透明度
0～1
- 0 全透明
- 1 不透明

## 通用方法

#### find(id)
通过id查找元素

#### getBBox()
获取包围盒

#### hide()
隐藏

#### show()
显示

#### destroy()
销毁自身

#### remove(destroy)

删除自己, 从父元素中删除自己
如果destroy为true，则移除后销毁自身
