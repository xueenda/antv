<!--
title: 桑基图
tags: relation,flow
-->

# 桑基图

<img src="https://zos.alipayobjects.com/rmsportal/HKAIVpKdyzjGbWEeFIzn.png" />

## 桑基图的简介

桑基图 (Sankey Diagram)，是一种特定类型的流图，用于描述一组值到另一组值的流向。上图为1869年，查尔斯米纳德（Charles Minard）绘制的1812年拿破仑征俄图（Map of Napolean's Russian Campaign of 1812），这是一个在地图上覆盖桑基图的流程图。1898年爱尔兰人Matthew Henry Phineas Riall Sankey 在土木工程师学会会报纪要的一篇关于蒸汽机能源效率的文章中首次推出了第一个能量流动图，此后便以其名字命名为 Sankey 图，中文音译为桑基图。

图中延伸的分支的宽度对应数据流量的大小。桑基图的特点如下：

* 起始流量和结束流量相同，所有主支宽度的总和与所有分出去的分支宽度总和相等，保持能量的平衡；
* 在内部，不同的线条代表了不同的流量分流情况，它的宽度成比例地显示此分支占有的流量；
* 节点不同的宽度代表了特定状态下的流量大小。

桑基图通常应用于能源、材料成分、金融等数据的可视化分析。


## 桑基图的构成

<img class="constitute-img" src="https://zos.alipayobjects.com/rmsportal/xdfcZJIJNiHPxdLGcRDT.png" width="400px" height='240'/>

<table class="struct-table">
  <tr>
    <th>图表类型</th>
    <th>桑基图</th>
  </tr>
  <tr>
    <td>适合的数据</td>
    <td>节点数据集（可选），边数据集</td>
  </tr>
  <tr>
    <td>功能</td>
    <td>观察节点<code>关系</code></td>
  </tr>
  <tr>
    <td>数据与图形的映射</td>
    <td>权重映射到节点和边的宽度</td>
  </tr>
  <tr>
    <td>适合的数据条数</td>
    <td>10 条以上</td>
  </tr>
</table>

<div style="clear: both;"></div>

## 桑基图的应用场景

### 适合的场景

**数据的流向** 桑基图即桑基能量分流图，也叫桑基能量平衡图。

例子1:下图为 2009 年美国能源产出的分布以及能源的用途和损耗图。从图中可以明显看出主要的能源浪费发生于发电和交通

<img src="https://zos.alipayobjects.com/rmsportal/sYBCGCZwEwkaQnFjPEZA.jpeg" />

例子2:下图显示了 2050 年英国能源生产和消费的可能情景：左边节点表示能源供应方，右边节点表示能源需求方，中间节点是相关
的生产形式，并显示能量在消耗（或丢失！）之前如何转换和传输[数据来源：d3](https://bost.ocks.org/mike/sankey/energy.json)

<div id="c1"></div>

```js-
$.getJSON('/assets/data/sankey.json', function(data) {
  var graph = {
    nodes: [],
    edges: data,
  }
  var nodeById = {};
  function addNode(id) {
    if (!nodeById[id]) {
      var node = {
        id: id,
        name: id
      };
      nodeById[id] = node;
      graph.nodes.push(node);
    }
  }
  data.forEach(function(edge) {
    addNode(edge.source);
    addNode(edge.target);
  });
  var dv = new DataSet.View().source(graph, {
    type: 'graph',
  });
  dv.transform({
    type: 'diagram.sankey',
    nodeId: node => node.id,
  });
  var chart = new G2.Chart({
    container: 'c1',
    forceFit: true,
    height: 500,
    animate: false,
    padding: [0, 160, 0, 0],
  });

  chart.tooltip({
    showTitle: false
  });
  chart.legend(false);
  chart.scale({
    x: { sync: true },
    y: { sync: true }
  });

  // 首先绘制 edges，点要在边的上面
  // 创建单独的视图
  var edgeView = chart.view();
  edgeView.source(dv.edges);
  edgeView.axis(false);
  edgeView.edge()
    .position('x*y')
    .shape('arc')
    .color('#999')
    .opacity(0.6)
    .tooltip('value');

  // 创建节点视图
  var nodeView = chart.view();
  nodeView.axis(false);
  // 节点的x,y范围是 0，1
  // 因为边的范围也是 0,1所以正好统一起来
  nodeView.source(dv.nodes);
  nodeView.polygon()
    .position('x*y')
    .color('id')
    .label('name', {
      offset: 0,
      textStyle: {
        fill: 'grey',
        textAlign: 'left'
      }
    })
    .style({
      stroke: '#ccc'
    });
  chart.render();
});
```

### 不适合的场景

* 边的起始流量和结束流量不同：桑基图需要保持能量守恒，不能在中间过程创造出流量，流失（损耗）的流量应流向表示损耗的节点，所以每条边的宽度是保持不变的，需要改变边的宽度的数据推荐使用[和弦图](chord.html)

## 桑基图图与其他图表的对比

### 桑基图和[和弦图](chord.html)
* 桑基图可以描述多级关系，按照层级给节点分类；和弦图不分层级，表示节点间的相互关联
* 桑基图的边的权重保持不变；和弦图的边可以使用不同的初始权重和结束权重，宽度会有所变化

## 桑基图的扩展阅读

- [Go with the flow: Sankey diagrams illustrate energy economy](http://ecowest.org/2013/05/06/sankey-energy/)

