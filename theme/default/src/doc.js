import tocbot from 'tocbot';
import './doc.less';

tocbot.init({
    tocSelector: '.toc',
    contentSelector: '.doc-container .content',
    headingSelector: 'h1, h2, h3, h4, h5, h6',
    collapseDepth: 4
});
