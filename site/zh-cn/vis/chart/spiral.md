<!--
title: 螺旋图
tags:
  - compare
  - time
-->

# 螺旋图

<img src="https://zos.alipayobjects.com/rmsportal/TpVCbyphCQAQPSV.png" />

## 螺旋图的简介

螺旋图，基于阿基米德螺旋坐标系，常用于绘制随时间变化的数据，从螺旋的中心开始向外绘制。

螺旋图有两大好处：
* 绘制大量数据：螺旋图节省空间，可用于显示大时间段数据的变化趋势；
* 绘制周期性数据：螺旋图每一圈的刻度差相同，当每一圈的刻度差是数据周期的倍数时，能够直观的表达数据的周期性。

英文名：Spiral Chart

## 螺旋图的构成

<img class="constitute-img" src="https://zos.alipayobjects.com/rmsportal/qyGdUeuTzufNebS.jpg" width="400px" />

<table class="struct-table">
  <tr>
    <th>图表类型</th>
    <th>螺旋图</th>
  </tr>
  <tr>
    <td>适合的数据</td>
    <td>一个时间数据字段，一个连续字段</td>
  </tr>
  <tr>
    <td>功能</td>
    <td>观察数据<code>周期</code>和变化<code>趋势</code></td>
  </tr>
  <tr>
    <td>数据与图形的映射</td>
    <td>时间数据字段映射到旋转角度θ轴，连续字段映射到线圈间距radius轴
    </td>
  </tr>
  <tr>
    <td>适合的数据条数</td>
    <td>100条以上</td>
  </tr>
</table>

<div style="clear:both;"></div>

## 螺旋图的应用场景

### 适合的场景

例子1：**展示大量数据的变化趋势**。 例如在股票市场上，将股票的逐日收市价使用螺旋图来表示，用来展示股市大致上的趋势。下图展示了“湖南天雁”股票 2015 年 1 月 1 日至 2015 年 11 月 20 日的螺旋图。为了让变化趋势更加明显，可以采用不同的颜色来加深辨识度。

<div id="c1"></div>

```js-
$.getJSON('/assets/data/candle-sticks.json',function(data){
  var chart = new G2.Chart({
    container: 'c1',
    forceFit: true,
    height: 400,
  });
  chart.source(data,{
    'time':{
      type:'timeCat',
      mask: 'yyyy.mm.dd'
    }
  });
  chart.coord('helix',{
    startAngle: 1*Math.PI,
    endAngle: 13*Math.PI
  });
  chart.interval().position('time*end').color('end').size(0.65);
  chart.render();
});
```

例子2：**展示数据的周期。** 例如将网站的访问量使用螺旋图来表示，用来展示大量访问该网站的周期。下图展示了G2官网（ https://g2.alipay. ）2016 年 5 月 13 日至 2016 年 10 月 28 日的日浏览次数。G2从5月18发布至今，持续运行了24周，图中以28天为一圈，共画了6圈，每圈含四周数据。从图中可以看出，一圈内有明显的四个周期，经分析发现，访问G2网址的流量主要来自工作日的5天，可见，G2浏览次数的周期为一周。另外，在5月18号之后的两周内流量较多，即G2发布时的推广效果。

<div id="c2"></div>

```js-
$.getJSON('/assets/data/g2.json',function(data){
  var chart = new G2.Chart({
    container: 'c2',
    forceFit: true,
    height: 400,
  });
  chart.source(data,{
    '时段':{
      type:'time',
      mask: 'yyyy.mm.dd'
    },
    '浏览次数':{
    	type: 'log',
    	base: 2
    }
  });
  chart.coord('helix',{
    startAngle: 1*Math.PI,
    endAngle: 13*Math.PI
  });
  chart.interval().position('时段*浏览次数').color('浏览次数','#ffffff-#36B3C3').size(0.8);
  chart.render();
});
```

## 螺旋图的扩展

### 螺旋色块图
通过自定义shape把柱状图的每个数据填满当前区域并调整柱状图的宽度，可以绘制出螺旋色块图

<div id="c3"></div>

```js-
$.getJSON('/assets/data/g2.json',function(data){
	var Shape = G2.Shape;
	function getRectPath(points) {
      const path = [];
      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        if (point) {
          const action = i === 0 ? 'M' : 'L';
          path.push([ action, point.x, point.y ]);
        }
      }
      const first = points[0];
      path.push([ 'L', first.x, first.y ]);
      path.push([ 'z' ]);
      return path;
    }
	function getFillAttrs(cfg) {
      const defaultAttrs = G2.Global.shape.interval;
      const attrs = G2.Util.mix({}, defaultAttrs, {
        fill: cfg.color,
        stroke: cfg.color,
        fillOpacity: cfg.opacity
      }, cfg.style);
      return attrs;
    }
	Shape.registerShape('interval', 'max', {
	  getPoints: function(cfg){
	    var x = cfg.x;
	    var y = cfg.y;
	    var y0 = cfg.y0;
	    var width = cfg.size;
	    return [
	      {x: x-width/2, y: y0},
	      {x: x-width/2, y: 1},
	      {x: x+width/2, y: 1},
	      {x: x+width/2, y: y0}
	    ]
	  },
	  draw(cfg, container) {
        var attrs = getFillAttrs(cfg);
        var path = getRectPath(cfg.points);
        path = this.parsePath(path);
        return container.addShape('path', {
          attrs: G2.Util.mix(attrs, {
            path
          })
        });
      },
	});
  var chart = new G2.Chart({
    container: 'c3',
    forceFit: true,
    height: 400,
  });
  chart.source(data,{
    '时段':{
      type:'time',
      mask: 'yyyy.mm.dd'
    },
    '浏览次数':{
    	type: 'log',
    	base: 2
    }
  });

  chart.coord('helix',{
    startAngle: 1*Math.PI,
    endAngle: 13*Math.PI
  });
  chart.interval().position('时段*浏览次数').color('浏览次数').size(0.88).shape('max');
  chart.render();
});
```

