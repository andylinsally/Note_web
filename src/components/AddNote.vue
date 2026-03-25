<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useNoteStore } from '../store/data_store'

// 1. 初始化工具
const noteStore = useNoteStore()
const router = useRouter()

// 2. 定義響應式變數 (用來接住輸入框的資料)
const title = ref('')
const content = ref('')

// 3. 儲存邏輯
const handleSave = () => {
  // 簡單的防呆：標題跟內容不能是空的
  if (!title.value.trim() || !content.value.trim()) {
    alert('標題和內容都要填寫喔！')
    return
  }

  // 呼叫 Pinia 的 Action
  noteStore.addNote({
    title: title.value,
    content: content.value
  })

  // 儲存完畢後，導向首頁 (/)
  router.push('/')
}

// 4. 取消邏輯
const handleCancel = () => {
  router.push('/')
}
</script>

<template>
  <div class="add-note-container animate__animated animate__fadeIn">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h4 class="fw-bold text-primary">
        <i class="fa-solid fa-circle-plus me-2"></i>新增便利貼
      </h4>
    </div>

    <div class="card shadow-sm border-0 p-4 bg-light">
      <form @submit.prevent="handleSave">
        <div class="mb-4">
          <label class="form-label fw-bold text-secondary">筆記標題</label>
          <input 
            v-model="title" 
            type="text" 
            class="form-control form-control-lg border-0 shadow-none" 
            placeholder="請輸入標題..."
            autofocus
          >
        </div>

        <div class="mb-4">
          <label class="form-label fw-bold text-secondary">筆記內容</label>
          <textarea 
            v-model="content" 
            class="form-control border-0 shadow-none" 
            rows="10" 
            placeholder="開始寫下你的點子..."
          ></textarea>
        </div>

        <div class="d-flex justify-content-end gap-2 border-top pt-4">
          <button type="button" @click="handleCancel" class="btn btn-light px-4">取消</button>
          <button type="submit" class="btn btn-primary px-4">儲存並建立</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.add-note-container {
  max-width: 800px;
  margin: 0 auto;
}
/* 讓輸入框看起來更像一張紙 */
.form-control {
  background-color: #fff;
  border-radius: 8px;
}
.form-control-lg {
  font-size: 1.5rem;
  font-weight: bold;
}
textarea {
  resize: none; /* 禁止縮放 */
}
</style>