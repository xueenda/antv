const plotByName = {
    area:    { index: 0, icon: '', name: '面积图', url: '#', },
    bar:     { index: 0, icon: '', name: '柱状图', url: '#', },
    box:     { index: 0, icon: '', name: '箱形图', url: '#', },
    funnel:  { index: 0, icon: '', name: '漏斗图', url: '#', },
    geo:     { index: 0, icon: '', name: '地图', url: '#', },
    guage:   { index: 0, icon: '', name: '仪表盘', url: '#', },
    heatmap: { index: 0, icon: '', name: '热力图', url: '#', },
    line:    { index: 0, icon: '', name: '折线图', url: '#', },
    other:   { index: Infinity, icon: '', name: '其他图表', url: '#', },
    pie:     { index: 0, icon: '', name: '饼图'  , url: '#', },
    point:   { index: 0, icon: '', name: '点图'  , url: '#', },
    radar:   { index: 0, icon: '', name: '雷达图', url: '#', },
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
