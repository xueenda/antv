import $ from 'jquery';
import './copy-code';
import './home.less';

$('header').headroom({
    offset: 0,
    tolerance: 0,
    classes: {
        initial: 'animated',
        pinned: 'slideDown',
        unpinned: 'slideUp'
    },
    onTop() {
        $('header.homepage').addClass('transparent');
    },
    onPin() {
        $('header.homepage').removeClass('transparent');
    },
    onNotTop() {
        $('header.homepage').removeClass('transparent');
    },
    onUnpin() {
        $('#sub-product-navs').find('.dropdown-menu').removeClass('show');
    },
});

const names = [ '商品价格 7 年走势对比', '层叠条形图', '饼图' ];

$('.slick').each(function () {
    const $target = $(this);
    $target.slick({
        // dots: !!$target.data('dots'),
        slidesToShow: 1,
        adaptiveHeight: true,
        infinite: true,
        speed: 500,
        cssEase: 'linear',
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
        fade: true,
    }).on('beforeChange', function(event, slick, currentSlide, nextSlide){
       $('#chartTitle').text(names[nextSlide]);
    });
});
