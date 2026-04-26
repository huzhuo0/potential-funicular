<template>
  <div class="motianlun" ref="motianlun">
    <div class="item">
      <img src="../../assets/img/lf.jpg" alt="" />
    </div>
    <div class="item">
      <img src="../../assets/img/suolong.jpg" alt="" />
    </div>
    <div class="item">
      <img src="../../assets/img/shanzhi.jpg" alt="" />
    </div>
    <div class="item">
      <img src="../../assets/img/qiaoba.jpg" alt="" />
    </div>
    <div class="item">
      <img src="../../assets/img/namei.jpg" alt="" />
    </div>
  </div>
</template>
<script>
export default {
  name: "motianlun",
  components: {
    // HelloWorld
  },
  // mixins: [mixinTest],
  data() {
    return {
      width: "100%",
      height: window.innerHeight + "px",
    };
  },
  mounted() {
    const items = this.$refs.motianlun;
    const childList = items.children;
    const r = items.clientWidth / 2;
    const count = childList.length;
    console.log(r, "667");
    console.log(count, "668");
    const angle = 360 / count;
    for (let i = 0; i < count; i++) {
      let t = i * angle;
      t = (Math.PI / 180) * t;
      const x = Math.sin(t) * r;
      const y = Math.cos(t) * r;
      childList[i].style.transform = `translate(${x - 50}px,${y - 50}px)`;
    }
  },
};
</script>
<style lang="less" scoped>
@import "../../assets/style/mixin.less"; /* 要引入混入的东西 */
.motianlun {
  width: 300px;
  height: 300px;
  background: red;
  // margin-top:80px;
  // margin-left:180px;
  border-radius: 150px;
  position: relative;
  animation: motianlunRotate linear infinite 20s;
  .item {
    width: 100px;
    height: 100px;
    border-radius: 50px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 100%;
      height: 100%;
      border-radius: 25px;
      animation: motianlunRotate linear infinite 20s reverse;
    }
  }
}
@keyframes motianlunRotate {
  to {
    transform: rotate(360deg);
  }
}
</style>
