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
    - ${url.jquery}
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
            <div class="col-md-7" style="position: relative;">
              <div class="chart-wrapper">
                <div class="chart-header">
                  <div id="chartTitle">商品价格 7 年走势对比</div>
                </div>
                <div class="chart-content">
                  <div class="contianer slick">
                    <div id="commentsCarousel" class="carousel">
                      <div class="carousel-inner slick">
                        <div class="carousel-item active">
                          <canvas id="c1" style="width:375px;height:320px;"></canvas>
                        </div>
                        <div class="carousel-item">
                          <canvas id="c2" style="width:375px;height:320px;"></canvas>
                        </div>
                        <div class="carousel-item">
                          <canvas id="c3" style="width:375px;height:320px;"></canvas>
                        </div>
                      </div>
                    </div>
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
  $.getJSON('/assets/data/f2-series-line.json', function(data) {
    const chart = new F2.Chart({
      id: 'c1',
      pixelRatio: window.devicePixelRatio
    });
    chart.source(data);
    chart.scale('date', {
      type: 'timeCat',
      tickCount: 3
    });
    chart.scale('value', {
      tickCount: 5
    });
    chart.axis('date', {
      label(text, index, total) {
        // 只显示每一年的第一天
        const textCfg = {};
        if (index === 0) {
          textCfg.textAlign = 'left';
        }
        if (index === total - 1) {
          textCfg.textAlign = 'right';
        }
        return textCfg;
      }
    });
    chart.tooltip({
      custom(obj) {
        const legend = chart.get('legendController').legends.top[0];
        const tooltipItems = obj.items;
        const legendItems = legend.items;
        const map = {};
        legendItems.map(item => {
          map[item.name] = _.clone(item);
        });
        tooltipItems.map(item => {
          const { name, value } = item;
          if (map[name]) {
            map[name].value = value;
          }
        });
        legend.setItems(Object.values(map));
      },
      onHide() {
        const legend = chart.get('legendController').legends.top[0];
        legend.setItems(chart.getLegendItems().country);
      }
    });
    chart.line().position('date*value').color('type');
    chart.render();

  });
```

<!-- chart2 -->

```js-
const data = [
    { State: 'WY', 年龄段 : '小于5岁', 人口数量: 25635 },
    { State: 'WY', 年龄段 : '5至13岁', 人口数量: 1890 },
    { State: 'WY', 年龄段 : '14至17岁', 人口数量: 9314 },
    { State: 'DC', 年龄段 : '小于5岁', 人口数量: 30352 },
    { State: 'DC', 年龄段 : '5至13岁', 人口数量: 20439 },
    { State: 'DC', 年龄段 : '14至17岁', 人口数量: 10225 },
    { State: 'VT', 年龄段 : '小于5岁', 人口数量: 38253 },
    { State: 'VT', 年龄段 : '5至13岁', 人口数量: 42538 },
    { State: 'VT', 年龄段 : '14至17岁', 人口数量: 15757 },
    { State: 'ND', 年龄段 : '小于5岁', 人口数量: 51896 },
    { State: 'ND', 年龄段 : '5至13岁', 人口数量: 67358 },
    { State: 'ND', 年龄段 : '14至17岁', 人口数量: 18794 },
    { State: 'AK', 年龄段 : '小于5岁', 人口数量: 72083 },
    { State: 'AK', 年龄段 : '5至13岁', 人口数量: 85640 },
    { State: 'AK', 年龄段 : '14至17岁', 人口数量: 22153 }
  ];
  const chart = new F2.Chart({
    id: 'c2',
    pixelRatio: window.devicePixelRatio
  });

  chart.source(data, {
    '人口数量': {
      tickCount: 5
    }
  });
  chart.coord({
    transposed: true
  });
  chart.axis('State', {
    line: F2.Global._defaultAxis.line,
    grid: null
  });
  chart.axis('人口数量', {
    line: null,
    grid: F2.Global._defaultAxis.grid,
    label(text, index, total) {
      const textCfg = {
        text: text / 1000 + ' k'
      };
      if (index === 0) {
        textCfg.textAlign = 'left';
      }
      if (index === total - 1) {
        textCfg.textAlign = 'right';
      }
      return textCfg;
    }
  });
  chart.tooltip({
    custom(obj) {
      const legend = chart.get('legendController').legends.top[0];
      const tooltipItems = obj.items;
      const legendItems = legend.items;
      const map = {};
      legendItems.map(item => {
        map[item.name] = _.clone(item);
      });
      tooltipItems.map(item => {
        const { name, value } = item;
        if (map[name]) {
          map[name].value = (value);
        }
      });
      legend.setItems(Object.values(map));
    },
    onHide() {
      const legend = chart.get('legendController').legends.top[0];
      legend.setItems(chart.getLegendItems().country);
    }
  });
  chart.interval().position('State*人口数量').color('年龄段').adjust('stack');

  chart.render();
```

<!-- chart3 -->

```js-
  const map = {
    '芳华': '40%',
    '妖猫传': '20%',
    '机器之血': '18%',
    '心理罪': '15%',
    '寻梦环游记': '5%',
    '其他': '2%',
  };
  const data = [
    { name: '芳华', percent: 0.4, a: '1' },
    { name: '妖猫传', percent: 0.2, a: '1' },
    { name: '机器之血', percent: 0.18, a: '1' },
    { name: '心理罪', percent: 0.15, a: '1' },
    { name: '寻梦环游记', percent: 0.05, a: '1' },
    { name: '其他', percent: 0.02, a: '1' }
  ];
  const chart = new F2.Chart({
    id: 'c3',
    pixelRatio: window.devicePixelRatio
  });
  chart.source(data, {
    percent: {
      formatter(val) {
        return val * 100 + '%';
      }
    }
  });
  chart.legend({
    position: 'right',
    itemFormatter(val) {
      return val + '  ' + map[val];
    }
  });
  chart.tooltip(false);
  chart.coord('polar', {
    transposed: true,
    radius: 0.85
  });
  chart.axis(false);
  chart.interval()
    .position('a*percent')
    .color('name', [ '#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0' ])
    .adjust('stack')
    .style({
      lineWidth: 1,
      stroke: '#fff',
      lineJoin: 'round',
      lineCap: 'round'
    })
    .animate({
      appear: {
        duration: 1200,
        easing: 'bounceOut'
      }
    });

  chart.render();

```

