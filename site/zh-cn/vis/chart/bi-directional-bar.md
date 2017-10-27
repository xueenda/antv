<!--
title: 双向柱状图
tags:
  - compare
variations:
  - bar
  - multi-set-bar
  - stacked-bar
  - radial-bar
-->

# 双向柱状图

<img src="https://zos.alipayobjects.com/rmsportal/CyErnoithFpAiLIqgfac.png" />

## 双向柱状图的简介

双向柱状图（又名正负条形图），使用正向和反向的柱子显示类别之间的数值比较。其中分类轴表示需要对比的分类维度，连续轴代表相应的数值，分为两种情况，一种是正向刻度值与反向刻度值完全对称，另一种是正向刻度值与反向刻度值反向对称，即互为相反数。

英文名：Bi-directional bar,Bi-directional column

## 双向柱状图的构成

<img src="https://zos.alipayobjects.com/rmsportal/okyGTjEPEOZSnopSapHQ.png" class="constitute-img"/>

<table class="struct-table">
  <tr>
    <th>图表类型</th>
    <th>双向柱状图</th>
  </tr>
  <tr>
    <td>适合的数据</td>
    <td>列表：一个分类数据字段、两个连续数据字段</td>
  </tr>
  <tr>
    <td>功能</td>
    <td>对比分类数据的数值大小</td>
  </tr>
  <tr>
    <td>数据与图形的映射</td>
    <td>分类数据字段映射到分类轴的位置<br>一个连续数据字段映射到正向矩形的长度、另一个连续数据字段映射到反向矩形的长度 <br>、正反向数据可以设置颜色或形状(shape)增强区分度、分类数据可以设置颜色增强分类的区分度</td>
  </tr>
  <tr>
    <td>适合的数据条数</td>
    <td>横向不超过 30 条数据、纵向不超过 12 条数据</td>
  </tr>
</table>

<div style="clear: both;"></div>

## 双向柱状图的应用场景

### 适合的场景

例子1: ** 正反分类数据对比 **
下图是模拟某个公司各个部门对某项任务的完成情况数据的对比图，完成人数使用正向柱状图表示、未完成人数使用反向柱状图表示。

|部门 |小组| 完成人数 | 未完成人数|
|------|------|------|------|
|部门0|组名0|37 | 9|
|...|...|...|...|

<div id="c1"></div>

<div class="code hide">

   var data = [
    {"部门":"部门0","小组":"组名0","完成人数":37,"未完成人数":9},
    {"部门":"部门0","小组":"组名2","完成人数":29,"未完成人数":10},
    {"部门":"部门0","小组":"组名8","完成人数":59,"未完成人数":14},
    {"部门":"部门0","小组":"组名9","完成人数":60,"未完成人数":8},
    {"部门":"部门0","小组":"组名10","完成人数":83,"未完成人数":14},
    {"部门":"部门0","小组":"组名12","完成人数":67,"未完成人数":21},
    {"部门":"部门0","小组":"组名14","完成人数":46,"未完成人数":18},
    {"部门":"部门0","小组":"组名17","完成人数":19,"未完成人数":27},
    {"部门":"部门0","小组":"组名19","完成人数":74,"未完成人数":17},
    {"部门":"部门1","小组":"组名15","完成人数":34,"未完成人数":19},
    {"部门":"部门1","小组":"组名20","完成人数":71,"未完成人数":25},
    {"部门":"部门1","小组":"组名26","完成人数":28,"未完成人数":23},
    {"部门":"部门1","小组":"组名29","完成人数":90,"未完成人数":24},
    {"部门":"部门2","小组":"组名7","完成人数":50,"未完成人数":5},
    {"部门":"部门2","小组":"组名11","完成人数":86,"未完成人数":26},
    {"部门":"部门2","小组":"组名13","完成人数":63,"未完成人数":16},
    {"部门":"部门2","小组":"组名27","完成人数":76,"未完成人数":2},
    {"部门":"部门2","小组":"组名28","完成人数":13,"未完成人数":28},
    {"部门":"部门3","小组":"组名1","完成人数":33,"未完成人数":16},
    {"部门":"部门3","小组":"组名3","完成人数":14,"未完成人数":1},
    {"部门":"部门3","小组":"组名4","完成人数":43,"未完成人数":25},
    {"部门":"部门3","小组":"组名16","完成人数":45,"未完成人数":13},
    {"部门":"部门3","小组":"组名18","完成人数":50,"未完成人数":21},
    {"部门":"部门3","小组":"组名22","完成人数":43,"未完成人数":7},
    {"部门":"部门3","小组":"组名23","完成人数":38,"未完成人数":6},
    {"部门":"部门3","小组":"组名24","完成人数":33,"未完成人数":24},
    {"部门":"部门3","小组":"组名25","完成人数":13,"未完成人数":27},
    {"部门":"部门4","小组":"组名5","完成人数":98,"未完成人数":4},
    {"部门":"部门4","小组":"组名6","完成人数":88,"未完成人数":12},
    {"部门":"部门4","小组":"组名21","完成人数":52,"未完成人数":9},
  ];
  // 按照部门排序
  data.sort(function  (obj1,obj2) {
    return obj1['部门'] > obj2['部门'] ? 1 : -1;
  });
  data.forEach(function(obj){
    obj['未完成人数'] *= -1; // 将未完成人数转换成负数
  });
  var Frame = G2.Frame;
  var frame = new Frame(data);
  // 将'完成人数','未完成人数' 合并成一列，增加完成状态字段
  frame = Frame.combinColumns(frame,['完成人数','未完成人数'],'人数','完成状态');
  var chart = new G2.Chart({
    id: 'c1',
    forceFit: true,
    height : 500,
    plotCfg: {
      margin: [50, 100, 80,70]
    }
  });
  chart.source(frame);
  chart.coord().transpose();
  chart.legend('完成状态', {
    position: 'bottom'
  });
  chart.axis('小组',{title: null});
  chart.axis('人数',{
    formatter: function(value){
      value = parseInt(value);
      return Math.abs(value); // 将负数格式化成正数
    },
    title: null
  });
  chart.interval().position('小组*人数').color('部门').shape('完成状态',['rect','hollowRect']).style({
    lineWidth: 2
  });
  chart.render();
</div>

说明：
 * 使用了`颜色`用于区分不同的部门
 * 使用两`形状`（空心和实心）用于区分完成人数和未完成人数
 * 使用了`位置`用于区分不同小组

### 不适合的场景

双向柱状图不适合不含相反含义的数据

## 双向柱状图的扩展

例子1: ** 层叠双向柱状图 **
下图展示了不同类型的人群对某个问题的同意程度的统计数据，分为非常不同意、不同意、没意见、同意和非常同意五种程度，其中非常不同意和不同意作为反向柱状图，不同程度用不同颜色来表示。


|type |Strongly Agree| Agree | No Opinion|Disagree|Strongly Disagree|
|------|------|------|------|------|------|
|All Survey Responses|50.1|40.7 | 4.8|3.7|0.7|
|...|...|...|...|...|...|

<div id="c4"></div>

<div class="code hide">
var data = [{"group":"All Survey Responses","type":"All Survey Responses","total":565,"Strongly Agree":50.1,"Agree":40.7,"No Opinion":4.8,"Disagree":3.7,"Strongly Disagree":0.7},{"group":"Employment sector","type":"Academic(nonstudent)","total":253,"Strongly Agree":64.0,"Agree":30.8,"No Opinion":3.2,"Disagree":2.0,"Strongly Disagree":0.0},{"group":"Employment sector","type":"Business and industry","total":176,"Strongly Agree":40.6,"Agree":50.0,"No Opinion":2.8,"Disagree":6.3,"Strongly Disagree":0.0},{"group":"Employment sector","type":"Federal, state, and local government","total":71,"Strongly Agree":38.0,"Agree":47.9,"No Opinion":7.0,"Disagree":4.2,"Strongly Disagree":2.8},{"group":"Employment sector","type":"Private consultant/self-employed","total":28,"Strongly Agree":39.3,"Agree":53.6,"No Opinion":7.1,"Disagree":0.0,"Strongly Disagree":0.0},{"group":"Employment sector","type":"Other (Including retired, student, not employed, etc.)","total":34,"Strongly Agree":29.4,"Agree":44.1,"No Opinion":14.7,"Disagree":5.9,"Strongly Disagree":5.9},{"group":"Race","type":"White","total":400,"Strongly Agree":50.0,"Agree":41.8,"No Opinion":4.5,"Disagree":2.8,"Strongly Disagree":1.0},{"group":"Race","type":"Asian","total":122,"Strongly Agree":53.3,"Agree":40.2,"No Opinion":3.3,"Disagree":3.3,"Strongly Disagree":0.0},{"group":"Race","type":"Black or African American","total":10,"Strongly Agree":40.0,"Agree":30.0,"No Opinion":20.0,"Disagree":10.0,"Strongly Disagree":0.0},{"group":"Race","type":"Other","total":17,"Strongly Agree":47.1,"Agree":35.3,"No Opinion":5.9,"Disagree":11.8,"Strongly Disagree":0.7},{"group":"Education","type":"Associate's and Bachelor's","total":175,"Strongly Agree":37.1,"Agree":49.1,"No Opinion":5.7,"Disagree":6.9,"Strongly Disagree":1.1},{"group":"Education","type":"Master's and Above","total":388,"Strongly Agree":55.9,"Agree":36.9,"No Opinion":4.4,"Disagree":2.3,"Strongly Disagree":0.5},{"group":"Gender","type":"Male","total":356,"Strongly Agree":50.6,"Agree":41,"No Opinion":4.2,"Disagree":3.4,"Strongly Disagree":0.8},{"group":"Gender","type":"Female","total":200,"Strongly Agree":51.0,"Agree":39.0,"No Opinion":6.0,"Disagree":3.5,"Strongly Disagree":0.5}];

var Frame = G2.Frame;
var frame = new Frame(data);
var stronglyArr = frame.colArray('Strongly Disagree');
var disagreeArr = frame.colArray('Disagree');
for(var i = 0,l = stronglyArr.length; i < l; i++) {
  stronglyArr[i] = stronglyArr[i] * (-1);
  disagreeArr[i] = disagreeArr[i] * (-1);
}
frame.colReplace('Strongly Disagree', stronglyArr);
frame.colReplace('Disagree', disagreeArr);
frame = Frame.combinColumns(frame, ['Disagree', 'Strongly Disagree', 'No Opinion', 'Agree','Strongly Agree'], 'value', 'opinion', ['group', 'type']);

var colorMap = {
  "Strongly Agree": '#3561A7',
  "Agree": '#80B2D3',
  "No Opinion": '#D9F0F6',
  "Disagree": '#EC7743',
  "Strongly Disagree": '#CB2920',
}

var chart = new G2.Chart({
  id : 'c4',
  forceFit: true,
  height : 500,
  plotCfg: {
     margin: [60, 60, 60, 150]
  }
});

chart.source(frame, {
  value: {
    tickInterval: 10
  }
});
chart.axis('type',{
  title: null
});
chart.axis('value',{
  position: 'right',
  title: null,
  tickLine: null,
  formatter: function(val) {
    return val + '%';
  }
});
chart.legend({
  position: 'bottom'
});
chart.coord().transpose();
chart.intervalStack().position('type*value').color('opinion', function(opinion) {
  return colorMap[opinion];
});

chart.render();
</div>

例子2: ** 分组双向柱状图 **

下图展示了通过收入数据和支出数据绘制出包涵净利润的分组双向柱状图


|time |收入| 支出 | 
|------|------|------|
|周一|130|-54|
|...|...|...|

<div id="c5"></div>

<div class="code hide">
var data = [
  {"time": '周一',"收入": 130,"支出": -54},
  {"time": '周二',"收入": 322,"支出": -23},
  {"time": '周三',"收入": 220,"支出": -54},
  {"time": '周四',"收入": 236,"支出": -32},
  {"time": '周五',"收入": 210,"支出": -54},
  {"time": '周六',"收入": 246,"支出": -65},
  {"time": '周日',"收入": 228,"支出": -45}
];
data.map(function(obj){
  obj['利润'] = obj['收入'] + obj['支出'];
});

var Frame = G2.Frame;
var frame = new Frame(data);
frame = Frame.combinColumns(frame,['收入','支出','利润'],'金额','收支状态');
console.log(frame);
var chart = new G2.Chart({
  id: 'c5',
  width : 1000,
  height : 500,
  plotCfg: {
    margin: [50, 100, 80]
  }
});
chart.source(frame);
chart.coord().transpose();
chart.legend('收支状态', {
  position: 'bottom'
});
chart.axis('time',{title: null});
chart.axis('金额',{
  formatter: function(value){
    value = parseInt(value);
    return Math.abs(value); // 将负数格式化成正数
  },
  title: null
});
chart.intervalDodge().position('time*金额').color('收支状态').shape('收支状态',['rect','hollowRect']).style({
  lineWidth: 2
});
chart.render();
</div>

## 双向柱状图与其他图表的对比

### 双向柱状图和[柱状图](bar.html)

* 柱状图只能绘制在同一个坐标轴内，每个柱子只能表示一个数据
* 双向柱状图包含正向和反向两个坐标轴，每个柱子可以表示一个正向数据和一个反向数据

