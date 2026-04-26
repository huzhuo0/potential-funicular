<template>
  <div class="base-a1-animation">
    <div class="chart-right">
      <div
        v-for="(item, index) in pieOptionData"
        :key="index"
        class="legend-item"
      >
        <div
          class="legend-icon"
          :style="{ backgroundColor: item.itemStyle.color }"
        ></div>
        <div class="legend-label">
          {{ item.name }}
        </div>
        <div class="legend-value">{{ item.value }}</div>
        <div class="legend-unit">{{ item.unit }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const pieOptionData = ref([
  {
    name: "农业需水量",
    value: "689.96",
    unit: "m³",
    itemStyle: {
      color: "#42f2b0",
    },
  },
  {
    name: "工业需水量",
    value: "82.02",
    unit: "m³",
    itemStyle: {
      color: "#0e85f3",
    },
  },
  {
    name: "生活需水量",
    value: "225.05",
    unit: "m³",
    itemStyle: {
      color: "#f39c2b",
    },
  },
  {
    name: "生态需水量",
    value: "248.91",
    unit: "m³",
    itemStyle: {
      color: "#edd92b",
    },
  },
]);
onMounted(() => {});
</script>

<style lang="less" scoped>
// 定义变量
@kpiItemWidth: 174px; // KPI项宽度
@kpiItemHeight: 78px; // KPI项高度
@kpiItemBg: url("./images/legend-item-bg.png"); // KPI项背景图
@iconWidth: 41px; // 图标宽度
.base-a1-animation {
  width: 100%;
  background: linear-gradient(
    90deg,
    rgba(21, 33, 51, 0.76) 0%,
    rgba(25, 51, 105, 0.6) 100%
  );
  .chart-right {
    width: 320px;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 10px 14px;
    gap: 10px;

    .legend-item {
      width: 100%;
      height: 36px;
      display: flex;
      align-items: center;
      padding: 0 14px 0 14px;
      background-image: @kpiItemBg;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      .legend-icon {
        width: 12px;
        height: 12px;
        border-radius: 6px;
        margin-right: 10px;
        // &.legend-icon-0 {
        //   background: #42f2b0;
        // }
        // &.legend-icon-1 {
        //   background: #0e85f3;
        // }
        // &.legend-icon-2 {
        //   background: #f39c2b;
        // }
        // &.legend-icon-3 {
        //   background: #edd92b;
        // }
      }
      .legend-label {
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 400;
        font-size: 14px;
        color: #ffffff;
        margin-right: 10px;
        width: 100px;
        text-align: left;
      }
      .legend-value {
        // width: 200px;
        width: 100px;
        text-align: right;
        font-family: D-DIN-Bold;
        font-weight: 700;
        font-size: 16px;
        color: #ffffff;
      }
      .legend-unit {
        color: #cad0dc;
        font-size: 12px;
        font-weight: 400;
        margin-left: 2px;
        font-family: PingFangSC-Medium, PingFang SC;
        position: relative;
        top: 2px;
      }
    }
  }
}
</style>
