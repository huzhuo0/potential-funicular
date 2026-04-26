<template>
  <div class="innerCard">
    <div class="head">
      <div class="inner-card-title">{{ titleName }}</div>
      <div class="card-line"></div>
    </div>
    <slot
      name="body"
      class="innerbody"
      style="width: 100%; height: calc(100% - 36px)"
    ></slot>
  </div>
</template>
<script>
export default {
  name: "InnerCard",
  data() {
    return {};
  },
  props: {
    titleName: {
      type: String,
      default: "innerCard标题",
    },
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.innerCard {
  border: none;
  position: relative;
  .head {
    width: 100%;
    height: 36px;
    // font-family:'Courier New', Courier, monospace;
    font-size: 18px;
    line-height: 36px;
    color: #333333;
    font-weight: 600;
    margin-bottom: 10px;
    .inner-card-title {
      width: calc(100% - 40px);
      height: 35px;
      margin-left: 40px;
    }
    .card-line {
      width: 100%;
      height: 1px;
      background: url("../../assets/img/components/card/inner_card_line.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    &::before {
      content: "";
      width: 24px;
      height: 24px;
      position: absolute;
      background: url("../../assets/img/components/card/inner_card_icon.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      top: 6px;
      left: 10px;
    }
  }
  .innerbody {
    width: 100%;
    height: calc(100%-36px);
  }
}
</style>
