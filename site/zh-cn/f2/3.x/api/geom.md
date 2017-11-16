<!--
index: 3
title: Geom

-->

# Geom

Geom 是 Geometry 的简写，用于创建各种各样的图表。F2 支持以下类型的图表

type | 说明| 对应的图表类型 
--- | --- | ---
`point` | 点，用于点图的构建。 | 散点图、气泡图
`path` | 路径，无序的点连接而成的一条线。| path
`line` | 线，点按照 x 轴连接成一条线，构成线图。 | 线图、曲线图
`area` | 填充线图跟坐标系之间构成区域图，也可以指定上下范围。| 面积图、区间面积图、层叠面积图
`interval` | 使用矩形或者弧形，用面积来表示大小关系的图形，一般构成柱状图、饼图等图表。| 柱状图、瀑布图、区间柱状图、玫瑰图、饼图、环图
`polygon` | 多边形，可以用于色块图、地图等图表类型。| 地图、色块图
`schema` | k 线图 | 蜡烛图、箱型图（暂时未提供）

#### 示例

```js
chart.point().position('x*y');

chart.interval().position('x*y');
```

## 方法

### position

`position(feilds)` 设置位置对应的字段：
  + fields: `String` 可以是字符串 'field1*field2' 也可以是数组 ['field1', 'field2']
  
  ```js
  chart.point().position([ 'cut', 'price' ]);
  chart.interval().position('cut*price');
  ```

### color

`color(field, [colors])` 设置颜色对应的字段：
  + field: `String` 可以一个字段也可以多个，也可以是常量
  + colors: `Array|Function` 可以是数组、回调函数
  
  ```js
  chart.point().position('x*y').color('x'); // 按照字段 x 进行映射，使用内置的颜色
  chart.point().position('x*y').color('red') // 设置常量颜色
  chart.point().position('x*y').color('x', x => {
    if (x > 100) {
      return 'red';
    }
    return 'blue';
  });
  ```

### size

`size(field, [sizes])` 设置大小对应的字段：
  + field: `String|Number` 可以是一个字段也可以是多个，也可以是常量
  + sizes: `Array|Function` 可以是数组、回调函数

  ```js
  chart.point().size(10); // 常量
  chart.point().size('value'); // 使用字段映射到大小，使用内置的大小
  chart.point().size('value', [10, 30]); // 指定大小范围
  chart.point().size('value', value => { // 回调函数
    if(type > 50) {
      return 10;
    } 
    return 5;
  });
  ```

### shape

`shape(field, shapes)`：
   + field: `String` 可以是一个字段也可以是多个，也可以是常量
   + shapes: `Array|Function` 可以是数组、回调函数
   
  ```js
  chart.point().shape('circle'); // 常量
  chart.point().shape('type'); // 使用字段映射到形状，使用内置的形状
  chart.point().shape('type', [ 'circle', 'rect' ]); // 指定形状
  chart.point().shape('type', type => { // 回调函数
    if(type === 'a') {
      return 'circle';
    }
    return 'square';
  });
  ```

### style

`style([field], cfg)` 指定图形的样式：
  + field: `String` 映射到样式的字段，可以不设置直接设置配置项 cfg
  + cfg: 配置项支持的属性，查看：[canvas 属性](http://www.w3school.com.cn/tags/html_ref_canvas.asp) 除此外提供了几个别名
    - stroke: 边框，是 strokeStyle 的简写
    - fill: 填充色，是 fillStyle 的简写
    - opacity: 透明度，是 globalAlpha 的简写

### adjust

`adjust(type)` 进行数据调整：
  + **F2 目前仅支持 stack（层叠） 和 dodge(分组）的数据调整**
