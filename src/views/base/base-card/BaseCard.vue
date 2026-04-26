<template>
  <div class="home usecard" :style="{ width: width, height: height }">
    <div class="card_common left_card">
      <OuterCard style="width: 100%; height: 32%">
        <template #body>
          <InnerCard :titleName="'待办任务'">
            <template #body>
              <!-- <div class="dbrw_title">您还有未完成的专题汇报任务</div>
                            <div></div> -->
            </template>
          </InnerCard>
        </template>
      </OuterCard>
      <OuterCard style="width: 100%; height: 32%">
        <template #body>
          <InnerCard :titleName="'值班人员'"></InnerCard> </template
      ></OuterCard>
      <OuterCard style="width: 100%; height: 32%">
        <template #body>
          <InnerCard :titleName="'受影响任务'"></InnerCard>
        </template>
      </OuterCard>
    </div>
    <div class="card_common middle_card">
      <OuterCard style="width: 100%; height: 32%">
        <template #body>
          <InnerCard :titleName="'快捷入口'"></InnerCard>
        </template>
      </OuterCard>
      <OuterCard style="width: 100%; height: 32%">
        <template #body>
          <InnerCard :titleName="'重要设备'"></InnerCard> </template
      ></OuterCard>
      <OuterCard style="width: 100%; height: 32%">
        <template #body>
          <InnerCard :titleName="'重要用户'"></InnerCard>
        </template>
      </OuterCard>
    </div>
    <div class="card_common right_card">
      <OuterCard style="width: 100%; height: 32%">
        <template #body>
          <InnerCard :titleName="'受影响任务'"></InnerCard>
        </template>
      </OuterCard>
      <OuterCard style="width: 100%; height: 32%">
        <template #body>
          <InnerCard :titleName="'值班人员'"></InnerCard> </template
      ></OuterCard>
      <OuterCard style="width: 100%; height: 32%">
        <template #body>
          <InnerCard :titleName="'代办任务'" style="width: 100%; height: 100%">
            <template #body>
              <div class="dbrw_title">您还有未完成的专题汇报任务</div>
              <div class="scroll_style" style="">
                <!-- <ul>
                                    <li v-for="(item,index) in listData" :key="index">{{item.content}}</li>
                                </ul> -->
                <vue-seamless-scroll
                  :data="listData"
                  :class-option="defaultOption"
                  class="scroll_content"
                >
                  <ul>
                    <li v-for="(item, index) in listData" :key="index">
                      {{ item.content }}
                    </li>
                  </ul>
                </vue-seamless-scroll>
              </div>
            </template>
          </InnerCard>
        </template>
      </OuterCard>
    </div>
  </div>
</template>

<script>
// import vueSeamlessScroll from 'vue3-seamless-scroll'
import vueSeamlessScroll from "vue-seamless-scroll/src"; /* import scroll from "vue-seamless-scroll/src";vue3这样引进去就好了 */
// import pieChart from '../../components/echart/pieChart.vue'
export default {
  name: "BaseCard",
  components: {
    vueSeamlessScroll,
    // pieChart
  },
  computed: {
    defaultOption() {
      return {
        step: 0.9, // 数值越大速度滚动越快
        // stop: 0.001,
        limitMoveNum: 5, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
        // limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
        // hoverStop: true, // 是否开启鼠标悬停stop
        // direction: 1, // 0向下 1向上 2向左 3向右
        // openWatch: true, // 开启数据实时监控刷新dom
        // singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        // singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        // waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
      };
    },
  },
  data() {
    return {
      width: "100%",
      height: window.innerHeight + "px",
      listData: [
        { content: "待办任务11111111111111111111111" },
        { content: "待办任务22222222222222222222222" },
        { content: "待办任务33333333333333333333333" },
        { content: "待办任务44444444444444444444444" },
        { content: "待办任务55555555555555555555555" },
        { content: "待办任务66666666666666666666666" },
        { content: "待办任务77777777777777777777777" },
        { content: "待办任务88888888888888888888888" },
        { content: "待办任务99999999999999999999999" },
      ],
    };
  },
  methods: {},
  //   computed: {
  //   }
};
</script>
<style lang="less" scoped>
.usecard {
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  background: linear-gradient(180deg, #fefaff 0%, #e0edf7 100%);
  .card_common {
    width: 32%;
    height: 100%;
    box-sizing: border-box;
    // background:#fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .right_card {
    .dbrw_title {
      box-sizing: border-box;
      width: 100%;
      height: 23px;
      background-image: linear-gradient(
        90deg,
        #2db194 0%,
        rgba(80, 250, 252, 0) 100%
      );
      text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.16);
      color: #ffffff;
      font-size: 14px;
      // box-sizing: border-box;
      padding: 0 10px;
    }
    .scroll_style {
      height: calc(100% - 69px);
      overflow: hidden;
      // background:red;
      ul {
        overflow: hidden;
      }
      li {
        padding: 5px 0 5px 15px;
      }
      .scroll_content {
        // background:red;
        // overflow:hidden;
      }
    }
  }
}
</style>
