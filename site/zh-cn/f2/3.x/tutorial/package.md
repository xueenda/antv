<!--
index: 5
title: 自定义引用图表
resource:
  jsFiles:
-->

# 自定义引用图表

F2 应用在移动端，所以对文件的大小非常重视，而默认情况下 F2 集成了大量的图表：

type | 说明| 对应的图表类型
--- | --- | ---
`point` | 点，用于点图的构建。 | 散点图、气泡图
`path` | 路径，无序的点连接而成的一条线。| path
`line` | 线，点按照 x 轴连接成一条线，构成线图。 | 线图、曲线图
`area` | 填充线图跟坐标系之间构成区域图，也可以指定上下范围。| 面积图、区间面积图、层叠面积图
`interval` | 使用矩形或者弧形，用面积来表示大小关系的图形，一般构成柱状图、饼图等图表。| 柱状图、瀑布图、区间柱状图、玫瑰图、饼图、环图
`polygon` | 多边形，可以用于色块图、地图等图表类型。| 地图、色块图
`schema` | k线图 | 蜡烛图、箱型图（暂时未提供）

## 自定义引用

通过以下步骤你可以定制自己引用的图表，降低无效代码的引入：

* 安装 npm 包
* 引用 核心代码
* 引用 需要的模块

### 安装 npm 包

```js
npm install @antv/f2
```

### 引用 核心代码

F2 的提供了两个入口：

* index.js 包含了所有的图表
* core.js 没有任何图表，仅包含核心的代码

你可以仅引用 core.js

```js
var F2 = require('@antv/f2/core');

```

核心包中包括了以下内容：

* axis 坐标系
* chart 图表的入口
* coord 坐标系
* scale 度量
* attr 属性映射


### 引用你需要的模块

除了核心模块外F2 还包括下面几种模块

* geom 某种具体图表的代码，例如 line ,interval
* animate 动画模块
* guide 辅助元素模块
* adjust 分组、层叠柱状图，层叠面积图 相关的数据调整模块


以引入 line 为例：

```js
require('@antv/f2/src/geom/line');
```

如果你要引入 animate、guide、adjust 模块

```js

require('@antv/f2/src/animate/');
require('@antv/f2/src/guid/');
require('@antv/f2/src/adjust/');

```

## 自定义引用示例

加入一个业务场景下需要以下功能：

* 柱状图、折线图、面积图
* 动画功能

则需要下面的引用：

```js
require('@antv/f2/src/geom/line');
require('@antv/f2/src/geom/area');
require('@antv/f2/src/geom/interval');

require('@antv/f2/src/animate/');

```


