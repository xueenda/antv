<!--
 index: 4
 title: Net
 resource:
   jsFiles:
     - ${url.g6}
-->
# Net

网图图类，继承于[Graph](./graph.html)，享有 Graph 上所有属性和方法。

## 属性

### layout

[Function] 布局回调函数，回调方法中会传入，节点和边数据。

### behaviourSignal

[Object] 只读字段，存储一些行为的信号量。如：

```js
{
  draggingNode,   // 是否正在拖拽节点
  frameSelecting, // 是否正在进行框选
  draggingEdge,   // 是否正在进行拖拽边端点
  resizingNode,   // 是否正在节点变形操作
}
```

### clipboard

[Boolean] 剪贴板 `false`

### rollback

[Boolean] 回滚存储，默认值 `false`

### modes

[Object] 默认值

```js
{
  // 默认模式
  default: [
    'dragNode', 'dragEdge', 'dragBlank', 'clickBlankClearActive', 'resizeEdge', 'clickActive',
    'resizeNode', 'wheelZoom', 'dragNodeEndSetActive'
  ],
  // 编辑模式
  edit: [
    'dragNode', 'dragEdge', 'clickBlankClearActive', 'resizeEdge', 'clickActive', 'dragNodeEndSetActive',
    'multiSelect', 'resizeNode', 'shortcut', 'wheelZoom', 'hoverNodeShowAnchor', 'hoverAnchorSetActived', 'dragEdgeEndHideAnchor', 'dragNodeEndHideAnchor'
  ],
  // 拖动模式（查看模式）
  drag: ['shortcut', 'dragCanvas', 'wheelZoom'],
  // 添加模式
  add: ['clickAddNode', 'dragAddEdge', 'hoverAnchorSetActived', 'hoverNodeShowAnchor'],
  // 图分析模式
  analysis: [
    'dragCanvas', 'wheelZoom', 'dragHideEdges', 'dragHideTexts', 'wheelZoomHideEdges', 'wheelZoomHideTexts'
  ],
  // 空模式
  none: []
}
```

### behaviourSignal
[Boolean] 交互信号量

```js
{
  draggingEdge,   // true 为正在拖动边的端点
  draggingNode    // true 为正在拖拽节点
}
```

## 实例方法

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

net.showAnchor(node, anchorIndex, {
  linkable,  // {Boolean} 是否可以连接
  style,     // {Object}  锚点样式
  hoverStyle, // {Object}  鼠标悬浮锚点样式
});
```

### showAnchor

显示锚点

```js
/**
 * 显示锚点
 * @param {Object} node 子项
 * @return {Object} self
 */
net.showAnchor(node);
```

### hideAnchor

隐藏锚点

```js
/**
 * 隐藏锚点
 * @param {Object} node 子项
 * @return {Object} self
 */
net.hideAnchor(node);
```

### add

添加节点或边

```js
/**
 * 增加节点、边
 * @param  {String} type 类型：node ,edge
 * @param  {Object} model
 * @return {Item}   item 子项
 */
net.add(type, model);
```

### source

加载数据源

**以下字段对默认的`node`有特定含义**

```js
{
  id,      // 唯一标识
  x,       // x 坐标
  y,       // y 坐标
  size,    // 尺寸
  style,   // 样式
  color,   // 颜色
  shape,   // 形状
  label    // 标注
}
```

**以下字段对默认的`edge`有特定含义**

```js
{
  id,            // 唯一标识
  size,          // 尺寸
  style,         // 样式
  color,         // 颜色
  shape,         // 形状
  label,         // 标注
  controlPoints, // 控制点
  sourceAnchor,  // 连接源节点锚点索引
  targetAnchor   // 连接目标节点锚点索引
}
```

[示例](../demo/other/source.html)


编辑器示例：

<div id='editor'></div>

```js-
// 第一步：注册节点
G6.registerNode('customNode', {
  draw: function(cfg, group) {
    var shape = group.addShape('rect', {
      attrs: {
        x: cfg.x,
        y: cfg.y,
        width: 80,
        height: 20,
        fill: '#fff',
        stroke: 'green'
      }
    });
    group.addShape('text', {
      attrs: {
        x: cfg.x,
        y: cfg.y,
        fill: 'black',
        text: '自定义图形'
      }
    });
    return shape;
  },
  getAnchorPoints: function(){
    return [
      [1, 0.5], // 右边边的中点
      [0, 0.5] // 左边边的中点
    ];
  }
});

// 第二步：设置按钮
$('#editor').append('<button id="addCircle">圆形</button>');
$('#editor').append('<button id="addRect">方形</button>');
$('#editor').append('<button id="addCustom">自定义形</button>');
$('#editor').append('<button id="addLine">添加直线</button>');
$('#editor').append('<button id="addSmooth">添加曲线</button>');
$('#editor').append('<button id="save">保存</button>');
var addCircle = $('#addCircle');
var addRect = $('#addRect');
var addCustom = $('#addCustom');
var addLine = $('#addLine');
var addSmooth = $('#addSmooth');
var save = $('#save');

// 第三步：配置画布
var net = new G6.Net({
  id: 'editor',      // 容器ID
  width: 500,        // 画布宽
  height: 500        // 画布高
});
net.filterBehaviour(['wheelZoom']);
// 第四步：配置绑定事件
addCircle.on('click', function(ev){
  net.beginAdd('node', {
    shape: 'circle'
  });
});

addRect.on('click', function(ev){
  net.beginAdd('node', {
    shape: 'rect'
  });
});

addCustom.on('click', function(ev){
  net.beginAdd('node', {
    shape: 'customNode'
  });
});

addLine.on('click', function(ev) {
  net.beginAdd('edge', {
    shape: 'line'
  });
});

addSmooth.on('click', function(ev) {
  net.beginAdd('edge', {
    shape: 'smooth'
  });
});

save.on('click', function(ev) {
  var saveData = net.save();
  var json = JSON.stringify(saveData, null, 2)
  console.log(saveData, json);
});

// 第五步：渲染关系图
net.render();
```

[示例源码](../demo/other/editor.html)

### beginAdd

开始添加元素，通常配合编辑器一并使用。

### endAdd

结束添加元素，通常配合编辑器一并使用。

### copy

复制激活子项

### paste

粘贴激活子项

### del

删除激活子项

### undo

撤销

### redo

重做
