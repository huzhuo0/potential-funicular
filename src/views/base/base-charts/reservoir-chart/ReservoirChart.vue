<template>
  <div class="monitor-warn">
    <div class="monitor-warn-content">
      <template v-if="reservoirList && reservoirList.length">
        <div
          v-for="(item, index) in reservoirList"
          :key="index"
          class="monitor-warn-item"
          :class="{ 'warn-item': item.warnData && item.warnData.length }"
        >
          <!-- <div class="item-title" @click="goDetail(item)">
            <div class="title-icon"></div>
            <div class="title-text">{{ getValue(item.resName) }}</div>
          </div>
          <div v-if="item.warnData && item.warnData.length" class="item-tag">
            <div v-for="(it, idx) in item.warnData" :key="idx">
              {{ it.typ + it.typName }}
              <span v-if="idx < item.warnData.length - 2">、</span>
            </div>
          </div> -->
          <div class="item-detail">
            <!-- <div class="item-time">监测时间：{{ getValue(item.meaTime) }}</div>
            <div class="item-kpi">
              <div class="kpi-item">
                <div class="kpi-item-icon"></div>
                <div class="kpi-item-content">
                  <div class="kpi-item-name">蓄水量</div>
                  <div class="kpi-item-value">
                    {{ getValue(item.storage) }}
                    <span>亿m³</span>
                  </div>
                </div>
              </div>
              <div class="kpi-item">
                <div class="kpi-item-icon flux-icon"></div>
                <div class="kpi-item-content">
                  <div class="kpi-item-name">入库流量</div>
                  <div class="kpi-item-value">
                    {{ getValue(item.fluxIncome) }}
                    <span>m³/s</span>
                  </div>
                </div>
              </div>
            </div> -->
            <div class="item-chart">
              <XCharts :options="item.chartOptions"></XCharts>
            </div>
            <!-- <div class="out-flow">
              <div class="out-flow-text">出库流量</div>
              <div class="out-flow-value">
                {{ getValue(item.fluxOutcome) }}
                <span>m³/s</span>
              </div>
            </div> -->
          </div>
        </div>
      </template>
      <div v-else class="no-data">
        <a-empty style="width: 100%; height: 230px; margin-top: 50px"></a-empty>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import * as echarts from "echarts";
import XCharts from "@/components/echart/XCharts";
import reservoirImg from "./images/reservoir-chart.png";
const { graphic } = echarts;
const reservoirList = ref([
  {
    resName: "陈村水库",
    resCode: "1",
    meaTime: "2025-05-28 08:00:00",
    storage: 11.8454, // 蓄水量
    fluxIncome: 1566, // 入库流量
    maxFloodLevel: 57.1, // 校核水位
    designFloodLevel: 56.0, // 设计水位
    floodControlLevel: 52, // 汛限水位
    upHeight: 51.68, // 坝上水位----实时水位
    downHeight: 29.23, // 坝下水位
    fluxOutcome: 1566, // 出库流量
    chartOptions: {},
  },
]);
onMounted(() => {
  const resData = {
    success: true,
    message: "操作成功！",
    extMessage: "",
    code: 200,
    result: {
      records: [
        {
          id: "24",
          createBy: "admin",
          createTime: "2025-06-15 18:33:00",
          updateBy: "",
          updateTime: null,
          stadiaCode: "5",
          meaTime: "2025-06-19 20:00",
          fluxOutcome: 155.649,
          fluxIncome: 188.775,
          upHeight: 120.81,
          downHeight: 53.73,
          storage: 13.4612,
          electricity: 0.6,
          vlotage: 11.4,
          power: 7.4,
          maxFloodLevel: 126.26,
          designFloodLevel: 123.67,
          upperFloodLevel: null,
          floodControlLevel: 117.0,
          totalCapacity: 27.06,
          deadCapacity: 5.78,
          beneficialCapacity: 13.46,
          floodControlCapacity: null,
          capacityFloodControl: null,
          overlapCapacity: null,
          floodDesignProbability: "500年一遇",
          floodMaxProbability: "5000年一遇",
          grade: "I等",
          scale: "大（1）型",
          minTotalCapacity: null,
          maxTotalCapacity: null,
          cityProteet: "",
          minFarmlandProtect: null,
          maxFarmlandProtect: null,
          minAreaLrrigation: null,
          maxAreaLrrigation: null,
          minPowerCapacity: null,
          maxPowerCapacity: null,
          manageUnit: "大唐安徽发电有限公司",
          comments: "",
          stadiaName: "陈村",
          resName: "陈村水库",
          resCode: "1",
          stadiaLatitude: 30.42781228,
          stadiaLongitude: 118.1763222,
          resId: "1000",
          resType: null,
          rvCode: "青弋江",
          area: null,
          warnItem: "13",
          warnlevel: "2",
          warnData: [
            {
              typ: "水位",
              typName: "超汛限",
              reMark: null,
              val: 13,
              totalVal: null,
              flux: null,
            },
          ],
        },
      ],
      total: 3,
      size: 10,
      current: 1,
      pages: 1,
    },
    timestamp: 1750660313352,
  };
  reservoirList.value = resData.result.records.map((item) => {
    item.chartOptions = {};
    // item.upHeight = 80
    return item;
  });
  getData();
});
function getValue(value) {
  if (value || value === 0) {
    return value;
  }
  return "-";
}

function getData() {
  reservoirList.value.forEach((it, idx) => {
    const maxFloodLevel = it.maxFloodLevel;
    const designFloodLevel = it.designFloodLevel;
    const floodControlLevel = it.floodControlLevel;
    const upHeight = it.upHeight;
    const downHeight = it.downHeight;

    let max = Math.ceil(
      Math.max(
        it.maxFloodLevel,
        it.designFloodLevel,
        it.floodControlLevel,
        it.upHeight,
        it.downHeight
      )
    );
    let isWarn = it.warnData && it.warnData.length;
    reservoirList.value[idx].chartOptions = {
      graphic: {
        type: "image",
        style: {
          image: reservoirImg,
          x: 1,
          y: 5, // 图片的Y坐标
          width: 401, // 图片的宽度
          height: 215, // 图片的高度
        },
        z: -1, // 将图片放在图表下方
      },
      tooltip: {
        show: true,
        trigger: "axis",
        backgroundColor: "rgba(0,0,0,0.3)",
        borderWidth: 0,
        textStyle: {
          color: "#fff",
          fontSize: 12,
        },
        formatter: (params) => {
          let str = "";
          let mapColor = {
            校核水位: "rgb(228,61,61)",
            设计水位: "#FF9900",
            汛限水位: "#EDC70A",
            实际水位: "rgba(24, 196, 255, 1)",
            坝下水位: "rgba(24, 196, 255, 1)",
          };

          params.forEach((item) => {
            let itemValue = "";
            if (item.seriesName === "校核水位") {
              itemValue = maxFloodLevel;
            } else if (item.seriesName === "设计水位") {
              itemValue = designFloodLevel;
            } else if (item.seriesName === "汛限水位") {
              itemValue = floodControlLevel;
            } else if (item.seriesName === "实际水位") {
              itemValue = upHeight;
            } else if (item.seriesName === "坝下水位") {
              itemValue = downHeight;
            }
            str += `<span style='display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${
              mapColor[item.seriesName]
            };'></span>
                <span>${item.seriesName}</span>
                <span style='color:${
                  mapColor[item.seriesName]
                }'>${itemValue}</span><span>m</span><br/>`;
          });
          return str;
        },
      },
      grid: [
        {
          top: 30,
          left: 1,
          right: "50%",
          bottom: 0,
          containLabel: true,
        },
        {
          top: 30,
          left: "66%",
          right: 0,
          bottom: 0,
          containLabel: true,
        },
      ],
      legend: {
        show: false,
      },
      color: ["transparent", "transparent"],
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: ["水位", "水位"],
          show: false,
          gridIndex: 0,
          axisLabel: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
        },
        {
          type: "category",
          boundaryGap: false,
          data: ["水位", "水位"],
          show: false,
          gridIndex: 1,
          axisLabel: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
        },
      ],
      yAxis: [
        {
          name: "",
          nameTextStyle: {
            color: "rgba(219,225,255,1)",
            fontSize: 10,
          },
          min: 1,
          splitLine: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
            textStyle: {
              fontSize: 12,
              color: "rgba(219,225,255,1)",
            },
          },
          axisTick: {
            show: false,
          },
          gridIndex: 0,
        },
        {
          name: "",
          nameTextStyle: {
            color: "rgba(219,225,255,1)",
            fontSize: 10,
          },
          min: 0,
          max: max + 80,
          splitLine: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
            textStyle: {
              fontSize: 12,
              color: "rgba(219,225,255,1)",
            },
          },
          axisTick: {
            show: false,
          },
          gridIndex: 1,
        },
      ],
      series: [
        {
          name: "校核水位",
          type: "line",
          xAxisIndex: 0,
          yAxisIndex: 0,
          lineStyle: {
            color: "rgb(228,61,61)",
            width: 1,
            type: "dashed",
          },
          symbol: "none",
          symbolSize: 6,
          data: [it.maxFloodLevel * 1.4, it.maxFloodLevel * 1.4],
          areaStyle: {
            normal: {
              color: "transparent",
            },
          },
          markLine: {
            data: [
              {
                symbol: "none",
                type: "average",
                label: {
                  show: true,
                  position: "insideStartTop",
                  rich: {
                    a: {
                      color: "#ffffff",
                      fontSize: "10px",
                    },
                    b: {
                      color: "rgb(228,61,61)",
                      fontSize: "16px",
                    },
                    c: {
                      color: "#ffffff",
                      fontSize: "10px",
                      padding: [2, 0, 0, 2],
                    },
                  },
                  formatter: `{a|校核水位：}{b|${
                    it.maxFloodLevel || "-"
                  }}{c|m}`,
                },
              },
            ],
          },
        },
        {
          name: "设计水位",
          type: "line",
          xAxisIndex: 0,
          yAxisIndex: 0,
          lineStyle: {
            color: "#FF9900",
            width: 1,
            type: "dashed",
          },
          symbol: "none",
          symbolSize: 6,
          data: [it.designFloodLevel * 1.2, it.designFloodLevel * 1.2],
          areaStyle: {
            normal: {
              color: "transparent",
            },
          },
          markLine: {
            data: [
              {
                symbol: "none",
                type: "average",
                label: {
                  show: true,
                  position: "insideStartTop",
                  rich: {
                    a: {
                      color: "#ffffff",
                      fontSize: "10px",
                    },
                    b: {
                      color: "#FF9900",
                      fontSize: "16px",
                    },
                    c: {
                      color: "#ffffff",
                      fontSize: "10px",
                      padding: [2, 0, 0, 2],
                    },
                  },
                  formatter: `{a|设计水位：}{b|${
                    it.designFloodLevel || "-"
                  }}{c|m}`,
                },
              },
            ],
          },
        },
        {
          name: "汛限水位",
          type: "line",
          xAxisIndex: 0,
          yAxisIndex: 0,
          lineStyle: {
            color: "#EDC70A",
            width: 1,
            type: "dashed",
          },
          symbol: "none",
          symbolSize: 6,
          data: [it.floodControlLevel, it.floodControlLevel],
          areaStyle: {
            normal: {
              color: "transparent",
            },
          },
          markLine: {
            data: [
              {
                symbol: "none",
                type: "average",
                label: {
                  show: true,
                  position: "insideStartTop",
                  rich: {
                    a: {
                      color: "#ffffff",
                      fontSize: "10px",
                    },
                    b: {
                      color: "#EDC70A",
                      fontSize: "16px",
                    },
                    c: {
                      color: "#ffffff",
                      fontSize: "10px",
                      padding: [2, 0, 0, 2],
                    },
                  },
                  formatter: `{a|汛限水位：}{b|${
                    it.floodControlLevel || "-"
                  }}{c|m}`,
                },
              },
            ],
          },
        },
        {
          name: "实际水位",
          type: "line",
          xAxisIndex: 0,
          yAxisIndex: 0,
          lineStyle: {
            color: "rgba(24, 196, 255, 1)",
            width: 1,
            type: "solid",
          },
          color: "rgba(24, 196, 255, 1)",
          symbol: "none",
          data: [it.upHeight, it.upHeight],
          areaStyle: {
            normal: {
              color: new graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(0, 189, 255, 0.41)",
                },
                {
                  offset: 1,
                  color: "rgba(0, 77, 228, 0.16)",
                },
              ]),
            },
          },
          markLine: {
            data: [
              {
                symbol: "none",
                type: "average",
                label: {
                  show: true,
                  position: "insideEndTop",
                  rich: {
                    a: {
                      color: "#ffffff",
                      fontSize: "10px",
                    },
                    b: {
                      color: "rgba(24, 196, 255, 1)",
                      fontSize: "16px",
                    },
                    c: {
                      color: "#ffffff",
                      fontSize: "10px",
                      padding: [2, 0, 0, 2],
                    },
                    d: {
                      color: "#ff3535",
                      fontSize: "16px",
                      fontWeight: 600,
                    },
                  },
                  formatter: `{a|实际水位：}{${isWarn ? "d" : "b"}|${
                    it.upHeight || "-"
                  }}{c|m}`,
                },
              },
            ],
          },
        },
        {
          name: "坝下水位",
          type: "line",
          xAxisIndex: 1,
          yAxisIndex: 1,
          lineStyle: {
            color: "rgba(24, 196, 255, 1)",
            width: 1,
            type: "solid",
          },
          color: "rgba(24, 196, 255, 1)",
          symbol: "none",
          data: [it.downHeight, it.downHeight],
          areaStyle: {
            normal: {
              color: new graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(0, 189, 255, 0.41)",
                },
                {
                  offset: 1,
                  color: "rgba(0, 77, 228, 0.16)",
                },
              ]),
            },
          },
          markLine: {
            data: [
              {
                symbol: "none",
                type: "average",
                label: {
                  show: true,
                  position: "insideEndTop",
                  rich: {
                    a: {
                      color: "#ffffff",
                      fontSize: "10px",
                    },
                    b: {
                      color: "rgba(24, 196, 255, 1)",
                      fontSize: "16px",
                    },
                    c: {
                      color: "#ffffff",
                      fontSize: "10px",
                      padding: [2, 0, 0, 2],
                    },
                  },
                  formatter: `{a|坝下水位：}{b|${it.downHeight || "-"}}{c|m}`,
                },
              },
            ],
          },
        },
      ],
    };
  });
}
</script>

<style lang="less" scoped>
.monitor-warn {
  width: 100%;
  background: linear-gradient(
    90deg,
    rgba(21, 33, 51, 0.76) 0%,
    rgba(25, 51, 105, 0.6) 100%
  );
  .monitor-warn-content {
    width: 100%;
    // padding-right:12px;
    // padding: 0 12px;
    // height: 930px;
    overflow: auto;
    height: 100%;
    .monitor-warn-item {
      width: 100%;
      //   height: 388px;
      background-image: url(./images/reservoir-bg.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;
      height: 100%;
      //   margin-bottom: 13px;
      //   margin-top: 13px;
      //   padding-bottom: 12px;
      position: relative;
      .item-title {
        width: 100%;
        height: 31px;
        display: flex;
        align-items: center;
        padding-left: 7px;
        background-image: url(./images/reservoir-title.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        &:hover {
          cursor: pointer;
        }
        .title-icon {
          width: 24px;
          height: 24px;
          background-image: url(./images/reservoir-icon.png);
          background-size: 100% 100%;
          background-repeat: no-repeat;
          margin-right: 6px;
        }
        .title-text {
          font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
          font-weight: 500;
          font-size: 14px;
          color: #ffffff;
        }
      }
      .item-tag {
        width: 163px;
        height: 30px;
        line-height: 30px;
        position: absolute;
        right: 0;
        top: 0px;
        background-image: url(./images/lake-warn-tag.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        font-family: PingFang SC, PingFang SC;
        font-weight: 500;
        font-size: 14px;
        color: #ffffff;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        // padding: 0 10px;
      }
      .item-detail {
        width: 100%;
        height: 100%;
        // padding: 0 8px 0 10px;
        // .item-time {
        //   font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
        //   font-weight: 400;
        //   font-size: 14px;
        //   color: #ffffff;
        //   margin: 7px 0 8px 0;
        // }
        // .item-kpi {
        //   width: 100%;
        //   display: flex;
        //   justify-content: space-between;
        //   .kpi-item {
        //     width: 188px;
        //     height: 56px;
        //     background-image: url(./images/reservoir-kpi.png);
        //     background-size: 100% 100%;
        //     background-repeat: no-repeat;
        //     padding-left: 3px;
        //     display: flex;
        //     align-items: center;
        //     .kpi-item-icon {
        //       width: 46px;
        //       height: 52px;
        //       background-image: url(./images/water-icon.png);
        //       background-size: 100% 100%;
        //       background-repeat: no-repeat;
        //       margin-right: 11px;
        //     }
        //     .flux-icon {
        //       background-image: url(./images/flow-icon.png);
        //       background-size: 100% 100%;
        //       background-repeat: no-repeat;
        //     }
        //     .kpi-item-content {
        //       height: 100%;
        //       display: flex;
        //       flex-direction: column;
        //       padding: 4px 0;
        //       .kpi-item-name {
        //         font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
        //         font-weight: 400;
        //         font-size: 14px;
        //         color: #cdddf4;
        //       }
        //       .kpi-item-value {
        //         font-family: D-DIN-bold;
        //         font-weight: 700;
        //         font-size: 22px;
        //         color: #ffffff;
        //         span {
        //           font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
        //           font-weight: 400;
        //           font-size: 14px;
        //           color: #fff;
        //         }
        //       }
        //     }
        //   }
        // }
        .item-chart {
          //   margin-top: 13px;
          width: 100%;
          height: 100%;
          //   height: 195px;
        }
        .out-flow {
          width: 93px;
          height: 58px;
          position: absolute;
          background-image: url(./images/out-flux-bg.png);
          background-size: 100% 100%;
          background-repeat: no-repeat;
          padding: 2px 0 15px 21px;
          right: 36px;
          bottom: 136px;
          .out-flow-text {
            font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
            font-weight: 400;
            font-size: 12px;
            color: #cdddf4;
          }
          .out-flow-value {
            font-family: D-DIN-bold;
            font-weight: 700;
            font-size: 18px;
            color: #ffffff;
            position: relative;
            bottom: 4px;
            span {
              font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
              font-weight: 400;
              font-size: 12px;
              color: #cdddf4;
            }
          }
        }
      }
    }
    .warn-item {
      background-image: url(./images/reservoir-warn-bg.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
  }
}
</style>
