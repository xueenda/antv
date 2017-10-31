<!--
title: 分布曲线图
tags:
  - distribute
-->

# 分布曲线图

<img src="https://t.alipayobjects.com/images/T1BjJkXcxgXXXXXXXX.png"/>

## 分布曲线图的简介

分布曲线图展示的是一种概率分布，也是一种同统计学紧密结合的图表。分布曲线是一种对称的钟形曲线，具有均数等于0，标准差等于1的特点，从而使标准分数在实际运用时非常有用。较常用的概率密度函数有：

- 核密度估计概率密度：核密度估计（kernel density estimation）是在概率论中用来估计未知的密度函数，属于非参数检验方法之一。由于核密度估计方法不利用有关数据分布的先验知识，对数据分布不附加任何假定，是一种从数据样本本身出发研究数据分布特征的方法，因而，在统计学理论和应用领域均受到高度的重视。下图展示了几种比较常用的核函数，图中展示的是钻石数据的depth属性分布曲线。

<div id="c1"></div>

```js-
$.getJSON('/assets/data/diamond.json?nowrap', function(data) {
    var allData = [];
    const chart = new G2.Chart({
        container: 'c1',
        forceFit: true,
        height: 400
    });
    chart.scale({
        x: {
            alias: 'depth',
            min: 50,
            max: 70,
            sync: true,
        },
        y: {
            alias: '概率密度分布',
            sync: true
        }
    });

    [
        'boxcar',
        'cosine',
        'epanechnikov',
        'gaussian',
        'quartic',
        'triangular',
        'tricube',
        'triweight',
        'uniform'
    ].forEach(function(method, i) {
        const dv = new DataSet.View().source(data);
        dv
            .transform({
                type: 'kernel-smooth.regression',
                method: method,
                field: 'depth',
                extent: [ 50, 70 ]
            })
            .transform({
                type: 'map',
                callback: function(row) {
                    row.method = method;
                    return row;
                }
            });
        allData = allData.concat(dv.rows);
    });
    chart.source(allData);
    chart.line()
        .position('x*y')
        .color('method');
  chart.render();
});
```

## 分布曲线图的构成

<img src="https://t.alipayobjects.com/images/T1AjNkXjNfXXXXXXXX.png" class="constitute-img"/>

分布曲线图由以下元素构成:

* 横轴：表示自变量
* 纵轴：表示因变量
* 表示概率分布的分布曲线

