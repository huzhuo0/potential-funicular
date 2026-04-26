<template>
  <div class="chart-container">
    <div class="chart-content">
      <XCharts :options="chartOptions" class="line-chart"></XCharts>
    </div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import { ref, onMounted } from "vue";
import XCharts from "@/components/echart/XCharts";
const chartOptions = ref({});
onMounted(() => {
  setTimeout(() => {
    getData();
  }, 500);
});

function getData() {
  initChart({
    xAxis: {
      data: ["一般1级", "一般2级", "一般3级", "重大"],
    },
    series: [
      {
        name: "隐患数量",
        type: "bar3d",
        topDiamondColor: "#30A0FF",
        barColor: "#1283FF",
        data: [10, 20, 30, 40],
      },
      {
        name: "已闭合数量",
        type: "bar3d",
        topDiamondColor: "#20F8FF",
        barColor: "#20F8FF",
        data: [6, 15, 20, 30],
      },
    ],
  });
}

// 将十六进制颜色转换为RGB
function hexToRgb(hex) {
  // 移除颜色字符串中的'#'
  let sanitizedHex = hex.replace("#", "");

  // 解析两个字符为一个十六进制值
  let r = parseInt(sanitizedHex.substring(0, 2), 16);
  let g = parseInt(sanitizedHex.substring(2, 4), 16);
  let b = parseInt(sanitizedHex.substring(4, 6), 16);

  return [r, g, b];
}

//  根据柱子数量计算label的偏移量
function getLabelOffsetArr(count) {
  if (count <= 0) return [];

  // 单个柱子之间的间距百分比
  const GAP_PERCENT = 10;
  const result = [];

  // 计算总宽度
  const totalWidth = (count - 1) * GAP_PERCENT;
  // 计算起始位置（最左侧位置）
  const startOffset = -totalWidth;

  // 计算每个柱子的偏移量
  for (let i = 0; i < count; i++) {
    const offset = startOffset + i * GAP_PERCENT * 2;
    result.push(offset);
  }

  return result;
}

// 根据柱子数量计算symbolOffset
function getSymbolOffsetArr(count) {
  if (count <= 0) return [];

  // 单个柱子之间的间距百分比
  const GAP_PERCENT = 65;
  const result = [];

  // 计算总宽度
  const totalWidth = (count - 1) * GAP_PERCENT;
  // 计算起始位置（最左侧位置）
  const startOffset = -totalWidth;

  // 计算每个柱子的偏移量
  for (let i = 0; i < count; i++) {
    const offset = startOffset + i * GAP_PERCENT * 2;
    result.push([`${offset}%`, -3]);
  }

  return result;
}

// 初始化图表
function initChart(chartOption) {
  let bar3dIndex = 0;
  // 获取3d柱状图的series数量
  const bar3dSeriesCount = chartOption.series.filter(
    (item) => item.type === "bar3d"
  ).length;

  // 根据柱子数量计算symbolOffset
  const symbolOffsetArr = getSymbolOffsetArr(bar3dSeriesCount);
  // 根据柱子数量计算label的偏移量
  const labelOffsetArr = getLabelOffsetArr(bar3dSeriesCount);

  // 柱子宽度
  const barWidth = 15;
  let series = [];
  let defaultLegend = {
    icon: "rect",
    itemWidth: 12,
    itemHeight: 4,
    x: "right",
    top: "-2px",
    data: [],
  };

  chartOption.series.forEach((seriesItem, index) => {
    if (seriesItem.type === "bar3d") {
      bar3dIndex++;
      let show = true;
      if (seriesItem.label === "false") {
        show = false;
      }
      // 中间的正方形
      const diamond = {
        type: "pictorialBar", // 象型柱状
        symbol: "diamond",
        symbolSize: [barWidth, barWidth / 2], // 调整大小
        symbolOffset: symbolOffsetArr[bar3dIndex - 1], // 图形相对于原本位置的偏移
        symbolPosition: "end",
        z: 12,
        // 柱子顶部数量label
        label: {
          show: true,
          position: "top",
          offset: [labelOffsetArr[bar3dIndex - 1], 0],
          color: "#ddd",
          fontSize: 14,
          fontFamily: "Arial",
        },
        color: seriesItem.topDiamondColor,
        data: seriesItem.data,
      };

      // 柱子
      const barObj = {
        name: seriesItem.name,
        type: "bar",
        barWidth: seriesItem.barWidth || barWidth,
        barGap: "30%",
        stack: bar3dIndex,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            {
              offset: 0.5,
              color: `rgba(${hexToRgb(seriesItem.barColor)[0]}, ${
                hexToRgb(seriesItem.barColor)[1]
              }, ${hexToRgb(seriesItem.barColor)[2]}, 1)`,
              // color: '#2c61bc',
            },
            {
              offset: 0.5,
              color: `rgba(${hexToRgb(seriesItem.barColor)[0]}, ${
                hexToRgb(seriesItem.barColor)[1]
              }, ${hexToRgb(seriesItem.barColor)[2]}, 0.5)`,
            },
            {
              offset: 1,
              color: `rgba(${hexToRgb(seriesItem.barColor)[0]}, ${
                hexToRgb(seriesItem.barColor)[1]
              }, ${hexToRgb(seriesItem.barColor)[2]}, 1)`,
            },
          ]),
          borderRadius: 0,
        },
        data: seriesItem.data,
      };

      series.push(diamond);
      series.push(barObj);
    }
    console.log(series, "chartOption1111");

    if (seriesItem.type === "line") {
      series.push(seriesItem);
    }

    // 生成legend
    defaultLegend.data.push({
      name: seriesItem.name,
      textStyle: {
        color: "rgba(255,255,255,0.9)",
      },
      itemStyle: {
        color: seriesItem.barColor,
      },
    });
  });

  // 默认tooltip
  const defaultTooltip = {
    trigger: "axis",
    backgroundColor: "rgba(0,0,0,.5)",
    borderColor: "transparent",
    textStyle: {
      color: "#fff", // 自定义文字颜色
      fontSize: 14, // 自定义文字大小
    },
    axisPointer: {
      type: "shadow",
    },
    formatter: (params) => {
      let str = params[0].name + "<br/>";
      params.forEach((item) => {
        if (item.seriesType !== "pictorialBar") {
          str += `${item.marker}&nbsp;${item.seriesName}：${
            item.value === "null" ? "--" : item.value + " "
          }<br/>`;
        }
      });
      return str;
    },
  };

  // 默认x轴配置
  const defaultXAxis = {
    type: "category",
    axisLabel: {
      color: "rgba(255, 255, 255, 1)",
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: "rgba(255, 255, 255, 0.50)",
      },
    },
    axisTick: {
      show: false,
    },
    data: chartOption.xAxis.data,
  };

  // 默认y轴配置
  const defaultYAxis = [
    {
      type: "value",
      show: true,
      name: "数量",
      gridIndex: 0,
      nameTextStyle: {
        color: "rgba(255, 255, 255, 1)",
        fontSize: 14,
      },
      axisLabel: {
        color: "rgba(255, 255, 255, 1)",
      },
      splitLine: {
        lineStyle: {
          color: "rgba(255, 255, 255, 0.40)",
          type: "dashed",
        },
      },
    },
    {},
  ];

  let newYAxis = [];
  if (chartOption.yAxis && chartOption.yAxis.length > 0) {
    for (let i = 0; i < chartOption.yAxis.length; i++) {
      if (defaultYAxis[i]) {
        const obj = { ...defaultYAxis[i], ...chartOption.yAxis[i] };
        newYAxis.push(obj);
      } else {
        newYAxis.push(chartOption.yAxis[i]);
      }
    }
  } else {
    newYAxis = defaultYAxis;
  }

  const defaultGrid = {
    top: "30px",
    bottom: "20px",
    right: "10px",
  };

  let option = {
    tooltip: { ...defaultTooltip, ...chartOption.tooltip },
    legend: { ...defaultLegend, ...chartOption.legend },
    grid: { ...defaultGrid, ...chartOption.grid },
    xAxis: { ...defaultXAxis, ...chartOption.xAxis },
    yAxis: newYAxis,
    series: series,
  };
  console.log(option, "option");
  chartOptions.value = { ...option };
}
</script>

<style lang="less" scoped>
.chart-container {
  width: 100%;
  background: linear-gradient(
    90deg,
    rgba(21, 33, 51, 0.76) 0%,
    rgba(25, 51, 105, 0.6) 100%
  );
  //   min-height: 270px;
  height: 100%;
  position: relative;
  .chart-content {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
  }
}
</style>
