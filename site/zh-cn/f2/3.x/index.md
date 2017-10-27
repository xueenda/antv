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
    title: 极小
    description: 压缩后不到100k的代码，提供了几十种图表。
  - img: ${assets}/image/home/features-professional.svg
    title: 高性能
    description: 为移动端做了大量的性能优化，性能做到极致。
  - img: ${assets}/image/home/features-powerful.svg
    title: 强大扩展能力
    description: 任何图表，都可以基于图形语法灵活绘制，满足你无限的创意。
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
                <h1>F2 移动端图表库</h1>
                <p class="main-info">F2 是一个由纯 JavaScript 编写的针对移动端的高性能图表库。</p>
                <a href="{{ products.g2.links.demo.href }}" class="btn btn-primary btn-lg">{{ resource.translate.getStarted }}</a>
                <a href="{{base}}zh-cn/g2/3.x/tutorial/download.html" class="btn btn-light border btn-lg">{{ resource.translate.downloadAndUse }}</a>
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
    <p>用过简单的几步就可以绘制出图表：</p>
    <ol>
      <li>引入 f2 的 &lt;script&gt;</li>
      <li>声明 &lt;canvas&gt; 标签</li>
      <li>创建图表</li>
    </ol>
    <h4>引入&lt;script&gt;</h4>

    ```html
    <script type="{{ url.f2 }}"></script>
    ```

    <h4>声明 canvas 标签</h4>

    ```html
      <cavas id="c1" style="width:500px;height:500px"></canvas>
    ```

    <h4>创建图表</h4>

    ```js
      // 声明数据源
      var data = [
        {"tem": 10, "city": "tokyo"},
        {"tem": 4, "city": "newYork"},
        {"tem": 3, "city": "berlin"}
      ];
      // 创建图表
      var chart = new F2.Chart({
        id: 'c1'
      });
      // 设置数据源
      chart.source(data);
      // 声明语法
      chart.interval().position('city*tem');
      // 渲染图表
      chart.render();
    ```
    
</section>

<section class="more text-center">
    <a href="{{ products.f2.links.tutorial.href }}" class="btn btn-primary btn-lg">更多教程</a>
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

