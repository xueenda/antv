<!--
title: 带气泡的地图
tags:
  - location
variations:
  - dot-map
  - proportion-area
-->

# 带气泡的地图

<img src="https://t.alipayobjects.com/images/T1exRjXb4XXXXXXXXX.png" />

## 带气泡的地图的简介

带气泡的地图，其实就是气泡图和地图的结合，我们以地图为背景，在上面绘制气泡。我们将圆（这里我们叫它气泡）展示在一个指定的地理区域内，气泡的面积代表了这个数据的大小。

Bubble Map 比[分级统计图](choropleth-map.html)更适用于比较带地理信息的数据的大小。它的主要缺点是当地图上的气泡过多过大时，气泡间会相互遮盖而影响数据展示，所以在绘制时需要考虑这点。

英文名： Bubble Map

## 带气泡的地图的构成

<img class="constitute-img" src="https://t.alipayobjects.com/images/T1yxpjXnVfXXXXXXXX.png" width="400px" />

<table class="struct-table">
  <tr>
    <th>图表类型</th>
    <th>带气泡的地图</th>
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
    <td>一个分类字段映射到地图的地理位置<code>和</code>气泡颜色</br>另一个连续字段映射到气泡大小
    </td>
  </tr>
  <tr>
    <td>适合的数据条数</td>
    <td>根据实际地理位置信息，暂无限制</td>
  </tr>
</table>
<div style="clear: both;"></div>


## 带气泡的地图的应用场景

例子1：**各个国家遭受的恐怖袭击次数展示。** 如图，将各个国家遭受的恐怖袭击次数用气泡图来展示的效果。可以看出伊拉克遭受的恐怖袭击次数最多，并且恐怖袭击主要集中在中东地区。

|name(国家/地区) |value（袭击次数）|
|------|----|
|Iraq|10701|
|Pakistan|7725|
|。。。|。。。|

<div id="c1"></div>
<script src="https://as.alipayobjects.com/g/datavis/g-plugin-map/1.0.5/index.js"></script>
<div class="code hide">
  $.getJSON('./data/world.geo.json?nowrap', function(mapData) {
  var Stat = G2.Stat;
  var Frame = G2.Frame;
  var userData = [
    {name: 'Iraq',value: 10701},
    {name: 'Pakistan',value: 7725},
    {name: 'Afghanistan',value: 5693},
    {name: 'India',value: 3468},
    {name: 'Nigeria',value: 1912},
    {name: 'Philippines',value: 1850},
    {name: 'Somalia',value: 1827},
    {name: 'Yemen',value: 1726},
    {name: 'Thailand',value: 1620},
    {name: 'Libya',value: 1082}
  ];

  var map = [];
  var features = mapData.features;
  for(var i=0; i < features.length; i++) {
    var name = features[i].properties.name;
    map.push({
      "name": name
    });
  }

  var chart = new G2.Chart({
    id: 'c1',
    width: 800,
    height: 350,
    plotCfg: {
      margin: [0]
    }
  });

  chart.source(userData);
  chart.tooltip({
    crosshairs: false
  });
  
  var defs = {
    '..long': {
      min: -180,
      max: 180
    },
    '..lant': {
      min: -55.61183,
      max: 83.64513
    }
  };
  // 绘制世界地图背景
  var view = chart.createView();
  view.source(map, defs);
  view.tooltip(false);
  view.polygon().position(Stat.map.region('name', mapData)).shape('stroke').style({
    fill: '#fff',
    stroke: '#ccc',
    lineWidth: 1
  });

  var userView = chart.createView();

  userView.source(userData, defs);

  userView.point()
    .position(Stat.map.center('name', mapData))
    .size('value', 25, 4)
    .opacity(0.85).shape('circle').color('value','#fee0d2-#de2d26')
    .label('value', {offset: 0, label:{fill:'#222', 'font-weight': 'bold'}});

  chart.render();
});
</div>

例子2：**展示各国癌症五年生存率。** 首先我们通过颜色来区分不同的国家，然后将各国的生存率数据映射为气泡的大小，这样就可以清晰对比不同国家的生存率。从图中可以明显发现中国癌症五年生存率为30.9%，远低于发达国家水平。

name(国家/地区) |value（生存率）
------|----
Japan|81.6
South Korea|53.4
China|30.9
。。。|。。。

<div id="c2"></div>

<div class="code hide">
$.getJSON('./data/world.geo.json?nowrap', function(mapData) {
  var Stat = G2.Stat;
  var userData = [
    {name: 'Japan', alias: '日本', value: 81.6},
    {name: 'South Korea',alias: '韩国', value: 53.4},
    {name: 'China',alias: '中国', value: 30.9},
    {name: 'India',alias: '印度', value: 28.6},
    {name: 'Australia',alias: '澳大利亚', value: 80.7},
    {name: 'United Kingdom',alias: '英国', value: 73.1},
    {name: 'Spain',alias: '西班牙', value: 62.8},
    {name: 'Algeria',alias: '阿尔及利亚', value: 39.3},
    {name: 'Italy',alias: '意大利', value: 63.4},
    {name: 'Slovenia',alias: '斯诺文尼亚', value: 57.9},
    {name: 'Germany',alias: '德国', value: 78.4},
    {name: 'Brazil',alias: '巴西', value: 53.9},
    {name: 'United States of America',alias: '美国', value: 66.0},
    {name: 'Canada',alias: '加拿大', value: 82.5}
  ];

  var map = [];
  var features = mapData.features;
  for(var i=0; i < features.length; i++) {
    var name = features[i].properties.name;
    map.push({
      "name": name
    });
  }

  var chart = new G2.Chart({
    id: 'c2',
    width: 800,
    height: 350,
    plotCfg: {
      margin: [0]
    }
  });
  chart.tooltip({
    title: null,
    crosshairs: false,
    map: {
      name: 'alias'
    }
  });

  chart.legend(false);

  var defs = {
    '..long': {
      min: -180,
      max: 180
    },
    '..lant': {
      min: -55.61183,
      max: 83.64513
    }
  };
  // 绘制世界地图背景
  var view = chart.createView();
  view.source(map, defs);
  view.tooltip(false);
  view.polygon().position(Stat.map.region('name', mapData)).shape('stroke').style({
    stroke: '#fff',
    fill: '#E6E6E6',
    lineWidth: 1
  });

  var userView = chart.createView();

  userView.source(userData, defs);
  userView.point().position(Stat.map.center('name', mapData)).size('value', 25, 4).opacity(0.8).shape('circle').color('name').label('alias', {offset: 0, label: {'fill': '#222'}});

  chart.render();
});
</div>

例子3：**美国各州发生的抢劫案件数目。** 用气泡大小代表各州某年发生的抢劫案件数目，很清晰得就看到美国的东部是抢劫案件发生的集中区域，其中 Maryland 最多。

name(州名) |Robbery（抢劫案件数）
------|----
Alabama|141.4
Arizona|144.4
Arkansas|91.1
。。。|。。。

<div id="c3"></div>

<div class="code hide">
$.getJSON('./data/USA.geo.json?nowrap', function(mapData) {
  $.getJSON('./data/usa-forcible.json?nowrap', function(data) {

    var map = [];
    var features = mapData.features;
    for(var i=0; i < features.length; i++) {
      var name = features[i].properties.name;
      map.push({
        "name": name
      });
    }
    var Stat = G2.Stat;
    var chart = new G2.Chart({
      id: 'c3',
      width: 600,
      height: 400,
      animate: false,
      plotCfg: {
        margin: [0,0,20,0]
      }
    });
    chart.tooltip({
      crosshairs: false
    });
    chart.legend('Robbery', false);

    var defs = {
      '..long': {
        max: -66,
        min:-125
      },
      '..lant': {
        max: 50,
        min:24
      }
    };
    // 绘制世界地图背景
    var view = chart.createView();
    view.source(map, defs);
    view.tooltip(false);
    view.polygon().position(Stat.map.region('name', mapData)).shape('stroke').style({
      fill: '#fff',
      stroke: '#E6E6E6',
      lineWidth: 1
    });

    var userView = chart.createView();
    userView.source(data, defs);
    userView.point().position(Stat.map.center('state', mapData)).size('Robbery', 25, 4).shape('circle').color('Robbery', '#fee0d2-#de2d26').opacity(0.9);
    
    chart.render();
  });
});
</div>

### 不适合的场景

当数值字段表达的不是一个区域的总值，而仅仅是个取样值(气温、降水等）时不适合使用带气泡的地图

下图是中国气温的一个分布图

longitude(经度) |latitude（维度）|temperature
------|----|----
115.95|40|23.9
116.83|40|25.7
117.93|41|24.4
。。。|。。。|。。。

<div id="c4" style="position:relative;">
  <div class="wrong tip">错误</div>
</div>

<div class="code hide">
  $.getJSON('./data/china.json', function(mapData) {
    $.getJSON('./data/temp.json', function(data) {
      var Stat = G2.Stat;
      var chart = new G2.Chart({
        id: 'c4',
        width: 600,
        height: 400,
        plotCfg: {
          margin: [5, 225, 125, 65]
        }
      });
      var defs = {
        'out-temperature': {
          alias: '室外温度'
        },
        '..lant': {
          min: 18.16933828300006,
          max: 53.56779083300003
        },
        '..long': {
          min: 73.60225630700012,
          max: 134.77257938700012
        }
      };

      chart.tooltip({
        map: {
          'title': 'city',
          value: 'out-temperature'
        }
      });

      var coordCfg = {
        projection: 'mercator',
        max: [134.77, 63.68],
        min: [73.60, 18.48]
      };

      var map = [];
      var features = mapData.features;
      for(var i=0; i < features.length; i++) {
        var name = features[i].properties.name;
        map.push({
          "name": name
        });
      }

      // 绘制世界地图背景
      var view = chart.createView();
      view.source(map, defs);
      view.tooltip(false);
      view.coord('map', coordCfg);
      view.polygon().position(Stat.map.region('name', mapData)).shape('stroke').style({
        fill: '#fff',
        stroke: '#E6E6E6',
        lineWidth: 1
      });

      var userView = chart.createView();
      userView.source(data, defs);
      
      userView.point().position(Stat.map.location('longitude*latitude'))
        .size('temperature', 10, 2)
        .color('temperature','#50a3ba-#eac736-#d94e5d')
        .shape('circle')
        .opacity(0.8)
      chart.render();
    });
  });
</div>

不适合的原因：

* 气泡相互折叠
* 气温是一个采样数值，有连续性
* 温度的变化不大，导致气泡的大小变化不大，无法明确的对比数值的大小


此时更适合热力图

<div id="c5" style="position:relative;">
  <div class="right tip">正确</div>
</div>

<div class="code hide">
  $.getJSON('./data/china.json', function(mapData) {
    $.getJSON('./data/temp.json', function(data) {
      var Stat = G2.Stat;
      var chart = new G2.Chart({
        id: 'c5',
        width: 600,
        height: 400,
        plotCfg: {
          margin: [5, 225, 125, 65]
        }
      });
      var defs = {
        'out-temperature': {
          alias: '室外温度'
        },
        '..lant': {
          min: 18.16933828300006,
          max: 53.56779083300003
        },
        '..long': {
          min: 73.60225630700012,
          max: 134.77257938700012
        }
      };

      chart.tooltip({
        map: {
          'title': 'city',
          value: 'out-temperature'
        }
      });

      var coordCfg = {
        projection: 'mercator',
        max: [134.77, 63.68],
        min: [73.60, 18.48]
      };

      var map = [];
      var features = mapData.features;
      for(var i=0; i < features.length; i++) {
        var name = features[i].properties.name;
        map.push({
          "name": name
        });
      }

      // 绘制世界地图背景
      var view = chart.createView();
      view.source(map, defs);
      view.tooltip(false);
      view.coord('map', coordCfg);
      view.polygon().position(Stat.map.region('name', mapData)).shape('stroke').style({
        fill: '#fff',
        stroke: '#E6E6E6',
        lineWidth: 1
      });

      var userView = chart.createView();
      userView.source(data, defs);
      
      userView.heatmap().position(Stat.map.location('longitude*latitude'))
        .size(15)
        .color('temperature','#50a3ba-#eac736-#d94e5d')
        .label('city',{label:{opacity: 0}}); // 设置文本但是不显示，使得tooltip可以显示对应的字段

      chart.render();
    });
  });
</div>


## 带气泡的地图同其他图表的对比

### 跟[一般气泡图](bubble-chart.html)的对比

* 带气泡的地图是一种特殊的气泡图，都可以表示三个维度的数据关系
* 一般的气泡图，两个维度映射到x,y轴这两个维度的字段类型和含义没有限制，可以是分类也可以是连续；但是带气泡的地图，映射到两个轴上的坐标只能是经纬度，用于表示地理位置，如果是地址名称需要先转换成经纬度

### 跟[分级统计图](choropleth-map.html)的对比

* 分级统计图是将某个区域染成一定的颜色，跟带气泡的地图同样是表示一个区域的某个值的大小
* 分级统计图仅能用颜色深度表示数值的大小，而带气泡的地图除了气泡的大小外，气泡的颜色也可以表示数值的大小





