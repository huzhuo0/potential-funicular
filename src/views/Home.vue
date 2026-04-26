<!--
 * @FilePath: \hz-project\src\views\Home.vue
 * @Description: 
-->
<template>
  <div class="home">
    <HelloWorld />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
// import mixinTest from '@/utils/mixin.js' // 局部混入

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  // mixins: [mixinTest],
  data() {
    return {};
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
// .navStyle{
//   margin-right:20px;
// }
</style>
