<!--
template: home
title: G6
keywords:
  - G6
  - Graph
  - Tree
  - Net
  - 图
  - 树
  - 网
description: G6 是解决流程图和关系分析的图表库，集成了大量的交互，可以轻松的进行动态流程图和关系网络的开发。
featuresCards:
  - img: ${assets}/image/home/features-simple.svg
    title: 完备的基础设施
    description: 简单、易用、完备的图可视化引擎。
  - img: ${assets}/image/home/features-professional.svg
    title: 丰富插件
    description: 丰富、优雅、易于复用的解决方案
  - img: ${assets}/image/home/features-powerful.svg
    title: 强大扩展能力
    description: 轻易订制，满足你无限的创意
footer:
  isDark: true
resource:
  jsFiles:
    - ${url.g6}
    - ${url['g6-plugins']}
-->

<style>
.node-tool {
  border-radius: 6px;
  padding: 6px;
  font-size: 14px;
  color: #666;
  list-style-type:none;
  background: #fff;
  box-shadow: 0 2px 5px #ccc;
}
.node-tool li {
  padding: 4px 2px;
}
.node-tool li:hover {
  color: #26A8FB;
  cursor: pointer;
}
.outter-graph-container{
    position: absolute;
    top: 20px;
    left: 500px;
    white-space:nowrap;
    width: 730px;
    z-index: 1;
}
.intro .header{
    position: relative
}
.texts {
    z-index: 2;
}
</style>

<section class="intro">
    <div class="container">
        <div class="header row">
            <div class="col-md-5 texts">
                <h1>G6关系图类库</h1>
                <p class="main-info">G6 是解决流程图和关系分析的图表库，集成了大量的交互，可以轻松的进行动态流程图和关系网络的开发。</p>
                <a href="{{ products.g6.links.demo.href }}" class="btn btn-primary btn-lg btn-round-link">{{ resource.translate.demo }}</a>
                <a href="{{base}}zh-cn/g6/1.x/tutorial/index.html#_安装" class="btn btn-light border btn-lg btn-round-link">{{ resource.translate.downloadAndUse }}</a>
                <iframe class="btn-round-link btn btn-light btn-lg github-btn" src="https://ghbtns.com/github-btn.html?user=antvis&repo=g6&type=star&count=true&size=large" frameborder="0" scrolling="0" width="170px" height="20px"></iframe>
            </div>
            <div id="c1" class="outter-graph-container"></div>
        </div>
    </div>
</section>

<section class="features text-center">
    <div class="container">
        <div class="row">
            {% for card in featuresCards %}
            <div class="feature col-md-4 text-center">
                <img src="{{ card.img }}" alt="" width="120" height="120">
                <h5>{{ card.title }}</h5>
                <div class="detail">{{ card.description }}</div>
            </div>
            {% endfor %}
        </div>
    </div>
</section>

<section class="get-started text-center">
<div class="container">
    <h2>快速接入</h2>
    <p>通过 <code>&lt;script&gt;</code> 标签引入：</p>
    
```html
<!-- 引入在线资源 -->
<script type="{{ url.g6 }}"></script>
```

<p class="pt-32">通过 <code>&lt;npm&gt;</code> 安装：</p>

```js
npm install @antv/g6 --save
```

</div>
<a href="{{ products.g6.links.tutorial.href }}"  class="btn btn-primary btn-lg btn-round-link more-tutorial">更多教程</a>
</section>

<!-- chart1 -->

```js-
G6.Global.modalRectStyle = {
    fill: '#F8FAFE',
    fillOpacity: 0.7
}
$.getJSON('/assets/data/g6-index.json', data => {
    data.nodes.forEach(node=>{
        delete node.color;
    })
    const Plugins = G6.Plugins;
    const Util = G6.Util;
    const layoutCfg = {
    width: 500,
    height: 460,
    center: {
        x: 380,
        y: 260
    }
    };
    const grid = new G6.Layouts['grid'](Util.mix({}, layoutCfg, {
        center: {
            x: layoutCfg.center.x,
            y: layoutCfg.center.y+30
        }
    }));
    const dagre = new G6.Layouts['dagre']({
    nodesep: ()=>{
        return layoutCfg.width/50;
    },
    ranksep: ()=>{
        return layoutCfg.height/25;
    },
    useEdgeControlPoint: false,
    marginx: layoutCfg.center.x/4,
    marginy: layoutCfg.center.y/4
    });
    const circle = new G6.Layouts['circle'](layoutCfg);
    const force = new G6.Layouts['d3.force'](Util.mix({
        manyBodyDistanceMax: ()=>{
            return 210;
        },
    forceCollideRadius: node => {
        return Math.max(node.width, node.height) / 2 + 12;
    }
    },layoutCfg));
    const Mapper = Plugins['enhance.d3.mapper'];
    const nodeSizeMapper = new Mapper('node', 'weight', 'size', [4, 20], {
    legendCfg: null
    });
    const edgeSizeMapper = new Mapper('edge', 'weight', 'size', [1, 8], {
    legendCfg: null
    });
    const nodeColorMapper = new Mapper('node', 'weight', 'color', [ '#E0F5FF', '#BAE7FF', '#91D5FF', '#69C0FF' , '#3DA0F2', '#1581E6', '#0860BF'], {
        legendCfg: null
    });
    const template = new Plugins['template.analysis.maxSpanningForest']({
        arrow: null
    });
    const net = new G6.Net({
        id: 'c1',
        height: 580,
        useAnchor: null,
        layout: force,
        plugins: [ template, nodeSizeMapper, edgeSizeMapper, nodeColorMapper ],
        animate: true
    });
    net.source(data);
    let changeLayoutable = true;
    data.nodes.sort((a, b)=>{
    return b.weight - a.weight;
    });
    net.node().style({
    fillOpacity: 1
    });
    net.edge().style(model=>{
        return {
            stroke: net.find(model.target).getShapeCfg().color,
            strokeOpacity: 0.8
        };
    });
    net.on('dommouseenter', ()=>{
    changeLayoutable = false;
    });
    net.on('dommouseleave', ev=>{
    if( ev.toElement && ev.toElement.className !== 'node-tool'){
        changeLayoutable = true;
    }
    });
    net.removeBehaviour(['wheelZoom', 'dragCanvas']);
    net.render();
setInterval(()=>{
  if(document.visibilityState === 'visible' && changeLayoutable){
    let layouts = [grid, circle, dagre, force];
    layouts = Util.filter(layouts, layout=>{
      return layout !== net.get('layout');
    });
    const layout = layouts[parseInt(layouts.length * Math.random())];
    const nodes = net.getNodes();
    // net.clearAllActived();
    net.changeLayout(layout);
  }
  
}, 2000);
});
```

<!-- chart2 -->

```js-
```

<!-- chart3 -->

```js-
```
