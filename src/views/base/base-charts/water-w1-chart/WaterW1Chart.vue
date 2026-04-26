<template>
  <div class="warn-line-flow-chart">
    <XCharts :options="options" class="chart"></XCharts>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import XCharts from "@/components/echart/XCharts";
import * as echarts from "echarts";
const { graphic } = echarts;
defineOptions({
  name: "WaterW1Chart",
});

const options = ref({});

onMounted(() => {
  let xData = [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ];
  let yjValue = 10.5;
  let yData1 = [
    20.3, 20.4, 20.5, 20.6, 20.7, 20.8, 20.9, 20.2, 20.2, 20.2, 20.3, 20.4,
  ];
  let yData2 = [
    10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7, 10.8, 10.9, 11.0, 11.1, 11.2,
  ];
  options.value = useWaterOption({
    xData,
    yjValue,
    yData1,
    yData2,
  });
});

function useWaterOption(seriesData) {
  let max = Math.max(
    ...seriesData.yData2,
    ...seriesData.yData1,
    seriesData.yjValue
  );
  // 将max向上取整，并且是10的倍数
  max = Math.ceil(max / 10) * 10;
  let option = {
    backgroundColor: "transparent",
    tooltip: {
      // 提示框组件
      trigger: "axis",
      confine: true,
      position: "top",
      className: "custom-tooltip-box",
      formatter: function (params) {
        let str = "";
        params.forEach((item, index) => {
          if (index === 0) {
            str += `${item.name}
            <br/>
            `;
          }
          if (item.seriesName.includes("实际用水")) {
            str += `${item.marker}
            <span class='tool-label'>${item.seriesName}</span>
             <span  class='tool-value' style='color:${item.color.colorStops[0].color}'>${item.value}</span><span class='tool-unit'>万m³</span>`;
            if (index + 1 < params.length) {
              str += "<br/> ";
            }
          }
          if (item.seriesName.indexOf("累计用水") > -1) {
            str += `${item.marker}
            <span class='tool-label'>${item.seriesName}</span>
             <span  class='tool-value' style='color:${item.color}'>${item.value}</span><span class='tool-unit'>万m³</span>`;
            if (index + 1 < params.length) {
              str += "<br/> ";
            }
          }
        });
        str = `<div class='tooltip-content'>${str}</div>`;
        return str;
      },
    },
    grid: {
      left: "1%",
      right: "1%",
      bottom: "2%",
      top: 35,
      padding: "0 0 10 0",
      containLabel: true,
    },
    legend: {
      show: true,
      // 图例组件，颜色和名字
      left: "center",
      top: 5,
      itemGap: 16,
      itemWidth: 18,
      itemHeight: 8,
      data: [
        {
          name: `累计用水`,
          // icon:'image:// ../wwwroot/js/url2.png', // 路径
        },
        {
          name: `预警水量`,
          lineStyle: {
            color: "#EA1414",
            type: "dashed",
          },
          itemStyle: {
            borderColor: "transparent",
            borderWidth: 0,
            opacity: 0,
          },
          // icon:'image:// ../wwwroot/js/url2.png', // 路径
        },
        {
          name: `实际用水`,
          // icon:'image:// ../wwwroot/js/url2.png', // 路径
        },
      ],
      textStyle: {
        color: "#FFFFFF",
        fontStyle: "normal",
        fontFamily: "微软雅黑",
        fontSize: 12,
      },
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: true, // 坐标轴两边留白
        data: seriesData.xData || [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月",
        ],
        nameLocation: "center",
        axisLabel: {
          // 坐标轴刻度标签的相关设置。
          // interval: 0, // 设置为 1，表示『隔一个标签显示一个标签』
          // margin: 20,
          // rotate: 15, // 标签旋转的角度，默认为 0，不旋转，正值是逆时针，负值是顺时针
          align: "center",
          color: "#FFFFFF",
          fontStyle: "normal",
          fontFamily: "PingFangSC, PingFang SC",
          fontSize: 12,
          // },
          formatter: function (params) {
            // let val = ''
            // if (params.length > 10) {
            //   val = params.substring(0, 4) + '...'
            //   return val
            // }

            const [date, time] = params.split(" "); //  将时间字符串分割成日期和时间两部分
            return `${date}`;
          },
        },
        axisTick: {
          // 坐标轴刻度相关设置。
          show: false,
        },
        axisLine: {
          show: false,
          // 坐标轴轴线相关设置
          lineStyle: {
            color: "#fff",
            opacity: 0.2,
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
        name: "单位：万m³",
        nameTextStyle: {
          color: "#C6D3EA",
          padding:
            seriesData && seriesData.yData1 && seriesData.yData1.length
              ? [0, 30, 0, 50]
              : [0, 30, 0, 50],
        },
        type: "value",
        splitNumber: 5,
        // max: max || 20,
        axisLabel: {
          color: "#C6D3EA",
          fontStyle: "normal",
          fontFamily: "PingFangSC, PingFang SC",
          fontSize: 12,
          // }
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "rgba(158, 206, 253, 0.30)",
          },
        },
      },
    ],
    series: [
      {
        name: `累计用水`,
        type: "line",
        data: seriesData.yData1 || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        label: {},
        // smooth: false,
        // symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          color: "#1EFFB8",
          borderColor: "#fff", // 边框颜色设为白色
          borderWidth: 2, // 边框宽度
        },
      },
      {
        type: "line",
        name: "预警水量",
        data: seriesData.xData.map(() => seriesData.yjValue) || [],
        symbol: "none", // 设置为'none'以隐藏点，但不影响线显示
        lineStyle: {
          color: "#EA1414",
          width: 2,
          type: "dashed",
        },
        // markLine: {
        //   symbol: "none",
        //   data: [
        //     {
        //       yAxis: seriesData.yjValue || 20,
        //       lineStyle: {
        //         color: "#EA1414",
        //         width: 2,
        //         type: "dashed",
        //       },
        //       label: {
        //         show: false,
        //       },
        //     },
        //   ],
        // },
      },
      {
        name: `实际用水`,
        type: "bar",
        data: seriesData.yData2 || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        barWidth: 10,
        label: {
          show: true,
          position: "top",
          formatter: function () {
            return "{border|}"; // 返回一个空的label作为边框
          },
          rich: {
            border: {
              height: -2,
              width: 10, // 控制边框的宽度
              backgroundColor: "#fff", // 边框颜色
            },
          },
          offset: [0, 5],
        },
        itemStyle: {
          // borderColor: '#fff', // 边框颜色设为白色
          // // borderWidth: [0, 0, 0, 0], // 四个方向的边框宽度，顺序是 [上, 右, 下, 左]
          // borderType: 'solid', // 边框类型，可以是 'solid', 'dashed', 'dotted'
          // // 如果只需要顶部有边框，那么设置顶部的边框宽度为非零值
          // // 注意：ECharts 4.x 版本开始支持数组形式来分别控制四边的边框宽度
          // borderWidth: [12, 0, 0, 0], // 设置顶部边框宽度为 2
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#A0D8FF" },
            { offset: 0.5, color: "#4BBEFC" },
            { offset: 1, color: "#1575B9" },
          ]),
        },
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
.warn-line-flow-chart {
  background: linear-gradient(
    90deg,
    rgba(21, 33, 51, 0.76) 0%,
    rgba(25, 51, 105, 0.6) 100%
  );
  height: 100%;
  .chart {
    width: 100%;
    height: 100%;
  }
}
</style>
