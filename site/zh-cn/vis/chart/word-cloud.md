<--
title: 词云
tags:
  - compare
-->

# 词云

<img src="https://zos.alipayobjects.com/rmsportal/scJARUoLVJsLKvp.png" />

## 词云的简介

词云，又称文字云，是文本数据的视觉表示，由词汇组成类似云的彩色图形，用于展示大量文本数据。通常用于描述网站上的关键字元数据（标签），或可视化自由格式文本。 每个词的重要性以字体大小或颜色显示。 词云的作用：

* 快速感知最突出的文字
* 快速定位按字母顺序排列的文字中相对突出的部分

词云的本质是点图，是在相应坐标点绘制具有特定样式的文字的结果

英文名：Word Cloud

## 词云的构成

<table class="struct-table">
  <tr>
    <th width="30%">图表类型</th>
    <th>词云</th>
  </tr>
  <tr>
    <td>适合的数据</td>
    <td>两个代表坐标的连续数据字段（自动计算）、一个代表文字内容的分类数据字段、多个代表文字样式的分类数据字段如颜色、大小、旋转角度等（可选）</td>
  </tr>
  <tr>
    <td>功能</td>
    <td>对比文字的重要程度</td>
  </tr>
  <tr>
    <td>数据与图形的映射</td>
    <td>两个连续数据字段映射到横轴和纵轴的位置、代表文字内容的分类数据字段映射到文字图形、多个代表文字样式的分类数据字段分别映射到文字图形的样式</td>
  </tr>
  <tr>
    <td>适合的数据条数</td>
    <td>超过 30 条数据</td>
  </tr>
</table>

<div style="clear: both;"></div>


## 词云的应用场景

### 适合的场景

例子1: ** 对比大量文本 ** 下图是根据某段时间内使用 G2 类库的网站对 G2 类库的请求量数据绘制的词云，从图中可以一眼看出访问量最大的网站。

|site |pv
|------|----|
|localhost|27,50|
|g2.alipay.com|2339|
|...|...|

<div id="c1"></div>
<script src="https://a.alipayobjects.com/g/datavis/g-cloud/1.0.2/index.js"></script>

<script type="text/javascript">
	function getText(words){
	  // 将网址处理成用'.'分隔开的第一个字符串
	  var index = words.site.indexOf('.');
	  var text = words.site;
	  if(index > 0 && index < words.site.length){
	    text = words.site.substr(0,index);
	    // 当字符串是'www'时获取下一个
	    if(text === 'www'){
	      text = words.site.substr(index + 1);
	      index = text.indexOf('.');
	      text = text.substr(0,index);
	    }
	    // 当字符串是数字时获取整个网址
	    if(/^[0-9]*$/g.test(text)) {
	      var text = words.site;
	    }
	  }
	  return text;
	}

</script>
<div class="code hide">
var Util = G2.Util;
var Shape = G2.Shape;

function getTextAttrs(cfg) {
  var textAttrs = Util.mix(true, {}, {
    fillOpacity: cfg.opacity,
    fontSize: cfg.size,
    rotate: cfg.origin._origin.rotate,
    text: cfg.origin._origin.text,
    textAlign: 'center',
    fill: cfg.color,
    textBaseline:'Alphabetic'
  }, cfg.style);
  return textAttrs;
}

// 给point注册一个词云的shape
Shape.registShape('point', 'cloud', {
  drawShape: function(cfg, container) {
    cfg.points = this.parsePoints(cfg.points);
    var attrs = getTextAttrs(cfg);
    // 给容器添加text类型的shape
    // 坐标仍然是原来的坐标
    // 文字样式为通过getTextAttrs方法获取的样式
    var shape = container.addShape('text', {
      attrs: Util.mix(attrs, {
        x: cfg.points[0].x,
        y: cfg.points[0].y
      })
    });
    return shape;
  }
});


$.getJSON('/static/data/g2pv.json', function(data) {
  data.sort(function(a,b){
    return b.pv-a.pv;
  });
  // 获取数据的最大值和最小值
  var max = data[0].pv;
  var min = data[data.length-1].pv;
  // 构造一个词云布局对象
  var layout = new Cloud({
    // 传入数据源
    words: data,
    // 设定宽高（默认为500*500）
    width : 700,
    height : 600,
    // 设定文字大小配置函数(默认为12-40px的随机大小)
    size: function(words){
      // 将pv映射到canvas可绘制的size范围14-100(canvas默认最小文字为12px)
      return ((words.pv - min)/(max - min)) * (100 - 14) + 14;
    },
    // 设定文字内容
    text: getText
  });
  // 执行词云布局函数，并在回调函数中调用G2对结果进行绘制
  layout.exec(function(texts){
    var chart = new G2.Chart({
      id : 'c1',
      // canvas的宽高需要和布局宽高一致
      width : 920,
      height : 600,
      plotCfg : {
        margin : [0, 110, 0, 110]
      }
    });
    chart.legend(false);
    chart.source(texts);
    chart.axis(false);
    chart.tooltip({
      title:false
    });
    // 将词云坐标系调整为G2的坐标系
    chart.coord().reflect();
    // 绘制点图，在x*y的坐标点绘制自定义的词云shape，颜色根据text字段进行映射，大小根据size字段的真实值进行映射，文字样式配置为词云布局返回的样式，tooltip显示site*pv两个字段的内容
    chart.point().position('x*y').color('text').size('size',function(size){
      return size;
      }).shape('cloud').style({
        fontStyle: texts[0].style,
        fontFamily: texts[0].font,
        fontWeight: texts[0].weight
      }).tooltip('site*pv');
    chart.render();
  });
});

</div>

说明：
 * 文本的坐标由词云布局工具自动计算
 * 文本颜色和旋转角度由词云布局工具随机生成
 * site 字段通过文字处理后映射到文本形状
 * pv 映射到文本大小。

例子2: ** 使用图片做边界限制 **  结合图片可以绘制出特定形状的词云

<div id="c2"></div>

<div class="code hide">
$.getJSON('/static/data/g2pv.json', function(data) {
  data.sort(function(a,b){
    return b.pv-a.pv;
  });
  // 获取数据的最大值和最小值
  var max = data[0].pv;
  var min = data[data.length-1].pv;
  // 构造一个词云布局对象
  var layout = new Cloud({
    // 传入数据源
    words: data,

    // 设定文字大小配置函数(默认为12-40px的随机大小)
    size: function(words){
      // 将pv映射到canvas可绘制的size范围14-100(canvas默认最小文字为12px)
      return ((words.pv - min)/(max - min)) * (60 - 12) + 12;
    },
    // 设定文字内容
    text: getText
  });
  var imageURL = 'https://zos.alipayobjects.com/rmsportal/EEFqYWuloqIHRnh.jpg';
  // 引入图片
  layout.image(imageURL,function(imageCloud){
    // 执行词云布局函数，并在回调函数中调用G2对结果进行绘制
    imageCloud.exec(function(texts){
      var chart = new G2.Chart({
        id : 'c2',
        // 当配置了边距时，canvas的宽高等于布局宽高加上边距
        width : 920,
        height : 500,
        plotCfg : {
          margin : [0, 210, 0, 210]
        }
      });
      chart.legend(false);
      chart.source(texts);
      chart.axis(false);
      chart.tooltip({
        title:false
      });
      // 将词云坐标系调整为G2的坐标系
      chart.coord().reflect();
      // 绘制点图，在x*y的坐标点绘制自定义的词云shape，颜色根据text字段进行映射，大小根据size字段的真实值进行映射，文字样式配置为词云布局返回的样式，tooltip显示site*pv两个字段的内容
      chart.point().position('x*y').color('text').size('size',function(size){
        return size;
        }).shape('cloud').style({
          fontStyle: texts[0].style,
          fontFamily: texts[0].font,
          fontWeight: texts[0].weight
        }).tooltip('site*pv');
      chart.render();
    });
  });
});
</div>


### 不适合的场景

例子1：**数据区分度不大** 当数据的区分度不大时使用词云起不到突出的效果

<div id="c3"></div>

<div class="code hide">
$.getJSON('/static/data/g2pv.json', function(data) {
  data.sort(function(a,b){
    return b.pv-a.pv;
  });
  // 获取数据的最大值和最小值
  var max = data[0].pv;
  var min = data[data.length-1].pv;
  // 构造一个词云布局对象
  var layout = new Cloud({
    // 传入数据源
    words: data,
    // 设定宽高（默认为500*500）
    width : 600,
    height : 600,
    // 设定文字大小配置函数(默认为12-40px的随机大小)
    size: function(words){
      // 将pv映射到canvas可绘制的size范围14-100(canvas默认最小文字为12px)
      return 14;
    },
    // 设定文字内容
    text: getText
  });
  // 执行词云布局函数，并在回调函数中调用G2对结果进行绘制
  layout.exec(function(texts){
    var chart = new G2.Chart({
      id : 'c3',
      // canvas的宽高需要和布局宽高一致
      width : 920,
      height : 600,
      plotCfg : {
        margin : [0, 160, 0, 160]
      }
    });
    chart.legend(false);
    chart.source(texts);
    chart.axis(false);
    chart.tooltip({
      title:false
    });
    // 将词云坐标系调整为G2的坐标系
    chart.coord().reflect();
    // 绘制点图，在x*y的坐标点绘制自定义的词云shape，颜色根据text字段进行映射，大小根据size字段的真实值进行映射，文字样式配置为词云布局返回的样式，tooltip显示site*pv两个字段的内容
    chart.point().position('x*y').color('text').size('size',function(size){
      return size;
      }).shape('cloud').style({
        fontStyle: texts[0].style,
        fontFamily: texts[0].font,
        fontWeight: texts[0].weight
      }).tooltip('site*pv');
    chart.render();
  });
});
</div>

例子2: ** 数据太少 ** 数据太少时很难布局出好看的词云，推荐使用[柱状图](bar.html)

<div id="c4"></div>
<div id="c5"></div>


<div class="code hide">
$.getJSON('/static/data/g2pv.json', function(data) {
  data.sort(function(a,b){
    return b.pv-a.pv;
  });
  data = data.slice(0,20);
  // 获取数据的最大值和最小值
  var max = data[0].pv;
  var min = data[data.length-1].pv;
  // 构造一个词云布局对象
  var layout = new Cloud({
    // 传入数据源
    words: data,
    // 设定宽高（默认为500*500）
    width : 700,
    height : 400,
    // 设定文字大小配置函数(默认为12-40px的随机大小)
    size: function(words){
      // 将pv映射到canvas可绘制的size范围14-100(canvas默认最小文字为12px)
      return ((words.pv - min)/(max - min)) * (100 - 14) + 14;
    },
    // 设定文字内容
    text: getText
  });
  // 执行词云布局函数，并在回调函数中调用G2对结果进行绘制
  layout.exec(function(texts){
    var chart = new G2.Chart({
      id : 'c4',
      // canvas的宽高需要和布局宽高一致
      width : 920,
      height : 400,
      plotCfg : {
        margin : [0, 110, 0, 110]
      }
    });
    chart.legend(false);
    chart.source(texts);
    chart.axis(false);
    chart.tooltip({
      title:false
    });
    // 将词云坐标系调整为G2的坐标系
    chart.coord().reflect();
    // 绘制点图，在x*y的坐标点绘制自定义的词云shape，颜色根据text字段进行映射，大小根据size字段的真实值进行映射，文字样式配置为词云布局返回的样式，tooltip显示site*pv两个字段的内容
    chart.point().position('x*y').color('text').size('size',function(size){
      return size;
      }).shape('cloud').style({
        fontStyle: texts[0].style,
        fontFamily: texts[0].font,
        fontWeight: texts[0].weight
      }).tooltip('site*pv');
    chart.render();
  });
	var chart2 = new G2.Chart({
    id : 'c5',
    forceFit: true,
    height : 500,
    plotCfg : {
      margin : [0,30,80,120]
    }
  });
  data.reverse();
  data.map(function(word){
  	var text = getText(word);
  	word.text = text;
  });
	chart2.coord('rect').transpose('y');
  chart2.source(data);
  chart2.tooltip({
    title:false
  });
  chart2.axis('text',{
	  title: null
	});
  chart2.interval().position('text*pv').tooltip('site*pv');
  chart2.render();

});

</div>

## 词云与其他图表的对比

### 词云和[柱状图](bar.html)

* 词云适合大量数据，柱状图适合少量数据
* 词云展示文字更为直观，柱状图需要借助坐标轴和刻度表示文字的分类和数据
* 词云可以映射更多分类字段在在文字样式上，柱状图只能映射一个分类字段在颜色上


