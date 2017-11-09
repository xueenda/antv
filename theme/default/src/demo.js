import CodeMirror from 'codemirror';
import Clipboard from 'clipboard';
import getQueryVariable from './utils/get-query-variable';
import './demo.less';

const $code = $('#code');
const $codeDefault = $('#code-default');
const $codeDark = $('#code-dark');

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
        } else {
            $btn.removeClass('btn-primary').addClass('btn-light');
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

function resizePreview() {
    $iframeContainer.height($iframeContainer.width() / 16 * 9);
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
