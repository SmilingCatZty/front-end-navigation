import { defineNuxtPlugin } from '#app'
import {
  Icon, Image, Button, NavBar, Tab, Tabs, Toast, IndexBar, IndexAnchor
} from 'vant'

// 目前在 nuxt 中无法按需引入样式，因此采用手动引入的方式
import 'vant/lib/index.css'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp
    .use(Image)
    .use(Icon)
    .use(Button)
    .use(Image)
    .use(NavBar)
    .use(Tab)
    .use(Tabs)
    .use(IndexBar)
    .use(IndexAnchor)
})
