<!--
title: 仪表盘
tags:
  - range
-->

# 仪表盘

<img src="https://t.alipayobjects.com/images/rmsweb/T184NiXaNcXXXXXXXX.png" />

## 仪表盘的简介

仪表盘(Gauge)是一种拟物化的图表，刻度表示度量，指针表示维度，指针角度表示数值。仪表盘图表就像汽车的速度表一样，有一个圆形的表盘及相应的刻度，有一个指针指向当前数值。目前很多的管理报表或报告上都是用这种图表，以直观的表现出某个指标的进度或实际情况。

仪表盘的好处在于它能跟人们的常识结合，使大家马上能理解看什么、怎么看。拟物化的方式使图标变得更友好更`人性化`，正确使用可以提升用户体验。

仪表盘的圆形结构，可以更有效的`利用空间`。

为了视觉上的不拥挤且符合常识，我们建议指针的数量不超过 **3** 根。

<div class="clearfix"></div>

## 仪表盘的构成

<table class="struct-table">
  <tr>
    <th>图表类型</th>
    <th>仪表盘</th>
  </tr>
  <tr>
    <td>适合的数据</td>
    <td>一个分类字段，一个连续字段</td>
  </tr>
  <tr>
    <td>功能</td>
    <td>
      <code>对比</code>分类字段对应的数值大小
    </td>
  </tr>
  <tr>
    <td>数据与图形的映射</td>
    <td>
      指针映射到分类字段，指针的角度映射连续字段
    </td>
  </tr>
  <tr>
    <td>适合的数据条数</td>
    <td>小于等于3</td>
  </tr>
</table>

<div id="c1"></div>

```js-
  const Shape = G2.Shape;
  // 自定义Shape 部分
  Shape.registerShape('point', 'pointer', {
    drawShape(cfg, group) {
      let point = cfg.points[0]; // 获取第一个标记点
      point = this.parsePoint(point);
      const center = this.parsePoint({ // 获取极坐标系下画布中心点
        x: 0,
        y: 0
      });
      // 绘制指针
      group.addShape('line', {
        attrs:  {
          x1: center.x,
          y1: center.y,
          x2: point.x,
          y2: point.y - 20,
          stroke: cfg.color,
          lineWidth: 5,
          lineCap: 'round'
        }
      });
      return group.addShape('circle', {
        attrs: {
          x: center.x,
          y: center.y,
          r: 12,
          stroke: cfg.color,
          lineWidth: 4.5,
          fill: '#fff'
        }
      });
    }
  });

  const data = [
    { value: 6 }
  ];
  const chart = new G2.Chart({
    container: 'c1',
    forceFit: true,
    height: window.innerHeight,
    padding: 0
  });
  chart.source(data);

  chart.coord('polar', {
    startAngle: -9 / 8 * Math.PI,
    endAngle: 1 / 8 * Math.PI,
    radius: 0.75
  });
  chart.scale('value', {
    min: 0,
    max: 9,
    nice: false,
    ticks: [ 2.25, 3.75, 5.25, 6.75 ]
  });

  chart.axis('1', false);
  chart.axis('value', {
    zIndex: 2,
    line: null,
    label: {
      offset: -20,
      formatter: val => {
        if (val === '2.25') {
          return '差';
        } else if (val === '3.75') {
          return '中';
        } else if (val === '5.25') {
          return '良';
        }

        return '优';
      },
      textStyle: {
        fontSize: 24,
        fill: 'rgba(0, 0, 0, 0.65)',
        textAlign: 'center'
      }
    },
    tickLine: null,
    grid: null
  });
  chart.legend(false);
  chart.point({
    generatePoints: true
  }).position('value*1')
    .shape('pointer')
    .color('#1890FF')
    .active(false);

  // 绘制仪表盘刻度线
  chart.guide().line({
    start: [ 3, 0.92 ],
    end: [ 3.0035, 0.85 ],
    lineStyle: {
      stroke: '#19AFFA', // 线的颜色
      lineDash: null, // 虚线的设置
      lineWidth: 3
    }
  });
  chart.guide().line({
    start: [ 4.5, 0.92 ],
    end: [ 4.5, 0.85 ],
    lineStyle: {
      stroke: '#19AFFA', // 线的颜色
      lineDash: null, // 虚线的设置
      lineWidth: 3
    }
  });

  chart.guide().line({
    start: [ 6, 0.92 ],
    end: [ 6.0035, 0.85 ],
    lineStyle: {
      stroke: '#19AFFA', // 线的颜色
      lineDash: null, // 虚线的设置
      lineWidth: 3
    }
  });

  // 绘制仪表盘背景
  chart.guide().arc({
    zIndex: 0,
    top: false,
    start: [ 0, 0.965 ],
    end: [ 9, 0.965 ],
    style: { // 底灰色
      stroke: '#000',
      lineWidth: 18,
      opacity: 0.09
    }
  });
  // 绘制指标
  chart.guide().arc({
    zIndex: 1,
    start: [ 0, 0.965 ],
    end: [ data[0].value, 0.965 ],
    style: {
      stroke: '#1890FF',
      lineWidth: 20,
    }
  });
  // 绘制指标数字
  chart.guide().html({
    position: [ '50%', '95%' ],
    html: '<div style="width: 300px;text-align: center;font-size: 12px!important;">'
     + '<p style="font-size: 1.75em; color: rgba(0,0,0,0.43);margin: 0;">合格率</p>'
     + '<p style="font-size: 3em;color: rgba(0,0,0,0.85);margin: 0;">' + data[0].value * 10  + '%</p>'
     + '</div>'
  });

  chart.render();
```

<div class="clearfix"></div>

## 仪表盘的应用场景

### 适合仪表盘的场景

#### 时钟&表
* 图表说明：与普通仪表盘相比，该种图表坐标轴的首尾相连
* 场景说明：钟表
* 数据说明：有3维度，分类数据表示秒针、分针、时针，时间数值数据映射指针角度，长度数值数据映射表针大小

时针|分针|秒针
----|------|----
0～24|0～60|0～60


#### 投资收益率
* 场景说明：下图是蚂蚁金服某金融产品的投资收益率
* 数据说明：有1维度，收益率数值数据映射指针角度

