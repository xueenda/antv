import $ from 'jquery';
import './blog.less';

$('header').headroom({
    offset: 205,
    tolerance: 5,
    classes: {
        initial: 'animated',
        pinned: 'slideDown',
        unpinned: 'slideUp'
    },
    onPin() {
    },
    onUnpin() {
    }
});

$('.lazyload').lazyload();
