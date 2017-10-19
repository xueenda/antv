<!--
index: 2
title: Chart
resource:
  jsFiles:
    - ${url.g2}
-->

# Chart

获取方式： `G2.Chart`

## 创建 chart 实例

```js
new G2.Chart({
  container: string|HTMLDivElement,
  width: number,
  height: number,
  padding?: object|number|Array,
  background?: object,
  plotBackground?: object,
  forceFit?: boolean,
  animate?: boolean,
  pixelRatio?: number,
  data?: array|DataView
});
```

创建一个 chart 实例，返回一个 Chart 对象，建议在单个容器上只初始化一个 Chart 实例。

### 参数

- `container`

对应图表的 DOM 容器，可以传入该 dom 的 id 或者直接传入容器的 html 节点对象。

```html
<div id="c1"></div>
```

```js
var chart = new G2.Chart({
  container: document.getElementById('c1'),
  width : 1000,
  height : 500
});
```

> !注意：可以使用 `id` 代替 `container`。

- `width`

指定图表的宽度，默认单位为 'px'，当 `forceFit: true` 是宽度不生效。

- `height`

指定图表的高度，默认单位为 'px'。

- `padding`

设置图表的内边距，支持如下几种设置方式：

1. `padding: [ 20, 30, 20, 30]`
2. `padding: 20`
3. `padding: { top: 20, right: 30, bottom: 20, left: 30 }`

另外也支持设置百分比，如 `padding: [ 20%, 30% ]`，该百分比相对于整个图表的宽高。

padding 为数字以及数组类型时使用方法同 CSS 盒模型

- `background`

设置图表整体的边框和背景样式，是一个对象，包含如下属性：

```js
background: {
  fill: string, // 图表背景色
  fillOpacity: number, // 图表背景透明度
  stroke: string, // 图表边框颜色
  strokeOpacity: number, // 图表边框透明度
  opacity: number, // 图表整体透明度
  lineWidth: number, // 图表边框粗度
  radius: number // 图表圆角大小 
}
```

- `plotBackground`

图表绘图区域的边框和背景样式，是一个对象，包含如下属性：

```js
plotBackground: {
  fill: string, // 图表背景色
  fillOpacity: number, // 图表背景透明度
  stroke: string, // 图表边框颜色
  strokeOpacity: number, // 图表边框透明度
  opacity: number, // 图表整体透明度
  lineWidth: number, // 图表边框粗度
  radius: number // 图表圆角大小 
}
```

- `forceFit`

图表的宽度自适应开关，默认为 false，设置为 true 时表示自动取 dom（实例容器）的宽度。

- `animate`

图表动画开关，默认为 true，即开启动画。

- `pixelRatio`

设置设备像素比，默认取浏览器的值 `window.devicePixelRatio`。

- `data`

设置图表的数据源，`data` 是一个包含 JSON 对象的数组或者 DataView 对象。

建议使用 `chart.source(data)` 设置数据源。

## chart.source()

(data: Array|DataView, scaleConfig?: object)

为 chart 装载数据，返回 chart 对象。

### 参数

- `data`

数据源数据，标准的 JSON 数组或者 DataView 对象。

- `scaleConfig`

可选，用于数据字段的列定义，如设置数据的类型，显示别名，时间类型的展示格式等，不同的数字类型的配置项不同，[详情可配置属性参考 Scale TODO](./scale.html)。

### 示例

```js
var data = [
  {type: 0, value: 1},
  {type: 1, value: 2},
  {type: 2, value: 3},
  {type: 2, value: 3, color: '#f80'},
];

chart.source(data, {
  type: {
    type: 'cat', // 声明 type 字段为分类类型
    values: ['A', 'B', 'C'] // 重新显示的值
    alias: '类型' // 设置属性的别名
  }
});
```

## chart.scale()

(fieldName: string, scaleConfig: object) | (scaleConfig: object)

为参与图形语法的数据字段进行列定义。

!注意: 如数据属性 dim 在 `chart.source()` 和 `chart.scale()` 中均有定义，那么 `chart.scale()` 中的配置会覆盖 `chart.source()` 中的配置。 

### 参数

- `fieldName`

设置列定义的数据字段名。

- `scaleConfig`

列定义配置，对象类型，可配置的属性如下：

```js
{
  type: 'identity' | 'linear' | 'cat' | 'time' | 'timeCat' | 'log' | 'pow', // 指定数据类型
  alias: string, // 数据字段的别名
  formatter: function, // 格式化文本内容
  range: array, // 输出数据的范围，默认[0, 1]，格式为 [min, max]，min 和 max 均为 0 至 1 范围的数据。
  tickCount: number, // 设置坐标轴上刻度点的个数
  ticks: array, // 用于指定坐标轴上刻度点的文本信息，当用户设置了 ticks 就会按照 ticks 的个数和文本来显示
  sync: boolean // 当 chart 存在不同数据源的 view 时，用于统一相同数据属性的值域范围
}
```

!注意：除了以上属性外，不同的 type 还对应有各自的可配置属性，详见 [Scale 度量 API](./scale.html); 

对于 `chart.scale()` 我们可以为一个数据属性进行列定义也可以为多个字段设置列定义，如下代码：

```js
var data = [
  { x: 0, y: 1 },
  { x: 1, y: 2 },
  { x: 2, y: 3 }
];

// 为 x 字段设置列定义
chart.scale('x', {
  type: 'cat', // 声明 type 字段为分类类型
  values: ['A', 'B', 'C'] // 重新显示的值
  alias: '类型' // 设置属性的别名  
});

// 为多个字段设置列定义
chart.scale({
  x: {
    type: 'cat', // 声明 type 字段为分类类型
    values: ['A', 'B', 'C'] // 重新显示的值
    alias: '类型' // 设置属性的别名
  },
  y: {
    type: 'cat'
  }
});
```


## chart.axis()

(field: string, axisConfig: object|boolean) | (enable: boolean)

配置图表坐标轴。

1. 关闭所有坐标轴：`chart.axis(false)`；

2. 关闭某一条坐标轴：`chart.axis(field, false)`；

3. 为某一条坐标轴进行配置：`chart.axis(field, axisConfig)`；

### 参数

- `field`

坐标轴对应的数据字段名。

- `axisConfig`

// 2017-10-19

一个对象类型，用于设置坐标轴配置信息，可配置属性如下：

```js
{
  position: string, // 设置坐标轴的显示位置，可设置的值为 top、bottom、left、right
  line: {
    stroke: string, // 坐标轴线的颜色
    strokeOpacity: number, // 坐标轴线的透明度，数值范围为 0 - 1
    lineDash: array, // 设置虚线的样式，如 [2, 3]第一个用来表示实线的像素，第二个用来表示空白的像素。如果提供了奇数个值，则这个值的数列重复一次，从而变成偶数个值
    lineWidth: number // 设置坐标轴线的粗细
  } || null, // 设置坐标轴线的样式，如果值为 null，则不显示坐标轴线
  label: {
    offset: {Number}, // 设置坐标轴文本 label 距离坐标轴线的距离
    textStyle: {
      textAlign: 'center', // 文本对齐方向，可取值为： start middle end
      fill: '#404040', // 文本的颜色
      fontSize: '12', // 文本大小
      fontWeight: 'bold', // 文本粗细
      rotate: 30, 
      textBaseline: 'top' // 文本基准线，可取 top middle bottom，默认为middle
    } || {Function}, // 支持回调 
    autoRotate: {Boolean} // 是否需要自动旋转，默认为 true
    formatter: {Function}, // 回调函数，用于格式化坐标轴上显示的文本信息
    htmlTemplate: {Function}, // 使用 html 自定义 label
  } || null, // 坐标轴文本配置
  title: {
    autoRotate: {Boolean} // 是否需要自动旋转，默认为 true
    offset: {Number}, // 设置标题 title 距离坐标轴线的距离
    textStyle: {
      fontSize: '12',
      textAlign: 'center',
      fill: '#999',
      fontWeight: 'bold',
      rotate: {角度}
    }, // 坐标轴文本属性配置
    position: 'start' || 'center' || 'end', // 标题的位置，**新增**
  }, // 坐标轴标题配置
  tickLine: {
    lineWidth: 1, // 刻度线宽
    stroke: '#ccc', // 刻度线的颜色
    length: 5, // 刻度线的长度, **原来的属性为 line**
  }, // 坐标轴刻度线配置
  subTickCount: {Number}, // 次刻度线个数
  subTickLine: {
    lineWidth: 1, // 子刻度线宽
    stroke: '#ddd', // 子刻度线颜色
    length: 3, // 自刻度线的长度
  },
  grid: {
    align: 'center', // 网格顶点从两个刻度中间开始
    type: 'line' || 'polygon', // 网格的类型
    lineStyle: {
      stroke: '#d9d9d9', // 网格线的颜色
      lineWidth: 1, // 网格线的宽度复制代码
      lineDash: [4, 4] // 网格线的虚线配置，第一个参数描述虚线的实部占多少像素，第二个参数描述虚线的虚部占多少像素
    }, // 网格线的样式配置，原有属性为 line
    alternateColor: '#ccc' || ['#f80', '#ccc'], // 为网格设置交替的背景色，指定一个值则先渲染奇数层，两个值则交替渲染。**代替原有的 odd 和 even 属性**
  }
}
```

### [legend](#legend) 

方法名：`chart.legend(dim, cfg)`

说明：设置图例样式。

#### chart.legend(false)

不显示所有的图例。

#### chart.legend(cfg)

为默认的图例进行配置，在[图例](/g2/doc/tutorial/start/legend.html)章节我们提到过，shape, color, size 这三个图形属性如果判断接收的参数是数据源的字段时，会自动生成对应的图例。所以当 `chart.legend()` 第一个参数是一个 Object 对象时，表示默认为所有自动生成的图例设置样式。

![image](https://zos.alipayobjects.com/skylark/076ecc93-81e2-4826-8625-20c90124c1cd/attach/3378/abbffc526485620b/image.png)

##### 参数

- `cfg`: Object

分类类型和连续类型的配置有一定的区别，下面列出了这两种类型支持的可配置的属性：

**注意**：选中模式配置属性 `selectedMode`， 在 **G2@2.3.0 及以上** 已改为 `mode`，2.3.0 以下版本请使用 `selectedMode`。


```javascript
// 分类类型图例
chart.legend({
  position: 'right', // 图例的显示位置，有 'top','left','right','bottom'四种位置，默认是'right'。
  leaveChecked: false, // 是否保留一项不能取消勾选，默认为 false，即不能取消勾选。
  mode: 'multiple' || 'single' || false, // 设置图例筛选模式，默认为 'multiple' 多选，'single' 表示单选，false 表示禁用筛选
  title: null, // 是否展示图例的标题，null 为不展示，默认 top bottom 两个位置的图例不展示标题。
  spacingX: 10, // 用于 position 为 top 或者 bottom 时调整子项之间的水平距离
  spacingY: 12, // 用于 position 为 left 或者 right 时调整子项之间的垂直距离
  unChecked: '#CCC', // 未选中时 marker 的颜色
  wordSpaceing: 2,  // marker 和文本之间的距离
  dx: 5, // 整个图例的水平偏移距离
  dy: 10, // 整个图例的垂直偏移距离
  itemWrap: false, // 是否自动换行，默认为 false，true 为自动换行
  word: {
    fill: 'red',
    fontSize: 14
  }, // 图例各个子项文本的颜色
  back: {
    fill: 'red'
  }, // 图例外边框和背景的配置信息
  formatter:  function(val) {
    return val + '%';
  }, // 格式化图例项的文本显示
  marker: 'circle', 'square', 'bowtie', 'diamond', 'hexagon', 'triangle', 'triangle-down', 'hollowCircle', 'hollowSquare', 'hollowBowtie', 'hollowDiamond', 'hollowHexagon', 'hollowTriangle', 'hollowTriangle-down', 'cross', 'tick', 'plus', 'hyphen', 'line' // 配置 marker 的显示形状
});
```

```javascript
// 连续类型图例
chart.legend({
  mode: false, // 关闭连续图例的筛选功能，默认为开启状态
  width: 30, // 连续图例宽度
  height: 80, // 连续图例高度度
  position: 'right', // 图例的显示位置，有 'top','left','right','bottom'四种位置，默认是'right'。
  title: null, // 图例的标题配置，null 为不展示，默认 top bottom 两个位置的图例不展示。
  word: {
    fill: 'red'
  }, // 文本属性
  back: {
    fill: 'red'
  } // 图例外边框和背景的配置信息，是一个矩形 图形属性
});
```

#### chart.legend(dim, cfg)

##### 参数

- `dim`: String

  可以传入对应图例的数据源的数据字段名。

- `cfg`: Object

  为对应字段的图例图例配置信息，属性同上述，这里不再说明。

### [coord](#coord) 

方法名：`chart.coord(type[, cfg])`

说明：设置图表坐标系，并可对坐标系进行各种操作。注意 `chart.coord(type[, cfg])` 操作**返回的不是 `chart` 对象**，而是同 Coord 坐标系有关的一个辅助类，以便进行坐标系的各种变换。

#### 参数

- `type`: String

  坐标系的类型，具体包括：

type | 说明 | 示例
---- | ---- | ----
 `rect` | 默认类型，直角坐标系，由 x, y 两个垂直的维度构成。 | <a href="/g2/demo/01-point/scatter-a.html"><img src="../../static/images/g2/01-point/scatter-a.png" style="width: 300px;"></a>
 `polar` | 极坐标系，由角度和半径 2 个维度构成。 | <a href="/g2/demo/16-polar/polar-interval.html"><img src="../../static/images/g2/16-polar/polar-interval.png" style="width: 300px;"></a>
`clock` | 极坐标的一种，用于绘制时钟的坐标系。 | <a href="/g2/demo/12-dashboards/clock.html"><img src="../../static/images/g2/12-dashboards/clock.png" style="width: 300px;"></a>
 `gauge` | 极坐标的一种，仪表盘坐标系。| <a href="/g2/demo/12-dashboards/dashboard.html"><img src="../../static/images/g2/12-dashboards/dashboard.png" style="width: 300px;"></a>
 `theta` | 一种半径固定的极坐标系，常用于饼图。 | <a href="/g2/demo/05-pie/pie.html"><img src="../../static/images/g2/05-pie/pie.png" style="width: 300px;"></a>
 `map` | 地理坐标系，支持不同类型的地理投影 | <a href="/g2/demo/10-map/world-albers.html"><img src="../../static/images/g2/10-map/world-albers.png" style="width: 300px;"></a>
 `helix` | 螺旋坐标系，常用于周期性数据 | <img src="../../static/images/helix.png" style="width: 300px;">

- `cfg`: Object

  【可选】 坐标系的配置信息。

  对于 type 为 `polar`、`theta` 类型的极坐标系，其可配置的 cfg 属性如下：

  ```javascript
  chart.coord('polar | theta', {
    radius: 0.5, // 设置半径，值为 0 至 1 的小数
    inner: 0.3 // 内部极坐标系的半径，[0 - 1]的小数
    startAngle: 弧度, // 起始角度
    endAngle: 弧度 // 结束角度
  });
  ```

  对于 `map` 类型的坐标系，情况比较特殊，对于不同的投影支持的配置参数不同。目前，您可以直接复制下列代码即可使用 G2 提供的 `map` 坐标系。

  ```javascript
  // 适用于中国地图的 albers 投影
  chart.coord('map', {
    projection: 'albers', // 指定投影方法
    basic: [110, 0, 25, 47], // 指定投影方法的基本参数，[λ0, φ0, φ1, φ2] 分别表示中央经度、坐标起始纬度、第一标准纬度、第二标准纬度
    max: [16.573, -13.613], // 指定投影后最大的坐标点
    min: [-27.187, -49.739] // 指定投影后最小的坐标点
  });
  // 适用于世界地图的 albers 投影
  chart.coord('map', {
    projection: 'albers', // 指定投影方法
    basic: [0, 0, 0, 60], // 指定投影方法的基本参数，[λ0, φ0, φ1, φ2] 分别表示中央经度、坐标起始纬度、第一标准纬度、第二标准纬度
    max: [161.89, 120.635], // 指定投影后最大的坐标点
    min: [-144.485, -27.666] // 指定投影后最小的坐标点
  });
  // 适用于世界地图的 mercator 投影
  chart.coord('map', {
    projection: 'mercator',
    max: [180, 165.65], // 指定投影后最大的坐标点
    min: [-180, -67.21] // 指定投影后最小的坐标点
  });
  // 使用与中国地图的 mercator 投影
  chart.coord('map', {
    projection: 'mercator',
    max: [134.77, 63.68],
    min: [73.60, 18.48]
  });
  ```

  对于螺旋坐标系，其可配置的 cfg 属性如下：

  ```javascript
  chart.coord('helix', {
    startAngle: Math.PI, // 螺旋线起点弧度
    endAngle: 7 * Math.PI // 螺线线终点弧度
  });
  ```

#### 坐标系变换

可支持的变换操作：

- rotate(angle): 坐标系旋转，angle 为旋转的角度，是一个度数值。

- scale(sx, sy): 坐标系缩放，sx 代表 x 方向缩放比例，sy 代表 y 方向缩放比例。

- reflect(): 坐标系转置，将 x 或者 y 的起始、结束值倒置

- transpose(): 将坐标系 x 轴和 y 轴转置。

上述操作均可支持链式调用，如下：

```javascript
chart.coord().rotate(70).scale(1.5, 1.5).reflect('xy').transpose();
```

### [facet](#facet) 

方法名：`chart.facet(dimArray, cfg)`

说明：设置分面的切割维度和配置信息。

#### 参数

- `dimArray`: Array

  用于切割分面的数据源字段，是一个数组 Array。

- `cfg`: Object

  分面的配置信息。不同类型的分面除了含有共同的配置项外，还对应各自的配置项。

  ![image](https://zos.alipayobjects.com/skylark/4229b88e-48f7-4bbc-8eff-807faacd8022/attach/3378/ef8f0b629b1d355e/image.png)

  - 通用的配置项

  ```javascript
  chart.facet([dims], {
    type: 'rect' | 'list' | 'circle' | 'tree' | 'mirror', // 设置分面的布局类型
    margin: 10, // 各个分面之间的距离，同 CSS 盒模型中的 margin
    facetTitle: { // 各个分面标题的样式配置
      titleOffset: 16, // 标题距离内容区的偏移
      colDimTitle: {
        title: {
          fontSize: 14,
          textAlign: 'center',
          fill: '#999'
        }
      },
      colTitle: { 
        title: {
          fontSize: 12,
          textAlign: 'center',
          fill: '#999'
        }
      },
      rowTitle: {
        title: {
          fontSize: 12,
          textAlign: 'center',
          rotate: 90,
          fill: '#999'
        }
      },
      rowDimTitle: {
        title: {
          fontSize: 12,
          textAlign: 'center',
          rotate: 90,
          fill: '#999'
        }
      }
    }
  });
  ```

  下面列出每一种分面类型各自的参数配置项：

  - [rect 矩阵分面](/g2/doc/tutorial/start/facet.html#rect-矩形分面)
  
  无

  - [list 列表型分面](/g2/doc/tutorial/start/facet.html#list-水平列表分面)

  ```javascript
  chart.facet([dims], {
    type: 'list',
    cols: 2 // 每行有只展示 2 个分面，超过 2 个则自动折行
  });
  ```

  - [circle 圆形分面](/g2/doc/tutorial/start/facet.html#circle-圆形分面)

  ```javascript
  chart.facet([dims], {
    type: 'circle'
  });
  ```

  - [tree 树形分面](/g2/doc/tutorial/start/facet.html#tree-树形分面)

  ```javascript
  chart.facet([dims], {
    type: 'tree',
    smooth: true, // 各个树节点的连接线是否是平滑的曲线
    line: {
      stroke: 'red', // 连接边的颜色
      lineWidth: 1 // 连接边的粗细
    } // 连接各个树节点的线的配置项
  });
  ```

  - [mirror 镜像分面](/g2/doc/tutorial/start/facet.html#mirror-镜像分面)

  ```javascript
  chart.facet([dims], {
    type: 'mirror',
    transpose: true // 设置镜像是否反转，默认为 false，不翻转， true 则翻转
  });
  ```

### [tooltip](#tooltip) 

方法名：`chart.tooltip([enable,] cfg)`

说明：设置显示的提示信息的内容

#### chart.tooltip(false)

表示禁用 tooltip。

#### chart.tooltip(true, cfg)

##### 参数

- `enable`: Boolean

当 enable 为 true 时，表示 tooltip 可用，主要用于关闭 tooltip 之后重新开启。默认为 true，可不设置。

- `cfg`: Object

tooltip 配置信息，当对 G2 自动生成的 tooltip 展示信息不满意时，可以通过这个方法进行部分自定义，如下所示：

注：当然配置 tooltip 还有其他多种方法，可详见教程：[tooltip 提示信息](/g2/doc/tutorial/start/tooltip.html)

![image](https://zos.alipayobjects.com/skylark/750725d4-2e58-4420-b886-4abe1c0335c2/attach/2378/ad8fe2daa557ad62/image.png)

```javascript
chart.tooltip(true, {
  title: null, // 用于控制是否显示 tooltip 框内的 title
  map: { // 用于指定 tooltip 内显示内容同原始数据字段的映射关系复制代码
    title: '数据字段名或者常量', // 为数据字段名时则显示该字段名对应的数值，常量则显示常量
    name: '数据字段名或者常量', // 为数据字段名时则显示该字段名对应的数值，常量则显示常量
    value: '数据字段名' // 为数据字段名时则显示该字段名对应的数值
  },
  offset: 15, // 偏移量，设置 tooltip 显示位置距离 x 轴方向上的偏移
  crosshairs: true, // 是否展示 tooltip 的辅助线，默认为 false，不展示
  crossLine: {
    stroke: '#666', // 辅助线的颜色
    lineWidth: 2, // 辅助线的宽度
    lineDash: [2, 3] // 设置虚线样式
  }, // crosshairs 为 true 时，为辅助线设置样式
  padding: [10, 10, 10, 10], // 提示框内边距
});
```

`crosshairs` 参数支持三种展示形式：

配置 | 说明
---- | ---- 
`crosshairs: true` | 启用辅助线，默认为竖直方向的辅助线。
`crosshairs: {type: 'x'}` | 启用水平方向的辅助线。
`crosshairs: {type: 'cross'}` | 启用十字辅助线，水平和数值方向均有。

当需要使用自定义的 html 模板生成 tooltip 时，需要对 tooltip 进行如下配置：

```javascript
chart.tooltip(true, {
  custom: true, // 表示使用自定义的模板显示 tooltip
  html: '<div class="ac-tooltip" style="position:absolute;visibility: hidden;"><h4 class="ac-title"></h4><table class="ac-list custom-table"></table></div>', // tooltip 的 html 外层模板
  itemTpl: '<tr><td>{index}</td><td style="color:{color}">{name}</td><td>{value}k</td></tr>', // 使用 html 时每一个显示项的模板，默认支持 index, color, name, value 这四个字段。
  offset: 50, // 偏移量，设置tooltip 显示位置距离 x 轴方向上的偏移
  customFollow: false // 设置 tooltip 是否跟随鼠标移动，默认为 true，跟随。
});
```

##### 自定义 html 模板示例

<div id="c1" class="chart-container"></div>
<style>
  .ac-tooltip{
    position:absolute;
    visibility:hidden;
    border : 1px solid #efefef;
    background-color: white;
    opacity: .8;
    padding: 5px 15px;

    transition: top 200ms,left 200ms;
    -moz-transition:  top 200ms,left 200ms;  /* Firefox 4 */
    -webkit-transition:  top 200ms,left 200ms; /* Safari 和 Chrome */
    -o-transition:  top 200ms,left 200ms;
  }

 .custom-table {
    margin: 10px;
 }

 .custom-table td{
    border: 1px solid #cdcdcd;
    padding: 5px 8px;
 }
</style>

<script>
  var data = [
    {"month":0,"tem":7,"city":"tokyo"},
    {"month":1,"tem":6.9,"city":"tokyo"},
    {"month":2,"tem":9.5,"city":"tokyo"},
    {"month":3,"tem":14.5,"city":"tokyo"},
    {"month":4,"tem":18.2,"city":"tokyo"},
    {"month":5,"tem":21.5,"city":"tokyo"},
    {"month":6,"tem":25.2,"city":"tokyo"},
    {"month":7,"tem":26.5,"city":"tokyo"},
    {"month":8,"tem":23.3,"city":"tokyo"},
    {"month":9,"tem":18.3,"city":"tokyo"},
    {"month":10,"tem":13.9,"city":"tokyo"}
  ];
  var chart = new G2.Chart({
    id: 'c1',
    width: 800,
    height: 400
  });
  var defs = {'month':{
    type: 'cat',
    values: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
  }};

  chart.source(data,defs);

  chart.tooltip(true,{ // 第一个参数是控制是否显示tooltip，可以设置为false，不显示tooltip
    custom: true,
    html:  '<div class="ac-tooltip" style="position:absolute;visibility: hidden;"><p class="ac-title"></p><table class="ac-list custom-table"></table></div>', // tooltip的外层模板
    itemTpl: '<tr><td>{index}</td><td style="color:{color}">{name}</td><td>{value}</td></tr>', // 支持的字段 index,color,name,value
    offset: 50
  });
  chart.line().position('month*tem');
  chart.render();
</script>

```javascript
var data = [
    {"month":0,"tem":7,"city":"tokyo"},
    {"month":1,"tem":6.9,"city":"tokyo"},
    {"month":2,"tem":9.5,"city":"tokyo"},
    {"month":3,"tem":14.5,"city":"tokyo"},
    {"month":4,"tem":18.2,"city":"tokyo"},
    {"month":5,"tem":21.5,"city":"tokyo"},
    {"month":6,"tem":25.2,"city":"tokyo"},
    {"month":7,"tem":26.5,"city":"tokyo"},
    {"month":8,"tem":23.3,"city":"tokyo"},
    {"month":9,"tem":18.3,"city":"tokyo"},
    {"month":10,"tem":13.9,"city":"tokyo"}
  ];
  var chart = new G2.Chart({
    id: 'c1',
    width: 800,
    height: 400
  });
  var defs = {'month':{
    type: 'cat',
    values: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
  }};

  chart.source(data,defs);

  chart.tooltip(true,{ // 第一个参数是控制是否显示tooltip，可以设置为false，不显示tooltip
    custom: true,
    html:  '<div class="ac-tooltip" style="position:absolute;visibility: hidden;"><p class="ac-title"></p><table class="ac-list custom-table"></table></div>', // tooltip的外层模板
    itemTpl: '<tr><td>{index}</td><td style="color:{color}">{name}</td><td>{value}</td></tr>', // 支持的字段 index,color,name,value
    offset: 50
  });
  chart.line().position('month*tem');
  chart.render();
```

#### chart.tooltip(cfg)

默认显示 tooltip，cfg 配置信息同上。

### [guide](#guide) 

方法名：`chart.guide().<guideType>()`

说明：为图表添加静态的辅助标记，如辅助线、辅助图片、辅助文本等，具体介绍可详见[guide 教程](/g2/doc/tutorial/start/guide.html)。`chart.guide()` 方法同 `chart.coord()` 一样会返回一个 `GuideAssist` 对象，该对象支持以下类型的辅助标记元素的绘制:

#### chart.guide().line(from, to, cfg)

绘制辅助线。

##### 参数

- `from`: Array
- `to`: Array

分别表示线的起点和终点，这两个参数均为数组 Array 格式： [x, y]：

+ x：是 x 轴坐标对应字段的值，是原始数据值，不是画布坐标。
+ y：是 y 轴坐标对应字段的值，是原始数据值，不是画布坐标。

当然，如果 x、y 值为分类类型的话，则支持传入索引值。

另外还提供了两个关键字： `min` `max` 用于表示对应字段的最大值和最小值，主要用户快速定位坐标轴的起点和终点。

- `cfg`: Object

用于辅助线的图形属性配置。

```javascript
// 添加辅助线
chart.guide().line([startXValue, startYValue], [endXValue, endYValue], {
  stroke: '#999', // 线的颜色
  lineDash: [0, 2, 2], // 虚线的设置
  lineWidth: 3 // 线的宽度
});
```

#### chart.guide().image(from[, to], cfg)

绘制辅助图片。

##### 参数

- `from`: Array
- `to`: Array

同 `chart.guide.line()`，但是这里的 `to` 参数可选。

- `cfg`: Object

```javascript
// 添加辅助图片
chart.guide().image([startXValue, startYValue], [endXValue, endYValue], {
  src: 'http://gtms02.alicdn.com/VXXXXaZX.png', // 图片路径
  width: 160, // 宽度，可以不设置，如果设置了 [endXValue, startYValue]，此属性无效
  height: 230 // 高度，可以不设置，如果设置了 [endXValue, endYValue]，此属性无效
});
```

#### chart.guide().text(from, text[, cfg])

绘制辅助文本。

##### 参数

- `from`: Array

同 `chart.guide.line()`。

- `text`: String

辅助文本显示内容。

- `cfg`: Object

辅助文本的显示样式配置，可选，不配置使用默认 G2 提供的配置。

```javascript
// 添加辅助文本
chart.guide().text([startXValue, startYValue], '我是辅助文本呀！', {
  fill: '#666', // 文本颜色
  fontSize: '12', // 文本大小
  fontWeight: 'bold' // 文本粗细
});
```

#### chart.guide().rect(from, to, [cfg])

绘制辅助框。

##### 参数

- `from`: Array
- `to`: Array

同 `chart.guide.line()`。

- `cfg`: Object

辅助框的显示样式配置，可选，不配置使用默认 G2 提供的配置。

```javascript
// 添加辅助框
chart.guide().rect([startXValue, startYValue], [endXValue, endYValue], {
  lineWidth: 0, // 辅助框的边框宽度
  fill: '#f80', // 辅助框填充的颜色
  fillOpacity: 0.1, // 辅助框的背景透明度
  stroke: '#ccc' // 辅助框的边框颜色设置
});
```

#### chart.guide().tag(from, to, text, [cfg])

绘制辅助标记。

##### 参数

- `from`: Array
- `to`: Array

同 `chart.guide.line()`。

- `text`: String

  辅助标记文本内容。

- `cfg`: Object

  辅助标记的显示样式配置，可选，不配置使用默认 G2 提供的配置。

```javascript
// 添加辅助标记
chart.guide().tag([startXValue, startYValue], [endXValue, endYValue], '文本', {
  line: {
    stroke: '#999',
    lineDash: [0, 2, 2]
  }, // 辅助标记中连接线的样式配置
  text: {
    fill: '#666',
    fontSize: '12',
    textAlign: 'center'
  }, // 辅助标记中文本的样式配置
  rect: {
    lineWidth: 0,
    fill: '#999',
    fillOpacity: 0.1
  } // 辅助标记中背景框的样式配置
});
```

#### chart.guide().arc(from, to, [cfg])

绘制辅助弧线。

##### 参数

- `from`: Array
- `to`: Array

同 `chart.guide.line()`。

- `cfg`: Object

  辅助弧线的显示样式配置，可选，不配置使用默认 G2 提供的配置。

```javascript
// 添加辅助标记
chart.guide().arc([startXValue, startYValue], [endXValue, endYValue], {
  stroke: '#999', // 线的颜色
  lineDash: [0, 2, 2], // 虚线的设置
  lineWidth: 3 // 线的宽度
});
```

#### chart.guide().html(from, html[, cfg])

绘制辅助html。

##### 参数

- `from`: Array
  
  文本位置，格式： [x, y]

- `html`: String
  
  辅助 html 的自定义内容。

- `cfg`: Object

  html 的配置信息。包含 align 和 ofsset 两个属性。

  + 对齐 align 支持 tr、tc、tl、br、bc、bl、lc、rc、cc 9 点对齐；
  + 偏移坐标 offset，类型：数组 Array， 格式： [x, y]，可选，不配置使用默认 G2 提供的配置。

```javascript
// 添加辅助html
// 坐标点
var point = [3.5,12000];
//html字符串
var tooltipHtml = "<span'>异常值</span>";
chart.guide().html(point, tooltipHtml, {
  align:'br',
  offset:[10, 0]
});
```

### [filter](#filter) 

方法名：`chart.filter(dim, remained)`

说明：过滤数据，如果存在对应的图例，则过滤掉的字段置灰。

#### 参数

- `dim`: String 

  指定过滤数据源的哪一个字段。

- `remained`: Array

  指定保留的字段值。

  + 如果是分类类型，则传入需哟啊保留的值即可；

  ```javascript
  chart.filter('cut', ['Ideal', 'Good']); // 仅显示切割工艺Ideal,Good的钻石
  ```

  + 如果是连续类型，则传入一个范围区间：
  
  ```javascript
  chart.filter('value', [20, 130]);
  ```

### [setMode](#setMode) 

用于开启和关闭图表交互模式，目前仅支持框选模式。使用如下：

```javascript
chart.setMode('select'); // 开启框选模式
chart.setMode(false); // 关闭框选模式
```

### [select](#select) 

当用于开启框选模式时，通过调用 `chart.select(type)` 来选择框选的模式。

目前我们提供了如下三种框选交互形式：

```javascript
chart.select('rangeX'); // 使用 X 轴范围的框选
chart.select('rangeY'); // 使用 Y 轴范围的框选
chart.select('rangeXY'); // 使用 X 和 Y 轴的框选
```

### [createView](#createView) 

方法名：`chart.createView(cfg)`

说明：创建视图，返回一个视图对象 View，详见 [View](/g2/api/view.html)。

#### 参数
- `cfg`: Object

初始化视图对象时的配置项，如下：

```javascript
{
  index: 0， // 索引值，用于标定 view
  start: { // 视图绘图区域的起始点
    x: 0,
    y: 0 
  },
  end: { // 视图绘图区域的结束点
    x: 1,
    y: 1
  },
  data: [], // 视图源数据
}
```

### [removeView](#removeView) 

方法名： `chart.removeView(view)`

说明：删除指定的视图。

#### 参数

- `view`: View
  
  需要删除的视图对象。

### [getView](#getView) 

方法名：`chart.getView(index)`

说明：根据索引值获得视图对象。

#### 参数

- `index`: String
  
  需要获取的视图的 id 标识。

### [animate](#animate1) 

方法名：`chart.animate(enable)`

说明：是否执行图表动画。

#### 参数

- `enable`: Boolean

  默认都是执行动画的，除了通过创建 chart 时设置 animate 属性，也可以通过调用该方法开启和关闭动画。

  ```javascript
  chart.animate(false); // 关闭动画
  ```

### [render](#render) 

方法名：`chart.render()`

说明：最后一步，绘制图表，当调用这个方法后，图表即可被渲染绘制出来。

### [clear](#clear) 

方法名：`chart.clear()`

说明：清空图表上所有的绘制内容，但是不销毁图表。

### [destroy](#destroy) 

方法名：`chart.destroy()`

说明：销毁图表，删除生成的图表对象。

### [repaint](#repaint) 

方法名：`chart.repaint()`

说明：图表重绘。

### [changeData](#changeData) 

方法名：`chart.changeData(data)`

说明：用于修改图表的数据源，注意这里 data 的数据结构需要同原始的数据结构保持一致。

#### 参数

- `data`: Array

  新的数据源，一样是 JSON 数组，但是**其数据结构需要同原始的数据结构保持一致**。

### [changeSize](#changeSize) 

方法名：`chart.changeSize(width, height)`

说明：更改图表的大小。

#### 参数

- `width`: Number
 
  图表宽度

- `height`: Number

  图表高度

### [forceFit](#forceFit) 

方法名：`chart.forceFit()`

说明：当父元素宽度变化时，通过调用此方法达到宽度自适应。当然也可以在创建 chart 实例时设置 `forceFit` 属性。

### [getAllGeoms](#getAllGeoms) 

方法名：`chart.getAllGeoms()`

说明：获取图表中所有的几何标记对象，返回的结果是一个数组： [geom, geom, ...]。

### [getViews](#getViews) 

方法名：`chart.getViews()`

说明：获取图表中所有的视图对象，返回的结果是一个数组： [view, view, ...]。

### [getView](#getView) 

方法名：`chart.getView(id)`

说明：根据传入的 id 属性获取图表中对应的视图对象。

#### 参数

- `id`: String
 
  view 的 id 属性。

### [getScale](#getScale) 
 
方法名：`chart.getScale(dim)`

说明：dim 为数据源的某个字段名，该方法用于获取该 dim 对应的度量[scale](/g2/api/scale.html)对象。

#### 参数

- `dim`: String
  
  对应数据源中的数据字段。

### [getPosition](#getPosition)

方法名： `chart.getPosition({xDim: value, yDim: value})`

说明：获取原始数据对应在画布空间上的坐标，返回的结果为一个对象，格式如下：

```javascript
{
  x: 12, // 画布上的横坐标
  y: 34 // 画布上的纵坐标
}
```

#### 参数

参数是一个 Object 类型，结构如下：

```javascript
{
  'x 轴对应的字段名': '该字段名对应的数值',
  'y 轴对应的字段名': '该字段名对应的数值'
}
```

#### 代码实例

```js
var data = {
  cut: 'a', price: 1,
  cut: 'b', price: 2,
  cut: 'c', price: 3,
  cut: 'd', price: 4
};

chart.getPosition({
  cut: 'b',
  price: 2
});
```

### [getSnapRecords](#getSnapRecords) 

方法名：`chart.getSnapRecords(point)`

说明：根据传入的坐标点 point，获取逼近的该坐标点的**所有 shape 的绘制数据**，point 的格式如下，表示的是画布坐标：

```js
var point= {
  x: 100,
  y: 200
}
```

返回结果为一个数组，该 shape 对应的原始数据可以通过 `_origin` 字段获取。

<img src="https://zos.alipayobjects.com/rmsportal/rtLYuqzWZxanKsjicOlM.png">

### [getTooltipItems](#getTooltipItems) 

方法名：`chart.getTooltipItems(point)`

说明：根据传入的坐标点 point，获取当前坐标点上的 tooltip 信息，point 的格式如下，表示的是画布坐标：

```js
var point= {
  x: 100,
  y: 200
}
```

### [showTooltip](#showTooltip) 

方法名：`chart.showTooltip(point)`

说明：根据传入的坐标点显示对应的 tooltip 信息，这个方法通常同 [`chart.getPosition({xDim: value, yDim: value})`](/g2/api/chart.html#getposition) 配合使用。

#### 参数

- `point`: Object

  point 是一个对象，代表画布上的坐标点，参数格式如下：

  ```js
  {
    x: 12, // 画布上的横坐标
    y: 34 // 画布上的纵坐标
  }
  ```

### [downloadImage](#downloadImage) 

方法名：`chart.downloadImage()` 
说明：提供图表下载功能，同时返回 image 数据。 

## 事件

chart 对象提供了各种事件，方便用户扩展交互。基本的事件用法如下：

```javascript
chart.on('eventType', fn); // 添加事件
chart.off('eventType', fn); // 移除事件
```

`chart.off('eventType', fn)` 其中如果 fn 不指定，表示删除所有 eventType 事件，如果 eventType 和 fn 都不指定，则表示删除所有事件。

下面列出了 chart 支持的所有事件类型。

### [plotmove](#plotmove) 

鼠标在绘图区域移动时触发，在图表的绘图区域外不触发。

* `ev` 表示事件触发时返回的对象，包含以下属性
  + x：当前鼠标所在的画布上的 x 坐标；
  + y：当前鼠标所在的画布上的 y 坐标；
  + target：canvas 对象；
  + toElement：当前 dom 元素；
  + shape: 当前鼠标所在的 shape 对象；
  + views: Array，当前鼠标所在的视图。

```js
chart.on('plotmove', function(ev) {
  var point = {
    x: ev.x,
    y: ev.y
  };
  var items = chart.getTooltipItems(point);
  console.log(items);
});
```

### [plotenter](#plotenter) 

当鼠标移动进入绘图区域时触发。

* `ev` 表示事件触发时返回的对象，包含以下属性
  + x：当前鼠标所在的画布上的 x 坐标；
  + y：当前鼠标所在的画布上的 y 坐标；
  + target：canvas 对象；
  + toElement：当前 dom 元素；
  + views: Array，当前鼠标所在的视图。
。

```js
chart.on('plotenter', function(ev) {
  var point = {
    x: ev.x,
    y: ev.y
  };
  // do something
});
```

### [plotleave](#plotleave)

当鼠标移出绘图区域时触发。

* `ev` 表示事件触发时返回的对象，包含以下属性
  + x：当前鼠标所在的画布上的 x 坐标；
  + y：当前鼠标所在的画布上的 y 坐标；
  + target：canvas 对象；
  + toElement：当前 dom 元素；
  + views: Array，当前鼠标所在的视图。

```js
chart.on('plotleave', function(ev) {
  var point = {
    x: ev.x,
    y: ev.y
  };
  // do something
});
```

### [plotclick](#plotclick) 

鼠标点击绘图区域时触发的事件。

* ev: 事件触发时返回的对象，包含以下属性
  + x：当前鼠标所在的画布上的 x 坐标；
  + y：当前鼠标所在的画布上的 y 坐标；
  + target：canvas 对象；
  + toElement：当前 dom 元素；
  + views: Array，当前鼠标所在的视图；
  + shape：点击的图表 shape，可能为空；
  + data：选中图形代表的数据，可能为空；
  + geom：选中的图形，可能为空。

### [plotdblclick](#plotdblclick) 

绘图区域内的鼠标双击事件。

* ev: 事件触发时返回的对象，包含以下属性
  + x：当前鼠标所在的画布上的 x 坐标；
  + y：当前鼠标所在的画布上的 y 坐标；
  + target：canvas 对象；
  + toElement：当前 dom 元素；
  + views: Array，当前鼠标所在的视图；
  + shape：点击的图表 shape，可能为空；
  + data：选中图形代表的数据，可能为空；
  + geom：选中的图形，可能为空。

### [itemselected](#itemselected) 

图表元素被选中时触发。

* ev: 事件触发时返回的对象，包含以下属性
  + shape：选中的图形；
  + data：选中图形中的数据；
  + geom：所选中的图表图层。

### [itemunselected](#itemunselected) 

图表元素取消选中时触发。

* ev: 事件触发时返回的对象，包含以下属性
  + shape：取消选中的图形；
  + data：取消选中图形代表的数据；
  + geom：所选中的图表图层。

### [itemselectedchange](#itemselectedchange) 

图表元素选中发生改变时触发。

* ev: 事件触发时返回的对象，包含以下属性
  + shape：选中的图形；
  + data：选中图形代表的数据；
  + preShape：之前选中的图形；
  + preData：选中图形代表的数据；
  + geom：所选中的图表图层。

### [tooltipchange](#tooltipchange) 

tooltip 信息更新改变的时候触发。使用详见教程 [tooltip](/g2/doc/tutorial/start/tooltip.html#2-格式化-tooltip-的显示内容)。

* ev：事件触发时返回的对象，包含以下属性：
  + tooltip: 当前生成的 tooltip 对象；
  + x: 画布上的 x 坐标；
  + y: 画布上的 y 坐标；
  + items: 当前 tooltip 中的数据项。

### [tooltipshow](#tooltipshow) 

tooltip 显示时触发。

* ev：事件触发时返回的对象，包含以下属性：
  + tooltip: 当前生成的 tooltip 对象；
  + x: 画布上的 x 坐标；
  + y: 画布上的 y 坐标。

### [tooltiphide](#tooltiphide) 

tooltip 隐藏或者消失时触发。

* ev：事件触发时返回的对象，包含以下属性：
  + tooltip: 当前生成的 tooltip 对象。

### [rangeselectstart](#rangeselectstart) 

框选事件开始时触发。

### [rangeselectend](#rangeselectstart) 

框选事件结束时触发。

* ev：事件触发时返回的对象，包含以下属性：
  - x: 结束点 x 的坐标；
  - y: 结束点 y 的坐标；
  - selected: 被选择区域对应的维度即值范围，格式如下：
    ```javascript
    {
      dimX: [min, max], // 当 dimX 值对应为连续数据时，返回值区间
      dimY: [yValue1, yValue2, ... , yValueN] // 当 dimY 值对应为分类数据时，返回值
    }
    ```
  - view: 鼠标当前所在的视图,
  - rangePlot: 选择框。


<script type="text/javascript">
    // 增加监控代码
    window._pt_lt = new Date().getTime();
    window._pt_sp_2 = [];
    _pt_sp_2.push('setAccount,4c8d1d4e');
    var _protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
    (function() {
        var atag = document.createElement('script'); atag.type = 'text/javascript'; atag.async = true;
        atag.src = _protocol + 'js.ptengine.cn/4c8d1d4e.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(atag, s);
    })();
</script>
