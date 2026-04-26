<template>
  <div class="inspect-pie-chart">
    <div class="check-manage-chart">
      <XCharts :options="checkManegeOption" class="line-chart"></XCharts>
      <div class="check-manage-text">
        考核达标率
        <span>30%</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import XCharts from "@/components/echart/XCharts";
import { ref, onMounted } from "vue";

const checkManegeOption = ref({});

onMounted(() => {
  getData();
});

function getData() {
  checkManegeOption.value = getCheckManegeOption(30);
}

function getCheckManegeOption(val) {
  let option = {
    series: [
      // {
      //   type: 'gauge',
      //   startAngle: 180,
      //   endAngle: 0,
      //   center: ['50%', '75%'],
      //   radius: '90%',
      //   min: 0,
      //   max: 100,
      //   splitNumber: 5,
      //   zlevel: 0,
      //   axisLine: {
      //     show: true,
      //     lineStyle: {
      //       width: 10,
      //       color: [
      //         [0.25, checkManageColors[0]],
      //         [0.5, checkManageColors[1]],
      //         [0.75, checkManageColors[2]],
      //         [1, checkManageColors[3]],
      //       ],
      //     },
      //   },
      //   axisTick: {
      //     length: 6,
      //     distance: -20,
      //     lineStyle: {
      //       color: '#32D4D7',
      //       width: 1,
      //     },
      //   },
      //   splitLine: {
      //     length: 8,
      //     distance: -20,
      //     lineStyle: {
      //       color: '#32D4D7',
      //       width: 1,
      //     },
      //   },
      //   axisLabel: {
      //     color: '#32D4D7',
      //     fontSize: 12,
      //     distance: -18,
      //   },
      //   title: {
      //     offsetCenter: [0, '-10%'],
      //     fontSize: 20,
      //   },
      //   detail: {
      //     show: false,
      //   },
      //   data: [],
      // },
      {
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        center: ["50%", "75%"],
        radius: "60%",
        min: 0,
        max: 100,
        splitNumber: 5,
        zlevel: 1,
        axisLine: {
          show: true,
          lineStyle: {
            color: [[1, "#21506F"]],
          },
        },
        progress: {
          show: true,
          width: 8,
          itemStyle: {
            color: "#31EABE",
          },
        },
        pointer: {
          length: "90%",
          width: 4,
          offsetCenter: [0, "0%"],
          itemStyle: {
            color: "#10CCFF",
          },
        },
        anchor: {
          show: true,
          showAbove: false,
          size: 15,
          itemStyle: {
            color: "#3C87F7",
            borderColor: "#39A9DC",
            borderWidth: 5,
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        title: {
          offsetCenter: [0, "-10%"],
          fontSize: 20,
        },
        detail: {
          show: false,
        },
        data: [
          {
            value: val,
          },
        ],
      },
    ],
  };
  return option;
}
</script>

<style lang="less" scoped>
.inspect-pie-chart {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(21, 33, 51, 0.76) 0%,
    rgba(25, 51, 105, 0.6) 100%
  );
  .check-manage-chart {
    // width:100%;
    width: 230px;
    height: 126px;
    background: url("./images/bkg-chart.png") center top no-repeat;
    background-size: 186px 100px;
    position: relative;
    .check-manage-text {
      position: absolute;
      bottom: -10px;
      width: 100%;
      text-align: center;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ddf8ff;
      span {
        color: #1cffff;
        font-size: 20px;
        font-weight: 600;
      }
    }
  }
}
</style>
