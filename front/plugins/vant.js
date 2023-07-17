import { defineNuxtPlugin } from '#app'
import {
  Icon, Button, Toast, Dialog, Form, CellGroup, Field, Picker, Popup
} from 'vant'

// 目前在 nuxt 中无法按需引入样式，因此采用手动引入的方式
import 'vant/lib/index.css'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp
    .use(Icon)
    .use(Button)
    .use(Toast)
    .use(Dialog)
    .use(Form)
    .use(CellGroup)
    .use(Field)
    .use(Picker)
    .use(Popup)
})
