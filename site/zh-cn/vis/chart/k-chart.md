<!--
title: K 线图
tags:
  - time
  - compare
  - trend
resource:
  jsFiles:
    - ${url.g2}
    - ${url.dataSet}
    - ${url.jquery}
    - http://unpkg.alipay.com/@antv/g2-plugin-slider@1.0.0-rc.1
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

例子1：下图结合区域选择插件，展示了“湖南天雁”股票 2015 年 1 月 5 日至 2015 年 11 月 19 日的日 K 线图。

<div id="c2"></div>
<div id="slider"></div>

```js-
$('<div id="slider"></div>').insertAfter('#mountNode');
  $.getJSON('/assets/data/candle-sticks.json',function(data) {
    // 设置状态量，时间格式建议转换为时间戳，转换为时间戳时请注意区间
    const ds = new DataSet({
      state: {
        start: '2015-04-07',
        end: '2015-07-28'
      }
    });
    const dv = ds.createView();
    dv.source(data)
      .transform({
        type: 'filter',
        callback: obj => {
          const date = obj.time;
          return date <= ds.state.end && date >= ds.state.start;
        }
      })
      .transform({
        type: 'map',
        callback: obj => {
          obj.trend = (obj.start <= obj.end) ? '上涨' : '下跌';
          obj.range = [ obj.start, obj.end, obj.max, obj.min ];
          return obj;
        }
      });
    const chart = new G2.Chart({
      container: 'c2',
      forceFit: true,
      height: 400,
      animate: false,
      padding: [ 20, 80, 40 ]
    });
    chart.source(dv, {
      'time': {
        type: 'timeCat',
        nice: false,
        range: [ 0, 1 ]
      },
      trend: {
        values: [ '上涨', '下跌' ]
      },
      'volumn': {alias: '成交量'},
      'start': {alias: '开盘价'},
      'end': {alias: '收盘价'},
      'max': {alias: '最高价'},
      'min': {alias: '最低价'},
      'range': {alias: '股票价格'}
      });
    chart.legend({
      offset: 30
    });
    chart.tooltip({
      showTitle: false,
      itemTpl: '<li data-index={index}>'
        + '<span style="background-color:{color};" class="g2-tooltip-marker"></span>'
        + '{name}{value}</li>',
    });

    const kView = chart.view({
      end: {
        x: 1,
        y: 0.65
      }
    });
    kView.source(dv);
    kView.schema()
      .position('time*range')
      .color('trend', val => {
        if (val === '上涨') {
          return '#f04864';
        }

        if (val === '下跌') {
          return '#2fc25b';
        }
      })
      .shape('candle')
      .tooltip('time*start*end*max*min', (time, start, end, max, min) => {
        return {
          name: time,
          value: '<br><span style="padding-left: 16px">开盘价：' + start + '</span><br/>'
            + '<span style="padding-left: 16px">收盘价：' + end + '</span><br/>'
            + '<span style="padding-left: 16px">最高价：' + max + '</span><br/>'
            + '<span style="padding-left: 16px">最低价：' + min + '</span>'
        };
      });

    const barView = chart.view({
      start: {
        x: 0,
        y: 0.8
      }
    });
    barView.source(dv, {
      volumn: {
        tickCount: 2
      }
    });
    barView.axis('time', {
      tickLine: null,
      label: null
    });
    barView.axis('volumn', {
      label: {
        formatter: function(val) {
          return parseInt(val / 1000, 10) + 'k';
        }
      }
    });
    barView.interval()
      .position('time*volumn')
      .color('trend',  val => {
        if (val === '上涨') {
          return '#f04864';
        }

        if (val === '下跌') {
          return '#2fc25b';
        }
      })
      .tooltip('time*volumn', (time, volumn) => {
        return {
          name: time,
          value: '<br/><span style="padding-left: 16px">成交量：' + volumn + '</span><br/>'
        };
      });

    chart.render();

    // 生成 slider
    const slider = new Slider({
      container: 'slider', // DOM id
      width: 'auto',
      height: 26,
      padding: [ 20, 80, 90 ],
      start: ds.state.start, // 和状态量对应
      end: ds.state.end,
      data, // 源数据
      xAxis: 'time', // 背景图的横轴对应字段，同时为数据筛选的字段
      yAxis: 'volumn', // 背景图的纵轴对应字段，同时为数据筛选的字段
      scales: {
        time: {
          type: 'timeCat',
          nice: false,
        }
      },
      onChange: ({startText, endText}) => {
        ds.setState('start', startText);
        ds.setState('end', endText);
      }
    });
    slider.render();
  });
```
