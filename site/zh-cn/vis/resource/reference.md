<!--
index: 1
title: 经典文献
resourceCards:
  - img: /assets/image/vis/resource/book1.jpg
    href: https://book.douban.com/subject/25760272/
    title: 数据可视化
    author: 陈为 / 沈则潜
    publisher: 电子工业出版社
  - img: /assets/image/vis/resource/book2.jpg
    href: https://book.douban.com/subject/10123863/
    title: The Grammar of Graphics
    author: Leland Wilkinson
    publisher: Springer
  - img: /assets/image/vis/resource/book3.jpg
    href: https://book.douban.com/subject/7056708/
    title: 深入浅出统计学
    translator: 李芳
    publisher: 电子工业出版社
  - img: /assets/image/vis/resource/book4.jpg
    href: https://book.douban.com/subject/1224798/
    title: 计算机图形学几何工具算法详解
    translator: 周长发
    publisher: 电子工业出版社
  - img: /assets/image/vis/resource/book5.jpg
    href: https://book.douban.com/subject/26266036/
    title: Visualization Analysis & Design
    author: Tamara Munzner
    publisher: A K Peters/CRC Press
  - img: /assets/image/vis/resource/book6.jpg
    href: https://book.douban.com/subject/24527091/
    title: ggplot2：数据分析与图形艺术
    translator: 统计之都
    publisher: 西安交通大学出版社
-->

# 经典文献

在数据可视化的研究和实现中，《数据可视化》、《The Grammar of Graphics》、《深入浅出统计学》、《计算机图形学几何工具算法详解》、《Visualization Analysis and Design》 、《ggplot2：数据分析与图形艺术》等书籍给了我们很多的启示，帮助我们奠定了扎实的理论基础，进而去实现各种创新。如果想了解更多数据可视化相关的内容，建议你去阅读这些非常棒的书籍。

<div class="container">
    <div class="row">
        {% for card in resourceCards %}
        <div class="feature col-md-6 text-center">
            <img src="{{ card.img }}" alt="">
            <h5>《{{ card.title }}》</h5>
            <div class="detail">
              {% if card.author %}
              <span>作者：{{ card.author }}</span>
              {% endif %}
              {% if card.translator %}
              <span>译者：{{ card.translator }}</span>
              {% endif %}
              <span> 出版社：{{ card.publisher }}</span>
            </div>
        </div>
        {% endfor %}
    </div>
</div>
