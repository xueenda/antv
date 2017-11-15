<!--
title: 分级统计地图
tags:
  - location
-->

# 分级统计地图

<img src="https://t.alipayobjects.com/images/T1G4djXeVfXXXXXXXX.png" />

## 分级统计地图的简介

分级统计地图是一种在地图分区上使用视觉符号（通常是颜色、阴影或者不同疏密的晕线）来表示一个范围值的分布情况的地图。在整个制图区域的若干个小的区划单元内（行政区划或者其他区划单位），根据各分区的数量（相对）指标进行分级，并用相应色级或不同疏密的晕线，反映各区现象的集中程度或发展水平的分布差别，最常见于选举和人口普查数据的可视化，这些数据以省、市登地理区域为单位。

此法因常用色级表示，所以也叫色级统计图法。地图上每个分区的数量使用不同的色级表示，较典型的方法有：（1）一个颜色到另一个颜色混合渐变；（2）单一的色调渐变；（3）透明到不透明；（4）明到暗；（5）用一个完整的色谱变化。Choropleth 地图依靠颜色等来表现数据内在的模式，因此选择合适的颜色非常重要，当数据的值域大或者数据的类型多样时，选择合适的颜色映射相当有挑战性。

Choropleth 地图最大的问题在于数据分布和地理区域大小的不对称。通常大量数据集中于人口密集的区域，而人口稀疏的地区却占有大多数的屏幕空间，用大量的屏幕空间来表示小部分数据的做法对空间的利用非常不经济，这种不对称还常常会造成用户对数据的错误理解，不能很好地帮助用户准确得区分和比较地图上各个分区的数据值。

英文名：Choropleth Map

## 分级统计地图的构成

<img class="constitute-img" src="https://t.alipayobjects.com/images/T1dSNjXcNhXXXXXXXX.png"/>

<table class="struct-table">
  <tr>
    <th>图表类型</th>
    <th>分级统计图</th>
  </tr>
  <tr>
    <td>适合的数据</td>
    <td>一个分类字段，一个连续字段</td>
  </tr>
  <tr>
    <td>功能</td>
    <td>
      <code>对比</code>分类数据的数值大小
    </td>
  </tr>
  <tr>
    <td>数据与图形的映射</td>
    <td>一个分类字段映射到地图的地理位置</br>另一个连续字段映射到颜色
    </td>
  </tr>
  <tr>
    <td>适合的数据条数</td>
    <td>根据实际地理位置信息，暂无限制</td>
  </tr>
</table>


<div style="clear: both;"></div>

## 分级统计地图的应用场景

### 适合的场景

例子1： **2014 年美国各个州的人口情况（数据来源于 [United States Census Bureau](https://simple.wikipedia.org/wiki/United_States_Census_Bureau)）。** 分级统计地图较多的是反映呈面状但属分散分布的现象，如反映人口密度、某农作物播种面积的比、人均收入等。本例子中，通过颜色的深浅反映了人口的主要分布情况，并且能很明显看出 California、Texas 两大州人口最多，然而对于面积较小的区块，因为人口数量也少，所以渲染的颜色也浅，就导致了这一区块在图上就很难被看见，这也是 Choropleth map 的缺点。

State（州名）| Population（人口）| Code（缩写）
-----|------|--------
California|38802500|CA
Texas|26956958|TX
Florida|19893297|FL
... |... |... 

<div id="c1"></div>

```js-
$.getJSON('/assets/data/usa.geo.json?nowrap', function(mapData) {
  $.getJSON('/assets/data/2014-usa-population.json?nowrap', function(data) {
    var ds = new DataSet();
    var mapDv = ds.createView('map').source(mapData, {
      type: 'GeoJSON'
    });
    var regionDv = ds.createView().source(data);
    regionDv.transform({
      type: 'geo.region',
      geoDataView: mapDv,
      field: 'State',
      as: [ 'longitude', 'latitude' ]
    });
    var centroidDv = ds.createView().source(data);
    centroidDv.transform({
      type: 'geo.centroid',
      geoDataView: mapDv,
      field: 'State',
      as: [ 'longitude', 'latitude' ]
    });

    var chart = new G2.Chart({
      container: 'c1',
      forceFit: true,
      height: 500,
      padding: 0,
    });
    chart.scale({
      longitude: {
        sync: true
      },
      latitude: {
        sync: true
      }
    });

    chart.legend(false);
    chart.axis(false);
    chart.tooltip({
      showTitle: false
    });
    var regionView = chart.view();
    regionView.source(regionDv);
    regionView.polygon()
      .position('longitude*latitude')
      .color('Population', '#e5f5e0-#31a354')
      .style({
        stroke: '#999',
        lineWidth: 1
      });
      console.log(regionDv, centroidDv);

    var centroidView = chart.view();
    centroidView.source(centroidDv);
    centroidView.point()
      .position('longitude*latitude')
      .size(0)
      .label('code', {offset: 0});

    chart.render();
  });
});
```

注意： 

* Population：人口数映射到`颜色`,表示人口的多少
* State：州的名称决定了在其所在的地理`位置`绘制州
* Code：由于有些州的名字比较长，所以使用缩写显示在所在的州上

例子2：**2015 年全球人口性别比例分布** 

下图显示了 2015 年全球男女比例的总体情况，其中数值表示的是每 100位女性对应的男性数量。可以看出在欧美国家，普遍是女性略多于男性，在前苏联地区，这种现象却尤为突出，而中东地区却是男多女少。

<table>
<thead>
<tr>
<th>name(国家)</th>
<th>value(100个女人的男性数量)</th>
</tr>
</thead>
<tbody>
<tr>
<td>Russia</td>
<td>86.8</td>
</tr>
<tr>
<td>China</td>
<td>106.3</td>
</tr>
<tr>
<td>Japan</td>
<td>94.7</td>
</tr>
</tbody>
</table>

<div id="c2"></div>

```js-
$.getJSON('/assets/data/world.geo.json', function(mapData) {
  const chart = new G2.Chart({
    container: 'c2',
    forceFit: true,
    height: 500,
    padding: [55, 20]
  });
  chart.tooltip({
    showTitle: false
  });
  // 同步度量
  chart.scale({
    longitude: {
      sync: true
    },
    latitude: {
      sync: true
    },
  });
  chart.axis(false);
  chart.legend('trend', {
    position: 'left'
  });

  // 绘制世界地图背景
  const ds = new DataSet();
  const worldMap = ds.createView('back')
    .source(mapData, {
      type: 'GeoJSON'
    });
  const worldMapView = chart.view();
  worldMapView.source(worldMap);
  worldMapView.tooltip(false);
  worldMapView.polygon().position('longitude*latitude').style({
    fill: '#fff',
    stroke: '#ccc',
    lineWidth: 1
  });

  // 可视化用户数据
  const userData = [
    {name: 'Russia',value: 86.8},
    {name: 'China',value: 106.3},
    {name: 'Japan',value: 94.7},
    {name: 'Mongolia',value: 98},
    {name: 'Canada',value: 98.4},
    {name: 'United Kingdom',value: 97.2},
    {name: 'United States of America',value: 98.3},
    {name: 'Brazil',value: 96.7},
    {name: 'Argentina',value: 95.8},
    {name: 'Algeria',value: 101.3},
    {name: 'France',value: 94.8},
    {name: 'Germany',value: 96.6},
    {name: 'Ukraine',value: 86.3},
    {name: 'Egypt',value: 102.1},
    {name: 'South Africa',value: 101.3},
    {name: 'India',value: 107.6},
    {name: 'Australia',value: 99.9},
    {name: 'Saudi Arabia',value:130.1},
    {name: 'Afghanistan',value: 106.5},
    {name: 'Kazakhstan',value:93.4},
    {name: 'Indonesia',value: 101.4}
  ];
  const userDv = ds.createView()
    .source(userData)
    .transform({
      geoDataView: worldMap,
      field: 'name',
      type: 'geo.region',
      as: [ 'longitude', 'latitude' ]
    })
    .transform({
      type: 'map',
      callback: function(obj) {
        obj.trend = (obj.value > 100) ? '男性更多' : '女性更多';
        return obj;
      }
    });
  const userView = chart.view();
  userView.source(userDv, {
    'trend': {
      alias: '每100位女性对应的男性数量'
    }
  });
  userView.polygon()
    .position('longitude*latitude')
    .color('trend', [ '#F51D27', '#0A61D7' ])
    .opacity('value')
    .tooltip('name*trend')
    .animate({
      leave: {
        animation: 'fadeOut'
      }
    });
  chart.render();
});
```

### 不适合的场景

例子1： **2008 年美国总统大选结果** 

民主党候选人奥巴马和共和党候选人麦凯恩胜出的州分别用蓝色和红色表示。这个例子的选举可视化很容易给用户造成简介中提到的错觉：数据分布和地理区域大小的不对称。共和党比民主党获得了更多的投票，因为红色的区域所占的面积更大。但是在美国总统大选中，最后的结果是看候选人获得的选举人票数，每个州拥有的选举人票数是不一样的，在一个州获胜的选举人将得到该州所有的选举人票数。纽约州虽然面积很小，却拥有33张选举人票，而蒙大拿州虽然面积很大，却只有3票。

这个时候推荐使用[点描法地图](dot-map.html)。

State (州名) | Num（选举票数）| Obama (奥巴马得票数) | McCain (McCain得票数)
-----|-------|------|-----
Alabama|9|813479|1266546
Arizona|10|1034707|638017
Arkansas|6|422310|638017
... |... |... |... 

<div id="c3"></div>

```js-
$.getJSON('/assets/data/usa.geo.json?nowrap', function(mapData) {
  $.getJSON('/assets/data/2008-usa-president.json?nowrap', function(data) {
    G2.Global.shape.polygon = {
      'stroke-width': 0
    }
    var ds = new DataSet();
    var mapDv = ds.createView('map').source(mapData, {
      type: 'GeoJSON'
    });
    var userDv = ds.createView().source(data);
    userDv.transform({
      type: 'map',
      callback: function(row) {
        row['候选人'] = row.Obama > row.McCain ? 'Obama' : 'McCain';
        return row;
      }
    });
    var regionDv = ds.createView().source(userDv);
    regionDv.transform({
      type: 'geo.region',
      geoDataView: mapDv,
      field: 'State',
      as: [ 'longitude', 'latitude' ]
    });
    var centroidDv = ds.createView().source(userDv);
    centroidDv.transform({
      type: 'geo.centroid',
      geoDataView: mapDv,
      field: 'State',
      as: [ 'longitude', 'latitude' ]
    });

    var chart = new G2.Chart({
      container: 'c3',
      forceFit: true,
      height: 500,
      padding: [0, 90, 0, 0]
    });

    chart.scale({
      longitude: {
        sync: true
      },
      latitude: {
        sync: true
      }
    });
    chart.axis(false);
    chart.tooltip({
      showTitle: null
    });
    chart.legend({
    position: 'right'
  });

    var regionView = chart.view();
    regionView.source(regionDv);
    regionView.polygon()
      .position('longitude*latitude')
      .color('候选人',['#F07763', '#698DC5'])
      .label('Num', {offset: 0, label: {'fill': '#fff', 'font-size': '16'}})
      .tooltip('State*候选人*Num');

    chart.render();
  });
});
```

## 分级统计地图与其他图表的对比

### 分级统计地图与[带气泡的地图](bubble-map.html)

* 分级统计地图与带气泡的地图都用于显示地理区域上的值。分级统计地图将数值映射到地图区域的颜色上，带气泡的地图在地图区域上显示一个气泡，气泡的大小表示数值的大小
* 分级统计地图经常会带来误判，面积大的区域可能数值（人口数、选举人票等）比较小

### 分级统计地图与点描法地图

* 点描法地图主要用于显示某个经纬度上的数据，而分级统计地图用于显示某个区域的统计值
* 点描法地图可以显示大量的数据值，而分级统计地图受显示区域的限制
