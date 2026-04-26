<template>
  <div class="event-type-chart">
    <XCharts :options="option" class="line-chart"></XCharts>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import XCharts from "@/components/echart/XCharts";

const option = ref({});

onMounted(() => {
  getData();
});

function getData() {
  option.value = getEventTypeOption([
    {
      name: "违规钓鱼",
      value: 1,
    },
    {
      name: "非法排污",
      value: 2,
    },
    {
      name: "大坝安全",
      value: 1,
    },
    {
      name: "非法养殖",
      value: 2,
    },
    {
      name: "嬉水游泳",
      value: 1,
    },
    {
      name: "水生态",
      value: 7,
    },
    {
      name: "非法采砂",
      value: 5,
    },
    {
      name: "乱堆",
      value: 2,
    },
    {
      name: "乱建",
      value: 1,
    },
  ]);
}
function getEventTypeOption(dataList) {
  const axisLabelColor = "#DDF8FF";
  const unit = "件";
  let indicatorArr = [];
  let seriesData = [];
  // dataList.forEach((item) => {
  //   indicatorArr.push({
  //     name: item.name,
  //   });
  //   seriesData.push(item.value);
  // });

  dataList.forEach((item) => {
    seriesData.push(item.value);
  });

  const maxValue = Math.max(...seriesData);
  dataList.forEach((item) => {
    indicatorArr.push({
      name: item.name,
      max: maxValue,
    });
  });

  let option = {
    legend: {
      show: false,
    },
    color: ["#FFE354", "#FFE434", "#56A3F1", "#FF917C"],
    tooltip: {
      trigger: "item",
      // confine: true,
      //    trigger: "axis",
      confine: true,
      position: "top",
      className: "custom-tooltip-box",
      textStyle: {
        align: "left",
      },
      formatter: (params) => {
        let str = ``;
        params.value.forEach((val, i) => {
          let isNum = typeof val === "number";
          let valueText = isNum ? `${val} ${unit}` : ``;
          str += `${indicatorArr[i].name} ：${valueText}<br/>`;
        });
        str = `<div class='tooltip-content'>${str}</div>`;
        return str;
      },
    },
    radar: {
      radius: "60%",
      axisName: {
        fontSize: 11,
        color: axisLabelColor,
      },
      splitLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: "RGBA(147, 147, 147, 1)",
          //  splitLineColor
        },
      },
      axisLine: {
        symbol: "rect",
        symbolSize: [5, 5],
      },
      axisLabel: {
        show: false,
      },
      nameGap: 5,
      // shape: 'circle',
      indicator: indicatorArr,
      splitArea: {
        show: false,
      },
    },
    series: [
      {
        type: "radar",
        data: [
          {
            value: seriesData,
            itemStyle: {
              color: "rgba(255, 227, 84, 1)",
            },
            areaStyle: {
              color: "rgba(255, 136, 0, 0.40)",
            },
          },
        ],
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
.event-type-chart {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(21, 33, 51, 0.76) 0%,
    rgba(25, 51, 105, 0.6) 100%
  );
}
</style>
