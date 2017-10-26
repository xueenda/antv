module.exports = {
    locale: 'zh-cn',
    products: {
        g2: {
            version: '3.0.0',
            name: 'G2',
            href: '${base}zh-cn/g2/3.x/index.html',
            links: {
                demo: { text: '${resource.translate.demo}', href: '${base}zh-cn/g2/3.x/demo/index.html' },
                api: { text: '${resource.translate.api}', href: '${base}zh-cn/g2/3.x/api/index.html' },
                tutorial: { text: '${resource.translate.tutorial}', href: '${base}zh-cn/g2/3.x/tutorial/index.html' },
                changelog: { hideFromNav: true, text: '${resource.translate.changelog}', href: '${base}zh-cn/g2/3.x/tutorial/changelog.html' },
            }
        },
        g6: {
            version: '1.0.0',
            name: 'G6',
            href: '${base}zh-cn/g6/1.x/index.html',
            links: {
                demo: { text: '${resource.translate.demo}', href: '${base}zh-cn/g6/1.x/demo/index.html' },
                api: { text: '${resource.translate.api}', href: '${base}zh-cn/g6/1.x/api/index.html' },
                tutorial: { text: '${resource.translate.tutorial}', href: '${base}zh-cn/g6/1.x/tutorial/index.html' },
                toolbox: { text: '${resource.translate.toolbox}', href: '${base}zh-cn/g6/1.x/toolbox.html' },
                changelog: { hideFromNav: true, text: '${resource.translate.changelog}', href: '${base}zh-cn/g6/1.x/tutorial/changelog.html' },
            }
        },
        f2: {
            version: '1.0.0',
            name: 'F2',
            href: '${base}zh-cn/f2/3.x/index.html',
            links: {
                demo: { text: '${resource.translate.demo}', href: '${base}zh-cn/f2/3.x/demo/index.html' },
                api: { text: '${resource.translate.api}', href: '${base}zh-cn/f2/3.x/api/index.html' },
                tutorial: { text: '${resource.translate.tutorial}', href: '${base}zh-cn/f2/3.x/tutorial/index.html' },
                changelog: { hideFromNav: true, text: '${resource.translate.changelog}', href: '${base}zh-cn/f2/3.x/tutorial/changelog.html' },
            }
        },
        academy: {
            name: '${resource.translate.academy}',
            href: '${base}zh-cn/academy/index.html',
            links: {
                principles: { text: '设计原则', href: ''  },
                cases: { text: '图表用法', href: '' },
                resources: { text: '资源', href: '' },
                publications: { text: '经典文献', href: '' },
            }
        }
    },
    resource: {
        translate: {
            academy: '可视化实验室',
            api: 'API文档',
            back2oldVersion: '返回旧版',
            changelog: '更新日志',
            copy: '复制',
            copyFail: '复制失败',
            copySuccess: '复制成功',
            demo: '图表示例',
            download: '下载',
            downloadAndUse: '下载使用',
            execute: '运行',
            getStarted: '开始使用',
            intro: '介绍',
            plotDescription: '图表简介',
            relativePlots: '关联图表',
            sourceCode: '源码',
            toolbox: '工具箱',
            tutorial: '使用教程',
            usage: '图表用法',
        },
        cssFiles: [
        ],
        jsFiles: [
        ],
    },
    header: {
    },
    previous: {
        href: '/old/index.html',
        text: '返回旧版'
    },
    keywords: [
        // 'Ant',
        // 'AntV',
        // 'Data Visualization',
        // 'Visualization',
        // '可视化',
        // '数据可视化',
    ],
    title: '蚂蚁数据可视化',
    siteMap: [
        '${products.g2}',
        '${products.g6}',
        '${products.f2}',
        '${products.academy}',
        {
            name: '体验云产品',
            links: {
                antd: { text: 'AntD', href: '' },
                antg: { text: 'AntG', href: '' },
                antv: { text: 'AntV', href: '' },
                chair: { text: 'Chair/Egg', href: '' },
                deer: { text: '九色鹿', href: '' },
                basement: { text: 'Basement', href: '' },
                fengdie: { text: '凤蝶', href: '' },
                lark: { text: '云雀', href: '' },
            }
        },
    ],
    showFooter: true,
    footer: {
        isFixed: false,
        resources: [
            { text: '关于我们', href: '' },
            { text: '版权说明', href: '' },
            { text: 'GitHub', href: 'https://github.com/antvis/' }
        ],
        copyright: 'Copyright © 蚂蚁金服体验技术部出品 @ AFX'
    }
};