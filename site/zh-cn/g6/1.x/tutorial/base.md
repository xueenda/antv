<!--
 index: 1
 title: 基础指南
 resource:
   jsFiles:
     - ${url.g6}
     - ${url.jquery}
-->

## 概述
本文档是关系图库图 —— G6 的基础使用文档，本文旨在说明 G6 的组成结构，和一些重要的`概念`、`属性`和`接口`，详细内容请参看[API 文档](/g6/api/index.html)。

* [安装--install](#_安装)
* [结构--construction](#_结构)
* [图--graph](#_图)
* [网--net](#_网)
* [树--tree](#_树)
* [数据--data](#_数据)
* [交互--interaction](#_交互)

## 安装

### 浏览器引入

```js
<script src="https://gw.alipayobjects.com/as/g/datavis/g6/1.1.6/index.js"></script>
```

### 通过 npm 安装

外部用户暂时不提供 npm 安装，阿里集团内部同学，可通过 `tnpm i @ali/g6` 安装。

## 结构
<style type="text/css">
  .g6-tooltip ul li {
    list-style: none;
    color: #fff;
  }
  .g6-tooltip h4 {
    font-size: 18px;
  }
  .g6-tooltip h4 {
    background: none;
    color: #fff;
    padding-left: 0px;
  }
</style>
<div id="construction"></div>

<script >
  var tree = new G6.Tree({
    id: 'construction',
    height: 500,
    fitView: 'autoSize',
    behaviourFilter: ['wheelZoom', 'dragBlank', 'dragCanvas']
  });
  tree.source({
    label: 'G6',
    children: [{
      label: '图类',
      children: [
        {
          label: 'Graph'
        },
        {
          label: 'Net'
        },
        {
          label: 'Tree'
        },
        {
          label: '……'
        }
      ]
    },
    {
      label: '基础类',
      children: [
        {
          label: 'Canvas'
        },
        {
          label: 'Handler'
        },
        {
          label: 'Layout'
        },
        {
          label: 'Global'
        }
      ]
    },
    {
      label: '工具类',
      children: [
        {
          label: 'Matrix'
        },
        {
          label: 'Color'
        },
        {
          label: 'Util'
        }
      ]
    }]
  });
  tree.edge().shape('smooth');
  tree.render();
</script>


<!--
![image](https://zos.alipayobjects.com/rmsportal/fAuKmAeUdAkGHXkrnKjV.png)

在 G6 中，每一幅关系图都由最基本的两个元素：**节点**和**边**组成。通过操作节点及边的位置，生成特定的**布局**。开发者可以基于 G6 ，通过自定义节点和自定义边生成特点的**样式**，再通过事件和基础交互生成特定**交互**。布局、样式、交互三者共同地组成了特定的关系图图表。


G6 既是关系图模板的**合集**，与此同时其自身也是**默认模版**，同时也是关系图的**基础框架**。使用者可以通过使用用G6沉淀的专业模板绘制出有严格定义的、专业的关系图，如：树图、UML图等。也可使用默认基础模板画出任何未被定义的关系图。开发者们亦可以基于G6开发特定的关系图。
-->

## 图
 图 Graph 是所有上层图类的基类，如：Net 网、 Tree 树，都继承于Graph。与以往不同，1.0 后，Graph 已沉为一个抽象类(Abstract)，只实现了基础的功能，定义了接口规范，用户可基于 Graph 进行拓展，但不能直接用于画关系图。以后 G6 里还要容纳更多的关系图如 UML、Flow、Force都将基于 Graph ，详见：[Graph API](/g6/api/graph.html)。

<div id="graph"></div>

<script >
  var tree = new G6.Tree({
    id: 'graph',
    height: 500,
    fitView: 'autoSize',
    behaviourFilter: ['wheelZoom', 'dragBlank', 'dragCanvas']
  });
  tree.source({
    label: 'Graph 基类',
    children: [{
      label: '树图'
    },
    {
      label: '网图'
    }]
  });
  tree.edge()
    .shape('smooth')
    .label('继承');
  tree.render();
</script>

## 网
网图 Net 是 G6 提供的、可用于直接画关系图的、最基础的图类。它不仅能画由一组`nodes`、`edges`，确定的关系图，还集成了，如：拖拽节点（dragNode）、拖拽画布（dragCanvas）、拖拽边（dragEdge）、节点变形（resizeNode）等等，一系列的`基础`的编辑交互模式，用户可以比较方便的基于该类，绘制做一个关系图的展示视图或图编辑器。详见：[网图指南](/g6/doc/tutorial/start/net.html)，[Net API](/g6/api/net.html)。

<div id='net' style="width: 800px;background: #222222"></div>

<script>
$.getJSON('/static/data/influenceNetwork.json',function(data){
  var Util = G6.Util;

  G6.registNode('circle', {
    afterDraw: function(cfg, group, keyShape){
      var model = cfg.model;
      var size = model.size;
      var bbox = keyShape.getBBox();
      var paddingLeft = 20;
      var y = (bbox.maxY + bbox.minY)/2;
      var x = bbox.maxX + paddingLeft;

      if(size > 20){ // 只展示影响力大于 10 的线
        group.addShape('text', {
          attrs: {
            x: x,
            y: y,
            fill: '#fff',
            text: model.language,
            textAlign: 'left',
            fontSize: 80,
            textBaseline: 'middle'
          }
        })
      }
    }
  });

  var net = new G6.Net({
   id: "net",           // 此处替换容器id
   height: 500,        // 此处替换高度
   fitView: 'autoZoom',
   useAnchor: false,
   mode: 'complicated',
   behaviourFilter: ['wheelZoom', 'wheelZoomHideEdges'],
   grid: null
  });
  var nodeMap = {};
  var hideItem;
  Util.each(data.nodes, function(node){
    nodeMap[node.id] = node;
    Util.mix(node, node.attributes);
    delete node.attributes;
  });
  net.tooltip(true);
  net.source(data.nodes, data.edges);
  net.node()
     .tooltip('language*size*modularityClass', function(language, size, modularityClass){
       return [
         ['语言', language],
         ['影响力', size],
         ['模块数', modularityClass]
       ];
     })
     .size('size', function(size){
       size = size <= 10 ? 10 : size;
       return rst;
     })
     .shape('circle')
     .style({
       fillOpacity: 1
     });
  net.edge()
     .shape('bezierQuadratic')
     .style({
       strokeOpacity: 0.8
     })
     .color('source', function(source){
       return nodeMap[source].color;
     });
  net.render();
  net.on('mouseenter', function(ev){
    var item = ev.item;
    var keyShape;
    var edges;
    var id;
    if(item.get('type') === 'node') {
      id = item.get('id');
      edges = item.get('edges');
      Util.each(edges, function(edge){
        if(edge.get('model').source === id ){
          keyShape = edge.getKeyShape();
          keyShape.attr('lineWidth', 4);
        }
      });
      net.refresh();
    }
  });
  net.on('mouseleave', function(ev) {
    var item = ev.item;
    var keyShape;
    var edges;
    var id;
    if(item.get('type') === 'node') {
      id = item.get('id');
      edges = item.get('edges');
      Util.each(edges, function(edge){
        if(edge.get('model').source === id ){
          keyShape = edge.getKeyShape();
          keyShape.attr('lineWidth', 1);
        }
      });
      net.refresh();
    }
  });
  net.on('click', function(ev) {
    var item = ev.item;
    var unRelativeItems;

    if(item && item.get('type') === 'node') {
      if(hideItem){
        Util.each(hideItem, function(subItem){
          subItem.show();
        });
        hideItem = null;
      }
      unRelativeItems = item.getUnRelativeItems();
      Util.each(unRelativeItems, function(subItem){
        subItem.hide();
      });
      net.autoZoom();
      hideItem = unRelativeItems; // 缓存被隐藏的子项
    }
  });
  net.on('dblclick', function(ev) {
    if(hideItem){
      Util.each(hideItem, function(subItem){
        subItem.show();
      });
      hideItem = null;
    }
    net.autoZoom();
  });
});
</script>

## 树
树 Tree 是 G6 1.0 发布后，我们尝试封装的第一个的图类。我们精细打磨的树相关的交互，已经提供 `20 +` 种树的布局，欢迎大家使用！详见[Tree Demo](/g6/demo/index.html#树图)，[Tree API](/g6/api/tree.html)。

<div id="tree"></div>

<script>
$.getJSON('/static/data/g6-npm-ls-tiny-tree.json',function(data){
  function hasClass (shape, className) {
    if (shape) {
     var clasees = shape.get('class');
     if (clasees && clasees.indexOf(className) !== -1) {
       return true;
     }
    }
    return false;
  }

  var Util = G6.Util;
  // 准备布局配置
  var layoutCfg = {
   "direction": "LR",
   "nodeSep": 20,
   "nodeSize": 20,
   "rankSep": 200
  };
  // 自定义树节点
  var DEFAULT_NODE_SIZE = 5;
  G6.registNode('treeNode', {
   draw(cfg, group) {
     var model = cfg.model;
     var r = layoutCfg.nodeSize ? layoutCfg.nodeSize / 2 : DEFAULT_NODE_SIZE;
     var shapeCfg = {
       attrs: {
         x: cfg.x,
         y: cfg.y,
         r: r,
         stroke: '#003380',
         fill: 'white',
         fillOpacity: 1,
       },
     };
     if (model.children && model.children.length) {
       shapeCfg.class = model.isCollapsed ? 'spreadoutButton' : 'collapseButton';
       shapeCfg.attrs.fill = '#044A9A';
       shapeCfg.attrs.stroke = '#003380';
       shapeCfg.attrs.fillOpacity = 0.4;
     }
     if (model.root) {
       shapeCfg.attrs.fill = '#044A9A';
       shapeCfg.attrs.stroke = '#003380';
       shapeCfg.attrs.fillOpacity = 0.7;
     }
     shapeCfg.attrStash = Util.mix({}, shapeCfg.attrs);
     return group.addShape('circle', shapeCfg);
   },
   afterDraw(cfg, group) {
     var model = cfg.model;
     var r = layoutCfg.nodeSize ? layoutCfg.nodeSize / 2 : DEFAULT_NODE_SIZE;
     var align = model.align;
     var labelAttrs = {
       text: model.name,
       fill: '#666',
       textBaseline: 'middle',
       fontSize: 20,
       x: cfg.x + r + DEFAULT_NODE_SIZE,
       y: cfg.y,
       textAlign: 'left',
     };
     if (align === 'R') {
       Util.mix(labelAttrs, {
         x: cfg.x - r - DEFAULT_NODE_SIZE,
         y: cfg.y,
         textAlign: 'right',
       });
     } else if (align === 'T' || align === 'CH') {
       Util.mix(labelAttrs, {
         x: cfg.x,
         y: cfg.y + r + DEFAULT_NODE_SIZE,
         textAlign: 'right',
         rotate: -Math.PI / 2,
       });
     } else if (align === 'B') {
       Util.mix(labelAttrs, {
         x: cfg.x,
         y: cfg.y - r - DEFAULT_NODE_SIZE,
         textAlign: 'left',
         rotate: -Math.PI / 2,
       });
     }
     var label = group.addShape('text', {
       attrs: labelAttrs,
     });
     return label;
   }
  });

  // 生成树图实例
  var tree = new G6.Tree({
   id: 'tree', // 容器ID
   layoutCfg: layoutCfg,       // 布局配置
   showButton: false,
   width: 600,
   height: 450,     // 画布高
   fitView: 'autoZoom',
   behaviourFilter: ['wheelZoom'],
   layoutFn: G6.Layout.LayeredTidyTree, // 布局类型
  });

  // 加载数据
  tree.source(data);
  tree.node().shape('treeNode');
  tree.edge()
     .shape('smooth')
     .style({
       stroke: '#A9BCD3'
     });

  // 渲染树图
  tree.render();

  // 添加事件
  tree.on('mouseenter', function(ev){
   var item = ev.item;
   var keyShape;
   if (item && item.get('type') === 'node') {
     keyShape = item.getKeyShape();
     if( hasClass(keyShape, 'Button') ){
       keyShape.attr('fillOpacity', 0.2);
       keyShape.attr('strokeOpacity', 0.8);
       tree.refresh();
     }
   }
  });
  tree.on('mouseleave', function(ev){
   var item = ev.item;
   var keyShape;
   var attrStash;
   if (item && item.get('type') === 'node') {
     keyShape = item.getKeyShape();
     if( hasClass(keyShape, 'Button') ){
       attrStash = keyShape.get('attrStash');
       keyShape.attr(attrStash);
       tree.refresh();
     }
   }
  });
});
</script>

## 数据
在使用关系图开发的过程中，我们常常需要导出导入数据，以满足关系图的存储、分享、编辑的功能。 G6 1.0 后，我们对这部分的需求做了总结。在 Graph 定义了一对相互对照的接口，read <==> save，后面用户应该严格通过这两个该接口导入导出数据。参看[Demo](/g6/demo/06-other/saveAndread.html)

### 导入 -- read

导入数据

```js
/**
 * 导入数据
 * @param  {Object}  data   通过save导出的数据
 */
graph.read(data);
```

### 导出 -- save

导出数据

```js
/**
 * 导出数据
 * @return  {Object}  data  导出的数据
 */
graph.save();
```

## 交互
 G6 1.0 为了使用户能复用 G6 内置的交互，并能随意插拔，我们实现了一套由`事件`组成`行为`，由`行为`组成`模式`的交互机制。用于能通过，graph 上行为、模式、相关的接口，随意`组装`，`插拔`，交互行为。


<div id="interaction" style="800px"></div>

<script>
var data = {
  source: {
    "nodes": [
      {
        "shape": "rect",
        "label": "行为",
        "x": 910,
        "y": 230,
        "id": "244aba8a"
      },
      {
        "shape": "rect",
        "label": "模式",
        "x": 1060,
        "y": 230,
        "id": "b5ac2003"
      },
      {
        "shape": "rect",
        "label": "事件",
        "x": 760,
        "y": 230,
        "id": "d16a14a7"
      }
    ],
    "edges": [
      {
        "shape": "arrow",
        "source": "244aba8a",
        "target": "b5ac2003",
        "id": "c7ac7b93",
        "style": {
          "lineDash": [
            10,
            5
          ]
        },
        "label": "信号量反馈",
        "controlPoints": [
          {
            "x": 910,
            "y": 246
          },
          {
            "x": 910,
            "y": 300
          },
          {
            "x": 1060,
            "y": 300
          },
          {
            "x": 1060,
            "y": 246
          }
        ]
      },
      {
        "shape": "arrow",
        "source": "d16a14a7",
        "target": "244aba8a",
        "label": "组成",
        "id": "5b97ec58"
      },
      {
        "shape": "arrow",
        "source": "244aba8a",
        "target": "b5ac2003",
        "label": "组成",
        "id": "60dcc6a9"
      }
    ]
  }
};
var net = new G6.Net({
  id: 'interaction',
  height: 500,
  grid: null,
  fitView: 'autoSize',
  modes: {
    none: []
  },
  mode: 'none'
});
net.read(data);
net.render();
</script>

### 事件 -- event

<div id="c0"></div>

<script type="text/javascript">
$(function() {
  var data = {
    nodes: [
      {
        "id": "node1",
        "x": 100,
        "y": 160
      },
      {
        "id": "node2",
        "x": 290,
        "y": 160
      }
    ],
    edges: [
      {
        "id": "node1-node2",
        "target": "node1",
        "source": "node2"
      }
    ]
  };
  var net = new G6.Net({
    id: 'c0',           // 容器ID
    width: 500,         // 宽度自适应
    height: 500,        // 画布高
    fitView: 'autoSize',
    mode: 'none',
    grid: null
  });
  net.source(data.nodes, data.edges);
  net.render();
  net.on('click', function(ev){
    alert("击中" + ev.item.get('model').id + "!");
  });
  net.on('mousedown', function(ev){
    var item = ev.item;
    if(net.isNode(item)){
      net.update(item, {
        shape: 'circle'
      });
      net.refresh();
    }
  });
  net.on('mouseup', function(ev){
    var item = ev.item;
    if(net.isNode(item)){
      net.update(item, {
        shape: 'rect'
      });
      net.refresh();
    }
  });
  net.on('mouseenter', function(ev){
    var item = ev.item;
    net.update(item, {
      color: 'red'
    });
    net.refresh();
  });
  net.on('mouseleave', function(ev){
    var item = ev.item;
    net.update(item, {
      color: null
    });
    net.refresh();
  });
});
</script>

[Demo源码](/g6/demo/06-other/event.html)

G6 封装了一套基础的鼠标事件。通过`graph.on()` 绑定，`graph.off()`解除。

* 事件对象

  * x 在画布上的坐标x
  * y 在画布上的坐标y
  * domX 相对于画布容器的坐标
  * domY 相对于画布容器的坐标y
  * item 节点或者边
  * shape 当前的形
  * itemType 'node' or 'edge'
  * toEvObj 到达的目标事件对象

* 事件类型

  * 鼠标点击——click
  * 鼠标按下——mousedown
  * 鼠标起来——mouseup
  * 鼠标移动——mousemove
  * 鼠标移入——mouseenter
  * 鼠标移出——mouseleave

  ……

### 行为 -- behaviour

行为由事件组成，所描述的交互，比事件更具体，如 拖动节点（dragNode），滚轮缩放画布（wheelZoom），拖动画布（dragCanvas）。用户可以根据自己的需要选择对应的行为。此外 Graph 上还提供了一些简便方法管理行为。详见：[Graph API](/g6/api/graph.html)，行为列表详见：[Handle API](/g6/api/handler.html)

#### addBehaviour 添加行为

```js
/**
 * 添加行为
 * @param  {String} modeName   模式
 * @param  {String} behaviours 行为
 */
graph.addBehaviour(modeName, behaviours);
```

#### removeBehaviour 添加行为

```js
/**
 * 添加行为
 * @param  {String} modeName   模式
 * @param  {String} behaviours 行为
 */
graph.removeBehaviour(modeName, behaviours);
```

参看[Demo](/g6/demo/06-other/mode.html)

### 模式 -- mode
大多数行为可以随意相互组合，也有部分行为之间有可能发生矛盾，比如 拖动画布（dragCanvas）行为和多选行为（multiSelect），这个时候需要用户自己维护各种行为集合组成模式，比如`拖拽模式（drag）`，`编辑模式（edit）`，以便管理、切换。

#### changeMode 切换模式

```js
/**
 * 切换模式
 * @param  {String} modeName   模式名
 */
graph.changeMode(modeName);
```

参看[Demo](/g6/demo/06-other/mode.html)

<!--
## 映射

与 G2 类似， G6 中也有数据到图形属性映射的概念。但 G6 中映射的功能比较简单，边和节点各自有**形状（shape）**、**颜色（color）**、**大小（size）**、**文本（text）**、**提示信息（tooltip）** 等多个映射通道，每个通道均只支持回调函数。

<div id='c2'></div>

<script type="text/javascript">
$(function() {
  var data = {
    "nodes": [
      {
        "x": 550,
        "y": 300,
        "type": "type2",
        "value": 20,
        "active": true,
        "id": "系统二"
      },
      {
        "x": 360,
        "y": 300,
        "type": "type1",
        "value": 30,
        "active": true,
        "id": "系统一"
      },
      {
        "x": 780,
        "y": 300,
        "type": "type3",
        "value": 15,
        "active": false,
        "id": "系统三"
      }
    ],
    "edges": [
      {
        "type": "type1",
        "source": "系统一",
        "id": "32cb9f22",
        "value": 30,
        "active": true,
        "target": "系统二"
      },
      {
        "type": "type2",
        "source": "系统二",
        "id": "795e94a7",
        "value": 20,
        "active": false,
        "target": "系统三"
      },
      {
        "type": "type3",
        "source": "系统三",
        "id": "55fe688d",
        "target": "系统一",
        "value": 5,
        "active": false,
        "controlPoints": [
          {
            "x": 780,
            "y": 269.5
          },
          {
            "x": 640,
            "y": 160
          },
          {
            "x": 420.5,
            "y": 239.5
          }
        ]
      }
    ]
  };
  var Util = G6.Util;
  var graph = new G6.Graph({
    id: 'c2',           // 容器ID
    width: 500,         // 画布宽
    height: 500,        // 画布高
    dragable: true,     // 是否支持元素拖动
    resizeable: true,   // 是否支持元素变形
    selectable: true,   // 是否允许选中
    grid: {
      forceAlign: true, // 是否支持网格对齐
      cell: 10          // 网格大小
    }
  });
  graph.source(data.nodes, data.edges);
  graph.node()
    .size('value', function(val){
      return val/30 * 120;
    })
    .color('active', function(val){
      if(val){
        return 'green';
      } else {
        return 'red';
      }
    })
    .shape('type', function(val){
      if(val === 'type1') return 'circle';
      if(val === 'type2') return 'rect';
      if(val === 'type3') return 'rhombus';
    })
    .label('id');
  graph.edge()
    .size('value', function(val){
      return val/30 * 10;
    })
    .shape('type', function(val){
      if(val === 'type1') return 'line';
      if(val === 'type2') return 'arrow';
      if(val === 'type3') return 'smoothArrow';
    })
    .label('value');
  graph.render();
  graph.autoZoom();
});
</script>

[Demo源码](/g6/demo/06-other/mapping.html)

* graph.node().color(dim, fun) 节点颜色映射
* graph.node().size(dim, fun)  节点大小映射
* graph.node().shape(dim, fun) 节点形状映射
* graph.node().label(dim, fun) 节点文本映射
* graph.node().style(dim, fun) 节点样式映射
* graph.edge().color(dim, fun) 边颜色映射
* graph.edge().size(dim, fun)  边大小映射
* graph.edge().shape(dim, fun) 边形状映射
* graph.edge().label(dim, fun) 边文本映射
* graph.edge().style(dim, fun) 边样式映射



## 布局

G6 内置了[G2布局算法](/g2/api/layout.html)，包括树形布局(Layout.Tree)、线性布局(Layout.Linear)、桑基图(Layout.sankey)。除此之外，G6 还实现了一套一般的流布局算法(Layout.Flow)，封装了一套力导布局(Layout.Force)。

```js
var Layout = G6.Layout;
Layout.Tree; // 树形布局
Layout.Linear; // 线性布局
Layout.Sankey; // 桑基布局
Layout.Layout; // 流布局
```

### 流布局 -- flow
流布局适用于展示，有流向的数据。它可以在给定节点和边的连接后，自动生成一份节点不重叠、边尽量少交叉的**节点**布局。

![image](https://zos.alipayobjects.com/skylark/56b5651a-2587-48bf-a173-d0e6875481b1/attach/2816/3b743d86f5279dbc/image.png)

[Demo源码](/g6/demo/01-businessFlow/business-flow.html)

```js
var Layout = G6.Layout;
var flow = new Layout.Flow({
  nodes: data.nodes,
  edges: data.edges
});
nodes = flow.getNodes(); // 获得布局后的0～1空间数据
```

### 力导布局 -- force
力导布局适用于展示网状的数据结构，其物理模型是引力模型，由四个参数可供配置，stiffness 是硬度，硬度越大节点加速度越大，damping 是阻尼，阻尼越接近0退火越快，接近1退火越慢， minEnergyThreshold 是最小能量域值，系统总能量小于该阈值时，则会停止布局，repulsion是斥力，斥力越大节点群越稀疏。

值得注意的一点：minEnergyThreshold 最小能量域值，越大布局会越快，但越不精细。越小越慢，布局越精细。开发者应根据时实际场景调整该参数。

![image](https://zos.alipayobjects.com/rmsportal/gKDziJMihANmbToKkfwD.gif)

[Demo源码](/g6/demo/05-force/force.html)

![image](https://zos.alipayobjects.com/skylark/b7576891-22b2-4f53-adb1-68d13ef10d23/attach/2816/ea7a6133bd70dd06/image.png)

[Demo源码](/g6/demo/05-force/systemNet.html)

```js
var Layout = G6.Layout;
var force = new Layout.Force({
  nodes: data.nodes,
  edges: data.edges,
  stiffness: 100.0,        // 硬度
  damping: 0.1,            // 阻尼
  minEnergyThreshold: 0.1, // 能量域值
  repulsion: 2000.0        // 斥力
});
layout.onNodeChange = function(id, point){
  // 当节点变更 16 ms 执行一次
};
layout.onFinish = function(){
  // 当布局完毕（总能量小于域值时执行）
};
```
-->
