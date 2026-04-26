<template>
  <div>
    <!-- marquee标签 -->
    <div>js实现跑马灯效果</div>
    <div style="width: 300px; white-space: nowrap; border: 1px solid red">
      <!-- <Marquee
        :content="'天不生我老夫子，剑道万古如长夜1234567891011121314151617181920'"
      /> -->
      <Marquee
        :content="'天不生我老夫子，剑道万古如长夜1234567891011121314151617181920'"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Marquee from "./components/Marquee2.vue";
onMounted(() => {});
</script>

<style scoped lang="less"></style>
