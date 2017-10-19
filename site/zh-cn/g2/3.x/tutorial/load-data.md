<!--
index: 4
title: 装载数据
resource:
  jsFiles:
    - ${url.dataSet}
    - ${url.g2}
-->

# 装载数据

## 如何装载数据

chart 对象支持两种数据载入的方式：

- 方式 1：`data` 属性传入
```js
var chart = new G2.Chart({
  id: 'c1',
  width: 600,
  height: 300,
  data: [
    {x: 'a', y: 1},
    {x: 'b', y: 2},
    ...
  ]
});
```
- 方式 2：调用 `chart.source(data)` 方法

## 支持的数据格式

G2 支持两种格式的数据源：

1. JSON 数组
2. [DataView 对象](./data-set.html)

### JSON 数组

G2 接收的数据格式非常简单：标准的 JSON 数组，其中每个数组元素是一个标准的 JSON 对象：

Example:

```js
var data = [
  {"gender":"男","count":40},
  {"gender":"女","count":30}
];
```

### DataView 对象

详见 [DataSet 教程](./data-set.html)。

