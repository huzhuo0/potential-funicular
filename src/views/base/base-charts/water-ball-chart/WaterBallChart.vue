<template>
  <div class="inspect-pie-chart">
    <div class="farm-need-water-wrap">
      <div
        class="farm-need-water-item"
        v-for="item in farmNeedWaterList"
        :key="item.title"
      >
        <WaveBall :percent="item.percent" />
        <!-- <div class="farm-need-water-item-title">{{ item.title }}</div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import WaveBall from "./WaveBall.vue";
// 农业需水保障情况
const farmNeedWaterList = ref([
  {
    title: "礼让供水保障率",
    percent: 50,
  },
]);
onMounted(() => {});
</script>

<style lang="less" scoped>
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.inspect-pie-chart {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(21, 33, 51, 0.76) 0%,
    rgba(25, 51, 105, 0.6) 100%
  );
  position: relative;

  .farm-need-water-wrap {
    display: flex;
    width: 100%;
    padding: 0 24px 8px 24px;
    justify-content: space-between;
    .farm-need-water-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .farm-need-water-item-title {
        font-size: 30px;
        color: #ffffff;
        font-weight: 500;
      }
    }
  }
}
</style>
