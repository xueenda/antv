import $ from 'jquery';
import _ from 'lodash';
import Color from '@lite-js/color';
import './palette.less';

const DEFAULT_OPTIONS = {
    container: document.body,
    colors: [
        '#1890FF',
        '#2FC25B',
        '#FACC14',
        '#223273',
        '#8543E0',
        '#13C2C2',
        '#3436C7',
        '#F04864',
    ]
};

class Palette {
    constructor(options) {

        options = _.assign({}, DEFAULT_OPTIONS, options);
        const me = this;
        const {
            container,
            colors
        } = options;
        const uuid = _.uniqueId('palette');
        const $palette = $(`<div id="${uuid}" class="palette"></div>`);
        _.each(colors, color => {
            let fontColor;
            const greyColor = new Color(color).toGrey();
            const hex = parseInt(greyColor.toHex().replace('#', 0), 16);
            if (hex > parseInt('7fffff.8', 16)) {
                fontColor = '#314659';
            } else {
                fontColor = '#FFF';
            }
            $palette.append(
                `<div class="color" style="background: ${color}" data-clipboard-text="${color}">
    <span class="color-value" style="color: ${fontColor};">${color}</span>
</div>`
            );
        });
        me.$container = $(container);
        $(container).append($palette);


    }
}

window.Palette = Palette;
let notifyTimeout;

$(document).ready(() => {
    const $notification = $(
        `<div class="palette-notification" style="display: none; transform: translateY(-100px);">
    <div class="inner">
        <!-- missing icon -->
        <span class="message"></span>
    </div>
</div>`
    );
    $(document.body).append($notification);
    const clipboard = new Clipboard('.palette .color');
    clipboard.on('success', e => {
        const {text} = e;
        clearTimeout(notifyTimeout);
        $notification.find('.message').html(`color: <span style="color: ${text}; font-weight: bold;">${text}</span> copied!`);
        $notification.show();
        $notification.css('transform', 'translateY(0)');
        notifyTimeout = setTimeout(() => {
            $notification.css('transform', 'translateY(-100px)');
        }, 4000);
    });
});
