import $ from 'jquery';

const $window = $(window);

export default selector => {
    const $element = $(selector);
    if (!$element.is(':visible')) {
        return false;
    }

    var window_left = $window.scrollLeft();
    var window_top = $window.scrollTop();
    var offset = $element.offset();
    var left = offset.left;
    var top = offset.top;

    if (top + $element.height() >= window_top &&
        top - ($element.data('appear-top-offset') || 0) <= window_top + $window.height() &&
        left + $element.width() >= window_left &&
        left - ($element.data('appear-left-offset') || 0) <= window_left + $window.width()) {
        return true;
    } else {
        return false;
    }
};
