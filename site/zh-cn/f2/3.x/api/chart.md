<!--
index: 2
title: Chart
resource:
  jsFiles:
    - ${url.f2}
-->

# Chart

用于创建图表的类，用于为创建的图表设置属性以及提供各种配置项方法。

绘制图表前需要创建 canvas 元素

```html
<canvas id="c1"></canvas>
```

创建图表

```js
var chart = new F2.Chart({
  id: 'c1',
  width: 500,
  height: 500,
  padding: [20,10, 50, 40]
});

```

## 参数

### id

* 参数类型 `String`
* 描述：指定对应 canvas 的id
* 默认值：null

### el

* 参数类型：`HTMLElement`
* 描述：如果未指定 id 时可以直接传入 canvas 对象
* 默认值：null

```js
var chart = new F2.Chart({
  el: document.getElementById('c1')
});
```

### width

* 参数类型：`Number`
* 描述：图表的宽度，如果 canvas 上设置了宽度，可以不传入
* 默认值：null

### height

* 参数类型：`Number`
* 描述：图表的高度，如果 canvas 上设置了高度，可以不传入
* 默认值：null

```js
// 如果 canvas 上设置了宽高，不需要设置 width,height
var chart = new F2.Chart({
  id: 'c1'
});

// 如果 canvas 没有设置宽高，创建图表时需要声明
var chart = new F2.Chart({
  id: 'c1',
  width: 500,
  height: 300
});
```

### padding

* 参数类型：`Number|Array`
* 描述：图表绘图区域和画布边框的间距，用于显示坐标轴文本
* 默认值：40

```js
var chart = new F2.Chart({
  id: 'c1',
  padding: 40 // 单个值
});

var chart = new F2.Chart({
  id: 'c1',
  padding: [0, 10, 40, 100] // 分别设置上、右、下、左边距
});

```

* padding: `Number|Array` 绘图区域（坐标轴包围的区域）跟画布边缘的边距，可以是数字或者数组[top, right, bottom, left]
* pixelRatio：`Number` 画布的像素比，默认读取 Global 上的pixelRatio


### pixelRatio

* 参数类型：`Number`
* 描述：屏幕画布的像素比，
* 默认值：1

屏幕画布的像素比，由于 canvas 在高清屏上显示时会模糊，所以需要设置 `pixelRatio`，一般情况下这个值可以设置成 `window.devicePixelRatio`
这个值之所以没有默认使用 `window.devicePixelRatio` 的原因在于不同场景下的高清方案不同，不同平台上的实现也不一致，所以需要用户自己指定。

```js
// 全局设置，所有的图表生效
F2.Global.pixelRatio = window.devicePixelRatio;

var chart = new F2.Chart({
  id: 'c1',
  pixelRatio: 2 // 单独设置
});
```

#### 不同精度的对比

下图是 pixelRatio = 1 和 pixelRatio = 2的对比，在单精度屏幕下没有区别，但是在高精屏幕下会有明显的差别

<div>
  <canvas id="can1" style="float:left;"></canvas>
  <canvas id="can2" style="float:left;"></canvas>
</div>
<div style="clear:both;"></div>

```js-

var data = [
  {x: 1, y: 1},
  {x: 2, y: 0},
  {x: 3, y: 3}
]
var chart = new F2.Chart({
  id: 'can1',
  width: 400,
  height: 200,
  pixelRatio: 1 // 单独设置
});

chart.source(data, {
  y: {
    tickCount: 4,
    formatter(val) {
      return val.toFixed(1);
    }
  }
});
chart.line().position('x*y');
chart.guide().text([2, 3.5], 'pxielRatio = 1', {
  textAlign: 'center',
  fontSize: 14
});
chart.render();

var chart1 = new F2.Chart({
  id: 'can2',
  width: 400,
  height: 200,
  pixelRatio: 2 // 单独设置
});

chart1.source(data, {
  y: {
    tickCount: 4,
    formatter(val) {
      return val.toFixed(1);
    }
  }
});
chart1.line().position('x*y');
chart1.guide().text([2, 3.5], 'pxielRatio = 2', {
  textAlign: 'center',
  fontSize: 14
});
chart1.render();

```

## 方法

### source

chart.source(data, defs) 设置
  + data `Array` 图表显示的数据
  + defs `Object` 【可选】 图表数据的列定义

  ```js
    chart.source(data, {
      a: {
        min: 0,
        max: 100
      }
    });
  ```

#### defs 列定义

图表数据的列定义用于数据字段的定义，如数据的类型，显示别名，时间类型的格式等，不同的数字类型的配置项不同，支持的数据类型有：
  * linear: 数字类型
  * cat: 分类类型
  * timeCat：和时间类型

F2 会自动检测数据类型，但是有时候用户需要更改一些属性或者数据的类型，详情参考 [G2 Scale](../../../g2/3.x/api/scale.html) API中对数字类型(linear)、分类类型(cat)、和时间类型(timeCat）的介绍。


### geom

chart.&lt;geom&gt;().position('x*y').color('type');

geom 是 geometry 的简写，用于显示特定的图表，F2 提供了下面几种geometry

type | 说明
--- | ---
`point` | 点，用于点图的构建。
`path` | 路径，无序的点连接而成的一条线。
`line` | 线，点按照 x 轴连接成一条线，构成线图。
`area` | 填充线图跟坐标系之间构成区域图，也可以指定上下范围。
`interval` | 使用矩形或者弧形，用面积来表示大小关系的图形，一般构成柱状图、饼图等图表。
`polygon` | 多边形，可以用于色块图、地图等图表类型。
`schema` | k线图

F2 的核心语法就是指定`视觉通道`和数据字段的映射关系，支持下面几种视觉通道：

* [position](geom.html#_position)：数据字段映射到位置
* [color](geom.html#_color)：数据字段映射到颜色
* [shape](geom.html#_shape)：数据字段映射到形状
* [size](geom.html#_size)：数据字段映射到形状

F2 除了提供了字段映射到图形属性上的方法外还提供了：

* [style](geom.html#_style) 设置图形样式的接口
* [adjust](geom.html#_adjust) 进行数据调整，可以实现层叠柱状图、分组柱状图、层叠面积图

更详细的信息参考 [geom](geom.html)

<h4>示例</h4>

绘制一个点图，将 a,b 分为作为x轴、y轴, 点的大小设置成10

```js

var data = [
  {a: 1, b: 1},
  {a: 2, b: 2}
];

chart.source(data);
chart.point().position('a*b').size(10);
chart.render();

```

### render

chart.render() 渲染图表

  ```js
    chart.render();
  ```

### clear

chart.clear() 清除图表内容

F2 重新绘制时不需要 destroy, 而仅需要 chart.clear() 然后重新声明语法

  ```js
   chart.clear(); // 清除
   chart.source(data);
   chart.line().position('a*b');
   chart.render();
  ```
### repaint

chart.repaint() 重新绘制图表

当修改了 guide、geometry 的配置项时可以重新绘制图表

```js

chart.repaint();

``` 

### changeData

chart.changeData(data);

改变数据，同时图表刷新

```js

chart.changeData(data);

```

### destroy

chart.destroy () 销毁图表，canvas 元素不会销毁

```js
chart.destroy();
```

### axis

chart.axis(field, cfg|enable) 

  + field ：坐标轴对应的字段
  + cfg 坐标轴的配置信息, 也可以设置成 false
    - line: `Object` 线的配置信息，设置 null 不显示，支持所有的 canvas 属性，参考[canvas 属性](canvas.html)
    - labelOffset：`Number` 标轴文本距离轴线的距离
    - grid: `Object|Function` 栅格线的配置项，支持所有的 canvas 属性，参考[canvas 属性](canvas.html)，支持回调函数
    - tickLine: `Object` 坐标点对应的线的样式， 设置null 不显示，支持所有的 canvas 属性，参考[canvas 属性](canvas.html)，支持回调函数
    - label: `Object|Function` 坐标轴上的文本，设置null 不显示, 支持所有的 canvas 属性，参考[canvas 属性](canvas.html)，支持回调函数
  ```js
  chart.axis('field', false); // 不显示该字段对应的坐标轴
  chart.axis('field', {
    // 设置坐标轴线的样式，如果值为 null，则不显示坐标轴线 图形属性
    line: {
      lineWidth: 1, 
      stroke: '#ccc' 
    }, 
    // 标轴文本距离轴线的距离
    labelOffset: 20, 
    // 坐标点对应的线，null 不显示 图形属性
    tickLine: {
      lineWidth: 1,
      stroke: '#ccc',
      value: 5,// 刻度线长度
    },
    // 0％处的栅格线着重显示
    grid: function(text,index){
      if(text === '0%'){
        return {
          stroke: '#efefef'
        };
      }else{
        return {
          stroke: '#f7f7f7'
        };
      }
    },
    // 第一个点左对齐，最后一个点右对齐，其余居中，只有一个点时左对齐
    label: function(text, index, total) {
      var cfg = {
        fill: '#979797',
        font: '14px san-serif',
        offset: 6
      };
      if (index === 0) {
        cfg.textAlign = 'left';
      }
      if (index > 0 && index === total - 1) {
        cfg.textAlign = 'right';
      }
      cfg.text = text + '%';   cfg.text 支持文本格式化处理
      return cfg;
    },
  });
  ```
### guide

chart.guide() 设置辅助元素

为图表添加自定义的辅助元素，如辅助线、辅助文本等.目前支持的辅助类型有：折线（line）、弧线（arc）、长方形（rect）、文字（text）和自定义 html，其中 line、arc、rect 是提前绘制在背景上，text 和 html 是在动画完成后绘制在图形上。

#### chart.guide().html(point, html, [cfg])

绘制辅助 html。

  + `point`: Array

    表示在画布上放置 html 的坐标点，格式 Array：[x, y]

      + x：是 x 轴坐标对应字段的值，是原始数据值，不是画布坐标。
      + y：是 y 轴坐标对应字段的值，是原始数据值，不是画布坐标。

    当然，如果 x y 值为分类类型的话，还可以传入索引值。

    另外还提供了两个关键字： `min`、`max` 用于表示对应字段的最大值和最小值，主要用户快速定位坐标轴的起点和终点。

  + `cfg`: Object

    辅助 html 的显示样式配置，可选。

      + 对齐(align)：支持 tr、tc、tl、br、bc、bl、lc、rc、cc 9 点对齐。
       
      <img src="https://zos.alipayobjects.com/rmsportal/MTSKhszvHZiZWkSOKidQ.png">

      + 偏移(offset)：格式 Array：[x, y]，代表画布偏移坐标。

  ```js
  var point = ['周日',28];
  var html = "<div style='border-radius: 12px;border: none;width: 22px;height: 22px;background-color: rgba(102, 182, 241, 0.5);'></div>";
  var cfg = {
    align: 'cc',
    offset: [-5,-5]
  }

  chart.guide().html(point,html,cfg);
  ```


#### chart.guide().rect(start, end, [cfg])

绘制辅助框。

+ `start`: Array
+ `end`: Array

分别表示线的左上角顶点和右下角顶点，这两个参数均为数组 Array 格式： [x, y]：

+ x：是 x 轴坐标对应字段的值，是原始数据值，不是画布坐标。
+ y：是 y 轴坐标对应字段的值，是原始数据值，不是画布坐标。

当然，如果 x、y 值为分类类型的话，则支持传入索引值。

另外还提供了两个关键字： `min` `max` 用于表示对应字段的最大值和最小值，主要用户快速定位坐标轴的起点和终点。

+ `cfg`: Object

辅助框的显示样式配置，可选, 详细配置参考 [图形属性](canvas.html)。

```javascript
// 添加辅助框
chart.guide().rect([startXValue, startYValue], [endXValue, startYValue], {
  lineWidth: 0, // 辅助框的边框宽度
  fill: '#f80', // 辅助框填充的颜色
  fillOpacity: 0.1, // 辅助框的背景透明度
  stroke: '#ccc', // 辅助框的边框颜色设置
  radius: 5 // 辅助框的圆角设置
});
```

#### chart.guide().line(start, end, [cfg])

绘制辅助线

分别表示线起始、结束顶点，这两个参数均为数组 Array 格式： [x, y]：

+ x：是 x 轴坐标对应字段的值，是原始数据值，不是画布坐标。
+ y：是 y 轴坐标对应字段的值，是原始数据值，不是画布坐标。

当然，如果 x、y 值为分类类型的话，则可以传入索引值替代原始数值。

另外还提供了两个关键字： `min` `max` 用于表示对应字段的最大值和最小值，主要用户快速定位坐标轴的起点和终点。

+ `cfg`: Object

辅助线的显示样式配置，可选, 详细配置参考 [图形属性](canvas.html)。

```js
chart.guide().line(['min', 0], ['min', 'max'], {
  lineWidth: 2, // 辅助线宽度
  stroke: '#ccc', // 辅助线颜色设置
  lineDash: [2, 2]
});
```

### coord

chart.coord(type, cfg) 设置坐标系
  + type 坐标系类型，目前支持 rect,polar 两种
  + cfg 坐标系的配置项，rect（直角坐标系） 和 polar(极坐标）的配置项不完全一样
    - transposed 坐标系翻转
    - startAngle polar （极坐标）的起始角度
    - endAngle polar （极坐标）的结束角度
    - innerRadius polar (极坐标）的内环半径

  ```js
    chart.coord('rect') // 直角坐标系
    chart.coord('rect', {
      transposed: true // 坐标系翻转，柱状图会变成条形图
    });
    
    chart.coord('polar'); // 极坐标
    chart.coord('polar', {
      startAngle: -Math.PI,
    endAngle: 0
    });
    chart.coord('polar', {
      transposed: true // 饼图一般使用这个坐标系
    });
   
  ```

<div>
  <canvas id="can3" style="float:left;"></canvas>
  <canvas id="can4" style="float:left;"></canvas>
</div>
<div style="clear:both;"></div>

```js-

var data = [
  {x: '1', y: 1},
  {x: '2', y: 2},
  {x: '3', y: 3}
]
var chart = new F2.Chart({
  id: 'can3',
  width: 400,
  height: 200,
  pixelRatio: 2 // 单独设置
});

chart.source(data, {
  y: {
    tickCount: 4,
    formatter(val) {
      return val.toFixed(1);
    }
  }
});

chart.coord({
  transposed: true
});

chart.interval().position('x*y');
chart.guide().text([2.5, 1.5], 'transposed', {
  textAlign: 'center',
  fontSize: 14
});
chart.render();

var chart1 = new F2.Chart({
  id: 'can4',
  width: 400,
  height: 200,
  pixelRatio: 2 // 单独设置
});

chart1.coord({
  type: 'polar',
  innerRadius: 0.5
})
chart1.source(data, {
  y: {
    tickCount: 4,
    formatter(val) {
      return val.toFixed(1);
    }
  }
});
chart1.axis(false);
chart1.interval().position('x*y');
chart1.guide().text([0, 3.5], 'polar and innerRadius = 0.5', {
  textAlign: 'center',
  fontSize: 14
});
chart1.render();

```


### animate

chart.animate(cfg|false) 执行动画
  * cfg|false 指定动画的配置项或者禁用动画
    + type: 动画的类型：
    + duration: 动画时间（毫秒），默认1000。
    + easing: Function/String 缓动函数或缓动函数名称，默认easeInOut。支持linear、easeIn、easeOut、easeInOut、backIn、backOut、elastic、bounce
    + success: Function 动画结束后执行的回调函数。

  ```js
  chart.animate(false);// 禁用动画
  chart.animate({
      duration: 2000,
      easing: 'elastic',
      success: function() {
      alert('ok');
    }
  });
  ```
### getPosition

chart.getPosition(record) 获取数据对应在画布上的坐标。
  * record：`Object` 原始的数据对象

  ```js
     var point = chart.getPosition({time: '2010-02-02', value: 20});
  ```
### getRecord

chart.getRecord(point) 根据画布上的坐标获取对应的数据
  * point：`Object`  画布上的点

  ```js
     var obj = chart.getRecord({x: 100, y: 100});
  ```
### getSnapRecords

chart.getSnapRecords(point, [field]) 根据画布上的坐标获取附近的数据

  * point 画布上的点
  * field 用于逼近数据的字段，默认都是x 轴对应的字段，但是饼图情况下需要自己指定对应 y 轴的字段
  ```js
    var records = chart.getSnapRecords({x: 100, y: 100});
  ```
  