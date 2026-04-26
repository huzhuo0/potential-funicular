<template>
  <div class="inspect-pie-chart">
    <div class="project-type-container">
      <div class="project-pie-chart">
        <div class="chart-bg"></div>
        <div class="chart-center"></div>
        <XCharts :options="chartOptions" class="pie-chart"></XCharts>
      </div>
    </div>
  </div>
</template>

<script setup>
import XCharts from "@/components/echart/XCharts";
import { graphic } from "echarts";
import { ref, onMounted } from "vue";
const chartOptions = ref({});
onMounted(() => {
  setTimeout(() => {
    getData();
  }, 500);
});
function getData() {
  chartOptions.value = projectTypePieOption({
    titleText: [`{a|${170}}`, "{b|个}"].join(""),
    pieData: [
      { value: 3, name: "150项重大水利工程" },
      { value: 23, name: "水利薄弱环节建设项目" },
      { value: 126, name: "其他水利建设项目" },
      { value: 18, name: "市县立项项目" },
    ],
  });
}
function projectTypePieOption(seriesData) {
  let option = {
    backgroundColor: "transparent",
    title: [
      {
        text: seriesData.titleText || [`{a|32}`].join(""),
        subtext: "总数",
        subtextStyle: {
          fontSize: 14,
          color: "#FFFFFF",
          // fontWeight: "bold",
        },
        textStyle: {
          rich: {
            a: {
              color: "#FFFFFF",
              fontWeight: "bold",
              fontSize: 20,
            },
            b: {
              color: "#FFFFFF",
              fontSize: 12,
            },
          },
        },
        itemGap: 5,
        textAlign: "center",
        x: "47%",
        y: "33%",
      },
    ],
    tooltip: {
      trigger: "item",
      //   confine: true,
      //   position: "top",
      className: "custom-tooltip-box",
      formatter: function (params) {
        let str = "";
        console.log(params, "params=====");
        // params.forEach((item, index) => {
        str += `${params.seriesName}
            <br/>
            `;
        if (params.seriesName.includes("项目类型分布")) {
          str += `${params.marker}
            <span class='tool-label'>${params.name}</span>
             <span  class='tool-value' style='color:${params.color}'>${params.value}</span><span class='tool-unit'>个</span>`;
        }
        // });
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
    // color: ["#33FFFF", "#9877FF", "#E2A596", "#A5E162", "#FFFFFF", "#A18DD6"],
    color: ["#1F9EFF", "#00FFFF", "#F5E74F", "#FF8317", "#FFFFFF", "#A18DD6"],
    legend: {
      show: false,
    },
    series: [
      {
        name: "项目类型分布",
        type: "pie",
        // 是否顺时针旋转
        clockwise: true,
        minAngle: 20, // 最小的扇区角度（0 ~ 360）
        center: ["50%", "50%"], // 饼图的中心（圆心）坐标
        radius: [55, 64], // 饼图的半径
        avoidLabelOverlap: true, // 是否启用防止标签重叠
        cursor: "auto",
        itemStyle: {
          // 图形样式
          normal: {
            borderColor: "#1e2239",
            borderWidth: 1.5,
          },
        },
        label: {
          // 标签的位置
          normal: {
            // show: true,
            show: false,
            position: "inside", // 标签的位置
            formatter: "{d}%",
            textStyle: {
              color: "#fff",
            },
          },
          emphasis: {
            // show: true,
            // 显示强调状态
            show: false,
            // disabled: true,
            // 禁用强调状态
            textStyle: {
              fontWeight: "bold",
            },
            // 强调状态下文本的样式，加粗
          },
        },
        // emphasis: {
        //   // 禁用高亮状态 放开的话，鼠标移上去会有高亮状态
        //   disabled: true,
        // },
        data:
          seriesData && seriesData.pieData && seriesData.pieData.length
            ? seriesData.pieData
            : [
                { value: 335, name: "岸线问题" },
                { value: 335, name: "排污问题" },
                { value: 335, name: "水面水体" },
                { value: 335, name: "水面水体1" },
                { value: 335, name: "水面水体2" },
              ],
      },
      {
        name: "",
        type: "pie",
        clockwise: true,
        silent: true,
        minAngle: 20, // 最小的扇区角度（0 ~ 360）
        center: ["50%", "50%"], // 饼图的中心（圆心）坐标
        radius: [42, 53], // 饼图的半径
        itemStyle: {
          // 图形样式
          normal: {
            borderColor: "#1e2239",
            borderWidth: 1.5,
            opacity: 0.4,
          },
        },
        label: {
          // 标签的位置
          normal: {
            show: false,
          },
        },
        data:
          seriesData && seriesData.pieData && seriesData.pieData.length
            ? seriesData.pieData
            : [
                { value: 335, name: "岸线问题" },
                { value: 335, name: "排污问题" },
                { value: 315, name: "水面水体" },
                { value: 315, name: "水面水体1" },
                { value: 315, name: "水面水体2" },
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
    background: url("./images/tooltip-bg.png");
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
  position: relative;
  z-index: 1;
  background: linear-gradient(
    90deg,
    rgba(21, 33, 51, 0.76) 0%,
    rgba(25, 51, 105, 0.6) 100%
  );
  .project-type-container {
    width: 100%;
    display: flex;
    padding-bottom: 10px;
    .project-pie-chart {
      width: 142px;
      height: 142px;
      //   background-image: url("~@/assets/images/water-project-construction/pie-chart-bg.png");
      //   background-size: 100% 100%;
      //   background-repeat: no-repeat;
      position: relative;
      margin-right: 15px;
      .chart-bg {
        width: 100%;
        height: 100%;
        background: url("./images/chart-animation.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        position: absolute;
        left: 0;
        top: 0;
        animation: rotate 10s linear infinite;
      }
      .chart-center {
        width: 142px;
        height: 142px;
        background: url("./images/pie-chart-center.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }

    // .child-content {
    //   display: flex;
    //   justify-content: flex-start;
    // }
  }
}
</style>
