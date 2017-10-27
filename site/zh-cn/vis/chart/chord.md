<!--
title: 和弦图
tags:
  - relation
variations:
  - non-ribbon-chord
-->

# 和弦图

<img src="https://zos.alipayobjects.com/rmsportal/wqqqDPsmjjToaWvrNFMY.png" />

## 和弦图的简介

和弦图(chord Diagram)，是一种显示矩阵中数据间相互关系的可视化方法，节点数据沿圆周径向排列，节点之间使用带权重（有宽度）的弧线链接

## 和弦图的构成

<img class="constitute-img" src="https://zos.alipayobjects.com/rmsportal/djkdEIgCQjeCCqCNwuct.png" width="400px"/>

<table class="struct-table">
  <tr>
    <th>图表类型</th>
    <th>和弦图</th>
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
    <td>节点数据两组以上</td>
  </tr>
</table>

<div style="clear: both;"></div>

## 和弦图的应用场景

和弦图用于探索实体组之间的关系。 它们被生物科学界广泛用于可视化基因数据，在Wired，New York Times和American Scientist等刊物上也被称为信息图表(info graphics)。其他应用场景如下：

例子1：**展示层次结构中的依赖关系** 例如在软件类层次结构中的类存在复杂的依赖关系，根据源和目标包进行分组，然后根据依赖的程度使用带宽度的边连接具有依赖关系的节点，下图每个节点表示一个独立的包，每条边展示了包与包之间的依赖关系，每个节点上边的数量展示了当前包依赖的目标包的数量，边的初始宽度展示了当前包的类依赖目标包的类的数量，边的结束宽度展示了目标包的类依赖当前包的类的数量，也就是说，当一条边的结束宽度不为0时，表示包之间有循环依赖，在图表中表现为节点上连接了颜色与节点不同的边，例如图中左下角的vis.data与vis.event。[数据来源：d3](http://bl.ocks.org/mbostock/raw/1046712/0e8c66400c2db4aacc99f935fbb480e2d77fbe19/readme.json)

<div id="c1"></div>

<div class="code hide">
$.getJSON('./data/relationshipHasWeight.json', function(data) {
  var Stat = G2.Stat;// 统计算法对象
  var Layout = G2.Layout;// 布局算法对像

  var nodes = data.nodes; // 节点数据
  var links = data.links; // 边数据

  var chart = new G2.Chart({
    id: 'c1',
    forceFit: true,
    height: 500,
    animate: false,
    plotCfg: {
      margin: [70,0,60,0]
    }
  });

  chart.tooltip({
    title: null
  });

  // 线性布局
  var layout = new Layout.Linear({
    nodes: nodes,
    hasWeight: true, // 带权重的布局
    margin: 0.004  // 节点边距
  });
  
  nodes = layout.getNodes(); // 获取布局后的节点数据

  // 创建边的视图
  var edgeView = chart.createView();
  edgeView.source(links);
  edgeView.coord('polar').reflect('y'); // 使用极坐标，反转y轴(布局方法默认给y赋值为0)
  edgeView.axis(false);
  chart.legend(false);
  // 由于边的坐标数据较多，此处使用统计函数简化语法，Stat.link计算布局后的边的坐标，放在..x和..y中，数值范围是 0-1
  edgeView.edge()
    .position(Stat.link.weight('source*target*sourceWeight*targetWeight',nodes))
    .shape('arc') // 使用弧线完成边的绘制
    .color('source')
    .opacity(0.5)
    .tooltip('sourceWeight*targetWeight');

  // 创建节点视图
  var nodeView = chart.createView();
  nodeView.coord('polar').reflect('y');
  nodeView.axis(false);
  nodeView.source(nodes);
  nodeView.point()
    .position('x*y') // nodes数据的x、y由layout方法计算得出
    .color('id')
    .size('width*height',function(width,height){ //将布局算法计算得出的节点宽高映射到size上
      return [width,height];
    })
    .shape('rect').style({  
      stroke:"#ccc"  // 节点边框
    })
    .tooltip('name*value')
    .label('name',{
      labelEmit: true,
      fontSize:12
    });
  chart.render();
});
</div>


例2：** 展示同级实体之间的流通关系 ** 下图展示了某个时段用户使用uber软件在美国旧金山各个城市之间乘车交通的情况，图中的节点表示城市，节点大小表示了交通流量的多少，从图中可以看出，交通行为主要发生在SoMa、Downtown、Financial District、Mission、Marina和Western Addition六个城市。边连接了有交通行为的两个城市，节点上边的条数表示与当前城市有交通行为的城市的数量，边的初始宽度表示从当前城市到目标城市的流通量，边的结束宽度表示从目标城市到当前城市的流通量，从图中可以看出，从 SoMa到Financial District的流量最大，[数据来源：uberdata](https://twitter.com/uberdata)

<img src="https://zos.alipayobjects.com/rmsportal/IWssILKPItzzYdrsmclc.png" style="width: 500px" />
