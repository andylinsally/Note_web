// src/router/main_router.js
import { createRouter, createWebHistory } from 'vue-router'

// 1. 匯入我們要切換的「零件」(Components)
import NoteGrid from '../components/NoteGrid.vue'
import AddNote from '../components/AddNote.vue'
import EditNote from '../components/EditNote.vue'

// 2. 定義路由表：網址對應哪個元件
const routes = [
  {
    path: '/',          // 當網址是首頁時
    name: 'Home',
    component: NoteGrid // 顯示所有筆記網格
  },
  {
    path: '/add',       // 當網址是 /add 時
    name: 'AddNote',
    component: AddNote  // 顯示新增表單
  },
  {
    path: '/edit/:id',  // :id 是動態變數，代表筆記的編號
    name: 'EditNote',
    component: EditNote,
    props: true         // 允許把網址上的 id 直接傳進元件當作變數用
  }
]

// 3. 建立路由實例
const router = createRouter({
  history: createWebHistory(), // 使用漂亮的網址路徑 (不帶 # 號)
  routes
})

export default router