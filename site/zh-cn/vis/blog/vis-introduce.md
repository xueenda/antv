<!--
index: 0
title: 可视化概览
-->

# 可视化概览

## 一、什么是数据可视化

> **科学可视化（Scientific Visualization）**、 **信息可视化（Information Visualization）** 和 **可视分析学（Visual Analytics）** 三个学科方向通常被看成可视化的三个主要分支。而**将这三个分支整合在一起形成的新学科“数据可视化”**，这是可视化研究领域的新起点。  
> ——《数据可视化》


广义的数据可视化涉及信息技术、自然科学、统计分析、图形学、交互、地理信息等多种学科。

![b6fc4f5353ca89c9437a420bdfe30a2b.png | center](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/attach/10334/b6fc4f5353ca89c9437a420bdfe30a2b.png "")


### 科学可视化

科学可视化（Scientific Visualization）是科学之中的一个跨学科研究与应用领域，主要关注三维现象的可视化，如建筑学、气象学、医学或生物学方面的各种系统，重点在于对体、面以及光源等等的逼真渲染。科学可视化是计算机图形学的一个子集，是计算机科学的一个分支。 科学可视化的目的是以图形方式说明科学数据，使科学家能够从数据中了解、说明和收集规律。

![b588fdbeccd3e61da33d4887844e5dd2.png | center](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/attach/10334/b588fdbeccd3e61da33d4887844e5dd2.png "")


### 信息可视化

信息可视化（Information Visualization）是研究抽象数据的交互式视觉表示以加强人类认知。 抽象数据包括数字和非数字数据，如地理信息与文本。信息可视化与科学可视化有所不同：科学可视化处理的数据具有天然几何结构（如磁感线、流体分布等），信息可视化处理的数据具有抽象数据结构。柱状图、趋势图、流程图、树状图等，都属于信息可视化，这些图形的设计都将抽象的概念转化成为可视化信息。

![f1e257be9068717f0b1269c3a8f69d52.png | center](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/attach/10334/f1e257be9068717f0b1269c3a8f69d52.png "")


### 可视分析学

可视分析学（Visual Analytics）是随着科学可视化和信息可视化发展而形成的新领域，重点是通过交互式视觉界面进行分析推理。

![bed4411e2a9198b4cece239484ecdc42.png | center](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/attach/10334/bed4411e2a9198b4cece239484ecdc42.png "")


科学可视化、信息可视化与可视分析学三者有一些重叠的目标和技术，这些领域之间的边界尚未有明确共识，初略来说有以下区分：

* 科学可视化处理具有自然几何结构（磁场、MRI 数据、洋流）的数据。
* 信息可视化处理抽象数据结构，如树或图形。
* 可视分析学将交互式视觉表示与基础分析过程（统计过程、数据挖掘技术）结合，能有效执行高级别、复杂的活动（推理、决策）。


## 二、为什么需要数据可视化

### 人类利用视觉获取的信息量，远远超出其他器官

人类通过视觉获取数据比任何其他形式的获取方式更好，人类大脑处理图像的速度比文本快 6 万倍，传输给大脑的信息 90％ 是可视化的。人类天生是视觉性的，我们可以利用天生技能来增强数据处理和组织效率。

![43a5be3896556814030e5d6cd4925278.png | center](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/attach/10334/43a5be3896556814030e5d6cd4925278.png "")


### 可视化可以帮助我们处理更加复杂的信息并增强记忆

大多数人对统计数据了解甚少，基本统计方法（平均值、中位数、范围等）并不符合人类的认知天性。 最着名的一个例子是 Anscombe 的四重奏，根据统计方法看数据很难看出规律，但一可视化出来，规律就非常清楚。

![6c3b9a8d8e26341efd0756c558751372.png | center](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/attach/10334/6c3b9a8d8e26341efd0756c558751372.png "")


可视化还可以有效增强人的记忆力，我们经常说的一图胜千言就是可视化对生活的影响。

## 三、如何实现数据可视化

### 可视化实现流程

在技术上，数据可视化最简单的理解，就是数据空间到图形空间的映射。

![db9c588c70277d61b56a942b825697dd.png | center](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/attach/1492/db9c588c70277d61b56a942b825697dd.png "")


一个经典的可视化实现流程，是先对数据进行加工过滤，转变成视觉可表达的形式（Visual Form），然后再渲染成用户可见的视图（View）。

![3eb2278e55905c35d5d1890b441d112c.png | center](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/attach/1492/3eb2278e55905c35d5d1890b441d112c.png "")


### 可视化技术栈

具备专业素养的数据可视化工程师一般来说需要掌握以下技术栈：

* 基础数学：三角函数、线性代数、几何算法
* 图形相关：canvas、svg、webgl、计算图形学、图论
* 工程算法：基础算法、统计算法、常用的布局算法
* 数据分析：数据清洗、统计学、数据建模
* 设计美学：设计原则、美学评判、颜色、交互、认知
* 可视化基础：可视化编码、可视分析、图形交互
* 可视化解决方案：图表的正确使用、常见的业务的可视化场景


### 常用的数据可视化工具

在学术界与工程界，数据可视化工具都非常之多，可参考一位知乎大拿整理的文章：[值得推荐的 37 款数据可视化工具](https://www.zhihu.com/question/19929609/answer/133825589)，学术界用得比较多的是 R 语言, ggplot2, Python 可视化库等，普通用户喜闻乐见的是 Excel，商业上的产品是 Tableau, DOMO, PowerBI 等等，是个精彩纷呈的世界。

这里有常用的 25 个数据可视化工具对比，没有完美的可视化工具，每个工具都有各自的优缺点。下面是一张工具选择推荐图，根据目的分类，左上是简单快捷，左下是故事导向，右上是为了分享分析，右侧是创新型图表，右下是分析型工具。

![5058dd7ccbfcf7cb6016d9cc7d256500.png | center](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/attach/10334/5058dd7ccbfcf7cb6016d9cc7d256500.png "")


## 四、我们常常听说的数据可视化

> 数据可视化（Data Visualization）和 信息可视化（Information Visualization）是两个相近的专业领域名词。**狭义上的数据可视化指的是将数据用统计图表方式呈现**，而信息可视化则是将非数字的信息进行可视化。前者用于传递信息，后者用于表现抽象或复杂的概念、技术和信息。而广义上的数据可视化则是数据可视化、信息可视化以及科学可视化等等多个领域的统称。  
> ——《数据可视化之美》


我们常常听说的数据可视化大多指**狭义的数据可视化**以及**部分信息可视化**。根据数据类型和性质的差异，经常分为以下几种类型：

**统计数据可视化**：用于对统计数据进行展示、分析。统计数据一般都是以数据库表的形式提供，常见的统计可视化类库有 HighCharts、ECharts、G2、Chart.js 等等，都是用于展示、分析统计数据。

**关系数据可视化**：主要表现为节点和边的关系，比如流程图、网络图、UML 图、力导图等。常见的关系可视化类库有 mxGraph、JointJS、GoJS、G6 等。

**地理空间数据可视化**：地理空间通常特指真实的人类生活空间，地理空间数据描述了一个对象在空间中的位置。在移动互联网时代，移动设备和传感器的广泛使用使得每时每刻都产生着海量的地理空间数据。常见类库如 Leaflet、Turf、Polymaps 等等，最近 Uber 开源的 [deck.gl](http://deck.gl) 也属于此类。

还有**时间序列数据可视化**（如 timeline）、**文本数据可视化**（如 worldcloud）等等。

## 五、基于 Web 的可视化技术

在讲各种流行类库框架前，我们先了解下 Web 图形的底层技术规范。

### 底层技术规范

* SVG：可缩放矢量图形（Scalable Vector Graphics），是基于可扩展标记语言（标准通用标记语言的子集）用于描述二维矢量图形的一种图形格式。
 
* Canvas 2D：Canvas 通过 JavaScript 来绘制 2D 图形，通过逐像素来进行渲染。
 
* Canvas 3D WebGL：WebGL（Web Graphic Library）是一个 JavaScript API，用于在任何兼容的 Web 浏览器中渲染 3D 图形。WebGL 程序由用 JavaScript 编写的控制代码和用 OpenGL 着色语言（GLSL）编写的着色器代码构成，这种语言类似于 C 或 C++，可在 GPU 上执行。


比较流行的基础绘图库，基于 SVG 的有 snap.svg、rapheal.js 等，基于 Canvas 2D 的有 zrender、g 等，基于 WebGL 的有 three.js、SceneJS、PhiloGL 等，这些基础绘图库可以让上层封装更简单容易。

我们重点回到基于 Web 技术的数据可视化类库。

### D3

D3.js 是一个基于数据操作文档的 JavaScript 库。 D3 可以将强大的可视化组件和数据驱动的 DOM 操作方法完美结合。

![866e2cb57ec7b4225b135f03149ba021.png | center](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/attach/10334/866e2cb57ec7b4225b135f03149ba021.png "")


D3 的优劣：

* 强大的 SVG 操作能力，可以非常容易的将数据映射为 SVG 属性
* 集成了大量数据处理、布局算法和计算图形的工具方法
* 强大的社区和丰富的 demo
* API 太底层，复用性低，学习与使用成本高


D3 没有提供封装好的组件，在复用性、易用性方面不佳，社区里有很多基于 D3 的可视化组件库：

* nvd3.js: 基于 D3 封装了常见的折线图、散点图、饼图，功能比较简单
* dc.js: 除了提供了常见的图表外还提供了一些数据处理能力
* c3.js: 一个轻量级的基于状态管理的图表库


==D3 有着Stanford的血脉渊源，在学术界享有很高声誉，灵活强大使得它成为目前领域内使用最广泛的可视化类库，但偏底层的API和数据驱动模式，使得上手D3存在一定门槛，基于D3的工程实现上需要自己考虑和处理更多内容，如动画、交互、统一样式等，研发成本较高。==

### HighCharts

HighCharts 是一个用纯 JavaScript 编写的图表库， 能够简单便捷的在 Web 应用上添加交互性图表。这是在 Web 上使用最广泛的图表，企业使用需要购买商业授权。

![.png | center](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/attach/10334/7f3559a7fa001ad3cca2cf1b9b52a645.png "")


HighCharts 的优劣：

* 使用门槛极低，兼容性好
* 使用广泛，非常成熟
* 样式比较陈旧、图表难以扩展
* 商业上使用需要购买版权


==这是图表界的 jQuery，在世界范围内是使用最多最广的一个可视化类库，但整体图表设计比较陈旧难以扩展，同时商业公司使用需要按照使用人数购买版权，比较昂贵，阿里有购买过，目前已不推荐使用。==

### ECharts

ECharts 缩写自 Enterprise Charts，企业级图表，开源来自百度数据可视化团队，是一个纯 Javascript 的图表库，可以流畅的运行在 PC 和移动设备上，兼容当前绝大部分浏览器，底层依赖另一个也是该团队自主研发的轻量级的 Canvas 类库 ZRender，提供直观，生动，可交互，可高度个性化定制的数据可视化图表。ECharts 是目前国内唯一一个入选 GitHub 全球可视化榜单的开源项目，1.7w+ star 全球排名第四，社区活跃，覆盖主流前端框架和 8 种编程语言的扩展，目前国内市场占有率处于绝对领先地位。

![0dab29eb55e265d088e40b2a2284fcf8.png | center](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/attach/10334/0dab29eb55e265d088e40b2a2284fcf8.png "")


ECharts 的优劣：

* 丰富的图表类型，覆盖主流常规的统计图表
* 配置项驱动，三级个性化图表样式管理
* 移动端优化，交互和布局适配，按需打包
* 深度的交互式数据探索
* 地理特效（百度迁徙，百度人气，公交轨迹等效果）
* 灵活性上不如 Vega 等基于图形语法的类库
* 复杂关系型图表比较难定制


==ECharts 能很好满足传统图表需求，但在高度灵活多样化的可视需求面前，需要另寻出路。==

### Leaflet

Leaflet 是面向移动设备的交互式地图的 JavaScript 库。 测量的 JS 只有大约 38 KB，它具有大多数开发人员需要的所有映射功能。

![image | center](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/attach/10334/07c2fa17824cf008896ac1d985aeb7ac.png "")


Leaflet 的优劣：

* 专门针对地图应用
* mobile 兼容性良好
* API 简洁、支持插件机制
* 功能比较简单，需要具备二次开发能力


==地图专用，其他领域使用不上。目前 Google 地图、高德地图、百度地图都拥有自研的 JS 库。==

### Vega

Vega 是华盛顿大学计算机学院数据交互实验室（IDL）开发的一套交互图形语法，定义了数据到图形的映射规则、常见的交互语法和常见的图形元素，用户可以自由使用 Vega 语法进行组合构建出各种各样的图表。

![image | center](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/attach/10334/e0acb24aa748f8266aa3ca93a5a3b29d.png "")


Vega 的优劣：

* 完全基于 JSON 语法，提供从数据到图形的映射规则
* 支持常见的交互语法
* 复杂的语法设计，使用和学习成本很高


==Vega 在学术上有着比较完美的语法设计，但在工程易用性上比较欠缺。==

### [deck.gl](http://deck.gl)

[eck.gl](http://eck.gl) 是 Uber 可视化团队基于 WebGL 开发的面向大数据分析的可视化类库。

![0315e89e3d6ed1c50c0ae733e544c0a2.png | center](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/attach/10334/0315e89e3d6ed1c50c0ae733e544c0a2.png "")


[deck.gl](http://deck.gl) 的优劣：

* 主要以 3D 地图可视化为主，内置了地理信息可视化常见的场景
* 支持大规模数据的可视化
* 需要具备 WebGL 的知识，层的扩展比较复杂


[==deck.gl==](http://deck.gl)== 在 3D 地图领域效果很赞，在其他领域不适用。==

基于 Web 的可视化工具还有很多，上面是几个一直以来使用比较多的类库工具，以及最近涌现的一些新秀。各个类库工具特性不同，定位不同，关键要看应用场景的适用性。

## 六、大阿里的数据可视化

大阿里（阿里巴巴、蚂蚁金服、菜鸟物流等集团）有各种数据可视化业务，在业务中沉淀了不少可视化类库与工具。目前总体来说，底层技术已逐步收敛到蚂蚁金服的 AntV 系列，同时基于 AntV 的组件、工具、产品等可视化生态开始繁荣，开始逐步影响业界。

### AntV 是什么

AntV 是一整套数据可视化解决方案，包括

* 底层绘图引擎 G：目前基于 canvas 2d 提供基础绘图能力，基于 webgl 的 3d 版本在规划中
* 可视化语法类库 G2：提供类似于 Vega 的一整套图形语法，主要是对统计类数据展示，灵活强大
* 关系可视化类库 G6：用于流程图、树图等关系数据的可视化
* 可视化解决方案沉淀：梳理各种图表的最佳适用场景、不适场景，以及特定场景下的可视化方案


### G2

G2 (The Grammar Of Graphics) 是一个由纯 JavaScript 编写、强大的语义化图表语法类库，提供了一整套图形语法，可以让用户通过简单的语法搭建出无数种图表，并集成了大量的统计工具，支持多种坐标系绘制，可以让用户自由地定制各种图表。

![ae412c94e3e25856766faced7413c3ce.png | center](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/attach/10334/ae412c94e3e25856766faced7413c3ce.png "")


G2 的优劣：

* 简单、易用
* 完备的可视化编码
* 强大的扩展能力
* 语法需要一定学习成本


==与 ECharts 等图表库相比，G2 最大的优势是灵活的图形语法能力，可以让用户自由定制出各种各样的图表。但同时优势也是劣势，图形语法的使用方式，上手的学习成本会比基于配置的 ECharts 等图表库高。==

### G6

G6 是一个由纯 JavaScript 编写的关系数据可视化类库，提供了基本的网图和树图功能，并支持多种内置布局。G6 提供了查看和编辑两种视图，开发者可基于 G6 对关系图快速进行二次开发。

![536cfd0d123d8ab70c9de984eaa53803.png | center](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/attach/10334/536cfd0d123d8ab70c9de984eaa53803.png "")


G6 的优劣：

* 简单的语法，强大的交互能力
* 支持多种视图，易于使用的编辑视图
* 强大的边和节点的扩展能力
* 现阶段上层封装比较少，使用成本比较高


==G6 是特别为关系型数据提供的可视化类库，对于统计型数据，请使用 G2 等类库。G6 现阶段还是非常底层的关系型可视化基础类库，上层直接可用的组件还比较少，需要根据业务需求进行二次开发。==

### AntV 发展现状

G2 于 2016 年 3 月份正式对外开放（代码尚未开源），目前正在迅猛发展。

![a4277f5b7bf2b404ead80281ea4cff41.png | center](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/attach/10334/a4277f5b7bf2b404ead80281ea4cff41.png "")


AntV 的整体产品层次图如下：

![bd5523855201fe9718baac633f37271e.png | center](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/attach/10334/bd5523855201fe9718baac633f37271e.png "")


目前基于 G2 进行二次业务封装的技术方案有：

* [bizchart](http://groups.alidemo.cn/bizcharts/bizcharts/demo/)，国际 UED，风月
* [icechart](http://ice.alibaba-inc.com/chart/about)，淘宝-基础平台技术部，晴苑
* [DataV](https://data.aliyun.com/visual/datav)，已确定底层迁移 G2，阿里云事业群-飞天一部-数据引擎-产品研发一组-可视化
* [Alisis](https://bigdata.alibaba-inc.com/worksheet/index.htm)，平台数据技术事业群-基础平台部-数据服务平台部，祁涛
* [金蝉](http://cicada.bz00b.alipay.net/hmpln/index.htm)，商家开放产品技术部
* 淘票票 App 对 g2-mobile 进行了二次封装
* [recharts](http://recharts.org/#/zh-CN/)，基于 D3 的 react 图表库，集团-数据技术及产品部-产品技术，流形。==待沟通，将底层迁移到 AntV==
* [chartx](http://thx.github.io/chartx/)，声明式图表库，阿里妈妈 UED，释剑。==待沟通，将底层迁移到 AntV==
* [Hilo](http://hiloteam.github.io/index.html), 互动小游戏引擎，天猫事业部-产品技术部-行业&供应链平台-积分&互动平台，江成。==领域不一样，属于图形互动领域==
* Kissy Chart，不再维护
* Pizza，不再维护


### 大阿里数据可视化小组规划

当前集团内存有大量数据可视化相关应用，大多数 BU 都无明确的技术选型指南，所采用的可视化技术栈种类繁多，设计和交互规范也是参差不齐。

由于缺乏通畅的信息沟通渠道导致重复建设的存在，而缺乏专业的数据可视化素养的工程师往往不能真正理解和发挥所使用的技术类库的优势和特点，影响工程研发效率。

核心可视化技术团队一般成员较少，而且分散在各 BU 各部门，无法形成有效的合力，无法统一对外发声，缺乏技术交流也不利于工程师自身的成长发展。

基于现状，2018 财年将尝试成立大阿里数据可视化工作小组。

![7d935f9f8168031d0e990f8d7b1c81f8.png | center](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/attach/10334/7d935f9f8168031d0e990f8d7b1c81f8.png "")


关键事项是：

1. **研发资源共享**，合力打造底层通用基础统计模块，通用基础图形类库等；
2. **设计资源共享**，统一可视化设计基础规范，提升产品质量和用户体验；
3. **最佳实践共享**，互通有无，减少不必要的重复劳动甚至重复造轮子；
4. **倒三角技术栈**，协同策应帮助各BU实现技术栈收敛统一，提升工程研发效能；
5. **成就技术社群**，形成阿里数据可视化技术社群，促进技术交流和布道，帮助工程师加速成长。


![cc37345ef02af0edcea9a66d4ca0e817 | center](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/attach/9119/cc37345ef02af0edcea9a66d4ca0e817 "")


## 七、写在最后

最后补充一个小点，数据可视化一点也不神秘。在人类历史发展的过程中，有很多的现实的数据可视化就在栩栩如生的生活里。比如灵隐寺里，有一个活生生的热力图：

![cb904a9eaadee807d7d76c4e13831b67.png | center](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/attach/10334/cb904a9eaadee807d7d76c4e13831b67.png "")


还有非常反映人性的数据可视化美女图：

![f4beabf2a922e1cb59c9a8a7dbcbed3d.png | center](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/attach/10334/f4beabf2a922e1cb59c9a8a7dbcbed3d.png "")


数据可视化是个庞大的领域，涉及的学科非常多。但正是因为这种跨学科性，让可视化领域充满活力与机遇。这篇文章仅仅是对数据可视化非常粗浅的一个概要介绍，更多内容，推荐陈为老师编著的《数据可视化》等经典著作。

最后，非常欢迎大家一起来用用 [AntV](https://antv.alipay.com/) 可视化解决方案。非常期待有更多同仁对可视化感兴趣，无论在哪，我们都可以协同合作，让数据的世界栩栩如生起来！
