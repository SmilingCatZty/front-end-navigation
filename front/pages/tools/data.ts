import { toolsInfoModel, ToolsModel } from '../../models/tool.model'

export const list = reactive([
  {
    type: 'often',
    name: '常用工具',
    collection: [
      {
        icon: 'https://github.githubassets.com/favicons/favicon.svg',
        name: 'Github Trending',
        link: 'https://github.com/trending'
      },
      {
        icon: 'https://caniuse.com/img/favicon-128.png',
        name: '兼容性查询',
        link: 'https://caniuse.com/'
      },
      {
        icon: 'https://www.bootcdn.cn/assets/ico/favicon.ico?1644166305141',
        name: 'BootCDN',
        link: 'https://www.bootcdn.cn/'
      },
      {
        icon: 'https://static.clewm.net/static/images/favicon.ico',
        name: '草料二维码',
        link: 'https://cli.im/'
      },
      {
        icon: 'https://www.hlcode.cn/favicon.ico',
        name: '互联二维码',
        link: 'https://www.hlcode.cn/'
      },
      {
        icon: 'https://www.aconvert.com/favicon.ico',
        name: '文件格式转换',
        link: 'https://www.aconvert.com/cn/audio/'
      },
      {
        icon: 'https://datav.aliyun.com/favicon.ico',
        name: '阿里云地图',
        link: 'https://datav.aliyun.com/portal/school/atlas/area_selector'
      },
      {
        icon: 'https://csstools.chinaz.com/favicon.ico',
        name: '站长工具',
        link: 'https://tool.chinaz.com/'
      },
      {
        icon: 'https://app.netlify.com/favicon.ico',
        name: 'netlify网站托管',
        link: 'https://app.netlify.com/'
      },
      {
        icon: 'https://assets.vercel.com/image/upload/front/favicon/vercel/favicon.ico',
        name: 'vercel网站托管',
        link: 'https://vercel.com/dashboard'
      }
    ]
  },
  {
    type: 'img',
    name: '图片处理',
    collection: [
      {
        icon: 'https://tinypng.com/images/favicon.ico',
        name: '图片压缩',
        link: 'https://tinypng.com/'
      },
      {
        icon: 'https://www.toptal.com/developers/css/sprite-generator/static/images/favicon.png',
        name: '生成精灵图',
        link: 'https://www.toptal.com/developers/css/sprite-generator'
      },
      {
        icon: 'https://c.runoob.com/more/svgeditor/images/favicon.svg',
        name: 'SVG编辑器',
        link: 'https://c.runoob.com/more/svgeditor/'
      },
      {
        icon: 'https://www.toptal.com/developers/css/sprite-generator/static/images/favicon.png',
        name: '图片背景消除',
        link: 'https://www.remove.bg/zh'
      },
      {
        icon: 'https://www.3gbizhi.com/assets/mobile/images/favicon.ico',
        name: '3G壁纸',
        link: 'https://www.3gbizhi.com/'
      },
      {
        icon: 'https://huatu.98youxi.com/favicon.ico',
        name: '流程图/思维导图',
        link: 'https://huatu.98youxi.com/home/myfile/'
      }
    ]
  },
  {
    type: 'css',
    name: 'css工具',
    collection: [
      {
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAY1BMVEX///8AAADr+fr////1/PwAqrsAprgKrr5hy9XU8fQUssH0+/xQxdEitsUwusg/v8zE7PAds8P////p+Pqw5eqp4+mN2eH3/P2h4OeQ2+I2vMra8/a86e2b3uRrzthKw89Ewc0z3iepAAAABXRSTlPwAO/g70YqzXQAAADSSURBVDjLhdNLbsMwDARQuqlGjqiv/3HaJPc/ZWUHBYwWpGdH8GGkDak5CTUXog8hn0QXaohbKyQMHVVwgxEC12+g/QVHCOzT9QicL+4da12Myf4F6/h4+pqXnzLPfP8HbHmXr7kf2hjc8YljJl7K/gMBLLPftwLAyLGOIsCjq3sZIHbboDTkEUYB8BxUYO8TjALQsjMKqNMNGkDioINhhFEAAq86+P6C0UDgpIJaYIKVAdKc/BJkEPucXk+5AVMuBtofit22MhBzPb+s09s8ve4fJkoXyynCJe4AAAAASUVORK5CYII=',
        name: '贝塞尔曲线',
        link: 'https://cubic-bezier.com/#.17,.67,.83,.67'
      },
      {
        icon: 'https://www.bezier-curve.com/favicon.ico',
        name: '贝塞尔曲线',
        link: 'https://www.bezier-curve.com/'
      },
      {
        icon: '	https://cssgradient.io/images/favicon-23859487.png',
        name: 'css渐变色',
        link: 'https://cssgradient.io/'
      },
      {
        icon: 'https://static.mybrandnewlogo.com/images/favicon.ico',
        name: '色彩搭配',
        link: 'https://mybrandnewlogo.com/color-palette-generator'
      },
      {
        icon: 'https://s.techbrood.com/themes/techbrood/image/favicon.ico',
        name: 'border-radius',
        link: 'https://wow.techbrood.com/ftypedle/40829'
      },
      {
        icon: 'https://shadows.brumm.af/favicon.svg',
        name: 'css阴影',
        link: 'https://shadows.brumm.af/'
      },
      {
        icon: 'https://box-shadow.art/wp-content/uploads/2021/10/logo-icon-150x150.png',
        name: 'box-shadow案例',
        link: 'https://box-shadow.art/'
      },
      {
        icon: '	https://cssgrtype-generator.netlify.app/favicon.ico',
        name: 'Grtype网格布局',
        link: 'https://cssgrtype-generator.netlify.app/'
      },
      {
        icon: 'https://layout.bradwoods.io/favicon.ico',
        name: '布局生成器',
        link: 'https://layout.bradwoods.io/'
      },
      {
        icon: '	https://animxyz.com/assets/static/animxyz-logo.ce0531f.39f3bde368e480505b70778acaa2ac74.png',
        name: 'animxyz',
        link: 'https://animxyz.com/'
      },
      {
        icon: 'https://www.transition.style/favicon.png',
        name: '过渡动画',
        link: 'https://www.transition.style/'
      },
      {
        icon: 'https://getwaves.io/favicon-32x32.png',
        name: 'svg波浪生成器',
        link: 'https://getwaves.io/'
      },
      {
        icon: 'https://img2.batypeu.com/it/u=3541918504,2197745291&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=287',
        name: 'svg生成器',
        link: 'https://app.haikei.app/'
      }
    ]
  },
  {
    type: 'cool',
    name: 'UI灵感',
    collection: [
      {
        icon: '	https://whirl.netlify.app/favicon.ico',
        name: 'whirl加载动效',
        link: 'https://whirl.netlify.app/'
      },
      {
        icon: 'https://uiverse.io/favicon-32x32.png',
        name: 'uiverse按钮',
        link: 'https://uiverse.io/buttons'
      },
      {
        icon: 'https://www.handsome-css.com/favicon/favicon.ico',
        name: 'AwA-UI小组件',
        link: 'https://www.handsome-css.com/buttons'
      },
      {
        icon: 'https://csscoco.com/inspiration/logo2.png',
        name: 'CSS Inspiration',
        link: 'https://csscoco.com/inspiration/#/'
      },
      {
        icon: 'https://shiroi.netlify.app/favicon.ico',
        name: 'Shiro',
        link: 'https://shiroi.netlify.app/'
      },
      {
        icon: 'https://cssdesignawards.com/images/favicons/favicon.ico',
        name: 'CssDesignAwards',
        link: 'https://cssdesignawards.com/'
      },
      {
        icon: 'https://webdesignclip.com/favicon.ico',
        name: 'WebDesignClip',
        link: 'https://webdesignclip.com/'
      }
    ]
  },
  {
    type: '图标',
    name: '图标',
    collection: [
      {
        icon: 'https://img.alicdn.com/imgextra/i2/O1CN01ZyAlrn1MwaMhqz36G_!!6000000001499-73-tps-64-64.ico',
        name: 'iconfont',
        link: 'https://www.iconfont.cn/'
      },
      {
        icon: 'https://unpkg.byted-static.com/byted/arco-config/1.0.9/assets/icon-box.ico',
        name: 'iconBox',
        link: 'https://arco.design/iconbox/libs'
      },
      {
        icon: 'https://lf1-cdn2-tos.bytegoofy.com/bydesign/iconparksite/logo.svg',
        name: 'iconPark',
        link: 'https://iconpark.oceanengine.com/official'
      },
      {
        icon: 'https://iconsvg.xyz/favicon-32.png',
        name: '自定义icon',
        link: 'https://iconsvg.xyz/'
      },
      {
        icon: '	https://www.fonts.net.cn/favicon.ico',
        name: '字体天下',
        link: 'https://www.fonts.net.cn/'
      },
      {
        icon: '	https://www.googlefonts.cn/Public/google/zh-cn/gstatic/google_fonts_lodp.ico',
        name: '字体下载',
        link: 'https://www.emojiall.com/zh-hans'
      },
      {
        icon: '	https://www.emojiall.com/favicon.ico',
        name: 'emojiall',
        link: 'https://www.emojiall.com/zh-hans'
      },
      {
        icon: 'https://www.webfx.com/wp-content/uploads/2023/05/icon-ux.svg',
        name: 'md-emoji',
        link: 'https://www.webfx.com/tools/emoji-cheat-sheet/'
      }
    ]
  },
  {
    type: 'chatGPT',
    name: 'chatGPT',
    collection: [
      {
        icon: 'https://chat.plexpt.com/favicon.svg',
        name: '智能喵',
        link: 'https://chat.plexpt.com/'
      },
      {
        icon: 'https://ai.aging.run/pwa-192.png',
        name: 'AIer',
        link: 'https://ai.aging.run/'
      },
      {
        icon: 'https://chat.ktoai.com/favicon.png',
        name: '糖果梦',
        link: 'https://ai.tgmeng.com/'
      },
      {
        icon: 'https://cdn.atypeutu.cn/res/head/ai.png',
        name: 'AtypeuTu',
        link: 'https://chat.atypeutu.cn/'
      }
    ]
  },
  {
    type: 'chrome',
    name: 'Chrome插件',
    collection: [
      {
        icon: 'https://cdn.kjj8.com/images/2021/11/20211638043297-unnamed-6.png',
        name: '请求mock插件',
        link: 'https://www.jianshu.com/p/9278207cdc62'
      },
      {
        icon: 'https://addons.mozilla.org/user-media/addon_icons/1022/1022438-64.png?modified=533cac64',
        name: '跨域代理插件',
        link: 'https://www.0z.gs/webDevelopment/1736.html'
      }
    ]
  },
  {
    type: 'vscode',
    name: 'vscode插件',
    collection: [
      {
        icon: 'https://techer.gallerycdn.vsassets.io/extensions/techer/open-in-browser/2.0.0/1534049617896/Microsoft.VisualStudio.Services.Icons.Default',
        name: 'open in browser',
        link: 'https://marketplace.visualstudio.com/items?itemName=techer.open-in-browser'
      },
      {
        icon: 'https://kisstkondoros.gallerycdn.vsassets.io/extensions/kisstkondoros/vscode-gutter-preview/0.30.0/1644076638771/Microsoft.VisualStudio.Services.Icons.Default',
        name: '图片预览',
        link: 'https://marketplace.visualstudio.com/items?itemName=kisstkondoros.vscode-gutter-preview'
      },
      {
        icon: 'https://cipchk.gallerycdn.vsassets.io/extensions/cipchk/cssrem/3.1.0/1677827217157/Microsoft.VisualStudio.Services.Icons.Default',
        name: 'px to rem/rpx/vw',
        link: 'https://marketplace.visualstudio.com/items?itemName=cipchk.cssrem'
      },
      {
        icon: 'https://chendm.gallerycdn.vsassets.io/extensions/chendm/translate/0.1.0/1631010008171/Microsoft.VisualStudio.Services.Icons.Default',
        name: '生成英文变量名',
        link: 'https://marketplace.visualstudio.com/items?itemName=chendm.translate'
      },
      {
        icon: 'https://formulahendry.gallerycdn.vsassets.io/extensions/formulahendry/auto-close-tag/0.5.14/1644313109985/Microsoft.VisualStudio.Services.Icons.Default',
        name: '自动闭合标签',
        link: 'https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag'
      }
    ]
  }
])
