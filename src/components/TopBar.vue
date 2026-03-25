<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useNoteStore } from '../store/data_store.js'

// 1. 初始化大腦 (Store) 和 導航 (Router)
const noteStore = useNoteStore()
const router = useRouter()

// 2. 建立一個本地變數來接住使用者輸入的關鍵字
const searchText = ref('')

// 3. 監控輸入框的變化 (Watch)
// 當 searchText 改變時，立刻把值傳給 Store 的 searchQuery
watch(searchText, (newVal) => {
  noteStore.searchQuery = newVal
  
  // 邏輯小巧思：如果使用者正在搜尋，自動幫他跳回首頁 (NoteGrid) 顯示結果
  if (newVal.length > 0) {
    router.push('/')
  }
})

// 4. 清除搜尋的方法
const clearSearch = () => {
  searchText.value = ''
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light px-4 py-2">
    <div class="container-fluid p-0">
      
      <router-link to="/" class="navbar-brand d-flex align-items-center fw-bold text-primary" @click="clearSearch">
        <img src="../assets/note_logo.png" alt="Logo" width="35" class="me-2">
        <span>我的筆記王</span>
      </router-link>

      <div class="mx-auto" style="width: 40%;">
        <div class="input-group">
          <span class="input-group-text bg-light border-end-0">
            <i class="fa-solid fa-magnifying-glass"></i> </span>
          <input 
            v-model="searchText" 
            type="text" 
            class="form-control bg-light border-start-0" 
            placeholder="搜尋標題或內容..."
          >
        </div>
      </div>

      <div class="d-flex">
        <router-link to="/add" class="btn btn-primary d-flex align-items-center">
          <i class="fa-solid fa-plus me-1"></i> 新增筆記
        </router-link>
      </div>

    </div>
  </nav>
</template>

<style scoped>
/* 讓 Logo 不要縮太小 */
.navbar-brand img {
  object-fit: contain;
}
/* 搜尋框聚焦時的發光效果 */
.form-control:focus {
  box-shadow: none;
  border-color: #dee2e6;
  background-color: #fff !important;
}
</style>