<template>
  <div class="inspect-pie-chart">
    <XCharts :options="option" class="line-chart"></XCharts>
  </div>
</template>

<script setup>
import { graphic } from "echarts";
import echartsSplit from "@/utils/echartsSplit";
import { ref, onMounted } from "vue";
import XCharts from "@/components/echart/XCharts";
import iconXiaoyu from "./images/rain-xiaoyu.png";
import iconXiaoyu2 from "./images/rain-xiaoyu2.png";
import iconZhongyu from "./images/rain-zhongyu.png";
import iconZhongyu2 from "./images/rain-zhongyu2.png";
import iconDayu from "./images/rain-dayu.png";
import iconDayu2 from "./images/rain-dayu2.png";
import iconBaoyu from "./images/rain-baoyu.png";
import iconBaoyu2 from "./images/rain-baoyu2.png";
import IconNoneRain from "./images/rain-0.svg";

const option = ref({});

onMounted(() => {
  getData();
});

function getRainIcon(rainType) {
  if (rainType === 1 || rainType === 0) {
    return {
      jiance: iconXiaoyu,
      yubao: iconXiaoyu2,
    };
  }
  if (rainType === 2) {
    return {
      jiance: iconZhongyu,
      yubao: iconZhongyu2,
    };
  }
  if (rainType === 3) {
    return {
      jiance: iconDayu,
      yubao: iconDayu2,
    };
  }
  if (rainType === -1) {
    return {
      jiance: IconNoneRain,
      yubao: IconNoneRain,
    };
  }
  return {
    jiance: iconBaoyu,
    yubao: iconBaoyu2,
  };
}
function getData() {
  // const type = 2 // 1 监测  2 预报 3 监测+预报
  const resultDay = [
    { tm: "08-17", rainType: 1 },
    { tm: "08-18", rainType: 1 },
    { tm: "08-19", rainType: 1 },
    { tm: "08-20", rainType: 1 },
    { tm: "08-21", rainType: 1 },
    { tm: "08-22", rainType: 1 },
    { tm: "08-23", rainType: 1 },
    { tm: "08-24", rainType: 1 },
    { tm: "08-25", rainType: 1 },
    { tm: "08-26", rainType: 1 },
    { tm: "08-27", rainType: 1 },
    { tm: "08-28", rainType: 1 },
  ];
  const xAxis = [
    "08-17",
    "08-18",
    "08-19",
    "08-20",
    "08-21",
    "08-22",
    "08-23",
    "08-24",
    "08-25",
    "08-26",
    "08-27",
    "08-28",
  ];
  const result = {};
  result["监测"] = [
    ["08-17", 12],
    ["08-18", 2],
    ["08-19", 14],
    ["08-20", 6.4],
    ["08-21", 8],
    ["08-22", 2.6],
    ["08-23", 0],
    ["08-24", 0],
    ["08-25", 0],
    ["08-26", 0],
    ["08-27", 0],
    ["08-28", 0],
  ];
  result["预报"] = [
    ["08-17", 0],
    ["08-18", 0],
    ["08-19", 0],
    ["08-20", 0],
    ["08-21", 0],
    ["08-22", 0],
    ["08-23", 1.5],
    ["08-24", 6],
    ["08-25", 4],
    ["08-26", 8],
    ["08-27", 11],
    ["08-28", 10],
  ];
  result["累计"] = [8, 10, 19, 24, 28, 30, 31, 32, 33, 37, 42, 48];
  const markPointJC = [];
  const markPointYB = [];
  result["监测"].forEach((item, index) => {
    markPointJC.push({
      xAxis: index, // 放需要展示图片的x轴索引
      yAxis: item[1] >= result["预报"][index][1] ? item[1] : -1, // y轴对应的值
      symbol:
        "image://" +
        getRainIcon(resultDay.find((i) => i.tm === item[0]).rainType).jiance,
      symbolOffset:
        resultDay.find((i) => i.tm === item[0]).rainType === -1
          ? ["0", "-20%"]
          : ["0", "-50%"],
      symbolSize:
        resultDay.find((i) => i.tm === item[0]).rainType === -1
          ? [7, 11]
          : [20, 20], // 设置图片的宽度和高度
    });
  });
  result["预报"].forEach((item, index) => {
    const img = getRainIcon(resultDay.find((i) => i.tm === item[0]).rainType);
    console.log(img);
    markPointYB.push({
      xAxis: index, // 放需要展示图片的x轴索引
      yAxis: item[1] > result["监测"][index][1] ? item[1] : -1, // y轴对应的值
      symbol:
        "image://" +
        getRainIcon(resultDay.find((i) => i.tm === item[0]).rainType).yubao,
      symbolOffset:
        resultDay.find((i) => i.tm === item[0]).rainType === -1
          ? ["0", "20%"]
          : ["0", "-50%"],
      symbolSize:
        resultDay.find((i) => i.tm === item[0]).rainType === -1
          ? [7, 11]
          : [20, 20], // 设置图片的宽度和高度
    });
  });
  const markPoint = {};
  markPoint["监测"] = markPointJC;
  markPoint["预报"] = markPointYB;
  option.value = getRainfallOptIcon(xAxis, result, markPoint);
}
function getRainfallOptIcon(xAxis, data, markPoint) {
  const data1 =
    Math.max(...data["监测"].map((i) => i[1])) >
    Math.max(...data["预报"].map((i) => i[1]))
      ? data["监测"].map((i) => i[1])
      : data["预报"].map((i) => i[1]);
  const y0Item = echartsSplit(data1, 3, true);
  if (y0Item.min < 0) {
    y0Item.min = 0;
  }
  const data2 = data["累计"];
  const y1Item = echartsSplit(data2, 3, true);
  if (y1Item.min < 0) {
    y1Item.min = 0;
  }

  const option = {
    legend: {
      show: true,
      itemWidth: 14,
      itemHeight: 7,
      data: ["监测", "预报", "累计"],
      top: 10,
      textStyle: {
        color: "#EAF1FF",
        fontWeight: 400,
      },
    },
    dataZoom: [
      {
        show: true,
        height: 12,
        // startValue: 0, // 开始值，这里设置为第一个数据点的索引
        // endValue: 6, // 结束值，这里设置为第三个数据点的索引
        startValue: 0, // 开始值，这里设置为第一个数据点的索引
        endValue: 100, // 结束值，这里设置为第三个数据点的索引
        bottom: "5%",
      },
    ],
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(0,0,0,0.3)",
      borderWidth: 0,
      textStyle: {
        color: "#fff",
        fontSize: 12,
      },
    },
    grid: {
      left: "10%",
      right: "10%",
      top: "20%",
      bottom: "20%",
    },
    xAxis: {
      type: "category",
      data: xAxis,
      axisLine: {
        show: true,
        lineStyle: {
          color: "rgba(186,231,255,0.4)",
          width: 1,
          type: "solid",
        },
      },
      axisTick: {
        show: true,
        inside: true, // 设置线的方向
        alignWithLabel: true,
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "rgba(221, 248, 255, 1)",
        },
        // formatter: function (value) {
        //   console.log(value, 'value--------')
        //   return (
        //     ' ' +
        //     `${value}`.substring(5, 10) +
        //     ' ' +
        //     `${value}`.substring(10, 13)
        //   )
        // }
      },
    },
    yAxis: [
      {
        name: "雨量：mm",
        nameTextStyle: {
          color: "rgba(221, 248, 255, 1)",
        },
        type: "value",
        splitLine: {
          show: true,
          lineStyle: {
            type: "solid",
            color: "rgba(62, 188, 238, 0.2)",
          },
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: "rgba(221, 248, 255, 1)",
          },
        },
        ...y0Item,
      },
      {
        name: "累计：mm",
        nameTextStyle: {
          color: "rgba(234,241,255,0.74)",
        },
        type: "value",
        splitLine: {
          show: false,
          lineStyle: {
            type: "solid",
            color: "rgba(230,247,255,0.2)",
          },
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: "rgba(234,241,255,0.74)",
          },
        },
        ...y1Item,
      },
    ],
    series: [
      {
        name: "监测",
        type: "bar",
        barWidth: 15,
        // data: [
        //   ['2023-11-18', '0.2'],
        //   ['2023-11-19', '0.5'],
        //   ['2023-11-20', '0.2'],
        //   ['2023-11-21', '0.1'],
        // ],
        data: data["监测"],
        tooltip: {
          valueFormatter: (value) => value + " mm",
        },
        itemStyle: {
          normal: {
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(11, 191, 255, 1)",
                opacity: 1,
              },
              {
                offset: 1,
                color: "rgba(60, 213, 255, 0)",
                opacity: 1,
              },
            ]),
            borderColor: "#1D9BC7", // 设置柱状图边框颜色
            borderWidth: 1, // 设置柱状图边框宽度
          },
        },
        label: {
          show: true,
          position: "top", // 在柱子的顶部显示标签
          offset: [0, -10], // 调整标签的位置，[x, y]，这里向上偏移10个像素
          color: "#DDF8FF", // 文字颜色
          fontSize: 12, // 字体大小
          formatter: (v) => {
            return v.value[1] || "";
          }, // 显示数据值
        },
        markPoint: {
          data: markPoint["监测"],
          symbolSize: [20, 20],
          label: {
            show: false,
          },
        },
      },
      {
        name: "预报",
        type: "bar",
        barGap: "-100%",
        barWidth: 15,
        // data: [
        //   ['2023-11-21', '0.4'],
        //   ['2023-11-22', '0.7'],
        //   ['2023-11-23', '0.9'],
        //   ['2023-11-24', '0.8'],
        // ],
        data: data["预报"],
        tooltip: {
          valueFormatter: (value) => value + " mm",
        },
        itemStyle: {
          normal: {
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(0, 255, 204, 1)",
                opacity: 1,
              },
              {
                offset: 1,
                color: "rgba(60, 255, 179, 0)",
                opacity: 1,
              },
            ]),
            borderColor: "#1DC7A5", // 设置柱状图边框颜色
            borderWidth: 1, // 设置柱状图边框宽度
          },
        },
        label: {
          show: true,
          position: "top", // 在柱子的顶部显示标签
          color: "#DDF8FF", // 文字颜色
          fontSize: 12, // 字体大小
          offset: [0, -10], // 调整标签的位置，[x, y]，这里向上偏移10个像素
          formatter: (v) => {
            // console.log('v: ', v)
            return v.value[1] || "";
          }, // 显示数据值
        },
        markPoint: {
          data: markPoint["预报"],
          symbolSize: [20, 20],
          label: {
            show: true,
          },
        },
      },
      {
        name: "累计",
        type: "line",
        yAxisIndex: 1,
        data: data["累计"],
        tooltip: {
          valueFormatter: (value) => value + " mm",
        },
        itemStyle: {
          normal: {
            color: "#FFB83A",
          },
        },
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
}
</style>
