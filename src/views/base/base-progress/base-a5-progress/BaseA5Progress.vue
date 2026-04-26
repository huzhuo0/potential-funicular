<template>
  <div class="base-a5-progress">
    <div class="euc-sec-cont">
      <progress-comp
        v-for="item in progressData"
        :key="item.name"
        :data="item"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ProgressComp from "./ProgressComp";
const progressData = ref([
  {
    name: "银川市",
    plan: "10",
    actual: "40",
    per: 25,
  },
  {
    name: "石嘴山市",
    plan: "20",
    actual: "40",
    per: 50,
  },
  {
    name: "吴忠市",
    plan: "66",
    actual: "100",
    per: 66,
  },
  {
    name: "固原市",
    plan: "88",
    actual: "100",
    per: 88,
  },
  {
    name: "中卫市",
    plan: "100",
    actual: "100",
    per: 100,
  },
]);
</script>

<style lang="less" scoped>
.base-a5-progress {
  width: 100%;
  //   padding: 20px;
  background: linear-gradient(
    90deg,
    rgba(21, 33, 51, 0.76) 0%,
    rgba(25, 51, 105, 0.6) 100%
  );

  .euc-sec-cont {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;

    .item {
      height: 48px;
      width: 48%;
      display: flex;
      margin-bottom: 20px;

      &:nth-child(2n + 1) {
        margin-right: 4%;
      }

      .item-l {
        width: 48px;
        margin-right: 10px;

        img {
          width: 48px;
          height: 48px;
        }
      }

      .item-r {
        flex: 1;

        .row-one {
          display: flex;
          align-items: center;

          .num {
            font-size: 18px;
            font-family: DINAlternate-Bold, DINAlternate;
            color: #ffd718;
          }

          .unit {
            font-size: 12px;
            color: #ffffff;
          }
        }

        .row-two {
          font-size: 14px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #5fd4fe;
        }
      }
    }
  }
}
</style>
