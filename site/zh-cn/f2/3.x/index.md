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
featuresCards:
  - img: ${assets}/image/home/features-simple.svg
    title: 简单方便
    description: 从数据出发，仅需几行代码可以轻松获得想要的图表展示效果。
  - img: ${assets}/image/home/features-professional.svg
    title: 完备的编码
    description: 大量产品实践之上，提供绘图引擎。完备图形语法，专业设计规范。
  - img: ${assets}/image/home/features-powerful.svg
    title: 强大扩展能力
    description: 任何图表，都可以基于图形语法灵活绘制，满足你无限的创意。 - 有向图
footer:
  isDark: true
resource:
  jsFiles:
    - ${url.g6}
-->

<section class="intro">
    <div class="container">
        <div class="header row">
            <div class="col-md-6">
                <h1>G6关系图类库</h1>
                <p class="main-info">G6 是一个由纯 JavaScript 编写的关系图基础技术框架。开发者能基于 G6 进行关系图的查看视图和编辑视图进行快速的二次开发。</p>
                <a href="{{ products.g6.links.demo.href }}" class="btn btn-primary btn-lg">{{ resource.translate.getStarted }}</a>
                <a href="{{base}}zh-cn/g6/1.x/tutorial/download.html" class="btn btn-light border btn-lg">{{ resource.translate.downloadAndUse }}</a>
            </div>
            <div class="col-md-6 slick">
                <div id="commentsCarousel" class="carousel">
                    <div class="carousel-inner slick">
                        <div id="c1" class="carousel-item active"></div>
                        <div id="c2" class="carousel-item"></div>
                        <div id="c3" class="carousel-item"></div>
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
    <h2>快速接入</h2>
    <p>通过 <code>&lt;script&gt;</code> 标签引入：</p>
</section>

<section class="more text-center">
    <a href="{{ products.g6.links.tutorial.href }}" class="btn btn-primary btn-lg">更多教程</a>
</section>

<!-- chart1 -->

```js-
```

<!-- chart2 -->

```js-
```

<!-- chart3 -->

```js-
```

