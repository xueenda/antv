const plotByName = {
    area:    { index: 4,  icon: '', url: '#', name: '面积图', },
    bar:     { index: 1,  icon: '', url: '#', name: '柱状图', },
    box:     { index: 5,  icon: '', url: '#', name: '箱形图', },
    funnel:  { index: 8,  icon: '', url: '#', name: '漏斗图', },
    geo:     { index: 9,  icon: '', url: '#', name: '地图', },
    diagram: { index: 12, icon: '', url: '#', name: '关系图', },
    guage:   { index: 7,  icon: '', url: '#', name: '仪表盘', },
    heatmap: { index: 6,  icon: '', url: '#', name: '热力图', },
    line:    { index: 0,  icon: '', url: '#', name: '折线图', },
    other:   { index: 99, icon: '', url: '#', name: '其他图表', },
    facet:   { index: 11, icon: '', url: '#', name: '分面', },
    pie:     { index: 2,  icon: '', url: '#', name: '饼图', },
    point:   { index: 3,  icon: '', url: '#', name: '点图', },
    radar:   { index: 10, icon: '', url: '#', name: '雷达图', },
};
module.exports = {
    // TODO
    plotByName,
    keywords: [
        'G2',
        'Chart',
        '图表',
        '统计图表',
    ],
    description: 'G2(The Grammar Of Graphics)是一个由纯 JavaScript 编写、强大的语义化图表生成工具，它提供了一整套图形语法，可以让用户通过简单的语法搭建出无数种图表，并且集成了大量的统计工具，支持多种坐标系绘制，可以让用户自由地定制图表，是为大数据时代而准备的强大的可视化工具。'
};
