<template>
  <div class="out-container">
    <div class="bg-container"></div>
    <div class="container">
      <p class="percent">{{ percent }}%</p>
      <div class="wave" :style="{ bottom: percent - 100 + '%' }"></div>
      <div class="wave1" :style="{ bottom: percent - 100 + '%' }"></div>
      <div class="wave2" :style="{ bottom: percent - 100 + '%' }"></div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  percent: {
    type: Number,
    default: 100,
  },
});
</script>
<style lang="less" scoped>
@bottom: -90px;
.out-container {
  width: 230px;
  height: 230px;
  display: flex;
  align-items: center;
  justify-content: center;

  .bg-container {
    width: 230px;
    height: 230px;
    background-image: url("./images/circle-bg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat; // 旋转
    animation: rotate-bg 6s linear infinite;
    position: absolute;
    top: 0;
  }
}
.container {
  position: relative;
  width: 157px;
  height: 157px;
  margin: 0 auto;
  overflow: hidden;
  background: rgba(62, 113, 156, 0.5);
  border-radius: 50%;
  .percent {
    font-weight: 700;
    font-family: D-DIN, D-DIN;
    font-size: 46px;
    z-index: 9;
    position: absolute;
    top: 50px;
    width: 100%;
    text-align: center;
  }
}

.wave,
.wave1,
.wave2 {
  position: absolute;
  bottom: @bottom;
  width: 157px;
  height: 157px;
  background-color: hsla(196, 100%, 53%, 0.95);
  border-radius: 40%;
  // animation: rotate 6s linear infinite;
  // mix-blend-mode: multiply;
}

.wave {
  background: linear-gradient(
    180deg,
    rgba(0, 155, 226, 0.65) 0%,
    rgba(30, 174, 174, 0.65) 100%
  );
  animation: rotate 6s linear infinite;
}

.wave1 {
  background: linear-gradient(
    180deg,
    rgba(0, 155, 226, 0.65) 0%,
    rgba(30, 174, 174, 0.65) 100%
  );
  transform: translate(-20%, 0) rotate(0deg);
  animation: rotate1 6s linear -4s infinite;
}

.wave2 {
  background: linear-gradient(
    180deg,
    rgba(0, 155, 226, 0.65) 0%,
    rgba(30, 174, 174, 0.65) 100%
  );

  transform: translate(20%, 0) rotate(0deg);
  animation: rotate2 6s linear -2s infinite;
}

@keyframes rotate {
  50% {
    border-radius: 38%;
    transform: rotate(180deg);
  }
  100% {
    border-radius: 45%;
    transform: rotate(360deg);
  }
}

@keyframes rotate-bg {
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes rotate1 {
  50% {
    border-radius: 38%;
    transform: translate(-30%, 8%) rotate(180deg);
  }
  100% {
    border-radius: 45%;
    transform: translate(-20%, 0%) rotate(360deg);
  }
}

@keyframes rotate2 {
  50% {
    transform: translate(30%, 8%) rotate(180deg);
  }
  100% {
    transform: translate(20%, 0%) rotate(360deg);
  }
}
</style>
