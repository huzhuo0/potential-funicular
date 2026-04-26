<template>
  <div class="ferris-wheel" ref="ferrisWheelDom">
    <div class="item">
      <img src="./images/lf.png" alt="" />
    </div>
    <div class="item">
      <img src="./images/suolong.png" alt="" />
    </div>
    <div class="item">
      <img src="./images/shanzhi.png" alt="" />
    </div>
    <div class="item">
      <img src="./images/qiaoba.png" alt="" />
    </div>
    <div class="item">
      <img src="./images/namei.png" alt="" />
    </div>
  </div>
</template>
<script>
export default {
  name: "FerrisWheel",
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
    const items = this.$refs.ferrisWheelDom;
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
      console.log(x, y, "669");
      childList[i].style.transform = `translate(${x - 20}px,${y - 20}px)`;
      // 每个 .item 元素的宽度和高度都是 40px：
      // 在计算圆周上的位置时，x 和 y 是基于圆心计算的坐标。如果不减去 20px，图片的左上角会位于圆周上，而不是图片的中心。
      // 简单来说，-20 是一个偏移量，用于确保图片的中心点位于圆周上，而不是图片的左上角。这是实现摩天轮效果时常用的定位技巧。
    }
  },
};
</script>
<style lang="less" scoped>
.ferris-wheel {
  width: 160px;
  height: 160px;
  //   background: red;
  // margin-top:80px;
  // margin-left:180px;
  border-radius: 150px;
  position: relative;
  animation: FerrisWheelRotate linear infinite 20s;
  .item {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 100%;
      height: 100%;
      border-radius: 25px;
      animation: FerrisWheelRotate linear infinite 20s reverse;
    }
  }
}
@keyframes FerrisWheelRotate {
  to {
    transform: rotate(360deg);
  }
}
</style>
