import './demo.less';
import CodeMirror from 'codemirror';

const $code = $('#code');

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

$(window).resize(resizePreview);
