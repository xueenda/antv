<!--
 index: 2
 title: Graph
 resource:
   jsFiles:
     - ${url.g6}
-->
# Graph

**Abstract**

所有上层图的抽象类，都继承于该类

`注意：不可以直接示例化该类`

## 属性

下面是创建关系图的语法，生成的 Graph 提供了关系图配置的各种方法，下面会介绍到。

```js
const graph = new G6.Graph({
  id: 'c1',
  width: 500,
  height: 500
});
```

G6 对象的所有属性获取方式如下：

```javascript
graph.get('属性名');
```

下面对所有的属性依次作说明介绍：

### id

[String] 创建关系图的 DOM 容器 id。

### container

[DOM] 除了传递 id 值来指定关系图容器，也支持直接传入容器的 html 节点对象。

### width

[Number] 设置关系图的宽度，单位像素。若不设置，则会根据父节点自适应宽度。

### height

[Number] 设置关系图的高度，单位像素。

### fitView

[String|Object] `初次绘制`适应视口，接收如下参数：

* 'autoSize'       渲染完毕后，图形不变，自动缩放画布
* 'autoZoom'       渲染完毕后，画布不变，自动缩放图形
* 'tl'             渲染完毕后，画布不变，将图形放置在左上
* 'lc'             渲染完毕后，画布不变，将图形放置在左中
* 'bl'             渲染完毕后，画布不变，将图形放置在左下
* 'cc'             渲染完毕后，画布不变，将图形放置在中间
* 'tc'             渲染完毕后，画布不变，将图形放置在上中
* 'tr'             渲染完毕后，画布不变，将图形放置在右上
* 'rc'             渲染完毕后，画布不变，将图形放置在右中
* 'br'             渲染完毕后，画布不变，将图形放置在右下
* 'bc'             渲染完毕后，画布不变，将图形放置在下中

<div id='fitView'></div>

[示例源码](../demo/other/fit-view.html)

</br>

```js-
$('#fitView').append("<button id='restore'>还原</button> ");
$('#fitView').append("<button id='tl'>tl</button> ");
$('#fitView').append("<button id='lc'>lc</button> ");
$('#fitView').append("<button id='bl'>bl</button> ");
$('#fitView').append("<button id='cc'>cc</button> ");
$('#fitView').append("<button id='tc'>tc</button> ");
$('#fitView').append("<button id='tr'>tr</button> ");
$('#fitView').append("<button id='rc'>rc</button> ");
$('#fitView').append("<button id='br'>br</button> ");
$('#fitView').append("<button id='bc'>bc</button> ");
$('#fitView').append("<button id='autoZoom'>autoZoom</button> ");
$('#fitView').append("<button id='autoSize'>autoSize</button> </br>");

var Matrix = G6.Matrix.Matrix3;
var tl = $('#tl');
var lc = $('#lc');
var bl = $('#bl');
var cc = $('#cc');
var tc = $('#tc');
var tr = $('#tr');
var rc = $('#rc');
var br = $('#br');
var bc = $('#bc');
var autoZoom = $('#autoZoom');
var autoSize = $('#autoSize');
var restore = $('#restore');
var net = createNet();
autoZoom.on('click', function(){
  net.destroy();
  net = createNet('autoZoom');
});
autoSize.on('click', function(){
  net.destroy();
  net = createNet('autoSize');
});
tl.on('click', function(){
  net.destroy();
  net = createNet('tl');
});
lc.on('click', function(){
  net.destroy();
  net = createNet('lc');
});
bl.on('click', function(){
  net.destroy();
  net = createNet('bl');
});
cc.on('click', function(){
  net.destroy();
  net = createNet('cc');
});
tc.on('click', function(){
  net.destroy();
  net = createNet('tc');
});
tr.on('click', function(){
  net.destroy();
  net = createNet('tr');
});
rc.on('click', function(){
  net.destroy();
  net = createNet('rc');
});
br.on('click', function(){
  net.destroy();
  net = createNet('br');
});
bc.on('click', function(){
  net.destroy();
  net = createNet('bc');
});
restore.on('click', function(){
  net.destroy();
  net = createNet();
});
function createNet(fitView){
  // 第三步：设置数据
  var data = {
    "nodes": [
      {
        "x": 100,
        "y": 130,
        "id": "node1"
      },
      {
        "x": 230,
        "y": 130,
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
  };
  // 第四步：配置G6画布
  var net = new G6.Net({
    id: 'fitView', // 容器ID
    fitView: fitView,
    width: 430,    // 画布宽
    height: 430    // 画布高
  });
  // 第五步：载入数据
  net.source(data.nodes, data.edges);
  // 第六步：渲染关系图
  net.render();
  return net;
}
```

### fitViewPadding

[Number] 自适应视口内边距，默认 10

### grid

[Object] 网格配置项

![image](https://zos.alipayobjects.com/rmsportal/MsLODKhnZZmnUSlzNIIo.png)

G6 内置了一套网格系统，`cell` 可以配置单个网格的大小，`line` 配置网格线的样式。

```js
const data = {
  nodes: [],
  edges: []
};
const graph = new G6.Graph({
  id: 'c1',           // 容器ID
  width: 500,         // 画布宽
  height: 500,        // 画布高
  grid: {
    forceAlign: true, // 是否支持网格对齐
    cell: 10,         // 网格大小
    line: {           // 网格线样式
      stroke: '#333'
    }
  }
});
graph.source(data.nodes, data.edges);
graph.render();
```

配置为 `null`，则不显示网格

```js
grid: null
```

`forceAlign` 是配合内置交互的配置项，为 true，表示拖、拉、拽交互时节点会对齐网格节点。这点在手动布局时对齐节点，非常有用。见下动图。

![image](https://zos.alipayobjects.com/rmsportal/dYZffesDrgEHgqMYbout.gif)

### useAnchor

[Boolean] 是否使用锚点

### el

[DOM] 最上层的canvas DOM，原生DOM事件由它捕获，可用于设置鼠标样式。

### modes

[Object|String] 模式列表

示例：

```js
{
  default: ['dragNode', 'clickActive'],
  add: ['clickAddNode']
}
```

### mode

[String] 当前选择的模式，默认 `default`

## 实例方法

### render

渲染数据

```js
/**
 * 渲染
 */
graph.render();
```


### node

param 可是是值，也可是回调函数

```js
/**
 * 节点颜色映射
 * @param  {String|Function} param 支持通用颜色
 */
graph.node().color(param)    

/**
 * 节点大小映射
 * @param  {Number|Array|Function} param 
 * Number 长宽均为该值
 * Array [width, height] 长宽
 */
graph.node().size(param)   

/**
 * 节点形状映射
 * @param  {String|Function} param
 */
graph.node().shape(param)   

/**
 * 节点文本映射
 * @param  {String|Function|Object} param
 */
graph.node().label(param)

/**
 * 节点样式映射
 * @param  {Object|Function} param
 */
graph.node().style(param)   

/**
 * 提示信息映射
 * @param  {Array|Function} param
 */
graph.node().tooltip(param) 
```

[示例](../demo/other/mapping.html)

### edge

param 可是是值，也可是回调函数

```js
/**
 * 边颜色映射
 * @param  {String|Function} param 支持通用颜色
 */
graph.edge().color(param)

/**
 * 边粗细映射
 * @param  {Number|Function} param 
 */
graph.edge().size(param)

/**
 * 边形状映射
 * @param  {String|Function} param 
 */
graph.edge().shape(param)   

/**
 * 边文本映射
 * @param  {String|Function|Object} param
 */
graph.edge().label(param)   

/**
 * 样式映射
 * @param  {Object} param 
 */
graph.edge().style(param)   

/**
 * 提示信息映射
 * @param  {Array|Function} param 
 */
graph.edge().tooltip(param) 
```

[示例](../demo/other/mapping.html)

### tooltip

G6 中提示信息功能默认关闭，若要开启，需要调用该方法。需要注意以下几点：

1. 该方法需配合tooltip映射才能生效。
1. 生成的提示框是DOM节点，可以在外部用css控制样式

```js
graph.tooltip(true)
```

示例：


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

<div id="tooltip_true"></div>

```js-
var data = {
  nodes: [
    {
      x: 200,
      y: 210,
      id: 'node1',
    },
    {
      x: 330,
      y: 170,
      id: 'node2',
    },
  ],
  edges: [
    {
      source: 'node1',
      id: 'edge1',
      target: 'node2',
    },
  ],
};

var net = new G6.Net({
  id: 'tooltip_true',      // 容器ID
  width: 500,    // 画布宽
  height: 500,   // 画布高
  grid: {
    forceAlign: true, // 是否支持网格对齐
    cell: 10,          // 网格大小
  },
});
net.tooltip(true);
net.source(data.nodes, data.edges);
net.node().tooltip('id');
net.render();
```

[示例源码](../demo/other/tooltip-true.html)

```js
graph.tooltip({
  title: '标题', // @type {String} 标题
  split: '=>',  // @type {String} 分割符号
  dx: 10,       // @type {Number} 水平偏移
  dy: 10        // @type {Number} 竖直偏移
});
```

示例：

<div id="tooltip_cfg"></div>

```js-
var data = {
  nodes: [
    {
      x: 200,
      y: 210,
      id: 'node1',
    },
    {
      x: 330,
      y: 170,
      id: 'node2',
    },
  ],
  edges: [
    {
      source: 'node1',
      id: 'edge1',
      target: 'node2',
    },
  ],
};

var net = new G6.Net({
  id: 'tooltip_cfg',      // 容器ID
  width: 500,
  height: 500             // 画布高
});
net.tooltip({
  title: '标题', // @type {String} 标题
  split: '=>',  // @type {String} 分割符号
  dx: 10,       // @type {Number} 水平偏移
  dy: 10        // @type {Number} 竖直偏移
});
net.source(data.nodes, data.edges);
net.node().tooltip('id');
net.render();
```

[示例源码](../demo/other/tooltip-cfg.html)

### on

事件绑定。`ev` 是事件对象，含下列字段：

* x 在画布上的坐标x
* y 在画布上的坐标y
* domX 相对于画布容器的坐标x
* domY 相对于画布容器的坐标y
* item 节点或者边
* shape 当前的形
* itemType 'node' or 'edge'
* toEvObj 到达的目标事件对象 （mouseleave时可用）


```js
/**
 * 事件绑定
 * @param  {String}   eventType 事件类型
 * @param  {Function} fn        回调函数
 */
graph.on(eventType,fn);
```

graph 上目前支持一下事件

```js
graph.on('click', function(ev){});           // 鼠标左键单击事件
graph.on('dblclick', function(ev){});        // 鼠标左键双击事件
graph.on('mousedown', function(ev){});       // 鼠标左键按下事件
graph.on('mouseup', function(ev){});         // 鼠标左键抬起事件
graph.on('mousemove', function(ev){});       // 鼠标移动事件
graph.on('dragstart', function(ev){});       // 开始拖拽事件
graph.on('dragmove', function(ev){});        // 拖拽中事件
graph.on('dragend', function(ev){});         // 拖拽结束后事件
graph.on('contextmenu', function(ev){});     // 鼠标右键点击事件
graph.on('mouseenter', function(ev){});      // 鼠标进入元素事件
graph.on('mouseleave', function(ev){});      // 鼠标离开元素事件
graph.on('keydown', function(ev){});         // 键盘按键按下事件
graph.on('keyup', function(ev){});           // 键盘按键抬起事件
graph.on('mousewheel', function(ev){});      // 鼠标滚轮事件
graph.on('itemactived', function(ev){});     // 子项激活后事件
graph.on('itemunactived', function(ev){});   // 子项取消激活后事件
graph.on('itemhover', function(ev){});       // 子项鼠标悬浮事件
graph.on('itemupdate', function(ev){});      // 子项更新后事件
graph.on('itemremove', function(ev){});      // 子项移除后事件
graph.on('itemadd', function(ev){});         // 添加子项结束后
graph.on('itemmouseenter', function(ev){});  // 子项鼠标进入事件
graph.on('itemmouseleave', function(ev){});  // 子项鼠标离开事件
graph.on('afteritemrender', function(ev){}); // 子项渲染结束后事件
graph.on('beforeinit', function(ev){});      // 初始化前事件
graph.on('afterinit', function(ev){});       // 初始化后事件
graph.on('beforerender', function(ev){});    // 绘制前事件
graph.on('afterrender', function(ev){});     // 绘制后事件
```

[示例](../demo/other/event.html)

### off

事件解除。`callBack` 用于指定要删除的回调方法，如果没有设置，则解除所有该事件类型下的方法。

```js
/**
 * 事件解除
 * @param  {String}   eventType 事件类型
 * @param  {Function} fn        回调函数
 */
graph.off(eventType,fn);
```

### remove

删除子项，`param` 是子项或是子项id

```js
/**
 * 删除子项
 * @param  {Item|String}   param
 */
graph.remove(item)
```

### update

更新子项，`param` 是子项或是子项id，`model` 是数据模型。

```js
/**
 * 更新子项数据模型
 * @param  {Item|String}   param
 * @param  {Object} model
 */
graph.update(param, model)
```

### find

查找子项

```js
/**
 * 通过 id 查找子项
 * @param  {String} id
 */
graph.find(id)
```

### converPoint

将图坐标转为 DOM 坐标

```js
/**
  * 将画布坐标转为DOM 坐标
  * @param  {Object} point 点
  * @return {Object} 转化后的点
  */
graph.converPoint(point)
```

### invertPoint

将 DOM 坐标转为图坐标

```js
/**
 * 将 DOM 坐标转为图坐标
 * @param  {Object} point 点
 * @return {Object} 转化后的点
 */
graph.invertPoint(point)
```

### refresh

调用了一些直接操作图形的接口，要刷新画布才能显示效果。

```js
/**
 * 刷新画布
 */
graph.refresh();
```

### changeData

重新加载数据，并刷新。(接收的数据 和 source 方法一致)

```js
/**
 * 更改数据
 */
graph.changeData(param1, param2, ……);
```

### [changeMode](#_changeMode)

改变模式

```js
/**
 * 改变编辑模式
 * @param  {String} modeName 模式名
 */
graph.changeMode(modeName);
```

### addBehaviour

在某个模式下添加行为

```js
/**
 * 添加行为
 * @param  {String} modeName   模式
 * @param  {String} behaviours 行为集
 */
graph.addBehaviour(modeName, behaviours);
```

也可以不传`modeName`，只传`behaviours`，则把所有模式中的该行为集合全部添加。

```js
/**
 * 添加行为
 * @param  {String} behaviours  行为集
 */
graph.addBehaviour(behaviours);
```

[示例](../demo/other/mode.html)

### removeBehaviour

移除行为（与`addBehaviour` 对应）

```js
/**
 * 添加行为
 * @param  {String} modeName   模式
 * @param  {String} behaviours 行为集
 */
graph.removeBehaviour(modeName, behaviours);
```

也可以不传`modeName`，只传`behaviours`，则把所有模式中的该行为集合全部删除。

```js
/**
 * 添加行为
 * @param  {String} behaviours  行为集
 */
graph.removeBehaviour(behaviours);
```

[示例](../demo/other/mode.html)

### setItemActived

设置子项激活，`item` 是子项。

```js
/**
 * 设置子项激活，`item`是子项。
 * @param  {Item}    item 子项
 * @param  {Boolean} bool 设置是否激活
 */
graph.setItemActived(item, bool);
```

### read

读数据，与 `save` 对应。

```js
/**
 * 读数据
 * @param  {Object} data 子项
 */
graph.read(data);
```

### save

存数据，与 `read` 对应。

```js
/**
 * 存数据
 * @return {Object} data
 */
graph.save();
```

### focusPoint

以某点为中心显示画布

```js
/**
 * 聚焦某点
 * @param  {Object} point 点
 */
graph.focusPoint(point);
```

### updateMatrix

更新画布根节点矩阵

```js
/**
 * 更新画布根节点矩阵
 * @param  {Object} matrix 矩阵
 */
graph.updateMatrix(point);
```

### updateAnchor

更新锚点

```js
/**
 * 更新锚点
 * @param {Object}  node          节点
 * @param {Object}  anchorIndex   目标锚点索引
 * @param {Object}  cfg           配置项
 * @return {Object} self
 */
graph.updateAnchor(node, anchorIndex, cfg);
```

##### 参数

- `node`: object

节点

- `anchorIndex`: number

锚点索引

- `cfg`: object

锚点配置

```js
{
  linkable,   // {Boolean} 是否可连接
  style,      // {Object}  锚点样式
  hoverStyle, // {Object}  锚点 hover 样式
}
```

### changeSize

更改画布的尺寸

```js
/**
 * 更改画布的尺寸
 * @param  {Number} width  宽度
 * @param  {Number} height 高度
 */
graph.changeSize(width, height);
```

### updateNodesPositon

更新节点位置信息（一般与动态布局联用）

```js
/**
 * 更新节点位置信息
 */
graph.updateNodesPositon();
```

### 获取所有元素

获取所有元素

```js
/**
 * 获取所有元素
 */
graph.getItems();
```

### 获取所有节点

获取所有节点

```js
/**
 * 获取所有节点
 */
graph.getNodes();
```

### 获取所有边

获取所有边

```js
/**
 * 获取所有边
 */
graph.getEdges();
```