<!--
 index: 10
 title: Global
 resource:
   jsFiles:
     - ${url.g6}
-->
# Global

## 属性

### [nodeStyle](#_nodeStyle) {Object}
默认节点样式

![image](https://zos.alipayobjects.com/rmsportal/qOjXehgcDzabdJNRJKxh.png)

默认：

```js
G6.Global.nodeStyle = {
  stroke: '#666',   
  fill: '#fff',
  lineWidth: 1,
  radius: 4,
  fillOpacity: 0.10
};
```

### [nodeLabelStyle](#_nodeLabelStyle) {Object}
节点文本样式

```js
G6.Global.nodeLabelStyle = {
  fill: '#666',
  textAlign: 'center',
  textBaseline: 'middle',
  fontSize: 14
};
```

### [nodeDelegationStyle](#_nodeDelegationStyle) {Object}
节点委托图形样式

![image](https://zos.alipayobjects.com/rmsportal/zaCRlbahFPMkSFCcWktt.png)

默认：

```js
G6.Global.nodeDelegationStyle = {
  stroke: '#108EE9',
  lineDash: [3, 3]
};
```

### [edgeDelegationStyle](#_edgeDelegationStyle) {Object}
边委托图形样式

默认：

```js
G6.Global.edgeDelegationStyle = {
  stroke: '#108EE9',
  lineDash: [3, 3]
};
```

### [edgeStyle](#_edgeStyle) {Object}
边样式

默认：

```js
G6.Global.edgeStyle = {
  lineWidth: 1,
  stroke: '#999'
};
```
### [edgeLabelStyle](#_edgeLabelStyle) {Object}
边文本样式

![image](https://zos.alipayobjects.com/rmsportal/lMTjkhRwkElHqzypxGIm.png)

默认：

```js
G6.Global.edgeLabelStyle = {
  fill: '#666',
  textAlign: 'center',
  textBaseline: 'middle'
};
```
### [edgeLabelRectStyle](#_edgeLabelRectStyle) {Object}
边底部背景矩形样式

默认：

```js
G6.Global.edgeLabelRectStyle = {
    fill: 'white'
};
```
### [anchorPointStyle](#_anchorPointStyle) {Object}
锚点样式

![image](https://zos.alipayobjects.com/rmsportal/PBnGSmcBgdSRnmyFdHrD.png)

默认：

```js
G6.Global.anchorPointStyle = {
  fill: '#108EE9',
  lineWidth: 0.1,
  r: 4
};
```
### [anchorPointHoverStyle](#_anchorPointHoverStyle) {Object}
锚点悬浮样式

默认：

```js
G6.Global.anchorPointHoverStyle = {
  lineWidth: 6,
  stroke: '#108EE9',
  strokeOpacity: 0.2
};
```

### [frameRectStyle](#_frameRectStyle) {Object}
多选框样式

![image](https://zos.alipayobjects.com/rmsportal/PWBjFvvXsYufYIKjraAa.png)

默认：

```js
G6.Global.frameRectStyle = {
  fill: 'blue',
  opacity: 0.1
};
```

### [nodeControlPointStyle](#_nodeControlPointStyle) {Object}
节点控制点样式

![image](https://zos.alipayobjects.com/rmsportal/srFjwWsHLDeqSTronFWL.png)

默认：

```js
G6.Global.nodeControlPointStyle = {
  r: 4,
  fill: '#fff',
  shadowBlur: 4,
  shadowColor: '#666'
};
```

### [edgeControlPointStyle](#_edgeControlPointStyle) {Object}
边控制点样式

默认：

```js
G6.Global.edgeControlPointStyle = {
  r: 4,
  fill: '#fff',
  shadowBlur: 4,
  shadowColor: '#666'
};
```

### [nodeAcitveBoxStyle](#_nodeAcitveBoxStyle) {Object}
节点激活框样式

默认：

```js
G6.Global.nodeAcitveBoxStyle = {
  stroke: '#108EE9',
  lineDash: [3, 3]
};
```

### [treeButtonStyle](#_treeButtonStyle) {Object}
树图展开折叠 icon 样式

默认：

```js
G6.Global.treeButtonStyle = {
  fill: '#fff',
  stroke: '#333'
};
```

### [autoZoomPadding](#_autoZoomPadding) {Number}

自动缩放边距

```js
G6.Global.autoZoomPadding = 10;
```

### [preciseAnchor](#_preciseAnchor) {Number}

是否采用精准相交策略

```js
G6.Global.preciseAnchor = false;
```

### [fontFamily](#_fontFamily) {String}

字体家族

```js
G6.Global.fontFamily = '"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", SimSun, "sans-serif"';
```

### [treeButtonStyle](#_treeButtonStyle) {Object}

树图展开折叠 icon 的样式

```js
G6.Global.treeButtonStyle = {
  fill: '#fff',
  stroke: '#333'
}
```

### [treeButtonRadius](#_treeButtonRadius) {Number}

树图按钮半径

```js
G6.Global.treeButtonRadius = 6;
```

### [treeButtonPadding](#_treeButtonPadding) {Number}

树图按钮内边距

```js
G6.Global.treeButtonPadding = 3;
```