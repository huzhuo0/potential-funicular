<template>
  <div class="base-charts">
    <a-row class="chart-row" :gutter="16">
      <a-col
        v-for="(item, index) in kpiList"
        :key="index"
        :span="item.spanValue"
        class="chart-item"
      >
        <component :is="item.component" class="chart-wrap"></component>
        <div class="chart-title">{{ item.name }}</div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import allKpiComponent from "./all-kpis.js";
import { onMounted, computed } from "vue";
const kpiList = computed(() => {
  return Object.keys(allKpiComponent).map((key) => {
    return {
      name: key,
      component: allKpiComponent[key],
      spanValue: spanMap[key] || 8,
    };
  });
});
const spanMap = {
  BaseA1KpiView: 8,
  BaseA2KpiView: 8,
  BaseA3KpiView: 8,
};
onMounted(() => {
  console.log(kpiList.value, "kpiList");
});
function getItemSpan(index = 6) {
  // if (index === 1) return 8;
  // if (index === 2) return 12;
  return 8;
}
defineOptions({
  name: "BaseKpi",
});
</script>

<style lang="less" scoped>
.base-charts {
  padding: 0px;
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
