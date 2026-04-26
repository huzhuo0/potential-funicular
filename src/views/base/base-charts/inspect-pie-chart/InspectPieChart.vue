<template>
  <div class="inspect-pie-chart">
    <div class="project-pie-chart">
      <div class="chart-bg"></div>
      <div class="chart-center"></div>
      <div class="progress-overview-circle">
        <div class="chart-content">
          <XCharts :options="option" class="line-chart"></XCharts>
        </div>
        <div class="progress-overview-circle-content">
          <p>
            <span class="rate">{{ rate || "0" }}</span
            >%
          </p>
          <p>{{ title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { graphic } from "echarts";
import { ref, onMounted } from "vue";
import XCharts from "@/components/echart/XCharts";

const option = ref({});
const title = ref("完成率");
const rate = ref(26.8);
const total = ref(100);
const chartInstance = ref(null);
onMounted(() => {
  getData();
});

function init(_chartInstance) {
  chartInstance.value = _chartInstance;
}

function getNumber(value) {
  const num = Number(value);
  // eslint-disable-next-line no-restricted-globals
  if (!isNaN(parseFloat(value)) && isFinite(num)) {
    return num;
  }
  return 0;
}

function getData() {
  const m = getNumber(total.value * getNumber(rate.value / 100));
  const y = getNumber(total.value - m);
  const color = ["#168BFF", "#00FFFF"];
  option.value = {
    series: [
      {
        name: title.value,
        type: "pie",
        radius: ["66%", "80%"],
        padAngle: 0,
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: false,
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          {
            value: m,
            name: "已完成",
            itemStyle: {
              color: graphic.LinearGradient(0, 0, 1, 1, [
                {
                  offset: 0,
                  color: color[0],
                },
                {
                  offset: 1,
                  color: color[1],
                },
              ]),
            },
          },
          {
            value: y,
            name: "未完成",
            itemStyle: {
              color: "#86ACE5",
            },
          },
        ],
      },
    ],
  };
}
</script>

<style lang="less" scoped>
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.inspect-pie-chart {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(21, 33, 51, 0.76) 0%,
    rgba(25, 51, 105, 0.6) 100%
  );

  .project-pie-chart {
    width: 138px;
    height: 138px;
    position: relative;
    // margin-right: 15px;
    margin: 5px 15px;

    .chart-bg {
      width: 100%;
      height: 100%;
      background-image: url("./images/chart-animation.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      position: absolute;
      left: 0;
      top: 0;
      animation: rotate 12s linear infinite;
    }

    .chart-center {
      width: 100px;
      height: 100px;
      background-image: url("./images/pie-chart-center.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    // .pie-total {
    //   position: absolute;
    //   top: 50%;
    //   left: 50%;
    //   transform: translate(-50%, -50%);
    //   .total-num {
    //     font-family: D-DIN, D-DIN;
    //     font-size: 30px;
    //     color: #ffffff;
    //     font-weight: bold;
    //     width: 100%;
    //     text-align: center;
    //   }
    //   .total-text {
    //     //   font-family: YouSheBiaoTiHei;
    //     font-size: 16px;
    //     color: #ffffff;
    //     position: relative;
    //     bottom: 5px;
    //   }
    // }
  }

  .progress-overview-circle {
    position: relative;
    width: 100%;
    height: 100%;

    .chart-content {
      width: 100%;
      height: 100%;
    }

    &-content {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      > p {
        &:nth-child(1) {
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          font-size: 16px;
          color: #fff;
          // line-height: 17px;
          text-align: left;
          font-style: normal;
          padding-top: 0px;
          margin-bottom: 0;
        }

        &:nth-child(2) {
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          font-size: 12px;
          color: #cae2ff;
          // line-height: 17px;
          text-align: left;
          font-style: normal;
          white-space: nowrap;
          margin-bottom: 0;
        }
      }

      .rate {
        color: #fff;
        font-size: 18px;
      }
    }

    &-1 {
      border: 1px solid rgba(255, 255, 255, 0.2);
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      border-radius: 50%;
    }

    &-2 {
      border: 1px solid rgba(255, 255, 255, 0.2);
      width: 60px;
      height: 60px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);
      border-radius: 50%;
    }
  }
}
</style>
