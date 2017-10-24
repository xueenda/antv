import $ from 'jquery';
import tocbot from 'tocbot';
import getQueryVariable from './utils/get-query-variable';
import './demos.less';

tocbot.init({
    tocSelector: '.toc',
    contentSelector: '.demos .content',
    headingSelector: 'h1, h2, h3, h4, h5, h6',
    collapseDepth: 4
});

const theme = getQueryVariable('theme');
const isDark = theme === 'dark';
$('.screenshot').each(function () {
    const $img = $(this);
    if (isDark) {
        $img.attr('data-src', $img.data('dark'));
    } else {
        $img.attr('data-src', $img.data('default'));
    }
});

$('.lazyload').lazyload();
