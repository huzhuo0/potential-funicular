<template>
  <div class="inspect-template">
    <a-button type="default" @click="onMap">进入地图</a-button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { onMounted } from "vue";
const router = useRouter();
function onMap() {
  console.log(process.env.VUE_APP_BASE_URL, "process.env.VUE_APP_BASE_URL=");
  const route = router.resolve("/ss-one-map");
  // 使用 window.open 打开新窗口
  window.open(route.href, "_blank");
}
</script>

<style scoped lang="less">
.inspect-template {
  color: red;
}
</style>
