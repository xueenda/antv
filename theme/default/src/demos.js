import $ from 'jquery';
import tocbot from 'tocbot';
import getQueryVariable from './utils/get-query-variable';
import './demos.less';

const theme = getQueryVariable('theme');
const isDark = theme === 'dark';

$('.theme-switching .btn').each(function () {
    const $btn = $(this);
    if (isDark) {
        if ($btn.data('theme') === 'dark') {
            $btn.removeClass('btn-light').addClass('btn-primary');
        } else {
            $btn.removeClass('btn-primary').addClass('btn-light');
        }
    }
});

tocbot.init({
    tocSelector: '.toc',
    contentSelector: '.demos .content',
    headingSelector: 'h1, h2, h3, h4, h5, h6',
    collapseDepth: 4
});

const $tocContainer = $('.toc-container');
$('header').headroom({
    offset: 205,
    tolerance: 5,
    classes: {
        initial: 'animated',
        pinned: 'slideDown',
        unpinned: 'slideUp'
    },
    onPin() {
        $tocContainer.css({
            top: '104px',
            height: 'calc(100% - 120px)',
        });
    },
    onUnpin() {
        $tocContainer.css({
            top: '32px',
            height: 'calc(100% - 48px)',
        });
    }
});

$('.screenshot').each(function () {
    const $img = $(this);
    if (isDark) {
        $img.attr('data-src', $img.data('dark'));
    } else {
        $img.attr('data-src', $img.data('default'));
    }
});

$('.lazyload').lazyload();
