<!--
 index: 3
 title: Item
 resource:
   jsFiles:
     - ${url.g6}
-->

# Item

Item 子项，是 G6 内部`节点 (node) `和边`边 (edge) `的抽象概念。本文档将向大家说明，节点和边已开放的 API 。

* [节点——Node](#节点——node)
* [边——Edge](#边——edge)

# 节点——Node

## 方法

### [show](#show) {Function}

显示

### [hide](#hide) {Function}

隐藏

### [getKeyShape](#getKeyShape) {Function}

获取关键形

### [getBBox](#getBBox) {Function}

获取包围盒


### [getModel](#getModel) {Function}

获取数据模型

### [getGroup](#getGroup) {Function}

获取图形图组

### [getShapeCfg](#getShapeCfg) {Function}

获取绘制配置项

### [getAnchor](#getAnchor) {Function}

获取锚点

```js
/**
 * 获取锚点
 * @param  {Object} 输入是一个点则返回该点对应的锚点 {x: number, y: number}
 * @return {Object} point 锚点 {x: number, y: number}
 */
node.getAnchor(param);
```

### [getEdges](#getEdges) {Function}

获取该节点所有边

### [getLinkNodes](#getLinkNodes) {Function}

获取有连接的子项

### [getUnLinkNodes](#getUnLinkNodes) {Function}

获取无连接的子项

### [getRelativeItems](#getRelativeItems) {Function}

获取有关联的子项

### [getUnRelativeItems](#getUnRelativeItems) {Function}

获取无关联的子项

<button id="getEdges">getEdges</button> &nbsp;&nbsp;<button id="getLinkNodes">getLinkNodes</button> &nbsp;&nbsp;<button id="getUnLinkNodes">getUnLinkNodes</button> &nbsp;&nbsp;<button id="getRelativeItems">getRelativeItems</button> &nbsp;&nbsp;<button id="getUnRelativeItems">getUnRelativeItems</button> &nbsp;&nbsp;


<div id="c0"></div>

[示例源码](/g6/demo/06-other/event.html)

```js-
var Util = G6.Util;
// 第三步：设置数据
var data = {
  "source": {
    "nodes": [
      {
        "shape": "rect",
        "label": "节点",
        "id": "keyNode",
        "x": 710,
        "y": 260,
        "color": "#FF9D2D"
      },
      {
        "shape": "rect",
        "label": "节点1",
        "x": 780,
        "y": 150,
        "id": "f7171de1"
      },
      {
        "shape": "rect",
        "label": "节点2",
        "x": 550,
        "y": 210,
        "id": "f2201be8"
      },
      {
        "shape": "rect",
        "label": "节点3",
        "x": 590,
        "y": 340,
        "id": "b5b421cf"
      },
      {
        "shape": "rect",
        "label": "节点4",
        "x": 780,
        "y": 360,
        "id": "a285b5dc"
      }
    ],
    "edges": [
      {
        "shape": "arrow",
        "source": "keyNode",
        "target": "f2201be8",
        "id": "672f31fc"
      },
      {
        "shape": "arrow",
        "source": "keyNode",
        "target": "b5b421cf",
        "id": "62ed8cb2"
      },
      {
        "shape": "arrow",
        "source": "b5b421cf",
        "target": "keyNode",
        "id": "4542e914",
        "controlPoints": [
          {
            "x": 590,
            "y": 324
          },
          {
            "x": 590,
            "y": 260
          },
          {
            "x": 679,
            "y": 260
          }
        ]
      },
      {
        "shape": "smoothArrow",
        "source": "f7171de1",
        "target": "keyNode",
        "id": "58624bdb",
        "controlPoints": [
          {
            "x": 749,
            "y": 150
          },
          {
            "x": 700,
            "y": 150
          },
          {
            "x": 710,
            "y": 244
          }
        ]
      },
      {
        "shape": "arrow",
        "source": "f7171de1",
        "target": "a285b5dc",
        "id": "f119308c"
      }
    ]
  }
};
// 第四步：配置G6画布
var net = new G6.Net({
    id: 'c0',      // 容器ID
    fitView: 'autoZoom',
    mode: 'none',
    width: 500,    // 画布宽
    height: 500    // 画布高
  });
// 第五步：载入数据
net.read(Util.clone(data));
// 第六步：渲染关系图
net.render();

$('#getEdges').on('click', function(){
  reRender(); // 重新渲染
  var keyNode = net.find('keyNode');
  var edges = keyNode.getEdges();
  Util.each(edges, function(edge){
    net.update(edge, {
      color: '#00B07C'  
    });
  });
  net.refresh();
});

$('#getLinkNodes').on('click', function(){
  reRender(); // 重新渲染
  var keyNode = net.find('keyNode');
  var nodes = keyNode.getLinkNodes();
  Util.each(nodes, function(node){
    net.update(node, {
      color: '#00B07C'  
    });
  });
  net.refresh();
});

$('#getUnLinkNodes').on('click', function(){
  reRender(); // 重新渲染
  var keyNode = net.find('keyNode');
  var nodes = keyNode.getUnLinkNodes();
  Util.each(nodes, function(node){
    net.update(node, {
      color: '#00B07C'  
    });
  });
  net.refresh();
});

$('#getRelativeItems').on('click', function(){
  reRender(); // 重新渲染
  var keyNode = net.find('keyNode');
  var items = keyNode.getRelativeItems();
  Util.each(items, function(item){
    net.update(item, {
      color: '#00B07C'  
    });
  });
  net.refresh();
});

$('#getUnRelativeItems').on('click', function(){
  reRender(); // 重新渲染
  var keyNode = net.find('keyNode');
  var items = keyNode.getUnRelativeItems();
  Util.each(items, function(item){
    net.update(item, {
      color: '#00B07C'  
    });
  });
  net.refresh();
});

function reRender(){
  net.clear();
  net.read(Util.clone(data));
  net.render();
}
```

# 边——Edge

## 方法

### [show](#show) {Function}

显示

### [hide](#hide) {Function}

隐藏

### [getKeyShape](#getKeyShape) {Function}

获取关键形

### [getGroup](#getGroup) {Function}

获取图形图组

### [getBBox](#getBBox) {Function}

获取包围盒

### [getModel](#getModel) {Function}

获取数据模型

### [getShapeCfg](#getShapeCfg) {Function}

获取绘制配置项
