<!--
index: 17
title: 图表交互
resource:
  jsFiles:
    - ${url.dataSet}
    - ${url.g2}
-->

# 图表交互

G2 默认内置的交互包括：

1. active 激活；
2. select 选中。

## 激活

开启以及关闭 shape 对于鼠标 hover 时的响应效果，G2 默认为各个 shaoe 内置了 active 效果 。

```javascript
geom.active(false); // 关闭默认响应
geom.active(true); // 开启默认响应
```

## 选中

各个几何标记 geom 选中的模式包含如下三种：

1. 不可选中；
2. 单选；
3. 多选；
4. 选中是否可取消选中。

选中模式的设置方式如下：

```js
geom.select(false); // 关闭
geom.select(true); // 打开
geom.select([true,] {
  mode: 'single' || 'multiple', // 选中模式，单选、多选
  style: { }, // 选中后 shape 的样式
  cancelable: true | false, // 选中之后是否允许取消选中，默认允许取消选中
  animate: true | false // 选中是否执行动画，默认执行动画
});
```

默认情况下，G2 中只有饼图支持选中交互，其他 geom 的选中模式默认情况下都是关闭的。

下面通过一个实例来演示选中 `select(enable, cfg)` 方法的使用。

### 示例：地图省市下钻

本例中的地图 GeoJSON 数据请访问该地址获取：

```js
<script src="https://a.alipayobjects.com/g/datavis/china-geojson/1.0.0/index.js"></script>
```

或者 [github](https://github.com/antvis/china-geojson)。

<script src="https://a.alipayobjects.com/g/datavis/china-geojson/1.0.0/index.js"></script>
<div style="position:relative;padding-left:250px;">
  <div id="china" style="position: absolute;top:5px;left:5px;"></div>
  <div id="province"></div>
</div>


```js+
function processData(mapData) {
  // 构造虚拟数据
  var userData = [];
  var features = mapData.features;
  for (var i = 0; i < features.length; i++) {
    var name = features[i].properties.name;
    userData.push({
      name: name,
      value: Math.round(Math.random() * 1000),
    });
  }
  
  const ds = new DataSet();
  const geoDataView = ds.createView().source(mapData, {
    type: 'GeoJSON',
  }); // geoJSON 经纬度数据

  // 用户数据
  const dvData = ds.createView().source(userData);
  dvData.transform({
    type: 'geo.region',
    field: 'name',
    geoDataView: geoDataView,
    as: ['longitude', 'lantitude'],
  });

  return dvData;
}

function renderProvinceChart(provinceChart, name) {
  var provinceData = ChinaGeoJSON[name];
  provinceChart.clear();
  if (!provinceData) {
    return false;
  }
  provinceChart.source(processData(provinceData));
  provinceChart.axis(false);
  provinceChart.tooltip({
    showTitle: false,
  });
  provinceChart
    .polygon()
    .position('longitude*lantitude')
    .label('name', {
      textStyle: {
        fill: '#333',
        fontSize: 10
      },
    })
    .style({
      stroke: '#fff',
      lineWidth: 1,
    })
    .color('value', '#e5f5e0-#31a354');
  provinceChart.render();
}

var mapData = ChinaGeoJSON['China'];
var chart = new G2.Chart({
  container: 'china',
  width: 250,
  height: 180,
  padding: 0,
  animate: false
});
chart.source(processData(mapData));
chart.tooltip({
  showTitle: false,
});
chart.axis(false);
chart
  .polygon()
  .position('longitude*lantitude')
  .tooltip('name')
  .style({
    stroke: '#999',
    lineWidth: 1,
    fill: '#ccc',
    globalAlpha: 0.9,
    cursor: 'pointer', // 设置鼠标手势
  })
  .select({
    // 设置是否允许选中以及选中样式
    mode: 'single', // 多选还是单选
    style: {
      fill: '#fe9929', // 选中的样式
    },
  });
chart.render();

var provinceChart = new G2.Chart({
  container: 'province',
  width: 500,
  height: 500,
  padding: [20, 80, 40, 40],
});

var shapes = chart.getAllGeoms()[0].getShapes();
for (var i = 0, len = shapes.length; i < len; i++) {
  var shape = shapes[i];
  var origin = shape.get('origin')['_origin'];
  var name = origin.name;
  if (name === '浙江') {
    renderProvinceChart(provinceChart, name);
    chart.getAllGeoms()[0].setShapeSelected(shape);
  }
}

chart.on('plotclick', function(ev) {
  var shape = ev.shape;
  if (!shape) {
    return false;
  }
  if (shape.get('selected')) {
    var item = shape.get('origin');
    var data = item['_origin'];
    var name = data.name;
    renderProvinceChart(provinceChart, name);
  } else {
    provinceChart.clear();
  }
});
```

