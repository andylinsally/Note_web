// src/store/data_store.js
import { defineStore } from "pinia";

// 1. 定義一個名為 'noteStore' 的倉庫
export const useNoteStore = defineStore("noteStore", {
  // State: 存放原始資料的地方 (像資料庫)
  state: () => ({
    notes: [
      {
        id: 1,
        title: "提拉米蘇配方",
        content:
          "材料：馬斯卡彭起司 250g、鮮奶油 150ml、砂糖 30g、濃縮咖啡、咖啡酒、手指餅乾。手指餅乾泡咖啡液只要一秒，不然會太軟。",
        pinned: false,
        createdAt: new Date(),
      },
      {
        id: 2,
        title: "焦糖布丁烘烤時間",
        content:
          "焦糖液：糖 50g、水 15ml、熱水 15ml。布丁液：雞蛋 2顆、牛奶 250ml、糖 30g。使用烤箱水浴法，150度烤約 40 分鐘。",
        pinned: false,
        createdAt: new Date(),
      },
      {
        id: 3,
        title: "檸檬塔注意事項",
        content:
          "塔皮揉好後需要冷藏至少 30 分鐘讓麵筋鬆弛再烤。檸檬餡比例：檸檬汁 80ml、糖 80g、全蛋 2顆、無鹽奶油 80g，隔水加熱至濃稠。",
        pinned: true,
        createdAt: new Date(),
      },
      {
        id: 4,
        title: "瑪德蓮凸肚臍秘訣",
        content:
          "麵糊拌勻後一定要包保鮮膜冷藏至少一個晚上（或12小時），利用冷熱溫差，這樣進烤箱烤出來才會有漂亮的凸肚臍！",
        pinned: false,
        createdAt: new Date(),
      },
      {
        id: 5,
        title: "巧克力布朗尼",
        content:
          "建議使用 70% 苦甜巧克力，風味最大人。烘烤時間大約 180度 20-25 分鐘，竹籤戳入帶有少許濕潤麵糊即可，不要烤太乾。",
        pinned: false,
        createdAt: new Date(),
      },
      {
        id: 6,
        title: "草莓生乳酪蛋糕",
        content:
          "吉利丁片使用前要先泡冰水（一定要冰水不然會融化）軟化。消化餅乾底加上融化奶油後，在模具底部一定要壓緊實，不然切開會散掉。",
        pinned: false,
        createdAt: new Date(),
      },
      {
        id: 7,
        title: "抹茶磅蛋糕",
        content:
          "無鹽奶油和蛋液都要先退冰到室溫。蛋液必須分三到四次慢慢加入打發的奶油中，避免油水分離。烤15分鐘後可以拿出來在中間劃一刀，裂口會比較漂亮。",
        pinned: true,
        createdAt: new Date(),
      },
      {
        id: 8,
        title: "經典法式千層蛋糕",
        content:
          "麵糊拌好後建議靜置 30 分鐘以上甚至過夜，讓筋性放鬆，煎出來的餅皮才會柔軟。一個 8 吋蛋糕大約需要準備 20-25 片餅皮。",
        pinned: false,
        createdAt: new Date(),
      },
      {
        id: 9,
        title: "馬卡龍失敗原因總結",
        content:
          "1. 杏仁粉和糖粉沒有過篩。2. 蛋白霜打得不夠挺（要打到硬性發泡）。3. 烤之前沒有放置結皮（表面摸起來不能黏手）。",
        pinned: false,
        createdAt: new Date(),
      },
      {
        id: 10,
        title: "肉桂捲發酵溫度",
        content:
          "麵團發酵溫度控制在 28度 左右最理想。內餡的肉桂粉和黑糖比例可以依個人喜好調整，麵團抹上一層軟化奶油後再灑粉會更服貼、不易掉落。",
        pinned: false,
        createdAt: new Date(),
      },
    ],
    searchQuery: "", // 記錄使用者在搜尋框輸入的文字
  }),

  // Getters: 加工後的資料 (像過濾器)
  getters: {
    // 根據搜尋字串過濾筆記，並讓釘選的排在前面
    filteredNotes: (state) => {
      let result = state.notes;

      // 如果搜尋框有字，就進行過濾
      if (state.searchQuery) {
        result = result.filter(
          (n) =>
            n.title.includes(state.searchQuery) ||
            n.content.includes(state.searchQuery),
        );
      }

      // 排序邏輯：pinned 為 true 的排在 false 前面
      return result.slice().sort((a, b) => b.pinned - a.pinned);
    },
  },

  // Actions: 修改資料的方法 (像指令)
  actions: {
    addNote(newNote) {
      // 幫新筆記加上 ID 和時間，然後塞進陣列
      this.notes.push({
        ...newNote,
        id: Date.now(),
        pinned: false,
        createdAt: new Date(),
      });
    },
    deleteNote(id) {
      // 過濾掉該 ID，達成刪除效果
      this.notes = this.notes.filter((n) => n.id !== id);
    },
    togglePin(id) {
      // 找到該筆記，把它的 pinned 狀態反轉 (true 變 false)
      const note = this.notes.find((n) => n.id === id);
      if (note) note.pinned = !note.pinned;
    },
  },
});
