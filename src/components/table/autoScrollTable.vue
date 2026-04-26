<template>
  <div class="min">
    <div style="display: inline-block; width: 100%">
      <el-table :data="list" style="width: 100%" class="top">
        <el-table-column prop="fileName" label="油库名称" align="center" />
        <el-table-column prop="uploadDate" label="油库编号" align="center" />
        <el-table-column prop="fileSize" label="总库存(m3)" align="center" />
        <el-table-column prop="uploadMan" label="安全高度(mm)" align="center" />
        <el-table-column prop="visitNum" label="安全容量(m3)" align="center" />
        <el-table-column prop="visitNum" label="装油高度(mm)" align="center" />
        <el-table-column prop="visitNum" label="油罐差压(Pa)" align="center" />
        <el-table-column prop="visitNum" label="查表体积(m3)" align="center" />
      </el-table>
      <vue-seamless-scroll
        :data="list"
        class="seamless-warp"
        style="width: 100%"
        :class-option="classOption"
      >
        <el-table :data="list" style="width: 100%" class="bottom">
          <el-table-column prop="fileName" label="油库名称" />
          <el-table-column prop="uploadDate" label="油库编号" />
          <el-table-column prop="fileSize" label="总库存(m3)" />
          <el-table-column prop="uploadMan" label="安全高度(mm)" />
          <el-table-column prop="visitNum" label="安全容量(m3)" />
          <el-table-column prop="visitNum" label="装油高度(mm)" />
          <el-table-column prop="visitNum" label="油罐差压(Pa)" />
          <el-table-column prop="visitNum" label="查表体积(m3)" />
        </el-table>
      </vue-seamless-scroll>
    </div>
  </div>
</template>

<script>
import vueSeamlessScroll from "vue-seamless-scroll/src";
export default {
  components: { vueSeamlessScroll },
  data() {
    return {
      // 模拟数据
      list: [
        {
          fileName: "每天开心笑一笑",
          uploadDate: "2021-11-18",
          fileSize: "8",
          uploadMan: "165",
          visitNum: "112",
        },
        {
          fileName: "每天开心笑一笑",
          uploadDate: "2021-11-18",
          fileSize: "8",
          uploadMan: "165",
          visitNum: "112",
        },
        {
          fileName: "每天开心笑一笑",
          uploadDate: "2021-11-18",
          fileSize: "8",
          uploadMan: "165",
          visitNum: "112",
        },
        {
          fileName: "每天开心笑一笑",
          uploadDate: "2021-11-18",
          fileSize: "8",
          uploadMan: "165",
          visitNum: "112",
        },
        {
          fileName: "每天开心笑一笑",
          uploadDate: "2021-11-18",
          fileSize: "8",
          uploadMan: "165",
          visitNum: "112",
        },
        {
          fileName: "每天开心笑一笑",
          uploadDate: "2021-11-18",
          fileSize: "8",
          uploadMan: "165",
          visitNum: "112",
        },
      ],
    };
  },
  computed: {
    // 滚动条的配置项
    classOption() {
      return {
        step: 0.3, // 数值越大速度滚动越快
        limitMoveNum: 1, // 开始无缝滚动的数据量 this.list
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
      };
    },
  },
};
</script>
<style lang="less" scoped>
>>> .seamless-warp {
  height: 229px;
  overflow: hidden;
}
>>> .min {
  display: flex;
  width: 100%;
}
>>> .top .el-table__body-wrapper {
  display: none;
}
>>> .bottom .el-table__header-wrapper {
  display: none;
  width: 100%;
}
</style>
