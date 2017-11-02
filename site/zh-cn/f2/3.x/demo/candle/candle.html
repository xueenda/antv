<!--
index: 0
title: 蜡烛图
resource:
  jsFiles:
    - ${url.jquery}
-->
<script>
// 设置屏幕像素比
F2.Global.pixelRatio = window.devicePixelRatio;
//获取本地数据
$.getJSON('/assets/data/candleSticks.json',function(data){
    data = data.slice(0, 100); // 仅显示100 个
    //数据处理
    data.sort(function(obj1, obj2) {
      return obj1.time > obj2.time ? 1 : -1;
    });
    data.forEach(function(obj) {
      obj.range = [ obj.start, obj.end, obj.max, obj.min ];
      obj.trend = (obj.start <= obj.end) ? 0 : 1;
    });
    const chart = new F2.Chart({
      id: 'mountNode'
    });
    // 配置刻度文字大小，供PC端显示用(移动端可以使用默认值20px)
    chart.axis('range', {
      label: {
        fontSize: 14
      }
    });
    // 配置time刻度文字样式
    const label = {
      fill: '#979797',
      font: '14px san-serif',
      offset: 6
    };
    chart.axis('time', {
      label(text, index, total) {
        const cfg = label;
        // 第一个点左对齐，最后一个点右对齐，其余居中，只有一个点时左对齐
        if (index === 0) {
          cfg.textAlign = 'start';
        }
        if (index > 0 && index === total - 1) {
          cfg.textAlign = 'end';
        }
        return cfg;
      }
    });
    chart.source(data, {
      range: {
        tickCount: 5
      },
      time: {
        tickCount: 3
      }
    });
    chart.schema().position('time*range')
      .color('trend', function(trend) {
        return [ '#C00000', '#19B24B' ][trend];
      })
      .shape('candle');
    chart.render();
});
</script>
