// https://nuxt.com/docs/api/configuration/nuxt-config
const isDev = process.env.NODE_ENV === 'development'

export default defineNuxtConfig({
  app: {
    // baseURL: isDev ? '/' : '/abinWeb/',
    buildAssetsDir: 'static', //修改站点资产的文件夹名称，默认是_nuxt
    head: {
      title: '前端助手',
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content:
            'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no'
        },
        // { name: 'description', content: config.SEO_description },
        // { name: 'keywords', content: config.SEO_keywords },
        // { name: 'author', content: config.author },
        {
          name: 'bytedance-verification-code',
          content: 'Z39UIZv8+Uw0Uu1UX7Ap'
        }
      ],

      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/Cat.png' }
      ],
      script: [
        {
          // src: 'https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js'
        }
      ]
    }
  },
  devtools: {
    enabled: true,
    module: ['@vant/nuxt', '@nuxtjs/axios', '@nuxtjs/style-resources'],
    vant: {}
  },
  runtimeConfig: {
    public: {
      baseUrl: 'http://localhost:5000/api/',
      editable: false
    }
  },
  // 基础模块
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/css/global.scss" as *;'
        }
      }
    }
  },
  // 路由
  router: {
    options: {}
  }
})
