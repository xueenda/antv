<!--
 index: 2
 title: 网图指南
 resource:
   jsFiles:
     - ${url.g6}
-->
 

## 概述
本文档是关系图库 —— G6 的基础使用文档，该文档会使用尽量多的 demo 来描述 G6 的功能及特性，如果有你觉得描述的不够清晰的地方敬请[联系我们](/about/index.html)！

* [网--net](#_网)
* [结构--construction](#_结构)
* [节点--node](#_节点)
* [边--edge](#_边)
* [增删改查--crud](#_增删改查)
* [交互-interaction](#_交互)

## 结构

网图（Net）继承于图（Graph），对于一幅网图来说，每一幅网图都由最基本的两个元素：**节点**和**边**组成。通过操作节点及边的位置，生成特定的**布局**。开发者可以基于 G6 ，通过自定义节点和自定义边生成特点的**样式**，再通过事件和基础交互生成特定**交互**。布局、样式、交互三者共同地组成了特定的网图。

<!--
G6 既是关系图模板的**合集**，与此同时其自身也是**默认模版**，同时也是关系图的**基础框架**。使用者可以通过使用用G6沉淀的专业模板绘制出有严格定义的、专业的关系图，如：树图、UML图等。也可使用默认基础模板画出任何未被定义的关系图。开发者们亦可以基于G6开发特定的关系图。
-->

## 节点

![image](https://zos.alipayobjects.com/rmsportal/MSXIdcRfTeAROTUlYDyQ.png)

节点顾名思义，节点是关系图中实体。 g6 中，每个节点由**位置**、**形态**、**控制点**、**锚点**，四个要素组成。
* 内置节点
  * rect     矩形
  * circle   椭圆
  * rhombus  菱形
  * text     文本
  * image    图片

### 控制点

![image](https://zos.alipayobjects.com/rmsportal/icCwjkwJBzzeyPMcFvgG.png)

大多数情况下，控制点即是该节点包围盒的四个顶点。标识了该节点所在的区域，通过鼠标点击控制点，可使拖拽[节点变形](#_节点变形)。

### 锚点

![image](https://zos.alipayobjects.com/rmsportal/htFmmhcArjtxTIWsvLZW.png)

锚点标识了该节点可供连接点。在[自定义节点]()中，我们可以通过`getAnchorPoints`方法，自定义节点锚点的位置。

```js
G6.registNode('circle', {
  getAnchorPoints: function() {
    return [
      [0, 0], // 左上
      [0, 0.5], // 上面边的中点
      [0, 1], // 右上
      [1, 0.5], // 右边边的中点
      [1, 1], // 右下
      [2, 0.5], // 下边边的中点
      [2, 1], // 左下
      [3, 0.5] // 左边边的中点
    ];
  }
});
```

## 边

![image](https://zos.alipayobjects.com/rmsportal/KsxNVfkFqjGsMhQoxQEN.png)

边是连接关系图中各个节点的线，每个节点由**源节点**、**目标节点**、**形态**、**控制点**，四个要素组成。

源节点，目标节点即使边的两端。形态可以在自定义边中确定，详见[自定义图形](/g6/doc/tutorial/start/custom-shape.html)
* 内置的边
  * line          直线
  * smooth        曲线

### 控制点

![image](https://zos.alipayobjects.com/rmsportal/tvgegyhaBdJaqInBEsVY.png)

边的控制点决定了一条边的连接路径。 G6 内置的边必过控制点，边**两端的控制点**，在不指定锚点的情况下，会根据最临近的控制点**自动计算**。**如果指定了锚点，则会连接到指定锚点。**

## 增删改查

<button id="addCircle">新增圆</button>
<button id="addRect">新增矩形</button>
<button id="delete">删除</button>
<button id="findUpdate">查找并更新</button>

<div id="c1"></div>

<script type="text/javascript">
$(function() {
  var i = 1;
  var btnAddCircle = $('#addCircle');
  var btnAddRect = $('#addRect');
  var btnDelete = $('#delete');
  var btnFindUpdate = $('#findUpdate');
  var data = {
    nodes: [],
    edges: []
  };
  var net = new G6.Net({
    id: 'c1',           // 容器ID
    width: 500,         // 宽度自适应
    height: 500,        // 画布高
    grid: {
      forceAlign: true, // 是否支持网格对齐
      cell: 10          // 网格大小
    }
  });
  net.filterBehaviour(['wheelZoom']);
  net.source(data.nodes, data.edges);
  net.render();

  btnAddCircle.on('click', function(ev){
    net.add('node', {
      shape: 'circle',
      id: 'id' + i++,
      x: 50 + i * 10,
      y: 50 + i * 10
    });
    net.refresh();
  });

  btnAddRect.on('click', function(ev){
    net.add('node', {
      shape: 'rect',
      id: 'id' + i++,
      x: 50 + i * 10,
      y: 50 + i * 10
    });
    net.refresh();
  });

  btnDelete.on('click', function(ev){
    if(i > 1){
      i = i-1;
      var item = net.find('id' + i);
      net.remove(item);
      net.refresh();
    }
  });


  btnFindUpdate.on('click', function(ev){
    if(i > 1){
      i = i-1;
      var item = net.find('id' + i);
      net.update(item, {
        color: 'red'
      });
      net.refresh();
    }
  });
});
</script>

[Demo源码](/g6/demo/06-other/crud.html)

G6 中**边**和**节点**，统称为 G6 的子项(item)。G6中的增、删、改、查即是对子项的数据模型的操作。

* 增 net.add(type, model)

* 删 net.remove(item)

* 改 net.update(item, model)

* 查 net.find(id)

## 交互
为便于大家基于 G6 二次开发关系图的编辑视图。G6 内部定义了四种模式，**默认模式( default )**、**添加模式( add )**、**拖动模式( drag )**、**编辑模式( edit )**，并内置了相应的交互。详见：[Net API](/g6/api/graph.html)，行为列表详见：[Handle API](/g6/api/handler.html)。

几种模式由以下行为组成。可以通过`changeMode`方法切换模式。

```js
{
  // 默认模式
  default: [
    'dragNode', 'dragEdge', 'dragBlank', 'clickBlankClearActive', 'resizeEdge', 'clickActive',
    'resizeNode', 'wheelZoom'
  ],
  // 编辑模式
  edit: [
    'dragNode', 'dragEdge', 'clickBlankClearActive', 'resizeEdge', 'clickActive',
    'multiSelect', 'resizeNode', 'shortcut', 'wheelZoom'
  ],
  // 拖动模式（查看模式）
  drag: ['shortcut', 'dragCanvas', 'wheelZoom'],
  // 添加模式
  add: ['clickAddNode', 'dragAddEdge']
}
```

#### 添加节点
鼠标点击添加节点行为。

![image](https://zos.alipayobjects.com/rmsportal/GHEAPfFaFokQNWuRvsmQ.gif)

```js
net.changeMode('add'); // 切换到添加模式
/**
 * @param  {String} type 子项类型
 * @param  {Object} model 数据模型
 */
net.beginAdd('node', model);
```

#### 添加边
鼠标拖拽添加边行为。

![image](https://zos.alipayobjects.com/rmsportal/qnREkdddbDxiIifxcIbF.gif)

```js
net.changeMode('add'); // 切换到添加模式
/**
 * @param  {String} type 子项类型
 * @param  {Object} model 数据模型
 */
net.beginAdd('edge', model);
```

#### 复制粘贴

![image](https://zos.alipayobjects.com/rmsportal/WSbZgPfuXoXnPgpFqrYK.gif)

```js
var net = new Net({});
net.copy(); // 复制当前激活项
net.paste(); // 粘贴当前激活项
```

#### 删除

![image](https://zos.alipayobjects.com/rmsportal/xBZrbrETfQUKOYwvHDPi.gif)

```js
var net = new Net({});
net.del(); // 删除当前激活项
```

### 快捷键
为便于大家开发，g6 内置了一套快捷键（shortcut）行为。

* cmd + c || ctrl + c 复制
* cmd + v || ctrl + v 粘贴
* cmd + z || ctrl + z 撤销
* cmd + alt + z || ctrl + alt + z 重做
* delete 删除键：删除
* spacing 空格键：切换拖拽模式和编辑模式
