<!--
index: 3
title: View
resource:
  jsFiles:
    - ${url.g2}
    - ${url.dataSet}
-->

# View

视图，由 Chart 生成和管理，拥有自己独立的数据源、坐标系和图层，用于异构数据的可视化以及图表组合，一个 Chart 由一个或者多个视图 View 组成。因此 view 上的 api 同 chart 基本相同。

## chart.view()

创建视图对象。

下面是创建视图的语法，首先你需要创建一个 chart 对象，然后调用 `chart.view(cfg)` 方法生成：

```js
var view = chart.view({
  start: {
    x: 0,
    y: 0
  }, // 视图绘图区域的起始点，x、y 数值在 0 - 1 范围内
  end: {
    x: 1,
    y: 1
  } // 视图绘图区域的结束点，x、y 数值在 0 - 1 范围内
});
```

`chart.view(cfg)` 方法中的参数 `cfg` 可以为空或者传入以下属性：

```js
{
  start: null, // 绘制区域的起始坐标，默认值为 {x: 0, y: 0}
  end: null, // 绘制区域的终点坐标，默认值为 {x: 1, y: 1}
  data: null, // 源数据，标准的 JSON 数组
  animate: boolean // 同 chart 配置保持一致
}
```


### 参数

- `start`: object

绘制区域的起始坐标，结构如下：

```js
{
  x: 0, // x 取值范围为 0 -1
  y: 0 // y 取值范围为 0 -1
}
```

对于 view，我们的起始点是从**左上角**开始的。

- `end`: object

绘制区域的终点坐标，结构如下：

```js
{
  x: 0, // x 取值范围为 0 -1
  y: 0 // y 取值范围为 0 -1
}
```

- `data`: array

视图的数据源，同时也可以使用 `view.source(data)` 方法设置数据源。

- `animate`: object

视图是否执行动画，默认执行。

> !注意：chart 下创建的 view 将默认使用 chart 的 **[列定义](/zh-cn/g2/3.x/tutorial/how-to-scale.html)**、**坐标轴 axis 配置**、**坐标系 coord 配置**，即如果 view 不自己定义则默认同 chart 的配置相同；如果 view 自己定义了相应的配置，则以自己的为准。

如下实例所示：

<div id="c1"></div>

```js-
var data = [
  {genre: 'Sports', sold: 275},
  {genre: 'Strategy', sold: 115},
  {genre: 'Action', sold: 120},
  {genre: 'Shooter', sold: 350},
  {genre: 'Other', sold: 150},
];

var chart = new G2.Chart({
  id: 'c1',
  forceFit: true,
  height: 400,
  padding: [ 40, 80, 100, 80]
});

chart.source(data, {
  genre: {
    alias: '游戏种类'
  },
  sold: {
    alias: '销售量',
    min: 0
  }
});
chart.coord('polar', {
  innerRadius: 0.6
});
chart.axis('genre', {
  label: {
    textStyle: {
      fill: '#f80',
      fontWeight: 'bold'
    }
  }
});
chart.interval().position('genre*sold').color('genre');

var view = chart.view({
  start: {
    x: 0.25,
    y: 0.25
  },
  end: {
    x: 0.75,
    y: 0.75
  }
});
view.source(data); // 默认使用 chart 的列定义
view.coord('polar', {
  innerRadius: 0
}); // 覆盖了 chart 的 coord 配置
view.axis('sold', false); // 对于 genre 对应的坐标轴配置会默认使用 chart 的坐标轴配置
view.interval().position('genre*sold')
  .color('genre', ['#61A5E8', '#7ECF51', '#EECB5F', '#E4925D', '#E16757']);
chart.render();
```

## view.source()

同 `chart.source()`。

## view.getXScale()

同 `chart.getXScale()`，只是返回该视图 x 轴对应的度量。

## view.getYScales()

同 `chart.getYScales()`，只是返回该视图 y 轴对应的度量。

## view.getXY()

同 `chart.getXY()`。

## view.filter()

同 `chart.filter()`。

## view.axis()

同 `chart.axis()`。

## view.guide()

同 `chart.guide()`。

## view.scale()

同 `chart.scale()`。

## view.coord()

同 `chart.coord()`。

## view.tooltip()

(enable: boolean)

view 上的 tooltip 方法只用于开启和关闭 tooltip。

```js
view.tooltip(false); // 关闭 view 上的 tooltip
```

## view.animate()

同 `chart.animate()`。

## view.clear()

同 `chart.clear()`。

## view.changeData()

同 `chart.changeData()`。

## view.changeVisible()

同 `chart.changeVisible()`。

## view.repaint()

同 `chart.repaint()`。

## view.destroy()

同 `chart.destroy()`。

## view.line()

同 `chart.line()`。

## view.path()

同 `chart.path()`。

## view.interval()

同 `chart.interval()`。

## view.area()

同 `chart.area()`。

## view.point()

同 `chart.point()`。

## view.polygon()

同 `chart.polygon()`。

## view.edge()

同 `chart.edge()`。

## view.schema()

同 `chart.schema()`。

## view.heatmap()

同 `chart.heatmap()`。
