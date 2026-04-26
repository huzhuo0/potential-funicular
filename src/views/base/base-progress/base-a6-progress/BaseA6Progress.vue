<template>
  <div class="base-a6-progress">
    <div class="progress-bars">
      <PercentBar :data-source="perData1" />
      <PercentBar :data-source="perData2" />
      <div class="process-container">
        <PercentBar :data-source="perData3" />
        <PercentBar :data-source="perData4" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import PercentBar from "./PercentBar";
const perData1 = ref({
  text1: "单位工程数",
  text2: "合格数",
  text3: "优良数",
  value1: 100,
  value2: 23,
  value3: 1,
  percent: 23,
  barColor: "blue",
});
const perData2 = ref({
  text1: "分部工程数",
  text2: "合格数",
  text3: "优良数",
  value1: 100,
  value2: 23,
  value3: 1,
  percent: 33,
  barColor: "blue",
});
const perData3 = ref({
  text1: "单元工程数",
  text2: "合格数",
  text3: "优良数",
  value1: 100,
  value2: 12,
  value3: 13,
  percent: 66,
  barColor: "green",
});
const perData4 = ref({
  text1: "单元工程数",
  text2: "合格数",
  text3: "优良数",
  value1: 100,
  value2: 12,
  value3: 13,
  percent: 95,
  barColor: "green",
});
</script>

<style lang="less" scoped>
.base-a6-progress {
  width: 100%;
  background: linear-gradient(
    90deg,
    rgba(21, 33, 51, 0.76) 0%,
    rgba(25, 51, 105, 0.6) 100%
  );

  .left-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left-title-text {
      font-family: PingFangSC, PingFang SC;
      font-weight: 600;
      font-size: 12px;
      color: #ffffff;
    }
    .rate {
      font-family: PingFangSC, PingFang SC;
      font-weight: 600;
      font-size: 16px;
      color: #7fed7d;
    }
  }
}
</style>
