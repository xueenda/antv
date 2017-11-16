<!--
title: 子弹图
tags:
  - compare
  - pattrens
variations:
  - bar
  - multi-set-bar
  - stacked-bar
  - radial-bar
-->

# 子弹图

<img src="https://zos.alipayobjects.com/rmsportal/XVYqTvtBBwzoSSHDDrQb.png" />

## 子弹图的简介

子弹图的样子很像子弹射出后带出的轨道，所以称为子弹图。子弹图的发明是为了取代仪表盘上常见的那种里程表，时速表等基于圆形的信息表达方式。子弹图的特点如下：
* 每一个单元的子弹图只能显示单一的数据信息源
* 通过添加合理的度量标尺可以显示更精确的阶段性数据信息
* 通过优化设计还能够用于表达多项同类数据的对比
* 可以表达一项数据与不同目标的校对结果

子弹图无修饰的线性表达方式使我们能够在狭小的空间中表达丰富的数据信息，线性的信息表达方式与我们习以为常的文字阅读相似，相对于圆形构图的信息表达，在信息传递上有更大的效能优势。

英文名：Bullet Graph

## 子弹图的构成

<img src="https://zos.alipayobjects.com/rmsportal/DkOloAVoymGGRJgmezOc.png" class="constitute-img"/>

<table class="struct-table">
  <tr>
    <th>图表类型</th>
    <th>子弹图</th>
  </tr>
  <tr>
    <td>适合的数据</td>
    <td>列表：一个分类数据字段、一个连续数据字段、一个范围数组字段、一个目标字段</td>
  </tr>
  <tr>
    <td>功能</td>
    <td>对比分类数据的数值大小、所处区间以及是否达标</td>
  </tr>
  <tr>
    <td>数据与图形的映射</td>
    <td>分类数据字段映射到分类轴位置<br>连续数据字段映射到数据条的长度<br>目标字段映射到测量标记的刻度轴位置 <br>范围数组映射到背景色条的大小</td>
  </tr>
  <tr>
    <td>适合的数据条数</td>
    <td>不超过10条数据</td>
  </tr>
</table>

<div style="clear: both;"></div>

## 子弹图的应用场景

### 适合的场景

例子1: **显示阶段性数据信息**

下图是一个模拟商铺一段时间内的经营情况的数据，一共 5 条数据，分别代表收入（单位：千美元）、利率（单位：％）、平均成交额（单位：美元）、新客户（单位：个）和满意度（1-5）五个方面，每个方面都有代表好、中、差的 3 个范围和预先设定的目标。

|title |ranges|actual|target|subtitle|
|------|----|----|----|----|
|Revenue|[150,225,300]|270|250|US$, in thousands
|...|...|...|...|...|

<div id="c1"></div>

```js-
    const data = [
        {"title":"Revenue","subtitle":"US$, in thousands","ranges":[150,225,300],"actual":270,"target":250},
        {"title":"Profit","subtitle":"%","ranges":[20,25,30],"actual":23,"target":26},
        {"title":"Order Size","subtitle":"US$, average","ranges":[350,500,600],"actual":100,"target":550},
        {"title":"New Customers","subtitle":"count","ranges":[1400,2000,2500],"actual":1650,"target":2100},
        {"title":"Satisfaction","subtitle":"out of 5","ranges":[3.5,4.25,5],"actual":3.2,"target":4.4}
    ];
    const chart = new G2.Chart({
        id: 'c1',
        forceFit: true,
        height: 500,
        padding: [100, 150]
    });
    chart.legend(false); // 不展示图例
    let y = 0;
    const yGap = 0.1;
    for(let i=0, l = data.length; i < l; i++) {
        const ranges = data[i].ranges;
        const view = chart.view({
            start: {
                x: 0,
                y: y
            },
            end: {
                x: 1,
                y: y + yGap
            }
        });
        view.source([data[i]], {
            actual: {
                min: 0,
                max: ranges[2],
                nice: false
            },
            target: {
                min: 0,
                max: ranges[2],
                nice: false
            }
        });
        view.coord().transpose();
        view.axis('target', false);
        view.axis('actual', {
            position: 'right'
        });
        view.point()
            .position('title*target')
            .color('#square')
            .shape('line')
            .size(12)
            .style({
                lineWidth: 2
            });
        view.interval()
            .position('title*actual')
            .color('#223273')
            .size(15);
        // 差
        view.guide().region({
            start: [-1, 0],
            end: [1, ranges[0]],
            style: {
                fill: '#FFA39E',
                fillOpacity: 0.85
            }
        });
        // 良
        view.guide().region({
            start: [-1, ranges[0]],
            end: [1, ranges[1]],
            style: {
                fill: '#FFD591',
                fillOpacity: 0.85
            }
        });
        // 优
        view.guide().region({
            start: [-1, ranges[1]],
            end: [1, ranges[2]],
            style: {
                fill: '#A7E8B4',
                fillOpacity: 0.85
            }
        });
        y += yGap + 0.125;
    }
    chart.legend({
        custom: 'true',
        clickable: false,
        items: [
            {
              value: '差',
              fill: '#FFA39E',
              marker: 'square'
            },
            {
              value: '良',
              fill: '#FFD591',
              marker: 'square'
            },
            {
              value: '优',
              fill: '#A7E8B4',
              marker: 'square'
            },
            {
              value: '实际值',
              fill: '#223273',
              marker: 'square'
            },
            {
              value: '目标值',
              fill: '#262626',
              marker: {
                symbol: 'line',
                stroke: '#262626',
                radius: 5
              }
            },
        ]
    });
    chart.render();
```

说明：
 * title 字段，用于区分不同的类型
 * ranges 字段，使用背景色条的`长度`，表示区间范围
 * actual 字段，使用数据条的`长度`，表示实际数值
 * target 字段，使用测量标记的刻度轴`位置`，表示目标值


## 子弹图的扩展

例子1: **反向子弹图**

表达负面（消极）数据时，可以将子弹图做方向上的反转。下图用反向子弹图表示开销的多少。

|title |ranges|actual|target|
|------|----|----|----|
|Revenue|[1000,2000,5000]|1700|1500|

<div id="c2"></div>

```js-
  var data = [
    {"title":"开销","ranges":[1000,2000,5000],"actual":1700,"target":1500}
  ];
  var chart = new G2.Chart({
    id: 'c2',
    forceFit: true,
    height: 120,
    padding: [ 40, 20, 40, 80]
  });
  chart.legend(false); // 不展示图例
  var y = 0;
  var yGap = 1;
  for(var i=0, l = data.length; i < l; i++) {
    var ranges = data[i].ranges;
    var view = chart.view({
      index: i,
      start: {
        x: 0,
        y: y
      },
      end: {
        x: 1, 
        y: y + yGap
      }
    });
    view.source([data[i]], {
      actual: {
        min: 0,
        max: ranges[2],
        nice: false
      },
      target: {
        min: 0,
        max: ranges[2],
        nice: false
      }
    });
    view.coord().transpose().reflect('x');
    view.axis('target', false);
    view.axis('actual', {
      position: 'right'
    });
    view.point().position('title*target').color('#5b0101').shape('line').size(12).style({
      lineWidth: 2
    });
    view.interval().position('title*actual').color('#5b0101').size(15);
    view.guide().region({
      start: [-1, 0],
      end: [1, ranges[0]],
      style: {
        fill: '#e96e33',
        fillOpacity: 0.5
      }
    });
    view.guide().region({
      start: [-1, ranges[0]],
      end: [1, ranges[1]],
      style: {
        fill: '#f9ca47',
        fillOpacity: 0.5
      }
    });
    view.guide().region({
      start: [-1, ranges[1]],
      end: [1, ranges[2]],
      style: {
        fill: '#88bb34',
        fillOpacity: 0.5
      }
    });
    y += yGap + 0.125;
  }
  chart.render();
```

例子2:**层叠子弹图**

表达一些阶段性的数据时，例如，我们定义了全年的定额目标，但是每个季度都会阶段性地显示当前完成的进度，此时就需要同时表达每个季度的数据和全年整体的定额目标数据。


|State |第一季度|第二季度|第三季度|第四季度|ranges|target|
|------|----|----|----|----|----|----|
|年度收益|3820|6080|2930|5390|[12000,15000,20000]|16000

<div id="c3"></div>

```js-
var data = [
    {"State":"年度收益","第一季度":3820,"第二季度":6080,"第三季度":2930,"第四季度":5390,"ranges":[12000,15000,20000],"target":16000}
  ];
var dv = new DataSet.View().source(data);
dv.transform({
  type: 'fold',
  fields: ["第一季度","第二季度","第三季度","第四季度"],
  key: '季度',
  value: '金额',
});
var chart = new G2.Chart({
    container: 'c3',
    forceFit: true,
    height: 120,
    padding: [ 40, 20, 40, 80]
  });

  var ranges = data[0].ranges;
  var view = chart.view({
      start: {
        x: 0,
        y: 0
      },
      end: {
        x: 1, 
        y: 1
      }
    });
  view.source(dv, {
    '金额': {
      min: 0,
      max: ranges[2],
      nice: false
    },
    target: {
      min: 0,
      max: ranges[2],
      nice: false
    }
  });

  view.axis('target', false);
  view.axis('金额', {
    position: 'right'
  });

  view.coord().transpose();

  view.guide().region({
    start: [-1, 0],
    end: [1, ranges[0]],
    style: {
      fill: '#e96e33',
      fillOpacity: 0.5
    }
  });
  view.guide().region({
    start: [-1, ranges[0]],
    end: [1, ranges[1]],
    style: {
      fill: '#f9ca47',
      fillOpacity: 0.5
    }
  });
  view.guide().region({
    start: [-1, ranges[1]],
    end: [1, ranges[2]],
    style: {
      fill: '#88bb34',
      fillOpacity: 0.5
    }
  });
  view.point().position('State*target').color('#5b0101').shape('line').size(10).style({
    lineWidth: 2
  });
  view.intervalStack().position('State*金额').color('季度').size(12);
  chart.render();
```


## 子弹图与其他图表的对比

### 子弹图和[柱状图](bar.html)

* 柱状图主要用于多个分类间的数据（大小、数值）的对比
* 子弹图主要用于各个分类间各自的数值所处状态与测量标记的对比，突出的是每个分类自身的情况，没有分类间的比较，用于展示各个分类的子弹图单元相对独立。

