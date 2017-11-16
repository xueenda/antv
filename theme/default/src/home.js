import $ from 'jquery';
import './copy-code';
import './home.less';

$('header').headroom({
    offset: 205,
    tolerance: 5,
    classes: {
        initial: 'animated',
        pinned: 'slideDown',
        unpinned: 'slideUp'
    },
    onTop() {
        // $('header')
    }
});

$('.slick').each(function () {
    const $target = $(this);
    $target.slick({
        // dots: !!$target.data('dots'),
        infinite: true,
        speed: 500,
        cssEase: 'linear',
        arrows: false,
        autoplay: true,
        autoplaySpeed: 1000,
        fade: true,
    });
});
