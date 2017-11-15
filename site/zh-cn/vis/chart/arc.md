<!--
title: 弧长链接图
tags:
  - relation
variations:
  - chord
-->

# 弧长链接图

<img src="https://zos.alipayobjects.com/rmsportal/qpgXANQpfnLyYgQqnjNf.png" />

## 弧长链接图的简介

弧长链接图是节点－链接法的一个变种，节点－链接法是指用节点表示对象，用线（或边）表示关系的节点－链接布局(node-link)的一种可视化布局表示。弧长链接图在此概念的基础上，采用一维布局方式，即节点沿某个线性轴或环状排列，用圆弧表达节点之间的链接关系。这种方法不能像二维布局那样表达图的全局结构，但在节点良好排序后可清晰的呈现环和桥的结构。

英文名：Arc Diagram

## 弧长链接图的构成

### 线性弧长链接图

<img src="https://zos.alipayobjects.com/rmsportal/lYLyWWbCOIoiHaLlpFbF.png" class="constitute-img"/>

<table class="struct-table">
  <tr>
    <th>图表类型</th>
    <th>线性弧长链接图</th>
  </tr>
  <tr>
    <td>适合的数据</td>
    <td>列表：一组节点数据（包含节点 id 字段）、一组链接数据（包含源节点字段和目标节点字段）</td>
  </tr>
  <tr>
    <td>功能</td>
    <td>表示数据之间的链接关系</td>
  </tr>
  <tr>
    <td>数据与图形的映射</td>
    <td>节点的坐标（自动计算）字段映射到节点的坐标轴的位置，链接的坐标（自动计算）映射到半圆弧的顶点坐标轴位置。节点中的分类数据也可以设置颜色增强区分度</td>
  </tr>
  <tr>
    <td>适合的数据条数</td>
    <td>不少于 2 条数据</td>
  </tr>
</table>

<div style="clear: both;"></div>

### 环形弧长链接图

<img src="https://zos.alipayobjects.com/rmsportal/JJcPwdlgIdiaEXsAKYYr.png" class="constitute-img"/>


<table class="struct-table">
  <tr>
    <th>图表类型</th>
    <th>线性弧长链接图</th>
  </tr>
  <tr>
    <td>适合的数据</td>
    <td>列表：一组节点数据（包含节点 id 字段）、一组链接数据（包含源节点字段和目标节点字段）</td>
  </tr>
  <tr>
    <td>功能</td>
    <td>表示数据之间的链接关系</td>
  </tr>
  <tr>
    <td>数据与图形的映射</td>
    <td>节点的坐标（自动计算）字段映射到节点的坐标轴的位置，链接的坐标（自动计算）映射到以圆心为控制点的贝塞尔曲线的顶点坐标轴位置。节点中的分类数据也可以设置颜色增强区分度</td>
  </tr>
  <tr>
    <td>适合的数据条数</td>
    <td>不少于 5 条节点数据</td>
  </tr>
</table>


<div style="clear: both;"></div>


## 柱状图的应用场景

### 适合的场景： **表达数据之间的关系，以及关系的重要性**

例子1: 下图这个网络代表了维克多·雨果的经典小说“LesMisérables”中的人物关系

* 节点数据

|name |group| id|
|------|----|----|
|Myriel|1|0|
|...|...|...|

* 链接数据

|source |target|value|
|------|----|----|
|1|0|1|
|...|...|...|

<div id="c1"></div>

```js-
$.getJSON('/assets/data/miserables.json', function(data) {
  var dataMap = {};
  data.nodes.map(function(node,index) {
    node.id = index;
    node.value = 0;
    dataMap[index] = node;
  });
  data.nodes.sort(function(b, a){
    var deltGroup = a.group - b.group;
    var deltValue = a.value - b.value;
    return deltGroup * 100 + deltValue;
  });
  data.edges.forEach(function(edge){
    dataMap[edge.source].value += edge.value;
  });

  var dv = new DataSet.View().source(data, {
    type: 'graph',
  });

  var chart = new G2.Chart({
    id: 'c1',
    forceFit: true,
    height: 450,
    animate: false,
    padding: [ 40, 20, 150, 80 ]
  });

  chart.tooltip({
    title: null
  });

  dv.transform({
    type: 'diagram.arc',
  });

  var defs = {
    value: {min:-2}
  };
  chart.legend(false);

  var edgeView = chart.view();
  edgeView.source(dv.edges, defs);
  edgeView.axis(false);
  edgeView.edge()
    .position('x*y')
    .shape('arc')
    .size('value')
    .color('#555')
    .opacity(0.5);
    
  var nodeView = chart.view();
  nodeView.axis(false);
  nodeView.source(dv.nodes, defs);
  nodeView.point()
    .position('x*y')
    .color('group')
    .size('value')
    .shape('circle')
    .label('nodeName',{
      offset: -10,
      textStyle: {
        textAlign: 'left',
        rotate: 90
      }
    });
  chart.render();
});
```

说明：
 * group 字段，使用了`颜色`用于区分不同的节点类型

例子2：使用极坐标系可以将 例1 的数据绘制成环形弧长链接图

<div id="c2"></div>

```js-
$.getJSON('/assets/data/relationship.json', function(data) {
  var dv = new DataSet.View().source(data, {
    type: 'graph',
    nodes: function (d) {
      return d.nodes;
    },
    edges: function (d) {
      return d.links;
    },
  });

  var nodes = data.nodes; // 节点数据
  var links = data.links; // 边数据
  links.map(function(link){
    var sourceObj = nodes.filter(function(node){
      return node.id == link.source; 
    })[0];
    link.type = sourceObj.modularity_class; // 边按照源节点的类型进行分类
  });


  nodes.sort(function(b, a){
    var deltGroup = a['modularity_class'] - b['modularity_class'];
    var deltValue = a.size - b.size;
    return deltGroup * 100 + deltValue;
  });

  var chart = new G2.Chart({
    id: 'c2',
    forceFit: true,
    height: 600,
    animate: false,
    padding: 100
  });

  dv.transform({
    type: 'diagram.arc'
  });

  chart.legend(false);
  chart.tooltip({
    title:null
  });

  // 创建边视图
  var edgeView = chart.view();
  edgeView.source(links);
  edgeView.coord('polar').reflect('y');  // 使用极坐标，反转y轴(布局方法默认给y赋值为0)
  edgeView.axis(false);
  edgeView.edge()
    // 由于边的坐标数据较多，此处使用统计函数简化语法，Stat.link计算布局后的边的坐标，放在..x和..y中，数值范围是 0-1
    .position('x*y')
    .shape('arc') // 使用弧线完成边的绘制
    .color('type')
    .opacity(0.5)
    .tooltip('source*target'); 

  // 创建节点视图
  var nodeView = chart.view();
  nodeView.coord('polar').reflect('y');
  nodeView.axis(false);
  nodeView.source(nodes);
  nodeView.point()
    .position('x*y') // nodes数据的x、y由layout方法计算得出
    .color('modularity_class')
    .size('size')
    .shape('circle')
    .label('label',{ 
      offset: 10,
      lableLine: false,
      labelEmit: true  // 配置label文字为放射状
    })
    .tooltip('size*modularity_class');

  chart.render();
});
```

## 弧长链接图与其他图表的对比

### 弧长链接图和[和弦图](chord.html)

* 弧长链接图的节点使用标准线性布局，节点权重决定节点大小但不影响位置
* 弧长链接图的连线可以使用权重控制线宽，粗细均匀。
* 弧长链接图的连线重叠绘制在节点上
* 和弦图的节点使用权重线性布局，节点权重即决定节点大小，又决定节点位置
* 和弦图的连线使用源权重和目标权重控制线宽，粗细非均匀
* 和弦图的节点宽度为连线宽度之和，节点处的连线平铺不重叠

