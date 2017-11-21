<!--
 index: 0
 title: 快速上手
 resource:
   jsFiles:
     - ${url.g6}
-->

## G6

G6 是一个由纯 JavaScript 编写的关系图基础技术框架。开发者能基于 G6 进行关系图的**分析视图**和**编辑视图**进行快速的二次开发。

<div id = "g6_structure"></div>

```js-
/**
* class 里是否含有 className
* @param  {Object}   shape     图形
* @param  {String}   className 名字
* @return {Boolean}
*/
function hasClass (shape, className) {
  if (shape) {
    var clasees = shape.get('class');
    if (clasees && clasees.indexOf(className) !== -1) {
      return true;
    }
  }
  return false;
}
var data = {
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
};
var Util = G6.Util;
// 准备布局配置
var layoutCfg = {
  "direction": "LR",
  "nodeSep": 20,
  "nodeSize": 15,
  "rankSep": 200
};
// 自定义树节点
var DEFAULT_NODE_SIZE = 3;
G6.registerNode('treeNode', {
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
      text: model.label,
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
  id: 'g6_structure',                  // 容器ID
  width: 600,
  height: 400,                         // 画布高
  fitView: 'autoZoom',                 // 自动缩放
  layoutFn: G6.Layouts.LayeredTidyTree, // 布局类型
  layoutCfg: layoutCfg,                // 布局配置
  behaviourFilter: ['wheelZoom'],
  showButton: false,
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
```

## 安装

### 浏览器引入

```js
<script src="https://gw.alipayobjects.com/as/g/datavis/g6/1.2.0/g6.min.js"></script>
```

### 通过 npm 安装

我们提供了 G6 npm 包，通过下面的命令即可完成安装

```bash
npm install @antv/g6 --save
```
成功安装完成之后，即可使用 `import` 或 `require` 进行引用。

```js
import G6 from '@antv/g6';

const net = new G6.Net({
  id: 'c1',
  width: 600,
  height: 300
});
```

## 快速开始

G6 中所有的图都由边和节点构成，只要给出`节点`和`边`数据，G6 就能为您绘制出关系图。

<div id="c1"></div>

<script type="text/javascript">
const data = {
  "nodes": [
    {
      "x": 140,
      "y": 210,
      "id": "node1"
    },
    {
      "x": 270,
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
};
const net = new G6.Net({
    id: 'c1',      // 容器ID
    width: 500,    // 画布宽
    height: 500   // 画布高
  });
net.source(data.nodes, data.edges);
net.render();
</script>

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>关系图</title>
    <!-- 第一步：引入G6 -->
    <script src="https://gw.alipayobjects.com/as/g/datavis/g6/1.1.6/index.js"></script>
  </head>
  <body>
    <!-- 第二步：创建DOM容器 -->
    <div id="c1"></div>
    <script>
      // 第三步：设置数据
      const data = {
        "nodes": [
          {
            "x": 140,
            "y": 210,
            "id": "node1"
          },
          {
            "x": 270,
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
      };
      // 第四步：配置G6画布
      const net = new G6.Net({
          id: 'c1',      // 容器ID
          width: 500,    // 画布宽
          height: 500    // 画布高
        });
      // 第五步：载入数据
      net.source(data.nodes, data.edges);
      // 第六步：渲染关系图
      net.render();
    </script>
  </body>
</html>
```

## 体验改进计划说明

为了更好服务用户，G6 会将 URL 等信息发送回 AntV 服务器：

```html
https://kcart.alipay.com/web/bi.do
```
除了 URL 与 G6 版本信息外，不会收集任何其他信息，一切为了能对 G6 的运行情况有更多了解，以更好服务于用户。如有担心，可以通过下面的代码关闭：

```js
// 关闭 G6 的体验改进计划打点请求
G6.track(false)
```

## 提问及反馈地址

GitHub: https://github.com/antvis/g6/issues
 
