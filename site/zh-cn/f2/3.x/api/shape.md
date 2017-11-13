<!--
index: 4
title: Shape

-->

# Shape

F2 主要应用于移动端的场景，在移动端存在各种定制图表的场景，所以提供了自定义图表的功能，可以通过 geometry 的 `shape()` 方法指定图形。

```js
chart.line().position('x*y').shape('smooth');
```

F2 默认提供了以下种类的图形

type | shape
--- | ---
`point` | circle, rect, hollowCircle
`path` | line, smooth, dash
`line` | line, smooth, dash
`area` | area, smooth
`interval` | rect
`polygon` | polygon
`schema` | candle


#### 示例

```js
F2.Shape.registerShape('interval', 'triangle', {
  getPoints(cfg) {

  },
  draw(cfg, canvas) {

  }
});

chart.interval().position('x*y').shape('triangle');
```

## registerShape

`F2.Shape.registerShape(geomType, shapeName, cfg)` 注册图形

* geomType: `String` Geometry 的类型，可以定义所有图表的类型
* shapeName: `String` 自定义 shape 的名称，用于在 `chart.interval().shape(shapeName)` 中设定
* cfg: 注册 shape 的对象，提供了多个方法

```js
F2.Shape.registerShape('interval', 'triangle', {
  getPoints(cfg) {

  },
  draw(cfg, canvas) {

  }
});
```

### getPoints

`getPoints(cfg)` 获取构成图形的点
  * cfg 提供给获取构成图形的点时的信息
    + cfg.x: x 数据
    + cfg.y: y 数据
    + cfg.y0: y轴对应数据为 0 或者最小值，保证柱状图、区域图有正确的起始位置
    + cfg.size: 大小数据

图形可以使用多个点来绘制，但是由于数据中无法包含所有的点，所以需要生成图形需要的点：
* 柱状图需要 x,y 的值，但是需要 4 个顶点来绘制，需要柱状图的宽度、起始点信息
* 区域图需要 x,y 的值，但是 y 轴方向需要跟 x 坐标轴封闭起来
* 柱状图在极坐标系下会转换成玫瑰图
* k 线图（蜡烛图）提供的 y 值，有 4 个值(开盘价、收盘价、最高价、最低价)，但是需要 8 个点才能绘制

所以在自定义图表时如果需要生成的图形需要多个点来绘制，需要适应不同的坐标系，那么就需要生成图形需要的点。

### draw

`draw(cfg, canvas)`

* cfg 绘制图形的配置项
  + points: `getPoints()` 方法返回的点的数组
  + x: x 点的坐标
  + y: y 点的坐标
  + color: 颜色
  + size: 大小
  + shape: 形状
  + style: 额外传入的形状

```js
chart.point().position('x*y').size(10).color('red').style({opacity: 0.5});

draw(cfg, canvas) {
  cfg.color // red
  cfg.size // 10
  cfg.style // {opacity: 0.5}
}
```

* canvas: 原生的canvas 对象，可以使用 canvas 来绘制图形

```js
draw(cfg, cavas) {
  var points = this.parsePoints(cfg.points); // 将点从0-1转换成画布坐标
  var ctx = canvas.getContext('2d');
  ctx.save();
  ctx.strokeStyle = cfg.color;
  ctx.lineWidth = cfg.size;
  ctx.moveTo(points[0].x, points[0].y);

  for(var i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.stroke();
  ctx.restore();
}
```

由于 getPoints 方法返回的点是 0-1 范围的归一后的数据，所以需要将点转换成画布坐标，可以直接在 draw 方法中调用下面两个方法：

* `parsePoint(point)` 将单个点转换成画布上的坐标
* `parsePoints(points)` 将多个点转换成画布上的坐标


### 工具方法

直接使用 canvas 的原生 API 可以绘制出任意图形，但是存在几个不方便的地方：

* 需要手工调用 save(), restore() 方法
* 需要设置各种属性

F2 提供了一系列绘制图形的工具方法，参考[绘制接口](graphic.html)。


