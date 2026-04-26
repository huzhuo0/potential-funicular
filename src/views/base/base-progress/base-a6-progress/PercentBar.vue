<template>
  <div class="percent-bar">
    <div class="kpi-wrap">
      <div class="kpi1">
        <div class="text">{{ dataSource.text1 }}</div>
        <div class="value">{{ dataSource.value1 }}</div>
        <div class="unit">个</div>
      </div>
      <div class="kpi2 item1">
        <div class="text">{{ dataSource.text2 }}</div>
        <div class="value">{{ dataSource.value2 }}</div>
        <div class="unit">个</div>
      </div>
      <div class="kpi2 item2">
        <div class="text">{{ dataSource.text3 }}</div>
        <div class="value">{{ dataSource.value3 }}</div>
        <div class="unit">个</div>
      </div>
    </div>

    <div class="bar-wrap">
      <div
        class="inner-bar"
        :class="{
          'blue-bar': dataSource.barColor === 'blue',
          'green-bar': dataSource.barColor === 'green',
        }"
        :style="{ width: dataSource.percent + '%' }"
      >
        <div
          v-if="dataSource.percent >= 50"
          class="inner-text"
          :style="{ right: 0 }"
        >
          优良率 {{ dataSource.percent }}%
        </div>
      </div>
      <div
        v-if="dataSource.percent < 50"
        class="inner-text"
        :style="{ left: dataSource.percent + 2 + '%' }"
      >
        优良率{{ dataSource.percent }}%
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PercentBar",
  components: {},
  props: {
    dataSource: {
      type: Object,
      default: () => {
        return {
          text1: "单元工程数",
          text2: "合格数",
          text3: "优良数",
          value1: 0,
          value2: 0,
          value3: 0,
          percent: 2,
          barColor: "blue",
        };
      },
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="less" scoped>
.percent-bar {
  // height: 58px;
  background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%);
  border-radius: 5px;
  margin: 5px;
  padding: 5px;

  .kpi-wrap {
    display: flex;
    align-items: center;

    .kpi1 {
      display: flex;
      align-items: baseline;
      margin-right: auto;

      .text {
        font-family: YouSheBiaoTiHei;
        font-size: 14px;
        color: #0b80ff;
        margin-right: 5px;
      }

      .value {
        font-family: D-DIN, D-DIN;
        font-weight: bold;
        font-size: 18px;
        color: #39475b;
      }
    }

    .kpi2 {
      display: flex;
      align-items: baseline;
      position: relative;
      padding-left: 16px;
      margin-right: 10px;

      &:before {
        content: "";
        position: absolute;
        top: 3px;
        left: 0;
        width: 14px;
        height: 14px;

        border-radius: 2px;
        border: 1px solid #ffffff;
      }

      &.item1 {
        &:before {
          background: linear-gradient(180deg, #00c5ab 0%, #00b4b9 100%);
        }
      }

      &.item2 {
        &:before {
          background: linear-gradient(215deg, #3e7dff 0%, #61b5ff 100%);
        }
      }

      .text {
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 12px;
        color: #333333;
        margin-right: 10px;
      }

      .value {
        font-family: D-DIN, D-DIN;
        font-weight: bold;
        font-size: 14px;
        color: #333333;
      }

      .unit {
        font-family: D-DIN, D-DIN;
        font-weight: bold;
        font-size: 14px;
        color: #333333;
      }
    }
  }

  .bar-wrap {
    width: 308px;
    height: 21px;
    background-image: url("./images/percent-bar-bg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    position: relative;

    .inner-bar {
      height: 100%;

      background-size: cover;
      background-repeat: no-repeat;
      position: relative;

      &.blue-bar {
        background-image: url("./images/percent-bar-blue.png");
      }

      &.green-bar {
        background-image: url("./images/percent-bar-green.png");
      }
    }

    .inner-text {
      position: absolute;
      right: 0;
      margin-left: 5px;
      font-family: D-DIN, D-DIN;
      font-weight: bold;
      font-size: 12px;
      height: 21px;
      line-height: 21px;
      color: #39475b;
      white-space: nowrap;
    }
  }
}
</style>
