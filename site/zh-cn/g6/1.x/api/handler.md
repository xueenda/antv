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

### wheelZoomAutoLabel 

根据尺寸自动缩放文本标签

### dragHideTexts

拖拽隐藏文本

### wheelZoomHideTexts

缩放隐藏文本

### dragEdgeEndHideAnchor

多拽边结束后隐藏目标节点的锚点

### dragNodeEndHideAnchor

多拽节点结束后隐藏目标节点的锚点

### hoverAnchorSetActived

鼠标悬锚点激活锚点

### hoverNodeShowAnchor

鼠标悬浮节点显示锚点

### buttonPointer

当鼠标移到 `element.get('class')` 含 `button`  的图形元素上，指针变成小手的行为。

### clickActive

鼠标左键点击激活子项 `item`（激活行为互斥）的行为。

![image](https://zos.alipayobjects.com/rmsportal/qeKFxhoyNQlDvcsNcMko.gif)

### clickAddNode

点击增加节点的行为，适用于网图编辑器。

![image](https://zos.alipayobjects.com/rmsportal/GHEAPfFaFokQNWuRvsmQ.gif)

### clickBlankClearActive

点击画布空白区域，清除激活子项的行为，适用于网图编辑器。

### dragCanvas

拖动画布的行为。

![image](https://zos.alipayobjects.com/rmsportal/ORxbdvErvjwPIOgHfSXF.gif)

### dragBlank

拖动画布空白区域的行为。

### dragAddEdge

拖动添加边的行为，适用于网图编辑器。

### dragEdge

拖动边切换边连接的节点的行为。

![image](https://zos.alipayobjects.com/rmsportal/OWLYIqFtCWTWzJoQuBZr.gif)

### dragNode

拖动节点行为。

![image](https://zos.alipayobjects.com/rmsportal/uItgKmflYJiMFfYaulSb.gif)

### multiSelect

多选行为。

![image](https://zos.alipayobjects.com/rmsportal/ZgqXtYqGqedNeiFMOMgY.gif)

### resizeEdge

边变形行为。

![image](https://zos.alipayobjects.com/rmsportal/wDwNAOjeEEbhILZGVEYT.gif)

### resizeNode

节点变形行为。

![image](https://zos.alipayobjects.com/rmsportal/QiajcEBVGVECIlnYHGUs.gif)

### wheelZoom

滚轮缩放行为。

### dragHideEdges

拖动边隐藏行为

### wheelZoomHideEdges

滚轮缩放边隐藏行为

### shortcut

快捷键行为。`网图（Net）专有`

### collapse

树图的折叠行为。`树图（Tree）专有`

### spreadout

树图的展开行为。`树图（Tree）专有`


