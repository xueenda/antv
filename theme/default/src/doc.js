import tocbot from 'tocbot';
import './copy-code';
import './doc.less';

// toc
tocbot.init({
    tocSelector: '.toc',
    contentSelector: '.doc-container .content',
    headingSelector: 'h1, h2, h3, h4',
    collapseDepth: 3,
});
