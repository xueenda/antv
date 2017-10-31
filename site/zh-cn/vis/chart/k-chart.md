<!--
title: K 线图
tags:
  - time
  - compare
  - trend
-->

# K 线图

<img src="https://os.alipayobjects.com/rmsportal/UCqFUhWcZgDJsDH.png" />

## K 线图的简介

K 线图，原名蜡烛图，又称阴阳图、棒线、红黑线或蜡烛线，常用于展示股票交易数据。K 线就是指将各种股票每日、每周、每月的开盘价、收盘价、最高价、最低价等涨跌变化状况，用图形的方式表现出来。

<div style="width:920px;height:230px;padding-left: 300px;margin-top:18px;position:relative;line-height: 22px;">
  <img style="position:absolute;top: 0;left:0;" src="https://t.alipayobjects.com/images/T1FtFkXXXlXXXXXXXX.png" />
  <p>K 线如左图所示:</p>
  <p>1. 最上方的一条细线称为上影线，中间的一条粗线为实体，下面的一条细线为下影线。</p>
  <p>2. 当收盘价高于开盘价，也就是股价走势呈上升趋势时，我们称这种情况下的 K 线为阳线，中部的实体以空白或红色表示。反之称为阴线用黑色实体或绿色表示。</p>
  <p>3. 上影线的长度表示最高价和收盘价之间的价差，实体的长短代表收盘价与开盘价之间的价差，下影线的长度则代表开盘价和最低价之间的差距。</p>
</div>

<div style="clear: both;"></div>


英文名：K Chart, Candlestick Chart

## K 线图的构成

<img class="constitute-img" src="https://t.alipayobjects.com/images/T1cLlkXklXXXXXXXXX.png" width="400px" />

<table class="struct-table">
  <tr>
    <th>图表类型</th>
    <th>K 线图</th>
  </tr>
  <tr>
    <td>适合的数据</td>
    <td>一个时间数据字段，五个连续字段</td>
  </tr>
  <tr>
    <td>功能</td>
    <td>
      观察数据的变化<code>趋势</code></br>
      <code>对比</code>分类数值大小
    </td>
  </tr>
  <tr>
    <td>数据与图形的映射</td>
    <td>
      一个连续字段映射到横轴数值（通常是日期）</br>另外四个连续字段映射到纵轴</br>一个分类字段映射到颜色
    </td>
  </tr>
  <tr>
    <td>适合的数据条数</td>
    <td>暂无限制</td>
  </tr>
</table>

<div style="clear: both;"></div>

## K 线图的应用场景

### 适合场景

K 线图主要用于金融领域里展示股票，期货等交易数据，按照时间维度分为日 K 线、周 K 线、月 K 线。展示的数据需要满足 K 线构成的四要素：即开盘价、收盘价、最高价、最低价。

例子1：下图结合区域选择插件，展示了“湖南天雁”股票 2015 年 1 月 1 日至 2015 年 11 月 20 日的日 K 线图。

<div id="c2" style="position:relative;"></div>

<style>
  #range {
    margin: 5px 80px;
  }
  .crossLine{
    border-left: 1px solid #999;
    position: absolute;
    display: none;
    top: 20px;
  }
</style>

TODO: waiting for plugins
