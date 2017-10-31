<!--
title: 回归曲线图
tags:
  - trend
-->

# 回归曲线图

<img src="https://t.alipayobjects.com/images/T1cj0kXcpeXXXXXXXX.png" />

## 回归曲线图的简介

回归曲线图同统计学紧密结合，属于探索型图表，通过对样本数据进行曲线回归（非线性回归）确定两个变数间数量变化的某种特定的规则或规律。我们称图中的线为回归曲线，是最准确地贯穿图中的各个点的线，分为线性回归和非线性回归。

回归曲线图用于回归分析，其主要内容是通过试验或观测数据，寻找相关变量之间的统计规律性，再利用自变量的值有效预测因变量的可能取值。

## 回归曲线图的构成

<img src="https://t.alipayobjects.com/images/T1r7pkXjRbXXXXXXXX.png" class="constitute-img"/>

<table class="struct-table">
  <tr>
    <th>图表类型</th>
    <th>回归曲线图</th>
  </tr>
  <tr>
    <td>适合的数据</td>
    <td>两个连续字段</td>
  </tr>
  <tr>
    <td>功能</td>
    <td>
      观察数据的变化<code>趋势</code></br>
      根据样本点<code>预测</code>数据
    </td>
  </tr>
  <tr>
    <td>数据与图形的映射</td>
    <td>
      两个连续字段的分布特征元数据映射到回归线
    </td>
  </tr>
  <tr>
    <td>适合的数据条数</td>
    <td>暂无限制</td>
  </tr>
</table>

<div style="clear: both;"></div>


## 回归曲线图的应用场景

例子 1：**线性回归（linear regresiion）**。 线性回归是最原始的回归，用来做数值类型的回归，可以利用它来构建模型并通过构件的模型来进行预测。借助可视化技术，我们可以快速判断一组数据是否属于线性回归。

比如某农业科研机构要研究最大积雪深度 x 与灌溉面积 y 之间的关系，提供的数据样本为近 10 年的数据，如下表：

|年序|最大积雪深度 x(尺)|灌溉面积 y (亩)|
|------|----|----|
|1|15.2|28.6|
|2|10.4|19.3|
|3|21.2|40.5|
|4|18.6|35.6|
|5|26.4|48.9|
|6|23.4|45.0|
|7|13.5|29.2|
|8|16.7|34.1|
|9|24.0|46.7|
|10|19.1|37.4|

借助 DataSet 的回归统计Transform（regression），绘制如下图表：

<div id="c1"></div>

```js-
  var data = [
    {no:1, depth: 15.2, area: 28.6},
    {no:2, depth: 10.4, area: 19.3},
    {no:3, depth: 21.2, area: 40.5},
    {no:4, depth: 18.6, area: 35.6},
    {no:5, depth: 26.4, area: 48.9},
    {no:6, depth: 23.4, area: 45.0},
    {no:7, depth: 13.5, area: 29.2},
    {no:8, depth: 16.7, area: 34.1},
    {no:9, depth: 24.0, area: 46.7},
    {no:10, depth:19.1, area: 37.4}
  ];
  var dv = new DataSet.View().source(data);
  dv.transform({
    type: 'regression',
    method: 'linear',     // 回归算法类型
    fields: [ 'depth', 'area' ], // 统计字段
    bandwidth: 0.5,
    extent: [ 10, 30 ],     // 结果集里，x的数值范围
    as: [ 'depth', 'area' ]      // 结果字段
  });

  console.log(dv);

  var chart = new G2.Chart({
    container: 'c1',
    forceFit: true,
    height: 400
  });

  chart.source(data);
  chart.scale({
    depth: { sync: true },
    area: { sync: true },
  });
  chart.point().position('depth*area').color('#EECB5F').shape('circle');
  var view = chart.view();
  view.source(dv);
  view.line().position('depth*area').color('blue').size(1);
  
  chart.render();
```

具体的回归分析过程不在这里详述，具体可阅读： [数理统计知识整理——回归分析与方差分析](http://xiahouzuoxin.github.io/notes/html/%E6%95%B0%E7%90%86%E7%BB%9F%E8%AE%A1%E7%9F%A5%E8%AF%86%E6%95%B4%E7%90%86%E2%80%94%E2%80%94%E5%9B%9E%E5%BD%92%E5%88%86%E6%9E%90%E4%B8%8E%E6%96%B9%E5%B7%AE%E5%88%86%E6%9E%90.html)

例子 2：**非线性回归**。 一些常用的非线性回归曲线。

<img src="https://t.alipayobjects.com/images/T1OP0kXcpeXXXXXXXX.png" alt="">
