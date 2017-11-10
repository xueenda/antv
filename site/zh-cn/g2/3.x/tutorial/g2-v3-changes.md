<!--
index: 31
title: G2 3.0 升级指引
-->

# G2 3.0 升级指引

## 引入方式的改变

### cdn

```js
<script src="http://unpkg.alipay.com/@antv/g2"></script>
```

### npm

```js
npm install @antv/g2 --save
```

同时我们为 G2 2.x 和 G2 3.0 提供了共存机制，当两个版本同时存在时，请使用 `G2_3` 命名空间来使用 3.0.0 的版本。

## 图表结构变化

1. G2 3.0 的图表 **只由一层 canvas 组成**，不再是之前的三层画布；
2. tooltip 统一使用 html 进行渲染。

## 变更的接口

<div class="bi-table">
 <table>
   <colgroup><col width="90px"><col width="282px"><col width="338px"></colgroup>
   <tbody>
    <tr>
      <td><div data-type="p">接口描述</div></td>
      <td><div data-type="p">G2 3.0 版本</div></td>
      <td><div data-type="p">G2 2.x 版本</div></td>
    </tr>
    <tr>
      <td><div data-type="p">创建 chart 对象</div></td>
      <td>
<div class="highlight">
<pre data-syntax="javascript"><code class="language-javascript">new G2.Chart({
  container: &apos;c1&apos;,
  padding: 40,
  background: {
    stroke: &apos;#bfbfbf&apos;
  },
  plotBackground: {
    fill: &apos;rgba(0, 0, 0, 0.1)&apos;
  }
});</code></pre>
</div>
<div data-type="p"></div><blockquote><div data-type="p">说明：</div></blockquote>
<ol start="1" data-type="unordered-list">
<li data-type='list-item' data-list-type='unordered-list'><div data-type="p"><code>container</code> 替代原先的 <code>id</code> 和 <code>container</code>，及支持 string 也支持传入 dom 对象，为了兼容旧版，也支持直接使用 <code>id</code></div></li>
<li data-type='list-item' data-list-type='unordered-list'><div data-type="p">原先 <code>plotCfg</code> 属性废弃，原先的配置分别在 <code>padding，background，plotBackground</code> 中设置。</div></li>
</ol></td>
      <td>
<div class="highlight">
<pre data-syntax="javascript"><code class="language-javascript">new G2.Chart({
  id: &apos;c1&apos;,
  plotCfg: {
    margin: 40,
    border: {
      stroke: &apos;#bfbfbf&apos;
    },
    background: {
      fill: &apos;rgba(0, 0, 0, 0.1)&apos;
    }
  }
})</code></pre>
</div>
<div data-type="p"></div></td>
    </tr>
    <tr>
      <td><div data-type="p">创建 view</div></td>
      <td>
<div class="highlight">
<pre data-syntax="javascript"><code class="language-javascript">chart.createView()</code></pre>
</div>
</td>
      <td>
<div class="highlight">
<pre data-syntax="javascript"><code class="language-javascript">chart.view()</code></pre>
</div>
</td>
    </tr>
    <tr>
      <td><div data-type="p">加载数据</div></td>
      <td>
<div class="highlight">
<pre data-syntax="javascript"><code class="language-javascript">chart.source(data, scaleDefs)</code></pre>
</div>
<blockquote><div data-type="p">说明:</div></blockquote>
<div data-type="p">不再支持 <code>namesArr</code> 属性，如需要补全字段，请使用 DataView 的 transform</div></td>
      <td>
<div class="highlight">
<pre data-syntax="javascript"><code class="language-javascript">chart.source(data[, scaleDefs, namesArr])</code></pre>
</div>
</td>
    </tr>
    <tr>
      <td><div data-type="p">列定义</div></td>
      <td>
<div class="highlight">
<pre data-syntax="javascript"><code class="language-javascript">chart.scale({});
chart.scale(&apos;&apos;, {});</code></pre>
</div>
</td>
      <td>
<div class="highlight">
<pre data-syntax="javascript"><code class="language-javascript">chart.col(&apos;&apos;, {});
chart.cols({})</code></pre>
</div>
</td>
    </tr>
    <tr>
      <td><div data-type="p">坐标轴配置</div></td>
      <td><div data-type="p">接口使用方式不变，但是对可配置的属性结构以及部分属性名做了变化，详见 <a href="/zh-cn/g2/3.x/api/chart.html#_axis" target="_blank" class="bi-link">chart.axis() API</a>, 这里说明下变化较大的属性。</div>
<div class="highlight">
<pre data-syntax="javascript"><code class="language-javascript">chart.axis(&apos;x&apos;, {
  label: {
    textStyle: {
      fill: &apos;red&apos;
    },
    autoRotate: true,
    offset: 10,
    formatter: val =&gt; {}
  }
});</code></pre>
</div>
</td>
      <td>
<div class="highlight">
<pre data-syntax="javascript"><code class="language-javascript">chart.axis(&apos;x&apos;, {
  labelOffset: 10,
  labels: {
    label: {      
      fill: &apos;red&apos;
    },
    autoRotate: true
  },
  formatter: val =&gt; {}  
});</code></pre>
</div>
</td>
    </tr>
    <tr>
      <td><div data-type="p">图例配置</div></td>
      <td><div data-type="p">接口使用方式不变，但是对可配置的属性结构以及部分属性名做了变化，并且新添加了更多的功能，详见 <a href="/zh-cn/g2/3.x/api/chart.html#_legend" target="_blank" class="bi-link">chart.legend() API</a></div></td>
      <td><div data-type="p"></div></td>
    </tr>
    <tr>
      <td><div data-type="p">坐标系配置</div></td>
      <td><div data-type="p">G2 3.0 坐标系只支持 <code>rect,polar,helix,theta</code> 四种，原先的 <code>inner</code> 属性更名为 <code>innerRadius</code></div></td>
      <td><div data-type="p"></div></td>
    </tr>
    <tr>
      <td><div data-type="p">分面</div></td>
      <td>
<div class="highlight">
<pre data-syntax="javascript"><code class="language-javascript">chart.facet(&apos;list&apos;, {
  fields: [field], 
  eachView: function(view, facet) {
     view.point().position(&apos;x*y&apos;);
     // guide
     // to do something else
  }
});</code></pre>
</div>
<blockquote><div data-type="p">说明：</div></blockquote>
<div data-type="p">新增加了 matrix 分面，用于实现散点图矩阵。详见 <a href="/zh-cn/g2/3.x/api/chart.html#_facet" target="_blank" class="bi-link">chart.facet() API</a>。</div></td>
      <td>
<div class="highlight">
<pre data-syntax="javascript"><code class="language-javascript">chart.facet([field], {
  type: &apos;list&apos;
});
chart.point().position(&apos;x*y&apos;)</code></pre>
</div>
</td>
    </tr>
    <tr>
      <td><div data-type="p">tooltip 配置</div></td>
      <td><div data-type="p">G2 3.0 的 tooltip 使用 html 渲染。tooltip 配置的地方如下：</div><ol start="1" data-type="unordered-list">
<li data-type='list-item' data-list-type='unordered-list'><div data-type="p"><a href="/zh-cn/g2/3.x/api/chart.html#_tooltip" target="_blank" class="bi-link">chart.tooltip()</a></div></li>
<li data-type='list-item' data-list-type='unordered-list'><div data-type="p">view.tooltip(true | false)</div></li>
<li data-type='list-item' data-list-type='unordered-list'><div data-type="p"><a href="/zh-cn/g2/3.x/api/geom.html#_tooltip" target="_blank" class="bi-link">geom.tooltip()</a></div></li>
</ol></td>
      <td><div data-type="p"></div></td>
    </tr>
    <tr>
      <td><div data-type="p">Guide 创建</div></td>
      <td>
<div class="highlight">
<pre data-syntax="javascript"><code class="language-javascript">chart.guide().line({
  start: [startXValue, startYValue],
  end: [endXValue, endYValue],
  lineStyle: {
    stroke: &apos;#999&apos;,
    lineDash: [0, 2, 2],
    lineWidth: 3
  }
});</code></pre>
</div>
<div data-type="p"></div><blockquote><div data-type="p">说明：</div></blockquote>
<ol start="1" data-type="unordered-list">
<li data-type='list-item' data-list-type='unordered-list'><div data-type="p">原先的 chart.guide().rect() 更名为 chart.guide().region()</div></li>
<li data-type='list-item' data-list-type='unordered-list'><div data-type="p">移除 chart.guide().tag()</div></li>
<li data-type='list-item' data-list-type='unordered-list'><div data-type="p">chart.guide().line() 支持文本</div></li>
</ol><div data-type="p"></div><div data-type="p">详见 <a href="/zh-cn/g2/3.x/api/chart.html#_guide" target="_blank" class="bi-link"><code>chart.guide()</code> API</a></div></td>
      <td>
<div class="highlight">
<pre data-syntax="javascript"><code class="language-javascript">chart.guide().line([startXValue, startYValue], [endXValue, endYValue], {
  stroke: &apos;#999&apos;, // 线的颜色
  lineDash: [0, 2, 2], // 虚线的设置
  lineWidth: 3 // 线的宽度
});</code></pre>
</div>
</td>
    </tr>
    <tr>
      <td><div data-type="p">数据过滤</div></td>
      <td>
<div class="highlight">
<pre data-syntax="javascript"><code class="language-javascript">chart.filter(&apos;a&apos;, val =&gt; {});</code></pre>
</div>
<div data-type="p">详见 <a href="/zh-cn/g2/3.x/api/chart.html#_filter" target="_blank" class="bi-link">chart.filter() API</a></div></td>
      <td>
<div class="highlight">
<pre data-syntax="javascript"><code class="language-javascript">chart.filter(&apos;a&apos;, []);</code></pre>
</div>
</td>
    </tr>
    <tr>
      <td><div data-type="p">geom 创建</div></td>
      <td colspan="2"><ol start="1" data-type="unordered-list">
<li data-type='list-item' data-list-type='unordered-list'><div data-type="p"><code>chart.contour()</code> 废弃，使用 <code>chart.polygon()</code> 代替；</div></li>
<li data-type='list-item' data-list-type='unordered-list'><div data-type="p"><code>chart.interval([&apos;dodge&apos;, &apos;stack&apos;])</code> 不再支持，请按照以下方式声明：</div></li>
</ol>
<div class="highlight">
<pre data-syntax="javascript"><code class="language-javascript">chart.interval().adjust([&apos;dodge&apos;, &apos;stack&apos;])</code></pre>
</div>
<div data-type="p"></div></td>
    </tr>
    <tr>
      <td><div data-type="p">geom.position()</div></td>
      <td>
<div class="highlight">
<pre data-syntax="javascript"><code class="language-javascript">position(&apos;x*y&apos;)</code></pre>
</div>
<div data-type="p"></div><blockquote><div data-type="p">说明</div></blockquote>
<ol start="1" data-type="unordered-list">
<li data-type='list-item' data-list-type='unordered-list'><div data-type="p">不再支持加法运算符</div></li>
<li data-type='list-item' data-list-type='unordered-list'><div data-type="p">不再支持所有的统计函数嵌套方式</div></li>
</ol></td>
      <td>
<div class="highlight">
<pre data-syntax="javascript"><code class="language-javascript">position(&apos;x*y&apos;);
position(&apos;x*(a+b)&apos;);
positon(Stat.summary.percent(&apos;x*y&apos;))</code></pre>
</div>
</td>
    </tr>
    <tr>
      <td><div data-type="p">geom.size()</div></td>
      <td>
<div class="highlight">
<pre data-syntax="javascript"><code class="language-javascript">size(&apos;x&apos;, [min. max])</code></pre>
</div>
</td>
      <td>
<div class="highlight">
<pre data-syntax="javascript"><code class="language-javascript">size(&apos;x&apos;, max, min);</code></pre>
</div>
</td>
    </tr>
    <tr>
      <td><div data-type="p">geom.label()</div></td>
      <td>
<div class="highlight">
<pre data-syntax="javascript"><code class="language-javascript">.label(&apos;x&apos;, {
    offset: -16,
    label: {
      fontWeight: &apos;bold&apos;,
      fontSize: 12
    },
    formatter: () =&gt; {}
})</code></pre>
</div>
<div data-type="p"></div><div data-type="p">详见 <a href="/zh-cn/g2/3.x/api/geom.html#_label" target="_blank" class="bi-link">geom.label() API</a></div></td>
      <td>
<div class="highlight">
<pre data-syntax="javascript"><code class="language-javascript">.label(&apos;x&apos;, {
    offset: -16,
    textStyle: {
        fontWeight: &apos;bold&apos;,
        fontSize: 12
    },
    renderer: () =&gt; {}
})</code></pre>
</div>
</td>
    </tr>
    <tr>
      <td><div data-type="p">geom 的选中模式</div></td>
      <td>
<div class="highlight">
<pre data-syntax="javascript"><code class="language-javascript">geom.select()</code></pre>
</div>
</td>
      <td>
<div class="highlight">
<pre data-syntax="javascript"><code class="language-javascript">geom.selected()</code></pre>
</div>
</td>
    </tr>
    <tr>
      <td><div data-type="p">自定义 Shape</div></td>
      <td>
<div class="highlight">
<pre data-syntax="javascript"><code class="language-javascript">G2.Shape.registerShape(&apos;interval&apos;, {
  getPoints(cfg) {},
  draw(cfg, container) {}
});</code></pre>
</div>
</td>
      <td>
<div class="highlight">
<pre data-syntax="javascript"><code class="language-javascript">G2.Shape.registShape(&apos;interval&apos;, {
  getShapePoints(cfg) {},
  drawShape(cfg, container) {}
});</code></pre>
</div>
</td>
    </tr>
    <tr>
      <td><div data-type="p">自定义动画</div></td>
      <td>
<div class="highlight">
<pre data-syntax="javascript"><code class="language-javascript">G2.Animate.registerAnimation()</code></pre>
</div>
</td>
      <td>
<div class="highlight">
<pre data-syntax="javascript"><code class="language-javascript">Animate.registAnimation()</code></pre>
</div>
</td>
    </tr>
    <tr>
      <td><div data-type="p">shape.animte</div></td>
      <td>
<div class="highlight">
<pre data-syntax="javascript"><code class="language-javascript">/**
   * 执行动画
   * @param  {Object}   toProps  动画最终状态
   * @param  {Number}   duration 动画执行时间
   * @param  {Number}   delay    动画延迟时间
   * @param  {String}   easing   动画缓动效果
   * @param  {Function} callback 动画执行后的回调
   */
  shape.animate(toProps, duration, delay = 0, easing, callback)</code></pre>
</div>
<div data-type="p"></div><div data-type="p">easing 的名称全部采用 [d3-easing](https://github.com/d3/d3-ease)。</div></td>
      <td><div data-type="p"></div></td>
    </tr>
    <tr>
      <td><div data-type="p">事件</div></td>
      <td>
<div class="highlight">
<pre data-syntax="javascript"><code class="language-javascript">chart.on(&apos;tooltip:change&apos;);
chart.on(&apos;tooltip:show&apos;);
chart.on(&apos;tooltip:hide&apos;)</code></pre>
</div>
</td>
      <td>
<div class="highlight">
<pre data-syntax="javascript"><code class="language-javascript">chart.on(&apos;tooltipchange&apos;);
chart.on(&apos;tooltipshow&apos;);
chart.on(&apos;tooltiphide&apos;)</code></pre>
</div>
</td>
    </tr>
   </tbody>
 </table>
</div>

## 废弃的类、接口、属性、事件
* ~~G2.Frame~~  
  废除 `Frame` ，由 [DataView](/zh-cn/g2/3.x/api/data-set.html) 替代。
* ~~G2.Stat~~  
  废除 `Stat`, 由 [DataView 的 transform](/zh-cn/g2/3.x/api/transform.html) 替代。
* ~~G2.Theme~~
  直接使用 `G2.Global`。
* ~~G2.Canvas~~
  直接使用 G2.G
* ~~G2.Coord~~
* ~~G2.Base~~
* ~~G2.ColorCalculate~~
* ~~G2.Layout~~
  由 [DataView 的 transform](/zh-cn/g2/3.x/api/transform.html) 相应的方法替代。
* ~~chart.col() 以及 chart.cols()~~  
  使用 `chart.scale()` 替代
* ~~chart.guide().tag()~~
* ~~chart.guide().rect()~~  
  使用 `chart.guide().region()` 替代。
* ~~chart.setMode()~~
* ~~chart.select()~~
* ~~chart.getPosition()~~  
  使用 `chart.getXY()` 替代。
* ~~chart.contour()~~  
  通过ploygon 来实现。
* ~~syncXYScales~~  
  度量统一，3.0 中在列定义中进行声明:

```javascript
chart.scale('x', {
  sync: true
})
```

* ~~plotCfg~~
* ~~chart.on(‘itemselected’)~~
* ~~chart.on(‘itemunselected’)~~
* ~~chart.on(‘itemselectedchange’)~~
* ~~chart.on(‘rangeselectstart’)~~
* ~~chart.on(‘rangeselectend’)~~
