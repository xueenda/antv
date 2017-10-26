<!--
 index: 0
 title: G6
 resource:
   jsFiles:
     - ${url.g6}
-->

# G6

通过 `G6` 对象可调用的属性：

* 图基类：[G6.Graph](./graph.html)
* 网图类：[G6.Net](./net.html)
* 树图类：[G6.Tree](./tree.html)
* 处理类：[G6.Handler](./handler.html)
* 绘图类：[G6.Canvas](./canvas.html)
* 矩阵类：[G6.Matrix](./matrix.html)
* 工具类：[G6.Util](./util.html)
* 布局包：[G6.Layout](./layout.html)
* 全局配置项：[G6.Global](./global.html)

## 静态方法

### [registNode](#_registNode) {Function}

注册节点，参见文档[自定义图形](../tutorial/custom-shape.html)。

```js
// 注册节点
G6.registNode(name, {
  // 绘制
  draw: function(cfg, group){
    return keyShape;
  },
  // 绘制后执行
  afterDraw: function(cfg, group, keyShape){

  },
  // 获取锚点
  getAnchorPoints: function(cfg){
    return anchorPoints;
  }
});
```

#### 内部注册的节点

| 名称        | 解释           | 结果  |
| ------------- |:-------------:| -----:|
| 矩形 `rect`      |  | ![image](https://zos.alipayobjects.com/rmsportal/eBLoJXBCkDeHqcVEkRTT.png) |
| 圆形 `circle`      | 广义圆形，也可以是椭圆  |   ![image](https://zos.alipayobjects.com/rmsportal/orERcIfvAqIpmlbJpdrp.png) |
| 菱形 `rhombus` |  |    ![image](https://zos.alipayobjects.com/rmsportal/xfVcMIioqzMCtNqDSnKy.png) |
| 文本 `text` |  |    ![image](https://zos.alipayobjects.com/rmsportal/iUqRYTSlLKuwDYXVDveG.png) |
| 图片 `image` | 也可以传`http`开头的图片链接 |    ![image](https://zos.alipayobjects.com/rmsportal/RkCSIGsYUXlMIBsIuiKM.png) |
| 树节点 `tree-node` | 继承于`rect`， |    ![image](https://zos.alipayobjects.com/rmsportal/NuPQuritLREvKVzPlAsM.png) |
| HTML 节点 `html`      | html 节点。参考实例：[Demo](../demo/other/htmlnode.html) | ![image](https://gw.alipayobjects.com/zos/rmsportal/SuJoNCCrlhudIOzNvWVA.png) |

`注意：如果注册已有的图形，将会直接复写该图形对应的方法。`

### [registEdge](#_registEdge) {Function}

注册边，参见文档[自定义图形](../tutorial/custom-shape.html)。

```js
// 注册边
G6.registEdge(name, {
  // 绘制
  draw: function(cfg, group){
    return keyShape;
  },
  // 绘制后执行
  afterDraw: function(cfg, group, keyShape){

  }
});
```

#### 内部注册的边

| 名称        | 解释           | 结果  |
| ------------- |:-------------:| -----:|
| 直线 `line`      |  | ![image](https://zos.alipayobjects.com/rmsportal/ulCbytdOjNZgjxJyAHKW.png) |
| 曲线 `smooth`      |  | ![image](https://zos.alipayobjects.com/rmsportal/WVkwgCTBtPKdeDeVxpqH.png) |
| 二次贝塞尔曲线 `bezierQuadratic`      | 常用于有平行边存在的情况 | ![image](https://zos.alipayobjects.com/rmsportal/YSmiJUpmuXwmlBfvbRsk.png) |
| 水平-竖直 `HV`      |  | ![image](https://zos.alipayobjects.com/rmsportal/KqzyOUZksDtDyrgjrWNU.png) |
| 竖直-水平 `VH`      |  | ![image](https://zos.alipayobjects.com/rmsportal/ydtZnqoLOqJUXfYEMJXl.png) |
| 竖直-水平-竖直 `VHV`      |  | ![image](https://zos.alipayobjects.com/rmsportal/TeSwiNLcUCrCJFXnZkft.png) |
| 水平-竖直-水平 `HVH`      |  | ![image](https://zos.alipayobjects.com/rmsportal/aKZDselfbEHlFPOgKsYW.png) |

`注意：如果注册已有的图形，将会直接复写该图形对应的方法。`
