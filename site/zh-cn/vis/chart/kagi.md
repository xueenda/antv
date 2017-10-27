<!--
title: 卡吉图
tags:
  - time
  - trend
variations:
  - line
-->

# 卡吉图

<img src="https://zos.alipayobjects.com/rmsportal/GYxDnAkxCMrLfpB.png" />

## 卡吉图的简介

卡吉图大约发明于 19 世纪 70 年代日本股票市场开始交易的时候。在美国，史蒂文·尼森出版《烛形图之外》后，卡吉图分析法随之流行。由于能够清晰、有效的显示价格走势的路径，卡吉图是投资者用于对股票做出更好决策的图表之一。 

卡吉图是一系列由短水平线连接的垂直线，水平线起连接作用，垂直线的厚度和方向取决于价格运动。垂直线方向向上代表价格上升，方向向下代表价格下降，当价格运动方向反转超过阈值时绘制一条新的垂直线，在转折处用水平线相连。当价格上升超过前一个高点转折时采用粗线绘制，称为阳线，当价格下降低于前一个低点转折时采用细线绘制，称为阴线。

 * 卡吉图模拟了证券的供给与需求力量的关系，非常适用于股票短线操作
 * 卡吉图通过阈值标记逆转，交易者可以过滤掉日常价格波动，只关注价格的显著变化。

卡吉图独立于时间。

** 注意：卡吉图绘制的折线是经过卡吉图算法计算之后的，与原数据曲线有区别 **

英文名：Kagi Graph

## 卡吉图的构成

<img class="constitute-img" src="https://zos.alipayobjects.com/rmsportal/dIkzWxciUcEiiFn.jpg" width="400px" />

<table class="struct-table">
  <tr>
    <th>图表类型</th>
    <th>卡吉图</th>
  </tr>
  <tr>
    <td>适合的数据</td>
    <td>一个分类数据字段，一个连续字段</td>
  </tr>
  <tr>
    <td>功能</td>
    <td>观察数据变化<code>趋势</code></td>
  </tr>
  <tr>
    <td>数据与图形的映射</td>
    <td>转折点的（时间）分类（自动计算）映射到横轴，转折点的值映射到纵轴
    </td>
  </tr>
  <tr>
    <td>适合的数据条数</td>
    <td>大于 10 条</td>
  </tr>
</table>

<div style="clear:both;"></div>

## 卡吉图的应用场景

### 适合的场景

例子1：**展示价格或股票变化走势。** 例如在股票市场上，将股票(或指数)的逐日收市价使用卡吉图来表示，用来展示股市大致上的趋势。下图展示了 ACME 这只股票在 2015 年 9 月份的每日的价格走势。[数据来源：AnyChart](http://www.anychart.com/)

<div id="c1"></div>

<div class="code hide">
  var data= [
    {"day": '2015/9/1',  "share": 10},
    {"day": '2015/9/2',  "share": 12},
    {"day": '2015/9/3',  "share": 11},
    {"day": '2015/9/4',  "share": 15},
    {"day": '2015/9/5',  "share": 20},
    {"day": '2015/9/6',  "share": 22},
    {"day": '2015/9/7',  "share": 21},
    {"day": '2015/9/8',  "share": 25},
    {"day": '2015/9/9',  "share": 31},
    {"day": '2015/9/10', "share": 32},
    {"day": '2015/9/11', "share": 28},
    {"day": '2015/9/12', "share": 29},
    {"day": '2015/9/13', "share": 40},
    {"day": '2015/9/14', "share": 41},
    {"day": '2015/9/15', "share": 45},
    {"day": '2015/9/16', "share": 50},
    {"day": '2015/9/17', "share": 65},
    {"day": '2015/9/18', "share": 45},
    {"day": '2015/9/19', "share": 50},
    {"day": '2015/9/20', "share": 51},
    {"day": '2015/9/21', "share": 65},
    {"day": '2015/9/22', "share": 60},
    {"day": '2015/9/23', "share": 62},
    {"day": '2015/9/24', "share": 65},
    {"day": '2015/9/25', "share": 45},
    {"day": '2015/9/26', "share": 55},
    {"day": '2015/9/27', "share": 59},
    {"day": '2015/9/28', "share": 52},
    {"day": '2015/9/29', "share": 53},
    {"day": '2015/9/30', "share": 40}
  ];

  var chart = new G2.Chart({
    id: 'c1',
    forceFit: true,
    height: 350,
    plotCfg: {
      margin: [20, 85,80,80]
    }
  });
  chart.source(getKagiData(data,'day','share'));
  chart.col('day', {
    type: 'cat',
    nice: false,
    mask: 'yyyy/m/d',
    alias: 'Year/Month/Day'
  });
  chart.col('share', {
    alias: 'The Share Price',
    formatter: function(val) {
      return '$' + val;
    }
  });
  chart.tooltip({
    crosshairs: true
  });
  chart.path().position('day*share').color('type').size('type',2,4);
  chart.render();
</div>

### 不适合的场景

例子1:** 对时间敏感的数据 ** 卡吉图与时间无关，只表示数据上升下降的走势，无法体现数据再时间上的一些特性，例如周期等。特别时当数据对时间敏感时不推荐用卡吉图
下图使用卡吉图绘制了 G2 官网（ https://g2.alipay. ）2016 年 5 月 13 日至 2016 年 10 月 28 日的日浏览次数，从图中可以看出两次访问量较高的转折线，但无法确定其具体时间点，也无法看出数据的周期性，周期性数据推荐使用[螺旋图](spiral.html)

<div id="c2"></div>

<div class="code hide">
$.getJSON('./data/g2.json',function(data){
  data.pop();
  data.reverse();
  var chart = new G2.Chart({
    id: 'c2',
    forceFit: true,
    height: 400,
    plotCfg: {
      margin: [20, 85,80,80]
    }
  });
  chart.source(getKagiData(data,'时段','浏览次数'),{
    '时段':{
      type:'cat',
      mask: 'yyyy.mm.dd',
      tickCount: 8
    }
  });

  chart.path().position('时段*浏览次数').color('type').size('type',2,4);
  chart.render();
});
</div>

** 多组数据 **

卡吉图的横坐标具有特殊性，无法在同一个横轴上绘制多组卡吉图

## 卡吉图与其他图表的对比

### 卡吉图和[k线图](k-chart.html)
 * 卡吉图独立于时间，仅用于表现数据的走势
 * k线图与时间相关，用于表现一段时间内的数据涨跌变化情况

### 卡吉图与[折线图](line.html)
 * 卡吉图是将原数据经过一系列算法计算后得到的数据走势路径，横、纵坐标也不再是原数据对应的值
 * 卡吉图的颜色和粗细代表了特定的含义
 * 折线图严格按照原数据的横坐标和纵坐标绘制，可以绘制多组数据

<script type="text/javascript">
/**
 * 获取卡吉图数据点
 * @param  {Array} points 原始数据点
 * @return {Array} data 卡吉图数据点
 **/
function getKagiData(points,x,y){
  // 初始最小值
  var min = points[0][y];
  // 初始最大值
  var max = points[0][y];
  // 初始绘制起点
  var start = points[0];
  // 阳线和阴线判断标志
  var isPos = points[1][y] >= points[0][y] ? true : false;
  // 初始绘制方向，1为向上，－1为向下
  var direction = isPos ? 1 : -1;
  // 阈值，默认为最大值的6%
  var maxValue = getMax(points,y);
  var threshold= maxValue * 0.06;
  // 阴线数组
  var negPath = [];
  // 阳线数组
  var posPath = [];

  var tmp1 = {};
  tmp1[x] = start[x];
  tmp1[y] = start[y];
  pushPoint(tmp1,isPos,posPath,negPath,x,y);

  if(points.length>1){
    for (var i = 0; i <= points.length - 1; i++) {
      // 浮动超过阈值时执行算法
      if(Math.abs(start[y]-points[i][y])>threshold){
        if(direction>0){
          if(points[i][y] >= start[y]){
            isPos = getVerticalPoints(start,points[i],max,direction,negPath,posPath,isPos,x,y);
            start[y] = points[i][y];
          }else{
            var tmp2 = {};
            tmp2[x] = points[i][x];
            tmp2[y] = start[y];
            pushPoint(tmp2,isPos,posPath,negPath,x,y)
            start[x] = points[i][x];
            direction = -1; // 转向
            isPos = getVerticalPoints(start,points[i],min,direction,negPath,posPath,isPos,x,y);
            max = start[y] // 更新当前最高点
            start = points[i]; // 更新当前绘制起点
          }
        }else{
          if(points[i][y] < start[y]){
            isPos = getVerticalPoints(start,points[i],min,direction,negPath,posPath,isPos,x,y);
            start[y] = points[i][y];
          }else{
            var tmp3 = {};
            tmp3[x] = points[i][x];
            tmp3[y] = start[y];
            pushPoint(tmp3,isPos,posPath,negPath,x,y)
            start[x] = points[i][x];
            direction = 1;
            isPos = getVerticalPoints(start,points[i],max,direction,negPath,posPath,isPos,x,y);
            min = start[y] // 更新当前最低点
            start = points[i]
          }
        }
      }
    }
  }
  return posPath.concat(negPath);
}
/**
 * 获取卡吉图垂直线数据点
 * @param  {Array} start 起点坐标
 * @param  {Array} end 终点坐标
 * @param  {Number} changePoint 转折点y坐标
 * @param  {Number} direction 绘制方向
 * @param  {Array} negPath 阴线数组
 * @param  {Array} posPath 阳线数组
 * @param  {Boolean} isPos 是否阳线标志位
 * @return  {Boolean} isPos 是否阳线标志位
 **/
function getVerticalPoints(start,end,changePoint,direction,negPath,posPath,isPos,x,y){
  // 阳线和阴线相互转换的判断条件
  var condition = direction > 0 ? (end[y] > changePoint) && (start[y] < changePoint) && !isPos: (end[y] < changePoint) && (start[y] > changePoint) && isPos;

  var tmp1 = {};
  tmp1[x] = start[x];
  tmp1[y] = changePoint;
  var tmp2 = {};
  tmp2[x] = start[x];
  tmp2[y] = end[y];

  if(condition){
    pushPoint(tmp1,isPos,posPath,negPath,x,y,true);
    isPos = isPos?false:true;
    pushPoint(tmp2,isPos,posPath,negPath,x,y)
  }else{
    pushPoint(tmp2,isPos,posPath,negPath,x,y)
  }
  return isPos;
}
/**
 * 将卡吉图数据分别放入阳线数组和阴线数组
 * @param  {Object} point 当前数据点
 * @param  {Boolean} isPos 是否阳线标志位
 * @param  {Array} negPath 阴线数组
 * @param  {Array} posPath 阳线数组
 * @return  {Boolean} isChangePoint 是否转折点
 **/
function pushPoint(point,isPos,posPath,negPath,x,y,isChangePoint=false){
  var tmpPoint  = {};
  tmpPoint[x] = point[x];
  tmpPoint[y] = isChangePoint?point[y]:null; // 转折点阳线和阴线都有数据，非转折点阳线或阴线的数据点为空
  if(isPos){
    point.type = 'pos';
    posPath.push(point);
    tmpPoint.type = 'neg';
    negPath.push(tmpPoint);
  }else{
    point.type = 'neg';
    negPath.push(point);
    tmpPoint.type = 'pos';
    posPath.push(tmpPoint);
  }
}

function getMax(points,y){
  var max = points[points.length-1][y];
  if(points.length > 0){
    for(var i = points.length - 1;i >= 0;i--){
      max = points[i][y]>max?points[i][y]:max;
    }
  }
  return max;
}
</script>
