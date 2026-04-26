<template>
  <div class="base-a3-progress">
    <div class="progress-container">
      <div class="process-content">
        <div class="process-single">
          <div class="single-title">开工率</div>
          <div class="single-process">
            <div
              :style="{
                width: constructionPercent + '%',
              }"
              class="inner"
            >
              <div v-if="constructionPercent > 60" class="inner-text-large">
                {{ constructionPercent || 0 + "%" }}
              </div>
              <div v-else class="inner-text-small">
                {{ constructionPercent || 0 + "%" }}
              </div>
            </div>
          </div>
        </div>
        <div class="process-single">
          <div class="single-title">竣工率</div>
          <div class="single-process">
            <div
              :style="{
                width: completionPercent + '%',
              }"
              class="inner finish-inner"
            >
              <div v-if="completionPercent > 60" class="inner-text-large">
                {{ completionPercent || 0 }}
              </div>
              <div v-else class="inner-text-small">
                {{ completionPercent || 0 }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const completionPercent = ref(100);
const constructionPercent = ref(27);
</script>

<style lang="less" scoped>
.base-a3-progress {
  width: 100%;
  padding: 20px;
  background: linear-gradient(
    90deg,
    rgba(21, 33, 51, 0.76) 0%,
    rgba(25, 51, 105, 0.6) 100%
  );
  .progress-container {
    display: flex;
    align-items: center;
    .process-content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 50px;
      .process-single {
        display: flex;
        align-items: center;
        .single-title {
          width: 58px;
          text-align: left;
          font-family: PingFangSC, PingFang SC;
          font-weight: 500;
          font-size: 14px;
          color: #ffffff;
        }
        .single-process {
          width: 224px;
          height: 16px;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.2);
          .inner {
            height: 100%;
            border-radius: 4px;
            position: relative;
            background: linear-gradient(270deg, #0066ff 0%, #00ffff 100%);
            &::after {
              content: "";
              display: inline-block;
              width: 8px;
              height: 16px;
              background-image: url("./images/process-icon.png");
              background-repeat: no-repeat;
              background-size: 100% 100%;
              position: absolute;
              right: 0;
            }
            .inner-text-large {
              position: absolute;
              right: 20px;
              font-family: PingFangSC, PingFang SC;
              font-weight: 600;
              font-size: 14px;
              color: #ffffff;
              top: -2px;
              &::after {
                content: "%";
                display: inline-block;
                font-size: 12px;
              }
            }
            .inner-text-small {
              position: absolute;
              right: -40px;
              font-family: PingFangSC, PingFang SC;
              font-weight: 600;
              font-size: 14px;
              color: #ffffff;
              top: -2px;
              &::after {
                content: "%";
                display: inline-block;
                font-size: 12px;
              }
            }
          }
          .finish-inner {
            background: linear-gradient(
              270deg,
              #3adc48 0%,
              rgba(142, 220, 58, 0.62) 100%
            );
          }
        }
      }
    }
  }
}
</style>
