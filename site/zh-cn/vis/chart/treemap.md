<!--
title: 矩形树图
tags:
  - compare
  - proportion
  - relation
-->

# 矩形树图

<img src="https://os.alipayobjects.com/rmsportal/FnvUGbKsEPqztPm.jpg" />

## 矩形树图的简介

矩形树图由马里兰大学教授Ben Shneiderman于上个世纪90年代提出，起初是为了找到一种有效了解磁盘空间使用情况的方法。
矩形树图适合展现具有层级关系的数据，能够直观体现同级之间的比较。一个Tree状结构转化为平面空间矩形的状态，就像一张地图，指引我们发现探索数据背后的故事。

矩形树图采用矩形表示层次结构里的节点，父子节点之间的层次关系用矩形之间的相互嵌套隐喻来表达。从根节点开始，屏幕空间根据相应的子节点数目被分为多个矩形，矩形的面积大小通常对应节点的属性。每个矩形又按照相应节点的子节点递归的进行分割，知道叶子节点为止。

矩形树图的好处在于，相比起传统的树形结构图，矩形树图能更有效得利用空间，并且拥有展示`占比`的功能。矩形树图的缺点在于，当分类占比太小的时候文本会变得很难排布。相比起分叉树图，矩形树图的树形数据结构表达的不够直观、明确。

矩形树图的布局算法非常多，而且经常为可视化工程师津津乐道。但介绍具体实现并不是AntV目前的职责，有兴趣的同学可以参见拓展阅读部分。

英文名：Treemap, Rectangular Tree

## 矩形树图的构成

<img style="float:right" class="article-img-3" src="https://os.alipayobjects.com/rmsportal/VmNFvGKUweJEykK.png" />

<table class="struct-table">
  <tr>
    <th>图表类型</th>
    <th>矩形树图</th>
  </tr>
  <tr>
    <td>适合的数据</td>
    <td>带权的树形数据</td>
  </tr>
  <tr>
    <td>功能</td>
    <td>表示树形数据的树形关系，及各个分类的<code>占比</code>关系</td>
  </tr>
  <tr>
    <td>数据与图形的映射</td>
    <td>树形关系映射到位置，占比数值数据映射到大小。设置颜色增强分类的区分度
    </td>
  </tr>
  <tr>
    <td>适合的数据条数</td>
    <td>大于5个分类</td>
  </tr>
</table>

<div style="clear: both;"></div>

## 矩形树图的应用场景

### 适合的场景

 **适合展示带权的树形数据**。

例子1：下图是2015年手机品牌及其下属手机型号的销量信息。

<div id="c1"></div>
<div class="code hide">
$.getJSON('./data/mobile.json',function (data) {
        var Stat = G2.Stat;
        var chart = new G2.Chart({
          id: 'c1',
          width: 1000,
          height: 500,
          animate: false // 阻止动画
        });
        chart.source(data);
        chart.tooltip({
          map: {
            title: 'name',
            value: 'value'
          }
        });
        chart.axis(false);
        chart.legend(false);
        chart.polygon().position(Stat.treemap('1*value'))
          .color('name')
          .label('name')
          .style({
          stroke: '#fff',
          lineWidth: 1
        });;
        chart.render();
        function findNode (name,nodes) {
          var rst = null;
          for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            if (node.name === name) {
              rst = node;
            }
            if (!rst && node.children) {
              rst = findNode(name,node.children);
            }
            if (rst) {
              break;
            }
          }
          return rst;
        }
        var expanded = false;
        chart.on('plotclick',function(ev){
          var point = ev.data;
          if (point) {
            var name = point._origin.name;
            var node = findNode(name,data);
            var nodes;
            if (!expanded) { // 未展开
              if (node.children) {
                nodes = node.children;
              } else {
                nodes = [node];
              }
              chart.clear();
              chart.source(nodes);
              chart.polygon().position(Stat.treemap('1*value')).color(point.color)
                .label('name', {
                offset: -2,
                label:{
                  fontSize: 10
                }
              })
                .style({
                stroke: '#fff',
                lineWidth: 1
              });
              chart.render();
              expanded = true;
            } else { //已经展开
              chart.clear();
              chart.source(data);
              chart.polygon().position(Stat.treemap('1*value')).color('name')
                .label('name', {
                label: {
                  fontSize: 12
                }
              })
                .style({
                stroke: '#fff',
                lineWidth: 1
              });
              chart.render();
              expanded = false;
            }
          }
        });
      });
</div>

说明：
 * 同一级别的树通过算法，按各自权重大小（手机销量占比）将坐标系分割成若干个矩形块，设置颜色增强分类的区分度。
 * 交互，点击矩形块可下钻到子分支。

### 不适合的场景

**没有权重关系，且需要明显展示层级关系，用分叉树图更合适** 

例子2：某公司组织部门图。第一个图是用矩形树图绘制，没有权重，层次不清。第二个图用分叉树图绘制，部门组织层级清晰明了。

<div id="c2"></div>
<div class="code hide">
var data = 		
    [{
    "name": "总经理",
        "value":1
    },
    {
        "name": "运营总监",
        "value":1
    },
    {
        "name": "职能总监",
        "value":1
    },
    {
        "name": "人事部",
        "value":1
    },
    {
        "name": "行政部",
        "value":1
    },
    {
        "name": "财务部",
        "value":1
    },
    {
        "name": "服务总监",
        "value":1
    },
    {
        "name": "技术部",
        "value":1
    },
    {
        "name": "客服部",
        "value":1
    },
    {
        "name": "售后部",
        "value":1
    },
    {
        "name": "市场总监",
        "value":1
    },
    {
        "name": "企划部",
        "value":1
    },
    {
        "name": "推广部",
        "value":1
    },
    {
        "name": "广告部",
        "value":1
    },
    {
        "name": "公关部",
        "value":1
    }
                        
    ];
    var Stat = G2.Stat;
    var chart = new G2.Chart({
        id: 'c2',
        width: 1000,
        height: 500,
        animate: false // 阻止动画
    });
    chart.source(data);
    chart.tooltip({
        map: {
        title: 'name',
        value: 'value'
        }
    });
    chart.axis(false);
    chart.legend(false);
    chart.polygon().position(Stat.treemap('1*value'))
        .color('name')
        .label('name')
        .style({
        stroke: '#fff',
        lineWidth: 1
    });;
    chart.render();
</div>


<div id="c3"></div>
<div class="code hide">
    var data = [{
    "name": "总经理",
    "children": [{
        "name": "运营总监",
        "children": [{
        "name": "职能总监",
        "children": [{
            "name": "人事部"
        },{
            "name": "行政部"
        },{
            "name": "财务部"
        }]
        },{
        "name": "服务总监",
        "children": [{
            "name": "技术部"
        },{
            "name": "客服部"
        },{
            "name": "售后部"
        }]
        },{
        "name": "市场总监",
        "children": [{
            "name": "企划部"
        },{
            "name": "推广部"
        },{
            "name": "广告部"
        },{
            "name": "公关部"
        }]
        }]
    }]
    }];
    var Layout = G2.Layout;
    var Stat = G2.Stat;
    var chart = new G2.Chart({
    id: 'c3',
    width: 1000,
    height: 500,
    animate: false,
    plotCfg: {
        margin: [20,50]
    }
    });
    // 不显示title
    chart.tooltip({
    title: null
    }); 
    // 不显示图例
    chart.legend(false);
    // 使用layout，用户可以自己编写自己的layout
    // 仅约定输出的节点 存在 id,x，y字段即可
    var layout = new Layout.Tree({
    nodes: data,
    dx: 80 / 1000 // 单位宽度，由于按照宽高 1来计算的，所以需要传入比例值
    });
    var nodes = layout.getNodes();
    var edges = layout.getEdges();
    // 首先绘制 edges，点要在边的上面
    // 创建单独的视图
    var edgeView = chart.createView();
    edgeView.source(edges);
    edgeView.coord().reflect(); // 
    edgeView.axis(false);
    edgeView.tooltip(false);
    // Stat.link 方法会生成 ..x, ..y的字段类型，数值范围是 0-1
    edgeView.edge()
    .position(Stat.link('source*target',nodes))
    .shape('vhv')
    .color('#ccc');
    // 自定义部门的图形
    G2.Shape.registShape('point', 'depart', {
    drawShape: function(cfg, group) {
        var x = cfg.x;
        var y = cfg.y;
        var width = 60;
        var height = 30;
        var shape = group.addShape('rect', {
        attrs: {
            x: x - width / 2,
            y: y - height / 2,
            width: width,
            height: height,
            fill: '#fff',
            stroke: 'black'
        }
        });
        return shape;
    }
    });
    // 创建节点视图
    var nodeView = chart.createView();
    nodeView.coord().reflect(); //'polar'
    nodeView.axis(false);
    // 节点的x,y范围是 0，1
    // 因为边的范围也是 0,1所以正好统一起来
    nodeView.source(nodes, {
    x: {min: 0,max:1},
    y: {min: 0, max:1},
    value: {min: 0}
    });
    nodeView.point().position('x*y').color('steelblue')
    .shape('depart')
    .label('name', {
    offset: 0
    })
    .tooltip('name');
    chart.render();
</div>

## 矩形树图与其他图表的对比

### 矩形树图和[马赛克图](mosaic.html)

* 矩形树图用于展示树形数据，是关系型数据。马赛克图用于分析列表数据，是非关系型数据。

### 矩形树图和分叉树图（分叉树图介绍敬请期待）

* 矩形树图用于展示带权的数据，分叉树图用于展示不带权的数据
* 两个图表都用于展示层次数据，但是分叉树图展示的层次关系更清晰
* 矩形树图能更多的展现树形结构内部的占比关系，分叉树图没有这个能力

## 矩形树图的扩展阅读
* [矩形树布局](https://github.com/mbostock/d3/wiki/%E7%9F%A9%E5%BD%A2%E6%A0%91%E5%B8%83%E5%B1%80)
* [treemapart](https://treemapart.wordpress.com/)
* [treemap](http://www.datavizcatalogue.com/methods/treemap.html)
