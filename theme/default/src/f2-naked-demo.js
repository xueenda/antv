import $ from 'jquery';
import TouchEmulator from 'hammer-touchemulator';
import './f2-naked-demo.less';

TouchEmulator.template = function(touch) {
  const size = 30;
  const transform = 'translate(' + (touch.clientX - (size / 2)) + 'px, ' + (touch.clientY - (size / 2)) + 'px)';
  return {
    position: 'fixed',
    left: 0,
    top: 0,
    background: '#999',
    border: 'solid 1px #999',
    opacity: .6,
    borderRadius: '100%',
    height: size + 'px',
    width: size + 'px',
    padding: 0,
    margin: 0,
    display: 'block',
    overflow: 'hidden',
    pointerEvents: 'none',
    webkitUserSelect: 'none',
    mozUserSelect: 'none',
    userSelect: 'none',
    webkitTransform: transform,
    mozTransform: transform,
    transform: transform
  };
};

TouchEmulator();

// 手机端相应
const userAgent = navigator.userAgent;
const mobile = !!userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i);
let pathname = window.location.pathname;
pathname = pathname.split('/')[1];
if (mobile && pathname === 'assets') { // in mobile
  const chartName = $('meta[name="chart-name"]').attr('content');
  const url = window.location.protocol + '//' + window.location.host + '/zh-cn/f2/3.x/demo/mobile-index.html';
  $(`
  <div class="header">
    <a class="icon" href="${url}"></a>
    ${chartName}
  </div>`).insertBefore('.chart-wrapper');

  // 监听横竖屏
  window.addEventListener('orientationchange', function() {
    if ( window.orientation == 180 || window.orientation==0 ) {
      window.location.reload();
    }
    if( window.orientation == 90 || window.orientation == -90 ) {
      window.location.reload();
    }
});
}
