<template>
  <div class="warn-line-flow-chart">
    <XCharts :options="options" class="chart"></XCharts>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import XCharts from "@/components/echart/XCharts";

defineOptions({
  name: "WarnLineWaterChart",
});

const options = ref({});

onMounted(() => {
  options.value = {
    legend: {
      data: ["警戒水位", "实时水位"],
      selectedMode: false,
    },
    legend: {
      show: true,
      // 图例组件，颜色和名字
      left: "center",
      top: 10,
      itemGap: 16,
      itemWidth: 18,
      itemHeight: 8,
      data: [
        {
          name: `实时水位`,
          // icon:'image:// ../wwwroot/js/url2.png', // 路径
        },
        {
          name: `警戒水位`,
          // icon:'image:// ../wwwroot/js/url2.png', // 路径
          itemStyle: {
            color: "#01F699",
          },
        },
      ],
      selectedMode: false,
      textStyle: {
        color: "#FFFFFF",
        fontStyle: "normal",
        fontFamily: "微软雅黑",
        fontSize: 12,
      },
    },
    tooltip: {
      trigger: "axis",
      confine: true,
      className: "custom-tooltip-box",
      // backgroundColor: "rgba(0,0,0,0.3)",
      // axisPointer: {
      //   type: 'cross',
      //   label: {
      //     // backgroundColor: '#6a7985'
      //   }
      // }
      formatter(params) {
        let val0 = params[0]["value"];
        let val1 = params[1]["value"];
        let circle = `<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:`;
        let data0 = `${circle}rgba(69, 152, 255, 1)"></span> ${params[0]["seriesName"]}: <span style="color: #4598FF">${val0}</span>m`;
        let data1 = `${circle}rgba(1, 246, 153, 1)"></span> ${params[1]["seriesName"]}: <span style="color: #01F699">${val1}</span>m`;
        return `<div class='tooltip-content'>日期：${params[0].axisValueLabel}<br/>${data0}<br/>${data1}</div>`;
      },
    },
    grid: {
      left: "2%",
      right: "10%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        name: "",
        type: "category",
        boundaryGap: false,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: "#fff",
            fontSize: 12,
          },
        },
        data: [
          "04-01",
          "04-02",
          "04-03",
          "04-04",
          "04-05",
          "04-06",
          "04-07",
          "04-08",
          "04-09",
          "04-10",
          "04-11",
        ],
      },
    ],
    yAxis: {
      name: "流量(m³/s)",
      type: "value",
      nameTextStyle: {
        color: "#B3CEFF",
        padding: [0, 0, 0, 30],
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(62,188,238,.2)",
          type: "dashed",
          width: 1,
        },
      },
      axisLabel: {
        color: "#B3CEFF",
        fontSize: 12,
      },
    },
    visualMap: {
      pieces: [
        {
          gt: 0,
          lte: 50,
          color: "transparent",
        },
        {
          gt: 50,
          color: "#4598FF",
        },
      ],
      showLabel: false,
      itemSymbol: "none",
    },
    series: [
      {
        name: "实时水位",
        type: "line",
        symbol: "none",
        smooth: true,
        areaStyle: {},
        itemStyle: {
          normal: {
            color: "#4598FF",
          },
        },
        lineStyle: {
          color: "#4598FF",
        },
        color: "gray",
        data: [20, 40, 60, 70, 78, 60, 50, 40, 45, 52, 59],
      },
      {
        name: "警戒水位",
        type: "line",
        symbol: "none",
        smooth: true,
        itemStyle: {
          normal: {
            lineStyle: {
              type: "dashed",
              color: "#01F699",
            },
          },
        },
        lineStyle: {
          color: "#01F699",
        },
        markPoint: {
          data: [{ type: "average", x: "5%", symbolSize: 25, value: 50 }],
          symbol: "circle",
          label: {
            show: true,
            color: "#fff",
          },
          itemStyle: {
            color: "#01F699",
          },
        },
        data: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
      },
    ],
  };
});
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
