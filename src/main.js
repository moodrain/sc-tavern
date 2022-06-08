import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'
import App from './App.vue'
import { routes } from './route.js'

const app = createApp(App)

const router = createRouter({
    history: createWebHistory(),
    routes,
  })

app.use(ElementPlus)
app.use(router)
app.mount('#app')