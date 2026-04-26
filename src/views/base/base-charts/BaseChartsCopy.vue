<template>
  <div class="base-charts">
    <CompletePercentChart />
    <WarnLineFlowChart />
    <WarnLineWaterChart />
  </div>
</template>

<script setup>
import CompletePercentChart from "./complete-percent-chart/CompletePercentChart.vue";
import WarnLineFlowChart from "./warn-line-flow-chart/WarnLineFlowChart.vue";
import WarnLineWaterChart from "./warn-line-water-chart/WarnLineWaterChart.vue";
import allChartComponent from "./all-chart-component.js";
import { onMounted } from "vue";
onMounted(() => {
  console.log(allChartComponent, "allChartComponent");
});
defineOptions({
  name: "BaseChartsCopy",
});
</script>

<style lang="less" scoped>
.base-charts {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  gap: 10px;
  margin-bottom: 10px;
}
</style>
