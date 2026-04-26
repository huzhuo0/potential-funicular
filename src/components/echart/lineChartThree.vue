<template>
  <div style="width: 100%; height: 100%">
    <!-- <div id="main" style="width:100%;height:100%"></div> -->
    <div ref="main" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "lineChartThree",
  components: {},
  data() {
    return {
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
  props: {},
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      // var myChart = echarts.init(document.getElementById('main'))
      var myChart = echarts.init(this.$refs.main);
      const xData = [
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
      const seriesData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
      const options = { zoomLeft: "50px", zoomRight: "50px", zoomSize: "12" };
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
      myChart.on("datazoom", () => {
        // dataZoom中片段开始值
        let start = myChart.getModel().option.dataZoom[0].startValue;
        // dataZoom中片断结束值
        let end = myChart.getModel().option.dataZoom[0].endValue;
        // dataZoom开始值对应的x轴中的开始值
        let xStart = myChart.getOption().xAxis[0].data[start];
        // dataZoom结束值对应的x轴中的结束值
        let xEnd = myChart.getOption().xAxis[0].data[end];
        // 判断x轴开始日期是否等于结束日期,开始日期不等于结束日期时,累计值=结束-开始
        if (xStart !== xEnd && xData.length) {
          let startIndex = xData.findIndex((item) => item === xStart);
          let endIndex = xData.findIndex((item) => item === xEnd);
          let data = this.processLineData.slice(startIndex, endIndex + 1);
          let newData =
            data[data.length - 1].valTotal - data[0].valTotal + data[0].val;

          this.$emit("getNewData", newData);
        } else if (xStart === xEnd && xData.length) {
          // x轴开始日期等于结束日期,取累计到当天的值
          let data = this.processLineData.find(
            (item) => item.time === xStart
          ).val;
          this.$emit("getNewData", data);
        }
      });

      myChart.setOption(option);
    },
  },
};
</script>
<style lang="less"></style>
