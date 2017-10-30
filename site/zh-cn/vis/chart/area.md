<!--
title: 面积图
tags:
  - trend
  - time
variations:
  - line
  - stacked-area
-->

# 面积图

<img src="https://os.alipayobjects.com/rmsportal/nkiIDyezJdjrZeZ.jpg" />

## 面积图的简介

面积图又叫区域图。
它是在[折线图](line.html)的基础之上形成的, 它将折线图中折线与自变量坐标轴之间的区域使用颜色或者纹理填充，这样一个填充区域我们叫做`面积`，颜色的填充可以更好的突出趋势信息，需要注意的是颜色要带有一定的透明度，透明度可以很好的帮助使用者观察不同序列之间的重叠关系，没有透明度的面积会导致不同序列之间相互遮盖减少可以被观察到的信息。

和折线图一样，面积图也用于强调数量随时间而变化的程度，也可用于引起人们对总值趋势的注意。他们最常用于表现趋势和关系,而不是传达特定的值。

面积图有两种常用的类型：

1. 一般面积图：所有的数据都从相同的零轴开始。
2. [层叠面积图](./stacked-area.html)：每一个数据集的起点不同，都是基于前一个数据集。用于显示每个数值所占大小随时间或类别变化的趋势线，堆叠起来的面积图在表现大数据的总量分量的变化情况时格外有用。另外还有百分比层叠面积图，用于显示每个数值所占百分比随时间或类别变化的趋势线。可强调每个系列的比例趋势线。

英文名：Area Graph

## 面积图的构成

<img class="constitute-img" src="https://t.alipayobjects.com/images/T1OPXjXb4gXXXXXXXX.png" />

<table class="struct-table">
  <tr>
    <th>图表类型</th>
    <th>面积图</th>
  </tr>
  <tr>
    <td>适合的数据</td>
    <td>两个连续字段数据</td>
  </tr>
  <tr>
    <td>功能</td>
    <td>观察数据变化<code>趋势</code></td>
  </tr>
  <tr>
    <td>数据与图形的映射</td>
    <td>两个连续字段分别映射到横轴和纵轴
    </td>
  </tr>
  <tr>
    <td>适合的数据条数</td>
    <td>大于两条</td>
  </tr>
</table>

<div class="clearfix"></div>

## 面积图的应用场景

### 适合的场景

例子1：**展示时间维度上变化的值。** 例如在股票市场上，将股票(或指数)的逐日收市价使用去面积图来表示，用来展示股市大致上的趋势。下图展示了 ACME 这只股票在 2015 年 9 月份整个月的每日的价格走势。[数据来源：AnyChart](http://www.anychart.com/)

day（日期） | share (股票指数)
----|----
2015/9/1|10
2015/9/2|12
2015/9/3|11
。。。|。。。

<div id="c1"></div>

```js-
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

  var chart = new G2.Chart({
    id: 'c1',
    forceFit: true,
    height: 350,
  });
  chart.source(data);
  chart.scale('day', {
    type: 'timeCat',
    tickCount: 10,
    nice: false,
    mask: 'YYYY/MM/DD',
    alias: 'Year/Month/Day'
  });
  chart.scale('share', {
    alias: 'The Share Price',
    formatter: function(val) {
      return '$' + val;
    }
  });
  chart.tooltip({
    crosshairs: true
  });
  chart.area().position('day*share');
  chart.line().position('day*share').size(2.5);
  chart.render();
```

例子2：**包含多组值。**下图使用区域图展示了 1986 至 2005 年 ACME 和其竞争对手每年的股票价格对比。[数据来源：AnyChart](http://www.anychart.com/)

year (年)|ACME （Acme公司的指数）|Compitor （竞争公司的指数）
----|----|-----
1986|162|42
1987|134|54
1988|116|26
。。。|。。。|。。。

<div id="c11"></div>

```js-
  var data= [
    {"year": "1986", "ACME": 162, "Compitor": 42},
    {"year": "1987", "ACME": 134, "Compitor": 54},
    {"year": "1988", "ACME": 116, "Compitor": 26},
    {"year": "1989", "ACME": 122, "Compitor": 32},
    {"year": "1990", "ACME": 178, "Compitor": 68},
    {"year": "1991", "ACME": 144, "Compitor": 54},
    {"year": "1992", "ACME": 125, "Compitor": 35},
    {"year": "1993", "ACME": 176, "Compitor": 66},
    {"year": "1994", "ACME": 156},
    {"year": "1995", "ACME": 195, "Compitor": 120},
    {"year": "1996", "ACME": 215, "Compitor": 115},
    {"year": "1997", "ACME": 176, "Compitor": 36},
    {"year": "1998", "ACME": 167, "Compitor": 47},
    {"year": "1999", "ACME": 142, "Compitor": 72},
    {"year": "2000", "ACME": 117, "Compitor": 37},
    {"year": "2001", "ACME": 113, "Compitor": 23},
    {"year": "2002", "ACME": 132},
    {"year": "2003", "ACME": 146, "Compitor": 46},
    {"year": "2004", "ACME": 169, "Compitor": 59},
    {"year": "2005", "ACME": 184, "Compitor": 44}
  ];

  var dv = new DataSet.View().source(data);
  dv.transform({
    type: 'fold',
    fields: [ 'ACME', 'Compitor' ],
    key: 'type',
    value: 'value'
  });

  var chart = new G2.Chart({
    id: 'c11',
    forceFit: true,
    height: 350,
  });
  chart.source(dv);
  chart.scale('value', {
    alias: 'The Share Price in Dollars',
    formatter: function(val) {
      return '$' + val;
    }
  });

  chart.tooltip({
    crosshairs: true
  });
  chart.area().position('year*value').color('type').shape('smooth');
  chart.line().position('year*value').color('type').size(2.5).shape('smooth');
  chart.render();
```

说明：

* year：年份字段映射到 x 轴，使用x轴方向位置区分不同的年份
* ACME， Compitor 的值映射到 y 轴，使用y轴的值区分不同的股票指数
* ACME 和 Compitor 使用`颜色`进行区分，各自形成面积图
* 面积图都设置了透明度，保证覆盖的时候能够被识别

<div style="clear:both;"></div>

例子3：**带有负值。**下图显示的是某公司在 Florida、Texas、Nevada 三个城市 1996 年 至 2015 年的收益情况，通过垂直坐标轴的正负方向很形象得表现了公司的盈利亏损情况。[数据来源：AnyChart](http://www.anychart.com/)

year（年） | city（城市） | value（盈利亏损）
-----|-----|----
1996|Florida|322
1996|Texas|242
1996|Nevada|162
1997|Florida|324
。。。|。。。|。。。

<div id="c22"></div>

```js-
  var data= [
    {"Year": "1996", "Florida": 322, "Texas": 242, "Nevada": 162},
    {"Year": "1997", "Florida": 324, "Texas": 254, "Nevada": 90},
    {"Year": "1998", "Florida": 329, "Texas": 226, "Nevada": 50},
    {"Year": "1999", "Florida": 342, "Texas": 232, "Nevada": 77},
    {"Year": "2000", "Florida": 348, "Texas": 268, "Nevada": 35},
    {"Year": "2001", "Florida": 334, "Texas": 254, "Nevada": -45},
    {"Year": "2002", "Florida": 325, "Texas": 235, "Nevada": -88},
    {"Year": "2003", "Florida": 316, "Texas": 266, "Nevada": -120},
    {"Year": "2004", "Florida": 318, "Texas": 288, "Nevada": -156},
    {"Year": "2005", "Florida": 330, "Texas": 220, "Nevada": -123},
    {"Year": "2006", "Florida": 355, "Texas": 215, "Nevada": -88},
    {"Year": "2007", "Florida": 366, "Texas": 236, "Nevada": -66},
    {"Year": "2008", "Florida": 337, "Texas": 247, "Nevada": -45},
    {"Year": "2009", "Florida": 352, "Texas": 172, "Nevada": -29},
    {"Year": "2010", "Florida": 377, "Texas": 37,  "Nevada":-45},
    {"Year": "2011", "Florida": 383, "Texas": 23,  "Nevada":-88},
    {"Year": "2012", "Florida": 344, "Texas": 34,  "Nevada":-132},
    {"Year": "2013", "Florida": 366, "Texas": 46,  "Nevada":-146},
    {"Year": "2014", "Florida": 389, "Texas": 59,  "Nevada":-169},
    {"Year": "2015", "Florida": 334, "Texas": 44,  "Nevada":-184}
  ];

  var dv = new DataSet.View().source(data);
  dv.transform({
    type: 'fold',
    fields: [ 'Florida','Texas','Nevada' ],
    key: 'City',
    value: 'Profit'
  });

  var chart = new G2.Chart({
    id: 'c22',
    forceFit: true,
    height: 350,
  });
  chart.source(dv);
  chart.scale('Profit', {
    alias: 'Profit in Dollars',
    formatter: function(val) {
      return val + 'k';
    }
  });
  chart.tooltip({
    crosshairs: true
  });
  chart.area().position('Year*Profit').color('City');
  chart.line().position('Year*Profit').color('City').size(2.5);
  chart.render();
```

说明：

* year：年份使用`位置`进行区分，映射到x轴
* value: 盈利亏损值，使用`位置`进行比较数值的大小，映射到y轴
* city: 不同的城市使用 `颜色`进行区分，形成不同的面积图

<div style="clear: both"></div>

### 不适合的场景

面积图不适合不同分类之间的数值比较，下图是不同游戏类型的销售情况

|genre（游戏类型） |sold（销售量）|
|------|----|
|Sports|27,500|
|Strategy|11,500|
|Action|6,000|
|Shooter|3,500|
|Other|1,500|

<div id="c3" style="position: relative;">
  <div class="wrong tip">错误</div>
</div>

```js-
  var data = [
    {genre:'Shooter',sold:3500},
    {genre:'Sports',sold:27500},
    {genre:'Strategy',sold:11500},
    {genre:'Action',sold:6000},
    {genre:'Other',sold:1500},
  ];

  var Stat = G2.Stat;

  var chart = new G2.Chart({
    id: 'c3',
    forceFit: true,
    height : 400
  });

  chart.source(data);

  chart.area().position('genre*sold')
  chart.render();
```

不适合的原因：

* 游戏类型之间没有递进关系，所以面积图在这种情况下无法表示趋势

## 面积图的扩展

如果数值存在上下限，例如用一个时间的温度存在最大值、最小值，此时面积图的填充由最大值、最小值决定

time（时间）|min(最小温度)|max（最大温度）
----|----|-----
07-01|14.3|27.7
07-02|14.5|27.8
07-03|15.5|29.6
。。。|。。。|。。。

<div id="c5"></div>

```js-
  var tmp = [
    [1246406400000, 14.3, 27.7],
    [1246492800000, 14.5, 27.8],
    [1246579200000, 15.5, 29.6],
    [1246665600000, 16.7, 30.7],
    [1246752000000, 16.5, 25.0],
    [1246838400000, 17.8, 25.7],
    [1246924800000, 13.5, 24.8],
    [1247011200000, 10.5, 21.4],
    [1247097600000, 9.2, 23.8],
    [1247184000000, 11.6, 21.8],
    [1247270400000, 10.7, 23.7],
    [1247356800000, 11.0, 23.3],
    [1247443200000, 11.6, 23.7],
    [1247529600000, 11.8, 20.7],
    [1247616000000, 12.6, 22.4],
    [1247702400000, 13.6, 19.6],
    [1247788800000, 11.4, 22.6],
    [1247875200000, 13.2, 25.0],
    [1247961600000, 14.2, 21.6],
    [1248048000000, 13.1, 17.1],
    [1248134400000, 12.2, 15.5],
    [1248220800000, 12.0, 20.8],
    [1248307200000, 12.0, 17.1],
    [1248393600000, 12.7, 18.3],
    [1248480000000, 12.4, 19.4],
    [1248566400000, 12.6, 19.9],
    [1248652800000, 11.9, 20.2],
    [1248739200000, 11.0, 19.3],
    [1248825600000, 10.8, 17.8],
    [1248912000000, 11.8, 18.5],
    [1248998400000, 10.8, 16.1]
  ];

  var data = tmp.map(function(subArr){
    return {
      time: subArr[0],
      min: subArr[1],
      max: subArr[2],
      sum: subArr[1] + subArr[2]
    };
  });

  var chart = new G2.Chart({
    id: 'c5',
    forceFit: true,
    height : 400,
    animate:false
  });

  chart.source(data, {
    time: {
      type:'time',
      mask: 'MM-DD'
    },
    min: {
      alias: '最低温度'
    },
    max: {alias: '最高温度'},
    'min+max': {alias: '温度范围'}
  });

  chart.area().position('time*sum').tooltip('min*max');
  chart.render();
```

注意：

* time: 时间通过x轴方向的`位置`来区分
* min,max: 最小温度、最大温度作为面积图的下限和上限通过y轴方向的位置来区分


## 面积图与其他图表的对比

### 面积图和[折线图](./line.html)

* 面积图和折线图都是展示时间或者连续数据上的趋势，折线图相互之间不进行遮盖，可以用于显示更多的记录。
* 面积图可以进行层叠，非常适合观察总量和分量的变化。

### 面积图和[柱状图](./bar.html)

* 面积图主要展示时间或者连续数据上的趋势，柱状图主要展示的是分类数据的对比。
* 面积图和柱状图都可以进行层叠，都可以观察总量和分量的变化，观察各个分量的占比。

## 查看[图表示例](/g2/demo/03-area/area-null.html)

