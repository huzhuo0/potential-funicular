<template>
  <div class="warn-line-flow-chart">
    <XCharts :options="options" class="chart"></XCharts>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import XCharts from "@/components/echart/XCharts";

defineOptions({
  name: "WarnLineFlowChart",
});

const options = ref({});

onMounted(() => {
  options.value = {
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
          name: `实时流量`,
          // icon:'image:// ../wwwroot/js/url2.png', // 路径
        },
        {
          name: `计划流量`,
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
        let data0 = `${circle}rgba(69, 152, 255, 1)"></span> ${params[0]["seriesName"]}: <span style="color: #4598FF">${val0}</span>m³/s`;
        let data1 = `${circle}rgba(1, 246, 153, 1)"></span> ${params[1]["seriesName"]}: <span style="color: #01F699">${val1}</span>m³/s`;
        return `<div class='tooltip-content'>日期：${params[0].axisValueLabel}<br/>${data0}<br/>${data1}</div>`;
      },
    },
    // tooltip: {
    //   // 提示框组件
    //   trigger: "axis",
    //   confine: true,
    //   position: "top",
    //   className: "custom-tooltip-box",
    //   // appendToBody: true,
    //   // 相对位置，放置在容器正中间
    //   // position: function (pos, params, dom, rect, size) {
    //   //   // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
    //   //   var obj = { top: 60 };
    //   //   obj[["left", "right"][+(pos[0] < size.viewSize[0] / 2)]] = 5;
    //   //   return obj;
    //   // },
    //   formatter: function (params) {
    //     console.log(params, "params");
    //     let str = "";
    //     params.forEach((item, index) => {
    //       if (index === 0) {
    //         str += `${item.name}
    //       <br/>
    //       `;
    //       }
    //       if (
    //         item.seriesName.includes("实时流量") ||
    //         item.seriesName.includes("计划流量")
    //       ) {
    //         str += `${item.marker}
    //        <span class='tool-label'>${item.seriesName}</span>
    //        <span  class='tool-value' >${item.value}</span><span class='tool-unit'>m³/s</span>`;
    //         if (index + 1 < params.length) {
    //           str += "<br/> ";
    //         }
    //       }
    //     });
    //     str = `<div class='tooltip-content'>${str}</div>`;
    //     return str;
    //   },
    //   //   formatter: '{b}<br />{a0}: {c0}<br />{a1}: {c1}',
    //   //   axisPointer: {
    //   //     type: 'shadow',
    //   //     label: {
    //   //       backgroundColor: '#6a7985'
    //   //     }
    //   //   },
    //   //   textStyle: {
    //   //     color: '#fff',
    //   //     fontStyle: 'normal',
    //   //     fontFamily: '微软雅黑',
    //   //     fontSize: 12
    //   //   }
    // },
    grid: {
      left: "2%",
      right: "10%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        name: "时间",
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
      nameTextStyle: {
        color: "#B3CEFF",
        padding: [0, 0, 0, 30],
      },
      type: "value",

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
      // 定义视觉映射组件
      pieces: [
        {
          gt: 0, // 大于0
          lte: 50, // 小于等于50
          color: "#4598FF", // 颜色为#4598FF
        },
        {
          gt: 50, // 大于50
          color: "transparent", // 颜色为透明
        },
      ],
      showLabel: false, // 不显示标签
      itemSymbol: "none", // 不显示符号
    },
    series: [
      {
        name: "实时流量",
        type: "line",
        symbol: "none",
        smooth: true,
        areaStyle: {
          //   color: "red",
          origin: "end",
        },
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
        name: "计划流量",
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
          data: [{ type: "average", x: "5%", symbolSize: 25, value: 50 }], // 可用x y 控制markpoint位置   value是point显示的值
          symbol: "circle",
          label: {
            show: true,
            color: "#FFF",
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
