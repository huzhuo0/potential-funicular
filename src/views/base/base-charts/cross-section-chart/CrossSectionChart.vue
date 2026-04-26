<template>
  <div class="inspect-pie-chart">
    <XCharts :options="chartOptions" class="line-chart"></XCharts>
  </div>
</template>

<script setup>
import XCharts from "@/components/echart/XCharts";
import { graphic } from "echarts";
import { ref, onMounted } from "vue";
import duanmianImg from "./images/duanmian-chart-bg.png";
const chartOptions = ref({});
onMounted(() => {
  setTimeout(() => {
    getData();
  }, 500);
});
function getData() {
  chartOptions.value = {
    graphic: {
      type: "image",
      style: {
        image: duanmianImg,
        x: 50,
        y: 15, // 图片的Y坐标
        width: 340, // 图片的宽度
        height: 245, // 图片的高度
      },
      z: -1, // 将图片放在图表下方
    },
    tooltip: {
      show: true,
      trigger: "axis",
      backgroundColor: "rgba(0,0,0,0.3)",
      borderWidth: 0,
      textStyle: {
        color: "#fff",
        fontSize: 12,
      },
      // valueFormatter: value => `${value}`
    },
    grid: {
      top: 30,
      left: 30,
      right: 10,
      bottom: 10,
      containLabel: true,
    },
    legend: {
      show: false,
    },
    color: ["#9A1A1A", "#8DD0F4"],
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["水位", "水位"],
      show: false,
      axisLabel: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
    },
    yAxis: {
      name: "水位（m）",
      nameTextStyle: {
        color: "rgba(219,225,255,1)",
        fontSize: 10,
      },
      min: 1,
      splitLine: {
        show: false,
      },
      axisLine: {
        show: true,
      },
      axisLabel: {
        // x轴文字的配置
        show: true,
        textStyle: {
          fontSize: 12,
          color: "rgba(219,225,255,1)",
        },
      },
      axisTick: {
        show: true,
      },
    },
    series: [
      {
        name: "警戒水位",
        type: "line",
        lineStyle: {
          color: "rgb(228,61,61)",
          width: 1,
          type: "solid",
        },
        symbol: "none",
        symbolSize: 6,
        data: [11.5, 11.5],
        areaStyle: {
          normal: {
            color: "transparent",
          },
        },
        markLine: {
          data: [
            {
              symbol: "none",
              type: "average",
              label: {
                show: true,
                position: "middle",
                rich: {
                  a: {
                    color: "#C2D8FF",
                    fontSize: "10px",
                    fontFamily: "PingFangSC, PingFang SC",
                  },
                },
                formatter: `{a|警戒水位：${11.5}m}`,
              },
            },
          ],
        },
      },
      {
        name: "实际水位",
        type: "line",
        lineStyle: {
          color: "rgba(24, 196, 255, 1)",
          width: 1,
          type: "solid",
        },
        symbol: "none",
        data: [10.5, 10.5],
        areaStyle: {
          normal: {
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(0, 189, 255, 0.41)",
              },
              {
                offset: 1,
                color: "rgba(0, 77, 228, 0.16)",
              },
            ]),
          },
        },
        markLine: {
          data: [
            {
              symbol: "none",
              type: "average",
              label: {
                show: true,
                position: "middle",
                rich: {
                  a: {
                    color: "#C2D8FF",
                    fontSize: "10px",
                    fontFamily: "PingFangSC, PingFang SC",
                  },
                },
                formatter: `{a|实际水位：${10.5}m}`,
              },
            },
          ],
        },
      },
    ],
    // tooltip: {
    //   show: true,
    //   trigger: "axis",
    //   cofine: true,
    //   backgroundColor: "rgba(0,0,0,0.3)",
    //   borderColor: "#21f2c4",
    //   borderWidth: 0,
    //   textStyle: {
    //     color: "#fff",
    //     fontSize: 12,
    //   },
    //   //   show: true,
    //   //   trigger: "axis",
    //   //   axisPointer: {
    //   //     type: "line",
    //   //     animation: true,
    //   //     lineStyle: {
    //   //       color: "#21f2c4",
    //   //       width: 1,
    //   //     },
    //   //   },
    //   //   confine: true,
    //   //   backgroundColor: "rgba(0,0,0,0.3)",
    //   //   borderColor: "#21f2c4",
    //   //   borderWidth: 0,
    //   //   textStyle: {
    //   //     color: "#fff",
    //   //     fontSize: 12,
    //   //   },
    //   //   formatter: function (params) {
    //   //     console.log(params, "params======");
    //   //     let result = "";
    //   //     params.forEach((param) => {
    //   //       result += `${param.seriesName}: ${param.value}m<br/>`;
    //   //     });
    //   //     return result;
    //   //   },
    //   //   position: function (pos, params, el, elRect, size) {
    //   //     return [pos[0], pos[1] - 10];
    //   //   },
    //   //   extraCssText: "z-index: 9999;",
    //   //   showContent: true,
    //   //   alwaysShowContent: true,
    //   //   triggerOn: "mousemove",
    //   //   hideDelay: 100,
    //   //   appendToBody: true,
    //   //   renderMode: "html",
    //   //   enterable: true,
    // },
  };
}
</script>

<style lang="less" scoped>
.inspect-pie-chart {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
  background: linear-gradient(
    90deg,
    rgba(21, 33, 51, 0.76) 0%,
    rgba(25, 51, 105, 0.6) 100%
  );
}
</style>
