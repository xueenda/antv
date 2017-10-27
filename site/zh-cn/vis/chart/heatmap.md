<!--
title: 热力图
tags: distribute
-->

# 热力图

<img src="https://os.alipayobjects.com/rmsportal/JeleDrjVnkyfPpS.png"/>

## 热力图的简介

热力图(Heat Map)，“热力图”一词最初是由软件设计师Cormac Kinney于1991年提出并创造的，用来描述一个2D显示实时金融市场信息。最开始的热力图，是矩形色块加上颜色编码。经过多年的演化，习语上的热力图，如今更规范，更被大多数人理解的是这种经过平滑模糊过的热力图谱。

热力图是非常特殊的一种图，其使用场景通常比较有限。AntV中所定义的热力图是两个`连续`数据分别映射到x、y轴。第三个连续数据映射到颜色，这个数据通常有两种获取途径办法：
1. 从原始数据里取出相应数据字段，直接输入。
2. 通过`封箱`和`计数`统计，得到区域数据密度元数据并映射到颜色。

注意以下几点：
1. 热力图尤其关注`分布`。
2. 热力图可以不需要坐标轴，其背景常常是`图片`或`地图`。
3. 热力图一般情况用其专有的色系`彩虹色系`(rainbow)

英文名：Heatmap

## 热力图的构成

<img src="https://os.alipayobjects.com/rmsportal/XKeijYcqHgbSLHN.png" width="386px;" class="constitute-img">

### 边界未经平滑处理的热力图

<table class="struct-table">
  <tr>
    <th>图表类型</th>
    <th>边界未经平滑处理的热力图</th>
  </tr>
  <tr>
    <td>适合的数据</td>
    <td>三个连续字段</td>
  </tr>
  <tr>
    <td>功能</td>
    <td>观察数据的<code>分布</code>情况</td>
  </tr>
  <tr>
    <td>数据与图形的映射</td>
    <td>两个连续字段分别映射到x轴、y轴。一个连续元数据映射到颜色。
  </tr>
  <tr>
    <td>适合的数据条数</td>
    <td>超过30条数据</td>
  </tr>
</table>

<div style="clear:both;"></div>

<img src="https://os.alipayobjects.com/rmsportal/dbxsqRSCIYXcEeW.png" width="386px;" class="constitute-img">

### 边界经平滑处理的热力图

<table class="struct-table">
  <tr>
    <th>图表类型</th>
    <th>边界经平滑处理的热力图</th>
  </tr>
  <tr>
    <td>适合的数据</td>
    <td>三个连续字段</td>
  </tr>
  <tr>
    <td>功能</td>
    <td>
    展示数据的<code>分布</code>情况
    </br>
    加上统计算法可<code>预测</code>未知区域数据
    </td>
  </tr>
  <tr>
    <td>数据与图形的映射</td>
    <td>两个连续字段分别映射到x轴、y轴。一个连续元数据映射到颜色。
  </tr>
  <tr>
    <td>适合的数据条数</td>
    <td>超过30条数据</td>
  </tr>
</table>

<div style="clear:both;"></div>


## 热力图的应用场景

### 适合的场景

例子1: **连续数值数据分布。**下图是杭州房租热力图，用于显示杭州市房租价格分布

<img src="https://t.alipayobjects.com/images/rmsweb/T1lhpiXkpfXXXXXXXX.png">

说明：
 * `维度`映射到`x`轴，`经度`映射到`y`轴，以确定位置
 * 租房的热度数值，股指映射到`颜色`

例子2: **数据的统计预测。**下图表示的是克拉数和价格的关系。我们想通过已有的钻石数据，对未知区域的钻石数据进行预测。

<div id='c2'></div>
<div class="code hide">
$.getJSON('./data/diamond.json',function (data) {
    var Stat = G2.Stat;
    var chart = new G2.Chart({
        id: 'c2',
        forceFit: true,
        height: 500
    });
    chart.source(data);
    chart.legend(false);
    chart.heatmap().position(Stat.density.kernel.gaussian('carat*price')).color('..density');
    chart.render();
});
</div>

说明：
 * `carat`（克拉数）字段映射到`x`轴，`price`（价格）字段映射到`y`轴，以确定位置
 * 通过高斯密度统计函数，得到绘制区域内每个点的概率密度。
 * `概率密度`映射到`颜色`
 * 鼠标悬浮图表到图表区域，能显示当前点所预测的概率密度数据


## 热力图与其他图表的对比

### 热力图和[色块图](color-map.html)

* 数据类型上看：热力图是用两个`连续`字段确定数值点的位置，色块图是用两个`分类`字段确定数值点的位置。
* 功能上看：热力图主要用于展示数据的`分布`情况，色块图在观察数据分布以外，还能进行`列对比`和`行对比`。


## 热力图的参考阅读

* [Heatmap.js](http://www.patrick-wied.at/static/heatmapjs/)
* [杭州房租热力图](http://datavlab.org/heatmap/)
* [维基百科 Heatmap](https://en.wikipedia.org/wiki/Heat_map)
