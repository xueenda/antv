<!--
index: 0
title: AntV 3.0 — 三生万物
description: AntV 发布稿
authors:
  - name: 有田
    avatar: ${assets}/image/members/youtian.jpg
date: "2017-11-22"
landscape: ${assets}/image/vis/blog/antv-3.0-releasing.jpg
resource:
  cssFiles:
    - ${url.katexCss}
-->

## Hello AntV 3.0

**AntV** 是蚂蚁金服全新一代数据可视化解决方案，主要包含「数据驱动的高交互可视化图形语法」**G2**、专注解决流程与关系分析的图表库 **G6**、适于对性能、体积、扩展性要求严苛场景下使用的移动端图表库 **F2** 以及一套完整的图表使用指引和可视化设计规范，致力于提供一套简单方便、专业可靠、无限可能的数据可视化最佳实践。

今年是 AntV 发展的第三个年头，经过岁月的洗礼，多年的努力，以及越来越多的领域大牛加入到这个项目中来，AntV 已经成为阿里经济体中，数据可视化领域十分重要的技术基础设施，为集团内外2000+个业务系统提供数据可视化能力，其中不乏日均千万 UV 级的产品。同时，阿里内部基于 AntV 技术栈的可视化组件、工具、图表类库等相关技术生态开始繁荣，并逐步走向外界受到越来越多的关注。

今天，我们怀着诚心、真心以及「 **让人们在数据世界里获得视觉能力**」的梦想，为各位带来 AntV 3.0。

## G2 3.0 一次绚丽的蜕变

G2 是 AntV 最重要的组成，始于《The Grammar of Graphics》一书描述的**视觉编码语法系统**（这也是 G2 项目命名的由来），是图形语法在前端工程上的一个实现。G2 提供了强大的语义化图表生成能力，使得用户（开发者）可以通过简单的语法组合即可搭建出各种各样的图表。

G2 在过去两年多时间一直稳步发展，虽然通过了阿里集团内近千个业务系统，千万级 UV 产品的严苛考验，历经了两个大版本的迭代改进，但离我们心中的使命目标还有很长的一段距离，加上现有的图形语法理论在交互定义上的缺失极大限制了她的可视分析能力，于是我们决定让 G2 进入新一轮的蜕变。

经过近半年紧锣密鼓的设计和研发迭代，**2017年11月22日**，**G2 3.0**来了，一个“数据驱动的高交互图形语法”新生绽放，并且从这个版本起，G2 将以 MIT 协议正式对外开源。

### `你没有听错，今天，2017 年 11 月 22 号，G2 正式开源了!` [GitHub](https://github.com/antvis/g2)

### 我们做了什么？

在3.0里，我们把之前混合在图形语法里的数据处理、统计函数统统抽离出来；我们把原先的配置项做了升级，使得坐标轴、图例、图表样式、提示信息等配置项更灵活更强大，并且同时支持回调函数的使用；我们还顺道优化了底层绘图性能、交互、动画、事件体系，处理了先前一些接口命名和组织上不合理的地方。

支撑这些改变的同时，G2 的底层也悄然发生了变化。我们调整了 G2 的架构，把原先不够集中的模块精简到三个核心的包里：底层绘图库 G 、数据处理库 DataSet 和上层的数据驱动的交互式图形语法库 G2 ；同时更多地从JS社区借力，采用 ES6 语法进行开发、通用基础能力更多依赖第三方成熟的底层库、更好的开发测试流程等等。新的架构将更加开放和包容，也使得新版本的可扩展能力变得前所未有的强大。

### 新特性尝鲜

下面来看看，3.0 具体带来了哪些新特性？

#### 高速渲染，即时交互响应

3.0 通过合并 Canvas 图层、数据处理外置等措施，大幅度提升了图表的渲染性能。个别图表渲染/重绘效率甚至得到了数倍的提升，为流畅的交互提供了更强有力的保障，即便在大数据量的图上，也能获得流畅的交互体验。

![image | center](https://gw.alipayobjects.com/zos/rmsportal/okUNzzvuCBVZRDBsaQtr.png "")


> 热力图（heatmap）有渲染和重绘两个阶段。2.x 版本重绘需要重新创建 chart instance，所以渲染和重绘时间消耗一致；而新版支持不销毁实例重绘，所以3.0版本除了让渲染耗时降低到只需原来时间的25%之外，还让重绘实现了质的飞跃，只需原重绘时间的3%即可刷新，使得热力图连续图例过滤成为现实。


![heatmap.gif | center | 602x393](https://gw.alipayobjects.com/zos/rmsportal/nfiOREzMIsENrzUeLOGR.gif "")


<div data-type="alignment" data-value="center" style="text-align:center;"><div data-type="p"><span style="color:#9A786C;">热力图连续图例过滤</span></div></div>


![demo6.gif | center | 617x407](https://gw.alipayobjects.com/zos/rmsportal/ifSTXzrGbvtLRpnAvAiZ.gif "")


<div data-type="alignment" data-value="center" style="text-align:center;"><div data-type="p"><span style="color:#9A786C;">即时交互响应</span></div></div>


动画模块也从底层做了深入的优化，支持自定义动画，也更加流畅。

![animate.gif | center | 646x286](https://gw.alipayobjects.com/zos/rmsportal/PZXWXvhLPdvGLyXNNURi.gif "")


![animate2.gif | center | 638x340](https://gw.alipayobjects.com/zos/rmsportal/PCgloSxXAxbMMJZCndLo.gif "")


<div data-type="alignment" data-value="center" style="text-align:center;"><div data-type="p"><span style="color:#9A786C;">自定义动画</span></div></div>


#### 事件完备，无限交互可能

在 3.0 版本中，图表上的**任意元素**均可捕获鼠标和触摸事件，提供了更精准的事件监听，同时也为丰富多样的交互提供无限可能，自此用户不仅可以通过灵活多变的图形语法组合去创造图表，而且还可以为图表增添各种交互能力，为用户的想象力插上翅膀~

用户只需要在 chart 或者 view 上监听该元素对应的事件名即可（元素名+基础事件名的方式组合），如下

```javascript
// 监听坐标轴文本的鼠标事件
chart.on('axis-label:mouseenter', ev => {});
chart.on('axis-label:mouseleave', ev => {});
chart.on('axis-label:click', ev => {});
```

![animate4.gif | center | 701x142](https://gw.alipayobjects.com/zos/rmsportal/tHRAUZmnkRzJlCamGdJZ.gif "")


<div data-type="alignment" data-value="center" style="text-align:center;"><div data-type="p"><span style="color:#9A786C;">任意元素自定义交互</span></div></div>


#### 更完备的定制化能力

3.0 里，图例（legend）、提示信息（tooltip）、辅助元素（guide）等配置重新进行了设计，新的配置项方案更加丰富、合理，同时还增强了对 HTML 的支持，而在Geometry层的style、label、tooltip等方法的属性上支持回调函数控制。这些的改进，使得自定义组件变得更加简单而灵活，进一步让 G2 拥有高定制化的能力。  
![pie.gif | center | 540x313](https://gw.alipayobjects.com/zos/rmsportal/AOwgKIjknXfggPijmhym.gif "")


<div data-type="alignment" data-value="center" style="text-align:center;"><div data-type="p"><span style="color:#9A786C;">自定义图例以及 tooltip</span></div></div>


#### 更强的分面功能

分面功能不再统一由一个 chart 实例定义，而是通过回调函数函数的形式，每个分面上的图表单独用一个 view 来绘制。这使得我们可以轻松根据需求在不同的分面图表上绘制不同的内容。经过这样的改进，绘制类似下面专业的分面图表就变成了小菜一碟：

![facet.png | center | 705x407](https://gw.alipayobjects.com/zos/rmsportal/RquhRNjuntFSsFnUKYDR.png "")


<div data-type="alignment" data-value="center" style="text-align:center;"><div data-type="p"><span style="color:#9A786C;">分面定制效果</span></div></div>


#### 数据处理外置，轻装上阵

要说 3.0 变化最大的点，无疑是**数据处理外置**。旧版本中，Frame 和 Stat 是和 G2 强耦合的，统计处理甚至会入侵到图形语法中。这会带来几方面的问题：不少功能受限于耦合比较难升级；数据处理是非常大的领域，内置的话扩展起来难免畏首畏尾，担心因此影响 G2 的体量；耦合的情况下，给数据处理和图形语法两方面都带来了新的理解成本。

基于这些考虑，我们认真梳理了底层架构，决定从 G2 中把数据处理部分抽离出来，封装成了一个专门的数据处理模块 DataSet。从此 G2 内部不再有数据处理、布局和统计方面的代码包袱，继续专注强化“高交互图形语法”方面的特长；而独立的 DataSet 模块则通过简单、强包容性的架构，以及状态量等策略扫除了升级扩展的障碍，得以从开源社区大量借力，不断丰富“数据驱动”这一特性的内涵。

> G2 3.0不强依赖DataSet，在不需要复杂数据处理时可以不引入


独立出来的 DataSet 主要提供三个方面的能力：

1. 数据连接（connector）：用于接入不同类型的数据，支持不限于CSV/GeoJSON/Hierarchy等；
2. 数据处理（transform）：进行数据变形、数据转换等，是 DataSet 的核心功能，负责和扩展了 G2 在统计、布局、数据补全等等方面的数据处理需求；
3. 状态量管理（state）：支持不同数据视图之间、数据视图和图表之间的通信；


抽象出这三个方面的特性后，DataSet 模块就得以简单而广泛地从社区接力。譬如采用 d3-dsv 接入 CSV 类型的数据只需要下面寥寥两行代码：

```js
import {csvParse} from 'd3-dsv';
DataSet.registerConnector('csv', str => csvParse(str));
```

引入社区上各种布局算法、统计函数也类似，非常简单就可以完成，马上就能扩展 G2 的绘图能力。譬如通过引入 `d3-hierarchy` 和 `d3-voronoi` 就可以轻松画出比老版本更成熟的 Treemap 和 Voronoi 图：

<div data-type="alignment" data-value="center" style="text-align:center;"><div data-type="image" data-display="block" data-align="" data-src="https://gw.alipayobjects.com/zos/rmsportal/uZZmaudtKRnvUhmUdZSZ.gif" data-width=><span><img src="https://gw.alipayobjects.com/zos/rmsportal/uZZmaudtKRnvUhmUdZSZ.gif" width=""/></span></div></div>


<div data-type="alignment" data-value="center" style="text-align:center;"><div data-type="alignment" data-value="center" style="text-align:center;"><div data-type="p"><span style="color:#9A786C;">Treemap</span></div></div>
</div>


<div data-type="alignment" data-value="center" style="text-align:center;"><div data-type="image" data-display="block" data-align="" data-src="https://gw.alipayobjects.com/zos/rmsportal/zrUbqRDrjYXbbGyQIWTN.png" data-width=><span><img src="https://gw.alipayobjects.com/zos/rmsportal/zrUbqRDrjYXbbGyQIWTN.png" width=""/></span></div><div data-type="p"><span style="color:#9A786C;">Voronoi diagram</span></div></div>


<div data-type="alignment" data-value="center" style="text-align:center;"><div data-type="p"></div></div>


致敬 d3，但不止步于“d3”，事实上，结合 DataSet 和 G2 的图形语法能力，我们能画的图可能比d3还要多一些，比如Voronoi 在极坐标上的变体，直方图、六边形分箱的 offset 支持，矩形分箱的实现等等。

![voronoi-polar.png | center | 500x500](https://gw.alipayobjects.com/zos/rmsportal/NPqaoHeGuLVCoWKBtmIW.png "")


<div data-type="alignment" data-value="center" style="text-align:center;"><div data-type="p"><span style="color:#9A786C;">Voronoi 在极坐标上的变体</span></div></div>


![image.png | center | 704x222](https://gw.alipayobjects.com/zos/rmsportal/DNeExDfIeUVRgfZZromu.png "")


<div data-type="alignment" data-value="center" style="text-align:center;"><div data-type="p"><span style="color:#9A786C;">直方图、六边形分箱的 offset 支持</span></div></div>


![image.png | center | 704x234](https://gw.alipayobjects.com/zos/rmsportal/nSmaolAJbFwCnettvzbN.png "")


<div data-type="alignment" data-value="center" style="text-align:center;"><div data-type="p"><span style="color:#9A786C;">矩形分箱</span></div></div>


#### React ？Angular ？Vue ？

基于 AntV 技术栈还有许多优秀的项目，在 React 环境下使用 G2，我们推荐可以尝试使用 [BizCharts](https://alibaba.github.io/BizCharts/index.html) 和 Viser-react！这两个产品都是基于 G2 的 React 版本封装，使用体验更符合 React 技术栈的习惯，他们都与 AntV 有着紧密的协同，他们很快也将同步开源和发布基于 G2 3.0 的版本。

此外，[Viser](https://viserjs.github.io/) 并不是针对 React 做的适配，它是对 G2 3.0 通用的抽象。通过基于 Viser 封装，现在已经支持对 React、 Angular 和 Vue 三个常用框架的深度整合，对应的是 viser-react、viser-ng 和 viser-vue。对，你都有机会用到一样的使用体验。当然，你甚至可以自己动手来封装针对任何库的版本，如果需要的话。Viser 提供了这种自定义的扩展能力，而且成本非常低。

BizCharts 地址：https://alibaba.github.io/BizCharts/
Viser 地址：https://viserjs.github.io/

## G6 1.2 更丰满、更稳健

支撑了内部足够多的场景后，G6 本身的架构越来越清晰和完善。1.2.0 中，一方面，我们将布局机制抽象到了 Graph 层次，有了完备、统一的布局机制，这使得大家更容易的拓展 G6 的布局。另一方面，我们将常见的功能需求和社区内优秀的算法进行总结、封装，沉淀出一部分实用的插件以供大家使用，以求最大限度的降低大家的使用成本。

### 统一分层布局

得益于 graphviz 的研究成果以及 cpettitt 的工程实现，经过简单的封装产出的统一分层布局插件。有了该插件以后大家把手头毫无顺序的网状数据丢进 G6 ，就能绘制出符合人基本美学和阅读习惯的分层关系图。该插件着重展示关系数据的流向，非常适用于`流程类`关系数据。

![image.png | center | 706x521](https://gw.alipayobjects.com/zos/rmsportal/SjxtRycKBsLFUHUkbfsG.png)


<div data-type="alignment" data-value="center" style="text-align:center;"><div data-type="p"><span style="color:#9A786C;">plugin.layout.dagre &ndash; 统一分层布局</span></div></div>


### Minimap，缩量图

关系的规模只要稍微大点，要做到 overview -> zoom && filter 怎么能少了 minimap 的存在！

![image | center](https://gw.alipayobjects.com/zos/rmsportal/HVzfOFVBjzEongJECrzm.gif)


<div data-type="alignment" data-value="center" style="text-align:center;"><div data-type="p"><span style="color:#9A786C;">plugin.tool.minimap &ndash; 缩量图</span></div></div>


### 分析模板

G6 官方自研的、用于解决带权简单图的分析模版。适用于页面流量分析、系统调用分析、大中规模知识图谱等等业务场景。

![image | 500 * 500](https://gw.alipayobjects.com/zos/rmsportal/SYndHUkQcJYITxdYdnZB.gif)


<div data-type="alignment" data-value="center" style="text-align:center;"><div data-type="p"><span style="color:#9A786C;">plugin.template.analysis.maxSpanningForest &ndash; 最大生成森林图分析模版</span></div></div>


### 基于 d3 的扩展

基于 d3 技术栈开发的两个在可视分析中非常有用的插件。

![image | 500 * 500](https://gw.alipayobjects.com/zos/rmsportal/fTmBoDqMguvJQwRotWlC.gif)


<div data-type="alignment" data-value="center" style="text-align:center;"><div data-type="p"><span style="color:#9A786C;">plugin.layout.d3.force&ndash;力导布局 &amp;&amp; plugin.enhance.d3.mapper&ndash;d3映射增强器</span></div></div>


## F2 1.0 更轻、更快、为移动端打造

F2（原g2-mobile) 是一套高性能、高扩展的移动端图表库，主要用于对性能、大小、扩展性高度敏感的场景，已经在钱包、淘票票、钉钉、weex、rax 中广泛使用。

### 特性

* 极小：在提供了几十种图表的基础上，压缩后代码不足 70k，全部大小 100k
* 高性能：极致优化贴近原生canvas的性能
* 高扩展性：可以非常容易的实现个性化的图表


### 性能对比：

1024 条数据的情况下折线图的性能对比：

![Snip20171028_1.png | center](https://gw.alipayobjects.com/zos/rmsportal/DUWxsmFTubdLiSqXmxkq.png)


### 一些示例

#### 官方示例

![image | center](https://gw.alipayobjects.com/zos/rmsportal/TUASzzGyfaFLKTLnOGjH.png)


#### 真实场景

![image | center](https://gw.alipayobjects.com/zos/rmsportal/vBQFWRlBzwfoDroZAyuk.png)


## 结束语

AntV 3.0 不仅凝聚了蚂蚁金服体验技术部数据可视化团队多年来的心血，还有一路相伴的众多合作伙伴的支持和帮助，感谢对 AntV 的关注和信赖，感谢一路有你。

2017年11月22日，AntV G2正式对外开源，这是我们新的起点，期待未来与您同行。

大家使用过程中有任何的问题或者建议都可以在 [Github](https://github.com/antvis/site/issues) 上跟我们反馈。

Github 地址：https://github.com/antvis/feedback
AntV 官方网站: [https://antv.alipay.com/](https://antv.alipay.com/)

