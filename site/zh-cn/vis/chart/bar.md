<!--
title: 柱状图
tags:
  - compare
variations:
  - histogram
  - multi-set-bar
  - stacked-bar
  - radial-bar
-->

# 柱状图

<img src="https://os.alipayobjects.com/rmsportal/plYGbgHxHvwbRGu.jpg" />

## 柱状图的简介

典型的柱状图（又名条形图），使用垂直或水平的柱子显示类别之间的数值比较。其中一个轴表示需要对比的分类维度，另一个轴代表相应的数值。

柱状图有别于[直方图](./histogram.html)，柱状图无法显示数据在一个区间内的连续变化趋势。柱状图描述的是分类数据，回答的是每一个分类中“有多少？”这个问题。
需要注意的是，当柱状图显示的分类很多时会导致分类名层叠等显示问题，下面我们会举例说明。

英文名：Column chart, Bar chart

## 柱状图的构成

### 纵向柱状图

<img src="https://os.alipayobjects.com/rmsportal/vPIGfeGBMiSOMdw.png" class="constitute-img"/>

<table class="struct-table">
  <tr>
    <th>图表类型</th>
    <th>纵向柱状图</th>
  </tr>
  <tr>
    <td>适合的数据</td>
    <td>列表：一个分类数据字段、一个连续数据字段</td>
  </tr>
  <tr>
    <td>功能</td>
    <td>对比分类数据的数值大小</td>
  </tr>
  <tr>
    <td>数据与图形的映射</td>
    <td>分类数据字段映射到横轴的位置<br>连续数据字段映射到矩形的高度 <br>分类数据也可以设置颜色增强分类的区分度</td>
  </tr>
  <tr>
    <td>适合的数据条数</td>
    <td>不超过 12 条数据</td>
  </tr>
</table>

<div style="clear: both;"></div>

### 横向柱状图 （条形图）

<img src="https://os.alipayobjects.com/rmsportal/GKHcMOgXwrnDSAa.png" class="constitute-img"/>


<table class="struct-table">
  <tr>
    <th>图表类型</th>
    <th>横向柱状图</th>
  </tr>
  <tr>
    <td>适合的数据</td>
    <td>列表：一个分类数据字段、一个连续数据字段</td>
  </tr>
  <tr>
    <td>功能</td>
    <td>对比分类数据的数值大小</td>
  </tr>
  <tr>
    <td>数据与图形的映射</td>
    <td>分类数据字段映射到纵轴的位置<br>连续数据字段映射到矩形的宽度</td>
  </tr>
  <tr>
    <td>适合的数据条数</td>
    <td>不超过 30 条数据</td>
  </tr>
</table>


<div style="clear: both;"></div>


## 柱状图的应用场景

### 适合的场景

例子1: **适合应用到分类数据对比。**下图是一个游戏销量的图表，展示不同游戏类型的销量对比。

|genre（游戏类型） |sold（销售量）|
|------|----|
|Sports|27,500|
|Strategy|11,500|
|Action|6,000|
|Shooter|3,500|
|Other|1,500|

<div id="c3"></div>

<div class="code hide">

  var data = [
    {genre:'Sports',sold:27500},
    {genre:'Strategy',sold:11500},
    {genre:'Action',sold:6000},
    {genre:'Shooter',sold:3500},
    {genre:'Other',sold:1500},
  ];

  var Stat = G2.Stat;

  var chart = new G2.Chart({
    id: 'c3',
    forceFit: true,
    height : 400
  });

  chart.source(data);

  chart.intervalStack().position('genre*sold').color('genre')
  chart.render();
</div>

说明：
 * genre 字段，同时使用了`位置`和`颜色`用于区分不同的游戏类型
 * sold 字段，使用矩形的`长度`，表示销售量的大小

### 不适合的场景

例子1：**分类太多不适合使用纵向柱状图。**如对比不同省份的人口数量。分类情况过多时，柱状图的文本为了排布合理，需要进行旋转，不利于阅读，相比于纵向柱状图，横向柱状图更适用于此类分类较多的场景。


|province（省份） |population（人口数量）
|------|----
|北京市| 19612368
|天津市| 12938693
|河北省| 71854210
|...| ...

<div id="c5"></div>

使用横向柱状图，文本可以横向排布，便于用户的阅读，效果如下：

<div id="c6"></div>


<div class="code hide">

  var data = [
  {province:'北京市',population:19612368},
  {province:'天津市',population:12938693},
  {province:'河北省',population:71854210},
  {province:'山西省',population:27500000},
  {"province":"内蒙古自治区","population":24706291},
  {"province":"辽宁省","population":43746323},
  {"province":"吉林省","population":27452815},
  {"province":"黑龙江省","population":38313991},
  {"province":"上海市","population":23019196},{"province":"江苏省","population":78660941},
  {"province":"浙江省","population":54426891},{"province":"安徽省","population":59500468},
  {"province":"福建省","population":36894217},{"province":"江西省","population":44567797},
  {"province":"山东省","population":95792719},{"province":"河南省","population":94029939},
  {"province":"湖北省","population":57237727},{"province":"湖南省","population":65700762},
  {"province":"广东省","population":104320459},{"province":"广西壮族自治区","population":46023761},
  {"province":"海南省","population":8671485},{"province":"重庆市","population":28846170},
  {"province":"四川省","population":80417528},{"province":"贵州省","population":34748556},
  {"province":"云南省","population":45966766},{"province":"西藏自治区","population":3002165},
  {"province":"陕西省","population":37327379},{"province":"甘肃省","population":25575263},
  {"province":"青海省","population":5626723}
];


var Stat = G2.Stat;
var Frame = G2.Frame;
var frame = new Frame(data);
frame = Frame.sort(frame, 'population');

var chart = new G2.Chart({
  id : 'c5',
  forceFit: true,
  height : 400,
  plotCfg: {
    margin: [20,20,100,100]
  }
});

chart.axis('province',{
  title: null
});
chart.axis('population',{
  titleOffset: 150
});
chart.source(frame);
chart.interval().position('province*population');

chart.render();

var chart2 = new G2.Chart({
  id : 'c6',
  forceFit: true,
  height : 800,
  plotCfg: {
    margin: [10,30,50,120]
  }

});

chart2.source(frame);
chart2.axis('province',{
  title: null
});
chart2.coord('rect').transpose();

chart2.interval().position('province*population');

chart2.render();

</div>

例子2：**不适合表示趋势**
柱状图使用矩形的长度（宽度）来对比分类数据的大小，非常方便临近的数据进行大小的对比，不适合展示连续数据的趋势。下图本想展示 ACME 这只股票在 2015 年 9 月份整个月的每日的价格走势，但是效果不尽人意。

<div id="c7"></div>

随着有序的时间变化的数值趋势，更适合使用[折线图](line.html)或者[区域图](area.html)

<div id="c71"></div>

<div class="code hide">
var data= [
    {"day": '2015/9/1',  "share": 10},
    {"day": '2015/9/2',  "share": 12},
    {"day": '2015/9/3',  "share": 11},
    {"day": '2015/9/4',  "share": 15},
    {"day": '2015/9/5',  "share": 20},
    {"day": '2015/9/6',  "share": 22},
    {"day": '2015/9/7',  "share": 21},
    {"day": '2015/9/8',  "share": 25},
    {"day": '2015/9/9',  "share": 31},
    {"day": '2015/9/10', "share": 32},
    {"day": '2015/9/11', "share": 28},
    {"day": '2015/9/12', "share": 29},
    {"day": '2015/9/13', "share": 40},
    {"day": '2015/9/14', "share": 41},
    {"day": '2015/9/15', "share": 45},
    {"day": '2015/9/16', "share": 50},
    {"day": '2015/9/17', "share": 65},
    {"day": '2015/9/18', "share": 45},
    {"day": '2015/9/19', "share": 50},
    {"day": '2015/9/20', "share": 51},
    {"day": '2015/9/21', "share": 65},
    {"day": '2015/9/22', "share": 60},
    {"day": '2015/9/23', "share": 62},
    {"day": '2015/9/24', "share": 65},
    {"day": '2015/9/25', "share": 45},
    {"day": '2015/9/26', "share": 55},
    {"day": '2015/9/27', "share": 59},
    {"day": '2015/9/28', "share": 52},
    {"day": '2015/9/29', "share": 53},
    {"day": '2015/9/30', "share": 40}
  ];

  var Stat = G2.Stat;
  var chart = new G2.Chart({
    id: 'c7',
    forceFit: true,
    height: 350,
    plotCfg: {
      margin: [20, 85,80,80]
    }
  });
  chart.source(data);
  chart.col('day', {
    type: 'timeCat',
    tickCount: 10,
    nice: false,
    mask: 'm/d',
    alias: 'Month/Day'
  });
  chart.col('share', {
    alias: 'The Share Price',
    formatter: function(val) {
      return '$' + val;
    }
  });
  chart.tooltip({
    crosshairs: true
  });
  chart.interval().position('day*share');
  chart.render();

  var chart = new G2.Chart({
    id: 'c71',
    forceFit: true,
    height: 350,
    plotCfg: {
      margin: [20, 85,80,80]
    }
  });
  chart.source(data);
  chart.col('day', {
    type: 'timeCat',
    tickCount: 10,
    nice: false,
    mask: 'm/d',
    alias: 'Month/Day'
  });
  chart.col('share', {
    alias: 'The Share Price',
    formatter: function(val) {
      return '$' + val;
    }
  });
  chart.tooltip({
    crosshairs: true
  });
  chart.area().position('day*share');
  chart.line().position('day*share').size(5);
  chart.render();
</div>


## 柱状图与其他图表的对比

### 柱状图和[折线图](line.html)、[饼图](pie.html)

* 柱状图主要用于多个分类间的数据（大小、数值）的对比
* 折线图主要用于展示连续数值（例如时间）或者有序分类的变化趋势
* 饼图主要是展示分类之间的占比情况


### 柱状图和[南丁格尔图（玫瑰图）](rose.html)

* 南丁格尔图（玫瑰图）通过半径的大小来对比数据
* 柱状图根据矩形的长度来对比数据


