<!--
title: 分组柱状图
tags:
  - compare
variations:
  - bar
  - stacked-bar
-->

# 分组柱状图

<img src="https://os.alipayobjects.com/rmsportal/JKWwZiTPusAHqMg.jpg" >

## 分组柱状的简介

分组柱状图，又叫聚合柱状图。当使用者需要在同一个轴上显示各个分类下不同的分组时，需要用到分组柱状图。

跟[柱状图](./bar-chart.html)类似，使用柱子的高度来映射和对比数据值。每个分组中的柱子使用不同的颜色或者相同颜色不同透明的方式区别各个分类，各个分组之间需要保持间隔。

分组柱状图经常用于不同组间数据的比较，这些组都包含了相同分类的数据。

但是仍需要注意，避免分组中分类过多的情况，分类过多会导致分组中柱子过多过密，非常影响图表可读性。

英文名：Multi-set Bar Chart

## 分组柱状图的构成

<img src="https://os.alipayobjects.com/rmsportal/YzQNmhrLsOTZLfd.png" class="constitute-img">

<table class="struct-table">
  <tr>
    <th>图表类型</th>
    <th>分组柱状图</th>
  </tr>
  <tr>
    <td>适合的数据</td>
    <td>列表：两个分类数据字段、一个连续数据字段</td>
  </tr>
  <tr>
    <td>功能</td>
    <td>其中一个分类数据字段作为分组，可以对比相同分组下不同分类的数据大小，也可以对比不同分组下，相同分类的数据大小</td>
  </tr>
  <tr>
    <td>数据与图形的映射</td>
    <td>其中一个分类数据字段映射到坐标轴的位置用于分组，另一个分类数据在同一个分组内错开，并通过不同的颜色来区分连续数据字段映射到矩形的长度</td>
  </tr>
  <tr>
    <td>适合的数据条数</td>
    <td>分组个数不要超过 12 个，每个分组下的分类不要超过 6 个</td>
  </tr>
</table>

<div style="clear: both;"></div>


## 分组柱状图的应用场景

### 适合的场景

例子1：** 对比不同分组内相同分类的大小，对比相同分组内不同分类的大小 ** 

下图对比了『我是土豪』游戏公司在 2001、2002、2003 这三年的各类游戏的销量情况。
水平轴显示的是不同的游戏类型，每种游戏类型作为一个柱状图的分组，在每一个分组内对比不同年份的销售数量。

year（年份）|genre（游戏类型） |sold（销售量）|
----|------|----
2001|Sports|27,500
2001|Strategy|11,500
2001|Action|6,000
...|...|...
2002|Action|8,000
2002|Shooter|4,500
2002|Other|1,800
...|...|...

<div id="c1"></div>

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

var chart = new G2.Chart({
  container: 'c1',
  forceFit: true,
  height : 400
});

chart.source(data);
chart.scale('sold',{alias: '游戏销售量'});
chart.scale('genre',{alias: '游戏类型'});
chart.intervalDodge().position('genre*sold').color('year')
chart.render();
```

说明：
  * genre，使用横轴的`位置`来区分不同的游戏类型
  * year，使用`颜色`和在同一个游戏类型内的错开的`位置`，来区分不年份的游戏销售
  * sold，使用矩形的`长度`对比不同游戏、不同年份的销量

### 不适合的场景

例子1：**分组过多、分类过多**

下图展示了美国二十个州不同年龄段的人口数据分布情况。
我们以州为维度进行分组，每个分组内划分七个年龄段，垂直坐标轴表示人口数量。

<div id="c3"></div>

```js-
$.getJSON('/assets/data/population-by-age.json?nowrap', function(data) {
  var newData = data.slice(0,20);
  var dv = new DataSet.View().source(newData);
  dv.transform({
    type: 'fold',
    fields: ["小于5岁","5至13岁","14至17岁","18至24岁","25至44岁","45至64岁","65岁及以上"],
    key: '年龄段',
    value: '人口数量',
  });
  var chart = new G2.Chart({
    id: 'c3',
    forceFit: true,
    height : 400,
  });

  chart.source(dv);
  chart.intervalDodge().position('State*人口数量').color('年龄段');
  chart.render();
});
```

上图由于分组和分类过多导致柱子过多过密，可读性不佳。推荐使用层叠柱状图，当数据更多时，可将纵向柱状图改为横向柱状图，详见[层叠柱状图的的扩展](stacked-bar.html)

## 分组柱状图和其他图表的对比

### 分组柱状图和一般[柱状图](bar.html)

* 分组柱状图可以增加一个维度，用于对比一组数据内不同分类的数据值大小，可以表示3个数据字段（维度）的数据，而一般柱状图只能表示 2 个数据字段（维度）
* 分组柱状图的柱子较多，所以能展示的分组较少

### 分组柱状图和[层叠柱状图](stacked-bar.html)

* 分组柱状图，可以对比同一个分组内部不同分类的数据大小，也可以对比不同分组内相同分类的数据大小，但无法对比各分组的总量
* 层叠柱状图，可以对比同一个分组内部不同分类的数据大小或占比，也可以对比分组的总量，但不适合对比不同分组内相同分类的数据大小

