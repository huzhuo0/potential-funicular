<!--
 * @FilePath: \myproject\src\views\echartList\index.vue
 * @Description:
-->
<template>
  <div class="home" :style="{ width: width, height: height, display: 'flex' }">
    <div style="width: 300px; height: 300px; background: #fff">
      <pie-chart></pie-chart>
    </div>
    <div style="width: 300px; height: 300px; background: #fff">
      <line-chart-one></line-chart-one>
    </div>
    <div style="width: 300px; height: 300px; background: #fff">
      <line-chart-two></line-chart-two>
    </div>
    <div style="width: 300px; height: 150px; background: #fff">
      <bar-chart></bar-chart>
    </div>
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
          <div style="width: 300px; height: 300px; background: #fff">
            <line-chart-three
              ref="lineChart"
              @getNewData="getNewData"
            ></line-chart-three>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pieChart from "../../components/echart/pieChart.vue";
import lineChartOne from "../../components/echart/lineChartOne.vue";
import lineChartTwo from "../../components/echart/lineChartTwo.vue";
import barChart from "../../components/echart/barChart.vue";
import lineChartThree from "../../components/echart/lineChartThree.vue";
export default {
  name: "chartList",
  components: {
    pieChart,
    lineChartOne,
    lineChartTwo,
    barChart,
    lineChartThree,
  },
  data() {
    return {
      width: "100%",
      height: window.innerHeight + "px",
      showCom: "showState",
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
  mounted() {},
  methods: {
    getNewData(val) {
      this.waterList[1].value = val;
    },
  },
  computed: {},
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
