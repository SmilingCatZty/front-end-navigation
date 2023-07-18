// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
