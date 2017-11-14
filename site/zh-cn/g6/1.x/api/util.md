<!--
 index: 11
 title: Util
 resource:
   jsFiles:
     - ${url.g6}
-->

# Util

G6.Util 是一个工具类，里面提供了大量工具方法给开发者使用。

## 方法

### isNode 

判断子项是否是节点

```js
/**
 * 判断是否是节点
 * @param {Object} item 子项
 * @return {Boolean}
 */
G6.Util.isNode(item);
```

### isEdge

判断子项是否是边

```js
/**
 * 判断是否是边
 * @param {Object} item 子项
 * @return {Boolean}
 */
G6.Util.isEdge(item);
```

### substitute

替换字符串中的字段，返回匹配字符串的正则表达式。

```js
/**
 * 替换字符串中的字段.
 * @param  {String} str 模版字符串
 * @param  {Object} o   json data
 * @return {String} rst 匹配后的字符串
 */
G6.Util.substitute(str, o);
```

### ucfirst

将字符串的第一个字母变成大写。

```js
/**
 * 使第一个字母变成大写
 * @param  {String} s 字符串
 * @return {String} 首字母大写后的字符串
 */
G6.Util.ucfirst(s);
```

### isObject

判断参数是否为对象。

```js
/**
 * 是否是javascript对象
 * @param  {*} value 测试的值
 * @return {Boolean}
 */
G6.Util.isObject(value);
```

### isNumber

判断参数是否为数字。

```js
/**
 * 判断是否数字
 * @param  {*} value 测试的值
 * @return {Boolean}
 */
G6.Util.isNumber(value);
```

### isNumeric

是否是数字或者数字字符串（类似 '124'）。

```js
/**
 * 判断是否数字或者数字字符串，由于$.isNumberic方法会把 '123'认为数字
 * @param  {*} value 测试的值
 * @return {Boolean} 是否数字
 */
G6.Util.isNumeric(value);
```

### isBoolean

判断参数是否为布尔值。

```js
/**
 * 是否是布尔类型
 * @param  {*} value 测试的值
 * @return {Boolean}
 */
G6.Util.isBoolean(value);
```

### isFunction

判断参数是否为函数。

```js
/**
 * 是否为函数
 * @param  {*} value 测试的值
 * @return {Boolean}
 */
G6.Util.isFunction(value);
```

### isArray

判断参数是否为数组。

```js
/**
 * 是否数组
 * @param  {*} value 测试的值
 * @return {Boolean}
 */
G6.Util.isArray(value);
```

### isDate

判断参数是否为日期。

```js
/**
 * 是否日期
 * @param  {*} value 测试的值
 * @return {Boolean}
 */
G6.Util.isDate(value);
```

### isNull

判断一个对象是否是 null 或者 undefined。

```js
/**
 * 对象是否为空
 * @param  {*} value 测试的值
 * @return {Boolean}
 */
G6.Util.isNull(value);
```

### mix

合并各个对象。

```js
/**
 * 合并数据
 * @return {Object} 将数据合并到第一个
 */
G6.Util.mix(target, source1, source2....source);
```

若第一个参数为true，则为深层合并。

```js
/**
 * 合并数据
 * @return {Object} 将数据合并到第一个
 */
G6.Util.mix(true, target, source1, source2....source);
```

### map

转换数值的值。

```js
/**
 * map 数组
 * @param  {Array} arr 数组
 */
G6.Util.map(arr);
```

### filter

过滤数组。

```js
/**
 * 过滤数组
 * @param {Object|Array} element/Object 数组中的元素或者对象的值
 * @param {Function} func 遍历的函数 function(elememt,index){} 或者 function(value,key){},如果返回true则添加到结果集
 * @return {Array} 过滤的结果集
 */
G6.Util.filter(arr, func);
```

### each

遍历数组或者对象。

```js
/**
 * 遍历数组或者对象
 * @param {Object|Array} element/Object 数组中的元素或者对象的值
 * @param {Function} func 遍历的函数 function(elememt,index){} 或者 function(value,key){}
 */
G6.Util.each(elements, func);
```

### indexOf

返回 value 在数组中的索引。

```js
/**
 * 查找元素在数组中的位置，如果不存在则返回-1
 * @param  {Array} arr 数组
 * @param  {*} obj 查找的元素
 * @return {Number} 位置
 */
G6.Util.indexOf(arr, obj);
```

### empty

清空。

```js
/**
 * 清空
 * @param  {Array} array 数组
 */
G6.Util.empty(array);
```

### guid

产生唯一码。

```js
/**
 * 生成唯一的Id
 * @return {String} 唯一的编号
 */
G6.Util.guid();
```

### getEllipsePath

获取椭圆路径

```js
/**
 * 获取椭圆路径
 * @param {Number} x    中心x坐标
 * @param {Number} y    中心y坐标
 * @param {Number} rx   横轴半径
 * @param {Number} ry   纵轴
 * @return {Array} Path 路径
 */
G6.Util.getEllipsePath(x, y, rx, ry);
```

### pointsToPolygon

点集转化为Path多边形

```js
/**
 * 点集转化为Path多边形
 * @param {Array}  points 点集
 * @param {Boolen} z      是否封闭
 * @return {Array} Path   路径
 */
G6.Util.pointsToPolygon(points, z);
```

### pointsToCurve

点集到曲线

```js
/**
 * 点集到贝塞尔曲线
 * @param  {Array} points 点集
 * @return {Array} Path   路径
 */
G6.Util.pointsToCurve(points);
```

### arrowTo

将图形指向指定方向

```js
/**
 * 放置箭头
 * @param {Ganvas.Element}  element 形
 * @param {Number}          x       位置x
 * @param {Number}          y       位置y
 * @param {Number}          x0      方向起点x
 * @param {Number}          y0      方向起点y
 * @param {Number}          x1      方向终点x
 * @param {Number}          y1      方向终点y
 * @return {Ganvas.Element} element 形
 */
G6.Util.arrowTo(element, x, y, x0, y0, x1, y1);
```

### pathIntersection

算两条path的交点

```js
/**
 * path相交
 * @param  {String|Array} path1 路径1
 * @param  {String|Array} path2 路径2
 * @return {Array} rst
 */
G6.Util.pathIntersection(path1, path2);
```

### getSnapAnchor

获取节点逼近的锚点

```js
/**
 * 获取逼近的锚点
 * @param {Node}    node  节点
 * @param {Object}  point 用于逼近点
 * @return {Object} rst   逼近点
 */
G6.Util.getSnapAnchor(node, point);
```
