<!--
template: home
title: F2
keywords:
  - F2
  - Chart
  - 图表
  - 移动端
  - Mobile
  - H5
description: F2 是面向移动端的一套基于可视化图形语法的图表库，具有精简、高性能、易扩展的特性。适用于对性能、大小、扩展性要求严苛的场景。
featuresCards:
  - img: ${assets}/image/home/features-simple.svg
    title: 极小
    description: 压缩后不到 100k 的代码，提供了几十种图表。
  - img: ${assets}/image/home/features-professional.svg
    title: 高性能
    description: 性能极致追求，针对移动设备做了大量的优化。
  - img: ${assets}/image/home/features-powerful.svg
    title: 强大扩展能力
    description: 任何图表，都可以基于图形语法灵活绘制，满足你无限的创意。
resource:
  jsFiles:
    - ${url.f2}
-->

<section class="intro">
    <div class="container">
        <div class="header row">
            <div class="col-md-5">
                <h1>F2 移动端图表库</h1>
                <p class="main-info">F2 是面向移动端的一套基于可视化图形语法的图表库，具有精简、高性能、易扩展的特性。适用于对性能、大小、扩展性要求严苛的场景。</p>
                <a href="{{ products.f2.links.tutorial.href }}" class="btn btn-primary btn-lg btn-round-link">{{ resource.translate.getStarted }}</a>
                  <button class="btn btn-light border btn-lg btn-round-link" id="scanCodeBtn">{{ resource.translate.scanCode }}</button>
                  <div style="position: absolute;">
                    <div class="scancode-wrapper">
                      <div class="scancode-content">
                        <div class="scancode-arrow"></div>
                        <div class="scancode-inner">
                          <div id="scanCode" data-url={{ products.f2.qrCode.href }} ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                <iframe class="btn-round-link btn btn-light btn-lg github-btn" src="https://ghbtns.com/github-btn.html?user=antvis&repo=f2&type=star&count=true&size=large" frameborder="0" scrolling="0" width="170px" height="20px"></iframe>
            </div>
            <div class="col-md-7 slick">
                <div id="commentsCarousel" class="carousel">
                    <div class="carousel-inner slick">
                        <div class="carousel-item active">
                          <canvas id="c1" style="width:500px;height:300px;"></canvas>
                        </div>
                        <div class="carousel-item">
                          <canvas id="c2" style="width:500px;height:300px;"></canvas>
                        </div>
                        <div class="carousel-item">
                          <canvas id="c3" style="width:500px;height:300px;"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="features text-center">
    <div class="container">
        <div class="row">
            {% for card in featuresCards %}
            <div class="feature col-md-4 text-center">
                <img src="{{ card.img }}" alt="" width="120" height="120">
                <h5>{{ card.title }}</h5>
                <div class="detail">{{ card.description }}</div>
            </div>
            {% endfor %}
        </div>
    </div>
</section>

<section class="get-started text-center">
<div class="container">
    <h2>快速接入</h2>
    <p>通过 <code>&lt;script&gt;</code> 标签引入：</p>

```html
<!-- 引入在线资源 -->
<script src="{{ url.f2 }}"></script>
```

</div>
<a href="{{ products.f2.links.tutorial.href }}"  class="btn btn-primary btn-lg btn-round-link more-tutorial">更多教程</a>
</section>

<!-- chart1 -->

```js-
  const data = [
      { time: '周一', tem: 10, city: 'beijing' },
      { time: '周二', tem: 22, city: 'beijing' },
      { time: '周三', tem: 20, city: 'beijing' },
      { time: '周四', tem: 26, city: 'beijing' },
      { time: '周五', tem: 20, city: 'beijing' },
      { time: '周六', tem: 26, city: 'beijing' },
      { time: '周日', tem: 28, city: 'beijing' },
      { time: '周一', tem: 5, city: 'newYork' },
      { time: '周二', tem: 12, city: 'newYork' },
      { time: '周三', tem: 26, city: 'newYork' },
      { time: '周四', tem: 20, city: 'newYork' },
      { time: '周五', tem: 28, city: 'newYork' },
      { time: '周六', tem: 26, city: 'newYork' },
      { time: '周日', tem: 20, city: 'newYork' }
  ];
  const chart = new F2.Chart({
    id: 'c1',
    pixelRatio: window.devicePixelRatio
  });
  const defs = {
    time: {
      tickCount: 7,
      range: [ 0, 1 ]
    },
    tem: {
      tickCount: 5,
      min: 0
    }
  };
    // 配置time刻度文字样式
  const label = {
    fill: '#979797',
    font: '14px san-serif',
    offset: 6
  };
  chart.axis('time', {
    label(text, index, total) {
      const cfg = label;
        // 第一个点左对齐，最后一个点右对齐，其余居中，只有一个点时左对齐
      if (index === 0) {
        cfg.textAlign = 'start';
      }
      if (index > 0 && index === total - 1) {
        cfg.textAlign = 'end';
      }
      return cfg;
    }
  });
    // 配置刻度文字大小，供PC端显示用(移动端可以使用默认值20px)
  chart.axis('tem', {
    label: {
      fontSize: 14
    }
  });
  chart.source(data, defs);
  chart.line().position('time*tem')
    .color('city')
    .shape('smooth');
  chart.render();

```

<!-- chart2 -->

```js-

const data = [
    { tem: 500, month: '3月' },
    { tem: -50, month: '4月' },
    { tem: 450, month: '5月' },
    { tem: -40, month: '6月' },
    { tem: 690, month: '7月' },
    { tem: 346, month: '8月' }
  ];
  const chart = new F2.Chart({
    id: 'c2',
    pixelRatio: window.devicePixelRatio
  });
  chart.source(data, {
    tem: {
      tickCount: 5
    }
  });
  chart.axis('month', {
    label: {
      font: 'sans-serif '
    },
    line: null,
    grid: null
  });
  chart.axis('tem', {
    label: null,
    grid: {
      stroke: '#f8f8f8'
    }
  });
  chart.interval().position('month*tem').color('tem*month', function(tem, month) {
    if (month === '8月') {
      return '#f5623a';
    }
    if (tem >= 0) {
      return '#f8bdad';
    }
    if (tem < 0) {
      return '#99d6c0';
    }
  });

  // 辅助元素
  data.forEach(function(obj, index) {
    // 文字部分
    const offsetY = obj.tem > 0 ? -16 : 14;
    chart.guide().text({
      position: [ obj.month, obj.tem ], 
      content: obj.tem,
      style: {
        textAlign: 'center',
        textBaseline: 'middle',
        fill: '#999999'
      },
      offsetY: offsetY
    });
    // 背景部分
    const offset = 0.25;
    chart.guide().rect({
      start: [ index - offset, 'max' ],
      end: [ index + offset, 'min' ], 
      style: { fill: '#f8f8f8' }
    });
  });
  chart.render();
```

<!-- chart3 -->

```js-

const  data = [
  {a: '1', b: 0.3, c: '1'},
  {a: '1', b: 0.3, c: '2'},
  {a: '1', b: 0.4, c: '3'}
];

const chart = new F2.Chart({
  id: 'c3',
  pixelRatio: window.devicePixelRatio
});

chart.source(data);

chart.coord('polar', {
  transposed: true,
  inner: 0.6
});

chart.axis(false);
chart.interval().position('a*b').color('c').adjust('stack');
chart.render();

```

