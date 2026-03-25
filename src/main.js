import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// 引入 Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'
// 可選：引入 Bootstrap JS (某些元件如 Modal, Dropdown 需要)
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import router from './router/main_router'
import { createPinia } from 'pinia'

createApp(App).use(router).use(createPinia()).mount('#app')
