<!--
 index: 9
 title: Matrix3
-->

# 三阶矩阵—Matrix3

## 静态方法

### multiply
乘法

```js
Matrix.Matrix3.multiply(m1, m2);
```

### equal
等于

```js
Matrix.Matrix3.equal(m1, m2);
```

## 实例方法

### set

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

### get

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

### identity

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

### multiplyScalar

乘算子

```js
/**
 * 乘算子
 * @param  {Number} s   算子
 */
matrix.multiplyScalar(s);
```

### det

求行列式

### inverse

矩阵反转

### transpose

矩阵转置

### multiply

矩阵乘法

```js
/**
 * 矩阵乘法
 * @param  {Matrix3} m   矩阵
 */
matrix.multiply(m);
```

### translate

仿射平移

```js
/**
 * 仿射平移
 * @param  {Number} x   横坐标
 * @param  {Number} y   纵坐标
 */
matrix.translate(m);
```

### rotate

仿射旋转

```js
/**
 * 仿射旋转
 * @param  {Number} rad   角度
 */
matrix.rotate(rad);
```

### scale

仿射缩放

```js
/**
 * 仿射缩放
 * @param  {Number} sx   横轴缩放比率
 * @param  {Number} sy   纵轴缩放比率
 */
matrix.scale(sx, sy);
```

### equal

等于

### copy

复制一个矩阵到自身

```js
/**
 * 复制
 * @param  {Matrix3} m   矩阵
 */
matrix.copy(m);
```

### clone

克隆

```js
/**
 * 克隆
 * @return  {Matrix3} m   矩阵
 */
matrix.clone();
```

### to2DObject

转换为2阶算子

```js
/**
 * 转换为2阶算子
 * @return  {Object}  2阶算子
 */
matrix.to2DObject();
```

### from2DObject

解析2阶算子

```js
/**
 * 解析2阶算子
 * @param  {Object}  obj 2阶算子
 */
matrix.from2DObject(obj);
```
