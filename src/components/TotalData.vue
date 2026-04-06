<template>
  <div class="p-3 h-40 flex flex-col overflow-hidden">
    <div class="text-slate-300 text-center text-sm tracking-[0.22em]">
      城市风采
    </div>
    <div class="text-slate-300 text-center text-sm tracking-[0.22em]">
      辽宁省位于中国东北沿海，是连接东北与环渤海的重要枢纽。
      本项目从城市发展、产业经济与人口结构等维度，呈现辽宁的综合态势。
    </div>
    <div
      class="mt-2 h-20 rounded-xl overflow-hidden border border-cyan-200/15 bg-slate-950/20 shrink-0"
    >
      <div class="h-full grid grid-cols-3 gap-2 px-2 items-center">
        <div
          v-for="(item, index) in visibleImages"
          :key="`${item}-${index}`"
          class="h-full rounded-lg overflow-hidden bg-black/10 flex items-center justify-center"
        >
          <img
            :src="item"
            class="h-[88%] w-full object-cover"
            alt="辽宁风景"
            loading="lazy"
            referrerpolicy="no-referrer"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";

const liaoningSceneryImages = [
  "https://commons.wikimedia.org/wiki/Special:FilePath/Mukden_palace_gate06.jpg",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Mukden_palace_Chongzheng_Hall_01.jpg",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Mukden_palace_Chongzheng_Hall_02.jpg",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Mukden_palace_Chongzheng_Hall_03.jpg",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Mukden_palace_Chongzheng_Hall_04.jpg",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Mukden_palace_Chongzheng_Hall_05.jpg",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Mukden_palace_Dazheng_Hall.jpg",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Mukden_palace_gate01.jpg",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Mukden_palace_library01.jpg",
];
const currentStartIndex = ref(0);

const visibleImages = computed(() => {
  const result = [];

  for (let offset = 0; offset < 3; offset += 1) {
    const imageIndex =
      (currentStartIndex.value + offset) % liaoningSceneryImages.length;
    result.push(liaoningSceneryImages[imageIndex]);
  }

  return result;
});

let timerId = null;

onMounted(() => {
  timerId = window.setInterval(() => {
    currentStartIndex.value =
      (currentStartIndex.value + 3) % liaoningSceneryImages.length;
  }, 5000);
});

onUnmounted(() => {
  if (timerId) {
    window.clearInterval(timerId);
  }
});
</script>
