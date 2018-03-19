import CodeMirror from 'codemirror';
import Clipboard from 'clipboard';
import getQueryVariable from './utils/get-query-variable';
import inView from './utils/in-view';
import './drawer';
import './demo.less';

const $code = $('#code');
const $codeDefault = $('#code-default');
const $codeDark = $('#code-dark');
const $demoPreview = $('#demo-preview');

const theme = getQueryVariable('theme');
const isDark = theme === 'dark';

if (isDark) {
    $code.val($codeDark.val());
} else {
    $code.val($codeDefault.val());
}
$('.theme-switching .btn').each(function () {
    const $btn = $(this);
    if (isDark) {
        if ($btn.data('theme') === 'dark') {
            $btn.removeClass('btn-light').addClass('btn-primary');
            $demoPreview.addClass('dark');
        } else {
            $btn.removeClass('btn-primary').addClass('btn-light');
            $demoPreview.removeClass('dark');
        }
    }
});

const htmlEditor = CodeMirror.fromTextArea($code[0], {
    mode: "text/html",
    extraKeys: {
        'Ctrl-Space': 'autocomplete'
    },
    foldGutter: true,
    gutters: [
        'CodeMirror-linenumbers',
        'CodeMirror-foldgutter'
    ],
    lineNumbers: true,
    lineWrapping: false
});

const $iframeContainer = $('#preview');

function syncCode() {
    $iframeContainer.html('<iframe></iframe>');
    const iframe = $iframeContainer.find('iframe')[0];
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(htmlEditor.getValue());
    iframeDoc.close();
}

$('header').headroom({
    offset: 0,
    tolerance: 0,
    classes: {
        initial: 'animated',
        pinned: 'slideDown',
        unpinned: 'slideUp'
    }
});

function resizePreview() {
    if (!$iframeContainer.hasClass("f2")) {
        $iframeContainer.height($iframeContainer.width() / 16 * 9);
    }
    syncCode();
}

resizePreview();

const $execute = $('#btn-execute');
$execute.click(syncCode);

const $copy = $('#btn-copy');
const $alertCopySuccess = $('#alert-copy-success');
const $alertCopyFail = $('#alert-copy-fail');
const clipboard = new Clipboard($copy[0], {
    text() {
        return htmlEditor.getValue();
    }
});
clipboard.on('success', e => {
    e.clearSelection();
    $alertCopySuccess.fadeIn();
    $alertCopySuccess.fadeOut();
});

clipboard.on('error', e => {
    e.clearSelection();
    $alertCopyFail.fadeIn();
    $alertCopyFail.fadeOut();
});

const $activeListGroupItem = $('.list-group-item.active');
if (!$activeListGroupItem.is(':visible')) {
    $activeListGroupItem[0].scrollIntoView();
}

$(window).resize(resizePreview);

// resizable
const $detail = $('.detail');
const $codePanel = $('.code-panel');
const $menu = $('.menu');
$detail.resizable({
    handleSelector: '#resize-handler',
    resizeWidthFrom: 'right',
    resizeHeight: false,
    onDragStart() {
        $detail.css('pointer-events', 'none');
        $detail.css('cursor', 'col-resize');
        $codePanel.find('.CodeMirror-gutter-elt').css('cursor', 'col-resize');
    },
    onDrag(e, $el, newWidth) {
        const winWidth = $(window).width();
        if (newWidth < 486) {
            newWidth = 486;
        }
        const codePanelWidth = winWidth - $menu.width() - newWidth;
        $codePanel.css('flex', `0 0 ${codePanelWidth < 300 ? 300 : codePanelWidth}px`);
    },
    onDragEnd() {
        $detail.css('pointer-events', 'auto');
        $detail.css('cursor', 'default');
        $codePanel.find('.CodeMirror-gutter-elt').css('cursor', 'default');
        resizePreview();
    },
});

const $collapseExpand = $('.collapse-expand');
$collapseExpand.click(() => {
    if ($menu.hasClass('collapsed')) {
        $menu.removeClass('collapsed');
        $collapseExpand.find('.iconfont').removeClass('icon-right').addClass('icon-left');
    } else {
        $menu.addClass('collapsed');
        $menu.find('.collapse.show').removeClass('show');
        $menu.find('.menu-header').addClass('collapsed');
        $collapseExpand.find('.iconfont').removeClass('icon-left').addClass('icon-right');
    }
    resizePreview();
});
$menu.find('.menu-inner').click(() => {
    if ($menu.hasClass('collapsed')) {
        // e.preventDefault();
        // e.stopPropagation();
        $menu.removeClass('collapsed');
        $collapseExpand.find('svg').html('<use xlink:href="#_si-left"></use>');
        resizePreview();
    }
});
const $currentMenuItem = $('.list-group-item.active');
if (!inView($currentMenuItem)) {
    $currentMenuItem[0].scrollIntoView();
}


const userAgent = navigator.userAgent;
const mobile = !!userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i);

if ($iframeContainer.hasClass('f2')) {
    if (mobile) {
        $('.mobile-wrapper .content').hide();
        $iframeContainer.css('top', 0);
    } else {
        $('.mobile-wrapper .content').show();
        $iframeContainer.css('top', 74);
    }
}

