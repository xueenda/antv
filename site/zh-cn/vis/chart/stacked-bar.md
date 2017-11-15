<!--
title: 堆叠柱状图
tags:
  - compare
  - proportion
variations:
  - bar
  - multi-set-bar
-->

# 堆叠柱状图

<img src="https://os.alipayobjects.com/rmsportal/CpBYrdxsYGIpnYq.jpg" >

## 堆叠柱状图的简介

与并排显示分类的[分组柱状图](./multi-set-bar.html)不同，堆叠柱状图将每个柱子进行分割以显示相同类型下各个数据的大小情况。它可以形象得展示一个大分类包含的每个小分类的数据，以及各个小分类的占比，显示的是单个项目与整体之间的关系。我们将堆叠柱状图分为两种类型：

* 一般的堆叠柱状图：每一根柱子上的值分别代表不同的数据大小，各层的数据总和代表整根柱子的高度。非常适用于比较每个分组的数据总量。

* 百分比的堆叠柱状图：柱子的各个层代表的是该类别数据占该分组总体数据的百分比。

堆叠柱状图的一个缺点是当柱子上的堆叠太多时会导致数据很难区分对比，同时很难对比不同分类下相同维度的数据，因为它们不是按照同一基准线对齐的。

英文名：Stacked Bar Chart

## 堆叠柱状图的构成

### 一般堆叠柱状图

<img src="https://os.alipayobjects.com/rmsportal/IRcNZGQBfHwTzRa.png" width="400px" class="constitute-img">

<table class="struct-table">
  <tr>
    <th>图表类型</th>
    <th>堆叠柱状图</th>
  </tr>
  <tr>
    <td>适合的数据</td>
    <td>列表：两个分类数据字段、一个连续数据字段</td>
  </tr>
  <tr>
    <td>功能</td>
    <td>对比分类数据的数值大小，同时对比一个分类（分组）下数据的汇总值</td>
  </tr>
  <tr>
    <td>数据与图形的映射</td>
    <td>其中一个分类数据字段映射到坐标轴的位置用于分组， <br>另一个分类数据映射到图形的颜色<br>连续数据字段映射到矩形的长度</td>
  </tr>
  <tr>
    <td>适合的数据条数</td>
    <td>映射到位置的分类不超过 12 个，映射到颜色的分类不超过 6 个</td>
  </tr>
</table>

<div style="clear: both;"></div>


### 百分比柱状图

<img src="https://os.alipayobjects.com/rmsportal/TRsMVRQJVBLOYfx.png" width="400px" class="constitute-img">

<table class="struct-table">
  <tr>
    <th>图表类型</th>
    <th>百分比柱状图</th>
  </tr>
  <tr>
    <td>适合的数据</td>
    <td>列表：两个分类数据字段、一个连续数据字段</td>
  </tr>
  <tr>
    <td>功能</td>
    <td>对比同一个分组数据内不同分类的占比</td>
  </tr>
  <tr>
    <td>数据与图形的映射</td>
    <td>其中一个分类数据字段映射到坐标轴的位置用于分组， <br>另一个分类数据映射到图形的颜色<br>连续数据字段映射到矩形的长度</td>
  </tr>
  <tr>
    <td>适合的数据条数</td>
    <td>映射到位置的分类不超过 12 个 <br> 映射到颜色的分类不超过 6 个</td>
  </tr>
</table>

<div style="clear: both;"></div>

## 堆叠柱状图的应用场景

### 一般堆叠柱状图适合的场景

例子1：**对比不同分组的总量大小，同时对比同一分组内不同分类的大小**。如下图显示的是每种化妆品在各个城市的销售情况，通过堆叠柱状图，我们可以很清晰对比同一种化妆品到底在哪个城市销售更好。

name（化妆品名称）|city|revenue(销售收入)
----|----|-------
Nailpolish|Florida|12814
Eyebrowpencil|Florida|13012
Rouge|Texas|9054
。。。|。。。|。。。


<div id="c3"></div>

```js-
  var data = [
    {"name": "Nailpolish", "Florida": 12814, "Texas": 3054, "Arizona": 4376, "Nevada": 4229},
    {"name": "Eyebrowpencil", "Florida": 13012, "Texas": 5067, "Arizona": 3987, "Nevada": 3932},
    {"name": "Rouge", "Florida": 11624, "Texas": 7004, "Arizona": 3574, "Nevada": 5221},
    {"name": "Pomade", "Florida": 8814,  "Texas":9054, "Arizona": 4376, "Nevada": 9256},
    {"name": "Eyeshadows", "Florida": 12998, "Texas": 12043, "Arizona": 4572, "Nevada": 3308},
    {"name": "Eyeliner", "Florida": 12321, "Texas": 15067, "Arizona": 3417, "Nevada": 5432},
    {"name": "Foundation", "Florida": 10342, "Texas": 10119, "Arizona": 5231, "Nevada": 13701},
    {"name": "Lipgloss", "Florida": 22998, "Texas": 12043, "Arizona": 4572, "Nevada": 4008},
    {"name": "Mascara", "Florida": 11261, "Texas": 10419, "Arizona": 6134, "Nevada": 18712},
    {"name": "Powder", "Florida": 10261, "Texas": 14419, "Arizona": 5134, "Nevada": 25712}
  ];
  data = data.reverse();
  var dv = new DataSet.View().source(data);
  dv.transform({
    type: 'fold',
    fields: ['Florida','Texas','Arizona','Nevada'],
    key: 'City',
    value: 'Revenue',
  });

  var chart = new G2.Chart({
    container: 'c3',
    forceFit: true,
    height: 400,
  });
  chart.source(dv);
  chart.coord('rect')//.transpose();
  chart.intervalStack().position('name*Revenue').color('City');
  chart.render();
```

说明：
  * name （化妆品名称）使用 `位置`区分不同的化妆品
  * city (不同的城市) 使用不同的`颜色`区分
  * revenue （销售收入）使用矩形的`长度`表示销售量的大小，将销售收入堆叠起来，可以看到某个化妆品在所有城市的总销售额

### 一般堆叠柱状图不适合的场景

一般堆叠柱状图各个分组内不同分类的基准线不同，所以不适合对比不同化妆品在不同城市的销售量

### 百分比堆叠柱状图适合的场景

例子1：**观察分类占比情况**

下图表是一个游戏公司在不同年份的各类游戏的销量情况：

year（年份）|genre（游戏类型） |sold（销售量）|
----|------|----
2001|Sports|27,500
2001|Strategy|11,500
2001|Action|6,000
2001|Shooter|3,500
2001|Other|1,500
2002|Sports|29,500
2002|Strategy|10,500
2002|Action|8,000
2002|Shooter|4,500
2002|Other|1,800
...|...|...


<div id="c2"></div>

```js-
  var data = [
    {year:'2001',genre:'Sports',sold:27500},
    {year:'2001',genre:'Strategy',sold:11500},
    {year:'2001',genre:'Action',sold:6000},
    {year:'2001',genre:'Shooter',sold:3500},
    {year:'2001',genre:'Other',sold:1500},
    {year:'2002',genre:'Sports',sold:29500},
    {year:'2002',genre:'Strategy',sold:10500},
    {year:'2002',genre:'Action',sold:8000},
    {year:'2002',genre:'Shooter',sold:4500},
    {year:'2002',genre:'Other',sold:1800},
    {year:'2003',genre:'Sports',sold:30500},
    {year:'2003',genre:'Strategy',sold:12500},
    {year:'2003',genre:'Action',sold:4000},
    {year:'2003',genre:'Shooter',sold:6500},
    {year:'2003',genre:'Other',sold:2000},
  ];

  var dv = new DataSet.View().source(data);
  dv.transform({
    type: 'percent',
    field: 'sold',
    dimension: 'genre',
    groupBy: 'year',
    as: 'percent',
  });

  console.log(dv);

  var chart = new G2.Chart({
    container: 'c2',
    forceFit: true,
    height: 400
  });
  chart.source(dv);
  chart.scale('percent',{
    formatter: function(val) {
      return parseInt(val*100) + '%';
    }
  });
  chart.intervalStack().position('year*percent').color('genre');
  chart.render();
```

说明：
  * genre 使用横轴`位置`区分不同的游戏类型
  * year 使用`颜色`区分不同年份的游戏
  * sold 使用矩形的`长度`表示游戏销量

### 百分比堆叠柱状图不适合的场景

* 对比不同分组内同个分类的数据大小
* 对比各分组总数的大小

## 堆叠柱状图的的扩展

纵向柱状图建议展示的数据条数较少，当分类过多时，我们可以使用横向的堆叠柱状图。横向柱状图的介绍详见[柱状图](./bar.html)

例1: 下图展示了美国几十个州不同年龄段的人口数据分布情况。

州名称|年龄段 |人口数量
-----|----|----
"CA"|"小于5岁"|2704659
...|...|...

<div id="c1"></div>

```js-
  $.getJSON('/assets/data/population-by-age.json?nowrap', function(data) {
    var newData = data.slice(0,30);
    var dv = new DataSet.View().source(newData);
    dv.transform({
      type: 'fold',
      fields: ["小于5岁","5至13岁","14至17岁","18至24岁","25至44岁","45至64岁","65岁及以上"],
      key: '年龄段',
      value: '人口数量',
    });

    var chart = new G2.Chart({
      id: 'c1',
      forceFit: true,
      height: 500,
    });
    chart.source(dv);
    chart.coord('rect').transpose();
    chart.intervalStack().position('state*人口数量').color('年龄段', ['#98ABC5', '#8A89A6', '#7B6888', '#6B486B', '#A05D56', '#D0743C', '#FF8C00']).size(10);
    chart.render();
  });
```

说明：
  * 州名称，用纵轴方向的`位置`区分各个州
  * 年龄段，用不同的`颜色`区分不同年龄段的人口
  * 人口数量，用每个矩形的`长度`来表示人口数量的大小，每个州不同年龄段的人口堆叠起来，可以看到整个州总的人口


## 堆叠柱状图和其他图表的对比

### 堆叠柱状图和[一般柱状图](bar.html)

* 堆叠柱状图可以增加一个维度，用于对比一组数据内不同分类的数据值大小，可以表示 3 个数据字段（维度）的数据
* 一般柱状图只能表示 2 个数据字段（维度）

### 堆叠柱状图和[堆叠区域图](stacked-area.html)

* 堆叠柱状图主和堆叠区域图都能表示3个维度的数据，
* 堆叠柱状图用于表示2个分类数据字段， 1 个连续数据字段，主要展示分类之间的对比
* 堆叠区域图用于表示1个分类字段， 2 个连续字段，主要展示在一个连续（有序）区间内不同分类大小（比例）的变化趋势。

### 堆叠柱状图和[分组柱状图](multi-set-bar.html)

* 堆叠柱状图和分组柱状图都可以对比同一个分组内部不同分类的数据大小，
* 分组柱状图，可以对比不同分组内相同分类的数据大小，但无法对比不同分组的总体数据大小
* 堆叠柱状图，可以对比不同分组的总体数据大小，但不适合对比不同分组内相同分类的数据大小，因为不同分组内的相同分类处于不同的基准线上

