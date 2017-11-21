<!--
index: 3
title: AntV 是怎样命名图表的
authors:
  - name: 再飞
    avatar: ${assets}/image/members/zaifei.jpg
  - name: 有田
    avatar: ${assets}/image/members/youtian.jpg
date: "2017-11-22"
landscape: ${assets}/image/vis/blog/how-charts-be-named.jpg
-->

## 命名是个大问题

国内的数据图表领域，截止目前，好像还没有人做过全面的、权威的图表命名。这其中原因，我们推断，大致有这几个：

1. 可视化科学相较其它科学还尚年轻，学术界还没针对图表命名方面做过细致的探究，尚没有一套成熟的**分类命名方法**；
2. 数据图表本身发展很快，不断出现新的图表，极大的增加了命名难度；
3. 图表本身作为一类『舶来品』，中文译名多样，未形成标准。

于是，在 AntV 中我们就多了一项重大的考量，就是怎么给数据图表们上一个 `合情` `合理` `合法` 的名字。

## 命名图表的依据

AntV 所产出的数据图表，有一个很重要的原则
就是**从数据出发，从图表的本质形态出发**。在命名上，我们参考了大量的 web 产品以及 excel，在现有大众的认知基础上，对命名进行了整理。下面列举几点我们命名的规则：

1. 既有『标准柱状图』，又有『基础饼图』，又有『普通箱形图』，所以我们统一用『基础』；
2. 『正负 xxx』（比如正式柱状图）这种不应该是一种图表类型，就是『基础』形态，只是数据差异导致看上去好像不一样而已，不是一种新的图表类型，但在设计时可以有特殊的建议，比如左负右正的值区设置，正负值颜色区分，0 基线等细节；同样，『分组 xx』也是没有的，同样类型的图表不会因为多了个分组数据就变成另外一种图表类型了。所以我们会根据这些基础形态先对图表进行归类，然后再进行具体的命名。
3. 对于图表名的英译中，我们追求更加精准的翻译方式。比如我们将 "stack" 译为『堆叠』，相比于『层叠』，我们认为『堆叠』更加准确，堆放隐喻往高度延伸更加形象（如果是程序员或许会跟堆栈联系在一起，设计师同学感受一下），层叠会让人联想到一层又一层的『覆盖』，甚至是 layer 视觉上的前后覆盖（z 轴方向），excel 里用的是『堆积』，我们认为这个翻译水土不服。

### 玉玦图，有时候也来点情怀

<img src="https://os.alipayobjects.com/rmsportal/sFtxmIyaKGCAAbl.png" style="width:300px">
<img src="https://os.alipayobjects.com/rmsportal/LRSKlnwopxNogiW.jpg"width="300px">

关于数据图表的命名，我们在遵循命名依据的基础上，有时候也会进行一些合情理的创新。比如上面这幅图，英文叫： Radial Bar Chart/Circular Bar Chart，直译过来就是放射状条形图或者环状条形图，可视化的论文以及翻译书籍中叫环缺图。我们觉得这些名字，要么过长，要么干巴巴的，所以借鉴了中国古代玉玦的象形，将这种图表命名为：『玉玦图』，希望能帮助大家更好的理解。

## 命名列表

* 柱状图

| 英文名 | 中文名 | 图解   |
| ----- | ----- | ------ |
| Basic Column Chart | 基础柱状图 | <img src="{{assets}}/dist/{{pkg.version}}/g2/3.x/bar/basic-column.png" style="width: 35%;">
| Stacked Column Chart | 堆叠柱状图 | <img src="{{assets}}/dist/{{pkg.version}}/g2/3.x/bar/stacked-column.png" style="width: 35%;">
| Stacked Percentage Column Chart | 百分比堆叠柱状图 | <img src="{{assets}}/dist/{{pkg.version}}/g2/3.x/bar/stacked-percentage-column.png" style="width: 35%;">
| Range Column Chart | 区间柱状图 | <img src="{{assets}}/dist/{{pkg.version}}/g2/3.x/bar/ranged-column.png" style="width: 35%;">
| Waterfall Chart | 瀑布图 | <img src="{{assets}}/dist/{{pkg.version}}/g2/3.x/bar/waterfall.png" style="width: 35%;">
| Histogram | 柱形直方图 | <img src="{{assets}}/dist/{{pkg.version}}/g2/3.x/bar/histogram.png" style="width: 35%;">
| Basic Bar Chart | 基础条形图 | <img src="{{assets}}/dist/{{pkg.version}}/g2/3.x/bar/basic.png" style="width: 35%;">
| Stacked Bar Chart | 堆叠条形图 | <img src="{{assets}}/dist/{{pkg.version}}/g2/3.x/bar/stacked.png" style="width: 35%;">
| Range Bar Chart | 区间条形图 | <img src="{{assets}}/dist/{{pkg.version}}/g2/3.x/bar/ranged.png" style="width: 35%;">

* 折线图

| 英文名 | 中文名 | 图解   |
| ----- | ----- | ------ |
| Basic Line Chart | 基础折线图 | <img src="{{assets}}/dist/{{pkg.version}}/g2/3.x/line/basic.png" style="width: 35%;">
| Step Line Chart | 阶梯折线图 | <img src="{{assets}}/dist/{{pkg.version}}/g2/3.x/line/step.png" style="width: 35%;">

* 点图

| 英文名 | 中文名 | 图解   |
| ----- | ----- | ------ |
| Scatter Chart | 散点图 | <img src="{{assets}}/dist/{{pkg.version}}/g2/3.x/point/scatter-series.png" style="width: 35%;">
| Scatter Chart | 扰动点图（ 散点图 demo） | <img src="{{assets}}/dist/{{pkg.version}}/g2/3.x/point/jitter.png" style="width: 35%;">
| Bubble Chart | 气泡图 | <img src="{{assets}}/dist/{{pkg.version}}/g2/3.x/point/bubble.png" style="width: 35%;">
| Punch Card | 穿孔卡点图（ 散点图 demo） | <img src="{{assets}}/dist/{{pkg.version}}/g2/3.x/other/punch-card.png" style="width: 35%;">

* 饼图

| 英文名 | 中文名 | 图解   |
| ----- | ----- | ------ |
| Basic Pie Chart | 基础饼图 | <img src="{{assets}}/dist/{{pkg.version}}/g2/3.x/pie/labelline.png" style="width: 35%;">
| Donut Chart | 环图 | <img src="{{assets}}/dist/{{pkg.version}}/g2/3.x/pie/donut.png" style="width: 35%;">
| Multi-level Pie Chart | 多层饼图 | <img src="{{assets}}/dist/{{pkg.version}}/g2/3.x/pie/multi-level.png" style="width: 35%;">
| Nightingale Rose Chart | 南丁格尔玫瑰图 | <img src="{{assets}}/dist/{{pkg.version}}/g2/3.x/pie/color-rose.png" style="width: 35%;">

* 面积图

| 英文名 | 中文名 | 图解   |
| ----- | ----- | ------ |
| Basic Area Chart | 基础面积图 | <img src="{{assets}}/dist/{{pkg.version}}/g2/3.x/area/basic.png" style="width: 35%;">
| Stacked Area Chart | 堆叠面积图 | <img src="{{assets}}/dist/{{pkg.version}}/g2/3.x/area/stacked.png" style="width: 35%;">
| Stacked Percentage Area Chart | 百分比堆叠面积图 | <img src="{{assets}}/dist/{{pkg.version}}/g2/3.x/area/percentage.png" style="width: 35%;">
| Range Column Chart | 区间面积图 | <img src="{{assets}}/dist/{{pkg.version}}/g2/3.x/area/range.png" style="width: 35%;">

* 漏斗图

| 英文名 | 中文名 | 图解   |
| ----- | ----- | ------ |
| Basic Funnel Chart | 基础漏斗图 | <img src="{{assets}}/dist/{{pkg.version}}/g2/3.x/funnel/basic.png" style="width: 35%;">
| Basic Funnel Chart | 尖底漏斗图（基础漏斗图 demo） | <img src="{{assets}}/dist/{{pkg.version}}/g2/3.x/funnel/pyramid.png" style="width: 35%;">
| Contrastive Funnel Chart | 对比漏斗图 | <img src="{{assets}}/dist/{{pkg.version}}/g2/3.x/funnel/comparision.png" style="width: 35%;">
| Symmetric Funnel Chart | 对称漏斗图 | <img src="{{assets}}/dist/{{pkg.version}}/g2/3.x/funnel/symmetric.png" style="width: 35%;">

* 极坐标图

| 英文名 | 中文名 | 图解   |
| ----- | ----- | ------ |
| Radar Chart | 雷达图 | <img src="{{assets}}/dist/{{pkg.version}}/g2/3.x/radar/basic.png" style="width: 35%;">

* 箱型图

| 英文名 | 中文名 | 图解   |
| ----- | ----- | ------ |
| Basic Box Chart | 基础箱型图 | <img src="{{assets}}/dist/{{pkg.version}}/g2/3.x/box/basic.png" style="width: 35%;">

* 热力图

| 英文名 | 中文名 | 图解   |
| ----- | ----- | ------ |
| Basic Heatmap | 基础热力图 | <img src="{{assets}}/dist/{{pkg.version}}/g2/3.x/heatmap/basic.png" style="width: 35%;">
| Smooth Heatmap | 平滑热力图 | <img src="{{assets}}/dist/{{pkg.version}}/g2/3.x/other/kernel-smooth-density.png" style="width: 35%;">
| Heatmap on Geography | 热力图（地理应用） | <img src="{{assets}}/dist/{{pkg.version}}/g2/3.x/heatmap/image.png" style="width: 35%;">
| Heatmap on Web | 热力图（网页应用） | <img src="https://gw.alipayobjects.com/zos/rmsportal/OKwsmygWDCZpzgdhlwRM.png" style="width: 35%;">
| Calendar Heatmap | 日历热力图  | <img src="{{assets}}/dist/{{pkg.version}}/g2/3.x/heatmap/calendar-horizontal.png" style="width: 35%;">

* 仪表盘

| 英文名 | 中文名 | 图解   |
| ----- | ----- | ------ |
| Basic Gauge | 基础仪表盘 | <img src="{{assets}}/dist/{{pkg.version}}/g2/3.x/gauge/basic.png" style="width: 35%;">

* 迷你图

| 英文名 | 中文名 | 图解   |
| ----- | ----- | ------ |
| Sparkline | 基础迷你图 | <img src="https://gw.alipayobjects.com/zos/rmsportal/INILrhDNgpDseECGZNDa.png" style="width: 35%;">

* 关系图 

| 英文名 | 中文名 | 图解   |
| ----- | ----- | ------ |
| Treemap | 树图 | <img src="{{assets}}/dist/{{pkg.version}}/g2/3.x/relation/treemap.png" style="width: 35%;">
| Polar Treemap | 径向树图 | <img src="https://gw.alipayobjects.com/zos/rmsportal/rcxERmGyyVxyyAeRtxOc.png" style="width: 35%;">

| 英文名 | 中文名 | 图解   |
| ----- | ----- | ------ |
| Network Graph | 网图 |  --  |
| Force-Directed Graph | 力导布局图 |  --  | 
| Arc Diagram | 弧形链接图 | <img src="{{assets}}/dist/{{pkg.version}}/g2/3.x/relation/arc.png" style="width: 35%;">
| Chord Diagram | 和弦图 | <img src="{{assets}}/dist/{{pkg.version}}/g2/3.x/relation/chord.png" style="width: 35%;">

| 英文名 | 中文名 | 图解   |
| ----- | ----- | ------ |
| Flow Chart | 流程图 |   --  |
| Sankey Diagram | 桑基图 | <img src="{{assets}}/dist/{{pkg.version}}/g2/3.x/relation/sankey.png" style="width: 35%;">
| Stream Graph | 河流图 | <img src="{{assets}}/dist/{{pkg.version}}/g2/3.x/other/streamgraph.png" style="width: 35%;">

* K 线图

| 英文名 | 中文名 | 图解   |
| ----- | ----- | ------ |
| Basic Candlestick Chart | 基础 K 线图 | <img src="{{assets}}/dist/{{pkg.version}}/g2/3.x/candlestick/basic.png" style="width: 35%;">

* 地图

| 英文名 | 中文名 | 
| ----- | ----- | 
| Flow Map | 流型地图 | 
| Choropleth Map | 分级统计地图 | 
| Map with Bubbles | 地图与气泡图 | 
| Map with dots | 地图与散点图 | 

* 高维多元数据图

| 英文名 | 中文名 |
| ----- | ----- |
| Scatter matrix | 散点矩阵图 |
| Parallel Coordinates Chart | 平行坐标系图 |
## 参考

* [The Data Visualisation Catalogue](https://datavizcatalogue.com/index.html)
* [Data Viz Project](http://datavizproject.com/)

## 最后

如果你对数据图表的名字有自己独特的、精彩的见解，不妨发 Issue 或加入我们的旺旺群，参与讨论。如果你的建议被采纳，我们希望能在征得你同意的情况下将你的大名（花名）和大头像，录入我们的共建名单中。
