<template>
  <div class="base-charts">
    <a-row class="chart-row" :gutter="16">
      <a-col
        v-for="(item, index) in progressList"
        :key="index"
        :span="getItemSpan(index)"
        class="chart-item"
      >
        <component :is="item.component" class="chart-wrap"></component>
        <div class="chart-title">{{ item.name }}</div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import allProgressComponent from "./all-progress.js";
import { onMounted, computed } from "vue";
const progressList = computed(() => {
  return Object.keys(allProgressComponent).map((key) => {
    return {
      name: key,
      component: allProgressComponent[key],
    };
  });
});
onMounted(() => {});
function getItemSpan(index = 6) {
  // if (index === 1) return 8;
  return 6;
}
defineOptions({
  name: "BaseCharts",
});
</script>

<style lang="less" scoped>
.base-charts {
  // padding: 20px;
  // display: flex;
  // flex-wrap: wrap;
  // gap: 10px;
  .chart-row {
    display: flex;
    align-items: center;
    // justify-content: space-between;
    .chart-item {
      width: 100%;
      height: 270px;
      margin-bottom: 10px;
      display: flex;
      flex-direction: column;
      .chart-wrap {
        height: calc(100% - 40px);
      }
      .chart-title {
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        text-align: center;
        font-family: YouSheBiaoTiHei;
      }
    }
  }
}
</style>
