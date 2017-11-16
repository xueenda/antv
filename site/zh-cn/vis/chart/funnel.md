<!--
title: 漏斗图
tags:
  - compare
  - flow
-->

# 漏斗图

<img src="https://t.alipayobjects.com/images/rmsweb/T1kMJiXaJiXXXXXXXX.png" />

## 漏斗图的简介

漏斗图适用于业务流程**比较规范**、**周期长**、**环节多**的**单**流程单向分析，通过漏斗各环节业务数据的比较能够直观地发现和说明问题所在的环节，进而做出决策。漏斗图用梯形面积表示某个环节业务量与上一个环节之间的差异。漏斗图**从上到下**，有逻辑上的顺序关系，表现了随着业务流程的推进业务目标完成的情况。

漏斗图总是开始于一个100%的数量，结束于一个较小的数量。在开始和结束之间由N个流程环节组成。每个环节用一个梯形来表示，梯形的上底宽度表示当前环节的输入情况，梯形的下底宽度表示当前环节的输出情况，上底与下底之间的差值形象的表现了在当前环节业务量的减小量，当前梯形边的斜率表现了当前环节的减小率。
通过给不同的环节标以不同的颜色，可以帮助用户更好的区分各个环节之间的差异。漏斗图的所有环节的流量都应该使用同一个度量。

英文名：Funnel Chart

## 漏斗图的构成

<img src="https://os.alipayobjects.com/rmsportal/eArJFAYwiiFeJpk.png" width="400px" class="constitute-img"/>

<table class="struct-table">
  <tr>
    <th>图表类型</th>
    <th>漏斗图</th>
  </tr>
  <tr>
    <td>适合的数据</td>
    <td>一个分类数据字段、一个连续数据字段</td>
  </tr>
  <tr>
    <td>功能</td>
    <td><code>对比</code>分类数据的数值大小</td>
  </tr>
  <tr>
    <td>数据与图形的映射</td>
    <td>
      分类数据字段映射到颜色
      <br>
      连续数据字段映射到梯形的面积
    </td>
  </tr>
  <tr>
    <td>适合的数据条数</td>
    <td>不超过12条数据</td>
  </tr>
</table>

<div style="clear: both;"></div>

## 漏斗图的应用场景

### 适合的场景

例子：**适用于流程流量分析**。

随着流程的推进，每个环节所要达成的成功数量在减少。最终的成交量是企业想要达成的交易数量。通过将各个流程中数量的信息画入漏斗图可以清晰的分析到哪个环节是当前业务流程中的薄弱环节，哪个环节是流量转化的瓶颈，进而帮助人们更加专注于薄弱环节提高整个流程的产出。

<div id="c3"></div>

```js-
  var data = [
    {step: '浏览网站', value: 1.0},
    {step: '放入购物车', value: 0.5},
    {step: '生成订单', value: 0.3},
    {step: '支付订单', value: 0.2},
    {step: '完成交易', value: 0.1}
  ];

  var chart = new G2.Chart({
    id: 'c3',
    forceFit: true,
    height : 580,
    padding: [50,100,80,50]
  });

  chart.source(data);
  chart.axis(false);
  chart.scale('value',{alias: '转换率',formatter: function (value) {
    return value * 100 + '%';
  }});
  chart.scale('step',{alias: '交易环节'});
  chart.coord('rect').transpose().scale(1,-1);

  chart.intervalSymmetric().position('step*value').color('step').shape('funnel').label('step',{textStyle: {textAlign: 'start'},offset: 5});
  chart.render();
```

从上图中我们发现，浏览环节中的业务量呈现了明显的缩减的趋势，转化率较低。所以决策者应该将更多的资源与精力投入到浏览这个环节的工作中，进而提高整个流程的效率。

### 不适合的场景

漏斗图不适合表示无逻辑顺序的分类对比，如果要表示无逻辑顺序的分类对比情况，请使用[柱状图](bar.html)。漏斗图也不适合表示占比情况，如果要表示占比情况，请使用[饼图](pie.html)。

例子：**某游戏销量对比**。

下图是一个游戏销量的图表，展示不同游戏类型的销量对比，用柱状图合适，用漏斗图不合适。


<div style="clear:both;"></div>

<div id="c4" style="position:relative;">
  <div class="wrong tip">错误</div>
</div>

<div id="c4_1" style="position:relative;">
  <div class="right tip">正确</div>
</div>

```js-
  var data = [
    {genre:'Sports',sold:27500},
    {genre:'Strategy',sold:11500},
    {genre:'Action',sold:6000},
    {genre:'Shooter',sold:3500},
    {genre:'Other',sold:1500},
  ];

  var chart = new G2.Chart({
    id : 'c4',
    forceFit: true,
    height: 400
  });

  chart.source(data);
  chart.axis(false);
  chart.coord('rect').transpose().scale(1,-1);
  chart.intervalSymmetric().position('genre*sold').color('genre').shape('funnel');
  chart.render();

  var chart = new G2.Chart({
    id: 'c4_1',
    forceFit: true,
    height: 400
  });

  chart.source(data);
  chart.interval().position('genre*sold').color('genre');
  chart.render();
```

## 漏斗图的扩展

### 扩展图表一：金字塔图

含义与用法与漏斗图基本类似，唯一区别是头部变尖。如果有定制化需求可利用该拓展。

<div id="c5"></div>

```js-
  var data = [
    {step: '浏览网站',value: 1.0},
    {step: '放入购物车', value: 0.5},
    {step: '生成订单',value: 0.3},
    {step: '支付订单',value: 0.2},
    {step: '完成交易',value: 0.1}
  ];

  var Stat = G2.Stat;

  var chart = new G2.Chart({
    container: 'c5',
    forceFit: true,
    height: 400
  });

  chart.source(data);
  chart.axis(false);
  chart.scale('value',{alias: '转换率',formatter: function (value) {
    return value * 100 + '%';
  }});
  chart.scale('step',{alias: '交易环节'});
  chart.coord('rect').transpose().scale(1,-1);

  chart.intervalSymmetric().position('step*value').color('step').shape('pyramid');
  chart.render();
```

### 扩展图表二：对比漏斗图

对比漏斗图比基本漏斗图除了传达了流程的含义外，还传达了预期和实际情况的对比的含义，如下图：

<div id="c6"></div>

```js-
 var expectData = [
    {value: 100, name: '展现'},
    {value: 80, name: '点击'},
    {value: 60, name: '访问'},
    {value: 40, name: '咨询'},
    {value: 20, name: '订单'}
  ];
  var actualData = [
    {value: 80, name: '展现'},
    {value: 50, name: '点击'},
    {value: 30, name: '访问'},
    {value: 10, name: '咨询'},
    {value: 5, name: '订单'}
  ];
  var Stat = G2.Stat;
  var chart = new G2.Chart({
    container: 'c6',
    forceFit: true,
    height: 400
  });
  
  var actualView = chart.view();
  actualView.source(actualData, {
    name: {
      formatter: function(val) {
        return '实际' + val;
      }
    }
  });
  actualView.coord('rect').transpose().scale(1,-1);
  actualView.axis(false);
  actualView.intervalSymmetric()
    .position('name*value')
    .color('name')
    .shape('pyramid')
    .style({
      lineWidth: 2,
      stroke: '#fff'
    });

  var expectView = chart.view();
  expectView.source(expectData, {
    name: {
      formatter: function(val) {
        return '预期' + val;
      }
    }
  });
  expectView.coord('rect').transpose().scale(1,-1);
  expectView.axis(false);
  expectView.tooltip({
    showTitle: false
  });
  expectView.intervalSymmetric()
    .position('name*value')
    .color('name')
    .shape('pyramid')
    .label('name')
    .opacity(0.65);
  chart.legend(false);
  chart.render();
```

### 扩展图表三：对称漏斗图

对称漏斗图可以同时对两个业务流程进行分析，同时可以对这两个业务流程之间进行对比，如下图：

<div id="c7"></div>

```js-
  var data = [
    {action:'访问',visitor:500,site: '站点1'},
    {action:'浏览',visitor:400,site: '站点1'},
    {action:'交互',visitor:300,site: '站点1'},
    {action:'下单',visitor:200,site: '站点1'},
    {action:'访问',visitor:550,site: '站点2'},
    {action:'浏览',visitor:420,site: '站点2'},
    {action:'交互',visitor:280,site: '站点2'},
    {action:'下单',visitor:150,site: '站点2'}
  ];
  data.sort(function(obj1, obj2){ // 从小到大
    return obj1.visitor - obj2.visitor;
  });
  function formatter(text, item){
    var point = item.point;
    return point.action + text;
  }
  var chart = new G2.Chart({
    container: 'c7',
    forceFit: true,
    height: 500,
  });
  chart.axis(false);
  chart.source(data);
  chart.facet('mirror', {
    fields: [ 'site' ],
    transpose: true,
    padding: 0,
    eachView: function(view) {
      view.interval()
        .position('action*visitor')
        .color('action')
        .label('visitor', {
          renderer: formatter
        })
        .shape('funnel')
        .style({
          lineWidth: 1,
          stroke: '#fff'
        });
    }
  });
  chart.render();
```
