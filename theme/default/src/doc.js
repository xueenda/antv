import tocbot from 'tocbot';
import './copy-code';
import './doc.less';

// toc
tocbot.init({
    tocSelector: '.toc',
    contentSelector: '.doc-container .content',
    headingSelector: 'h1, h2, h3',
    collapseDepth: 3,
});

const $tocContainer = $('.toc-container');
const $menu = $('.menu.bd-sidebar');
$('header').headroom({
    offset: 205,
    tolerance: 5,
    classes: {
        initial: 'animated',
        pinned: 'slideDown',
        unpinned: 'slideUp'
    },
    onPin() {
        $tocContainer.css({
            top: '104px',
            height: 'calc(100% - 120px)',
        });
        $menu.css({
            'margin-top': 0
        });
    },
    onUnpin() {
        $tocContainer.css({
            top: '32px',
            height: 'calc(100% - 48px)',
        });
        $menu.css({
            'margin-top': '-64px'
        });
    }
});
