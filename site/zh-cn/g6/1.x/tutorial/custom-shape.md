<!--
 index: 4
 title: 自定义图形
 resource:
   jsFiles:
     - ${url.g6}
-->

## 概述

`G6.registerNode` 和 `G6.registerEdge` 是开发者基于 G6 进行二次开发最主要的接口，**没有之一！**

* [注册--register](#_注册)
* [绘制--draw](#_绘制)
* [容器--group](#_容器)
* [配置项--cfg](#_配置项)
* [关键形--keyShape](#_关键形)
* [锚点--anchor](#_锚点)
* [绘制后--afterDraw](#_绘制后)
* [详解自定义节点](#_详解自定义节点)
* [详解自定义边](#_详解自定义边)

## 注册



```js
// 注册节点
G6.registerNode(name, {
  // 绘制
  draw: function(cfg, group){
    return keyShape;
  },
  // 绘制后执行
  afterDraw: function(cfg, group, keyShape){

  },
  // 获取锚点
  getAnchorPoints: function(cfg){
    return anchorPoints;
  }
});

// 注册边
G6.registerEdge(name, {
  // 绘制
  draw: function(cfg, group){
    return keyShape;
  },
  // 绘制后执行
  afterDraw: function(cfg, group, keyShape){

  }
});

```

接口如上，接下来会逐章跟大家说明。

!注意：G6 内置一些基础的节点如：矩形 `rect`、圆形 `circle`、文本 `text`、菱形 `rhombus`，一些基础的边如：直线 `line`、箭头 `arrow`、曲线 `smooth`、曲线箭头 `smoothArrow` 。建议大家在注册型(设置 name)时保留这几个字段，否则会覆盖 G6 内置的图形！[内置形详见](/g6/api/index.html)

## 绘制
与 G2 自定 Shape 类似，`draw` 是子项最终绘制的接口，决定了一个子项最终画成什么样。

## 容器
group 是绘图容器，其本身是一个完整的绘图引擎，通过操作我们图形库的 API，我们能在里面画出千千万万的图形！绘图 API 参见[绘图库 Canvas API](/g6/api/canvas.html)

实例：

![image](https://zos.alipayobjects.com/skylark/c2f10ada-bb93-44ac-af2c-ba869876be82/attach/2816/40fdb36628bbba8b/image.png)

```js
var data = {
  "nodes": [
    {
      "shape": "customNode",
      "id": "d62d1569"
    }
  ],
  "edges": []
}

G6.registerNode('customNode', {
  draw: function(cfg, group){
    group.addShape('text', {
      attrs: {
        x: 100,
        y: 100,
        fill: '#333',
        text: '我是一个自定义节点，\n有下面那个方形和我自己组成'
      }
    });
    return group.addShape('rect', {
      attrs: {
        x: 100,
        y: 100,
        width: 100,
        height: 100,
        stroke: 'red'
      }
    });
  }
});

var net = new G6.Net({
  id: 'c1',           // 容器ID
  width: 500,   // 画布宽
  height: 500, // 画布高
  grid: {
    forceAlign: true, // 是否支持网格对齐
    cell: 10          // 网格大小
  }
});
net.source(data.nodes, data.edges);
net.render();
```

## 配置项
group 使我们有画图的能力，cfg 则是绘制一个子项的配置信息。其三个视觉通道`位置`、`大小`、`颜色`和一个原始数据字段`origin`。一个子项的形态就由这个四个信息决定！

![image](https://zos.alipayobjects.com/skylark/37405df2-4974-4083-bce7-3d83d8ce657e/attach/2816/d792cc14c8f6b58f/image.png)

实例：
```js
var data = {
  "nodes": [
    {
      "shape": "customNode",
      "x": 100,
      "y": 250,
      "id": "d62d1569"
    },
    {
      "shape": "customNode",
      "x": 380,
      "y": 250,
      "id": "d62s1569"
    }
  ],
  "edges": [
    {
      "shape": "customEdge",
      "source": "d62d1569",
      "id": "75ae90a8",
      "target": "d62s1569"
    }
  ]
}

G6.registerNode('customNode', {
  draw: function(cfg, group){
    group.addShape('text', {
      attrs: {
        x: cfg.x-50,
        y: cfg.y-50,
        fill: '#333',
        text: '我是一个自定义节点（node）'
      }
    });
    return group.addShape('rect', {
      attrs: {
        x: cfg.x-50,
        y: cfg.y-50,
        width: cfg.size,
        height: cfg.size,
        stroke: cfg.color
      }
    });
  }
});

G6.registerEdge('customEdge', {
  draw: function(cfg, group){
    group.addShape('text', {
      attrs: {
        x: (cfg.points[0].x + cfg.points[1].x)/2,
        y: (cfg.points[0].y + cfg.points[1].y)/2,

        fill: '#333',
        text: '我是一个自定义边（edge）',
        textAlign: 'center'
      }
    });
    return group.addShape('polyline', {
      attrs: {
        points: [
          [cfg.points[0].x, cfg.points[0].y],
          [cfg.points[1].x, cfg.points[1].y]
        ],
        stroke: cfg.color,
        lineWidth: cfg.size
      }
    });
  }
});

var net = new G6.Net({
  id: 'c1',       // 容器ID
  width: 500,     // 画布宽
  height: 500     // 画布高
});
net.source(data.nodes, data.edges);
net.node()
  .color('red')
  .size(100);
net.edge()
  .color('blue')
  .size(3);
net.render();
```


!注意：值得注意的是，绘制节点(Node)的位置信息是：`cfg.x`、`cfg.y`。而边(Edge)的是 `points`。

## 关键形
keyShape 是 G6 特有的概念。简单来说，keyShape 是该子项参与图形计算的关键图形。所有的**击中**、**锚点**、**控制点**都是根据关键图形生成的，所以这个形（shape）真的非常非常关键！！

比如：

![image](https://zos.alipayobjects.com/skylark/c6820042-8774-484b-a1e8-2e72a1268e35/attach/2816/94a919f23c5f19fc/image.png)

返回 rect，则控制点参考 rect 生成！

```js
          var data = {
              "nodes": [
                  {
                      "shape": "customNode",
                      "id": "d62d1569"
                  }
              ],
              "edges": []
          }

          G6.registerNode('customNode', {
              draw: function(cfg, group){
                var text = group.addShape('text', {
                  attrs: {
                    x: 100,
                    y: 100,
                    fill: '#333',
                    text: '我是一个自定义节点，\n有下面那个方形和我自己组成'
                  }
                });
                var rect = group.addShape('rect', {
                  attrs: {
                    x: 100,
                    y: 100,
                    width: 100,
                    height: 100,
                    stroke: 'red'
                  }
                });

                return rect;
              }
          });

          net = new G6.Net({
              id: 'c1',           // 容器ID
              width: 500,   // 画布宽
              height: 500, // 画布高
              grid: {
                  forceAlign: true, // 是否支持网格对齐
                  cell: 10          // 网格大小
              }
          });
          net.source(data.nodes, data.edges);
          net.render();
```

![image](https://zos.alipayobjects.com/skylark/c9f01fdd-8c56-4fcf-b020-16d5e67ba857/attach/2816/903e9f2517e2a3c0/image.png)

返回 text，则控制点参考 text 生成！

```js
          var data = {
              "nodes": [
                  {
                      "shape": "customNode",
                      "id": "d62d1569"
                  }
              ],
              "edges": []
          }

          G6.registerNode('customNode', {
              draw: function(cfg, group){
                var text = group.addShape('text', {
                  attrs: {
                    x: 100,
                    y: 100,
                    fill: '#333',
                    text: '我是一个自定义节点，\n有下面那个方形和我自己组成'
                  }
                });
                var rect = group.addShape('rect', {
                  attrs: {
                    x: 100,
                    y: 100,
                    width: 100,
                    height: 100,
                    stroke: 'red'
                  }
                });

                return text;
              }
          });

          var net = new G6.Net({
              id: 'c1',           // 容器ID
              width: 500,   // 画布宽
              height: 500, // 画布高
              grid: {
                  forceAlign: true, // 是否支持网格对齐
                  cell: 10          // 网格大小
              }
          });
          net.source(data.nodes, data.edges);
          net.render();
```

## 锚点

### 锚点的配置

#### 位置定义

锚点是自定义节点时一个重要的概念，它表示一个节点可以被线连接的地方。在 G6 中，我们可以通过 `getAnchorPoints` 方法自定义锚点，示意图如下：

<img src="https://zos.alipayobjects.com/rmsportal/mTgmMrZpztmjClKMqKrX.png" style="width: 300px;" width="300px"/>

```js
G6.registerNode('customNode', {
  getAnchorPoints: function(cfg, group) {
    return [
      [0.5, 1], // 上边的中点
      [1, 0.5], // 右边的中点
      [0.5, 0], // 下边的中点
      [0, 0.5]  // 左边的中点
    ];
  }
});
```

#### 属性配置

除了定义位置，在做编辑的交互的时候，我们可能还要配置锚点的颜色、鼠标悬浮时候的颜色、该锚点是否可以连接，这个时候，我们还能通过设置第三个参数进行锚点配置项的设置，[示例](/g6/demo/06-other/anchor-type.html)。

```js
G6.registerNode('customNode', {
  getAnchorPoints: function(cfg, group) {
    return [
      [0.5, 1, {
        // 锚点图形属性
        style: {
          fill: 'red',
          fillOpacity: 0.7
        },
        // 悬浮锚点图形属性
        hoverStyle: {
          stroke: null
        },
        // 是否可以连接
        linkable: false
      }], // 上边的中点
      [1, 0.5], // 右边的中点
      [0.5, 0], // 下边的中点
      [0, 0.5]  // 左边的中点
    ];
  }
});
```

#### 锚点类型

这里的 `getAnchorPoints` 方法除了返回 `二维数组` ，还能返回 `auto`、`false`，分别表示自动锚点和不使用锚点。[示例](/g6/demo/06-other/anchor-atrr.html)。

```js
G6.registerNode('custom1', {
  // 常规锚点
  getAnchorPoints: function(){
    return [
      [0, 0.5],   // 左边中点 索引为 0
      [1, 0.5]    // 右边中点 索引为 1
    ];
  }
});
G6.registerNode('custom2', {
  // 自动锚点
  getAnchorPoints: function(){
    return 'auto';
  }
});
G6.registerNode('custom3', {
  // 不使用锚点（ 自动连接中心 ）
  getAnchorPoints: function(){
    return null;
  }
});
```

### 锚点的交互

在更复杂的一些场景里，有的时候我们可能还需要动态控制锚点的数量，甚至对锚点的连接做一些控制。这个时候，我们不妨把`锚点的配置信息和节点的数据模型进行绑定`，从而实现节点的动态锚点的需求。[示例](/g6/demo/06-other/anchor-update.html)。

```js
G6.registerNode('custom', {
  getAnchorPoints: function(cfg){
    var model = cfg.model;
    // 将锚点与数据源关联
    return model.anchorPoints;
  }
});
```

### 综合示例

![image](/assets/image/g6/04-editor/perventLink.gif)

[示例源码](/g6/demo/04-editor/perventLink.html)

## 绘制后

通过上面的接口我们已经能定义出任何`节点`和`边`，但是很多时候，我们希望基于当前`形`的基础上添加一些信息，而不是用`draw`方法全部重新画。这个时候我们能通过调用 `afterDraw` 方法在原有形基础上添加新的图形。用法如下：

 <div id='c1'></div>

````js
G6.registerNode('customRect', {
  afterDraw: function(cfg, group) {
    group.addShape('text', {
      attrs: {
        x: cfg.x-cfg.size[0]/2,
        y: cfg.y-cfg.size[1]/2,
        fill: 'red',
        text: '我是绘制（draw）节点\n后添加的文本'
      }
    });
  }
});
G6.registerEdge('line', {
  afterDraw: function(cfg, group, keyShape) {
    var center = keyShape.getPoint(0.5);
    group.addShape('text', {
      attrs: {
        x: center.x,
        y: center.y,
        fill: 'blue',
        textAlign: 'center',
        text: '我是绘制（draw）边\n后添加的文本'
      }
    });
  }
});
var data = {
  source: {
    "nodes": [
      {
        "x": 100,
        "y": 210,
        "id": "node1"
      },
      {
        "x": 300,
        "y": 210,
        "id": "node2"
      }
    ],
    "edges": [
      {
        "source": "node1",
        "id": "edge1",
        "target": "node2"
      }
    ]
  }
};
var net = new G6.Net({
    id: 'c1',      // 容器ID
    width: 500,    // 画布宽
    height: 500,   // 画布高
    mode: 'none',  // 模式
    grid: {
      forceAlign: true, // 是否支持网格对齐
      cell: 10          // 网格大小
    }
  });
net.node().shape('customRect');
net.read(data);
net.render();
````

## 详解自定义节点

### 配置项详解

* 位置：cfg.x, cfg.y
* 颜色：cfg.color
* 尺寸：cfg.size
* 原始数据：cfg.model

### 使用 HTML 节点

用原生 canvas 或是用我们内部封装的 2D 绘图引擎 G6.Canvas，画一些图形都挺方便。但直接操作它们去画一些`列表`、`复杂图标`，或是处理`文本`的对齐、行高。对于 web 工程师来说总是不如使用 HTML 来得更直接、更方便。如今 HTML 节点已正式加入 G6 豪华流程图大礼包，各位再也不用看着 HTML CSS 眼馋了！ 

#### 简单示例

![image](/assets/image/g6/06-other/htmlnode.png)

[示例源码](/g6/demo/06-other/htmlnode.html)

#### 综合示例

![image](https://gw.alipayobjects.com/zos/rmsportal/kGCoKUTAKPdYUifVIWvJ.png)

> 该图展示了对鸢尾花数据集进行关联分析的过程中，如何可视化关联分析的结果。该示例用颜色映射的花的种类，连接线映射了关联度在 0.7 以上的关系。连线上点的大小表示关联度的强弱。每个节点所画的占比玉玦图，表示每个品种在该属性下，不同数值区间内的占比。由图可得出结论，花瓣长度和花瓣宽度，在所有品种下都有关联关系，并且各个品类间有明显的分层。所以这两个属性，适合用于做区分种类的关键指示器。该示例主要向大家展示了如何使用 html 节点巧妙的结合 G6 与 G2，从而呈现一份精彩的可视化作品。[示例链接](/g6/demo/05-gallery/iris-flower.html)


### 动态计算锚点

有的时候，我们并不能写死锚点，需要根据节点本身动态计算锚点的数量和位置。这意味这 `draw` 方法里的信息要能传到，`getAnchorPoints` 里，此时我们不妨在 draw 方法中计算好锚点，再存到 `group` 里，然后在 `getAnchorPoints` 时将锚点信息取出，return 回去即可。

![image](https://zos.alipayobjects.com/skylark/e537c24e-1976-41e7-b4f6-b3cc63e924db/attach/2816/68b3988f18d698b9/image.png)

[Demo源码](/g6/demo/05-gallery/dataBase.html)

## 详解自定义边

相较于自定义节点，自定义边相对比较复杂一点，这里给出一些最佳实践，以帮助用户更好的画边。

`注意`：由于画边相对复杂，不建议大家直接复写 draw 方法。

### 配置项详解

* 边控制点：points // 理论上 `points` 可以有无穷多个点，从 points[0] 到 points[n]，依次是源节点到目标节点的控制点位置。
* 目标节点： cfg.target // 目标节点 详见：[Node API](/g6/api/item.html#节点——node)
* 源节点：cfg.source // 源节点 详见：[Node API](/g6/api/item.html#节点——node)
* 颜色：cfg.color
* 尺寸：cfg.size
* 原始数据：cfg.model

### 自定义箭头

自定义箭头是常见的需求，但这个需求看似简单，真正实现起来却没那么简单。目前 G6 里还没有提供十分便捷的添加箭头的方式，只提供了一个比较基础的工具方法，若有自定义箭头的需求，不妨使用。

<div id="customArrow"></div>

[Demo源码](/g6/demo/06-other/custom-arrow.html)

```js-
var Util = G6.Util;
G6.registerEdge('bezierQuadratic', {
  afterDraw: function(cfg, group, keyShape) {
    var points = cfg.points;
    var start = points[0];
    var end = points[points.length - 1];
    var center = keyShape.getPoint(0.5);
    var lineWidth = keyShape.attr('lineWidth');
    if(lineWidth < 5){
      lineWidth = 5;
    }
    // 关于自身坐标系构造一个形，作为箭头
    var arrow = group.addShape('polyline', {
      attrs:{
        points: [
          [-lineWidth/4, lineWidth/2],
          [lineWidth/4, 0],
          [-lineWidth/4, -lineWidth/2]
        ],
        stroke: '#333'
      },
      class: 'arrow'
    });
    Util.arrowTo(arrow, center.x, center.y, center.x, center.y, end.x, end.y);
  }
});
var data = {
  "source": {
    "nodes": [
      {
        "shape": "rect",
        "label": "文本",
        "x": 550,
        "y": 260,
        "id": "af11b7bc"
      },
      {
        "shape": "rect",
        "label": "文本",
        "x": 780,
        "y": 260,
        "id": "313ed868"
      }
    ],
    "edges": [
      {
        "source": "af11b7bc",
        "target": "313ed868",
        "id": "bd2bc602"
      },
      {
        "source": "313ed868",
        "target": "af11b7bc",
        "id": "1be6dc9f",
        "size": 2,
        "targetAnchor": 2,
        "sourceAnchor": 2
      },
      {
        "source": "af11b7bc",
        "target": "313ed868",
        "id": "3d463cd1",
        "targetAnchor": 0,
        "sourceAnchor": 0
      },
      {
        "source": "313ed868",
        "target": "af11b7bc",
        "id": "ba7e057c",
        "size": 6
      }
    ]
  }
};
var net = new G6.Net({
    id: 'customArrow',      // 容器ID
    width: 500,    // 画布宽
    height: 500,   // 画布高
    fitView: 'cc', // 图居中自适应
    mode: 'none',  // 模式
    grid: {
      forceAlign: true, // 是否支持网格对齐
      cell: 10          // 网格大小
    }
  });
net.read(data);
net.edge().shape('bezierQuadratic');
net.render();
```

