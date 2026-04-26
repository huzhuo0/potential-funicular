<template>
  <div class="outcard">
    <div class="top-left"></div>
    <div class="top-right"></div>
    <div class="bottom-left"></div>
    <div class="bottom-right"></div>
    <slot name="body"></slot>
  </div>
</template>
<script>
export default {
  name: "OuterCard",
  data() {
    return {};
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.outcard {
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  position: relative;
  padding: 10px;
  box-sizing: border-box;
  .top-left {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 5px;
    height: 4px;
    border-top: 1.5px solid #16af8e;
    border-left: 1.5px solid #16af8e;
  }
  .top-right {
    position: absolute;
    right: 0px;
    top: 0px;
    width: 5px;
    height: 4px;
    border-top: 1.5px solid #16af8e;
    border-right: 1.5px solid #16af8e;
  }
  .bottom-left {
    position: absolute;
    left: 0px;
    bottom: 0px;
    width: 5px;
    height: 4px;
    border-left: 1.5px solid #16af8e;
    border-bottom: 1.5px solid #16af8e;
  }
  .bottom-right {
    position: absolute;
    right: 0px;
    bottom: 0px;
    width: 5px;
    height: 4px;
    border-right: 1.5px solid #16af8e;
    border-bottom: 1.5px solid #16af8e;
  }
  .body {
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    padding: 10px;
  }
}
</style>
