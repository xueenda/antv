<!--
 index: 9
 title: Matrix
 resource:
   jsFiles:
     - ${url.g6}
-->
# Matrix

* [三阶矩阵——Matrix3](#三阶矩阵——matrix3)
* [二阶向量——Vector2](#二阶向量——vector2)

# 三阶矩阵——Matrix3

## 静态方法

### [multiply](#multiply) {Function}
乘法

```js
Matrix.Matrix3.multiply(m1, m2);
```

### [equal](#equal) {Function}
等于

```js
Matrix.Matrix3.equal(m1, m2);
```

## 实例方法

### [set](#set) {Function}

设置矩阵

```js
/**
 * 设置矩阵
 * @param  {Number} n11
 * @param  {Number} n12
 * @param  {Number} n13
 * @param  {Number} n21
 * @param  {Number} n22
 * @param  {Number} n23
 * @param  {Number} n31  
 * @param  {Number} n32  
 * @param  {Number} n33   
 */
matrix.set(
  n11, n12, n13,
  n21, n22, n23,
  n31, n32, n33
);
```

### [get](#get) {Function}

获取矩阵元素

```js
/**
 * 获取矩阵元素
 * @param  {Number} i   行
 * @param  {Number} j   列
 * @return {Number} rst 元素
 */
matrix.get(i, j);
```

### [identity](#identity) {Function}

矩阵归一

```js
/**
 * 获取矩阵元素
 * @param  {Number} i   行
 * @param  {Number} j   列
 * @return {Number} rst 元素
 */
matrix.get(i, j);
```

### [multiplyScalar](#multiplyScalar) {Function}

乘算子

```js
/**
 * 乘算子
 * @param  {Number} s   算子
 */
matrix.multiplyScalar(s);
```

### [det](#det) {Function}

求行列式

### [inverse](#inverse) {Function}

矩阵反转

### [transpose](#transpose) {Function}

矩阵转置

### [multiply](#multiply) {Function}

矩阵乘法

```js
/**
 * 矩阵乘法
 * @param  {Matrix3} m   矩阵
 */
matrix.multiply(m);
```

### [translate](#translate) {Function}

仿射平移

```js
/**
 * 仿射平移
 * @param  {Number} x   横坐标
 * @param  {Number} y   纵坐标
 */
matrix.translate(m);
```

### [rotate](#rotate) {Function}

仿射旋转

```js
/**
 * 仿射旋转
 * @param  {Number} rad   角度
 */
matrix.rotate(rad);
```

### [scale](#scale) {Function}

仿射缩放

```js
/**
 * 仿射缩放
 * @param  {Number} sx   横轴缩放比率
 * @param  {Number} sy   纵轴缩放比率
 */
matrix.scale(sx, sy);
```

### [equal](#equal) {Function}

等于

### [copy](#copy) {Function}

复制一个矩阵到自身

```js
/**
 * 复制
 * @param  {Matrix3} m   矩阵
 */
matrix.copy(m);
```

### [clone](#clone) {Function}

克隆

```js
/**
 * 克隆
 * @return  {Matrix3} m   矩阵
 */
matrix.clone();
```

### [to2DObject](#to2DObject) {Function}

转换为2阶算子

```js
/**
 * 转换为2阶算子
 * @return  {Object}  2阶算子
 */
matrix.to2DObject();
```

### [from2DObject](#from2DObject) {Function}

解析2阶算子

```js
/**
 * 解析2阶算子
 * @param  {Object}  obj 2阶算子
 */
matrix.from2DObject(obj);
```

# 二阶向量——Vector2

## 静态方法

### [add](#add) {Function}

和

```js
Matrix.Vector2.add(v1, v2);
```

### [sub](#sub) {Function}

差

```js
Matrix.Vector2.sub(v1, v2);
```

### [lerp](#lerp) {Function}

插值

```js
Matrix.Vector2.lerp(v1, v2, r);
```

### [angle](#angle) {Function}

夹角

```js
Matrix.Vector2.angle(v1, v2);
```

### [direction](#direction) {Function}

方向

```js
Matrix.Vector2.direction(v1, v2);
```

## 实例方法

### [negate](#negate) {Function}

向量反转

```js
vector.negate();
```

### [dot](#dot) {Function}

点积

```js
/**
 * 点积
 * @param  {Vector2}  v 向量
 */
vector.dot(v);
```

### [vertical](#vertical) {Function}

垂直

```js
/**
 * 垂直
 * @param  {Boolean}  left 朝向
 */
vector.vertical(left);
```

### [length](#length) {Function}

求向量模长

```js
vector.length();
```

### [setLength](#setLength) {Function}

设置向量长

```js
/**
 * 设置向量长
 * @param  {Number}  length 长度
 */
vector.setLength(length);
```

### [lerp](#lerp) {Function}

求插值

```js
/**
 * 求插值
 * @param  {Number}  r 比率
 */
vector.lerp(r);
```

### [clone](#clone) {Function}

克隆

```js
vector.clone();
```

### [rotate](#rotate) {Function}

旋转

```js
/**
 * 旋转
 * @param  {Number}  angle 角度
 */
vector.rotate(angle);
```

### [angleTo](#angleTo) {Function}

求角度

```js
/**
 * 求角度
 * @param  {Vector2}  v      向量
 * @param  {Boolean}  direct 方向
 */
vector.angleTo(v, direct);
```

### [angle](#angle) {Function}

求角度

```js
/**
 * 求角度
 * @param  {Vector2}  v      向量
 */
vector.angle(v);
```
