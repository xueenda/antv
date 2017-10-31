<!--
title: 环图
tags:
  - proportion
variations:
  - pie
  - rose
  - sunburst
-->

# 环图

<img src="https://os.alipayobjects.com/rmsportal/LviFnOknmSGUCHZ.png" />

## 环图的简介

环图（又叫做甜甜圈图），其本质是饼图将中间区域挖空。

虽然如此，环图还是有它一点微小的优点。饼图的整体性太强，我们会将注意力集中在比较饼图内各个扇形之间占整体比重的关系。但如果我们将两个饼图放在一起，饼图很难同时对比两个图。

环图在解决上述问题时，采用了让我们更关注长度而不是面积的做法。这样我们就能相对简单的对比不同的环图。

同时环图相对于饼图空间的利用率更高，比如我们可以使用它的空心区域显示文本信息，比如标题等。

英文名：Donut chart

## 环图的构成

<img src="https://os.alipayobjects.com/rmsportal/mlFSJKDawodypht.png" class="constitute-img">

<table class="struct-table">
  <tr>
    <th>图表类型</th>
    <th>饼图</th>
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
    <td>分类数据字段映射到环形的颜色<br>连续数据字段映射到环形的角度
  </tr>
  <tr>
    <td>适合的数据条数</td>
    <td>不超过9条数据</td>
  </tr>
</table>

<div style="clear:both;"></div>

## 环图的应用场景

### 适合的场景

例子1：**展示分类的占比情况**这种用法与饼图类似，下图是一个游戏公司的销售情况：

|genre（游戏类型） |sold（销售量）|
|------|----|
|Sports|27,500|
|Strategy|11,500|
|Action|6,000|
|Shooter|3,500|
|Other|1,500|

<div id="c5"></div>

```js-
  var data = [
    {genre:'Sports',sold:27500},
    {genre:'Strategy',sold:11500},
    {genre:'Action',sold:6000},
    {genre:'Shooter',sold:3500},
    {genre:'Other',sold:1500},
  ];
  var dv = new DataSet.View().source(data);
  dv.transform({
    type: 'percent',
    field: 'sold',
    dimension: 'genre',
    as: 'percent'
  });
  function formatter(text,item){
      var point = item.point; // 每个弧度对应的点
      var percent = point.percent;
      percent = (percent * 100).toFixed(2) + '%';
      return percent;
  }
  var chart = new G2.Chart({
    container: 'c5',
    forceFit: true,
    height : 400
  });

  chart.source(dv);
  chart.legend('bottom');

  chart.coord('theta',{
    radius: 0.8,
    innerRadius: 0.65
  });

  chart.intervalStack()
    .position('percent')
    .color('genre')
    .label('genre',{renderer: formatter});
  chart.render();
```

### 不适合的场景

例子1: **分类过多的场景**下图是各个省的人口的占比情况，因为这张图上包含的分类过多，很难清晰对比各个省份的人口数据占比情况，所以这种情况下，我们推荐使用[横向柱状图](bar.html)。

<div id="c3"></div>

```js-
  var data = [
    {province:'北京市',population:19612368},
    {province:'天津市',population:12938693},
    {province:'河北省',population:71854210},
    {province:'山西省',population:27500},
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
  var dv = new DataSet.View().source(data);
  dv.transform({
    type: 'percent',
    field: 'population',
    dimension: 'province',
    as: 'percent'
  });

  var chart = new G2.Chart({
    container : 'c3',
    forceFit: true,
    height : 350,
  });

  chart.source(dv);
  chart.coord('theta', {radius: 0.8,innerRadius: 0.65});
  chart.intervalStack()
    .position('percent')
    .color('province')
    .label('province');

  chart.render();
```

例子2: **分类占比差别不明显的场景**
下图中游戏公司的不同种类的游戏的销售量相近，所以不太适合使用环图，此时可以使用[柱状图](bar.html)。

<div id="c4"></div>

```js-
  var data = [
    {genre:'Sports',sold:15000},
    {genre:'Strategy',sold:14900},
    {genre:'Action',sold:15050},
    {genre:'Shooter',sold:13000},
    {genre:'Other',sold:13900}
  ];
  var dv = new DataSet.View().source(data);
  dv.transform({
    type: 'percent',
    field: 'sold',
    dimension: 'genre',
    as: 'percent'
  });

  function formatter(text,item){
      var point = item.point; // 每个弧度对应的点
      return (item.percent * 100).toFixed(2) + '%';
  }

  var chart = new G2.Chart({
    container: 'c4',
    forceFit: true,
    height : 350
  });

  chart.source(dv);
  chart.coord('theta',{
    radius: 0.8,
    innerRadius: 0.65
  });
  chart.legend('bottom');

  chart.intervalStack()
    .position('percent')
    .color('genre');
  chart.render();
```

## 环图的扩展

例子1：** 分面环图 **使用G2的分面功能，可以将分组数据绘制成多个环图

下图展示了全球最大1000家银行所在地区在2007年和2011年的利润总额占比情况：

|年份 |地区|利润总额（亿美金）
|------|----|----|
|2007|亚太地区|1485.54
|2007|非洲及中东|330.12
|2007|拉丁美洲|196.5
|……|……|……
|2011|亚太地区|4107.18
|2011|非洲及中东|495.3
|2011|拉丁美洲|495.3
|……|……|……

<div id="c6"></div>

```js-
  var profit2007 = 7860;
  var profit2011 = 7620;
  var data = [
    {year:2007, area:'亚太地区', profit: 7860*0.189},
    {year:2007, area:'非洲及中东', profit: 7860*0.042},
    {year:2007, area:'拉丁美洲', profit: 7860*0.025},
    {year:2007, area:'中欧和东欧', profit: 7860*0.018},
    {year:2007, area:'西欧', profit: 7860*0.462},
    {year:2007, area:'北美', profit: 7860*0.265},
    {year:2011, area:'亚太地区', profit: 7620*0.539},
    {year:2011, area:'非洲及中东', profit: 7620*0.065},
    {year:2011, area:'拉丁美洲', profit: 7620*0.065},
    {year:2011, area:'中欧和东欧', profit: 7620*0.034},
    {year:2011, area:'西欧', profit: 7620*0.063},
    {year:2011, area:'北美', profit: 7620*0.234}
  ];
  var dv = new DataSet.View().source(data);
  dv.transform({
    type: 'percent',
    field: 'profit',
    dimension: 'area',
    groupBy: 'year',
    as: 'percent'
  });

  var chart = new G2.Chart({
    id: 'c6',
    forceFit: true,
    height: 500,
    padding: 0
  });
  chart.source(dv);
  chart.legend('bottom');
  chart.facet('list', {
    fields: [ 'year' ],
    cols: 2,
    padding: 30,
    eachView: function (view, facet) {
      view.coord('theta',{radius: 0.8,innerRadius: 0.65});
      view.intervalStack().position('percent').color('area');
      var sum = 0;
      facet.data.forEach(function(row) {
        sum += row.profit;
      });
      view.guide().text({
        position: [0, 0],
        offsetX: -30,
        offsetY: 70,
        content: sum.toFixed(0) + '（亿美元）',
      });
    }
  });

  chart.render();
```
