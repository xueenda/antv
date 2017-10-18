<!--
index: 15
title: Label 图形文本
resource:
  jsFiles:
    - ${url.dataSet}
    - ${url.g2}
-->

# Label 图形文本

恰当的文本标注可以提高可视化图表的可读性。除了提供文本标签标注的功能之外，G2 还支持文本的格式化以及自定义 html 文本标签的功能。

<img src="https://gw.alipayobjects.com/zos/rmsportal/lSasYkLULFIHYIpEIeUw.png" width="512px">

## 如何使用

在每个几何标记 geom 上调用 label 方法，指定需要显示的数据维度即可：

```js
// 指定显示文本标签
chart.point().position('x*y').label('x');
// 格式化文本标签的显示内容
chart.interval().position('x*y').label('x', {
  offset: {Number}, // 设置坐标轴文本 label 距离坐标轴线的距离
  textStyle: {
    textAlign: 'center', // 文本对齐方向，可取值为： start middle end
    fill: '#404040', // 文本的颜色
    fontSize: '12', // 文本大小
    fontWeight: 'bold', // 文本粗细
    rotate: 30, 
    textBaseline: 'top' // 文本基准线，可取 top middle bottom，默认为middle
  } || {Function}, // 支持回调 
  autoRotate: {Boolean} // 是否需要自动旋转，默认为 true
  formatter: {Function}, // 回调函数，用于格式化坐标轴上显示的文本信息
  htmlTemplate: {Function}, // 使用 html 自定义 label
});
```

<div id="c0"></div>

```js+
var data = [
  {genre: 'Sports', sold: 275},
  {genre: 'Strategy', sold: 115},
  {genre: 'Action', sold: 120},
  {genre: 'Shooter', sold: 350},
  {genre: 'Other', sold: 150},
];

var chart = new G2.Chart({
  container: 'c0',
  height: 300,
  forceFit: true,
  padding: [ 40, 20, 95, 80 ]
});

chart.source(data, {
  genre: {
    alias: '游戏种类' // 列定义，定义该属性显示的别名
  },
  sold: {
    alias: '销售量'
  }
});
chart.interval().position('genre*sold').color('genre').label('sold');
chart.render();
```

更多配置项请查看 [label TODO](/g2/api/geom.html#label) api。

## 格式化文本

如果默认提供的 label 显示形式不满足需求时，可以在 label 中定义 formatter 回调函数。

```js
chart.interval().position('x*y').label('x', {
  formatter: function(text, item, index)  {
    // text 为每条记录 x 属性的值
    // item 为映射后的每条数据记录，是一个对象，可以从里面获取你想要的数据信息
    // index 为每条记录的索引
  }
});
```

<div id="c1"></div>

完整代码如下：

```js+
var data = [
  {name: 'Microsoft Internet Explorer', value: 56.33 },
  {name: 'Chrome', value: 24.03},
  {name: 'Firefox', value: 10.38},
  {name: 'Safari',  value: 4.77},
  {name: 'Opera', value: 0.91},
  {name: 'Proprietary or Undetectable', value: 0.2}
];
var dv = new DataSet.DataView();
dv.source(data).transform({
  type: 'percent',
  field: 'value',
  dimension: 'name',
  as: 'percent'
});
var chart = new G2.Chart({
  container: 'c1',
  width: 800,
  height: 400
});
chart.source(dv);
// 重要：绘制饼图时，必须声明 theta 坐标系
chart.coord('theta', {
  radius: 0.8 // 设置饼图的大小
});
chart.tooltip({
  showTitle: false
});
chart.intervalStack()
  .position('percent')
  .color('name')
  .tooltip('name*percent', function(name, percent) {
    return {
      name: name,
      value: (percent * 100).toFixed(2) + '%'
    };
  })
  .label('name', {
    formatter: function(text, item, index) {
      var point = item.point; // 每个弧度对应的点
      var percent = point['percent'];
      percent = (percent * 100).toFixed(2) + '%';
      return text + ' ' + percent;
    }
  });
chart.render();
```

## 自定义 html 文本

```js
chart.interval().position('x*y').label('x', {
  htmlTemplate: function(text, item, index)  {
    // text 为每条记录 x 属性的值
    // item 为映射后的每条数据记录，是一个对象，可以从里面获取你想要的数据信息
    // index 为每条记录的索引
  }
});
```

label 除了可以格式化文本的显示，也支持使用 html 自定义显示的样式。只需要定义 htmlTemplate 格式化文本的回调函数即可，如下例所示：

<div id="c2"></div>

完整代码：

```js+
var data = [
  {name: '示例 A', value: 38.8 },
  {name: '示例 B', value: 9.15 },
  {name: '示例 C', value: 26.35 },
  {name: '示例 D ',  value: 22.6 },
  {name: '示例 E', value: 3.1 }
];
var dv = new DataSet.DataView();
dv.source(data).transform({
  type: 'percent',
  field: 'value',
  dimension: 'name',
  as: 'percent'
});
var chart = new G2.Chart({
  container: 'c2',
  width: 800,
  height: 400
});
chart.source(dv);
// 重要：绘制饼图时，必须声明 theta 坐标系
chart.coord('theta', {
  radius: 0.8 // 设置饼图的大小
});
chart.tooltip({
  showTitle: false
});
chart.intervalStack()
  .position('percent')
  .color('name')
  .tooltip('name*percent', function(name, percent) {
    return {
      name: name,
      value: (percent * 100).toFixed(2) + '%'
    };
  })
  .label('name', {
    labelLine: false, // 不显示文本的连接线
    offset: 30, // 文本距离图形的距离
    htmlTemplate: function(text, item, index) {
      var point = item.point; // 每个弧度对应的点
      var percent = point['percent'];
      percent = (percent * 100).toFixed(2) + '%';
      return '<span class="title" style="display: inline-block;width: 50px;">' + text + '</span><br><span style="color:' + point.color + '">' + percent + '</span>'; // 自定义 html 模板
    }
  });
chart.render();
````
