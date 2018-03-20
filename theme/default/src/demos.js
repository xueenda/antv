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
            $('a.screenshot-container').each(function () {
                const $link = $(this);
                const href = $link.attr('href');
                $link.attr('href', `${href}?theme=dark`);
            });
        } else {
            $btn.removeClass('btn-primary').addClass('btn-light');
            $('a.screenshot-container').each(function () {
                const $link = $(this);
                const href = $link.attr('href');
                $link.attr('href', href.replace('?theme=dark', ''));
            });
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
    offset: 0,
    tolerance: 0,
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
        $('.demos').addClass('dark');
        $img.attr('data-src', $img.data('dark'));
        $img.attr('src', `${__meta.assets}/image/screenshot-placeholder-dark.png`);
    } else {
        $img.attr('data-src', $img.data('default'));
        $img.attr('src', `${__meta.assets}/image/screenshot-placeholder.png`);
    }
});

$('.lazyload').lazyload();

function adjustScreenshotsSize() {
    $('.screenshot').each(function () {
        const $screenshot = $(this);
        if (!$('.demos').hasClass('f2')) {
          $screenshot.height($screenshot.width() / 16 * 9);
        }
    });
}

adjustScreenshotsSize();

$(window).resize(adjustScreenshotsSize);

