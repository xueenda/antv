<!--
 index: 9.1
 title: Vector2
-->

# 二阶向量—Vector2

## 静态方法

### add

和

```js
Matrix.Vector2.add(v1, v2);
```

### sub

差

```js
Matrix.Vector2.sub(v1, v2);
```

### lerp

插值

```js
Matrix.Vector2.lerp(v1, v2, r);
```

### angle

夹角

```js
Matrix.Vector2.angle(v1, v2);
```

### direction

方向

```js
Matrix.Vector2.direction(v1, v2);
```

## 实例方法

### negate

向量反转

```js
vector.negate();
```

### dot

点积

```js
/**
 * 点积
 * @param  {Vector2}  v 向量
 */
vector.dot(v);
```

### vertical

垂直

```js
/**
 * 垂直
 * @param  {Boolean}  left 朝向
 */
vector.vertical(left);
```

### length

求向量模长

```js
vector.length();
```

### setLength

设置向量长

```js
/**
 * 设置向量长
 * @param  {Number}  length 长度
 */
vector.setLength(length);
```

### lerp

求插值

```js
/**
 * 求插值
 * @param  {Number}  r 比率
 */
vector.lerp(r);
```

### clone

克隆

```js
vector.clone();
```

### rotate

旋转

```js
/**
 * 旋转
 * @param  {Number}  angle 角度
 */
vector.rotate(angle);
```

### angleTo

求角度

```js
/**
 * 求角度
 * @param  {Vector2}  v      向量
 * @param  {Boolean}  direct 方向
 */
vector.angleTo(v, direct);
```

### angle

求角度

```js
/**
 * 求角度
 * @param  {Vector2}  v      向量
 */
vector.angle(v);
```
