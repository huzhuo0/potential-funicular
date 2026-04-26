<template>
  <div>
    <!-- marquee标签 -->
    <div>js实现跑马灯效果</div>
    <div style="width: 300px; white-space: nowrap; border: 1px solid red">
      <MarqueeMarket :content="'天不生我老夫子，剑道万古如长夜'" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import MarqueeMarket from "./components/MarqueeMarket.vue";
onMounted(() => {});
</script>

<style scoped lang="less">
.padding-left-30 {
  padding-left: 30px;
}
.margin-bottom-30 {
  margin-bottom: 30px;
}
</style>
