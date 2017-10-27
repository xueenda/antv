<!--
 index: 6
 title: Handler
 resource:
   jsFiles:
     - ${url.g6}
-->
# Handler

管理器，主要用来容纳、管理 模式 `mode`，行为 `behaviour`。

## 方法

### [dragHideTexts](#_dragHideTexts) {Function}

拖拽隐藏文本

### [wheelZoomHideTexts](#_wheelZoomHideTexts) {Function}

缩放隐藏文本

### [dragEdgeEndHideAnchor](#_dragEdgeEndHideAnchor) {Function}

多拽边结束后隐藏目标节点的锚点

### [dragNodeEndHideAnchor](#_dragEdgeEndHideAnchor) {Function}

多拽节点结束后隐藏目标节点的锚点

### [hoverAnchorSetActived](#_dragEdgeEndHideAnchor) {Function}

鼠标悬锚点激活锚点

### [hoverNodeShowAnchor](#_dragEdgeEndHideAnchor) {Function}

鼠标悬浮节点显示锚点

### [buttonPointer](#_buttonPointer) {Function}

当鼠标移到 `element.get('class')` 含 `button`  的图形元素上，指针变成小手的行为。

### [clickActive](#_clickActive) {Function}

鼠标左键点击激活子项 `item`（激活行为互斥）的行为。

![image](https://zos.alipayobjects.com/rmsportal/qeKFxhoyNQlDvcsNcMko.gif)

### [clickAddNode](#_clickAddNode) {Function}

点击增加节点的行为，适用于网图编辑器。

![image](https://zos.alipayobjects.com/rmsportal/GHEAPfFaFokQNWuRvsmQ.gif)

### [clickBlankClearActive](#_clickBlankClearActive) {Function}

点击画布空白区域，清除激活子项的行为，适用于网图编辑器。

### [dragCanvas](#_dragCanvas) {Function}

拖动画布的行为。

![image](https://zos.alipayobjects.com/rmsportal/ORxbdvErvjwPIOgHfSXF.gif)

### [dragBlank](#_dragBlank) {Function}

拖动画布空白区域的行为。

### [dragAddEdge](#_dragAddEdge) {Function}

拖动添加边的行为，适用于网图编辑器。

### [dragEdge](#_dragEdge) {Function}

拖动边切换边连接的节点的行为。

![image](https://zos.alipayobjects.com/rmsportal/OWLYIqFtCWTWzJoQuBZr.gif)

### [dragNode](#_dragNode) {Function}

拖动节点行为。

![image](https://zos.alipayobjects.com/rmsportal/uItgKmflYJiMFfYaulSb.gif)

### [multiSelect](#_multiSelect) {Function}

多选行为。

![image](https://zos.alipayobjects.com/rmsportal/ZgqXtYqGqedNeiFMOMgY.gif)

### [resizeEdge](#_resizeEdge) {Function}

边变形行为。

![image](https://zos.alipayobjects.com/rmsportal/wDwNAOjeEEbhILZGVEYT.gif)

### [resizeNode](#_resizeNode) {Function}

节点变形行为。

![image](https://zos.alipayobjects.com/rmsportal/QiajcEBVGVECIlnYHGUs.gif)

### [wheelZoom](#_wheelZoom) {Function}

滚轮缩放行为。

### [dragHideEdges](#dragHideEdges) {Function}

拖动边隐藏行为

### [wheelZoomHideEdges](#_wheelZoomHideEdges) {Function}

滚轮缩放边隐藏行为

### [shortcut](#_dragNode) {Function}

快捷键行为。`网图（Net）专有`

### [collapse](#_collapse) {Function}

树图的折叠行为。`树图（Tree）专有`

### [spreadout](#_spreadout) {Function}

树图的展开行为。`树图（Tree）专有`
