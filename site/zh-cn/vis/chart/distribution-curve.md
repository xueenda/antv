<!--
title: 分布曲线图
tags:
  - distribute
-->

# 分布曲线图

<img src="https://t.alipayobjects.com/images/T1BjJkXcxgXXXXXXXX.png"/>

## 分布曲线图的简介

分布曲线图展示的是一种概率分布，也是一种同统计学紧密结合的图表。分布曲线是一种对称的钟形曲线，具有均数等于0，标准差等于1的特点，从而使标准分数在实际运用时非常有用。较常用的概率密度函数有：

- 核密度估计概率密度：核密度估计（kernel density estimation）是在概率论中用来估计未知的密度函数，属于非参数检验方法之一。由于核密度估计方法不利用有关数据分布的先验知识，对数据分布不附加任何假定，是一种从数据样本本身出发研究数据分布特征的方法，因而，在统计学理论和应用领域均受到高度的重视。下图展示了几种比较常用的核函数，图中展示的是某一品种的鸢尾花花瓣长度的分布曲线。

<div id="c1" style="float: left;width: 250px;">
  <h5 style="text-align: center;margin-left: 65px;">高斯核函数</h5>
</div>
<div id="c2" style="float: left;width: 250px;">
  <h5 style="text-align: center;margin-left: 65px;">三角核函数</h5>
</div>
<div id="c3" style="float: left;width: 250px;">
  <h5 style="text-align: center;margin-left: 65px;">四次方核函数</h5>
</div>

<div style="clear: both;"></div>

- 正态分布概率密度：正态分布又名高斯分布，是一个在数学、物理及工程等领域都非常重要的概率分布，由于这个分布函数具有很多非常漂亮的性质，使得其在诸多涉及统计科学离散科学等领域的许多方面都有着重大的影响力。

<div id="c4" style="width:700px;margin: 0 auto;"></div>

<div class="code hide">
$.getJSON('./data/iris_flower_data.json?nowrap', function(data) {
  var dataSet1 = [];
  var dataSet2 = [];
  var dataSet3 = [];

  for(var i=0;i < data.length;i++){
    var item = data[i];
    if(item["品种"] === 'I. setosa') {
      dataSet1.push(item);
    } else if(item["品种"] === 'I. versicolor') {
      dataSet2.push(item);
    }else if(item["品种"] === 'I. virginica') {
      dataSet3.push(item);
    }
  }

  var Stat = G2.Stat;
  var chart = new G2.Chart({
    id: 'c1',
    forceFit: true,
    height: 300,
    plotCfg:{
      margin: [20,20,60,80]
    }
  });

  chart.source(dataSet1);
  chart.tooltip(false);
  chart.line().position(Stat.density.kernel.gaussian('花瓣长度',0.03)).color(G2.Global.colors['intervalStack'][2]);
  chart.render();

  var chart2 = new G2.Chart({
    id: 'c2',
    forceFit: true,
    height: 300,
    plotCfg:{
      margin: [20,20,60,80]
    }
  });

  chart2.source(dataSet1);
  chart2.tooltip(false);
  chart2.line().position(Stat.density.kernel.triangular('花瓣长度',0.03)).color(G2.Global.colors['intervalStack'][1]);
  chart2.render();

  var chart3 = new G2.Chart({
    id: 'c3',
    forceFit: true,
    height: 300,
    plotCfg:{
      margin: [20,20,60,80]
    }
  });

  chart3.source(dataSet1);
  chart3.tooltip(false);
  chart3.line().position(Stat.density.kernel.quartic('花瓣长度',0.03)).color(G2.Global.colors['intervalStack'][0]);
  chart3.render();

  var chart4 = new G2.Chart({
    id: 'c4',
    forceFit: true,
    height: 300
  });

  chart4.source(dataSet1);
  chart4.tooltip(false);
  chart4.line().position(Stat.density.normal('花瓣长度',0.01));
  chart4.render();

});
</div>


## 分布曲线图的构成

<img src="https://t.alipayobjects.com/images/T1AjNkXjNfXXXXXXXX.png" class="constitute-img"/>

分布曲线图由以下元素构成:

* 横轴：表示自变量
* 纵轴：表示因变量
* 表示概率分布的分布曲线

<div style="clear: both;"></div>

## 分布曲线图的应用场景

分布主要用于统计学领域，表达了某一个或某几个维度上的样本数据的分布情况。

现在我们有一组 2003 年抽样调查的男性的身高数据，借助分布曲线图我们可以很直观得观察身高这一属性是否符合正态分布。

| 性别 | 身高（cm）|
|------|----|
|男|174|
|男|175.3|
|男|193.5|
|...|...|
|男|180.3|

<div id="c6"></div>

从上图中可以看出，该组数据基本符合正态分布。
<div class="code hide">
$.getJSON('./data/scatter.json',function (data) {
  var dataset = [];
  for(var i=0;i < data.length;i++) {
    var item = data[i];
    if (item.gender === 'male'){
      dataset.push(item);
    }
  }
  var Stat = G2.Stat;
  var chart = new G2.Chart({
    id: 'c6',
    forceFit: true,
    height: 400
  });

  chart.source(dataset);
  chart.interval().position(Stat.summary.count(Stat.bin.rect('height')));
  chart.line().position(Stat.density.normal('height',0.01));
  chart.render();
});
</div>


## 分布曲线图的扩展阅读

* [正太分布](http://wiki.mbalib.com/wiki/%E6%AD%A3%E6%80%81%E5%88%86%E5%B8%83)
* [正态分布的前世今生](http://songshuhui.net/archives/77386)
