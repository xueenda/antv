import $ from 'jquery';
import './scroll2top.less';

// speed
const SPEED = 1000;

// dom node
const $scroll2top = $('.scroll2top');

// fadeIn fadeOut
$(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
        $scroll2top.fadeIn();
    } else {
        $scroll2top.fadeOut();
    }
});

// scroll to top
$scroll2top.click(function(e) {
    e.preventDefault();
    $('body, html').animate({
        scrollTop: 0
    }, SPEED);
});
