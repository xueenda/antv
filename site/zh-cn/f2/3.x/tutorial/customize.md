<!--
index: 2
title: 自定义 shape
resource:
  jsFiles:
    - ${url.f2}
-->


# 自定义 shape

F2 提供了自定义 Shape 的功能，可以给每种 Geometry 添加对应的 shape。

## 方法

### registerShape

`Shape.registerShape(geomName, shapeName, cfg)`: 注册图形
 + geomName：`String` Geometry 的名称
 + shapeName：`String` 注册的具体图形名称
 + cfg：`Object` 配置

### getPoints

`getPoints(cfg)`: `Array` 构建图形需要的点，一般情况下不考虑在不同的坐标系下适配时，可以不提供这个方法。

 * cfg: 参数
   + cfg.x: x 数据
   + cfg.y: y 数据
   + cfg.y0: y 轴对应数据为 0 或者最小值，保证柱状图、区域图有正确的起始位置
   + cfg.size: 大小数据

这个方法返回一个包含多个点的数组，常见的柱状图的示例：

```js
getPoints(cfg) {
  const x = cfg.x;
  const y = cfg.y;
  const y0 = cfg.y0; // 0 点的位置
  const width = cfg.size;

  // 有3种情况，
  // 1. y，x都不是数组
  // 2. y是数组，x不是
  // 3. x是数组，y不是
  let ymin = y0;
  let ymax = y;
  if (Util.isArray(y)) {
    ymax = y[1];
    ymin = y[0];
  }

  let xmin;
  let xmax;
  if (Util.isArray(x)) {
    xmin = x[0];
    xmax = x[1];
  } else {
    xmin = x - width / 2;
    xmax = x + width / 2;
  }

  const points = [];

  points.push({
    x: xmin,
    y: ymin
  }, {
    x: xmin,
    y: ymax
  }, {
    x: xmax,
    y: ymax
  }, {
    x: xmax,
    y: ymin
  });

  return points;
}
```

### draw

`draw(cfg, canvas)`: 执行图形计算、调用绘图方法
 * cfg：包含 points 数据和映射后的属性
 * canvas：canvas 对象


```js
const Shape = F2.Shape;
Shape.registerShape('interval', 'custom', { // 向Shape工厂注册某个geom的一个shape
  getPoints(cfg) { // 自定义具体标记点
  },
  draw(cfg, container) { // 自定义最终绘制
  }
});
```

### 工具方法

由于 `getPoints()` 方法返回的点是 0-1 之间的数据，所以需要将数据转换成画布坐标，自定义 shape 的方法中可以调用下面两个方法：

* `parsePoint(point)` 将单个点转换成画布上的坐标；
* `parsePoints(points)` 将多个点转换成画布上的坐标。

## 1 分钟自定义 Shape

以柱状图举例，几何标记 interval 会给出四个标记点，然后将这四个点依次连接，得到每个柱子的形状。<span style="font-style:italic;color:#F93D26">红色圆形</span>标记就是几何标记点。默认的柱状图就是通过四个几何标记点，依次相连后得到的。
![image](https://zos.alipayobjects.com/skylark/f56fb446-5395-48d5-9e20-8aa07d585c7f/attach/1996/198df5d694346bc9/image.png)


下面的我们使用自定义的 shape，把上面的柱状图的柱子变成变成三角形。

![image](https://zos.alipayobjects.com/skylark/c3da8dc1-6d42-49a4-a5e5-e10430cc8ec7/attach/1996/d0c46539b2a3e329/image.png)

<canvas id="canvas"></canvas>

```js+
  const data = [
    { tem: 500, city: '3月' },
    { tem: -50, city: '4月' },
    { tem: 450, city: '5月' },
    { tem: -40, city: '6月' },
    { tem: 690, city: '7月' },
    { tem: 346, city: '8月' }
  ];
  const drawTriangle = function(points, canvas, cfg) {
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    if(points.length > 1) {
      for (let i = 1; i <= points.length - 1; i++) {
        ctx.lineTo(points[i].x,points[i].y);
      }
    }
    ctx.fillStyle = cfg.fill;
    ctx.fill();
  };
  // 自定义绘制数据的的形状
  const Shape = F2.Shape;
  Shape.registerShape('interval', 'triangle', {
    getPoints: function(cfg){
      const x = cfg.x;
      const y = cfg.y;
      const y0 = cfg.y0;
      const width = cfg.size;
      return [
        { x: x - width / 2, y: y0 },
        { x: x, y: y },
        { x: x + width / 2, y: y0 }
      ];
    },
    draw(cfg, canvas) {
      const points = this.parsePoints(cfg.points);
      const style = cfg.style || {};
      style.fill = cfg.color;
      drawTriangle(points, canvas, style);
    }
  });
  const chart = new F2.Chart({
    id: 'canvas',
    width: 500,
    height: 300,
    padding: [ 10, 10, 50, 60 ],
    pixelRatio: 2
  });
  chart.source(data);
  
  chart.interval().position('city*tem').color('tem', tem => {
    if (tem >= 0){
      return '#f8bdad';
    }
    if (tem < 0) {
      return '#99d6c0';
    }
  }).shape('triangle');

  chart.render();
```

上面代码中，我们进行了三步操作：

1. 使用 canvas 的绘图接口实现自定义三角形的绘制；
2. 通过 `getPoints()` 方法修改标记点。此时 cfg 中会传入：x，y，y0，size。其中 x，y 是柱子最高点的坐标，y0 是横坐标轴的 y 坐标，size 是柱子默认宽度；
3. 得到标记点后，我们在 `draw()` 方法中拿到 cfg.points 数据和数据映射后的图形属性数据（比如 cfg.color），再调用三角形绘制方法，生成每个三角形。

<span style="font-style:italic;color:#F93D26">注意： points 数据和参与 points 计算的配置项都是 0-1 空间（归一化）的数据！
</span>
