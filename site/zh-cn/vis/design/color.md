<!--
index: 1
title: 颜色使用原则
-->

# 色彩

AntV 的色彩是基于 [Ant Design 色彩体系](https://ant.design/docs/spec/colors-cn)，并结合数据可视化特性而设计。在数据可视化设计中，对色彩的运用应首先考虑准确性，需达到信息传递、操作指引、交互反馈，或是强化、凸显某一个信息的目的，其次是品牌识别性。

选择 AntV 色彩时有以下三个注意点：

* 根据不同的数据特性选择相应的色彩，保证数据传达的准确性；
* 结合当前页面环境，建立视觉连续性；
* 视觉层次清晰可辨，保证色彩足够的对比度的同时更容易被视障碍（色盲、色弱）用户辨别。


## 色板
AntV 色板包含分类色板、连续色板及语义色板，用户选择色板时需对照数据特性选择相应配色方案。


### 分类色板
| **色板定义** | 通过每个颜色的不同，传达不同的数据点之间的视觉差异 |
| :--- | :--- |
| **适用数据类型** | 分类型数据（也称离散型数据） |
| **示例** | 事物分类、部门名称、地理位置等 |

分类色板中的颜色不具有任何语义，因此我们建议按照以下顺序使用。

<div id="palette-category"></div>

### 连续色板
| **色板定义** | 通过使用不同的深浅层次，传达从低到高的值 |
| :--- | :--- |
| **适用数据类型** | 连续型数据 |
| **示例** | 年龄、销售额、时间、温度等 |


<div id="palette-linear"></div>

#### 色板生成工具

如果上面的色板不能满足你的需求，你可以选择一个主色，Ant Design 的[色彩生成算法工具](https://ant.design/docs/spec/colors-cn#%E8%89%B2%E6%9D%BF%E7%94%9F%E6%88%90%E5%B7%A5%E5%85%B7)会为你生成完整的色板。

### 语义色板

| **色板定义** | 通过四种公认的颜色，来传达“好”、“差”、“重要”和“中性”等含义，且具备深浅层次 |
| :--- | :--- |
| **适用数据类型** | 公认的有含义的数据 |
| **示例** | 好、差、重要、中性、男女、主次等 |

* 表达正面的、可行、植物、安全、成功等含义

> ps. 在西方股票市场，绿色代表股价上升；在中国股票市场则相反。

<div id="palette-success"></div>

* 表达警告、注意、阻止等含义

> ps. 在西方股票市场，红色代表股价下降；在中国股票市场则相反。

<div id="palette-warn"></div>
 
* 表达负面的、不可行、严重、危险、失败等含义
 
<div id="palette-error"></div>

* 表达中性、可忽略的、次要、失效、已结束等含义  

<div id="palette-secondary"></div>

* 热力图专用  

<div id="palette-heatmap"></div>

## 透明度使用建议

| 形态 | 建议透明度 | 实例 |
| :--- | :--- | :--- |
| 线 <br/> 例如：折线图、图的边线 | 100% | <img src="https://gw.alipayobjects.com/zos/rmsportal/hrpMdOPMTWnCrCrBSSvj.png" width="132" alt="line" style="width: 132px;"> |
| 中等面积 <br/> 例如：柱形图、饼图、环图、漏斗图等 | 85% | <img src="https://gw.alipayobjects.com/zos/rmsportal/rzlkDFcyDflYfGYlJIRz.png" width="132" alt="pie" style="width: 132px;">  <img src="https://gw.alipayobjects.com/zos/rmsportal/WtXZARTsHWPAIuRYNrWT.png" width="132" alt="bar" style="width: 132px;"> |
| 大面积 <br/> 例如：面积图、点图、雷达图等 | 30% | <img src="https://gw.alipayobjects.com/zos/rmsportal/vKVfUIQcaFtdlGdIZGTH.png" width="132" alt="point" style="width: 132px;">  <img src="https://gw.alipayobjects.com/zos/rmsportal/LbhQlkkUiCiTXaKpRkRb.png" width="132" alt="area" style="width: 132px;"> |

## 无障碍色彩检验

以上色板均通过 [色盲色弱测试工具](http://www.color-blindness.com/coblis-color-blindness-simulator/) 测试，如果你使用了新的色板，我们建议使用此工具进行检验。

