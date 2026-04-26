<template>
  <div class="base-font">
    <p class="font1">旁门正道标题体 12313213121 font1</p>
    <p class="font2">优设标题黑 12313213121 font2</p>
    <p class="font3">Digital-7Mono abcdefghij 12313213121 font3</p>
    <p class="font4">DigitsDB-Normal abcdefghij 12313213121 font4</p>
    <p class="font5">DIN-BoldItalicAlt abcdefghij 12313213121 font5</p>
    <p class="font6">DIN-Light abcdefghij 12313213121 font6</p>
    <p class="font7">DIN-Medium abcdefghij 12313213121 font7</p>
    <p class="font8">DIN-Regular abcdefghij 12313213121 font8</p>
    <p class="font9">DINEngschrift-Alternate abcdefghij 12313213121 font9</p>
    <p class="font10">DS-Digital-Bold-Italic abcdefghij 12313213121 font10</p>
    <p class="font11">FZZZHONGJ abcdefghij 12313213121 font11</p>
    <p class="font12">YouSheBiaoTiHei abcdefghij 12313213121 font11</p>
    <p class="font13">D-DIN abcdefghij 12313213121 font11</p>
    <p class="font14">D-DIN-Bold abcdefghij 12313213121 font11</p>
  </div>
</template>

<script>
export default {
  name: "BaseFont",
  components: {
    // HelloWorld
  },
  // mixins: [mixinTest],
  data() {
    return {
      testList: [],
      width: "100%",
      height: window.innerHeight + "px",
    };
  },
  mounted() {
    window.onresize = () => {
      /* 实时监听浏览器窗口的变化 */
      this.height = window.innerHeight + "px";
    };
    // console.log(this.width, this.height, '999')
  },
};
</script>
<style lang="less" scoped>
.base-font {
  width: 100%;
  height: 100%;
  //   background: yellow;
}
// @import "../assets/style/mixin.less"; /* 要引入混入的东西 */
// .home{
//   @include wordcolor;  /* 使用@include来使用混入中的东西 */
//   // color:orange;
//   @include backgroundCoverStyle('../assets/homebg.jpg')
// }
</style>
