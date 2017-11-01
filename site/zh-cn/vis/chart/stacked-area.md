<!--
title: 层叠面积图
tags:
  - compare
  - proportion
  - trend
  - range
  - time
variations:
  - line
  - area
  - stream
-->

# 层叠面积图

<img src="https://os.alipayobjects.com/rmsportal/TYxCcNYhDgXdQed.jpg" />

## 层叠面积图的简介

层叠面积图和基本[面积图](area.html)一样，唯一的区别就是图上每一个数据集的起点不同，起点是基于前一个数据集的，用于显示每个数值所占大小随时间或类别变化的趋势线，展示的是部分与整体的关系。

层叠面积图上的最大的面积代表了所有的数据量的总和，是一个整体。各个叠起来的面积表示各个数据量的大小，这些堆叠起来的面积图在表现大数据的总量分量的变化情况时格外有用，所以层叠面积图不适用于表示带有负值的数据集。非常适用于对比多变量随时间变化的情况。

在层叠面积图的基础之上，将各个面积的因变量的数据使用加和后的总量进行归一化就形成了百分比层叠面积图。该图并不能反映总量的变化，但是可以清晰的反应每个数值所占百分比随时间或类别变化的趋势线，对于分析自变量是大数据、时变数据、有序数据时各个指标分量占比极为有用。

英文名：Stacked Area Graph

## 层叠面积图的构成

<img class="constitute-img" src="https://t.alipayobjects.com/images/T1g54jXlXhXXXXXXXX.png" />

<table class="struct-table">
  <tr>
    <th>图表类型</th>
    <th>层叠面积图</th>
  </tr>
  <tr>
    <td>适合的数据</td>
    <td>一个分类字段数据，两个连续字段数据</td>
  </tr>
  <tr>
    <td>功能</td>
    <td>对比每个分组数据的变化<code>趋势</code></td>
  </tr>
  <tr>
    <td>数据与图形的映射</td>
    <td>
      两个连续字段分别映射到横轴和纵轴<br>另一个分类数据映射到图形的颜色
    </td>
  </tr>
  <tr>
    <td>适合的数据条数</td>
    <td>映射到颜色的分类不超过12个;每种分类的数据不少于两条</td>
  </tr>
</table>

<div style="clear:both;"></div>

## 层叠面积图的应用场景

### 适合场景

例子1：**百分比层叠面积图**。下图显示的是近几个月安卓手机各个版本在市场的占比情况。

date（日期）| value （占比）| name (版本号)
------|-------|------
2015-04|4.975|4.1.1
2015-04|8.4317|4.1.2
2015-04|4.6018|4.2.1
2015-04|18.2945|4.2.2
。。。|。。。|。。。

<div id="c1"></div>

```js-
$.getJSON('/assets/data/android.json',function (data) {
    var dv = new DataSet.View().source(data);
    dv.transform({
      type: 'percent',
      field: 'value',
      dimension: 'name',
      groupBy: 'date',
      as: 'percent'
    });
    var chart = new G2.Chart({
      container: 'c1',
      forceFit: true,
      height: 600
    });
    chart.scale('name', {
      alias: '版本号'
    });
    chart.scale('date',{
      type: 'time',
      nice: false,
      mask: 'YYYY/M',
      alias: '月份'
    });

    chart.source(dv);
    chart.scale('percent',{
      alias: '市场占比',
      max:1,
      formatter: function(val) {
        return parseInt(val * 100) + '%';
      }
    });
    chart.areaStack().position('date*percent').color('name');
    chart.render();
});
```

<div style="clear: both"></div>

示例2：游戏公司在2001，2002，2003，2004 几年内不同分类的游戏的销售情况：

year（年份）|genre（游戏类型） |sold（销售量）|
----|------|----
2001|Strategy|11,500
2001|Action|6,000
2001|Shooter|3,500
2001|Other|1,500
2002|Strategy|10,500
2002|Action|8,000
2002|Shooter|4,500
2002|Other|1,800
...|...|...


<div id="c2"></div>

```js-
  var data = [
    {year:2001,genre:'Strategy',sold:11500},
    {year:2001,genre:'Sports',sold:27500},
    {year:2001,genre:'Action',sold:6000},
    {year:2001,genre:'Shooter',sold:3500},
    {year:2001,genre:'Other',sold:1500},

    {year:2002,genre:'Sports',sold:29500},
    {year:2002,genre:'Strategy',sold:10500},
    {year:2002,genre:'Action',sold:8000},
    {year:2002,genre:'Shooter',sold:4500},
    {year:2002,genre:'Other',sold:1800},

    {year:2003,genre:'Sports',sold:30500},
    {year:2003,genre:'Strategy',sold:12500},
    {year:2003,genre:'Action',sold:4000},
    {year:2003,genre:'Shooter',sold:6500},
    {year:2003,genre:'Other',sold:2000},

    {year:2004,genre:'Sports',sold:31500},
    {year:2004,genre:'Strategy',sold:14500},
    {year:2004,genre:'Action',sold:5000},
    {year:2004,genre:'Shooter',sold:6800},
    {year:2004,genre:'Other',sold:1800},
  ];

  var Stat = G2.Stat;

  var chart1 = new G2.Chart({
    container: 'c2',
    forceFit: true,
    height : 400,
  });

  chart1.source(data);
  chart1.scale('year',{alias: "年份", tickInterval: 1, nice: false});
  chart1.scale('sold',{alias: "销售量",formatter: function(val) {
    return val/1000 + 'k';
  }});
  chart1.scale('genre',{alias: "游戏类型"});
  chart1.areaStack().position('year*sold').color('genre');
  chart1.render();
```

### 不适合的场景

例子1：**分类数据的比较不要使用[面积图](area.html)。**

前面的示例中的游戏销售情况，比较的是4年的游戏销售情况，如果用于比较各个游戏类型的销售情况时，使用面积图不太合适，此时应该使用层叠柱状图。

<div id="c4"><div class="wrong tip">错误</div></div>
<div id="c5"><div class="right tip">正确</div></div>
<div style="clear: both;"></div>

```js-
  var data = [
    {year:2001,genre:'Strategy',sold:11500},
    {year:2001,genre:'Sports',sold:27500},
    {year:2001,genre:'Action',sold:6000},
    {year:2001,genre:'Shooter',sold:3500},
    {year:2001,genre:'Other',sold:1500},

    {year:2002,genre:'Sports',sold:29500},
    {year:2002,genre:'Strategy',sold:10500},
    {year:2002,genre:'Action',sold:8000},
    {year:2002,genre:'Shooter',sold:4500},
    {year:2002,genre:'Other',sold:1800},

    {year:2003,genre:'Sports',sold:30500},
    {year:2003,genre:'Strategy',sold:12500},
    {year:2003,genre:'Action',sold:4000},
    {year:2003,genre:'Shooter',sold:6500},
    {year:2003,genre:'Other',sold:2000},

    {year:2004,genre:'Sports',sold:31500},
    {year:2004,genre:'Strategy',sold:14500},
    {year:2004,genre:'Action',sold:5000},
    {year:2004,genre:'Shooter',sold:6800},
    {year:2004,genre:'Other',sold:1800},
  ];

  var Stat = G2.Stat;

  var chart1 = new G2.Chart({
    id: 'c4',
    forceFit: true,
    height: 300,
  });

  chart1.source(data);
  chart1.scale('year',{type:'cat', alias: "年份"});
  chart1.scale('sold',{alias: "销售量",formatter: function(val) {
    return val/1000 + 'k';
  }});
  chart1.scale('genre',{alias: "游戏类型"});
  chart1.areaStack().position('genre*sold').color('year');
  chart1.render();

  var chart2 = new G2.Chart({
    id: 'c5',
    forceFit: true,
    height : 300,
  });

  chart2.source(data);
  chart2.scale('year',{type:'cat', alias: "年份"});
  chart2.scale('sold',{alias: "销售量"});
  chart2.scale('genre',{alias: "游戏类型"});
  chart2.intervalStack().position('genre*sold').color('year');
  chart2.render();
```

## 与其他图表的对比

### 与[面积图](area.html)的对比

* 层叠面积图是一种特殊的面积图，都是表现数据在连续一段时间、一个数据区间内的趋势
* 层叠面积图侧重于表现不同时间段（数据区间）的多个分类累加值之间的趋势
* 百分比层叠面积图表现不同时间段（数据区间）的多个分类占比的变化趋势

### 与[层叠柱状图](stacked-bar)的对比

* 层叠柱状图和层叠面积图都可以呈现不同分类的累加值
* 层叠柱状图和层叠面积图的差别在于，层叠面积图的x轴上只能表示连续数据（时间或者数值），层叠柱状图的x轴上只能表示分类数据

