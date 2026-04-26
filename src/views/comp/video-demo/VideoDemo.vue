<template>
  <div class="videojs-demo">
    <div class="demo-container">
      <div class="video-1">
        <div class="v-deo-1-content">
          <LivePlayer
            :videoUrl="'/fire_video.mp4'"
            fluent
            autoplay
            live
            stretch
          ></LivePlayer>
          <h1>mp4视频</h1>
        </div>
      </div>
      <div class="bottom-video">
        <div class="video-3">
          <LivePlayer
            :videoUrl="'/rtp/34020000001320000055_34020000001320000005/hls.m3u8?originTypeStr=rtp_push'"
            fluent
            autoplay
            live
            stretch
          ></LivePlayer>
          <h1>m3u8视频</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import LivePlayer from "@liveqing/liveplayer-v3";
</script>

<style scoped lang="less">
.videojs-demo {
  width: 500px;
  height: 100%;
  .demo-container {
    width: 100%;
    display: flex;
  }
  .video-1 {
    margin-right: 30px;
  }
  .v-deo-1-content {
    width: 300px;
  }
  .video-2 {
    width: 500px;
  }
  .video-3 {
    width: 500px;
  }
}
</style>
