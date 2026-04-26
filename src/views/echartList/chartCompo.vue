<template>
  <div class="bottom-container">
    <div class="bottom-content">
      <div class="water-content">
        <div
          v-for="item in waterList"
          :key="item.key"
          class="common-water"
          :class="cumulateId === item.key ? 'yesterday-water' : ''"
          @click="changeCumulate(item.key)"
        >
          <div class="cumulative-water-num">
            {{ item.value.toFixed(4) }}
            <span>万m³</span>
          </div>
          <div class="water-title">{{ item.label }}</div>
        </div>
      </div>
      <div class="line-chart">
        <div style="width: 100%; height: 100%">
          <div ref="main" style="width: 100%; height: 100%"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "chartCompo",
  data() {
    return {
      waterList: [
        {
          label: "昨日补水量",
          value: 0,
          key: 1,
        },
        {
          label: "累计补水量",
          value: 0,
          key: 2,
        },
      ],
      cumulateId: 1,
      chart: {},
      processLineData: [
        { time: "04-16", val: 1, valTotal: 1 },
        { time: "04-20", val: 1, valTotal: 2 },
        { time: "04-24", val: 1, valTotal: 3 },
        { time: "04-28", val: 1, valTotal: 4 },
        { time: "05-04", val: 1, valTotal: 5 },
        { time: "05-08", val: 1, valTotal: 6 },
        { time: "05-12", val: 1, valTotal: 7 },
        { time: "05-16", val: 1, valTotal: 8 },
        { time: "05-20", val: 1, valTotal: 9 },
        { time: "05-24", val: 1, valTotal: 10 },
        { time: "05-28", val: 1, valTotal: 11 },
        { time: "06-02", val: 1, valTotal: 12 },
        { time: "06-04", val: 1, valTotal: 13 },
        { time: "06-08", val: 1, valTotal: 14 },
      ],
    };
  },
  mounted() {
    this.initChart();
    this.watchDataZoom();
  },
  methods: {
    /**
     * 切换昨日补水量和累计补水量曲线图
     * @param key 切换id
     * @return {*}
     */
    changeCumulate(key) {
      this.cumulateId = key;
    },
    watchDataZoom() {
      console.log(this.chart, "this.$refs.main");
      // 监听dataZoom变化
      this.chart.on("datazoom", () => {
        // dataZoom中片段开始值
        let start = this.chart.getModel().option.dataZoom[0].startValue;
        // dataZoom中片断结束值
        let end = this.chart.getModel().option.dataZoom[0].endValue;
        // dataZoom开始值对应的x轴中的开始值
        let xStart = this.chart.getOption().xAxis[0].data[start];
        // dataZoom结束值对应的x轴中的结束值
        let xEnd = this.chart.getOption().xAxis[0].data[end];
        // 判断x轴开始日期是否等于结束日期,开始日期不等于结束日期时,累计值=结束-开始
        if (xStart !== xEnd && this.xLineData.length) {
          let startIndex = this.xLineData.findIndex((item) => item === xStart);
          let endIndex = this.xLineData.findIndex((item) => item === xEnd);
          let data = this.processLineData.slice(startIndex, endIndex + 1);
          this.waterList[1].value =
            data[data.length - 1].valTotal - data[0].valTotal + data[0].val;
        } else if (xStart === xEnd && this.xLineData.length) {
          // x轴开始日期等于结束日期,取累计到当天的值
          // this.waterList[1].value = this.processLineData.find(
          //   item => item.time === xStart
          // ).valTotal
          this.waterList[1].value = this.processLineData.find(
            (item) => item.time === xStart
          ).val;
        }
      });
    },
    initChart() {
      var myChart = echarts.init(this.$refs.main);
      this.chart = myChart;
      let xData = [
        "04-16",
        "04-20",
        "04-24",
        "04-28",
        "05-04",
        "05-08",
        "05-12",
        "05-16",
        "05-20",
        "05-24",
        "05-28",
        "06-02",
        "06-04",
        "06-08",
      ];
      let seriesData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
      let options = { zoomLeft: "50px", zoomRight: "50px", zoomSize: "12" };
      const option = {
        backgroundColor: "orange",
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(0,0,0,0.3)",
          borderWidth: 0,
          textStyle: {
            color: "#fff",
            fontSize: 12,
          },
          formatter: (params) => {
            let str = "";
            params.forEach((item) => {
              str +=
                item.marker +
                item.axisValue +
                "<br />" +
                item.seriesName +
                " : " +
                item.data +
                "万m³<br />";
            });
            return str;
          },
        },
        dataZoom: [
          {
            type: "slider",
            show: true,
            height: 20,
            left: options.zoomLeft,
            right: options.zoomRight,
            bottom: "2%",
            start: 0,
            end: 100,
            backgroundColor: "rgba(7,49,90,0.6)",
            textStyle: {
              color: "#DDF8FF",
              fontSize: options.zoomSize,
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
        grid: {
          right: "5%",
          bottom: "15%",
          left: "5%",
          top: "30px",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: xData,
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#DDF8FF",
                fontSize: 12,
              },
            },
          },
        ],
        yAxis: [
          {
            name: "水量: 万m³",
            nameTextStyle: {
              color: "#DDF8FF",
            },
            type: "value",
            position: "left",
            // data: yData,
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(62,188,238,0.2)",
                type: "solid",
                width: 1,
              },
            },
            axisLabel: {
              color: "#DDF8FF",
              fontSize: 12,
            },
          },
        ],
        series: [
          {
            name: "水量",
            type: "line",
            yAxisIndex: 0,
            itemStyle: {
              normal: {
                // 背景色
                areaStyle: {
                  type: "default",
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      { offset: 0, color: "#13A3DC" },
                      { offset: 1, color: "transparent" },
                    ],
                    globalCoord: false,
                  },
                },
              },
            },
            lineStyle: {
              // 线条颜色
              color: {
                colorStops: [
                  { offset: 0, color: "#00DAFF" },
                  { offset: 1, color: "#00FFA2" },
                ],
              },
              width: 2,
              type: "solid",
            },
            smooth: true,
            showSymbol: false, // 不显示圆点
            data: seriesData,
          },
        ],
      };

      myChart.setOption(option);
    },
  },
};
</script>

<style lang="less" scoped>
.bottom-container {
  width: 500px;
  height: 500px;
  // padding:10px 10px 10px 5px;
  .bottom-title {
    width: 100%;
    height: 31px;
  }
  .bottom-content {
    width: 100%;
    height: calc(100% - 31px);
    box-sizing: border-box;
    background: transparent;
    .bottom-content-chart {
      width: 100%;
      height: 45px;
    }
    .water-content {
      width: 100%;
      height: 53px;
      margin-bottom: 5px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      .common-water {
        width: 204px;
        height: 53px;
        box-sizing: border-box;
        padding: 4px 0 0 40px;
        background: url("~@/assets/img/cumulative-water.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        &:hover {
          cursor: pointer;
        }
        .cumulative-water-num {
          height: 25px;
          font-size: 18px;
          font-weight: 600;
          color: #1adaff;
          line-height: 25px;
          span {
            color: #6ac3eb;
            font-size: 13px;
            margin-left: 10px;
          }
        }
        .water-title {
          width: 113px;
          height: 20px;
          font-size: 14px;
          font-weight: 500;
          color: #ffffff;
          line-height: 20px;
        }
      }
      .yesterday-water {
        background: url("~@/assets/img/yesterday-water.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        .cumulative-water-num {
          // width: 103px;
          height: 25px;
          font-size: 18px;
          font-weight: 600;
          color: #67f9b5;
          line-height: 25px;
          span {
            color: #6ac3eb;
            font-size: 13px;
            margin-left: 10px;
          }
        }
      }
    }
    .line-chart {
      width: 107%;
      height: calc(100% - 103px);
      position: relative;
      left: -15px;
      .line-chart-content {
        width: 100%;
        height: 100%;
        background: transparent;
      }
    }
  }
}
</style>
