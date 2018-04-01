module.exports = {
    locale: 'zh-cn',
    products: {
        g2: {
            version: '3.0.0',
            name: 'G2',
            href: '${base}zh-cn/g2/3.x/index.html',
            icon: '${assets}/image/icon/g2.svg',
            links: {
                demo: { text: '${resource.translate.demo}', href: '${base}zh-cn/g2/3.x/demo/index.html' },
                api: { text: '${resource.translate.api}', href: '${base}zh-cn/g2/3.x/api/index.html' },
                tutorial: { text: '${resource.translate.tutorial}', href: '${base}zh-cn/g2/3.x/tutorial/index.html' },
                // changelog: { hideFromNav: true, text: '${resource.translate.changelog}', href: '${base}zh-cn/g2/3.x/tutorial/changelog.html' },
            }
        },
        g6: {
            version: '1.0.0',
            name: 'G6',
            href: '${base}zh-cn/g6/1.x/index.html',
            icon: '${assets}/image/icon/g6.svg',
            links: {
                demo: { text: '${resource.translate.demo}', href: '${base}zh-cn/g6/1.x/demo/index.html' },
                api: { text: '${resource.translate.api}', href: '${base}zh-cn/g6/1.x/api/index.html' },
                tutorial: { text: '${resource.translate.tutorial}', href: '${base}zh-cn/g6/1.x/tutorial/index.html' },
                // toolbox: { text: '${resource.translate.toolbox}', href: '${base}zh-cn/g6/1.x/toolbox.html' },
                // changelog: { hideFromNav: true, text: '${resource.translate.changelog}', href: '${base}zh-cn/g6/1.x/tutorial/changelog.html' },
            }
        },
        f2: {
            version: '1.0.0',
            name: 'F2',
            href: '${base}zh-cn/f2/3.x/index.html',
            icon: '${assets}/image/icon/f2.svg',
            qrCode: { text: '${resource.translate.scanCode}', href: '${base}zh-cn/f2/3.x/demo/mobile-index.html' },
            links: {
                demo: { text: '${resource.translate.demo}', href: '${base}zh-cn/f2/3.x/demo/index.html' },
                api: { text: '${resource.translate.api}', href: '${base}zh-cn/f2/3.x/api/index.html' },
                tutorial: { text: '${resource.translate.tutorial}', href: '${base}zh-cn/f2/3.x/tutorial/index.html' },
                // changelog: { hideFromNav: true, text: '${resource.translate.changelog}', href: '${base}zh-cn/f2/3.x/tutorial/changelog.html' },
            }
        },
        vis: {
            name: '${resource.translate.vis}',
            href: '${base}zh-cn/vis/index.html',
            icon: '${assets}/image/icon/vis.svg',
            links: {
                blog: { text: '${resource.translate.visBlog}', href: '${base}zh-cn/vis/blog/index.html' },
                design: { text: '${resource.translate.visDesign}', href: '${base}zh-cn/vis/design/index.html'  },
                chart: { text: '${resource.translate.visChart}', href: '${base}zh-cn/vis/chart/index.html' },
                resource: { text: '${resource.translate.visResource}', href: '${base}zh-cn/vis/resource/index.html' },
                // publications: { text: '经典文献', href: '' },
            }
        },
        gallery: {
            name: '${resource.translate.gallery}',
            href: '${base}zh-cn/gallery/index.html',
            icon: '${assets}/image/icon/gallery.svg',
            links: {
                // publications: { text: '经典文献', href: '' },
            }
        }
    },
    resource: {
        translate: {
            aboutUs: '关于我们',
            api: 'API 文档',
            back2oldVersion: '返回旧版',
            changelog: '更新日志',
            chartDetail: '了解更多',
            copy: '复制',
            copyFail: '复制失败',
            copySuccess: '复制成功',
            customerDeclaration: '权益保障承诺书',
            demo: '图表示例',
            download: '下载',
            downloadAndUse: '下载使用',
            execute: '运行',
            feedback: '立即反馈',
            gallery: 'Gallery',
            getStarted: '开始使用',
            inputKeyWord: '输入关键字',
            intro: '介绍',
            joinUs: '立即加入',
            plotDescription: '图表简介',
            privacyDeclaration: '隐私权政策',
            product: '产品',
            referenceLinks: '相关链接',
            relativePlots: '关联图表',
            search: '搜索',
            sourceCode: '源码',
            sortBy: '排序方式',
            recommended: '推荐',
            latest: '最新',
            tag: '标签',
            themeSwitching: '主题切换',
            toolbox: '工具箱',
            tutorial: '使用教程',
            usage: '图表用法',
            variation: '变形',
            viewDetail: '查看详情',
            viewMore: '查看更多',
            vis: '墨者学院',
            visBlog: '博客',
            visChart: '图表用法',
            visDesign: '设计原则',
            visResource: '资源',
            scanCode: '扫码演示',
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
        '${products.vis}',
        {
            name: '更多产品',
            external: true,
            links: {
                antd: { text: 'Ant Design', href: 'https://ant.design/index-cn', description: '蚂蚁 UI 设计体系' },
                egg:  { text: 'Egg', href: 'https://eggjs.org/', description: '企业级 Node Web 开发框架' },
            }
        },
    ],
    teamMembers: [
        { name: '巴思'  , jobTitle: '工程师'     , avatar: '${assets}/image/members/basi.png'     , weibo: 'https://weibo.com/145643593'      , github: ''                               } ,
        { name: '沉鱼'  , jobTitle: '工程师'     , avatar: '${assets}/image/members/chenyu.png'   , weibo: ''                                 , github: ''                               } ,
        { name: '董珊珊', jobTitle: '设计师'     , avatar: '${assets}/image/members/shanshan.png' , weibo: ''                                 , github: ''                               } ,
        { name: '顾倾'  , jobTitle: '设计师'     , avatar: '${assets}/image/members/guqing.jpg'   , weibo: ''                                 , github: ''                               } ,
        { name: '画康'  , jobTitle: '设计师'     , avatar: '${assets}/image/members/huakang.png'  , weibo: 'https://weibo.com/u/1985143287'   , github: ''                               } ,
        { name: '绝云'  , jobTitle: '工程师'     , avatar: '${assets}/image/members/jueyun.png'   , weibo: 'https://weibo.com/omosirovincent' , github: 'https://github.com/leungwensen' } ,
        { name: '陆沉'  , jobTitle: '工程师'     , avatar: '${assets}/image/members/luchen.jpeg'  , weibo: ''                                 , github: ''                               } ,
        { name: '罗宪'  , jobTitle: '动效设计师' , avatar: '${assets}/image/members/luoxian.png'  , weibo: ''                                 , github: ''                               } ,
        { name: '完白'  , jobTitle: '设计师'     , avatar: '${assets}/image/members/wanbai.png'   , weibo: ''                                 , github: ''                               } ,
        { name: '萧庆'  , jobTitle: '工程师'     , avatar: '${assets}/image/members/xiaoqing.jpg' , weibo: ''                                 , github: 'https://github.com/dxq613'      } ,
        { name: '亦叶'  , jobTitle: '设计师'     , avatar: '${assets}/image/members/yiye.png'     , weibo: ''                                 , github: ''                               } ,
        { name: '有田'  , jobTitle: '工程师'     , avatar: '${assets}/image/members/youtian.jpg'  , weibo: 'https://weibo.com/u/1869365461'   , github: 'https://github.com/TomHuangCN'  } ,
        { name: '玉伯'  , jobTitle: '工程师'     , avatar: '${assets}/image/members/yubo.png'     , weibo: 'https://weibo.com/lifesinger'     , github: 'https://github.com/lifesinger'  } ,
        { name: '御术'  , jobTitle: '工程师'     , avatar: '${assets}/image/members/yushu.png'    , weibo: 'https://weibo.com/kenerlinfeng'   , github: 'https://github.com/kener'       } ,
        { name: '再飞'  , jobTitle: '工程师'     , avatar: '${assets}/image/members/zaifei.jpg'   , weibo: 'https://weibo.com/simaoohappy'    , github: 'https://github.com/simaQ'       } ,
        { name: '张初尘', jobTitle: '产品经理'   , avatar: '${assets}/image/members/chuchen.png'  , weibo: 'https://weibo.com/u/1824917073'   , github: 'https://github.com/lilyal'      } ,
        { name: '祯逸'  , jobTitle: '工程师'     , avatar: '${assets}/image/members/zhenyi.png'   , weibo: ''                                 , github: ''                               } ,
    ],
    showFooter: true,
    footer: {
        isFixed: false,
        isDark: true,
        resources: [
            { text: '关于我们', href: '' },
            { text: '版权说明', href: '' },
            { text: 'GitHub', href: 'https://github.com/antvis/' }
        ],
        copyright: 'ICP 证浙 B2-2-100257  Copyright © 蚂蚁金融服务集团',
    }
};
