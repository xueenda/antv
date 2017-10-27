<!--
title: 点描法地图
tags:
  - location
  - distribute
variations:
  - bubble-map
-->

# 点描法地图

<img src="https://t.alipayobjects.com/images/T1txXjXaVfXXXXXXXX.png" />

## 点描法地图的简介

点描法地图也叫点分布地图、点密度地图，是一种通过在地理背景上绘制相同大小的点来表示数据在地理空间上分布的方法。

有两种类型的点描法地图：
- 一对一，即一个点只代表一个数据或者对象，因为点的位置对应只有一个数据，因此必须保证点位于正确的空间地理位置。
- 一对多，即一个点代表的是一个特殊的单元，这个时候需要注意不能将点理解为实际的位置，这里的点代表聚合数据，往往是任意放置在地图上的.

点描法地图是观察对象在地理空间上分布情况的理想方法，记住在地图上的形成的点集群可以显示一些数据模式。借助点描法地图，可以很方便得掌握数据的总体分布情况，但是当需要观察单个具体的数据的时候，它是不太适合的。

英文名：Dot Map, Dot Distribution Map, Dot Density Map

## 点描法地图的构成

<img class="constitute-img" src="https://t.alipayobjects.com/images/T1i_JjXk8bXXXXXXXX.png" />

<table class="struct-table">
  <tr>
    <th>图表类型</th>
    <th>点描法地图</th>
  </tr>
  <tr>
    <td>适合的数据</td>
    <td>两个连续字段</td>
  </tr>
  <tr>
    <td>功能</td>
    <td>
        观测数据的<code>分布</code>情况
    </td>
  </tr>
  <tr>
    <td>数据与图形的映射</td>
    <td>两个连续字段分别映射到经度和纬度
    </td>
  </tr>
  <tr>
    <td>适合的数据条数</td>
    <td>大于 100 条</td>
  </tr>
  <tr>
    <td>备注</td>
    <td>可根据实际情况对点的<code>形状</code>进行分类字段的映射。点的<code>颜色</code>进行分类或连续字段的映射。</td>
  </tr>
</table>
<div style="clear: both;"></div>

## 点描法地图的应用场景

#### 适合的场景

例子1: **美国机场分布图。** 通过各个机场的经纬度坐标，在地图上标记代表各机场地理位置的点，可以看出东部相对较多，西部沿海地区的机场集中。

<div id="c1"></div>


<script src="https://as.alipayobjects.com/g/datavis/g-plugin-map/1.1.0/index.js"></script>
<div class="code hide"> 
  $.getJSON('./data/USA.geo.json?nowrap', function(mapData) {
    $.getJSON('./data/airport.json?nowrap', function(data) {
      var Stat = G2.Stat;
      var chart = new G2.Chart({
        id: 'c1',
        width: 800,
        height: 450,
        plotCfg: {
          margin: [0,0,20,0]
        }
      });
      chart.source(data);
      chart.tooltip(false);
      var gmap = new G2.Plugin.GMap({
        chart: chart,
        mapData: mapData,
        style: {
          stroke: '#fff',
          fill: '#ddd'
        }
      }).draw();
      chart.point().position(Stat.map.location('long*lant')).shape('circle').size(2).color('#31a354');
      chart.render();
    });
  });
</div>

例子2： **2010 年芝加哥人口种族分布。** 用不同颜色的点在地图上标识不同的种族，粉红色表示白人，蓝色表示黑人，绿色表示亚洲人，黄色表示拉丁美洲人，这一种族分布地图清晰地表现了黑人和白人的聚居区，中部偏右还有一小块绿色的亚裔聚居区，在聚居区交接的区域通常存在不同种族混居的现象。

注意，这张图中由于数据点很多，正常情况下当数据中有海量的点数据需要在地图上标识时，点之间会产生大量重叠的情况，而这张图采用了类似于 PixelMap 的算法，将重叠的点再一个目标位置周围的小范围内随机移动，从而解决重叠的问题，让可视化展示更多的细节。
<img src="https://t.alipayobjects.com/images/T1C9BjXXJiXXXXXXXX.png" />

#### 不适合的场景

例子1： ** iphone5 全国销量 ** 汇总值在地图上的分布和对比，用点描法地图不太合适，最好采用气泡图结合地图来展示，气泡的大小作为一个维度可以显示出汇总值的分布和对比情况。<code>数据来源丢失，数据不可靠！</code>

<div id="c2"></div>

<div class="code hide">
  $.getJSON('./data/china.json', function(mapData) {
    var Stat = G2.Stat;
    var userData = [];
    var features = mapData.features;
    for(let feature of features) {
      var name = feature.properties.name;
      userData.push({
        "name": name       
      });
    }
    var defs = {
      '..lant': {
          min: 18.16933828300006,
          max: 53.56779083300003
        },
        '..long': {
          min: 73.60225630700012,
          max: 134.77257938700012
        }
    }
    var chart = new G2.Chart({
      id: 'c2',
      width: 600,
      height: 450,
      plotCfg: {
        margin: [0,0,20,0]
      }
    });
    
    var mapView = chart.createView();
    mapView.source(userData, defs);
    mapView.axis(false);
    mapView.tooltip(false);
    mapView.polygon().position(Stat.map.region('name', mapData))
      .style({
      fill:'white',
      stroke: '#333',
      lineWidth: 1
    });
          
    var randomData = function(){
    return Math.round(Math.random()*1000);
  }
  
  var data = [
      {name: '北京',value: randomData() },
      {name: '天津',value: randomData() },
      {name: '上海',value: randomData() },
      {name: '重庆',value: randomData() },
      {name: '河北',value: randomData() },
      {name: '河南',value: randomData() },
      {name: '云南',value: randomData() },
      {name: '辽宁',value: randomData() },
      {name: '黑龙江',value: randomData() },
      {name: '湖南',value: randomData() },
      {name: '安徽',value: randomData() },
      {name: '山东',value: randomData() },
      {name: '新疆',value: randomData() },
      {name: '江苏',value: randomData() },
      {name: '浙江',value: randomData() },
      {name: '江西',value: randomData() },
      {name: '湖北',value: randomData() },
      {name: '广西',value: randomData() },
      {name: '甘肃',value: randomData() },
      {name: '山西',value: randomData() },
      {name: '陕西',value: randomData() },
      {name: '吉林',value: randomData() },
      {name: '福建',value: randomData() },
      {name: '贵州',value: randomData() },
      {name: '广东',value: randomData() },
      {name: '青海',value: randomData() },
      {name: '西藏',value: randomData() },
      {name: '四川',value: randomData() },
      {name: '宁夏',value: randomData() },
      {name: '海南',value: randomData() },
      {name: '台湾',value: randomData() },
      {name: '香港',value: randomData() },
      {name: '澳门',value: randomData() }			    
        
  ]
  
  var dotView = chart.createView({
    index:1
  });
    
    dotView.source(data, defs); 
    dotView.axis(false);
    dotView.point().position(Stat.map.center('name',mapData))
      .color('#6A006F')
      .shape('circle')
      .tooltip('value')  
    chart.legend(false);
    chart.render();
  });
</div>
