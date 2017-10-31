const plotByName = {
    point:       { index: 0,  icon: '', url: '#', name: '点图', },
    line:        { index: 1,  icon: '', url: '#', name: '折线图', },
    area:        { index: 2,  icon: '', url: '#', name: '面积图', },
    column:      { index: 3,  icon: '', url: '#', name: '柱状图', },
    candle:      { index: 4,  icon: '', url: '#', name: 'k线图', },
    pie:         { index: 5,  icon: '', url: '#', name: '饼图', },
    radar:       { index: 6, icon: '', url: '#', name: '雷达图', },
    other:       { index: 10, icon: '', url: '#', name: '其他图表', },
    
};
module.exports = {
    // TODO
    plotByName,
    keywords: [
        'F2',
        'Chart',
        '图表',
        '移动端图表',
    ],
    description: 'F2 是一个由纯 JavaScript 编写、强大、高性能的的语义化图表生成工具，它提供了一整套图形语法，可以让用户通过简单的语法搭建出无数种图表，是为移动端而准备的强大的可视化工具。'
};
