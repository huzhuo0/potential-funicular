<template>
  <div class="inspect-pie-chart">
    <div class="chart-container">
      <div class="water-quality-legend">
        <div class="water-qua-legend-item six-item"></div>
        <div class="water-qua-legend-item five-item"></div>
        <div class="water-qua-legend-item four-item"></div>
        <div class="water-qua-legend-item three-item"></div>
        <div class="water-qua-legend-item two-item"></div>
        <div class="water-qua-legend-item one-item"></div>
      </div>
      <div class="water-chart">
        <XCharts :options="chartOption" class="line-chart"></XCharts>
      </div>
    </div>
  </div>
</template>

<script setup>
// import * as echarts from "echarts";
import * as echarts from "echarts";
import { ref, onMounted } from "vue";
import XCharts from "@/components/echart/XCharts";

const chartOption = ref({});

onMounted(() => {
  getData();
  // console.log(112)
});

function getData() {
  chartOption.value = lineOption({
    yDataName: "ph值",
    xData: ["04-10", "04-11", "04-12", "04-13", "04-14", "04-15", "04-16"],
    yData1: [1, 2, 3, 4, 4, 3, 3],
    yData2: [8, 9, 12, 4, 7, 8, 7],
  });
}

function lineOption(seriesData) {
  let lMax = Number(Math.max(...seriesData.yData2));
  let lMin = Number(Math.min(...seriesData.yData2));
  lMax = Math.ceil(lMax / 10) * 10 || 10;
  lMin = Math.floor(lMin / 10) * 10 || 0;
  let option = {
    backgroundColor: "transparent",
    tooltip: {
      // 提示框组件
      trigger: "axis",
      confine: true,
      position: "top",
      className: "custom-tooltip-box",
      formatter: function (params) {
        let waterMap = {
          0: "-",
          1: "I类",
          2: "II类",
          3: "III类",
          4: "IV类",
          5: "V类",
          6: "劣V类",
        };
        let str = "";
        params.forEach((item) => {
          if (item.seriesName === "水质") {
            str += `${item.name} 
            <br/> 
            ${item.marker} 
            ${item.seriesName}: 
           ${waterMap[item.value]}`;
          } else if (item.seriesName === "ph值") {
            str += `<br/>${item.marker} ${item.seriesName}:${
              Number(item.value) ? item.value : "-"
            } `;
          } else {
            str += `<br/>${item.marker} ${item.seriesName}:${item.value} `;
          }
          // if (index === 0) {
          //   str += `${item.name}
          //   <br/>
          //   ${item.marker}
          //   ${item.seriesName}:
          //   ${item.value}`
          // } else if (index === params.length - 1) {
          //   str += `<br/>
          //   ${item.marker}
          //   ${item.seriesName}:
          //   ${waterMap[item.value]}`
          // } else {
          //   str += `<br/>${item.marker} ${item.seriesName}:${item.value} `
          // }
        });
        str = `<div class='tooltip-content'>${str}</div>`;
        return str;
      },
    },
    grid: {
      left: "5%",
      right: "4%",
      bottom: "20%",
      top: "18%",
      padding: "0 0 10 0",
      containLabel: true,
    },
    legend: {
      data: ["水质", seriesData.yDataName],
      top: "4%",
      textStyle: {
        color: "#DDF8FF",
        fontStyle: "normal",
        fontFamily: "微软雅黑",
        fontSize: 12,
      },
    },
    dataZoom: [
      {
        type: "slider",
        show: true,
        height: 20,
        left: "80px",
        right: "80px",
        bottom: "5%",
        start: 0,
        end: 100,
        backgroundColor: "rgba(7,49,90,0.6)",
        textStyle: {
          color: "#DDF8FF",
          // fontSize: options.zoomSize
        },
        dataBackground: {
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: "rgba(113,223,248,0.3)" },
                { offset: 1, color: "rgba(62,188,238,0.16)" },
              ],
              globalCoord: false,
            },
            opacity: 0.9,
          },
        },
        selectedDataBackground: {
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: "rgba(113,223,248,0.5)" },
                { offset: 1, color: "rgba(62,188,238,0.4)" },
              ],
              globalCoord: false,
            },
            opacity: 0.9,
          },
        },
        handleStyle: {
          color: "#3EBCEE",
        },
        borderColor: "rgba(50,142,234,0.3)",
      },
      {
        type: "inside",
      },
    ],
    xAxis: [
      {
        type: "category",
        boundaryGap: true, // 坐标轴两边留白
        data: seriesData.xData || [],

        nameLocation: "center",
        axisLabel: {
          // 坐标轴刻度标签的相关设置。
          // interval: 0, // 设置为 1，表示『隔一个标签显示一个标签』
          //   margin: 20,
          // rotate: 15, // 标签旋转的角度，默认为 0，不旋转，正值是逆时针，负值是顺时针
          align: "center",
          textStyle: {
            color: " #DDF8FF",
            fontStyle: "normal",
            fontFamily: "PingFangSC, PingFang SC",
            fontSize: 12,
          },
        },
        axisTick: {
          // 坐标轴刻度相关设置。
          show: false,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "rgba(186, 231, 255, 0.40)", // 设置X轴轴线的颜色
            width: 1, // 设置轴线的宽度
          },
        },
        splitLine: {
          // 坐标轴在 grid 区域中的分隔线。
          show: false,
        },
      },
    ],
    yAxis: [
      {
        name: "",
        type: "value",
        max: 6,
        min: 0,
        interval: 1,
        axisLabel: {
          //   margin: 20,
          formatter: function (value) {
            if (Number(value) === 1) {
              return "I类";
            }
            if (Number(value) === 2) {
              return "II类";
            }
            if (Number(value) === 3) {
              return "III类";
            }
            if (Number(value) === 4) {
              return "IV 类";
            }
            if (Number(value) === 5) {
              return "V类";
            }
            if (Number(value) === 6) {
              return "劣V类";
            }
            return "";
          },
          textStyle: {
            color: " #DDF8FF",
            fontStyle: "normal",
            fontFamily: "PingFangSC, PingFang SC",
            fontSize: 12,
          },
        },
        data: ["I类", "II类", "III类", "IV类", "V类"],
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "rgba(62,188,238,.2)",
          },
        },
      },
      {
        name: seriesData.yDataName,
        nameTextStyle: {
          color: "#DDF8FF",
        },
        type: "value",
        axisLabel: {
          formatter: function (value) {
            return Number(value).toFixed(0);
          },
          textStyle: {
            color: "#DDF8FF",
            fontStyle: "normal",
            fontFamily: "PingFangSC, PingFang SC",
            fontSize: 12,
          },
        },
        max: lMax,
        min: lMin,
        splitNumber: 6,
        interval: (lMax - lMin) / 6,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: "rgba(62,188,238,.2)",
          },
        },
      },
    ],
    series: [
      {
        name: "水质",
        type: "line",
        yAxisIndex: 0,
        color: "rgba(85,194,202, 1)",
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(85,194,202, 1)" },
              { offset: 0.5, color: "rgba(85,194,202, 0.3)" },
              { offset: 1, color: "rgba(85,194,202, 0.1)" },
            ]),
          },
        },
        symbol: false,
        smooth: true, // 平滑过渡
        // data: [1, 2, 4, 3, 3]
        data: seriesData.yData1,
      },
      {
        name: seriesData.yDataName || "-",
        type: "line",
        yAxisIndex: 1,
        barGap: 0, // 柱间距离
        color: "rgba(220,162,92, 1)",
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(220,162,92, 1)" },
              { offset: 0.5, color: "rgba(220,162,92, 0.3)" },
              { offset: 1, color: "rgba(220,162,92, 0.1)" },
            ]),
          },
        },
        symbol: false,
        smooth: true, // 平滑过渡
        data: seriesData.yData2,
      },
    ],
  };
  return option;
}
</script>

<style lang="less" scoped>
:deep(.custom-tooltip-box) {
  border: none !important;
  background-color: transparent !important;
  margin: 0 !important;
  padding: 0 !important;

  .tooltip-content {
    width: 100%;
    height: 100%;
    padding: 8px !important;
    color: #fff;
    background-image: url("./images/tooltip-bg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;

    .tool-label {
      color: #ccddff;
    }

    .tool-unit {
      color: #ccddff;
    }

    .tool-value {
      margin: 0 2px 0 3px;
    }
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
  .chart-container {
    width: 100%;
    // height: 181px;
    height: 100%;
    position: relative;
    .water-quality-legend {
      width: 6px;
      // background: red;
      position: absolute;
      z-index: 999;
      top: 43px;
      left: 59px;
      display: flex;
      flex-direction: column;
      .water-qua-legend-item {
        width: 6px;
        height: 20px;
      }
      .six-item {
        background: #b62b2b;
      }
      .five-item {
        background: #f9472a;
      }
      .four-item {
        background: #e9c251;
      }
      .three-item {
        background: #03ca79;
      }
      .two-item {
        background: #2f98f1;
      }
      .one-item {
        background: #34dbfb;
      }
    }
    .water-chart {
      width: 100%;
      height: 100%;
      .line-chart {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
