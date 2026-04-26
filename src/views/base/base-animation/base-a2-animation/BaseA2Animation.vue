<template>
  <div class="base-a2-animation">
    <FerrisWheel></FerrisWheel>
  </div>
</template>

<script setup>
import FerrisWheel from "./FerrisWheel";
</script>

<style lang="less" scoped>
.base-a2-animation {
  width: 100%;
  background: linear-gradient(
    90deg,
    rgba(21, 33, 51, 0.76) 0%,
    rgba(25, 51, 105, 0.6) 100%
  );
  padding: 30px 0 0 40px;
}
</style>
