import tocbot from 'tocbot';
import inView from './utils/in-view';
import './copy-code';
import './drawer';
import './doc.less';

// toc
tocbot.init({
    tocSelector: '.toc',
    contentSelector: '.doc-container .content',
    headingSelector: 'h1, h2, h3',
    collapseDepth: 3,
});

// const $tocContainer = $('.toc-container');
// const $menu = $('.menu.bd-sidebar');
// $('header').headroom({
//     // offset: 205,
//     // tolerance: 5,
//     classes: {
//         initial: 'animated',
//         pinned: 'slideDown',
//         unpinned: 'slideUp'
//     },
//     onPin() {
//         $tocContainer.css({
//             top: '104px',
//             height: 'calc(100% - 120px)',
//         });
//         if ($menu.css('position') === 'fixed') {
//             $menu.css({
//                 'margin-top': 0
//             });
//             $menu.children('.inner').css({
//                 height: 'calc(100% - 64px)',
//             });
//         }
//     },
//     onUnpin() {
//         $tocContainer.css({
//             top: '32px',
//             height: 'calc(100% - 48px)',
//         });
//         if ($menu.css('position') === 'fixed') {
//             $menu.css({
//                 'margin-top': '-64px'
//             });
//             $menu.children('.inner').css({
//                 height: '100%',
//             });
//         }
//     }
// });

const $toc = $('.toc-container');
$(window).on('resize scroll', () => {
    if ($('#sub-site-nav').visible()) {
        $toc.css({
            position: 'absolute',
            top: ''
        });
    } else {
        $toc.css({
            position: 'fixed',
            top: 40
        });
    }
});

const $currentMenuItem = $('.list-group-item.active');
if ($currentMenuItem[0] && !inView($currentMenuItem)) {
    $currentMenuItem[0].scrollIntoView();
}

