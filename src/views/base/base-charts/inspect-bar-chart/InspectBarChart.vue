<template>
  <div class="inspect-pie-chart">
    <XCharts :options="option" class="line-chart"></XCharts>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import XCharts from "@/components/echart/XCharts";

const option = ref({});
const chartInstance = ref(null);
onMounted(() => {
  getData();
});

function init(_chartInstance) {
  chartInstance.value = _chartInstance;
}

function getData() {
  option.value = inspectBarOption({
    xData: [
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
    yData1: [2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    yData2: [3, 7, 3, 4, 0, 0, 0, 0, 0, 0, 0, 0],
    yData3: [40, 20, 25, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  });
}

function inspectBarOption(seriesData) {
  // let yData1 = seriesData ? seriesData.yData1 : [0, 0, 0, 0, 0, 0];
  // let yData2 = seriesData ? seriesData.yData2 : [0, 0, 0, 0, 0, 0];
  // // 左侧和右侧数据的最大值和最小值
  // let leftYAxisMin = Math.floor(Math.min(...yData1, ...yData2) / 10) * 10;
  // let leftYAxisMax = Math.ceil(Math.max(...yData1, ...yData2) / 9.5) * 10;
  //  let rightYAxisMin = Math.floor(Math.min(...yData2) / 10) * 10;
  //  let rightYAxisMax = Math.ceil(Math.max(...yData2) / 9.5) * 10;
  // let splitNumber = 5;
  // const leftSpan = (leftYAxisMax - leftYAxisMin) / splitNumber;
  //  const rightSpan = (rightYAxisMax - rightYAxisMin) / splitNumber;
  let option = {
    backgroundColor: "transparent",
    tooltip: {
      // 提示框组件
      trigger: "axis",
      confine: true,
      position: "top",
      className: "custom-tooltip-box",
      // appendToBody: true,
      // 相对位置，放置在容器正中间
      // position: function (pos, params, dom, rect, size) {
      //   // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
      //   var obj = { top: 60 };
      //   obj[["left", "right"][+(pos[0] < size.viewSize[0] / 2)]] = 5;
      //   return obj;
      // },
      formatter: function (params) {
        let str = "";
        params.forEach((item, index) => {
          if (index === 0) {
            str += `${item.name}
            <br/>
            `;
          }
          if (
            item.seriesName.includes("应巡") ||
            item.seriesName.includes("实巡")
          ) {
            str += `${item.marker}
            <span class='tool-label'>${item.seriesName}</span>
             <span  class='tool-value' style='color:${item.color.colorStops[0].color}'>${item.value}</span><span class='tool-unit'>次</span>`;
            if (index + 1 < params.length) {
              str += "<br/> ";
            }
          }
          if (item.seriesName.indexOf("完成率") > -1) {
            str += `${item.marker}
            <span class='tool-label'>${item.seriesName}</span>
             <span  class='tool-value' style='color:${item.color}'>${item.value}</span><span class='tool-unit'>%</span>`;
            if (index + 1 < params.length) {
              str += "<br/> ";
            }
          }
        });
        str = `<div class='tooltip-content'>${str}</div>`;
        return str;
      },
      //   formatter: '{b}<br />{a0}: {c0}<br />{a1}: {c1}',
      //   axisPointer: {
      //     type: 'shadow',
      //     label: {
      //       backgroundColor: '#6a7985'
      //     }
      //   },
      //   textStyle: {
      //     color: '#fff',
      //     fontStyle: 'normal',
      //     fontFamily: '微软雅黑',
      //     fontSize: 12
      //   }
    },
    grid: {
      left: "4%",
      right: "4%",
      bottom: "12%",
      top: 35,
      padding: "0 0 10 0",
      containLabel: true,
    },
    legend: {
      show: true,
      // 图例组件，颜色和名字
      left: "center",
      bottom: 5,
      itemGap: 16,
      itemWidth: 8,
      itemHeight: 8,
      data: [
        {
          name: `应巡`,
          // icon:'image:// ../wwwroot/js/url2.png', // 路径
        },
        {
          name: `实巡`,
          // icon:'image:// ../wwwroot/js/url2.png', // 路径
        },
        {
          name: `完成率`,
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
          interval: 0, // 设置为 1，表示『隔一个标签显示一个标签』
          // margin: 20,
          // rotate: 15, // 标签旋转的角度，默认为 0，不旋转，正值是逆时针，负值是顺时针
          align: "center",
          textStyle: {
            color: "#FFFFFF",
            fontStyle: "normal",
            fontFamily: "PingFangSC, PingFang SC",
            fontSize: 12,
          },
          formatter: function (params) {
            let val = "";
            if (params.length > 10) {
              val = params.substring(0, 4) + "...";
              return val;
            }
            return params;
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
        name: "巡查次数：次",
        nameTextStyle: {
          color: "#B3CEFF",
          padding:
            seriesData && seriesData.yData1 && seriesData.yData1.length
              ? [0, 30, 0, 80]
              : [0, 30, 0, 80],
        },
        // align: "left",
        type: "value",
        splitNumber: 5,
        // min: leftYAxisMin,
        // max: leftYAxisMax || 10,
        // interval: leftSpan || 2,
        axisLabel: {
          textStyle: {
            color: " #B3CEFF",
            fontStyle: "normal",
            fontFamily: "PingFangSC, PingFang SC",
            fontSize: 12,
          },
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
            color: "rgba(62,188,238,.2)",
          },
        },
      },
      {
        name: `完成率`,
        nameTextStyle: {
          color: "#B3CEFF",
        },
        type: "value",
        splitNumber: 5,
        min: 0,
        max: 100,
        axisLabel: {
          formatter: function (value) {
            // 在每个数值后面加上百分号
            return value + "%";
          },
          textStyle: {
            color: " #B3CEFF",
            fontStyle: "normal",
            fontFamily: "PingFangSC, PingFang SC",
            fontSize: 12,
          },
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: "rgba(0, 85, 167, 0.80)",
          },
        },
      },
    ],
    series: [
      {
        name: `应巡`,
        type: "bar",
        data: seriesData.yData1 || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        barWidth: 10,
        // stack: '巡查',
        // barGap: 10, // 柱间距离
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
          borderColor: "#fff", // 边框颜色设为白色
          // borderWidth: [0, 0, 0, 0], // 四个方向的边框宽度，顺序是 [上, 右, 下, 左]
          borderType: "solid", // 边框类型，可以是 'solid', 'dashed', 'dotted'
          // 如果只需要顶部有边框，那么设置顶部的边框宽度为非零值
          // 注意：ECharts 4.x 版本开始支持数组形式来分别控制四边的边框宽度
          borderWidth: [12, 0, 0, 0], // 设置顶部边框宽度为 2
          normal: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              // 完成的圆环的颜色
              colorStops: [
                {
                  offset: 0,
                  color: "#A0D8FF", // 0% 处的颜色
                },
                {
                  offset: 0.5,
                  color: "#4BBEFC", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#1575B9",
                },
              ],
            },
          },
        },
      },
      {
        name: `实巡`,
        type: "bar",
        data: seriesData.yData2 || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        barWidth: 10,
        // stack: '巡查',
        // barGap: 10, // 柱间距离
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
        // label: {
        //   // 图形上的文本标签
        //   //   normal: {
        //   //     show: true,
        //   //     position: 'top',
        //   //     textStyle: {
        //   //       color: '#a8aab0',
        //   //       fontStyle: 'normal',
        //   //       fontFamily: '微软雅黑',
        //   //       fontSize: 12
        //   //     }
        //   //   }
        // },
        itemStyle: {
          normal: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              // 完成的圆环的颜色
              colorStops: [
                {
                  offset: 0,
                  color: "#A0FFCB",
                  // 0% 处的颜色
                },
                {
                  offset: 0.5,
                  color: "#4BFCCA",
                },
                {
                  offset: 1,
                  color: "#15B98B",
                },
              ],
            },
            //   borderColor: "#5ED4FF",
            //   borderWidth: 1,
            //   barBorderRadius: 15
          },
          // borderColor: '#5ED4FF',
          // borderWidth: 2
        },
      },
      {
        name: `完成率`,
        type: "line",
        data: seriesData.yData3 || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        yAxisIndex: 1,
        //   barWidth: 10,
        //   barGap: 0, // 柱间距离
        label: {
          // 图形上的文本标签
          //   normal: {
          //     show: true,
          //     position: 'top',
          //     textStyle: {
          //       color: '#a8aab0',
          //       fontStyle: 'normal',
          //       fontFamily: '微软雅黑',
          //       fontSize: 12
          //     }
          //   }
        },
        // smooth: true,
        itemStyle: {
          color: "#FFAD5A",
          // normal: {
          //   color: {
          //     type: "linear",
          //     x: 0,
          //     y: 0,
          //     x2: 0,
          //     y2: 1,
          //     // 完成的圆环的颜色
          //     colorStops: [
          //       {
          //         offset: 0,
          //         color: "rgba(47, 228, 46, 1)", // 0% 处的颜色
          //       },
          //       {
          //         offset: 1,
          //         color: "rgba(32, 245, 204, 0)",
          //       },
          //     ],
          //   },
          //   //   borderColor: "#5ED4FF",
          //   //   borderWidth: 1,
          //   //   barBorderRadius: 15
          // },
          // borderColor: '#5ED4FF',
          // borderWidth: 2
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
