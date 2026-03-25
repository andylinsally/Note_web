<script setup>
// 1. 引入我們要顯示的區塊元件
import TopBar from './components/TopBar.vue'
import NoteList from './components/NoteList.vue'
</script>

<template>
  <div class="container-fluid vh-100 d-flex flex-column p-0">
    
    <header class="border-bottom bg-white">
      <TopBar />
    </header>

    <div class="row flex-grow-1 m-0 overflow-hidden">
      
      <aside class="col-md-3 col-lg-2 p-0 h-100 border-end bg-light overflow-auto">
        <NoteList />
      </aside>

      <main class="col-md-9 col-lg-10 p-4 h-100 bg-white overflow-auto">
        <router-view></router-view>
      </main>

    </div>
  </div>
</template>

<style>
/* 讓捲軸變漂亮一點 (選配) */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 10px;
}
</style>