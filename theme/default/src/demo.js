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

const $iframe = $('#preview');
const iframeDoc = $iframe[0].contentDocument || $iframe[0].contentWindow.document;
iframeDoc.open();
iframeDoc.write(htmlEditor.getValue());
iframeDoc.close();
