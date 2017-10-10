module.exports = {
    locale: 'zh-cn',
    product: {
        g2: {
            version: '3.0.0',
            name: 'G2',
            link: {
                home: { text: '${resource.translate.intro}', href: ''  },
                demo: { text: '${resource.translate.demo}', href: '' },
                tutorial: { text: '${resource.translate.tutorial}', href: '' },
                api: { text: '${resource.translate.api}', href: '' },
                changelog: { text: '${resource.translate.changelog}', href: '' }
            }
        },
        g6: {
            version: '1.0.0',
            name: 'G6',
            link: {
                home: { text: '${resource.translate.intro}', href: ''  },
                demo: { text: '${resource.translate.demo}', href: '' },
                tutorial: { text: '${resource.translate.tutorial}', href: '' },
                api: { text: '${resource.translate.api}', href: '' },
                toolbox: { text: '${resource.translate.toolbox}', href: '' },
                changelog: { text: '${resource.translate.changelog}', href: '' }
            }
        },
        f2: {
            version: '1.0.0',
            name: 'F2',
            link: {
                home: { text: '${resource.translate.intro}', href: ''  },
                demo: { text: '${resource.translate.demo}', href: '' },
                tutorial: { text: '${resource.translate.tutorial}', href: '' },
                api: { text: '${resource.translate.api}', href: '' },
                changelog: { text: '${resource.translate.changelog}', href: '' }
            }
        },
        academy: {
            name: '${resource.translate.academy}',
            link: {
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
            changelog: '更新日志',
            copy: '复制',
            copyFail: '复制失败',
            copySuccess: '复制成功',
            demo: '图表示例',
            execute: '运行',
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
        activeNavItemIndex: -1,
        navItems: [
            { text: 'G2', href: '${base}zh-cn/g2/3.x/index.html' },
            { text: 'G6', href: '${base}zh-cn/g6/1.x/index.html' },
            { text: 'F2', href: '${base}zh-cn/f2/1.x/index.html' },
            { text: '${resource.translate.academy}', href: '${base}zh-cn/academy/index.html' },
        ]
    },
    previous: {
        href: '/old/index.html',
        text: '返回旧版'
    },
    keywords: [
        'Ant',
        'AntV',
        'Data Visualization',
        'Visualization',
        '可视化',
        '数据可视化',
    ],
    title: '蚂蚁数据可视化',
    siteMap: [
        '${product.g2}',
        '${product.g6}',
        '${product.f2}',
        '${product.academy}',
        {
            name: '体验云产品',
            link: {
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