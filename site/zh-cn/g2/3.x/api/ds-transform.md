<!--
index: 11
title: Transform
resource:
  jsFiles:
    - ${url.g2}
    - ${url.dataSet}
-->

# DataSet Transform 数据转换

一个数据视图（DataSet.View）通过 Transform 来进行数据转换操作，其语法如下：

```js
dv.transform({
    type: connectorName,
    ...otherOptions
});
```

举个例子：

```js
const testCSV = `Expt,Run,Speed
 1,1,850
 1,2,740
 1,3,900
 1,4,1070`;

const dv = new DataSet.View().source(testCSV, {
    type: 'csv'
});
console.log(dv.rows);
/*
 * dv.rows:
 * [
 *     {Expt: " 1", Run: "1", Speed: "850"}
 *     {Expt: " 1", Run: "2", Speed: "740"}
 *     {Expt: " 1", Run: "3", Speed: "900"}
 *     {Expt: " 1", Run: "4", Speed: "1070"}
 * ]
 */

dv.transform({
    type: 'filter',
    callback(row) {
        return row.Run !== "1";
    }
});
console.log(dv.rows);
/*
 * dv.rows:
 * [
 *     {Expt: " 1", Run: "2", Speed: "740"}
 *     {Expt: " 1", Run: "3", Speed: "900"}
 *     {Expt: " 1", Run: "4", Speed: "1070"}
 * ]
 */

```

上述代码中，数据视图实例 `dv` 使用 `csv` 类型的 Connector 载入了一段 CSV 文本，之后执行 `filter` Transform，过滤了某些数据。

目前 DataSet 支持以下 Transform：

## 静态处理相关

### filter 数据过滤

具体用法见示例：

```js
dv.transform({
    type: 'filter',
    callback(row) { // 判断某一行是否保留，默认返回true
        return row.year > 1998
    }
})
```

### map 数据加工

具体用法见示例：

### pick 字段过滤

具体用法见示例：

### rename 字段重命名

具体用法见示例：

### reverse 逆序排列

具体用法见示例：

### sort 数据排序

具体用法见示例：

### sort-by 按字段排序

> alias: sortBy

具体用法见示例：

### subset 获取子集

具体用法见示例：

### partition 数据分组

> alias: group | groups

具体用法见示例：

## 数据形变/数据补全相关

### fill-rows 补全行

> alias: fillRows

具体用法见示例：

### impute 补全列/补全字段

具体用法见示例：

### fold 字段展开

具体用法见示例：

## 数据比例（百分比）相关 Transform

### percent 总和百分比

具体用法见示例：

### proportion 行数百分比

具体用法见示例：

## 数据统计相关

### aggregate 聚合统计

具体用法见示例：

## 数据分箱相关

### bin.histogram 直方图分箱（单字段）

> alias: bin.dot

具体用法见示例：

### bin.quantile 分位值分箱（单字段）

具体用法见示例：

### bin.hexagon 六边形分箱（双字段）

> alias: bin.hex | hexbin

具体用法见示例：

### bin.rectangle 矩形分箱（双字段）

> alias: bin.rect

具体用法见示例：

## 核函数相关

### kernel-smooth.regression 核函数概率密度回归曲线（单、双字段）

具体用法见示例：

### kernel-smooth.density 核函数概率密度分布（双字段）

具体用法见示例：

## 树相关

### hierarchy.treemap 树形图布局

具体用法见示例：

### hierarchy.partition 矩形树图（及 sunburst 图）布局

具体用法见示例：

## 图相关

### diagram.arc 弧长链接图（及和弦图）布局

> alias: arc

具体用法见示例：

### diagram.sankey 桑基图布局

> alias: sankey

具体用法见示例：

### diagram.voronoi voronoi 图布局

> alias: voronoi

具体用法见示例：

## Geo 地理数据相关

### geo.projection 地理映射

具体用法见示例：

### geo.centroid 由地名获取地理位置点

具体用法见示例：

### geo.region 由地名获取地理位置区域

具体用法见示例：

## 其他

### tag-cloud 词云布局

> alias: word-cloud

具体用法见示例：

