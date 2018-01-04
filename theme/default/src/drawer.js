import $ from 'jquery';
import './drawer.less';

const $body = $(document.body);
const DRAWER_TOGGLE_SELECTOR = '.drawer-toggle';
const DRAWER_OPEN = 'drawer-open';
const $toggle = $(DRAWER_TOGGLE_SELECTOR);

$toggle.on('click', function () {
    $body.toggleClass(DRAWER_OPEN);
    if ($body.hasClass(DRAWER_OPEN)) {
        $toggle.find('.iconfont').removeClass('icon-menu-fold').addClass('icon-menu-unfold');
    } else {
        $toggle.find('.iconfont').removeClass('icon-menu-unfold').addClass('icon-menu-fold');
    }
});

$('.drawer-overlay').on('click', () => {
    $body.removeClass(DRAWER_OPEN);
});
