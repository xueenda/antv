import $ from 'jquery';
import './home.less';

$('header').headroom({
    offset: 205,
    tolerance: 5,
    classes: {
        initial: 'animated',
        pinned: 'slideDown',
        unpinned: 'slideUp'
    }
});

$('.slick').slick({
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    fade: true,
});
