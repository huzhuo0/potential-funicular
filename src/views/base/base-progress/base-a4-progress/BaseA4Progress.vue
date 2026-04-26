<template>
  <div class="base-a4-progress">
    <div class="left-title">
      <div class="left-title-text">问题整改率</div>
      <div class="rate">{{ percentData }}%</div>
    </div>
    <a-progress
      style="margin-top: -5px"
      :show-info="false"
      :percent="percentData"
      status="active"
      stroke-linecap="square"
      :stroke-color="{
        to: 'rgba(152, 221, 81, 1)',
        from: 'rgba(81, 221, 167, 1)',
      }"
    ></a-progress>
  </div>
</template>

<script setup>
import { ref } from "vue";
const percentData = ref(66);
</script>

<style lang="less" scoped>
/deep/ .ant-progress-inner {
  //   background-color: rgba(208, 222, 238, 0.1) !important;
  border-radius: 0px !important;
  //   overflow: unset !important;
}

.base-a4-progress {
  width: 100%;
  padding: 20px;
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
