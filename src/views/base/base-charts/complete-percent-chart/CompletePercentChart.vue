<template>
  <div class="circle-pie-chart">
    <div class="chart-content">
      <XCharts
        :options="chartOptions"
        class="chart"
        @resize="handleResize"
        @chart-ready="handleChartReady"
      ></XCharts>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import XCharts from "@/components/echart/XCharts";
import { debounce } from "lodash";

defineOptions({
  name: "CompletePercentChart",
});

const props = defineProps({
  data: {
    type: Number,
    default: 75,
  },
});

const chartOptions = ref(getDefaultOptions(props.data));
const chartInstance = ref(null);

watch(
  () => props.data,
  (newVal) => {
    updateChart(newVal);
  },
  { immediate: true }
);

onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});

function handleChartReady(chart) {
  chartInstance.value = chart;
}

const handleResize = debounce(() => {
  if (chartInstance.value) {
    chartInstance.value.resize();
  }
}, 200);

function updateChart(data) {
  chartOptions.value = getDefaultOptions(data);
}

function getDefaultOptions(data = props.data) {
  return {
    backgroundColor: "transparent",
    angleAxis: {
      show: false,
      min: 0,
      max: 100,
      type: "value",
      startAngle: 90,
      splitLine: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
    },
    radiusAxis: {
      show: false,
      type: "category",
      data: ["进度"],
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
    },
    title: {
      text: `{a|${data}}{b|%}`,
      subtext: "完成率",
      top: "44%",
      x: "center",
      textStyle: {
        fontSize: 14,
        fontWeight: "600",
        color: "#fff",
        rich: {
          a: {
            fontSize: 14,
            color: "#fff",
            fontWeight: "600",
          },
          b: {
            fontSize: 12,
            color: "#fff",
            fontWeight: "400",
          },
        },
      },
      subtextStyle: {
        fontSize: 12,
        fontWeight: "400",
        color: "#fff",
      },
      itemGap: 3,
    },
    barMaxWidth: 16,
    polar: {
      center: ["50%", "50%"],
      radius: "100%", // 调整环的大小
    },
    series: [
      {
        type: "pie",
        name: "背景环",
        z: -1,
        hoverAnimation: false,
        legendHoverLink: false,
        radius: ["43%", "57%"],
        center: ["50%", "50%"],
        itemStyle: {
          color: "rgba(200, 200, 200, 0.5)",
        },
        emptyCircleStyle: {
          color: "rgba(200, 200, 200, 0.5)",
        },
        labelLine: {
          normal: {
            show: false,
          },
        },
        label: { show: false },
        data: [
          {
            name: "背景",
            value: 100,
            textStyle: {
              color: "transparent",
            },
          },
        ],
      },
      {
        type: "bar",
        name: "进度",
        stack: "进度",
        coordinateSystem: "polar",
        data: [
          {
            value: data,
            name: "进度",
            itemStyle: {
              color: "#2196f3",
            },
          },
        ],
        barGap: "-100%",
        roundCap: true,
        z: 2,
      },
      {
        type: "bar",
        name: "进度条",
        stack: "进度",
        coordinateSystem: "polar",
        data: [0.01],
        showBackground: false,
        roundCap: true,
        z: 100,
        barWidth: 20,
        itemStyle: {
          color: "#2196f3",
          borderColor: "#fff",
          borderWidth: 6,
        },
      },
    ],
  };
}
</script>

<style lang="less" scoped>
.circle-pie-chart {
  background: linear-gradient(
    90deg,
    rgba(21, 33, 51, 0.76) 0%,
    rgba(25, 51, 105, 0.6) 100%
  );
  height: 100%;
  .chart-content {
    width: 100%;
    height: 100%;
    .chart {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
