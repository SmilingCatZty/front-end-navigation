// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
    module: ['@vant/nuxt', '@nuxtjs/style-resources'],
    vant: {}
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
