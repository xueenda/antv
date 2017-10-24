<!--
index: 8
title: 图表配置项
resource:
  jsFiles:
    - ${url.g2}
    - ${url.dataSet}
-->

# 图表配置项

G2除了支持函数调用方式外，也支持图形语法的配置项式声明方式。

为 [Chart](./chart.html) 对象新增 `options` 属性，用于支持配置项式声明。

```js
var chart = new G2.Chart({
  width: 1000,
  height: 500,
  data: data,
  padding: [20, 80, 60, 80]
  options: {
      // 在这里声明所有的配置属性
  }
});
chart.render();
```

可以先通过以下几个例子来了解下：

* **实例 1：柱状图**

<div id="c1"></div>

```js+
var data = [
  {genre: 'Sports', sold: 275},
  {genre: 'Strategy', sold: 115},
  {genre: 'Action', sold: 120},
  {genre: 'Shooter', sold: 350},
  {genre: 'Other', sold: 150},
];
var chart = new G2.Chart({
  container: 'c1',
  forceFit: true,
  height: 300,
  data: data,
  options: {
    scales: {
      'genre': {
        alias: '游戏种类'
      },
      'sold': {
        alias: '销售量'
      }
    },
    geoms: [
      {
        type: 'interval',
        position: 'genre*sold',
        color: 'genre'
      }
    ]
  }
});
chart.render();
```

对应函数式调用代码如下：

```js
var chart = new G2.Chart({
  container: 'c1',
  height : 300,
  forceFit: true,
});
chart.source(data, {
  genre: {
    alias: '游戏种类'
  },
  sold: {
    alias: '销售量'
  }
});
chart.interval().position('genre*sold').color('genre')
chart.render();
```

* **实例 2: 散点图**

<div id="c2"></div>

```js+
var DataView = DataSet.DataView;
$.getJSON('/assets/data/diamond.json', function(data){
  var dv = (new DataView()).source(data);
  var caratAvg = dv.mean('carat'); // 计算克拉数均值
  var priceAvg = dv.mean('price'); // 计算价格均值
  var chart = new G2.Chart({
    id: 'c2',
    forceFit: true,
    height: 450,
    data: data,
    options: {
      guides: [
        {
          type: 'line',
          start: [ caratAvg, 0 ], // 使用数组格式
          end: [ caratAvg, 20000 ],
          text: {
            position: 'end',
            autoRotate: false,
            content: '克拉数均值:' + caratAvg
          }
        },
        {
          type: 'line',
          start: {
            carat: 0,
            price: priceAvg
          }, // 使用对象格式
          end: {
            carat: 4,
            price: priceAvg
          },
          text: {
            position: 'end',
            autoRotate: false,
            content: '价格均值:' + priceAvg,
            style: {
              textAlign: 'end'
            }
          }
        },
      ],
      geoms: [
        {
          type: 'point',
          position: 'carat*price'
        }
      ]
    }
  });
  chart.render();
});
````

对应函数式调用代码如下：

```js
  var chart = new G2.Chart({ // 创建图表
    container : 'c2',
    forceFit: true,
    height: 450
  });
 
  chart.source(data); // 设置数据源
  chart.point().position('carat*price');
  chart.guide().line({
    start: [ caratAvg, 0 ], // 使用数组格式
    end: [ caratAvg, 20000 ],
    text: {
      position: 'end',
      autoRotate: false,
      content: '克拉数均值:' + caratAvg
    }
  });
  chart.guide().line({
    start: {
      carat: 0,
      price: priceAvg
    }, // 使用对象格式
    end: {
      carat: 4,
      price: priceAvg
    },
    text: {
      position: 'end',
      autoRotate: false,
      content: '价格均值:' + priceAvg,
      style: {
        textAlign: 'end'
      }
    }
  });
  chart.render(); // 图表渲染
```

* **实例 3：多 views**

<div id="c3"></div>

```js+
$.getJSON('/assets/data/world.geo.json', function(mapData) {
  var chart = new G2.Chart({
    container: 'c3',
    forceFit: true,
    height: 450,
    padding: [55, 20],
    options: {
      tooltip: {
        showTitle: false
      },
      scales: {
        longitude: {
          sync: true
        },
        latitude: {
          sync: true
        }
      },
      axes: false,
      legends: {
        'trend': {
          position: 'left'
        }
      }
    }
  });
  // 绘制世界地图背景
  var ds = new DataSet();
  var worldMap = ds.createView('back')
    .source(mapData, {
      type: 'GeoJSON'
    });
  var view = chart.view({
    data: worldMap,
    options: {
      tooltip: false,
      geoms: [
        {
          type: 'polygon',
          position: 'longitude*latitude',
          style: {
            fill: '#fff',
            stroke: '#ccc',
            lineWidth: 1
          }
        }
      ]
    }
  });

  // 绘制展示数据
  // 可视化用户数据
  var userData = [
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
  var userDv = ds.createView()
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
  var userView = chart.view({
    data: userDv,
    options: {
      scales: {
        'trend': {
          alias: '每100位女性对应的男性数量'
        }
      },
      geoms: [
        {
          type: 'polygon',
          position: 'longitude*latitude',
          color: {
            field: 'trend',
            colors: [ '#C45A5A', '#14647D' ]
          },
          opacity: 'value',
          tooltip: 'name*trend',
          animate: {
            leave: {
              animation: 'fadeOut'
            }
          }
        }
      ]
    }
  });
  chart.render();
});
```

对应的函数式调用代码如下：

```js
  var chart = new G2.Chart({
    container: 'c3',
    forceFit: true,
    height: 450,
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
  var ds = new DataSet();
  var worldMap = ds.createView('back')
    .source(mapData, {
      type: 'GeoJSON'
    });
  var worldMapView = chart.view();
  worldMapView.source(worldMap);
  worldMapView.tooltip(false);
  worldMapView.polygon().position('longitude*latitude').style({
    fill: '#fff',
    stroke: '#ccc',
    lineWidth: 1
  });
  
  // 可视化用户数据
  var userData = [
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
  var userDv = ds.createView()
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
  var userView = chart.view();
  userView.source(userDv, {
    'trend': {
      alias: '每100位女性对应的男性数量'
    }
  });
  userView.polygon()
    .position('longitude*latitude')
    .color('trend', [ '#C45A5A', '#14647D' ])
    .opacity('value')
    .tooltip('name*trend')
    .animate({
      leave: {
        animation: 'fadeOut'
      }
    });
  chart.render();
```

## 配置项属性

```js
var options = {
  scales: {Object}, // 列定义声明
  coord: {Object}, // 坐标系配置
  axes: {Object}, // 坐标轴配置
  legends: {Object}, // 图例配置
  guides: {Array}, // 图表辅助元素配置
  filters: {Object}, // 数据过滤配置
  tooltip: {Object}, // 提示信息配置
  facet: {Object}, // 分面配置
  geoms: {Array}, // 图形语法相关配置
}
```

### [scales](#_scales)

类型： `Object`

用于定义所有的[列定义](/zh-cn/g2/3.x/tutorial/how-to-scale.html)。使用方式同 `chart.scale()`。

具体使用方式如下

```js
scales: {
  ${field1}: {Object}, // 为数据字段 field1 进行列定义
  ${field2}: {Object}, // 为数据字段 field2 进行列定义
  ...
}
```

具体列定义的参数 API： [Scale](./scale.html)。

代码示例，为以下数据源的 `time` `value` 两个数据字段定义对应的列定义：

```js
var data = [
  {"value":10,"time":"2015-03-01T16:00:00.000Z"},
  {"value":15,"time":"2015-03-01T16:10:00.000Z"},
  {"value":26,"time":"2015-03-01T16:20:00.000Z"},
  {"value":9,"time":"2015-03-01T16:30:00.000Z"},
  {"value":12,"time":"2015-03-01T16:40:00.000Z"},
  {"value":23,"time":"2015-03-01T16:50:00.000Z"},
  {"value":18,"time":"2015-03-01T17:00:00.000Z"},
  {"value":21,"time":"2015-03-01T17:10:00.000Z"},
  {"value":22,"time":"2015-03-01T17:20:00.000Z"}
];
var chart = new G2.Chart({
  id: 'c1',
  forceFit: true,
  height: 300,
  data: data,
  options: {
    scales: {
      'time': {
        type: 'time',
        nice: false,
        mask: 'HH:MM'
      },
      'value': {
        formatter: function(val) {
            return val + ' k';
        }
      }
    }
  }
});
// 配置项声明同函数调用可以混合使用
chart.line().position('time*value').color('red');
chart.render();
```

### [coord](#_coord)

类型： `Object`

坐标系配置，函数式调用 api: `chart.coord(type, cfg)`。

具体配置方式如下：

```js
coord: {
  type: {String}, // 坐标系类型声明，可取值: rect polar theta map helix gauge clock
  cfg: {Object}, // 对应各个 type 坐标系属性配置，同 `chart.coord(type, cfg)` 中的 cfg
  actions: {Array} // 声明坐标系需要进行的变换操作
}
```
actions 属性的声明方式如下:

```js
actions: [
  ['transpose'],
  ['rotate', 90],
  ['scale', 1, -1],
  ['reflect', 'x']
]
```

### [axes](#_axes)

类型：`Object`

图表坐标轴配置，对应 `chart.axis(dim, cfg)` 方法。

具体使用方式：

1. 不展示坐标轴

```js
axes: {
  visible: false
}
```

2. 不展示某条坐标轴

```js
axes: {
  ${fields}: false, // 不展示数据字段 field1 对应的坐标轴
}
```
或者

```js
axes: {
  ${fields}: 
    visible: false
  }, // 不展示数据字段 field1 对应的坐标轴
}
```

3. 为各个的坐标轴进行配置

```js
axes: {
   ${field1}: {Object}, // 具体配置同 https://antv.alipay.com/g2/api/chart.html#axis
   ${field2}: {Object}, // 具体配置同 https://antv.alipay.com/g2/api/chart.html#axis
   // ...
}
```

### [legends](#_legends)

类型： `Object`

图表图例配置，对应 `chart.legend()`。

1. 不显示所有的图例

```js
legends: {
  visible: false
}
```

2. 为默认的图例进行配置

```js
legends: {
  position: 'right', // 图例的显示位置，有 'top','left','right','bottom'四种位置，默认是'right'
  // ... 其他属性同 https://antv.alipay.com/g2/api/chart.html#chart-legend-cfg
}
```

3. 为各个数据字段对应的图例进行配置

```js
legends: {
  ${field1}: {Object}, // 具体的配置属性同 https://antv.alipay.com/g2/api/chart.html#chart-legend-dim-cfg
  ${field2}: false // 不展示 field2 对应的图例 
}
```

### [guides](#_guides)

类型：`Array`

图表辅助元素定义，对应 `chart.guide()`。

```js
 [
    {
      type: 'line', // 声明辅助元素的类型
      start: {Array}, // 辅助线起始点，[startX, startY]
      end: {Array}, // 辅助线结束点，[endX, endY]
      style: {
        stroke: '#999', // 线的颜色
        lineDash: [0, 2, 2], // 虚线的设置
        lineWidth: 3 // 线的宽度
      } // {object} 配置项,与原语法相同
    }
  ]
```

### [filters](#_filters)

类型：`Object`

数据过滤，对应 `chart.filter(dim, callback)`。

```js
filters: {
  ${field1}: {function}, // 对字段名为 field1 的数据进行过滤
  ${field2}: {function}, // 对字段名为 field2 的数据进行过滤
  ...
}
```

### [tooltip](#_tooltip)

类型：`Object`

对应 `chart.tooltip()`。

### [facet](#_facet)

类型：`Object`

对应 `chart.facet()`。

### [geoms](#_geoms)

类型：`Array`

用于声明绘制图表的图形语法，可同时声明多种 geom 配置。对应函数式调用 api： [Geom](./geom.html)。

```js
geoms: [
  {
    type: {String}, // 声明 geom 的类型：point line path area interval polygon schema edge heatmap contour pointStack pointJitter pointDodge intervalStack intervalDodge intervalSymmetric areaStack schemaDodge
    adjusts: {String} || {Array}, // 数据调整方式声明，如果只有一种调整方式，可以直接声明字符串，如果有多种混合方式，则以数组格式传入
    position: {String} || {Object}, // potision 图形属性配置
    color: {String} || {Object}, // color 图形属性配置
    shape: {String} || {Object}, // shape 图形属性配置
    size: {String} || {Object}, // size 图形属性配置
    opacity: {String} || {Object}, // opacity 图形属性配置
    label: {String} || {Object}, // 图形上文本标记的配置
    tooltip: {String}, // 配置 tooltip 上显示的字段名称
    style: {Object}, // 图形的样式属性配置
    active: true | false, // 开启关闭 geom active 交互
    select: {Object}, // geom 选中交互配置
    animate: {Object} // 动画配置
  },
  {
    // 同上述配置相同，可以定义多个 geom
  }
]
```

#### [positon](#_position)

用于声明映射至位置 position 属性的数据字段，使用方式很简单：

```js
position: 'field1*field2'
```

或者

```js
position: {
  field: 'field1*field2'
}
```


#### [color](#_color)

1. `chart.geom().color(value)` 对应：

```js
color: value, // value 可以是数据字段名、颜色值以及包含统计函数的声明
```

或者

```js
color: {
  field: value, // value 可以是数据字段名、颜色值以及包含统计函数的声明
}
```

2. `chart.geom().color(dim, colors)` 对应：

```js
color: {
  field: ${field}, // 声明映射至 color 属性的数据字段名
  colors: ${colors} // String | Array，可声明颜色、渐变颜色等
}
```

3. 回调函数声明 `chart.geom().color(dim, colorCallback)` 对应：

```js
color: {
  field: ${field}, // 声明映射至 color 属性的数据字段名
  callback: {Function} // 用户自定义回调函数
}
```

#### [shape](#_shape)

1. `chart.geom().shape(value)` 对应：

```js
shape: value, // value 可以是数据字段名、图形形状名以及包含统计函数的声明
```

或者

```js
shape: {
  field: value, // value 可以是数据字段名、图形形状名以及包含统计函数的声明
}
```

2. `chart.geom().shape(dim, shapes)` 对应：

```js
shape: {
  field: ${field}, // 声明映射至 shape 属性的数据字段名
  shapes: ${shapes} // String | Array
}
```

3. 回调函数声明 `chart.geom().shape(dim, callback)` 对应：

```js
shape: {
  field: ${field}, // 声明映射至 shape 属性的数据字段名
  callback: {Function} // 用户自定义回调函数
}
```

#### [size](#_size)

1. `chart.geom().size(value）` 对应

```js
size: value // value 可以是数据字段名、数值以及包含统计函数的声明
```

或者

```js
size: {
  field: value, // value 可以是数据字段名、图形形状名以及包含统计函数的声明
}
```

2. `chart.geom().size(dim, [min, max])` 对应：

```js
size: {
  field: {String}, // 声明映射至 size 属性的数据字段名
  min: {Number},
  max: {Number}
}
```

3. `chart.geom().size(dim, callback)` 对应：

```js
size: {
  field: {String}, // 声明映射至 size 属性的数据字段名
  callback: {Function}
}
```


#### [opacity](#_opacity)

1. `chart.geom().opacity(dim)` 对应：

```js
opacity: dim, // dim 对应映射至 opacity 的数据字段名、具体透明度数值或者包含统计的声明
```

或者

```js
opacity: {
  field: dim // dim 对应映射至 opacity 的数据字段名、具体透明度数值或者包含统计的声明
}
```

2. `chart.geom().opacity(dim, callback)` 对应

```js
opacity: {
  field: {String}, // 声明映射至 opacity 属性的数据字段名
  callback: {Function}
}
```

#### [label](#_label)

1. `chart.geom().label(dim)` 对应

```js
label: dim, // dim 对应字段名或者带有统计的声明
```

2. `chart.geom().label(dim, cfg)` 对应

```js
label: {
  field: {String}, // 需要标注的数据字段名
  cfg: {Object} // 具体的 label 配置，参见https://antv.alipay.com/g2/api/geom.html#label
}
```

3. 如果 label 中需要声明回调函数，声明 callback 属性即可：

```js
label: {
  field: {String}, // 需要标注的数据字段名
  cfg: {Object}, // 具体的 label 配置
  callback: {Function}
}
```

#### [tooltip](#_tooltip)

```js
tooltip: {String} // 直接声明需要显示在 tooltip 上的字段名
```

#### [style](#_style)

```js
style: {
  // 图形属性声明
}
```

#### [select](#_select)

```js
select: {Boolean} // 开启关闭选中功能
```

```js
select: {
  mode:  'multiple' || 'single', // multiple 为多选，single 为单选， false 为关闭选中功能
  style: {
    // 设置选中图形的样式，不设置则使用默认提供的样式
    // 图形绘制属性，如 fill stroke
  }
}
```

#### [active](#_active)

```js
active: false | true
``` 

#### [animate](#_animate)

```js
animate: {
  // 同 geom.animate()
}
```

#### View 视图的配置项声明

视图的配置项同 chart 基本一致，除了不支持 facet，以及 tooltip 属性值为 Boolean 类型外，其他均同 chart 一致。

```js
var view = chart.view({
  options: {
    scales: {Object}, // 列定义声明
    coord: {Object}, // 坐标系配置
    axes: {Object}, // 坐标轴配置
    legends: {Object}, // 图例配置
    guides: {Array}, // 图表辅助元素配置
    filters: {Object}, // 数据过滤配置
    tooltip: {Boolean}, // 默认值为 true，显示 tooltip， false 为关闭 tooltip
    geoms: {Array}, // 图形语法相关配置
  }
});
```
