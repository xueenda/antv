<!--
index: 1
title: 色彩
-->

# 色彩

数据可视化设计中，对色彩的运用应首先考虑准确性，需达到信息传递、操作指引、交互反馈，或是强化、凸显某一个信息的目的，其次是品牌的识别性。

基于遵循可视化设计原则下，选择 AntV 色彩时有以下四个注意点：

* 准确性 - 根据数据不同的特性选择对应的色彩，保证数据传达的准确性
* 可辨性 - 视觉层次应清晰可辨
* 环境配合度 - 结合当前页面环境，并建立视觉连续性
* 无障碍设计 - 色彩可以被视障碍（色盲）用户识别


## 色板

AntV 色板由 3 种不同类型的色板组成，用户在进行色板选择时，只需对照数据特性即可得到一套对应的配色方案。

### 定性色板

| **定义** | 通过每个颜色的不同，传达不同的数据点之间的视觉差异 |
| :--- | :--- |
| **适用数据类型** | 离散型数据（也称分类型数据） |
| **例** | 事物分类、部门名称、地理名称等 |

> 定性调色板中的颜色不具有任何语义。因此，我们建议使用以下顺序的颜色，而不仅仅因为喜欢使用任何颜色；  
> 超过 16个数据时，请循环使用 16 色色板。


* **8 色色板 **![image | center](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/png/ddc7e640-0c9a-44e2-b07f-f7908d93d274.png "")
* **16 色色板（**8 ＜ 数据个数 ≤ 16）![image | center](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/png/25253983-cb12-4e83-8458-be9cd45e1314.png "")


> 定性色板中，根据饼图形状特性，对饼图的色板做了顺序的调整，使其更加连贯，更符合色彩认知。


* **8 色色板 - 饼图**![image | center](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/png/c8377e9c-2cfa-44db-bca3-756ed2200492.png "")
* **16 色色板 - 饼图**![image | center](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/png/b2b8db78-179e-4de9-b3fe-cf9d9df1f3fa.png "")


### 连续色板

| **定义** | 通过使用不同的深浅层次，传达从低到高的值 |
| :--- | :--- |
| **适用数据类型** | 连续型数据 |
| **例** | 年龄、销售额、时间、温度等 |

* 默认：![image | center](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/png/871717d1-2f1a-4d72-b753-e84f25421149.png "")
* 增强对比：  
  ![image | center](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/png/bf3bb983-8afc-4b95-bafb-12a6dbb2c4ba.png "")
* 双向对比：  
  ![image.png | center | 676x45](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/png/ac5d8955-4fa7-44d0-bd63-b062237ab4e3.png "")


> 如果上面的色板不能满足你的需求，你可以选择一个颜色，Ant Design 的色彩生成算法会为你生成完整的色板。  
> 地址：[https://ant.design/docs/spec/colors-cn#色板生成工具](https://ant.design/docs/spec/colors-cn#%E8%89%B2%E6%9D%BF%E7%94%9F%E6%88%90%E5%B7%A5%E5%85%B7)

### 语义色板
| **定义** | 通过四种公认的颜色，来传达“好”、“差”、“重要”和“中性”等含义，并且同样具备深浅层次 |
| :--- | :--- |
| **适用数据类型** | 公认的有含义的数据 |
| **例** | 好、差、重要、中性、男女、主次等 |

* 表达正面的、可行、植物、安全、成功等含义
  > ps. 在西方股票市场，绿色代表股价上升；在中国股票市场则相反。

  ![image.png | center | 676x45](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/png/efc95ef4-9a2c-47b6-b757-2b0f7c54832e.png "")
* 表达警告、注意、阻止等含义
  > ps. 在西方股票市场，红色代表股价下降；在中国股票市场则相反。

  ![image.png | center | 663x44](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/png/34a01497-a01b-4fe9-9afa-ddac3bb3dd43.png "")
* 表达负面的、不可行、严重、危险、失败等含义
  ![image | center](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/png/a62339a5-69ec-4927-8d75-03e4d7a83344.png "")
* 表达中性、可忽略的、次要、失效、已结束等含义
  ![image.png | center | 676x45](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/png/38c53a62-8cef-4aec-838e-8bd98f7ec8f7.png "")
* 热力图专用
  ![image.png | center | 676x45](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/png/97022a9a-ec62-4d7b-b27a-b0e805798220.png "")

## 透明度使用建议

<style>
td span {
  display: block;
  text-align: center;
}
td img {
  width: 120px;
}
table {
  width: 640px;
}
</style>

<div class="bi-table">
 <table>
   <colgroup><col width="30%"><col width="30%"><col width="30%"></colgroup>
   <tbody>
    <tr>
      <td><div data-type="p"><strong>形态</strong></div></td>
      <td><div data-type="p"><strong>建议透明度</strong></div></td>
      <td><div data-type="p"><strong>实例</strong></div></td>
    </tr>
    <tr>
      <td><div data-type="p">线</div><div data-type="p">例如：折线图、图的边线</div></td>
      <td><div data-type="p">100%</div></td>
      <td><span><img width="80px" src="https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/png/eed3f682-ab84-4887-8952-dd6b492c94b3.png" width="81"/></span></td>
    </tr>
    <tr>
      <td><div data-type="p">中等面积</div><div data-type="p">例如：柱形图、饼图、环图、漏斗图等</div></td>
      <td><div data-type="p">85%</div></td>
      <td><span><img width="80px" src="https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/png/b25dd3cb-4e8e-45b7-a98a-3adffefe3d5f.png" width="52"/></span><span><img width="80px" src="https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/png/61b6b0e6-dc28-4caf-a739-2a48c65ed48d.png" width="62"/></span></td>
    </tr>
    <tr>
      <td><div data-type="p">大面积</div><div data-type="p">例如：面积图、点图、雷达图等</div><div data-type="p"></div><blockquote><div data-type="p">通常这种大面积的使用都伴随着100%透明度的实线做边线。</div></blockquote>
</td>
      <td><div data-type="p">30%</div></td>
      <td><span><img width="80px" src="https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/png/adfd1020-667b-49c6-8197-8a32859ba9be.png" width="82"/></span><span><img width="80px" src="https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/png/cdb33b65-9aa8-4203-b668-1a0145751b75.png" width="82"/></span></td>
    </tr>
   </tbody>
 </table>
</div>

## 无障碍色彩检验

以上色板均通过 [色盲色弱测试工具](http://www.color-blindness.com/coblis-color-blindness-simulator/) 进行测试。
如果你使用了新的色板，我们建议使用此工具进行检验，最低限度保证 4 个颜色为一个单位，颜色之间是清晰可辨的。


## 相关链接
Ant Design 色彩：[https://ant.design/docs/spec/colors-cn](https://ant.design/docs/spec/colors-cn)