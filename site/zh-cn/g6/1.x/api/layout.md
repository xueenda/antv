<!--
 index: 7
 title: Layout
 resource:
   jsFiles:
     - ${url.g6}
-->

# Layout

本文档是关系图库——G6.Layout的布局类文档, 您能从该文档中快速查找到其内置的所有布局。如果有你觉得描述的不够清晰的地方敬请[联系我们](/about/index.html)！G6 当前支持的布局：

## 网布局


## 树布局

G6 内置了4类树布局算法，共21种不同的树布局效果。具体树布局属性参数配置可以通过[G6树图布局工具](../demo/02-tree/tree-layout.html)调试和预览。

* [紧凑树——CompactBoxTree](#紧凑树——compactboxtree)
* [生态树——Dendrogram](#生态树——dendrogram)
* [缩进树——IndentedTree](#缩进树——indentedTree)
* [分层树——LayeredTidyTree](#分层树——layeredtidytree)

# 网布局基类——NetLayoutBase

网布局的基类，不可直接使用，可基于该类拓展出 G6 所需的网布局。所有内置布局继承于该类，享有该类的所有属性和方法。

## 属性

### [nodes](#nodes) {Array} 

参与布局的节点集

### [edges](#edges) {Array} 

参与布局的边集

## 方法

### [execute](#execute) {Function} 

执行布局

# 树布局基类——TreeLayoutBase

树布局的基类，不可直接使用，可基于该类拓展出 G6 所需的树布局。所有内置布局继承于该类，享有该类的所有属性和方法。

## 属性

### [root](#root) {Object} 

参与布局的树根节点

## 方法

### [execute](#execute) {Function} 

执行布局

# 紧凑树——CompactBoxTree

紧凑盒树布局。这是树图的默认布局，其特点是布局时统合考虑每个树节点的包围盒，由经典的[Reingold–Tilford tidy布局算法](http://emr.cs.iit.edu/~reingold/tidier-drawings.pdf)演进而来，适合于脑图等应用场景。

[紧凑盒树Demo](../demo/02-tree/tree.html)

[脑图Demo](../demo/02-tree/mind.html)

![图片](https://zos.alipayobjects.com/skylark/8aee7a6b-9e79-41f2-918c-7c5269011e68/attach/5286/9f92b3c9ea6abea7/right-logical.png)

## 属性

### [direction](#direction) {String}

树布局的方向，默认为LR，可选值为

* LR（根节点在左，往右布局）
* RL（根节点在右，往左布局）
* H（根节点在中间，水平对称布局）
* TB（根节点在上，往下布局）
* BT（根节点在下，往上布局）
* H（根节点在中间，垂直对称布局）

> Layout.IndentedTree只有前三个方向，也就是LR／RL／H

### [getHGap](#gethgap) {Function}

每个节点的水平间隙，默认18

### [getVGap](#getvgap) {Function}

每个节点的垂直间隙，默认18

# 生态树——Dendrogram

[生态树](https://en.wikipedia.org/wiki/Dendrogram)布局。特点是所有子节点布局在同一层级，适用于表示层次聚类。

[生态树Demo](../demo/02-tree/dendrogram.html)

![图片](http://alipay-rmsdeploy-image.cn-hangzhou.alipay.aliyun-inc.com/skylark/attach/5286/17725fb0e7af3a7a/dendrogram-lr.png)

## 属性

### [direction](#direction) {String}

树布局的方向，默认为LR，可选值为

* LR（根节点在左，往右布局）
* RL（根节点在右，往左布局）
* H（根节点在中间，水平对称布局）
* TB（根节点在上，往下布局）
* BT（根节点在下，往上布局）
* H（根节点在中间，垂直对称布局）

> Layout.IndentedTree只有前三个方向，也就是LR／RL／H

### [getHGap](#gethgap) {Function}

每个节点的水平间隙，默认18

### [getVGap](#getvgap) {Function}

每个节点的垂直间隙，默认18

### [nodeSep](#nodeSep) {Function}

节点间距

### [nodeSize](#nodeSize) {Function}

节点大小

### [rankSep](#rankSep) {Function}

层级间距

### [subTreeSep](#subTreeSep) {Function}

子树间隔

# 缩进树——IndentedTree

缩进树布局。树节点的层级通过水平方向的缩进量来表示，常用场景是文件目录结构。

[缩进树Demo](../demo/02-tree/indented.html)

![图片](http://alipay-rmsdeploy-image.cn-hangzhou.alipay.aliyun-inc.com/skylark/attach/5286/665db9cced8fc459d82b1fb5fba0ca9b)

## 属性

### [direction](#direction) {String}

树布局的方向，默认为LR，可选值为

* LR（根节点在左，往右布局）
* RL（根节点在右，往左布局）
* H（根节点在中间，水平对称布局）
* TB（根节点在上，往下布局）
* BT（根节点在下，往上布局）
* H（根节点在中间，垂直对称布局）

> Layout.IndentedTree只有前三个方向，也就是LR／RL／H

### [getHGap](#gethgap) {Function}

每个节点的水平间隙，默认18

### [getVGap](#getvgap) {Function}

每个节点的垂直间隙，默认18

### [indent](#indent) {Function}

缩进量

# 分层树——LayeredTidyTree

分层紧凑树。节点的位置由层级决定，也是比较通用的树布局。

[分层紧凑树Demo](../demo/02-tree/layered-tidy.html)

![图片](http://alipay-rmsdeploy-image.cn-hangzhou.alipay.aliyun-inc.com/skylark/attach/5286/a19056f79765b75c/layered-tidy-lr.png)

## 属性

### [direction](#direction) {String}

树布局的方向，默认为LR，可选值为

* LR（根节点在左，往右布局）
* RL（根节点在右，往左布局）
* H（根节点在中间，水平对称布局）
* TB（根节点在上，往下布局）
* BT（根节点在下，往上布局）
* H（根节点在中间，垂直对称布局）

> Layout.IndentedTree只有前三个方向，也就是LR／RL／H

### [getHGap](#gethgap) {Function}

每个节点的水平间隙，默认18

### [getVGap](#getvgap) {Function}

每个节点的垂直间隙，默认18

### [nodeSize](#nodeSize) {Function}

节点大小

### [nodeSep](#nodeSep) {Function}

节点距离

### [rankSep](#rankSep) {Function}

层次距离