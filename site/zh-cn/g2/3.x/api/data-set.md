<!--
index: 9
title: DataSet
resource:
  jsFiles:
    - ${url.g2}
    - ${url.dataSet}
-->

# DataSet

全局命名空间 `DataSet`，同时也是数据集类的构造函数。

## 常量 Constants

### DataSet.CONSTANTS

常量，譬如 `DataSet.HIERARCHY` 是树形结构的名称。

### DataSet.connectors

存储已注册的 Connector（key-value 对）。

### DataSet.transforms

存储已注册的 Transform（key-value 对）。

## 类 Classes

### DataSet

数据集构造函数。

#### new DataSet()

`new DataSet(options = {})` 创建并返回 DataSet 实例。具体参数见示例代码。

| 参数 | 类型 | 是否可选 |
| ---- | ---- | ---- |
| options | Object | 是 |

```js
const ds = new DataSet({
    state: { // 指定初始化状态量
        foo: 'bar'
    }
});
```

#### ds.isDataSet

判断是否是 DataSet 时使用，`ds.isDataSet === true`

#### ds.views

存储所有挂在数据集上的数据视图（key-value对）。

#### ds.state

存储数据集上的状态量（key-value对）。

#### ds.createView()

> alias ds.view()

`ds.createView([name, ]options = {})` 创建并返回一个数据视图实例。

| 参数 | 类型 | 是否可选 |
| ---- | ---- | ---- |
| name | String | 是 |
| options | Object | 是 |

```js
const dv0 = ds.createView();
const dv1 = ds.createView('foo');
const dv2 = ds.createView('bar', {
    watchingStates: [ 'fakeState' ]
});
```

#### ds.getView()

`ds.getView(name)` 返回 name 对应的数据视图实例。

| 参数 | 类型 | 是否可选 |
| ---- | ---- | ---- |
| name | String | 否 |

```js
const dv = ds.getView('foo');
```

#### ds.setView()

`ds.setView(name, dv)` 设置 name 对应的数据视图实例为 dv。

| 参数 | 类型 | 是否可选 |
| ---- | ---- | ---- |
| name | String | 否 |
| dv | DataSet.View | 否 |

```js
ds.setView('foo', new DataSet.View());
```

#### ds.setState()

`ds.setState(name, value)` 设置状态量 name 的值为 value。

> 注意，这个操作会使得关联了状态量 name 的数据视图对象重新执行所有数据处理流程。这个接口为数据集合上挂载的数据视图之间提供了通信通道。

| 参数 | 类型 | 是否可选 |
| ---- | ---- | ---- |
| name | String | 否 |
| value | Any | 否 |

```js
ds.setState('foo', 'bar');
```

#### ds.on()

`ds.on(name, callback)` 监听数据集上的 name 事件。

| 参数 | 类型 | 是否可选 |
| ---- | ---- | ---- |
| name | String | 否 |
| callback | Function | 否 |

目前支持的事件有

- `statechange` 状态量变化事件，在调用 `setState()` 方法后触发。

> 注意！这个事件在状态量改变后不是同步触发的，而是在 setState 被调用后**异步触发**的。

> 目前搜索监听了某个 state 值的数据视图自动监听这个事件。

```js
ds.on('statechange', (name, value) => {
    console.log(`state ${name}'s value has been changed to ${value}!`)
});
```

#### ds.emit()

`ds.emit(name, ..params)` 手动触发数据集上的 name 事件。

| 参数 | 类型 | 是否可选 |
| ---- | ---- | ---- |
| name | String | 否 |
| params | Arguments | 是 |

目前支持的事件有

- `statechange` 状态量变化事件，触发后状态量关联的数据视图会重新执行所有数据处理流程。

### DataSet.View

> alias DataSet.DataView

数据视图构造函数。

#### new View()

`const dv = new DataSet.View(ds, options = {})` 创建并返回数据视图实例，具体参数见代码。

| 参数 | 类型 | 是否可选 |
| ---- | ---- | ---- |
| ds | DataSet | 是 |
| options | Object | 是 |

```js
const dv0 = new DataSet.View();
const dv1 = new DataSet.View(ds, {
    watchingStates: [ 'foo' ] // 监听 `foo` 状态量变化，默认监听 ds 上的所有状态量
});
```

#### dv.isView

> alias dv.isDataView

#### dv.loose

#### dv.dataType

#### dv.origin

#### dv.rows

#### dv.source()

#### dv.transform()

## 方法 Functions

### DataSet.registerConnector()

### DataSet.getConnector()

### DataSet.registerTransform()

### DataSet.getTransform()
