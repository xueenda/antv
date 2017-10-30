<!--
title: 箱形图
keywords:
  - 箱形图
  - 盒须图
tags:
  - distribute
variations:
  - span
  - violin
-->

# 箱形图

<img src="https://t.alipayobjects.com/images/T192XkXiJmXXXXXXXX.png" />

## 箱形图的简介

箱形图又称盒须图、盒式图或箱线图，是一种用作显示一组数据分布情况的统计图。

如果一个数据集中包含了一个分类变量和一个或者多个连续变量，那么你可能会想知道连续变量会如何随着分类变量水平的变化而变化，而箱形图就可以提供这种方法，它只用了5个数字对分布进行概括，即一组数据的最大值、最小值、中位数、下四分位数及上四分位数。对于数据集中的异常值，通常会以单独的点的形式绘制。箱形图可以水平或者垂直绘制。

箱形图多用于数值统计，虽然相比于直方图和密度曲线较原始简单，但是它不需要占据过多的画布空间，空间利用率高，非常适用于比较多组数据的分布情况。

从箱形图中我们可以观察到：

- 一组数据的关键值：中位数、最大值、最小值等。
- 数据集中是否存在异常值，以及异常值的具体数值。
- 数据是否是对称的。
- 这组数据的分布是否密集、集中。
- 数据是否扭曲，即是否有偏向性。

英文名：Box plot

## 箱形图的构成

<img class="constitute-img" src="https://t.alipayobjects.com/images/T14e0kXoNnXXXXXXXX.png" />

<table class="struct-table">
  <tr>
    <th>图表类型</th>
    <th>箱形图</th>
  </tr>
  <tr>
    <td>适合的数据</td>
    <td>一个分类字段，一个连续字段</td>
  </tr>
  <tr>
    <td>功能</td>
    <td>
      观察数据的<code>分布</code>情况
    </td>
  </tr>
  <tr>
    <td>数据与图形的映射</td>
    <td>
      分类字段映射到横轴</br>对连续字段经过分位统计后，得出最大值、最小值、上四分位、下四分位、中位线这四个元数据。然后将它们分别进行如右图映射到纵轴。
    </td>
  </tr>
  <tr>
    <td>适合的数据条数</td>
    <td>小于12*N </br>(N是分组数，大于12条会影响到文本排布，不利于阅读)</td>
  </tr>
</table>

注：当图上存在多个箱形图，可以使用颜色区分来对多个数据集数据的分布情况做对比。

<div style="clear:both;"></div>

## 箱形图的应用场景

例子 1：**关注于一组数据的分布情况。** 这里我们以经典的鸢尾花数据为例。

| 品种 | 萼片长度| 萼片宽度 | 花瓣长度 | 花瓣宽度 |
|------|----|------|----|------|
|I. setosa|4.3|3.0|1.1|0.1|
|I. versicolor|5.7|2.8|4.1|1.3|
|I. virginica|6.7|3.3|5.7|2.1|
|...|...|...|...|...|

如下图，我们用箱形图将不同种类的鸢尾花的花萼和花瓣的长度、宽度数据展示出来，同时我们还可以比较不同品种间花瓣和萼片数据是如何变化的。

<div id="c1"></div>

例子 2：**分组箱形图。** 为了更清晰得比较不同品种间相同属性数值的区别，可以将上图变化为如下二维多个箱形图形式。

<div id="c2"></div>

例子 3： **一维箱形图。** 箱形图有多种变换，这里介绍下一维箱形图，下图还以鸢尾花数据为例，展示的是所有品种的花萼和花瓣长度、宽度的情况，虽然是在一维坐标系中，但是通过添加颜色属性，可以为该一维箱形图再增加一个展示维度，即分类。

<div id="c3"></div>

```js-
$.getJSON('/assets/data/iris_flower_data.json', function(data) {
  var dv = new DataSet.View().source(data);
  dv
    .transform({
      type: 'fold',
      fields: [ '萼片长度','萼片宽度','花瓣长度','花瓣宽度' ],
      key: 'type',
      value: 'value',
      groupBy: '品种'
    })
    .transform({
      type: 'bin.quantile',
      field: 'value',
      as: 'y',
      groupBy: ['type', '品种']
    });

  var colorMap = {
    'I. setosa': G2.Global.colors[0],
    'I. versicolor': G2.Global.colors[1],
    'I. virginica': G2.Global.colors[2],
  };

  var chart = new G2.Chart({
    id: 'c1',
    forceFit: true,
    height : 400,
  });
  chart.source(dv);
  console.log(dv);
  chart.facet('rect', {
    fields: [ '品种', null ],
    eachView: function (view) {
      view.schema()
        .position('type*y')
        .shape('box')
        .size(50)
        .color('品种', function(key) {
          return colorMap[key];
        });
    }
  });
  chart.render();
  chart.on('tooltipchange', function(ev){
    var items = ev.items;
    var origin = items[0];
    var values = origin.point._origin.value;
    items.splice(0); // 清空
    items.push(Util.mix({}, origin, {
      name: '最小值',
      value: values[0].toFixed(2)
    }));
    items.push(Util.mix({}, origin, {
      name: '下四分位数',
      value: values[1].toFixed(2),
    }));
    items.push(Util.mix({}, origin, {
      name: '中位数',
      value: values[2].toFixed(2),
    }));
    items.push(Util.mix({}, origin, {
      name: '上四分位数',
      value: values[3].toFixed(2),
      marker: 'circle'
    }));
    items.push(Util.mix({}, origin, {
      name: '最大值',
      value: values[4].toFixed(2),
      marker: 'circle'
    }));
  });

  var chart2 = new G2.Chart({
    id: 'c2',
    forceFit: true,
    height : 350,
  });
  chart2.source(dv);
  chart2.tooltip({
    map: {
      title: '最小值-下四分位数-中位数-上四分位数-最大值'
    }
  });
  chart2.schemaDodge().position('type*y').color('品种').shape('box');
  chart2.render();

  var dv1 = new DataSet.View().source(data);
  dv1
    .transform({
      type: 'fold',
      fields: [ '萼片长度','萼片宽度','花瓣长度','花瓣宽度' ],
      key: 'type',
      value: 'value',
    })
    .transform({
      type: 'bin.quantile',
      field: 'value',
      as: 'y',
      groupBy: ['type']
    });

  var chart3 = new G2.Chart({
    id: 'c3',
    forceFit: true,
    height : 350,
  });
  chart3.source(dv1);
  chart3.coord().transpose();
  chart3.tooltip({
    map:{
      title: "type"
    }
  });
  chart3.schemaDodge().position('1*y').color('type').shape('box').size(30);
  chart3.render();
  chart3.on('tooltipchange', function(ev){
    var items = ev.items;
    var origin = items[0];
    var values = origin.point._origin.value;
    items.splice(0); // 清空

    items.push(Util.mix({}, origin, {
      name: '最小值',
      value: values[0].toFixed(2)
    }));
    items.push(Util.mix({}, origin, {
      name: '下四分位数',
      value: values[1].toFixed(2),
      marker: 'circle'
    }));
    items.push(Util.mix({}, origin, {
      name: '中位数',
      value: values[2].toFixed(2),
      marker: 'circle'
    }));
    items.push(Util.mix({}, origin, {
      name: '上四分位数',
      value: values[3].toFixed(2),
      marker: 'circle'
    }));
    items.push(Util.mix({}, origin, {
      name: '最大值',
      value: values[4].toFixed(2),
      marker: 'circle'
    }));
  });
});
```

<!-- ## 箱形图的扩展

### 箱形图的交互任务

#### 数值显示

需要在箱形图上显示最大值，最小值，中值，上四分位，下四分位


#### 单个箱形图的选择

可以选择一个单独的箱形图 -->
