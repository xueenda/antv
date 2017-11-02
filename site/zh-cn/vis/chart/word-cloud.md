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

例子1: **对比大量文本** 下图是根据某段时间内使用 G2 类库的网站对 G2 类库的请求量数据绘制的词云，从图中可以一眼看出访问量最大的网站。

|site |pv
|------|----|
|localhost|27,50|
|g2.alipay.com|2339|
|...|...|

<div id="c1"></div>

```js-
window.getTextAttrs = function getTextAttrs(cfg) {
  return _.assign({}, {
    fillOpacity: cfg.opacity,
    fontSize: cfg.origin._origin.size,
    rotate: cfg.origin._origin.rotate,
    text: cfg.origin._origin.text,
    textAlign: 'center',
    fontFamily: cfg.origin._origin.font,
    fill: cfg.color,
    textBaseline: 'Alphabetic'
  }, cfg.style);
}
// 给point注册一个词云的shape
G2.Shape.registerShape('point', 'cloud', {
  drawShape(cfg, container) {
    const attrs = getTextAttrs(cfg);
    return container.addShape('text', {
      attrs: _.assign(attrs, {
        x: cfg.x,
        y: cfg.y
      })
    });
  }
});
window.getText = function getText(d) {
  const site = d.site;
  let index = site.indexOf('.');
  let text = site;
  if (index > 0 && index < site.length) {
    text = site.substr(0, index);
    // 当字符串是'www'时获取下一个
    if (text === 'www') {
      text = site.substr(index + 1);
      index = text.indexOf('.');
      text = text.substr(0, index);
    }
    // 当字符串是数字时获取整个网址
    if (/^[0-9]*$/g.test(text)) {
      text = site;
    }
  }
  return text;
}
```

```js-
$.getJSON('/assets/data/g2pv.json', data => {
  const chart = new G2.Chart({
    id: 'c1',
    forctFit: true,
    height: 500,
    padding: 0,
  });
  console.log(chart, chart.get('width'), chart.get('height'));
  const dv = new DataSet.View().source(data);
  dv.transform({
    type: 'tag-cloud',
    fields: [ 'site', 'pv' ],
    font: 'Impact',
    size: [ chart.get('width'), chart.get('height') ],
    padding: 0,
    text: getText,
    fontSize(d) {
      const max = dv.max('pv');
      const min = dv.min('pv');
      return ((d.pv - min) / (max - min)) * (80 - 14) + 14;
    }
  });
  chart.source(dv);
  chart.legend(false);
  chart.axis(false);
  chart.tooltip({
    showTitle: false
  });
  chart.coord().reflect();
  chart.point()
    .position('x*y')
    .color('text')
    .size('size', function(size) {
      return size;
    })
    .shape('cloud');
  chart.render();
});
```

说明：
 * 文本的坐标由词云布局工具自动计算
 * 文本颜色和旋转角度由词云布局工具随机生成
 * site 字段通过文字处理后映射到文本形状
 * pv 映射到文本大小。

例子2: **使用图片做边界限制**  结合图片可以绘制出特定形状的词云

<div id="c2"></div>

```js-
const imageMask = new Image();
imageMask.crossOrigin = '';
imageMask.src = 'https://zos.alipayobjects.com/rmsportal/EEFqYWuloqIHRnh.jpg';
imageMask.onload = () => {
  $.getJSON('/assets/data/g2pv.json', data => {
    const chart = new G2.Chart({
      container: 'c2',
      forctFit: true,
      height: 500,
    });
    const dv = new DataSet.View().source(data);
    dv.transform({
      type: 'tag-cloud',
      fields: [ 'site', 'pv' ],
      font: 'Impact',
      size: [ chart.get('width'), chart.get('height') ],
      padding: 0,
      text: getText,
      fontSize(d) {
        const max = dv.max('pv');
        const min = dv.min('pv');
        return ((d.pv - min) / (max - min)) * (80 - 14) + 14;
      }
    });
    chart.source(dv);
    chart.legend(false);
    chart.axis(false);
    chart.tooltip({
      title: false
    });
    chart.coord().reflect();
    chart.point()
      .position('x*y')
      .color('text')
      .size('size', size => size)
      .shape('cloud');
    chart.tooltip('site*pv');
    chart.render();
  });
};
```

### 不适合的场景

例子1：**数据区分度不大** 当数据的区分度不大时使用词云起不到突出的效果

<div id="c3"></div>

```js-
$.getJSON('/assets/data/g2pv.json', function(data) {
  const chart = new G2.Chart({
    container: 'c3',
    forctFit: true,
    height: 500,
    padding: 0,
  });
  const dv = new DataSet.View().source(data);
  dv.transform({
    type: 'tag-cloud',
    fields: [ 'site', 'pv' ],
    font: 'Impact',
    size: [ chart.get('width'), chart.get('height') ],
    padding: 0,
    text: getText,
    fontSize(d) {
      const max = dv.max('pv');
      const min = dv.min('pv');
      return ((d.pv - min) / (max - min)) * (80 - 14) + 14;
    }
  });
  chart.source(dv);
  chart.legend(false);
  chart.axis(false);
  chart.tooltip({
    showTitle: false
  });
  chart.coord().reflect();
  chart.point()
    .position('x*y')
    .color('text')
    .size('size', function(size) {
      return size;
    })
    .shape('cloud');
  chart.render();
});
```

例子2: **数据太少** 数据太少时很难布局出好看的词云，推荐使用[柱状图](bar.html)

<div id="c4"></div>

```js-
$.getJSON('/assets/data/g2pv.json', function(data) {
  data.sort(function(a, b) {
    return b.pv - a.pv;
  });
  data = data.slice(0, 10);
  const chart = new G2.Chart({
    container: 'c4',
    forctFit: true,
    height: 500,
    padding: 0,
  });
  const dv = new DataSet.View().source(data);
  const max = dv.max('pv');
  const min = dv.min('pv');
  dv.transform({
    type: 'tag-cloud',
    fields: [ 'site', 'pv' ],
    font: 'Impact',
    size: [ chart.get('width'), chart.get('height') ],
    padding: 0,
    text: getText,
    fontSize(d) {
      return ((d.pv - min) / (max - min)) * (80 - 14) + 14;
    }
  });
  console.log(dv);
  chart.source(dv);
  chart.legend(false);
  chart.axis(false);
  chart.tooltip({
    showTitle: false
  });
  chart.coord().reflect();
  chart.point()
    .position('x*y')
    .color('text')
    .size('size', function(size) {
      return size;
    })
    .shape('cloud');
  chart.render();
});
```

## 词云与其他图表的对比

### 词云和[柱状图](bar.html)

* 词云适合大量数据，柱状图适合少量数据
* 词云展示文字更为直观，柱状图需要借助坐标轴和刻度表示文字的分类和数据
* 词云可以映射更多分类字段在在文字样式上，柱状图只能映射一个分类字段在颜色上
