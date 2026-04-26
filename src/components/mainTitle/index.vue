<!--
 * @FilePath: \hz-project\src\components\mainTitle\index.vue
 * @Description: 
-->
<template>
  <div class="title-container">
    <video
      src="../../assets/video/fire_video.mp4"
      style="width: 100%; height: 80px; object-fit: fill"
      autoplay
      muted
      loop
    ></video>
    <div class="txt">
      <div>忍者の時代はもうすぐ終わる</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  components: {},
  data() {
    return {};
  },
  mounted() {
    var video = document.getElementsByTagName("video")[0];
    video.playbackRate *= 0.25;
  },
};
</script>
<style lang="less" scoped>
.title-container {
  width: 100%;
  color: #000;
  font-size: 70px;
  font-weight: bold;
  height: 80px;
  position: relative;
  .txt {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    mix-blend-mode: screen;
  }
}
</style>
