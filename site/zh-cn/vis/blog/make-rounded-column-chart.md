<!--
index: 6
title: 玩玩 G2 系列之圆角矩形
-->

# 玩玩 G2 系列之圆角矩形

前言：

> 总有一天你的棱角会被世界磨平，你会拔掉身上的刺，你会学着对讨厌的人微笑，你会变成一个不动声色的人。

`2017-03-21 14:57`，乔林童鞋在钉钉上问了我这么一个问题：

<img src="https://gw.alipayobjects.com/zos/rmsportal/nePBJSIsCTjtUbHQHIJp.png" style="width: 50%;">

圆角矩形，不由得想起几年前闹得沸沸扬扬的苹果圆角矩形外观设计专利。

![image.png](https://gw.alipayobjects.com/zos/rmsportal/cOnJEshrFeILIcVIyLmH.png) ![image.png](https://gw.alipayobjects.com/zos/rmsportal/PCaIaDdbdfRjQXnrQssj.png) 

上面只是题外话。在构建图表可视化的过程中，设计师经常会加入一些小图形来修饰其设计，但这并无违和感，比如圆角柱状图（可以说是对于原始图表调整最小的设计了，但是这种变化可能会存在一个问题，就是使得柱状图顶部缺少一条有效的水平线，是柱状图之间难以比较，但是呢，这个缺点是可以通过坐标轴的网格线来掩盖，使柱状图的表达更有效~ 有没有一下理解了网格线的存在意义![image.png](http://alipay-rmsdeploy-image.cn-hangzhou.alipay.aliyun-inc.com/skylark/attach/7819/22da42d3e934e135/image.png)）。

那么回到乔林的问题， 如何使用 G2 来绘制圆角柱状图呢？目前 G2 默认绘制出的柱状图是这样的：

<img src="{{assets}}/dist/{{pkg.version}}/g2/3.x/bar/basic-column.png">

在 CSS 中，我们可以通过设置 `border-radius` 属性很方便得设置圆角，其实对于 G2 的底层绘制库 G，我们也为 `rect` 这个 shape 提供了 `radius` 这个属性支持矩形圆角的绘制。但是问题来了，G2 内部是使用 path 路径来实现矩形的绘制的，那就无法开心得简简单单得通过设置 `radius` 来设置了。。。那怎么办？有办法， G2 的强大就在于只要你敢想，我们就能实现的扩展能力：[自定义 shape](/zh-cn/g2/3.x/tutorial/customize-shape.html)。

在这之前，我们需要了解下，对于 G2 来说，一个矩形是如何绘制的，其实很简单，矩形由四个顶点组成，将这四个顶点连接即可，这四个顶点即 G2 中绘制每种几何图形的关键点，以矩形为例，在 G2 中我们从左下角作为起始点，顺时针逐点连接：

![image.png](https://gw.alipayobjects.com/zos/rmsportal/KXIpcmLffzPfpjujKBGa.png) 

在自定义 shape 的接口中，我们提供了绘制图形所有需要的信息（[自定义 Shape API](/zh-cn/g2/3.x/api/shape.html)），下面让我们来看下如何绘制圆角矩形吧:

## 圆角柱状图


<div id="c1"></div>

```js-
// 自定义 shape, 支持图片形式的气泡
G2.Shape.registerShape('interval', 'borderRadius', {
  draw(cfg, container) {
    const points = cfg.points;
    let path = [];
    path.push(['M', points[0].x, points[0].y]);
    path.push(['L', points[1].x, points[1].y]);
    path.push(['L', points[2].x, points[2].y]);
    path.push(['L', points[3].x, points[3].y]);
    path.push('Z');
    path = this.parsePath(path); // 将 0 - 1 转化为画布坐标
    return container.addShape('rect', {
      attrs: {
        x: path[1][1], // 矩形起始点为左上角
        y: path[1][2],
        width: path[2][1] - path[1][1],
        height: path[0][2] - path[1][2],
        fill: cfg.color,
        radius: (path[2][1] - path[1][1]) / 2,
      }
    });
  }
});
const activeData = [
  { date: '2017年3月2日', actual: 175, expected: 900 },
  { date: '2017年3月3日', actual: 137, expected: 900 },
  { date: '2017年3月4日', actual: 240, expected: 900 },
  { date: '2017年3月5日', actual: 726, expected: 900 },
  { date: '2017年3月6日', actual: 968, expected: 900 },
  { date: '2017年3月7日', actual: 702, expected: 900 },
  { date: '2017年3月8日', actual: 655, expected: 900 },
  { date: '2017年3月9日', actual: 463, expected: 900 },
  { date: '2017年3月10日', actual: 464, expected: 900 },
  { date: '2017年3月12日', actual: 0, expected: 900 },
  { date: '2017年3月13日', actual: 638, expected: 900 },
  { date: '2017年3月14日', actual: 0, expected: 900 },
  { date: '2017年3月15日', actual: 0, expected: 900 },
  { date: '2017年3月16日', actual: 509, expected: 900 },
  { date: '2017年3月17日', actual: 269, expected: 900 },
  { date: '2017年3月18日', actual: 321, expected: 900 },
  { date: '2017年3月19日', actual: 0, expected: 900 },
  { date: '2017年3月20日', actual: 399, expected: 900 },
  { date: '2017年3月21日', actual: 662, expected: 900 },
  { date: '2017年3月22日', actual: 689, expected: 900 },
  { date: '2017年3月23日', actual: 347, expected: 900 },
  { date: '2017年3月24日', actual: 0, expected: 900 },
  { date: '2017年3月26日', actual: 428, expected: 900 },
  { date: '2017年3月27日', actual: 749, expected: 900 },
  { date: '2017年3月28日', actual: 0, expected: 900 },
  { date: '2017年3月29日', actual: 0, expected: 900 },
  { date: '2017年3月30日', actual: 69.1, expected: 900 },
];
const chart = new G2.Chart({
  container: 'c1',
  forceFit: true,
  height: 250,
  padding: [50, 80]
});
chart.source(activeData, {
  expected: {
    ticks: [0, 900, 1200]
  }
});
chart.axis('date', false);
chart.axis('actual', false);
chart.axis('expected', {
  line: null,
  tickLine: null,
  position: 'right',
  label: {
    formatter: function(val) {
      if (val === '1200') {
        return '';
      }
      return val;
    }
  }
});
chart.legend(false);
chart.interval()
  .position('date*expected')
  .color('#752136')
  .shape('borderRadius')
  .tooltip('expected')
  .opacity(0.6);
chart.interval()
  .position('date*actual')
  .color('#db0d2d')
  .tooltip('actual')
  .shape('date*actual', function(date, val) {
    if (val === 0) {
      return;
    } else {
      return 'borderRadius';
    }
  });
chart.guide().text({
  position: [ 'min', 'max'],
  content: '活动',
  style: {
    fill: '#ff2c55',
    fontSize: 20,
    fontWeight: 'bold',
    textBaseline: 'top'
  }
});
chart.guide().text({
  position: [ 'max', 'max'],
  content: '67 / 900 千卡',
  style: {
    fill: '#cbcbcb',
    fontSize: 20,
    textAlign: 'end',
    textBaseline: 'top'
  }
});
chart.render();
```

绘制原理如下如所示，G 的 rect 的起始点为左上角，根据提供的四个关键点，我们可以求出矩形的宽度和高度，然后通过设置 radius 属性就可以自定义一个带圆角的矩形。

![image.png](https://gw.alipayobjects.com/zos/rmsportal/SXKsJpNFQXEHSPWmKuxS.png) 

关键代码：

```js
G2.Shape.registerShape('interval', 'borderRadius', {
  draw(cfg, container) {
    /**
     * 柱状图由四个点连线而成
     * points[1] --- points[2]
     *    |              |
     * points[0] --- points[3]
    */
    const points = cfg.points;
    let path = [];
    path.push(['M', points[0].x, points[0].y]);
    path.push(['L', points[1].x, points[1].y]);
    path.push(['L', points[2].x, points[2].y]);
    path.push(['L', points[3].x, points[3].y]);
    path.push('Z');
    path = this.parsePath(path); // 将 0 - 1 转化为画布坐标
    return container.addShape('rect', {
      attrs: {
        x: path[1][1], // 矩形起始点为左上角
        y: path[1][2],
        width: path[2][1] - path[1][1],
        height: path[0][2] - path[1][2],
        fill: cfg.color,
        radius: (path[2][1] - path[1][1]) / 2,
      }
    });
  },
});
```

**线上demo**：[圆角柱状图](/zh-cn/g2/3.x/demo/other/rounded-column-chart.html?theme=default)

## 圆角堆叠柱状图

<div id="c2"></div>

```js-
      const { Chart, Shape, Util } = G2;
      function getFillAttrs(cfg) {
        const attrs = Util.mix({
          fill: cfg.color,
          fillOpacity: cfg.opacity
        }, cfg.style);
        return attrs;
      }
      function getRectPath(points) {
        const path = [];
        for (let i = 0; i < points.length; i++) {
          const point = points[i];
          if (point) {
            const action = i === 0 ? 'M' : 'L';
            path.push([action, point.x, point.y]);
          }
        }
        const first = points[0];
        path.push(['L', first.x, first.y]);
        path.push(['z']);
        return path;
      }
      // 顶边带圆角
      Shape.registerShape('interval', 'top', {
        draw(cfg, container) {
          const points = cfg.points;
          const attrs = getFillAttrs(cfg);
          let path = getRectPath(cfg.points);
          path = this.parsePath(path); // 将 0 - 1 的值转换为画布坐标
          const radius = (path[2][1] - path[1][1]) / 2;
          const temp = [];
          temp.push(['M', path[0][1], path[0][2]]);
          temp.push(['L', path[1][1], path[1][2] + radius]);
          temp.push(['A', radius, radius, 90, 0, 1, path[1][1] + radius, path[1][2]]);
          temp.push(['L', path[2][1] - radius, path[2][2]]);
          temp.push(['A', radius, radius, 90, 0, 1, path[2][1], path[2][2] + radius]);
          temp.push(['L', path[3][1], path[3][2]]);
          temp.push(['Z']);
          return container.addShape('path', {
            attrs: Util.mix(attrs, {
              path: temp,
            })
          });
        }
      });
      // 底边带圆角
      Shape.registerShape('interval', 'bottom', {
        draw(cfg, container) {
          const points = cfg.points;
          const attrs = getFillAttrs(cfg);
          let path = getRectPath(cfg.points);
          path = this.parsePath(path);
          const radius = (path[2][1] - path[1][1]) / 2;
          const temp = [];
          temp.push(['M', path[0][1] + radius, path[0][2]]);
          temp.push(['A', radius, radius, 90, 0, 1, path[0][1], path[0][2] - radius]);
          temp.push(['L', path[1][1], path[1][2]]);
          temp.push(['L', path[2][1], path[2][2]]);
          temp.push(['L', path[3][1], path[3][2] - radius]);
          temp.push(['A', radius, radius, 90, 0, 1, path[3][1] - radius, path[3][2]]);
          temp.push(['Z']);
          return container.addShape('path', {
            attrs: Util.mix(attrs, {
              path: temp,
            })
          });
        }
      });
      const data = [
        {year: '2014', type: 'Sales', sales: 1000},
        {year: '2015', type: 'Sales', sales: 1170},
        {year: '2016', type: 'Sales', sales: 660},
        {year: '2017', type: 'Sales', sales: 1030},
        {year: '2014', type: 'Expenses', sales: 400},
        {year: '2015', type: 'Expenses', sales: 460},
        {year: '2016', type: 'Expenses', sales: 1120},
        {year: '2017', type: 'Expenses', sales: 540},
        {year: '2014', type: 'Profit', sales: 300},
        {year: '2015', type: 'Profit', sales: 300},
        {year: '2016', type: 'Profit', sales: 300},
        {year: '2017', type: 'Profit', sales: 350}
      ];
      const chart = new Chart({
        container: 'c2',
        forceFit: true,
        height: 350,
        padding: [20, 80, 80, 80]
      });
      chart.source(data, {
        sales: {
          max: 2400,
          tickInterval: 600
        }
      });
      const axisCfg = {
        label: {
          textStyle: {
            fontFamily: 'Monospace',
            fontWeight: 700,
            fontSize: 14,
            fill: '#545454'
          }
        },
        grid: {
          lineStyle: {
            lineDash: [0, 0],
            stroke: '#545454'
          }
        }
      };
      chart.axis('year', axisCfg);
      chart.axis('sales', Util.mix({}, axisCfg, {
        line: null
      }));

      chart.intervalStack()
        .position('year*sales')
        .color('type')
        .size(35)
        .shape('type', function(val) {
          if (val === 'Profit') { // 顶部圆角
            return 'bottom';
          } else if (val === 'Sales') { // 底部圆角
            return 'top';
          } else {
            return; // 其他默认
          }
        })
        .style({
          stroke: '#545454',
          lineWidth: 2
        });
      chart.render();
```

那么如何绘制上下带圆角的层叠柱状图呢？其实思路很简单，同样使用自定义 shape，将最上部矩形的 shape 映射为上边带圆角的矩形，将最底部的矩形映射为底边带圆角的矩形。

![image.png](https://gw.alipayobjects.com/zos/rmsportal/YAeVeBGJWJuZzLUIOODv.png) 

关键代码：

```js
// 顶边带圆角
Shape.registerShape('interval', 'top', {
  draw(cfg, container) {
    const points = cfg.points;
    const attrs = getFillAttrs(cfg);
    let path = getRectPath(cfg.points);
    path = this.parsePath(path); // 将 0 - 1 的值转换为画布坐标
    const radius = (path[2][1] - path[1][1]) / 2;
    const temp = [];
    temp.push(['M', path[0][1], path[0][2]]);
    temp.push(['L', path[1][1], path[1][2] + radius]);
    temp.push(['A', radius, radius, 90, 0, 1, path[1][1] + radius, path[1][2]]);
    temp.push(['L', path[2][1] - radius, path[2][2]]);
    temp.push(['A', radius, radius, 90, 0, 1, path[2][1], path[2][2] + radius]);
    temp.push(['L', path[3][1], path[3][2]]);
    temp.push(['Z']);
    return container.addShape('path', {
      attrs: Util.mix(attrs, {
        path: temp,
      })
    });
  }
});
// 底边带圆角
Shape.registerShape('interval', 'bottom', {
  draw(cfg, container) {
    const points = cfg.points;
    const attrs = getFillAttrs(cfg);
    let path = getRectPath(cfg.points);
    path = this.parsePath(path);
    const radius = (path[2][1] - path[1][1]) / 2;
    const temp = [];
    temp.push(['M', path[0][1] + radius, path[0][2]]);
    temp.push(['A', radius, radius, 90, 0, 1, path[0][1], path[0][2] - radius]);
    temp.push(['L', path[1][1], path[1][2]]);
    temp.push(['L', path[2][1], path[2][2]]);
    temp.push(['L', path[3][1], path[3][2] - radius]);
    temp.push(['A', radius, radius, 90, 0, 1, path[3][1] - radius, path[3][2]]);
    temp.push(['Z']);
    return container.addShape('path', {
      attrs: Util.mix(attrs, {
        path: temp,
      })
    });
  }
});

chart.intervalStack()
  .position('year*sales')
  .color('type')
  .size(35)
  .shape('type', function(val) {
    if (val === 'Profit') { // 顶部圆角
      return 'bottom';
    } else if (val === 'Sales') { // 底部圆角
      return 'top';
    } else {
      return; // 其他默认
    }
  });
```

线上 demo: [圆角堆叠柱状图](/zh-cn/g2/3.x/demo/other/rounded-stacked-column-chart.html)

## 更猛的，温度计

<div id="c3"></div>

```js+
const { Chart, Shape, Util } = G2;
const { DataView } = DataSet;
const gapWidth = 3;
function getFillAttrs(cfg) {
  const attrs = {
    fill: cfg.color,
    fillOpacity: cfg.opacity,
  };
  return attrs;
}
function getRectPath(points) {
  const path = [];
  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    if (point) {
      const action = i === 0 ? 'M' : 'L';
      path.push([action, point.x, point.y]);
    }
  }
  const first = points[0];
  path.push(['L', first.x, first.y]);
  path.push(['z']);
  return path;
}
Shape.registerShape('interval', 'top', {
  draw(cfg, container) {
    const points = cfg.points;
    const attrs = getFillAttrs(cfg);
    let path = getRectPath(cfg.points);
    path = this.parsePath(path); // 将 0 - 1 的值转换为画布坐标
    const realInterval = container.addShape('path', {
      attrs: Util.mix(attrs, {
        path,
      }),
    });
    const radius = (path[2][1] - path[1][1]) / 2;
    const temp = [];
    temp.push(['M', path[1][1], path[1][2]]);
    temp.push(['A', radius, radius, 90, 0, 1, (path[2][1] + path[1][1]) / 2, path[2][2] - radius]);
    temp.push(['A', radius, radius, 90, 0, 1, path[2][1], path[2][2]]);
    temp.push(['L', path[2][1], path[2][2]]);
    const topShape = container.addShape('path', {
      attrs: {
        path: temp,
        fill: '#fff',
        stroke: '#000',
      },
    });
    return realInterval;
  }
});
// 中间带边的矩形
Shape.registerShape('interval', 'other', {
  draw(cfg, container) {
    const points = cfg.points;
    const attrs = getFillAttrs(cfg);
    let path = getRectPath(cfg.points);
    path = this.parsePath(path); // 将 0 - 1 的值转换为画布坐标
    const intervalPath = [];
    intervalPath.push(['M', path[0][1] + gapWidth, path[0][2]]);
    intervalPath.push(['L', path[1][1] + gapWidth, path[1][2]]);
    intervalPath.push(['L', path[2][1] - gapWidth, path[2][2]]);
    intervalPath.push(['L', path[3][1] - gapWidth, path[3][2]]);
    intervalPath.push(['Z']);
    const intervalShape = container.addShape('path', {
      attrs: Util.mix(attrs, {
        path: intervalPath,
      }),
    });
    container.addShape('line', {
      attrs: {
        x1: path[0][1],
        y1: path[0][2],
        x2: path[1][1],
        y2: path[2][2],
        stroke: '#000',
        lineWidth: 1,
      }
    });
    container.addShape('line', {
      attrs: {
        x1: path[2][1],
        y1: path[2][2],
        x2: path[3][1],
        y2: path[3][2],
        stroke: '#000',
        lineWidth: 1,
      }
    });
    return intervalShape;
  }
});
// 底边带圆角
Shape.registerShape('interval', 'bottom', {
  draw(cfg, container) {
    const points = cfg.points;
    const attrs = getFillAttrs(cfg);
    let path = getRectPath(cfg.points);
    path = this.parsePath(path);
    const circleStartY = path[1][2] + (path[0][2] - path[1][2]) / 3;
    const h = path[0][2] - circleStartY;
    const w = (path[2][1] - path[1][1]) / 2;
    const radius = (Math.pow(w, 2) + Math.pow(h, 2)) / (2 * h);
    const temp1 = [];
    temp1.push(['M', path[1][1], path[1][2]]);
    temp1.push(['L', path[1][1], circleStartY]);
    temp1.push(['A', radius, radius, 0, 1, 0, path[2][1], circleStartY]);
    temp1.push(['L', path[2][1], path[2][2]]);
    const temp2 = [];
    temp2.push(['M', path[1][1] + gapWidth, path[1][2]]);
    temp2.push(['L', path[1][1] + gapWidth, circleStartY + gapWidth]);
    temp2.push(['A', radius - gapWidth, radius - gapWidth, 0, 1, 0, path[2][1] - gapWidth, circleStartY + gapWidth]);
    temp2.push(['L', path[2][1] - gapWidth, path[2][2]]);
    container.addShape('path', {
      attrs: Util.mix({
        path: temp1,
        stroke: '#000',
        lineWidth: 1,
      })
    });
    return container.addShape('path', {
      attrs: Util.mix(attrs, {
        path: temp2,
      })
    });
  }
});
const colors = ["#CECA9B","#B1C753","#3CA6DF","#459E96","#2E6936","#52AD3B","#90C320","#F7B632","#F39831","#EA452F"];
const data = [
  { name: '个人奢侈品', value: 2490 },
  { name: '豪华车', value: 4380 },
  { name: '豪华酒店', value: 1830 },
  { name: '优质葡萄酒和烈酒', value: 660 },
  { name: '优质食品', value: 460 },
  { name: '艺术精品', value: 390 },
  { name: '设计师家具', value: 330 },
  { name: '私人飞机', value: 180 },
  { name: '游艇', value: 70 },
  { name: '豪华游轮', value: 20 },
];
const dv = new DataView(data);
dv.source(data)
  .transform({
    type: 'map',
    callback(obj) {
      obj.type = '1';
      return obj;
    }
  })
  .transform({
    type: 'sort-by',
    fields: [ 'value' ]
  });
const max = dv.max('value');
const min = dv.min('value');

const chart = new G2.Chart({
  container: 'c3',
  width: 500,
  height: 450,
  padding: [20, 150, 80, 80]
});
chart.source(dv);
chart.axis(false);
chart.legend({
  position:'right',
  clickable: false // 不可点击
});
chart.tooltip({
  showTitle: false,
  shared: false,
  inPlot: false
});
chart.intervalStack()
  .position('type*value')
  .color('name', colors)
  .size(40)
  .shape('name*value', (name, val) => {
    const value = val[1] - val[0];
    if (value === min) {
      return 'top';
    } else if (value === max) {
      return 'bottom';
    }
    return 'other';
  });
chart.render();
```

按照圆角堆叠柱状图的思路，我们还可以绘制更有意思的：含有温度计隐喻的堆叠柱状图。温度计的关键点在于底部烧杯状图形的绘制，以及如何留白。对于留白，其实也简单，其实就是将填充的矩形左右的 x 坐标分别往内缩几个像素，然后在左右两边绘制两条线即可。
而对于底部烧杯，关键在于求出圆的半径，其实按照勾股定理推导下即可：

![image.png](https://gw.alipayobjects.com/zos/rmsportal/JPWGCsDMoBNpJUnUGpkf.png) 

## 最后，极坐标下的圆角矩形

<div id="c4"></div>

```js+
function getRectPath(points) {
  var path = [];
  for (var i = 0; i < points.length; i++) {
    var point = points[i];
    if (point) {
      var action = i === 0 ? 'M' : 'L';
      path.push([action, point.x, point.y]);
    }
  }
  var first = points[0];
  path.push(['L', first.x, first.y]);
  path.push(['z']);
  return path;
}
G2.Shape.registerShape('interval', 'roundedRect', {
  draw(cfg, container) {
    var points = cfg.points;
    var path = getRectPath(cfg.points);
    var r = (path[2][1] - path[1][1]) / 2;
    path = this.parsePath(path); // 将 0 - 1 的值转换为画布坐标
    var temp = [];
    temp.push(path[0]);
    temp.push(path[1]);
    temp.push(['A', r, r, 1, 0, 0, path[2][1], path[2][2]]);
    temp.push(path[3]);
    temp.push(['A', r, r, 1, 0, 0, path[4][1], path[4][2]]);
    return container.addShape('path', {
      attrs: {
        path: temp,
        fill: cfg.color,
        fillOpacity: cfg.opacity,
      }
    });
  }
});
var data = [
  { cate: '活动', value: 100 },
  { cate: '锻炼', value: 100 },
  { cate: '站立', value: 100 }
];
var userData = [
  { type: '活动', value: 60 },
  { type: '锻炼', value: 100 },
  { type: '站立', value: 150 }
];
var chart = new G2.Chart({
  id: 'c4',
  width: 400,
  height: 400,
  padding: 50
});
chart.coord('polar', {
  innerRadius: 0.25,
}).transpose();
chart.legend('cate', false);

var view = chart.view();
view.source(data);
view.tooltip(false);
view.interval()
  .position('cate*value')
  .color('cate', ['#003732', '#183800', '#37000a'])
  .opacity(0.8)
  .size(33);
var userView = chart.view();
userView.source(userData, {
  value: {
    max: 200,
  }
});
userView.interval()
  .position('type*value')
  .color('type', ['#00fff1', '#c1ff00', '#ff0078'])
  .opacity(0.7)
  .size(33)
  .shape('roundedRect');
chart.render();
```

使用多 view 和自定义 shape, 我们就可以模仿苹果的健身记录图表，绘制一个圆角玉珏图：


