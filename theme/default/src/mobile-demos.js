import $ from 'jquery';
// import inView from './utils/in-view';

import './drawer';
import './mobile-demos.less';

$('.screenshot').each(function () {
    const $img = $(this);
    $img.attr('data-src', $img.data('default'));
    $img.attr('src', `${__meta.assets}/image/screenshot-placeholder.png`);
});

$('.lazyload').lazyload();

// function adjustScreenshotsSize() {
//     $('.screenshot').each(function () {
//         // const $screenshot = $(this);
//         // $screenshot.height($screenshot.width() / 16 * 9);
//     });
// }

// adjustScreenshotsSize();

// $(window).resize(adjustScreenshotsSize);

const $menu = $('.menu');
const $body = $(document.body);

// const DRAWER_TOGGLE_SELECTOR = '.drawer-toggle';
const DRAWER_OPEN = 'drawer-open';
// const $toggle = $(DRAWER_TOGGLE_SELECTOR);

$menu.find('.menu-inner').click(() => {
    if ($menu.hasClass('collapsed')) {
        // e.preventDefault();
        // e.stopPropagation();
        $menu.removeClass('collapsed');
    }

});
$menu.find('.list-group-item').click(() => {
    $body.toggleClass(DRAWER_OPEN);
});
