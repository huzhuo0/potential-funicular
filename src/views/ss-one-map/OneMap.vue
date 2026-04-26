<!--
 * @Author: huzhuo 1144291576@qq.com
 * @Date: 2025-06-23 15:26:15
 * @LastEditors: huzhuo 1144291576@qq.com
 * @LastEditTime: 2025-06-24 09:08:20
 * @FilePath: \hz-project\src\views\ss-one-map\OneMap.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="ss-one-map">
    <ScaleBox
      :width="1920"
      :height="1080"
      bgc="transparent"
      :delay="100"
      :is-flat="true"
    >
      <!-- <MapHeader /> -->
      <router-view></router-view>
    </ScaleBox>
  </div>
</template>

<script setup>
import ScaleBox from "@/components/scale-box/ScaleBox.vue";
// import MapHeader from "./common/layout/MapHeader.vue";
</script>

<style lang="less" scoped>
.ss-one-map {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: red;
  z-index: 9999;
}
</style>
