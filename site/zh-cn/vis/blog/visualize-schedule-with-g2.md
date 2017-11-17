<!--
index: 7
title: 玩玩 G2 系列之作息表
authors:
  - name: 再飞
    avatar: ${assets}/image/vis/avatar/placeholder.png
date: "2017-11-22"
landscape: ${assets}/image/vis/blog/visualize-schedule-with-g2.jpg
-->

# 背景

[《创作者的日常生活》](https://book.douban.com/subject/25844039/) 的作者 Mason Currey 研究了过去 400 年来 161 位伟大创作者每天如何分配时间，运用自己最大的能力，如何安排他们的作息，发挥创意和生产力。从内容来说，虽然每位创作者的个人生活习惯不同，有人习惯夜晚深耕，有人习惯白日劳作，但是几乎每个人都会提到的就是 -- **维持稳定规律的生活作息**。

于是有媒体根据该著作《创作者的日常生活》（Daily Rituals）绘制了书中几位创造者的日常生活，通过数据可视化的方式，我们对他们的生活作息简直一目了然：

一个刻度为一个小时，由 0 点开始 24 小时为一个周期，绿色代表工作时间，白色代表睡眠时间，橘色是社交及饮食时间，蓝色为运动时间，浅绿色指代其他。

![image](https://zos.alipayobjects.com/skylark/131e38cf-92f3-448f-b187-d75696d90836/attach/824/19d350e92d043747/image.png)

![Group.png](https://zos.alipayobjects.com/skylark/2911836d-5244-4479-8f34-133d94ccb393/attach/824/2f6b7145858ffc7a/Group.png)

从图中看出贝多芬一天中有三分之一的时间都在创作，甚至连散步都会带上纸和笔！而法国浪漫主义作家雨果很显然工作时间就没那么多，然后居然洗隔夜的冷水澡！

## 时间刻度盘的实现

上述是一个非常有意思的信息可视化例子，于是我决定使用自产的可视化引擎 [G2](/zh-cn/g2/3.x/index.html) 来实现一把这个可视化模板，仔细观察一把上面的图，其实可以看出这是一个非常有规律的饼图，它将一个圆划分为 24 等分，创造者日常的每项活动占比均是最小刻度的整倍数。所以我使用 G2 的多视图功能绘制下图：

<div id="c1"></div>

步骤如下：

1）模拟一份数据用于绘制 24 等分的饼图，数据结构如下：

```js
[{type:'0', value: 10},
  {type:'1', value: 10},
  ...
  {type:'23', value: 10}
]
```
2）绘制第一个视图：背景层的环图，在颜色映射上，我使用了回调函数，使得 type 为偶数时颜色为 "#E7E8EA" 奇数时为白色。

```js
const dv = new DataView();
dv.source(data)
  .transform({type:'percent',
    field: 'value',
    dimension: 'type',
    as: 'percent'
  });
const view = chart.view();
view.source(dv);
view.coord('theta', {innerRadius: 0.75});
view.intervalStack().position('percent')
  .color('type', function(val) {if (val % 2 === 0) {return'#E7E8EA';} else {return'#ffffff';}
  })
  .select(false);
```

![image](https://zos.alipayobjects.com/skylark/a52fa477-7762-4dc2-ad4f-f2923b71a885/attach/824/842cc271b962714a/image.png)

3）绘制第二层视图：最外圈带边框的环图。这个环图和背景层环图使用相同的数据，唯一不同的就是需要给样式加上边框，并设置填充颜色为透明色。

```js
const bgView = chart.view();
bgView.coord('theta', {innerRadius: 0.9});
bgView.source(dv);
bgView.intervalStack()
  .position('percent')
  .color('type', ['rgba(255, 255, 255, 0)' ])
  .style({stroke:'#444',
    lineWidth: 1
  })
  .select(false);
```

![image](https://zos.alipayobjects.com/skylark/89f46cbd-6d5f-4f8e-a15f-9e23304548a7/attach/824/ea6b9c30a41cbde1/image.png)

4）绘制第三层视图：表盘的刻度线。仔细观察图表，我们会发现一些用于标识刻度的线:

![image](https://zos.alipayobjects.com/skylark/100e999d-05ad-4ae2-84ae-033e4c3c83dc/attach/824/7b3c10f096011657/image.png)

这个其实可以使用宽度较细的柱状图绘制，在 size 的图形属性映射中，我会判断如果 type 值可被 3 整除，那么就会返回柱状图的宽度，否则宽度为 0，另外对于文本的标识，我也做了一个特殊的回调使得文本的显示更有意义。

```js
const text = ['MIDNIGHT', '3', '6 AM', '9', 'NOON', '3', '6 PM', '9'];
const intervalView = chart.view();
intervalView.source(data);
intervalView.coord('polar', {innerRadius: 0.9});
intervalView.axis(false);
intervalView.interval()
  .position('type*value')
  .size('type', val => {if (val % 3 === 0) {return 4;}
    return 0;
  })
  .color('#444')
  .label('type', val => {if (val % 3 === 0) {return text[val / 3];
    }
    return '';}, {
    offset: 25,
    textStyle: {fontSize: 16}
  });
```

![image](https://zos.alipayobjects.com/skylark/8b46079c-63bd-436f-9481-de6c14c5a5f9/attach/824/83a0db7fe6a5b192/image.png)

5）最后，可以使用 HTML 形式的 Guide 在环中心加一个文本标注，使得该图更具可读性~~

```js
intervalView.guide().html({position: ['50%','50%'],
  html: '<p style="width: 240px;height: 240px;line-height: 240px;text-align: center;margin: 0;padding: 0;border-radius: 50%;font-size: 48px;color: #609064">24 hours</p>'
});
```

![image](https://zos.alipayobjects.com/skylark/c3eca293-b642-410d-85e9-f5276908399e/attach/824/a357fb677e7ebf97/image.png)

到此就完成上述一个可视化作品。

完整代码：

```js+
const DataView = DataSet.DataView;
const text = ['MIDNIGHT', '3', '6 AM', '9', 'NOON', '3', '6 PM', '9'];
const data = [];
for (let i = 0; i < 24; i++) {const item = {};
  item.type = i + '';
  item.value = 10;
  data.push(item);
}

const chart = new G2.Chart({id:'c1',
  forceFit: true,
  height: 400,
  padding: [40],
  background: {fill:'#E7E8EA'}});
chart.legend(false);
chart.tooltip(false);

const dv = new DataView();
dv.source(data)
  .transform({type:'percent',
    field: 'value',
    dimension: 'type',
    as: 'percent'
  });
const view = chart.view();
view.source(dv);
view.coord('theta', {innerRadius: 0.75});
view.intervalStack()
  .position('percent')
  .color('type', val => {if (val % 2 === 0) {return'#E7E8EA';}
    return '#ffffff';
  })
  .select(false);

const bgView = chart.view();
bgView.coord('theta', {innerRadius: 0.9});
bgView.source(dv);
bgView.intervalStack()
  .position('percent')
  .color('type', ['rgba(255, 255, 255, 0)' ])
  .style({stroke:'#444',
    lineWidth: 1
  })
  .select(false);

const intervalView = chart.view();
intervalView.source(data);
intervalView.coord('polar', {innerRadius: 0.9});
intervalView.axis(false);
intervalView.interval()
  .position('type*value')
  .size('type', val => {if (val % 3 === 0) {return 4;}
    return 0;
  })
  .color('#444')
  .label('type', val => {if (val % 3 === 0) {return text[val / 3];
    }
    return '';}, {
    offset: 25,
    textStyle: {fontSize: 16}
  });
intervalView.guide().html({position: ['50%','50%'],
  html: '<p style="width: 240px;height: 240px;line-height: 240px;text-align: center;margin: 0;padding: 0;border-radius: 50%;font-size: 48px;color: #609064">24 hours</p>'
});
chart.render();
```


## 日常作息表的实现

<div id="c2"></div>

那么如何可视化创作者们的日常作息表呢，其实和上述思路相同，使用多视图的思路绘制：

1）首先，除了用户绘制表盘 24 等分背景的模拟数据外，我们还需要一份创作者一天的作息数据，如下所示（纯属虚构）：

```js
const userData = [{type:' 睡眠 ', value: 70},
  {type:' 淡茶 & 烟斗 & 冥想 ', value: 10},
  {type:' 写作 ', value: 10},
  {type:' 教课 ', value: 40},
  {type:' 酒吧吃肉配红酒 ', value: 40},
  {type:' 散步 ', value: 10},
  {type:' 拜访约瑟夫 ', value: 30},
  {type:' 阅读 ', value: 30},
];
```

2）绘制第一层视图，使用上分数据绘制环图，在这里对各个活动类型进行了颜色映射:

```js
const pieDv = new DataView();
pieDv.source(userData)
  .transform({type:'percent',
    field: 'value',
    dimension: 'type',
    as: 'percent'
  });
const pieView = chart.view();
pieView.source(pieDv);
pieView.coord('theta', {innerRadius: 0.75,});
pieView.intervalStack()
  .position('percent')
  .color('type', ['#fff', '#F2B971', '#7DAB74', '#94979A', '#F2B971', '#60C2D4', '#7AA471', '#C0DBC7'])
  .label('type', {offset: 20,})
  .select(false);
```

![image](https://zos.alipayobjects.com/skylark/0f975a4e-106e-4518-8a32-7d90dd4e4db0/attach/824/a4627864203b42ce/image.png)

因为对于『睡眠』这项活动使用了 #fff 白色，所以会导致环图看上去向缺了一块。

3）绘制第二层视图：表盘刻度，这个时候就需要使用模拟的数据源了

```js
const bgData = []; // 模拟数据，为了绘制 24 个扇形
for (let i = 0; i < 24; i++) {const item = {};
  item.type = `${i}`;
  item.value = 10;
  bgData.push(item);
}
const bgDv = new DataView();
bgDv.source(bgData)
  .transform({type:'percent',
    field: 'value',
    dimension: 'type',
    as: 'percent'
  });
const bgView = chart.view();
bgView.source(bgDv);
bgView.coord('theta', {innerRadius: 0.9,});
bgView.intervalStack().position('percent')
  .color('type', ['rgba(255, 255, 255, 0)'])
  .style({stroke:'#000',
    lineWidth: 1,
  })
  .select(false);
```

![image](https://zos.alipayobjects.com/skylark/0af34dc4-4049-4052-a84b-a368d4a2146a/attach/824/47d2687acca00899/image.png)

4）最后为了更显而易见得标识该作息表属于哪一位创作者，我们可以充分利用环图中的空心圆空间，来展示创作者的头像~ 这里我们还是使用 html 形式的 Guide 实现（因为我真的不会抠图，所以就拿官网现成的玉伯头像了，因为刚好是个圆形，嘻嘻）。

```js
bgView.guide().html({position: ['50%','50%'],
  html: '<img style="width: 240px;height: 240px;"src="https://os.alipayobjects.com/rmsportal/nbvqDjRaAhkxDmz.png">'
});
```

![image](https://zos.alipayobjects.com/skylark/53dba0ba-8ece-4107-b391-171a78afca90/attach/824/2ccde52ccb76e680/image.png)

完整代码：

```js+
const {DataView} = DataSet;
const bgData = []; // 模拟数据，为了绘制 24 个扇形
for (let i = 0; i < 24; i++) {const item = {};
  item.type = 'i';
  item.value = 10;
  bgData.push(item);
}
const userData = [{type:' 睡眠 ', value: 70},
  {type:' 淡茶 & 烟斗 & 冥想 ', value: 10},
  {type:' 写作 ', value: 10},
  {type:' 教课 ', value: 40},
  {type:' 酒吧吃肉配红酒 ', value: 40},
  {type:' 散步 ', value: 10},
  {type:' 拜访约瑟夫 ', value: 30},
  {type:' 阅读 ', value: 30},
];
const chart = new G2.Chart({id:'c2',
  forceFit: true,
  height: 400,
  padding: [20, 110, 30, 70]
});
chart.legend(false);
chart.tooltip(false);

const pieDv = new DataView();
pieDv.source(userData)
  .transform({type:'percent',
    field: 'value',
    dimension: 'type',
    as: 'percent'
  });
const pieView = chart.view();
pieView.source(pieDv);
pieView.coord('theta', {innerRadius: 0.75,});
pieView.intervalStack()
  .position('percent')
  .color('type', ['#fff', '#F2B971', '#7DAB74', '#94979A', '#F2B971', '#60C2D4', '#7AA471', '#C0DBC7'])
  .label('type', {offset: 20,})
  .select(false);

const bgDv = new DataView();
bgDv.source(bgData)
  .transform({type:'percent',
    field: 'value',
    dimension: 'type',
    as: 'percent'
  });
const bgView = chart.view();
bgView.source(bgDv);
bgView.coord('theta', {innerRadius: 0.9,});
bgView.intervalStack().position('percent')
  .color('type', ['rgba(255, 255, 255, 0)' ])
  .style({stroke:'#000',
    lineWidth: 1,
  })
  .select(false);
bgView.guide().html({position: ['50%','50%'],
  html: '<img style="width: 240px;height: 240px;"src="https://os.alipayobjects.com/rmsportal/nbvqDjRaAhkxDmz.png">'
});
chart.render();
```

至此一张信息丰富有意思的作息时间表就完成了，当然这只是 G2 实现的一种方式，在绘制完之后，我发现其实我还可以使用 chart.polygon() 结合极坐标来绘制~ 有兴趣的同学可以试试哦，上述任何地方如果不对或者纰漏欢迎大家指正~~ 

最后用书中的一句话结尾：

> 每个人都应该认真检视自己的弱点，规划作息时要让自己免于堕入这些糟糕习惯的窠臼。
