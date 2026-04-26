<template>
  <div class="base-a1-progress">
    <div class="day-list">
      <template v-if="xxTop5List.length">
        <div
          v-for="(item, i) in xxTop5List"
          :key="'xxTop5List' + i"
          class="day-top5-item"
        >
          <div :title="item.name" class="top5-label">{{ item.name }}</div>
          <a-tooltip placement="bottom">
            <a-progress
              :percent="item.percent"
              :strokeWidth="6"
              :format="
                () => {
                  return `${item.value}天`;
                }
              "
              class="top5-progress"
              :class="`top5-progress${i}`"
            />
          </a-tooltip>
        </div>
      </template>
      <a-empty
        v-else
        :image="simpleImage"
        :description="
          (sksqTypeIndex === 0 ? '本年' : '本月') + '暂无水库超汛限水位'
        "
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const xxTop5List = ref([]);
onMounted(() => {
  getData();
});

function getData() {
  xxTop5List.value = [
    {
      name: "红豆水库",
      percent: 100,
      value: 106,
    },
    {
      name: "石船水库",
      percent: 100,
      value: 106,
    },
    {
      name: "燕马水库",
      percent: 100,
      value: 106,
    },
    {
      name: "腊坝水库",
      percent: 100,
      value: 106,
    },
    {
      name: "金狮水库",
      percent: 82,
      value: 82,
    },
  ];
}
</script>

<style lang="less" scoped>
.base-a1-progress {
  width: 100%;
  background: linear-gradient(
    90deg,
    rgba(21, 33, 51, 0.76) 0%,
    rgba(25, 51, 105, 0.6) 100%
  );
  height: 100%;
  .day-list {
    // padding: 0 10px;
    padding-top: 15px;
    // height: calc(100vh - 820px);
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;

    :deep(.ant-empty) {
      margin: 0;
      padding: 20px 0;
      border: 1px solid rgba(77, 196, 255, 0.5);
    }

    .day-top5-item {
      padding: 0 10px;
      display: flex;
      align-items: center;
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 14px;
      color: #ffffff;
      line-height: 24px;
      text-align: left;

      .top5-label {
        width: 90px;
        white-space: nowrap;
        color: #ddf8ff;
        overflow: hidden;
        text-overflow: ellipsis;
        position: relative;
        bottom: 3px;
      }

      .top5-progress {
        flex: 1;
      }

      :deep(.ant-progress-show-info .ant-progress-outer) {
        margin-right: -98px;
        padding-right: 98px;

        .ant-progress-inner {
          background-color: rgba(20, 59, 94, 0.48);
          position: relative;
          overflow: visible;

          .ant-progress-bg::after {
            content: "";
            position: absolute;
            top: -2px;
            right: -8px;
            width: 16px;
            height: 16px;
          }
        }
      }

      :deep(.ant-progress-text) {
        color: #ddf8ff;
        line-height: 24px;
        width: 80px;
        text-align: right;
      }

      :deep(.top5_procress_2 .ant-progress-outer .ant-progress-inner) {
        .ant-progress-bg {
          background: linear-gradient(
            270deg,
            #14c2cd 2%,
            rgba(11, 128, 255, 0.2) 100%
          ) !important;
          border: 1px solid #5fd4fe !important;
          border-radius: 0 !important;
        }
      }

      :deep(.top5-progress0 .ant-progress-outer .ant-progress-inner) {
        .ant-progress-bg {
          background: linear-gradient(
            90deg,
            rgba(196, 181, 68, 0) 0%,
            #c4a244 44%,
            #ff7c2e 100%
          ) !important;
        }

        .ant-progress-bg::after {
          background: url("./images/cxts-icon1.png") no-repeat center;
          background-size: 22px 22px;
          display: inline-block;
          margin-bottom: 2px;
        }
      }

      :deep(.top5-progress1 .ant-progress-outer .ant-progress-inner) {
        .ant-progress-bg {
          background: linear-gradient(
            90deg,
            rgba(132, 132, 132, 0) 0%,
            #abbfd9 44%,
            #95b9f5 100%
          ) !important;
        }

        .ant-progress-bg::after {
          background: url("./images/cxts-icon2.png") no-repeat center;
          background-size: 22px 22px;
        }
      }

      :deep(.top5-progress2 .ant-progress-outer .ant-progress-inner) {
        .ant-progress-bg {
          background: linear-gradient(
            90deg,
            rgba(165, 127, 101, 0) 0%,
            #a57f65 44%,
            #a57f65 100%
          ) !important;
        }

        .ant-progress-bg::after {
          background: url("./images/cxts-icon3.png") no-repeat center;
          background-size: 22px 22px;
        }
      }

      :deep(.top5-progress3 .ant-progress-outer .ant-progress-inner) {
        .ant-progress-bg {
          background: linear-gradient(
            90deg,
            rgba(48, 188, 255, 0) 0%,
            #2baaff 44%,
            #307cff 100%
          ) !important;
        }

        .ant-progress-bg::after {
          background: url("./images/cxts-icon4.png") no-repeat center;
          background-size: 22px 22px;
        }
      }

      :deep(.top5-progress4 .ant-progress-outer .ant-progress-inner) {
        .ant-progress-bg {
          background: linear-gradient(
            90deg,
            rgba(48, 188, 255, 0) 0%,
            #2baaff 44%,
            #307cff 100%
          ) !important;
        }

        .ant-progress-bg::after {
          background: url("./images/cxts-icon5.png") no-repeat center;
          background-size: 22px 22px;
        }
      }
    }
  }
}
</style>
