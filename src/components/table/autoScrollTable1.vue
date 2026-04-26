<template>
  <div class="autoScrollTable">
    <el-table :data="tableData" style="width: 100%" class="top">
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="date" label="日期" />
      <el-table-column prop="money" label="金额" />
    </el-table>
    <vue-seamless-scroll
      class="seamless-warp"
      :data="tableData"
      :class-option="defaultOption"
      style="width: 100%"
    >
      <el-table
        :data="tableData"
        style="width: 100%; height: 100%"
        class="bottom"
      >
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="date" label="日期" />
        <el-table-column prop="money" label="金额" />
      </el-table>
      <!-- <div style="width:100%;height:100%;">
            <p style="padding:10px 0">111</p>
            <p style="padding:10px 0">222</p>
            <p style="padding:10px 0">333</p>
            <p style="padding:10px 0">444</p>
            <p style="padding:10px 0">555</p>
            <p style="padding:10px 0">666</p>
            <p style="padding:10px 0">777</p>
            <p style="padding:10px 0">888</p>
        </div> -->
    </vue-seamless-scroll>
  </div>
</template>

<script>
//   import { defineComponent, reactive, onMounted, toRefs } from 'vue'
import vueSeamlessScroll from "vue-seamless-scroll/src";
export default {
  components: { vueSeamlessScroll },
  data() {
    return {
      tableData: [
        {
          date: "2022-05-03",
          name: "名称名称11",
          money: 200333,
        },
        {
          date: "2022-05-02",
          name: "名称名称22",
          money: 190333,
        },
        {
          date: "2022-05-04",
          name: "名称名称33",
          money: 220333,
        },
        {
          date: "2022-05-01",
          name: "名称名称44",
          money: 310333,
        },
        {
          date: "2022-05-04",
          name: "名称名称55",
          money: 220333,
        },
        {
          date: "2022-05-01",
          name: "名称名称66",
          money: 310333,
        },
        {
          date: "2022-05-04",
          name: "名称名称77",
          money: 220333,
        },
        {
          date: "2022-05-01",
          name: "名称名称88",
          money: 310333,
        },
      ],
    };
  },
  computed: {
    defaultOption() {
      return {
        step: 0.9, // 数值越大速度滚动越快
        limitMoveNum: 8, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        singleWidth: 0,
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
      };
    },
  },
};
</script>

<style lang="less" scoped>
.autoScrollTable {
  width: 100%;
  height: 300px;
  background: red;
  .top {
    width: 100%;
    height: 50px;
    background: orange;
  }
  .seamless-warp {
    width: 100%;
    height: calc(100% - 50px);
    background: green;
  }
}
// ::v-deep .seamless-warp {
//   height: 229px;
//   overflow: hidden;
// }
::v-deep .top .el-table__body-wrapper {
  display: none;
}
::v-deep .bottom .el-table__header-wrapper {
  display: none;
  width: 100%;
}
</style>
