import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import VueCookies from 'vue3-cookies'

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.use(VueCookies)

app.mount('#app')
