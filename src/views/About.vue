<!--
 * @Author: huzhuo hz1144291576
 * @Date: 2022-07-07 15:25:31
 * @LastEditors: huzhuo hz1144291576
 * @LastEditTime: 2023-03-04 15:12:00
 * @FilePath: \myproject\src\views\About.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="home" :style="{ width: width, height: height }">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <HelloWorld msg="忍者の時代はもうすぐ終わる" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
// import mixinTest from '@/utils/mixin.js' // 局部混入

export default {
  name: "   About",
  components: {
    HelloWorld,
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
<style lang="less">
// @import "../assets/style/mixin.less"; /* 要引入混入的东西 */
// .home{
//   @include wordcolor;  /* 使用@include来使用混入中的东西 */
//   // color:orange;
//   @include backgroundCoverStyle('../assets/homebg.jpg')
// }
</style>
