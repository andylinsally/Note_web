<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useNoteStore } from "../store/data_store";

// 1. 初始化工具
const noteStore = useNoteStore();
const router = useRouter();
const route = useRoute(); // 用來取得網址上的參數 (ID)

// 2. 定義變數 (先空著，等等從 Store 填入)
const title = ref("");
const content = ref("");
const noteId = ref(null);

// 1. 建立一個「撈資料」的共用函式
const loadNoteData = () => {
  const idFromUrl = Number(route.params.id);
  const existingNote = noteStore.notes.find((n) => n.id === idFromUrl);

  if (existingNote) {
    noteId.value = existingNote.id;
    title.value = existingNote.title;
    content.value = existingNote.content;
    console.log(`成功載入筆記 ID: ${idFromUrl}`);
  } else {
    router.push("/");
  }
};

// 2. 當元件第一次出現時，執行一次
onMounted(() => {
  loadNoteData();
});

// 3. 重點：監控網址參數 id 的變化！
// 當 route.params.id 改變時，重新執行 loadNoteData
watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      loadNoteData();
    }
  },
);

// 4. 更新邏輯
const handleUpdate = () => {
  if (!title.value.trim() || !content.value.trim()) {
    alert("標題和內容不能空白喔！");
    return;
  }

  // 呼叫 Store 的更新方法 (我們在第一步已經寫好 logic 了)
  // 注意：我們在 data_store.js 的 updateNote 是根據 ID 找人
  const index = noteStore.notes.findIndex((n) => n.id === noteId.value);
  if (index !== -1) {
    noteStore.notes[index].title = title.value;
    noteStore.notes[index].content = content.value;
    // 修改完後回首頁
    router.push("/");
  }
};

// 5. 刪除邏輯 (編輯頁面通常也會放一個刪除鈕)
const handleDelete = () => {
  if (confirm("確定要永久刪除這則筆記嗎？")) {
    noteStore.deleteNote(noteId.value);
    router.push("/");
  }
};
</script>

<template>
  <div class="edit-note-container animate__animated animate__fadeIn">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h4 class="fw-bold text-success">
        <i class="fa-solid fa-pen-to-square me-2"></i>修改筆記
      </h4>
      <button
        @click="handleDelete"
        class="btn btn-outline-danger btn-sm border-0"
      >
        <i class="fa-solid fa-trash me-1"></i>刪除筆記
      </button>
    </div>

    <div class="card shadow-sm border-0 p-4 bg-light">
      <form @submit.prevent="handleUpdate">
        <div class="mb-4">
          <label class="form-label fw-bold text-secondary">標題</label>
          <input
            v-model="title"
            type="text"
            class="form-control form-control-lg border-0 shadow-none"
          />
        </div>

        <div class="mb-4">
          <label class="form-label fw-bold text-secondary">內容</label>
          <textarea
            v-model="content"
            class="form-control border-0 shadow-none"
            rows="10"
          ></textarea>
        </div>

        <div class="d-flex justify-content-end gap-2 border-top pt-4">
          <button
            type="button"
            @click="router.push('/')"
            class="btn btn-light px-4"
          >
            取消
          </button>
          <button type="submit" class="btn btn-success text-white px-4">
            更新並儲存
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.edit-note-container {
  max-width: 800px;
  margin: 0 auto;
}
.form-control {
  background-color: #fff;
}
</style>
