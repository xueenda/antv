<!--
index: 12
title: Guide 辅助元素
resource:
  jsFiles:
    - ${url.dataSet}
    - ${url.g2}
-->

# Guide 辅助元素

Guide 作为 G2 图表的辅助元素，主要用于在图表上标识额外的标记注解。

<img src="https://gw.alipayobjects.com/zos/rmsportal/ekrHtCkdfMttjnAXqApH.png" width="500px">

## guide 类型

G2 目前支持 **6** 种辅助标记类型：

* line：辅助线（可带文本），例如表示平均值或者预期分布的直线；
* image：辅助图片，在图表上添加辅助图片；
* text：辅助文本，指定位置添加文本说明；
* region：辅助框，框选一段图区，设置背景、边框等；
* html：辅助 html，指定位置添加自定义 html，显示自定义信息；
* arc：辅助弧线。

## 如何使用

下面列出了各个 guide 辅助标记类型的使用，更详细的配置项参见 [Guide API TODO ]()。

### line 辅助线

```js
chart.guide().line({
  start: {Object} || {Function} || {Array}, // 辅助线起始位置，值为原始数据值，支持 callback
  end: {Object} || {Function}|| {Array},// 辅助线结束位置，值为原始数据值，支持 callback
  lineStyle: {
    stroke: '#999', // 线的颜色
    lineDash: [0, 2, 2], // 虚线的设置
    lineWidth: 3 // 线的宽度
  }, // 图形样式配置
  text: {
    position: 'start' || 'center' || 'end' || '39%' || 0.5, // 文本的显示位置
    autoRotate: {Boolean}, // 是否沿线的角度排布，默认为 true
    style: {
      // 文本图形样式配置
    },
    content: {String}, // 文本的内容
    offsetX: {Number}, // x 方向的偏移量
    offsetY: {Number} // y 方向的偏移量
  } // 文本配置
});
```

<div id="c1"></div>

```js+
var DataView = DataSet.DataView;
$.getJSON('/assets/data/diamond.json', function(data) {
  var dv = (new DataView()).source(data);
  var caratAvg = dv.mean('carat'); // 计算克拉数均值
  var priceAvg = dv.mean('price'); // 计算价格均值
  var chart = new G2.Chart({ // 创建图表
    container : 'c1',
    forceFit: true,
    height: 300
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
});
```

### image 辅助图片

```js
// 辅助图片 image，只是指定了 start，则该点表示图片左上角坐标
chart.guide().image({
  top: true | false, // 指定 giude 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层
  zIndex: {Number},
  start: {Object} || {Function} || {Array}, // 图片起始位置， 值为原始数据值，支持 callback
  src: {String}, // 图片路径
  width: {Number},
  height: {Number},
  offsetX: {Number}, // x 方向的偏移量
  offsetY: {Number} // y 方向偏移量
});
// 辅助图片 image，通过指定 start 和 end 确定图片的位置和宽高
chart.guide().image({
  top: true | false, // 指定 giude 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层 
  start: {Array} || {Function} || {Array}, // 图片起始位置， 值为原始数据值，支持 callback
  end: {Array} || {Function} || {Array}, // 图片结束位置， 值为原始数据值，支持 callback
  src: {String}, // 图片路径
  offsetX: {Number}, // x 方向的偏移量
  offsetY: {Number} // y 方向偏移量
});
```

<div id="c2"></div>

```js+
var DataView = DataSet.DataView;
$.getJSON('/assets/data/diamond.json', function(data) {
  var dv = new DataView();
  dv.source(data).transform({
    type: 'bin.histogram',
    field: 'depth',
    binWidth: 0.5,
    as: ['depth', 'count'],
  });
  var chart = new G2.Chart({
    container: 'c2',
    forceFit: true,
    height: 300
  });
  chart.source(dv);
  chart.tooltip({
    crosshairs: false
  });
  chart.interval().position('depth*count').shape('hollowRect');

  chart.guide().image({
    start: [ 55, 200 ],
    src: 'https://os.alipayobjects.com/rmsportal/IUYwZOlOpysCUsl.png',
    width: 60,
    height: 100
  });
  chart.render();
});
````

### text 辅助文本

```js
chart.guide().text({
  top: true | false, // 指定 giude 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层
  zIndex: {Number},
  position: {Object} || {Function} || {Array}, // 文本的起始位置，值为原始数据值，支持 callback
  content: {String}, // 显示的文本内容
  style: {
    fill: '#666', // 文本颜色
    fontSize: '12', // 文本大小
    fontWeight: 'bold' // 文本粗细
    rotate: 30 // 旋转角度
  }, // 文本的图形样式属性
  offsetX: {Number}, // x 方向的偏移量
  offsetY: {Number} // y 方向偏移量
});
```

<div id="c3"></div>

```js+
var colors = G2.Global.colors;
$.getJSON('/assets/data/diamond.json', function(data) {
  var chart = new G2.Chart({ // 创建图表
    container : 'c3',
    forceFit: true,
    height: 300,
    padding: [ 20, 90, 60, 80 ]
  });
  var defs = {
    'cut': {
      type: 'cat',
      values:['Ideal', 'Premium', 'Very-Good', 'Good', 'Fair']
    }
  };
  chart.source(data, defs); // 设置数据源
  chart.legend(false);
  chart.pointJitter().position('cut*depth').color('cut');
  chart.guide().text({
    position: ['Ideal', 67], 
    content: '越完美的钻石切割工艺越集中', 
    style: {
      fill: colors[0],
      textAlign: 'center',
      fontSize: 14
    }
  });
  chart.guide().text({
    position: ['Fair', 63], 
    content: '越差的钻石切割工艺越分散', 
    style: {
      fill: colors[4],
      textAlign: 'center',
      fontSize: 14
    }
  });
  chart.render(); // 图表渲染
});
```

### region 辅助框

```js
chart.guide().region({
  top: true | false, // 指定 giude 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层
  start: {Object} || {Function} || {Array}, // 辅助框起始位置，值为原始数据值，支持 callback 
  end: {Object} || {Function} || {Array},// 辅助框结束位置，值为原始数据值，支持 callback
  style: {
    lineWidth: 0, // 辅助框的边框宽度
    fill: '#f80', // 辅助框填充的颜色
    fillOpacity: 0.1, // 辅助框的背景透明度
    stroke: '#ccc' // 辅助框的边框颜色设置
  } // 辅助框的图形样式属性
});
```

<div id="c4"></div>

```js+
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
  {"month":10,"tem":13.9,"city":"tokyo"},
  {"month":11,"tem":9.6,"city":"tokyo"},
  {"month":0,"tem":-0.2,"city":"newYork"},
  {"month":1,"tem":0.8,"city":"newYork"},
  {"month":2,"tem":5.7,"city":"newYork"},
  {"month":3,"tem":11.3,"city":"newYork"},
  {"month":4,"tem":17,"city":"newYork"},
  {"month":5,"tem":22,"city":"newYork"},
  {"month":6,"tem":24.8,"city":"newYork"},
  {"month":7,"tem":24.1,"city":"newYork"},
  {"month":8,"tem":20.1,"city":"newYork"},
  {"month":9,"tem":14.1,"city":"newYork"},
  {"month":10,"tem":8.6,"city":"newYork"},
  {"month":11,"tem":2.5,"city":"newYork"},
  {"month":0,"tem":-0.9,"city":"berlin"},
  {"month":1,"tem":0.6,"city":"berlin"},
  {"month":2,"tem":3.5,"city":"berlin"},
  {"month":3,"tem":8.4,"city":"berlin"},
  {"month":4,"tem":13.5,"city":"berlin"},
  {"month":5,"tem":17,"city":"berlin"},
  {"month":6,"tem":18.6,"city":"berlin"},
  {"month":7,"tem":17.9,"city":"berlin"},
  {"month":8,"tem":14.3,"city":"berlin"},
  {"month":9,"tem":9,"city":"berlin"},
  {"month":10,"tem":3.9,"city":"berlin"},
  {"month":11,"tem":1,"city":"berlin"}
];
var chart = new G2.Chart({
  container: 'c4',
  forceFit: true,
  height: 300
});
chart.source(data);
chart.line().position('month*tem').color('city');
chart.guide().region({
  start: [5, 'min'], 
  end: [7, 'max']
}); // 6月 - 8月最低温度
chart.render();
```


### 辅助 html

```js
chart.guide().html({
  position: {Object} || {Function} || {Array}, // html 的中心位置， 值为原始数据值，支持 callback
  alignX: 'left' || 'middle' || 'right',
  alignY: 'top' || 'middle' || 'bottom',
  offsetX: {Number},
  offsetY: {Number},
  html: {String}, // html 代码，也支持callback,可能是最大值、最小值之类的判定
  zIndex: {Number}
});
```

<div id="c5"></div>

```js+
var DataView = DataSet.DataView;
$.getJSON('/assets/data/diamond.json', function(data) {
  var dv = (new DataView()).source(data);
  var caratAvg = dv.mean('carat'); // 计算克拉数均值
  var priceAvg = dv.mean('price'); // 计算价格均值
  var chart = new G2.Chart({
    container: 'c5',
    forceFit: true,
    height: 300
  });
  chart.source(data);
  chart.point().position('carat*price');
  // 坐标点
  var point = [ 3.5, 12000 ];
  //html字符串
  var tooltipHtml = "<div style='border: 2px solid #0f8de8;width: 50px;height: 26px;color: #0f8de8;position: relative;'>" +
      "<span style='color:#63c6c2;font-size:15px'>异常值</span>" +
      "<div style='width: 0;height: 0;border-bottom: 8px solid #0f8de8;border-right:10px solid transparent;position: absolute;top: 16px;left: 46px;'></div>" +
      "</div>";
  chart.guide().html({
    position: point, 
    html: tooltipHtml, 
    alignX: 'right',
    alignY: 'bottom',
    offsetX: 10
  });
  chart.render(); // 图表渲染
});
```

### arc 辅助弧线

```js
chart.arc({
  top: true | false, // 指定 giude 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层
  start: {Object} || {Function} || {Array}, // 辅助框起始位置，值为原始数据值，支持 callback 
  end: {Object} || {Function} || {Array},// 辅助框结束位置，值为原始数据值，支持 callback
  style: {
  
  } // 图形样式属性
});
```

### 动态辅助标记

辅助标记接受的位置信息的参数都是原始数据值，辅助标记一旦生成后就是固定了位置，如果数据发生改变，辅助标记就需要删除掉重新创建

```js
// 清除图表
chart.clear();
// 重新声明图形语法
chart.point().position('carat*price');
chart.guide().html([newX, newY], htmlstring);
chart.render();
```

* newX,newY 是重新计算的位置

如果数据是动态更新的那么这个过程需要频繁进行，基于这种场景 guide 提供两种计算动态位置的：

* 可以使用'min', 'median', 'max' 字符串代表原始值的最小值、平均值、最大值，例如： [0, 'min'] 表示 x 轴上数值为 0，y 轴位置在数值的最小值上；
* 表示位置的数组可以换成回调函数，函数原型： `function(xScale, yScale) {return [];}`
  + xScale, yScale 映射到 x 轴上的字段生成的度量，详情查看 [度量](./scale.html), [api TODO](/g2/api/chart.html#scales);
  + 分类度量常用的值是 `values` 包含了所有的分类，连续度量常用的是 min, max

<div id="c6"></div>

```js+
var data = [];                                                 
var time = Math.floor((new Date()).getTime()/1000) * 1000;                             
                                                                
for (var i = -19; i <= 0; i++) {                                    
  data.push({                                                 
    time: time + i * 3 * 1000,                                     
    value: Math.random() + .25                                      
  });                                                         
}   

// 查找最大值
function findMax() {
  var maxValue = 0;
  var maxObj = null;
  data.forEach(function(obj) {
    if (obj.value > maxValue) {
      maxValue = obj.value;
      maxObj = obj;
    }
  });
  return maxObj;
}

var chart = new G2.Chart({ // 创建图表
  container: 'c6',
  forceFit: true,
  height: 300
});

chart.source(data, {
  time: {
    type: 'time',
    mask: 'HH:mm:ss'
  }
});

chart.line().position('time*value');
// 添加一条虚线
chart.guide().line({
  start: [ 'min', 0.25 ], 
  end: [ 'max', 0.25] 
});
chart.guide().text({
  position: function(){
    var obj = findMax();
    return [obj.time, obj.value];
  },
  content: '最大值'
});

chart.render();

setTimeout(function() {
  data.pop();
  data.push({
    time: new Date().getTime(),
    value: Math.random() + .25
  });
  chart.changeData(data);
}, 3000);
```

