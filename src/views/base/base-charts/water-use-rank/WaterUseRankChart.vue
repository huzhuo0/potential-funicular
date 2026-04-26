<template>
  <div class="chart-container">
    <XCharts :options="chartOptions" class="line-chart"></XCharts>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
import XCharts from "@/components/echart/XCharts";

import waterResource4 from "./images/1.png";
import waterResource3 from "./images/2.png";
import waterResource2 from "./images/3.png";
import waterResource1 from "./images/4.png";

const chartOptions = ref({});

onMounted(() => {
  getData();
});

function getData() {
  // 底图bar的值
  let max = 1000;
  // 左侧图标
  let imgList = [
    waterResource1,
    waterResource2,
    waterResource3,
    waterResource4,
  ];
  // 真实数据
  let data = [123, 234, 345, 678];
  // Y轴名称list
  let yNameList = ["城镇居民生活", "工业用水", "农业用水", "生态用水"];

  let yAxisData = data.map((item, index) => {
    return {
      value: yNameList[index],
      textStyle: {
        rich: {
          a: {
            color: "transparent",
            width: 20,
            height: 20,
            backgroundColor: {
              image: imgList[index],
            },
          },
          b: {
            padding: [0, 5],
          },
          value: {
            color: "#ffffff",
          },
        },
      },
    };
  });

  let series0Data = data.map((item) => {
    return {
      value: max,
      label: {
        formatter: "{a|" + item + "}{b|万m³}",
        position: "right",
        distance: 5,
        rich: {
          a: {
            color: "#ffffff",
            fontSize: 16,
            fontFamily: "PingFangSC, PingFang SC",
          },
          b: {
            color: "#ffffff",
            fontSize: 12,
            fontFamily: "PingFangSC, PingFang SC",
          },
        },
      },
    };
  });
  chartOptions.value = {
    grid: {
      top: "1%",
      left: "-11%",
      right: "22%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "value",
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
      },
    ],
    yAxis: [
      {
        type: "category",
        name: "",
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          formatter: function (value) {
            return "{a|}{value|" + value + "}";
          },
          rich: {
            value: {
              width: 80,
            },
            a: {
              width: 100,
            },
          },
        },
        data: yAxisData,
      },
      {
        type: "category",
        name: "",
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        data: [],
      },
    ],
    series: [
      {
        type: "bar",
        barWidth: 15,
        yAxisIndex: 1,
        itemStyle: {
          normal: {
            color: "rgba(51,119,255,0.12)",
          },
        },
        label: {
          show: true,
          position: "right",
        },
        data: series0Data,
      },
      {
        type: "bar",
        barWidth: 14,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              1,
              1,
              [
                {
                  offset: 0,
                  color: "#3D9FFF",
                },
                {
                  offset: 1,
                  color: "#41D7F3",
                },
              ],
              false
            ),
          },
        },
        data: data,
      },
    ],
  };
}
</script>
<style lang="less" scoped>
// 旋转动画
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.chart-container {
  display: flex;
  height: 100%;
  width: 100%;
  background: linear-gradient(
    90deg,
    rgba(21, 33, 51, 0.76) 0%,
    rgba(25, 51, 105, 0.6) 100%
  );
  height: 100%;
  position: relative;
  .chart-content {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
  }
  .project-pie-chart {
    width: 142px;
    height: 142px;
    position: relative;
    margin-right: 15px;
    margin-top: 15px;
    // .chart-bg {
    //   width: 100%;
    //   height: 100%;
    //   background: url("./chart-animation.png");
    //   background-size: 100% 100%;
    //   background-repeat: no-repeat;
    //   position: absolute;
    //   left: 0;
    //   top: 0;
    //   animation: rotate 10s linear infinite;
    // }
    // .chart-center {
    //   width: 142px;
    //   height: 142px;
    //   background: url("./pie-chart-center.png");
    //   background-size: 100% 100%;
    //   background-repeat: no-repeat;
    //   position: absolute;
    //   left: 50%;
    //   top: 50%;
    //   transform: translate(-50%, -50%);
    // }
    .pie-total {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .total-num {
        font-family: D-DIN, D-DIN;
        font-size: 30px;
        color: #ffffff;
        font-weight: bold;
        width: 100%;
        text-align: center;
      }
      .total-text {
        font-size: 16px;
        color: #ffffff;
        position: relative;
        bottom: 5px;
      }
    }
  }
}

// 自定义tooltip样式
:deep(.custom-tooltip-box) {
  padding: 0 !important;
  border: none !important;
  background-color: transparent !important;
  margin-left: 240px !important;
  // 给子盒子自定义样式
  .tooltipBox {
    width: 230px;
    height: 80px;
    background-image: url("./images/monitoring-card-bg.png");
    background-size: 100% 100%;
    color: #fff;
    padding: 10px 30px;
    .textTitle {
      display: flex;
      align-items: center;
      height: 26px;
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      position: relative;
      .titleColor {
        display: inline-block;
        width: 10px;
        height: 10px;
        margin-right: 10px;
        position: absolute;
        left: -15px;
      }
    }
    .textValue {
      margin: 0 5px;
      font-size: 16px;
      font-weight: 700;
    }
  }
}
</style>
