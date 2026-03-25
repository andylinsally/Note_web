<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useNoteStore } from "../store/data_store";

// 1. 初始化
const noteStore = useNoteStore();
const router = useRouter();

// 2. 取得「加工後」的筆記 (已處理搜尋與釘選排序)
// 我們直接跟 Store 要 filteredNotes，這樣搜尋功能才會動！
const displayNotes = computed(() => noteStore.filteredNotes);

// 3. 功能邏輯
const handleTogglePin = (id) => {
  noteStore.togglePin(id);
};

const handleDelete = (id) => {
  if (confirm("確定要刪除這張便利貼嗎？")) {
    noteStore.deleteNote(id);
  }
};

const goToEdit = (id) => {
  router.push(`/edit/${id}`);
};
</script>

<template>
  <div class="container-fluid p-0">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h4 class="fw-bold text-dark">我的便利貼</h4>
      <span class="badge bg-primary rounded-pill"
        >共 {{ displayNotes.length }} 則</span
      >
    </div>

    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      <div v-for="note in displayNotes" :key="note.id" class="col">
        <div
          class="card h-100 shadow-sm border-0 note-card"
          :class="{ 'pinned-border': note.pinned }"
        >
          <button
            @click.stop="handleTogglePin(note.id)"
            class="btn btn-link pin-btn"
            :class="note.pinned ? 'text-warning' : 'text-light-gray'"
          >
            <i
              class="fa-solid fa-thumbtack"
              :class="note.pinned ? 'bi-pin-angle-fill' : 'bi-pin-angle'"
            ></i>
          </button>

          <div
            class="card-body d-flex flex-column p-4"
            @click="goToEdit(note.id)"
          >
            <h5 class="card-title fw-bold text-truncate mb-3">
              {{ note.title }}
            </h5>
            <p class="card-text text-secondary flex-grow-1">
              {{ note.content }}
            </p>

            <div
              class="d-flex justify-content-between align-items-center mt-3 pt-2 border-top"
            >
              <small class="text-muted">{{
                new Date(note.createdAt).toLocaleDateString()
              }}</small>
              <button
                @click.stop="handleDelete(note.id)"
                class="btn btn-outline-danger btn-sm border-0"
              >
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="displayNotes.length === 0" class="text-center py-5">
      <i class="fa-solid fa-magnifying-glass fs-1"></i>
      <p class="mt-3 text-muted">找不到相關筆記，換個關鍵字試試？</p>
    </div>
  </div>
</template>

<style scoped>
/* 自訂便利貼樣式 */
.note-card {
  cursor: pointer;
  background-color: #fffde7; /* 經典便利貼黃 */
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}
.note-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}
/* 釘選時的邊框強調 */
.pinned-border {
  border-left: 5px solid #ffc107 !important;
}
.pin-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
  font-size: 1.2rem;
  padding: 0;
  text-decoration: none;
}
.text-light-gray {
  color: #dee2e6;
}
.card-text {
  display: -webkit-box;
  -webkit-line-clamp: 4; /* 最多顯示 4 行內容 */
  line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.6;
}
</style>
