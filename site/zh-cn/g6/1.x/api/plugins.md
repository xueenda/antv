<!--
index: 20
title: Plugins
resource:
  jsFiles:
    - ${url.g6}
    - ${url['g6-plugins']}
-->
 

## 概述

随着 G6 自身架构的稳定，并支撑了足够多的场景后，经过总结、封装，G6 官方沉淀出一部分实用的插件以供大家使用。

* [basicuse-基本使用](#_basicuse-基本使用)
##### 布局型插件
* [layout.dagre--统一分层布局](#_layout.dagre--统一分层布局)
* [layout.d3.force--力导布局](#_layout.d3.force--力导布局)
##### 工具型插件
* [tool.minimap--缩略图](#_tool.minimap)
##### 模版型插件
* [template.analysis.maxSpanningForest--最大生成森林图分析模版](#_template.analysis.maxSpanningForest--最大生成森林图分析模版)
##### 功能增强型插件
* [enhance.d3.mapper--d3映射增强器](#_enhance.d3.mapper--d3映射增强器)


### basicuse-基本使用

在 G6 中使用插件非常简单，只需要三步：

#### 第一步 —— 安装插件：

* 脚本引入

```js
<script src="http://unpkg.alipay.com/@ali/g6-plugins@1.0.0-beta.19/dist/g6-plugins.min.js"></script>
```

* npm 安装

`外部用户暂不提供 npm 引入`，阿里内部同学可使用 tnpm 安装 "@ali/g6-plugins"。

#### 第二步 —— 实例化插件：

```js
const plugin = new G6.Plugins['name']();
```

#### 第三步 —— 配置插件到图类：

```js
const plugin = new G6.Plugins['name']();
const net = new G6.Net({
  plugins: [plugin]
});
```


### layout.dagre--统一分层布局

基于 [dagre](https://github.com/cpettitt/dagre) 开发的 G6 有向图布局插件。

[![image](https://gw.alipayobjects.com/zos/rmsportal/lFrGMlJUldtKOYdHlYnR.png)](../demo/other/plugin-dagre.html)

### G6 \['layout.dagre'\]\(cfg\)

#### 参数

- `cfg`: object

可配置属性如下：

```js
{
  /**
   * 布局朝向
   * 可取值为： 'TB', 'BT', 'LR', or 'RL' 默认值为 'TB'。
   * @type  {String}
   */
  rankdir,

  /**
   * 节点间距
   * @type  {Number}
   */
  nodesep,

  /**
   * 分层间距
   * @type  {Number}
   */
  ranksep,

  /**
   * 生成边控制点
   * 默认值为 true
   * @type  {Boolean}
   */
  useEdgeControlPoint,
}
```

### layout.d3.force--力导布局

基于 [d3.force](https://github.com/d3/d3-force) 开发的 G6 力导布局插件。

[![image](https://gw.alipayobjects.com/zos/rmsportal/CpxlqFNQcBDbDyHYpTau.png)](../demo/other/plugin-d3-force.html)

###  new G6.Plugins\['layout.d3.force'\](cfg)</span>
#### 参数

- `cfg`: object

```js
{
  /**
   * 是否动态
   * 默认值为 false
   * @type  {Boolean}
   */
  dynamic,

  /**
   * 是否使用多体组合碰撞
   * 默认值为 true
   * @type  {Boolean}
   */
  manyBody,

  /**
   * 模拟器回调
   * 用于用户自定义模拟器
   * 参考 https://github.com/d3/d3-force
   * @type  {Function}
   */
  callback,
}
```

### tool.minimap--缩略图

官方自研的 G6 缩略图插件。

[![image](https://gw.alipayobjects.com/zos/rmsportal/zVrjOLIdwlHoZbmmhSkO.gif)](../demo/other/plugin-minimap.html)

### new G6.Plugins\['tool.minimap'\](cfg)

#### 参数

- `cfg`: object

```js
{
  /**
   * 宽
   * 默认值为：图宽的 1/5
   * @type  {Number}
   */
  width,

  /**
   * 高
   * 默认值为：图高的 1/5
   * @type  {Number}
   */
  height,

  /**
   * 左边距
   * 默认值为：10
   * @type  {Number}
   */
  marginLeft,

  /**
   * 上边距
   * 默认值为：10
   * @type  {Number}
   */
  marginTop,

  /**
   * 右边距
   * 默认值为：10
   * @type  {Number}
   */
  marginRight,

  /**
   * 下边距
   * 默认值为：10
   * @type  {Number}
   */
  marginBottom,

  /**
   * 九宫格位置
   * 可取值为：'bl', 'tl', 'lc', 'cc', 'tc', 'tr', 'rc', 'br', 'bc' 默认值为： 'bl'。
   * @type  {String}
   */
  position,
}
```

### template.analysis.maxSpanningForest--最大生成森林图分析模版

官方自研的最大生成森林图分析模版，适用于中大规模的网络图分析。

[![image](https://gw.alipayobjects.com/zos/rmsportal/rinzLLZFlhpZjZlFEPnO.gif)](../demo/other/plugin-maxForest.html)

#### 对数据源要求

* 保留字段：

node: 

```js
{
  vx,
  vy,
  x,
  y,
  to,
  from,
  visited,
  edges,
  links,
}
```

edge:

```js
{
  isTreeEdge,
  lineWidth,
}
```

* 配置字段

node: 

```js
{
  weight, // 元素权重 必选
}
```

edge: 

```js
{
  weight, // 元素权重 必选
}
```

### <span>new G6\['template.analysis.maxSpanningForest'\](cfg)</span>


#### 参数

- `cfg`: object

```js
{
  /**
   * 悬浮激活
   * 默认值为 true
   * @type  {Boolean}
   */
  nodeHoverActived,

  /**
   * 水平位移
   * 默认值为：0
   * @type  {Number}
   */
  dx,

  /**
   * 悬浮激活
   * 默认值为 true
   * @type  {Boolean}
   */
  dy,

  nodeToolCfg: {
    class: 'node-tool',
    lists: [
      {
        html: '显示所有来源',
        event: 'click',
        callback: 'showSource',
      },
      {
        html: '显示所有去向',
        event: 'click',
        callback: 'showTargets',
      },
      {
        html: '显示来源与去向',
        event: 'click',
        callback: 'showAll',
      },
    ],
  }
}
```

### enhance.d3.mapper--d3映射增强器

基于 d3 技术栈拓展的 G6 映射增强插件。该插件能接受简单的参数，自动创建度量和图例。

[![image](https://gw.alipayobjects.com/zos/rmsportal/pVPRCHCjOzneemiAzEpL.png)](../demo/other/plugin-d3-mapper.html)

### new G6\['enhance.d3.mapper'\](itemType, dim, channel, range, cfg)

- `itemType`: string

子项类型，可选值为 `node`, `edge`，必填

- `dim`: string

数据纬度，必填

- `channel`: string

视觉通道，可选值为 `size`, `color`，必填

- `range`: array

值域，必填

- `cfg`: object

```js
  // d3-scale 文档参考：https://github.com/d3/d3-scale
  scaleCfg: {
    type: 'linear',    
    callback: scale => {
      // 可以在此处自定义操作scale
    },
  },
  // d3-legend 文档参考：https://github.com/susielu/d3-legend
  legendCfg: {
    /**
    * 九宫格位置
    * 可取值为：'bl', 'tl', 'lc', 'cc', 'tc', 'tr', 'rc', 'br', 'bc' 默认值为： 'bl'。
    * @type  {String}
    */
    position: 'br',
    /**
    * 左边距
    * 默认值为：10
    * @type  {Number}
    */
    marginLeft,

    /**
    * 上边距
    * 默认值为：10
    * @type  {Number}
    */
    marginTop,

    /**
    * 右边距
    * 默认值为：10
    * @type  {Number}
    */
    marginRight,

    /**
    * 下边距
    * 默认值为：10
    * @type  {Number}
    */
    marginBottom,
    callback: legend => {
      // 可以在此处自定义操作legend
    },
  },
```