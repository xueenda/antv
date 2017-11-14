<!--
index: 6
title: 绘图接口
resource:
  jsFiles:
    - ${url.f2}
-->

# Graphic

F2 由于是直接使用[ canvas 的 API](http://www.w3school.com.cn/tags/html_ref_canvas.asp)，所以在自定义 shape 时使用 canvas 的接口。


```js
F2.Shape.registerShape('point', 'custom', {
  draw: function(cfg, canvas) {
    var ctx = canvas.getContext('2d');
    ctx.save(); // 保存当前上下文
    
    ctx.lineTo(..); // 调用 canvas 的方法
    ctx.moveTo(..);

    ctx.restore(); //恢复当前上下文
  }
});
```

`注意`

* 绘制图形前需要保存上下文
* 绘制完成图形后恢复上下文

## 方法

为了方便用户自定义 Shape，F2 提供了下面的方法：

### drawLine

绘制单个线段

`F2.Graphic.drawLine(start, end, canvas, cfg)`
* start: `Object` 起始点
* end: `Object` 结束点
* canvas: `HTMLElement` 画布对象
* cfg: `Object` 配置项，见[绘图属性](canvas.html)

```js+
var canvas = document.getElementById('c1');

F2.Graphic.drawLine({x: 0, y: 0}, {x: 100, y: 100}, canvas, {
  stroke: 'red',
  lineWidth: 2
});
```

<canvas id="c1" width="100" height="100"></canvas>

### drawLines

绘制多个线段

`F2.Graphic.drawLines(points, canvas, cfg)`
* points 绘制线的点集合
* canvas: `HTMLElement` 画布对象
* cfg: `Object` 配置项，见[绘图属性](canvas.html)

```js+
var canvas = document.getElementById('c2');

F2.Graphic.drawLines([{x: 0, y: 0}, {x: 100, y: 100}, {x: 200, y: 40}], canvas, {
  stroke: 'red',
  lineWidth: 2
});
```

<canvas id="c2" width="200" height="100"></canvas>

### drawSmooth

绘制曲线

`F2.Graphic.drawSmooth(points, canvas, cfg)`

* points：`Array` 绘制线的点集合,注意点必须大于 3 否则无法形成曲线
* canvas: `HTMLElement` 画布对象
* cfg: `Object` 配置项，见[绘图属性](canvas.html)

```js+
var canvas = document.getElementById('c3');

F2.Graphic.drawSmooth([{x: 0, y: 0}, {x: 50, y: 50}, {x: 100, y: 20}, {x: 150, y: 40}], canvas, {
  stroke: 'red',
  lineWidth: 2
});
```

<canvas id="c3" width="200" height="120"></canvas>


### drawText

绘制文本

`F2.Graphic.drawText(text, pos, canvas, cfg)`

* text: `String` 文本内容
* pos: `Object` 位置
* canvas: `HTMLElement` 画布对象
* cfg: `Object` 配置项，见[绘图属性](canvas.html)

```js+
var canvas = document.getElementById('c4');

F2.Graphic.drawText('test text', {x: 50, y: 50}, canvas, {
  fill: 'red',
  fontSize: 14
});
```

<canvas id="c4" width="200" height="120"></canvas>


### drawRect

绘制包含多个点的包围盒

`F2.Graphic.drawRect(points, canvas, cfg)`

* points：`Array` 矩形框包围的点集合,注意点必须大于 2 否则无法绘制矩形框
* canvas: `HTMLElement` 画布对象
* cfg: `Object` 配置项，见[绘图属性](canvas.html)

```js+
var canvas = document.getElementById('c5');

F2.Graphic.drawRect([{x: 50, y: 50}, {x: 100, y: 100}], canvas, {
  stroke: 'red',
  lineWidth: 2
});

```

<canvas id="c5" width="200" height="120"></canvas>


### drawCircle

绘制圆

`F2.Graphic.drawCircle(center, radius, canvas, cfg)`

* center: `Object` 圆心位置
* radius: `Number` 半径
* canvas: `HTMLElement` 画布对象
* cfg: `Object` 配置项，见[绘图属性](canvas.html)

```js+

var canvas = document.getElementById('c6');

F2.Graphic.drawCircle({x: 100, y: 100}, 50, canvas, {
  stroke: 'red',
  lineWidth: 1
});

```

<canvas id="c6" width="200" height="160"></canvas>


### drawArc

绘制圆弧

`F2.Graphic.drawArc(center, radius, startAngle, endAngle, canvas, cfg)`

* center: `Object` 圆心位置
* radius: `Number` 半径
* startAngle: `Number` 起始弧度
* endAngle: `Number` 结束弧度
* canvas: `HTMLElement` 画布对象
* cfg: `Object` 配置项，见[绘图属性](canvas.html)

```js+
var canvas = document.getElementById('c7');

F2.Graphic.drawArc({x: 100, y: 100}, 50, 0, Math.PI, canvas, {
  fill: 'blue'
});

```

<canvas id="c7" width="200" height="200"></canvas>

### drawShape

自定义绘制图形

F2.Graphic.drawShape(canvas, cfg, callback)
* canvas: `HTMLElement` 画布对象
* cfg: `Object` 配置项，见[绘图属性](canvas.html)
* callback: `Function` 回调函数, 函数原型 function(ctx) {}

```js+
var canvas = document.getElementById('c8');

F2.Graphic.drawShape(canvas, {
  stroke: 'blue'
}, function(ctx) {
  ctx.rect(20,20,150,100);
  ctx.moveTo(20,20);
  ctx.lineTo(200, 200);
});
```

<canvas id="c8" width="200" height="200"></canvas>


注意：

* 不需要调用 save(), store() 方法，保存和恢复上下文
* 不需要调用 stroke(), fill() 方法绘制或者填充属性
