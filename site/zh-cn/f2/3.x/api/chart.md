<!--
index: 2
title: Chart
resource:
  jsFiles:
    - ${url.f2}
-->

# Chart

---

## 创建 chart 实例

绘制图表前必须创建一个 `<canvas>` 元素或者一个 canvas 上下文环境。

```js
const chart = new F2.Chart({
  id: 'c1',
  width: 500,
  height: 500,
  padding: 'auto'
});
```

## 参数

### `id`

- 参数类型：String
- 描述：指定对应 canvas 的 id
- 默认值：null

### `el`

- 参数类型：HTMLElement
- 描述：如果未指定 id 时可以直接传入 canvas 对象
- 默认值：null

```js
const chart = new F2.Chart({
  el: document.getElementById('c1')
});
```

### `context`

- 参数类型：CanvasRenderingContext2D
- 描述：canvas 的上下文，F2 3.0.1 版本开始支持。
- 默认值：null

```js
const chart = new F2.Chart({
  context: document.getElementById('c1').getContext('2d')
});
```

**说明：`id`、`el`、`context` 这三个属性必须设置一个。**

### `width`

- 参数类型：Number
- 描述：图表的宽度，如果 `<canvas>` 元素上设置了宽度，可以不传入
- 默认值：null

### `height`

- 参数类型：Number
- 描述：图表的高度，如果 `<canvas>` 元素上设置了高度，可以不传入
- 默认值：null

```js
// 默认使用 canvas 元素的宽高
const chart = new F2.Chart({
  id: 'c1'
});

const chart = new F2.Chart({
  id: 'c1',
  width: 500,
  height: 300
});
```

### `padding`

- 参数类型：Number/Array/String
- 描述：图表绘图区域和画布边框的间距，用于显示坐标轴文本、图例
- 默认值：'auto'，自动计算

```js
const chart = new F2.Chart({
  id: 'c1',
  padding: 'auto' // 默认值，自动计算 padding
});

const chart = new F2.Chart({
  id: 'c1',
  padding: [ 0, 10, 40, 100 ] // 分别设置上、右、下、左边距
});

const chart = new F2.Chart({
  id: 'c1',
  padding: 40 // 单个值
});

const chart = new F2.Chart({
  id: 'c1',
  padding: [ 40, 10, 'auto', 'auto' ]  // 指定几个方向自动计算 padding 
});
```

> 说明：padding 的使用方法同 CSS 盒模型中的 padding。

### `pixelRatio`

- 参数类型：Number
- 描述：屏幕画布的像素比
- 默认值：1

屏幕画布的像素比，由于 canvas 在高清屏上显示时会模糊，所以需要设置 `pixelRatio`，一般情况下这个值可以设置成 `window.devicePixelRatio`。 这个值之所以没有默认使用 `window.devicePixelRatio` 的原因在于不同场景下的高清方案不同，不同平台上的实现也不一致，所以需要用户自己指定。

```js
// 全局设置，所有的图表生效
F2.Global.pixelRatio = window.devicePixelRatio;
// 只为某个 chart 实例单独设置
const chart = new F2.Chart({
  id: 'c1',
  pixelRatio: window.devicePixelRatio
});
```

### `plugins`

- 参数类型：Object/Array
- 描述：为 chart 实例注册插件
- 默认值：null

更多关于插件的使用，详见[Plugin](./plugin.html)。

### `animate`

- 参数类型：Boolean
- 描述：是否关闭 chart 的动画
- 默认值：null


## 方法

### `get`

* 描述：获取属性
* 返回：返回对应的属性值

该方法用于获取 chart 内部的属性，如 `chart.get('width')`，包含的属性如下：

| 属性名  | 解释  |
| -------- | -------- |
| id    | 对应 canvas 的 id |
| padding     | 当前的图表绘图区域和画布边框的间距  |
| data     | 原始数据 |
| width     | 图表宽度 |
| height     | 图表高度 |
| pixelRatio  | 图表的屏幕像素比 |
| el     | 对应 canvas 的 dom 对象 |
| canvas     | 对应的 canvas 对象（G.Canvas） |
| geoms     | chart render 之后可获取，返回所有的 geoms 对象 |

### `source`

* 描述：装载数据
* 返回：当前 chart 实例

#### `chart.source(data)`

- `data`：Array，可视化数据

#### `chart.source(data, colDefs)`

- `data`：Array，可视化数据
- `colDefs`：Object，可选，列定义配置（各个字段的度量配置）

```js
chart.source(data, {
  a: {
    min: 0,
    max: 100
  }
});
```

图表数据的列定义用于对数据字段进行定义，如数据的类型，显示别名，数值的格式化等，不同的数字类型的配置项不同，支持的数据类型有：

* `linear`: 数字类型
* `cat`: 分类类型
* `timeCat`：时间类型

F2 会自动检测数据类型，用户也可以根据自身需求更改一些属性或者数据的类型，具体支持的配置属性详见 [Scale](./scale.html) API。

### `scale`

* 描述：为数据字段进行列定义
* 返回：当前 chart 实例

!注意: 如数据属性 field 在 `chart.source()` 和 `chart.scale()` 中均有定义，那么后声明的会覆盖之前声明的配置。

#### `chart.scale('field', colDef)`

为指定的数据字段进行列定义。

- `field`：String，设置列定义的数据字段名。
- `colDef`：Object，度量配置，详见 [Scale](./scale.html) API。

示例：

```js
const data = [
  { x: 0, y: 1 },
  { x: 1, y: 2 },
  { x: 2, y: 3 }
];

// 为 x 字段设置列定义
chart.scale('x', {
  type: 'cat', // 声明 type 字段为分类类型
  values: [ 'A', 'B', 'C' ] // 重新显示的值
  alias: '类型' // 设置属性的别名  
});
```

#### `chart.scale(colDef)`

为一个或者多个数据字段进行列定义配置。

- `colDef`：Object，度量配置，详见 [Scale](./scale.html) API。

示例：

```js
const data = [
  { x: 0, y: 1 },
  { x: 1, y: 2 },
  { x: 2, y: 3 }
];

// 为多个字段设置列定义
chart.scale({
  x: {
    type: 'cat', // 声明 type 字段为分类类型
    values: [ 'A', 'B', 'C' ] // 重新显示的值
    alias: '类型' // 设置属性的别名
  },
  y: {
    type: 'cat'
  }
});
```

### `coord`

`chart.coord()` 

* 描述：配置坐标系
* 返回：当前 chart 实例

详见 [Coordinate](./coordinate.html)。

### `axis`

`chart.axis()` 

* 描述：配置坐标轴
* 返回：当前 chart 实例

详见 [Axis](./axis.html)。

### `legend`

`chart.legend()`

* 描述： 配置图例
* 返回：当前 chart 实例

详见 [Legend](./legend.html)。

### `tooltip`

`chart.tooltip()` 

* 描述：配置提示信息
* 返回：当前 chart 实例

详见 [Tooltip](./tooltip.html)。

### `guide`

`chart.guide()` 

* 描述：配置辅助元素
* 返回：当前 guideController 实例

详见 [Guide](./guide.html)。

### `animate`

`chart.animate()` 

* 描述：配置图表的动画
* 返回：当前 chart 实例

详见 [Animation](./animation.html)。

### 创建 Geometry 对象

- `chart.point()`：创建 point（点）的几何标记对象并返回该对象，具体的方法详见 [Geometry](./geometry.html)
- `chart.line()`：创建 line（线）的几何标记对象并返回该对象，具体的方法详见 [Geometry](./geometry.html)
- `chart.area()`：创建 area（区域）的几何标记对象并返回该对象，具体的方法详见 [Geometry](./geometry.html)
- `chart.path()`：创建 path（路径）的几何标记对象并返回该对象，具体的方法详见 [Geometry](./geometry.html)
- `chart.interval()`：创建 interval（柱）的几何标记对象并返回该对象，具体的方法详见 [Geometry](./geometry.html)
- `chart.polygon()`：创建 polygon（多边形）的几何标记对象并返回该对象并返回该对象，具体的方法详见 [Geometry](./geometry.html)
- `chart.schema()`：创建 schema 的几何标记对象并返回该对象，具体的方法详见 [Geometry](./geometry.html)

注意：以上方法返回的是几何标记实例，不是 chart 实例。

### `render`

`chart.render()`

* 描述：渲染图表，在最后调用
* 返回： 当前 chart 实例

### `clear`

`chart.clear()`

* 描述：清除图表内容
* 返回：当前 chart 实例

F2 重新绘制时不需要 destroy，而仅需要 `chart.clear()` 然后重新声明语法，如下示例：

```js
chart.clear(); // 清除
chart.source(data);
chart.line().position('a*b');
chart.render();
```

### `repaint`

`chart.repaint()`

* 描述：重新绘制图表
* 返回：当前 chart 实例

当修改了 guide、geometry 的配置项时可以重新绘制图表。

### `changeData`

`chart.changeData(data)`

* 参数：`data`: Array，数据源
* 描述：改变数据，同时图表刷新
* 返回：当前 chart 实例

### `changeSize`

`chart.changeSize(width, height)`

* 参数：`width`: Number/null, 如果为 null，表示宽度不变， `height`: Number/null, 如果为 null，表示高度不变
* 描述：改变数据，同时图表刷新
* 返回：当前 chart 实例

`chart.changeSize(300)` 只改变宽度；`chart.changeSize(300, 500)` 宽度高度同时改变；`chart.changeSize(, 300)` 只改变高度。

### `destroy`

`chart.destroy()`

* 描述：销毁图表，`<canvas>` dom 元素不会销毁

### `getPosition`

`chart.getPosition(record)`

* 参数：`record`，Object 类型，原始数据对象
* 描述：获取原始数据对应在画布上的坐标
* 返回：Object 类型，record 对应的画布坐标，格式为 `{ x: , y: }`

```js
const point = chart.getPosition({ time: '2010-02-02', value: 20 });
```

### `getRecord`

`chart.getRecord(point)`

* 参数：`point`，Object 类型，画布坐标，格式为 `{x: ,y: }`
* 描述：根据画布上的坐标获取对应的原始数据
* 返回：Object 类型，point 对应的原始数据

```js
const obj = chart.getRecord({ x: 100, y: 100 });
``` 

### `getSnapRecords`

`chart.getSnapRecords(point)`

* 参数：`point`，Object 类型，画布坐标，格式为 `{x: ,y: }`
* 描述：根据画布上的坐标获取附近的数据集
* 返回：Array 类型，返回数据集，该数据集中的每一项记录包含映射后的数据以及对应的原始数据集，结构如下

```js
[
  {
    _origin: { year: '1959 年', sales: 38 }, // 该 shape 对应的原始数据
    points: [
      { x: 0.65625, y: 0 },
      { x: 0.65625, y: 0.2375 },
      { x: 0.71875, y: 0.2375 },
      { x: 0.71875, y: 0 }
    ], // 组成该 shape 的关键顶点，归一化数据
    _originY: 38, // Y 轴对应的原始数据
    x: 260.53499698638916, // 该 shape 的 x 轴画布坐标
    y: 165.34375, // 该 shape 的 y 轴画布坐标
    index: 5 // shape 的索引
  },
  ...
  {}
]
```

```js
const obj = chart.getSnapRecords({x: 100, y: 100});
``` 

### `getLegendItems`

`chart.getLegendItems()`

* 描述：获取图例的 items，用于图例相关的操作
* 返回：Array 类型


### `getXScale`

`chart.getXScale()`

* 描述：获取图表 x 轴对应的度量
* 返回：Scale 类型，x 轴对应的度量对象

### `getYScales`

`chart.getYScales()`

* 描述：获取图表 Y 轴对应的度量，有可能会有多个 Y 轴
* 返回：Array，y 轴对应的度量对象的数组

### `showTooltip`

`chart.showTooltip(point)`

* 参数：`point`，Object 类型，画布坐标，格式为 `{x: ,y: }`
* 描述：在该点显示 tooltip
* 返回：当前 chart 实例

### `hideTooltip`

`chart.hideTooltip()`

* 描述：隐藏当前 tooltip
* 返回：当前 chart 实例


