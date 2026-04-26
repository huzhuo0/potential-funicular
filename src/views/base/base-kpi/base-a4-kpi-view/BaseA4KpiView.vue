<template>
  <div class="base-a4-kpi">
    <div class="pie-legend-content">
      <div
        v-for="(item, index) in currentList"
        :key="index"
        class="pie-legend-item"
      >
        <!-- <div class="legend-top"> -->
        <div :class="['legend-icon', `legend-icon-${index + 1}`]">
          <!-- <img :src="item.icon" alt="" /> -->
        </div>
        <div class="legend-label">{{ item.projectType }}</div>
        <!-- </div> -->
        <!-- <div class="legend-bottom"> -->
        <div class="legend-value">{{ item.projectCou }}</div>
        <!-- <div class="legend-unit">{{ item.unit }}</div> -->
        <div class="legend-percent-text">{{ "占比" }}</div>
        <div class="legend-percent">{{ item.rate }}%</div>
        <div class="legend-detail-icon"></div>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const currentList = ref([
  {
    projectType: "172项重大水利工程",
    projectCou: "4",
    unit: "个",
    rate: "25",
  },
  {
    projectType: "PPP水利项目",
    projectCou: "6",
    unit: "个",
    rate: "18.8",
  },
  {
    projectType: "水利薄弱环节建设项目",
    projectCou: "4",
    unit: "个",
    rate: "25",
  },
  {
    projectType: "市县立项项目",
    projectCou: "4",
    unit: "个",
    rate: "25",
  },
  {
    projectType: "其他水利建设项目",
    projectCou: "4",
    unit: "个",
    rate: "25",
  },
]);
onMounted(() => {});
</script>

<style lang="less" scoped>
// 定义变量
// @kpiItemWidth: 174px; // KPI项宽度
// @kpiItemHeight: 78px; // KPI项高度
// @kpiItemBg: url("./images/legend-item-bg.png"); // KPI项背景图
// @iconWidth: 41px; // 图标宽度
.base-a4-kpi {
  width: 100%;
  background: linear-gradient(
    90deg,
    rgba(21, 33, 51, 0.76) 0%,
    rgba(25, 51, 105, 0.6) 100%
  );
  .pie-legend-content {
    padding: 10px;
    // width: calc(100% - 160px);
    //   display: flex;
    //   flex-wrap: wrap;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .pie-legend-item {
      // padding: 7px 6px 3px 9px;
      // margin-bottom: 12px;
      // margin-right: 5px;
      display: flex;
      align-items: center;
      // flex-direction: column;
      // justify-content: space-between;
      // background-image: url("~@/assets/images/water-project-construction/long-pie-bg.png");
      // background-size: 100% 100%;
      // background-repeat: no-repeat;
      // .legend-top {
      //   display: flex;
      //   align-items: center;
      position: relative;
      &:hover {
        cursor: pointer;
      }
      .legend-icon {
        //   width: 16px;
        //   height: 15px;
        width: 8px;
        height: 8px;
      }
      .legend-icon-1 {
        //   background-image: url("~@/assets/images/water-project-construction/pie-legend-icon-1.png");
        //   background-size: 100% 100%;
        //   background-repeat: no-repeat;
        background: #1f9eff;
      }
      .legend-icon-2 {
        background: #00ffff;
        //   background-image: url("~@/assets/images/water-project-construction/pie-legend-icon-2.png");
        //   background-size: 100% 100%;
        //   background-repeat: no-repeat;
      }
      .legend-icon-3 {
        background: #f5e74f;
        //   background-image: url("~@/assets/images/water-project-construction/pie-legend-icon-3.png");
        //   background-size: 100% 100%;
        //   background-repeat: no-repeat;
      }
      .legend-icon-4 {
        background: #ff8317;
        //   background-image: url("~@/assets/images/water-project-construction/pie-legend-icon-4.png");
        //   background-size: 100% 100%;
        //   background-repeat: no-repeat;
      }
      .legend-icon-5 {
        background: #ffffff;
        //   background-image: url("~@/assets/images/water-project-construction/pie-legend-icon-5.png");
        //   background-size: 100% 100%;
        //   background-repeat: no-repeat;
      }
      .legend-icon-6 {
        background: #a18dd6;
        //   background-image: url("~@/assets/images/water-project-construction/pie-legend-icon-5.png");
        //   background-size: 100% 100%;
        //   background-repeat: no-repeat;
      }
      .legend-label {
        min-width: 130px;
        max-width: 130px;

        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 12px;
        color: #ffffff;
        line-height: 17px;
        text-shadow: 0px 1px 2px rgba(7, 44, 137, 0.5);
        text-align: left;
        margin-left: 8px;
      }
      // }
      // .legend-bottom {
      //   display: flex;
      //   align-items: center;
      //   padding-left: 19px;
      //   margin-top: 2px;
      .legend-value {
        font-family: D-DIN, D-DIN;
        font-size: 20px;
        color: #ffffff;
        font-weight: bold;
        text-align: right;
        margin-right: 20px;
        width: 40px;
        position: relative;
        &::after {
          content: "个";
          display: inline-block;
          // font-family: YouSheBiaoTiHei;
          font-size: 12px;
          color: #ffffff;
          position: absolute;
          right: -12px;
          top: 8px;
        }
        //   text-shadow: 0px 0px 10px rgba(0, 133, 255, 0.72);
        //   background: linear-gradient(
        //     270deg,
        //     #8dd2ff 0%,
        //     #ffffff 65%,
        //     // #5ec0ff 87%,
        //     #ffffff 100%
        //   );

        //   -webkit-background-clip: text;
        //   -webkit-text-fill-color: transparent;
      }
      .legend-unit {
        font-family: YouSheBiaoTiHei;
        font-size: 12px;
        color: #ffffff;

        //   text-shadow: 0px 0px 10px rgba(0, 133, 255, 0.72);
        //   background: linear-gradient(
        //     -180deg,
        //     #8dd2ff 0%,
        //     #ffffff 65%,
        //     // #5ec0ff 87%,
        //     #ffffff 100%
        //   );
        //   -webkit-background-clip: text;
        //   -webkit-text-fill-color: transparent;
        position: relative;
        top: 3px;
        margin: 0 8px 0 2px;
      }
      .legend-percent-text {
        font-family: YouSheBiaoTiHei;
        font-size: 14px;
        color: #1ee8ef;
        position: relative;
        top: 3px;
        margin-right: 2px;
        // margin: 0 12px 0 2px;
      }
      .legend-percent {
        width: 60px;
        text-align: right;
        font-family: D-DIN, D-DIN;
        font-weight: bold;
        font-size: 14px;
        color: #1ee8ef;
        position: relative;
        top: 2px;
      }
      // }
      .legend-detail-icon {
        // pie-detail-icon
        width: 16px;
        height: 17px;
        // position: absolute;
        // top: 50%;
        // transform: translateY(-50%);
        // right: 20px;
        margin-left: 5px;
        background-image: url("./images/pie-detail-icon.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
    }
  }
}
</style>
