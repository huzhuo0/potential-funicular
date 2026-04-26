<template>
  <div>
    <!-- substr()  substring()  slice() -->
    <SubstrSubstringSlice />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import SubstrSubstringSlice from "./components/SubstrSubstringSlice.vue";
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
