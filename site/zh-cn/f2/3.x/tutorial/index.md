<!--
index: 1
title: 快速上手
resource:
  jsFiles:
    - ${url.f2}
-->

# F2 快速上手

F2（Fast && Flexible），是一套面向移动端的基于可视化图形语法的解决方案，具有精简、高性能、易扩展的特性，适用于对性能、大小、扩展性要求很高的场景。

**在此衷心感谢[《The Grammar of Graphics》](https://www.cs.uic.edu/~wilkinson/TheGrammarOfGraphics/GOG.html)的作者 [Leland Wilkinson](https://en.wikipedia.org/wiki/Leland_Wilkinson)，为 F2 的图形语法提供了理论基础！**

## 特性

- ✔︎ 灵活且易扩展：灵活的按需引入机制，并提供自定义 Shape 以及动画机制，基于图形语法灵活绘制图表，满足你无限的创意
- ✔︎ 高性能：性能极致追求，针对移动设备做了大量的优化
- ✔︎ 精简：精简版（简单折柱饼）压缩后不到 100k，完整版本压缩后 152k
- ✔︎ 丰富的图表类型：支持 20+ 图表类型

## 安装

### 浏览器引入

既可以通过将脚本下载到本地也可以直接引入在线资源。

```html
<!-- 引入在线资源 -->
<script src="{{ url.f2 }}"></script>
```

```html
<!-- 引入本地脚本 -->
<script src="./f2.js"></script>
```

你也可以直接通过 [unpkg](https://unpkg.com/@antv/f2) 下载。
 
### 通过 npm 安装

[![npm](https://img.shields.io/npm/v/@antv/f2.svg?style=flat-square&maxAge=600)](https://npmjs.com/package/@antv/f2)
[![npm](https://img.shields.io/npm/dm/@antv/f2.svg?style=flat-square&maxAge=600)](https://npmjs.com/package/@antv/f2)

```bash
npm install @antv/f2 --save
```

成功安装完成之后，即可使用 `import` 或 `require` 进行引用。

```js
const F2 = require('@antv/f2');
```

## 一分钟上手

在 F2 引入页面后，我们就已经做好了创建第一个图表的准备了。

下面是以一个基础的柱状图为例开始我们的第一个图表创建。

### 浏览器引入方式

#### 1. 创建 `<canvas>` 标签

在页面上创建一个 `<canvas>` 并指定 `id`：

```html
<canvas id="myChart" width="400" height="260"></canvas>
```

#### 2. 编写图表绘制代码

创建 `<canvas>` 标签后，我们就可以进行简单的图表绘制:

1. 创建 Chart 图表对象，指定图表 ID、指定图表的宽高、边距等信息；
2. 载入图表数据源；
3. 使用图形语法进行图表的绘制；
4. 渲染图表。

```js
// F2 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
const data = [ 
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

// Step 1: 创建 Chart 对象
const chart = new F2.Chart({
  id: 'myChart',
  pixelRatio: window.devicePixelRatio // 指定分辨率 
});

// Step 2: 载入数据源
chart.source(data);

// Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
chart.interval().position('genre*sold').color('genre');

// Step 4: 渲染图表
chart.render();
```

完成上述两步之后，保存文件并用浏览器打开，一张柱状图就绘制成功了：

<canvas id="myChart" width="400" height="260"></canvas>

```js-
const data = [ 
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

const chart = new F2.Chart({
  id: 'myChart',
  pixelRatio: window.devicePixelRatio // 指定分辨率 
});
// load the data
chart.source(data);
// draw a column chart
chart.interval().position('genre*sold').color('genre');
chart.render();
```

### 更多示例

更多的示例直接查看 [Demo](../demo/index.html)
