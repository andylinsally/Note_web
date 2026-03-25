<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useNoteStore } from '../store/data_store'

const noteStore = useNoteStore()
const router = useRouter()

const pinnedNotes = computed(() => noteStore.notes.filter(n => n.pinned))
const unpinnedNotes = computed(() => noteStore.notes.filter(n => !n.pinned))

const goToEdit = (id) => {
  router.push(`/edit/${id}`)
}

const handleTogglePin = (id) => {
  noteStore.togglePin(id)
}

// 新增：處理刪除動作
const handleDelete = (id) => {
  if (confirm('確定要刪除這則筆記嗎？')) {
    noteStore.deleteNote(id)
    // 邏輯小貼心：如果你正好在編輯這則筆記，刪除後要跳回首頁
    // 檢查目前網址的 ID 是否就是被刪除的 ID
    const currentId = Number(window.location.pathname.split('/').pop())
    if (currentId === id) {
      router.push('/')
    }
  }
}
</script>

<template>
  <div class="note-list-container p-3">
    
    <div class="mb-4">
      <h6 class="text-warning fw-bold mb-3 small text-uppercase">
        <i class="fa-solid fa-thumbtack me-1"></i> 已釘選 ({{ pinnedNotes.length }})
      </h6>
      <div class="list-group list-group-flush">
        <div 
          v-for="note in pinnedNotes" 
          :key="note.id"
          class="list-group-item list-group-item-action border-0 rounded mb-1 d-flex align-items-center justify-content-between p-2 note-item"
          @click="goToEdit(note.id)"
        >
          <div class="d-flex align-items-center text-truncate">
            <button @click.stop="handleTogglePin(note.id)" class="btn btn-link p-0 me-2 text-decoration-none text-warning">
              <i class="fa-solid fa-thumbtack"></i>
            </button>
            <span class="text-truncate small fw-bold">{{ note.title }}</span>
          </div>
          
          <button @click.stop="handleDelete(note.id)" class="btn btn-link p-0 text-danger delete-btn">
            <i class="fa-solid fa-trash small"></i>
          </button>
        </div>
      </div>
    </div>

    <hr class="my-4 text-secondary opacity-25">

    <div>
      <h6 class="text-secondary fw-bold mb-3 small text-uppercase">
        <i class="fa-solid fa-caret-down me-1"></i> 其他筆記 ({{ unpinnedNotes.length }})
      </h6>
      <div class="list-group list-group-flush">
        <div 
          v-for="note in unpinnedNotes" 
          :key="note.id"
          class="list-group-item list-group-item-action border-0 rounded mb-1 d-flex align-items-center justify-content-between p-2 note-item"
          @click="goToEdit(note.id)"
        >
          <div class="d-flex align-items-center text-truncate">
            <button @click.stop="handleTogglePin(note.id)" class="btn btn-link p-0 me-2 text-decoration-none text-secondary">
              <i class="fa-solid fa-thumbtack"></i>
            </button>
            <span class="text-truncate small">{{ note.title }}</span>
          </div>

          <button @click.stop="handleDelete(note.id)" class="btn btn-link p-0 text-danger delete-btn">
            <i class="fa-solid fa-trash small"></i>
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.note-item .delete-btn {
  opacity: 0; /* 平常隱藏起來，畫面比較乾淨 */
  transition: opacity 0.2s;
}
.note-item:hover .delete-btn {
  opacity: 1; /* 滑鼠移上去才顯示垃圾桶 */
}
.btn-link:hover {
  transform: scale(1.1);
}
.text-light-gray {
  color: #dee2e6;
}
</style>