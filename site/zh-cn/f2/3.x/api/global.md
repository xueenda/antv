<!--
index: 6
title: 全局配置项
-->

# Global

Global 是 F2 中的全局配置项，全局配置项包含了以下内容：

* 图表本身的一些默认属性，如边框、屏幕像素比、默认字体等
* 数据图形映射相关的属性，例如默认的颜色、默认的形状、默认的大小，柱状图的默认宽度
* 坐标轴、辅助文本的默认样式


## 属性

### 一些全局的参数

```js
const Global = {
  // 宽度的占比
  widthRatio: { // 宽度所占的分类的比例
    column: 1 / 2, // 一般的柱状图占比 1/2
    rose: 0.999999, // 玫瑰图的占的宽度
    multiplePie: 3 / 4, // 多层饼图的宽度
    dodgeMargin: 1 / 2 // 分组柱状图的间距
  },
  // 动画降频倍数
  animateReduceMultiple: 1,
  // 虚线配置
  lineDash: [ 5, 15 ]
};

```

### [皮肤主题相关](#皮肤主题相关)

```js
const axisLineColor = '#999999';
const lineColor = '#E9E9E9';
const defaultAxis = {
  label: {
    fillStyle: '#979797',
    font: '20px san-serif'
  },
  labelOffset: 6,
  line: {
    stroke: lineColor,
    lineWidth: 1
  },
  grid: {
    stroke: lineColor,
    lineWidth: 1
  },
  tickLine: null
};

const defaultFont = {
  fontStyle: '',
  fontVariant: '',
  fontWeight: '',
  fontSize: '12px',
  fontFamily: '"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", SimSun, "sans-serif"'
};

const Theme = {
  defaultFont, // 默认字体
  pixelRatio: 1, // 屏幕像素比
  padding: [ 40, 40, 40, 40 ], // 默认的边框
  // 颜色
  colors: [ '#4E7CCC', '#36B3C3', '#4ECDA5', '#94E08A', '#E2F194', '#EDCC72', '#F8AB60', '#F9815C', '#EB4456', '#C82B3D' ],
  shapes: { // 不同图表类型默认的形状
    line: [ 'line', 'dash' ],
    point: [ 'circle', 'hollowCircle' ]
  },
  opacities: [ 0.1, 0.9 ], // 默认的透明度范围
  sizes: [ 4, 10 ], // 默认的大小范围
  axis: { // 坐标轴的配置信息
    bottom: Util.deepMix({}, defaultAxis, {
      line: {
        stroke: axisLineColor
      },
      label: {
        textBaseline: 'hanging'
      },
      labelOffset: 12,
      gridAttrs: {},
      grid(text, index, total) {
        if (index === 0 || index === total - 1) {
          return null;
        }
        return Util.mix({}, defaultAxis.grid, Theme.axis.bottom.gridAttrs);
      }
    }),
    left: Util.deepMix({}, defaultAxis, {
      label: {
        textAlign: 'end'
      },
      line: null,
      tickLine: null
    }),
    right: Util.deepMix({}, defaultAxis, {
      label: {
        textAlign: 'start'
      },
      line: null,
      tickLine: null,
      grid: null
    }),
    circle: Util.deepMix({}, defaultAxis, {
      line: {
        stroke: axisLineColor
      }
    }),
    radius: Util.deepMix({}, defaultAxis, {})
  },
  guide: { // 辅助元素的配置信息
    line: {
      stroke: '#000',
      lineWidth: 1
    },
    text: {
      fill: '#000',
      textAlign: 'center'
    },
    rect: {
      fillStyle: '#fafafa'
    },
    arc: {
      stroke: '#CCC'
    },
    html: {
      offset: [ 0, 0 ],
      align: 'cc'
    }
  }
};
  
```

## 方法

`F2.Global` 提供了一个方法：`setTheme(cfg)` 设置主题。

### Global.setTheme

`Global.setTheme(cfg)`

- `object`
  
  用户自定义的主题配置。

常用配置示例

```javascript
F2.Global.setTheme({
  pixelRatio : 2
}); // 设为双精度
```

### 修改全局配置项的方式

可以有两种方式来改变全局的配置项：

*  修改具体的某个配置，直接通过 F2.Global 来修改对应属性的配置信息
*  通过设置皮肤样式，修改一系列的配置项

#### 修改单个配置项

```js
F2.Global.pixelRatio = 2;

F2.Global.colors = ['red', 'blue'];
```

#### 设置皮肤

```js
  F2.Global.setTheme({
    colors: ['red','blue'],
    pixelRatio: 2,
    guide: {
      line: {
        stroke: 'red',
        lineWidth: 2
      }
    }
});
```
