<template>
  <div class="p-3 h-40 flex flex-col overflow-hidden">
    <div class="text-slate-300 text-center text-sm tracking-[0.22em]">
      城市风采
    </div>
    <div class="text-slate-300 text-center text-sm tracking-[0.22em]">
      哈吉米省是一座文化背景丰富的美丽城市，拥有独特的景观
    </div>
    <div class="mt-2 h-20 rounded-xl overflow-hidden border border-cyan-200/15 bg-slate-950/20 shrink-0">
      <div class="h-full grid grid-cols-3 gap-2 px-2 items-center">
        <div
          v-for="(item, index) in visibleImages"
          :key="`${item}-${index}`"
          class="h-full rounded-lg overflow-hidden bg-black/10 flex items-center justify-center"
        >
          <img
            :src="item"
            class="h-[88%] w-full object-contain"
            alt="城市风采"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import meme1 from "../assets/imgs/meme1.gif";
import meme2 from "../assets/imgs/meme2.gif";
import meme3 from "../assets/imgs/meme3.gif";
import meme4 from "../assets/imgs/meme4.gif";
import meme5 from "../assets/imgs/meme5.gif";
import meme6 from "../assets/imgs/meme6.gif";
import meme7 from "../assets/imgs/meme7.gif";
import meme8 from "../assets/imgs/meme8.gif";
import meme9 from "../assets/imgs/meme9.gif";

const memeImages = [meme1, meme2, meme3, meme4, meme5, meme6, meme7, meme8, meme9];
const currentStartIndex = ref(0);

const visibleImages = computed(() => {
  const result = [];

  for (let offset = 0; offset < 3; offset += 1) {
    const imageIndex = (currentStartIndex.value + offset) % memeImages.length;
    result.push(memeImages[imageIndex]);
  }

  return result;
});

let timerId = null;

onMounted(() => {
  timerId = window.setInterval(() => {
    currentStartIndex.value = (currentStartIndex.value + 3) % memeImages.length;
  }, 5000);
});

onUnmounted(() => {
  if (timerId) {
    window.clearInterval(timerId);
  }
});
</script>
