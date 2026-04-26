<template>
  <div class="base-a3-animation">
    <div class="process-image-arrow"></div>

    <div class="process-image-sarrow"></div>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
@keyframes arrowProcess {
  0% {
    // left: 114px;
    left: 69px;
  }

  50% {
    left: 716px;
    top: 13px;
    transform: rotate(-90deg);
  }

  51% {
    left: 716px;
    top: 15px;
    transform: rotate(-45deg);
  }

  52% {
    left: 723px;
    top: 26px;
    transform: rotate(-45deg);
  }

  53% {
    left: 728px;
    top: 31px;
    transform: rotate(-45deg);
  }

  54% {
    left: 728px;
    top: 31px;
    transform: rotate(-20deg);
  }

  56% {
    left: 728px;
    top: 31px;
    transform: rotate(0deg);
  }

  70% {
    left: 728px;
    top: 181px;
    transform: rotate(0deg);
  }

  71% {
    left: 723px;
    top: 181px;
    transform: rotate(20deg);
  }

  73% {
    left: 711px;
    top: 190px;
    transform: rotate(90deg);
  }

  100% {
    left: 425px;
    top: 190px;
    transform: rotate(90deg);
  }
}
.base-a3-animation {
  width: 100%;
  background: linear-gradient(
    90deg,
    rgba(21, 33, 51, 0.76) 0%,
    rgba(25, 51, 105, 0.6) 100%
  );
  position: relative;
  .process-image-arrow {
    background-image: url("./images/risk-p-icon94.png");
    width: 12px;
    height: 6px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: absolute;
    // top: 25px;
    // left: 281px;
    top: 13px;
    left: 69px;
    animation: arrowProcess 20s linear infinite normal;
    transform: rotate(-90deg);
    z-index: 5 !important;

    // left: 668px;
    // top: 201px;
    // transform: rotate(90deg);
  }

  .process-image-sarrow {
    background-image: url("./images/risk-p-icon95.png");
    width: 12px;
    height: 6px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 13px;
    left: 69px;
    animation: arrowProcess 20s linear 0.1s infinite normal;
    transform: rotate(-90deg);
    z-index: 4 !important;
  }
}
</style>
