<!--
 * @FilePath: \hz-project\src\App.vue
 * @Description: 
-->
<template>
  <div :style="{ width: width, height: height }" id="app-container">
    <div style="width: 100%; height: 100%" v-if="ifLogin">
      <GlobalLayout />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import GlobalLayout from "@/views/common/GlobalLayout";

const width = ref("100%");
const height = ref(window.innerHeight + "px");
const ifLogin = ref(true);

const token = computed(() => {
  return localStorage.token || "123";
});

onMounted(() => {
  window.onresize = () => {
    height.value = window.innerHeight + "px";
  };
});
</script>

<style lang="less">
@import "./assets/style/mixin.less";
#app-container {
  .backgroundCoverStyle("../homebg.jpg");
  user-select: none;
}

.ant-menu-item:hover {
  cursor: url("~@/assets/img/mousepoint.png") 20 5, pointer !important;
}
</style>
