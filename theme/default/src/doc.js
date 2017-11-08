import tocbot from 'tocbot';
import './copy-code';
import './doc.less';

// toc
tocbot.init({
    tocSelector: '.toc',
    contentSelector: '.doc-container .content',
    headingSelector: 'h1, h2',
    collapseDepth: 3,
});

const $tocContainer = $('.toc-container');
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
    },
    onUnpin() {
        $tocContainer.css({
            top: '32px',
            height: 'calc(100% - 48px)',
        });
    }
});

// $('.list-group-item.active')[0].scrollIntoView();
// $('.toc-link.is-active-link')[0].scrollIntoView();
