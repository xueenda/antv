<!--
title: 茎叶图
tags:
  - distribute
-->

# 茎叶图

<img src="https://t.alipayobjects.com/images/rmsweb/T1XwFjXaRiXXXXXXXX.png" />

## 茎叶图的简介

茎叶图（Stem-and-Leaf display)又称“枝叶图”，由统计学家约翰托奇( Arthur Bowley)设计，它的思路是将数组中的数按位数进行比较，将数的大小基本不变或变化不大的位作为一个主干（茎），将变化大的位的数作为分枝（叶），列在主干的后面，这样就可以清楚地看到每个主干后面的几个数，每个数具体是多少。


茎叶图除了给读者提供一个数据分布的概览以外，同时也标注出了离群值，帮助读者找到规律。茎叶图对比数据的特性，使得茎叶图很适合被用作一个参照工具，如公共交通安排。如果你有两组数据，你可以使两组数据背靠背排布，并使叶向两边生长，这样可以同时对比两组数据。

茎叶图的缺点是，在画布大小一定的情况下，数据量太少，则毫无意义。若数据太多，又回杂乱不堪。

英文名：Stemplot, Stem , Leaf Display

## 茎叶图的构成

<img src="https://zos.alipayobjects.com/rmsportal/nHDUsyqkkEmXFGTGEARe.png" class="constitute-img"/>

<table class="struct-table">
  <tr>
    <th>图表类型</th>
    <th>纵向柱状图</th>
  </tr>
  <tr>
    <td>适合的数据</td>
    <td>一个分类数据字段</td>
  </tr>
  <tr>
    <td>功能</td>
    <td>
    <code>对比</code>分类数据的数值大小
    </br>
    展示数据<code>分布</code>
    </td>
  </tr>
  <tr>
    <td>数据与图形的映射</td>
    <td>
    分类数据字段映射到横轴的位置。</br>
    Y运用层叠的布局
    </td>
  </tr>
  <tr>
    <td>适合的数据条数</td>
    <td>超过 80 条数据，小于 300 条（根据实际画布大小有所调整）</td>
  </tr>
</table>

## 茎叶图的应用场景

### 适合的场景

例子1: **展示一组数据分布** 下图是将一组数据按照最大位进行茎叶分布的效果。

数据：2,8,12,13,17,19,22,24,29,31,31,31,35,36,39,</br>41,41,41,41,42,42,42,43,43,49,49,49,49,49,49,53,53,53,53,63,63,63,65,66,69,71,71,72,75,76,77

<div id="c1"></div>

<div class="code unvisiable-hide">

      function statStemLeafData(data, num) {
        data.sort(function(a, b){
          return a.v-b.v;
        });
        Util.each(data, function(object){
          str = object.v.toString();
          stem = str.substr(0, str.length - num);
          object.stem = stem ? stem : '0';
          object.leaf = str.substr(str.length - num, str.length);
        });
        return data;
      }
      var Frame = G2.Frame;
      var Util = G2.Util;
      var Stat = G2.Stat;
      var data = [
        {v: 2},
        {v: 8},
        {v: 12},
        {v: 13},
        {v: 17},
        {v: 19},
        {v: 22},
        {v: 24},
        {v: 29},
        {v: 31},
        {v: 31},
        {v: 31},
        {v: 36},
        {v: 35},
        {v: 39},
        {v: 41},
        {v: 49},
        {v: 41},
        {v: 49},
        {v: 41},
        {v: 49},
        {v: 41},
        {v: 49},
        {v: 41},
        {v: 49},
        {v: 42},
        {v: 42},
        {v: 42},
        {v: 43},
        {v: 43},
        {v: 49},
        {v: 53},
        {v: 53},
        {v: 53},
        {v: 53},
        {v: 63},
        {v: 63},
        {v: 63},
        {v: 66},
        {v: 65},
        {v: 69},
        {v: 71},
        {v: 71},
        {v: 72},
        {v: 76},
        {v: 75},
        {v: 77},
      ];
      var chart;
      data = statStemLeafData(data, 1);
      chart = new G2.Chart({
        id : 'c1',
        forceFit: true,
        height : 400
      });
      chart.source(data);
      chart.axis('leaf', false);
      chart.axis('stem', {
        titleOffset: 50,
        grid: null
      });
      chart.pointStack()
        .position('stem')
        .size(8)
        .label('leaf', {
          offset: 0
        })
        .tooltip('v')
        .style({
          stroke: null,
          fill: null
        });
      chart.render();
</div>

### 不适合的场景

例子1: ** 数据量太少 **

数据：2,8,12,13,17,22,24,29,31,41,49,53,63,71,77

<div id="c2"></div>

<div class="code unvisiable-hide">

      function statStemLeafData(data, num) {
        data.sort(function(a, b){
          return a.v-b.v;
        });
        Util.each(data, function(object){
          str = object.v.toString();
          stem = str.substr(0, str.length - num);
          object.stem = stem ? stem : '0';
          object.leaf = str.substr(str.length - num, str.length);
        });
        return data;
      }
      var Frame = G2.Frame;
      var Util = G2.Util;
      var Stat = G2.Stat;
      var data = [
        {v: 2},
        {v: 8},
        {v: 12},
        {v: 13},
        {v: 17},
        {v: 22},
        {v: 24},
        {v: 31},
        {v: 41},
        {v: 49},
        {v: 53},
        {v: 63},
        {v: 71},
        {v: 77},
      ];
      var chart;
      data = statStemLeafData(data, 1);
      chart = new G2.Chart({
        id : 'c2',
        forceFit: true,
        height : 200
      });
      chart.source(data);
      chart.axis('leaf', false);
      chart.axis('stem', {
        titleOffset: 50,
        grid: null
      });
      chart.pointStack()
        .position('stem')
        .size(8)
        .label('leaf', {
          offset: 0
        })
        .tooltip('v')
        .style({
          stroke: null,
          fill: null
        });
      chart.render();
</div>

例子2: ** 数据量太大 **

<div id="c3"></div>

<div class="code unvisiable-hide">

      function statStemLeafData(data, num) {
        data.sort(function(a, b){
          return a.v-b.v;
        });
        Util.each(data, function(object){
          str = object.v.toString();
          stem = str.substr(0, str.length - num);
          object.stem = stem ? stem : '0';
          object.leaf = str.substr(str.length - num, str.length);
        });
        return data;
      }
      var Frame = G2.Frame;
      var Util = G2.Util;
      var Stat = G2.Stat;
      var data = [];
      for(var i = 0; i < 200; i++){
        var random = ~~(Math.random() * 99) + 1; 
        data.push({v:random});
      }
      
      var chart;
      data = statStemLeafData(data, 1);
      chart = new G2.Chart({
        id : 'c3',
        forceFit: true,
        height : 400
      });
      chart.source(data);
      chart.axis('leaf', false);
      chart.axis('stem', {
        titleOffset: 50,
        grid: null
      });
      chart.pointStack()
        .position('stem')
        .size(8)
        .label('leaf', {
          offset: 0
        })
        .tooltip('v')
        .style({
          stroke: null,
          fill: null
        });
      chart.render();
</div>
