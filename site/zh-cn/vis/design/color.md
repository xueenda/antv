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

![分类色板.png | left | 268x360](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/png/3d419f0f-3ec6-4f5c-918e-1ca4e1458ab4.png "")

### 连续色板
| **色板定义** | 通过使用不同的深浅层次，传达从低到高的值 |
| :--- | :--- |
| **适用数据类型** | 连续型数据 |
| **示例** | 年龄、销售额、时间、温度等 |


![连续色板.png | left | 268x448](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/png/1185d055-22c9-4026-b991-11b77ae1b0fc.png "")

#### 色板生成工具
如果上面的色板不能满足你的需求，你可以选择一个主色，Ant Design 的[色彩生成算法工具](https://ant.design/docs/spec/colors-cn#%E8%89%B2%E6%9D%BF%E7%94%9F%E6%88%90%E5%B7%A5%E5%85%B7)会为你生成完整的色板。

### 语义色板
| **色板定义** | 通过四种公认的颜色，来传达“好”、“差”、“重要”和“中性”等含义，且具备深浅层次 |
| :--- | :--- |
| **适用数据类型** | 公认的有含义的数据 |
| **示例** | 好、差、重要、中性、男女、主次等 |

* 表达正面的、可行、植物、安全、成功等含义
  > ps. 在西方股票市场，绿色代表股价上升；在中国股票市场则相反。

 
  ![语义 - 绿.png | left | 268x448](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/png/622a7164-7735-44b9-8b9b-e88b9ffac7bf.png "")


* 表达警告、注意、阻止等含义
  > ps. 在西方股票市场，红色代表股价下降；在中国股票市场则相反。

 
  ![语义 - 橙.png | left | 268x448](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/png/95106a8b-3d6a-46c8-96d9-6577ca09a5eb.png "")


* 表达负面的、不可行、严重、危险、失败等含义
 
  ![语义 - 红.png | left | 268x448](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/png/0517e738-8537-4cf1-923c-b9294088d365.png "")


* 表达中性、可忽略的、次要、失效、已结束等含义  

  ![语义 - 中性.png | left | 268x360](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/png/d783d26c-6241-46f8-9ba1-450a419e8488.png "")


* 热力图专用  

  ![语义 - 热力图.png | left | 268x448](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/png/53185b92-5448-49f0-9f3e-4286dd3a3d54.png "")


## 透明度使用建议


<div class="bi-table">
 <table>
   <colgroup><col width="299px"><col width="117px"><col width="285px"></colgroup>
   <tbody>
    <tr>
      <td><div data-type="p"><strong>形态</strong></div></td>
      <td><div data-type="p"><strong>建议透明度</strong></div></td>
      <td><div data-type="p"><strong>实例</strong></div></td>
    </tr>
    <tr>
      <td><div data-type="p">线</div><div data-type="p">例如：折线图、图的边线</div></td>
      <td><div data-type="p">100%</div></td>
      <td><div data-type="image" data-display="block" data-align="center" data-src="https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/png/eed3f682-ab84-4887-8952-dd6b492c94b3.png" data-width=132><span><img src="https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/png/eed3f682-ab84-4887-8952-dd6b492c94b3.png" width="132"/></span></div></td>
    </tr>
    <tr>
      <td><div data-type="p">中等面积</div><div data-type="p">例如：柱形图、饼图、环图、漏斗图等</div></td>
      <td><div data-type="p">85%</div></td>
      <td><div data-type="image" data-display="block" data-align="center" data-src="https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/png/b25dd3cb-4e8e-45b7-a98a-3adffefe3d5f.png" data-width=132><span><img src="https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/png/b25dd3cb-4e8e-45b7-a98a-3adffefe3d5f.png" width="132"/></span></div><div data-type="image" data-display="block" data-align="center" data-src="https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/png/61b6b0e6-dc28-4caf-a739-2a48c65ed48d.png" data-width=132><span><img src="https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/png/61b6b0e6-dc28-4caf-a739-2a48c65ed48d.png" width="132"/></span></div></td>
    </tr>
    <tr>
      <td><div data-type="p">大面积</div><div data-type="p">例如：面积图、点图、雷达图等</div></td>
      <td><div data-type="p">30%</div></td>
      <td><div data-type="image" data-display="block" data-align="center" data-src="https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/png/adfd1020-667b-49c6-8197-8a32859ba9be.png" data-width=132><span><img src="https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/png/adfd1020-667b-49c6-8197-8a32859ba9be.png" width="132"/></span></div><div data-type="image" data-display="block" data-align="center" data-src="https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/png/cdb33b65-9aa8-4203-b668-1a0145751b75.png" data-width=132><span><img src="https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/png/cdb33b65-9aa8-4203-b668-1a0145751b75.png" width="132"/></span></div></td>
    </tr>
   </tbody>
 </table>
</div>



## 无障碍色彩检验
以上色板均通过 [色盲色弱测试工具](http://www.color-blindness.com/coblis-color-blindness-simulator/) 测试，如果你使用了新的色板，我们建议使用此工具进行检验。

