<!--
index: 0
title: 面积图
resource:
  jsFiles:
-->

<script>
  // 设置屏幕像素比
  F2.Global.pixelRatio = window.devicePixelRatio;
  const data = [
      { time: '2016-08-08 00:00:00', tem: 10, city: 'beijing' },
      { time: '2016-08-08 00:10:00', tem: 22, city: 'beijing' },
      { time: '2016-08-08 00:30:00', tem: 16, city: 'beijing' },
      { time: '2016-08-09 00:35:00', tem: 26, city: 'beijing' },
      { time: '2016-08-09 01:00:00', tem: 12, city: 'beijing' },
      { time: '2016-08-09 01:20:00', tem: 26, city: 'beijing' },
      { time: '2016-08-10 01:40:00', tem: 18, city: 'beijing' },
      { time: '2016-08-10 02:00:00', tem: 26, city: 'beijing' },
      { time: '2016-08-10 02:20:00', tem: 12, city: 'beijing' },
      { time: '2016-08-08 00:00:00', tem: 28, city: 'newYork' },
      { time: '2016-08-08 00:10:00', tem: 16, city: 'newYork' },
      { time: '2016-08-08 00:30:00', tem: 26, city: 'newYork' },
      { time: '2016-08-09 00:35:00', tem: 12, city: 'newYork' },
      { time: '2016-08-09 01:00:00', tem: 26, city: 'newYork' },
      { time: '2016-08-09 01:20:00', tem: 20, city: 'newYork' },
      { time: '2016-08-10 01:40:00', tem: 29, city: 'newYork' },
      { time: '2016-08-10 02:00:00', tem: 16, city: 'newYork' },
      { time: '2016-08-10 02:20:00', tem: 22, city: 'newYork' }
  ];
  const chart = new F2.Chart({
    id: 'mountNode',
    pixelRatio: window.devicePixelRatio
  });
  chart.source(data, {
    time: {
      type: 'timeCat',
      tickCount: 3,
      range: [ 0, 1 ]
    },
    tem: {
      tickCount: 5,
      min: 0
    }
  });
    // 配置刻度文字大小，供PC端显示用(移动端可以使用默认值20px)
  chart.axis('tem', {
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
  chart.area().position('time*tem')
    .color('city')
    .shape('smooth')
    .style({
      opacity: 0.6
    });
  chart.render();
</script>
