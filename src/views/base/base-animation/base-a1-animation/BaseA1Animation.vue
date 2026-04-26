<template>
  <div class="base-a1-animation">
    <div class="sparkle-animation"></div>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
@keyframes shark {
  0% {
    background: url("./shark-active.png");
    background-size: cover;
    background-repeat: no-repeat;
  }
  100% {
    background: url("./shark-default.png");
    background-size: cover;
    background-repeat: no-repeat;
  }
}
.base-a1-animation {
  width: 100%;
  background: linear-gradient(
    90deg,
    rgba(21, 33, 51, 0.76) 0%,
    rgba(25, 51, 105, 0.6) 100%
  );
  .sparkle-animation {
    width: 100px;
    height: 100px;
    // animation:shanshuo 3s ease; 动画简写
    // animation-iteration-count: infinite;
    animation-name: shark; //动画名称
    animation-duration: 0.2s; //动画持续时间
    animation-timing-function: linear; //动画的速度曲线
    animation-fill-mode: forwards; //动画不播放时的样式
    // animation-delay: 2s;//动画延迟播放时间
    animation-iteration-count: infinite; //动画播放次数  n 表示n次  infinite 表示无限次
    animation-direction: alternate; //动画在下一周期是否逆向播放  normal按正常播放  reverse 动画反向播放  alternate 奇数正向播放，偶数反向播放  alternate奇数反向播放，偶数正向播放
    animation-play-state: running; //规定动画是否正在运行或暂停  running  paused
  }
}
</style>
