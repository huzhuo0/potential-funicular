<template>
  <div class="base-a1-animation">
    <div class="kpi-list">
      <div v-for="(item, index) in kpiList" :key="index" class="kpi-item">
        <div class="kpi-item-icon">
          <img :src="item.icon" alt="" />
        </div>
        <div class="kpi-item-content">
          <div class="kpi-item-label">{{ item.label }}</div>
          <div class="kpi-item-value">
            {{ item.value }}<span class="kpi-item-unit">{{ item.unit }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import gqIcon from "./images/gq-icon.png";
import yjkIcon from "./images/yjk-icon.png";
import zbIcon from "./images/zb-icon.png";

const kpiList = ref([
  {
    label: "灌区可供水量",
    value: "2451",
    unit: "万m³",
    icon: gqIcon,
  },
  {
    label: "盐井口水库可供水量",
    value: "12.01",
    unit: "万m³",
    icon: yjkIcon,
  },
  {
    label: "左柏水库可供水量",
    value: "12.01",
    unit: "万m³",
    icon: zbIcon,
  },
]);
onMounted(() => {});
</script>

<style lang="less" scoped>
// 定义变量
@kpiItemWidth: 174px; // KPI项宽度
@kpiItemHeight: 78px; // KPI项高度
@kpiItemBg: url("./images/kpi-item-bg.png"); // KPI项背景图
@iconWidth: 41px; // 图标宽度
.base-a1-animation {
  width: 100%;
  background: linear-gradient(
    90deg,
    rgba(21, 33, 51, 0.76) 0%,
    rgba(25, 51, 105, 0.6) 100%
  );
  .kpi-list {
    margin: 27px 0 33px 0;
    width: 100%;
    height: @kpiItemHeight;
    display: flex;
    justify-content: space-between;
    padding: 0 5px 0 5px;

    .kpi-item {
      width: @kpiItemWidth;
      height: 100%;
      padding-left: 8px;
      display: flex;
      align-items: center;
      background-image: @kpiItemBg;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      .kpi-item-icon {
        width: @iconWidth;
        height: @iconWidth;
        margin-right: 8px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .kpi-item-content {
        font-family: PingFangSC-Medium, PingFang SC;
        .kpi-item-label {
          font-weight: 500;
          font-size: 12px;
          color: #ffffff;
        }
        .kpi-item-value {
          font-family: D-DIN-Bold;
          font-weight: 700;
          font-size: 16px;
          color: #00d4ff;
          span {
            color: #cad0dc;
            font-size: 12px;
            font-weight: 400;
            margin-left: 4px;
            font-family: PingFangSC-Medium, PingFang SC;
          }
        }
      }
    }
  }
}
</style>
