<!--
index: 6
title: 玩玩 G2 系列之圆角矩形
-->

# 玩玩 G2 系列之圆角矩形

前言：

> 总有一天你的棱角会被世界磨平，你会拔掉身上的刺，你会学着对讨厌的人微笑，你会变成一个不动声色的人。

`2017-03-21 14:57`，乔林童鞋在钉钉上问了我这么一个问题：

![image.png](http://alipay-rmsdeploy-image.cn-hangzhou.alipay.aliyun-inc.com/skylark/attach/7819/f4821c1a917c0c49/image.png) 

圆角矩形，不由得想起几年前闹得沸沸扬扬的苹果圆角矩形外观设计专利。

![image.png](http://alipay-rmsdeploy-image.cn-hangzhou.alipay.aliyun-inc.com/skylark/attach/7819/a93621a070593053/image.png) ![image.png](http://alipay-rmsdeploy-image.cn-hangzhou.alipay.aliyun-inc.com/skylark/attach/7819/7b8513195502928d/image.png) 

上面只是题外话。在构建图表可视化的过程中，设计师经常会加入一些小图形来修饰其设计，但这并无违和感，比如圆角柱状图（可以说是对于原始图表调整最小的设计了，但是这种变化可能会存在一个问题，就是使得柱状图顶部缺少一条有效的水平线，是柱状图之间难以比较，但是呢，这个缺点是可以通过坐标轴的网格线来掩盖，使柱状图的表达更有效~ 有没有一下理解了网格线的存在意义![image.png](http://alipay-rmsdeploy-image.cn-hangzhou.alipay.aliyun-inc.com/skylark/attach/7819/22da42d3e934e135/image.png)）。

那么回到乔林的问题， 如何使用 G2 来绘制圆角柱状图呢？目前 G2 默认绘制出的柱状图是这样的：

![image.png](http://alipay-rmsdeploy-image.cn-hangzhou.alipay.aliyun-inc.com/skylark/attach/7819/d75c9465c4d62024/image.png) 

在 CSS 中，我们可以通过设置 `border-radius` 属性很方便得设置圆角，其实对于 G2 的底层绘制库 [G](https://antv.alipay.com/g2/api/canvas.html)，我们也为 [`rect`](https://antv.alipay.com/g2/api/canvas.html#矩形——rect) 这个 shape 提供了 `radius` 这个属性支持矩形圆角的绘制。但是问题来了，G2 内部是使用 path 路径来实现矩形的绘制的，那就无法开心得简简单单得通过设置 `radius` 来设置了。。。那怎么办？有办法， G2 的强大就在于只要你敢想，我们就能实现的扩展能力：[自定义 shape](https://antv.alipay.com/g2/doc/tutorial/advance/custom-shape.html)。

在这之前，我们需要了解下，对于 G2 来说，一个矩形是如何绘制的，其实很简单，矩形由四个顶点组成，将这四个顶点连接即可，这四个顶点即 G2 中绘制每种几何图形的关键点，以矩形为例，在 G2 中我们从左下角作为起始点，顺时针逐点连接：

![image.png](http://alipay-rmsdeploy-image.cn-hangzhou.alipay.aliyun-inc.com/skylark/attach/7819/d86e1c047a40134c/image.png) 

在自定义 shape 的接口中，我们提供了绘制图形所有需要的信息（[api](https://antv.alipay.com/g2/api/shape.html)），下面让我们来看下如何绘制圆角矩形吧:

## 圆角柱状图

![be8cb05e9a280a9f96e26eef123c0722.png](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/attach/7819/be8cb05e9a280a9f96e26eef123c0722.png) 

绘制原理如下如所示，G 的 rect 的起始点为左上角，根据提供的四个关键点，我们可以求出矩形的宽度和高度，然后通过设置 radius 属性就可以自定义一个带圆角的矩形。

![image.png](http://alipay-rmsdeploy-image.cn-hangzhou.alipay.aliyun-inc.com/skylark/attach/7819/3d70a10239d0371e/image.png) 

关键代码：

```js
Shape.registShape('interval', 'borderRadius', {
  drawShape(cfg, container) {
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
        x: path[1][1],// 矩形起始点为左上角
        y: path[1][2], 
        width: path[2][1] - path[1][1],
        height: path[0][2] - path[1][2],
        fill: cfg.color,
        radius: 10,
      },
    });
  },
});
```
线上demo：https://antv.alipay.com/g2/demo/19-creations/rounded-bar.html

## 圆角层叠柱状图

![49188765e260d430007a0af1a281363c.png](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/attach/7819/49188765e260d430007a0af1a281363c.png) 

那么如何绘制上下带圆角的层叠柱状图呢？其实思路很简单，同样使用自定义 shape，将最上部矩形的 shape 映射为上边带圆角的矩形，将最底部的矩形映射为底边带圆角的矩形。

![image.png](http://alipay-rmsdeploy-image.cn-hangzhou.alipay.aliyun-inc.com/skylark/attach/7819/e9e4610fb493ef12/image.png) 

关键代码：

```js
// 顶边带圆角
Shape.registShape('interval', 'top', {
  drawShape(cfg, container) {
    var points = cfg.points;
    var attrs = getFillAttrs(cfg);
    let path = getRectPath(cfg.points);
    path = this.parsePath(path); // 将 0 - 1 的值转换为画布坐标
    var radius = (path[2][1] - path[1][1]) / 2;
    var temp = [];
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
      }),
    });
  },
});
// 底边带圆角
Shape.registShape('interval', 'bottom', {
  drawShape(cfg, container) {
    var points = cfg.points;
    var attrs = getFillAttrs(cfg);
    let path = getRectPath(cfg.points);
    path = this.parsePath(path);
    var radius = (path[2][1] - path[1][1]) / 2;
    var temp = [];
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
      }),
    });
  },
});

chart.intervalStack().position('year*sales').color('type', ['#468DF1', '#CD5744', '#EDB430']).size(35)
  .shape('type', function(val) {
    if (val === 'Profit') { // 顶部圆角
      return 'top';
    } else if (val === 'Sales') { // 底部圆角
      return 'bottom';
    } else {
      return; // 其他默认
    }
  });
```

线上 demo: https://antv.alipay.com/g2/demo/19-creations/rounded-stacked-bar.html

## 更猛的，温度计

![image.png](http://alipay-rmsdeploy-image.cn-hangzhou.alipay.aliyun-inc.com/skylark/attach/7819/b6c2690c829d2a58/image.png) 

按照圆角层叠柱状图的思路，我们还可以绘制更有意思的：含有温度计隐喻的层叠柱状图。温度计的关键点在于底部烧杯状图形的绘制，以及如何留白。对于留白，其实也简单，其实就是将填充的矩形左右的 x 坐标分别往内缩几个像素，然后在左右两边绘制两条线即可。
而对于底部烧杯，关键在于求出圆的半径，其实按照勾股定理推导下即可：

![image.png](http://alipay-rmsdeploy-image.cn-hangzhou.alipay.aliyun-inc.com/skylark/attach/7819/f5113301e854ae67/image.png) 

关键代码详见线上 demo: https://antv.alipay.com/g2/demo/19-creations/thermometer.html

## 最后，极坐标下的圆角矩形

![image.png](http://alipay-rmsdeploy-image.cn-hangzhou.alipay.aliyun-inc.com/skylark/attach/7819/1bf5ba31369e22e5/image.png) 

使用多 view 和自定义 shape, 我们就可以模仿苹果的健身记录图表，绘制一个圆角玉珏图：

线上 demo: https://antv.alipay.com/g2/demo/19-creations/rounded-radial-bar.html

