<template>
  <div class="video-player-wrapper">
    <div class="video-boxer">
      <video
        ref="videoRef"
        class="video-js vjs-default-skin vjs-big-play-centered"
        preload="auto"
        data-setup="{}"
      >
        <source :src="videoSrc" :type="sourceType" />
        <p class="vjs-no-js">
          要查看此视频，请启用JavaScript并考虑升级到支持HTML5视频的Web浏览器。
        </p>
      </video>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, computed } from "vue";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import Hls from "hls.js";

// 定义props
const props = defineProps({
  src: {
    type: String,
    default: "",
  },
  closeSwitch: {
    type: Boolean,
    default: true,
  },
  autoplay: {
    type: Boolean,
    default: false,
  },
  loop: {
    type: Boolean,
    default: false,
  },
  volume: {
    type: Number,
    default: 0.6,
  },
});

// 定义emits
const emits = defineEmits(["closed", "onPlay", "onPause", "onEnded"]);

// 响应式数据
const videoRef = ref(null);
const player = ref(null);
const hls = ref(null);

// 计算属性
const videoSrc = computed(() => props.src || "/fire_video.mp4");
const sourceType = computed(() => {
  if (videoSrc.value.includes(".m3u8")) {
    return "application/x-mpegURL";
  } else if (videoSrc.value.includes(".mp4")) {
    return "video/mp4";
  }
  return "video/mp4"; // 默认类型
});

// 生命周期钩子
onMounted(() => {
  initPlayer();
});

onBeforeUnmount(() => {
  destroyPlayer();
});

// 监听src变化
watch(
  () => props.src,
  (newSrc) => {
    if (player.value && newSrc) {
      loadVideo(newSrc);
    }
  }
);

// 方法定义
/**
 * @description: 初始化视频播放器
 */
const initPlayer = () => {
  if (!videoRef.value) return;

  // 创建video.js播放器实例
  player.value = videojs(
    videoRef.value,
    {
      controls: true,
      autoplay: props.autoplay,
      loop: props.loop,
      volume: props.volume,
      fluid: true,
      responsive: true,
      playbackRates: [0.5, 1, 1.25, 1.5, 2],
    },
    () => {
      // 绑定事件监听器
      player.value.on("play", () => {
        emits("onPlay");
      });

      player.value.on("pause", () => {
        emits("onPause");
      });

      player.value.on("ended", () => {
        emits("onEnded");
      });

      player.value.on("error", (error) => {
        // console.error("视频播放错误:", error);
      });

      // 加载初始视频
      loadVideo(videoSrc.value);
    }
  );
};

/**
 * @description: 加载视频
 */
const loadVideo = (src) => {
  if (!player.value) return;

  // 销毁之前的HLS实例
  if (hls.value) {
    hls.value.destroy();
    hls.value = null;
  }

  if (src.includes(".m3u8")) {
    // 使用HLS.js加载m3u8文件
    if (Hls.isSupported()) {
      hls.value = new Hls({
        debug: false,
        enableWorker: true,
        lowLatencyMode: true,
      });

      hls.value.loadSource(src);
      hls.value.attachMedia(videoRef.value);

      hls.value.on(Hls.Events.MANIFEST_PARSED, () => {
        if (props.autoplay) {
          player.value.play();
        }
      });

      hls.value.on(Hls.Events.ERROR, (event, data) => {
        // console.error("HLS错误:", data);
      });
    } else if (videoRef.value.canPlayType("application/vnd.apple.mpegurl")) {
      // 原生HLS支持（Safari）
      player.value.src({
        src: src,
        type: "application/x-mpegURL",
      });
    } else {
      // console.error("浏览器不支持HLS播放");
    }
  } else {
    // 直接加载MP4文件
    player.value.src({
      src: src,
      type: sourceType.value,
    });
  }
};

/**
 * @description: 销毁播放器
 */
const destroyPlayer = () => {
  if (hls.value) {
    hls.value.destroy();
    hls.value = null;
  }

  if (player.value) {
    player.value.dispose();
    player.value = null;
  }
};

/**
 * @description: 关闭视频播放器
 */
const close = () => {
  emits("closed");
};

/**
 * @description: 播放视频
 */
const play = () => {
  if (player.value) {
    player.value.play();
  }
};

/**
 * @description: 暂停视频
 */
const pause = () => {
  if (player.value) {
    player.value.pause();
  }
};

/**
 * @description: 设置音量
 */
const setVolume = (volume) => {
  if (player.value) {
    player.value.volume(volume);
  }
};

// 暴露方法给父组件
defineExpose({
  play,
  pause,
  setVolume,
  close,
});
</script>

<style lang="less" scoped>
.video-player-wrapper {
  width: 100%;
  height: 100%;
  position: relative;

  // &:hover {
  //   .video-top {
  //     display: flex;
  //     justify-content: flex-end;
  //   }
  // }

  // .video-top {
  //   position: absolute;
  //   right: 0px;
  //   width: 100%;
  //   height: 30px;
  //   z-index: 19999;
  //   background-color: transparent;
  //   display: none;

  //   .anticon {
  //     color: #fff;

  //     &:hover {
  //       color: #1890ff;
  //       cursor: pointer;
  //     }
  //   }
  // }

  // .video-boxer {
  //   width: 100%;
  //   height: 100%;
  //   position: relative;
  // }

  // .video-js {
  //   width: 100%;
  //   height: 100%;
  // }

  // .video-cover {
  //   position: absolute;
  //   left: 0;
  //   top: 0;
  //   right: 0;
  //   bottom: 45px;
  //   cursor: pointer;
  // }
}

// // 隐藏画中画按钮
// :deep(.video-js .vjs-picture-in-picture-control) {
//   display: none;
// }

// // 自定义video.js样式
// :deep(.video-js) {
//   .vjs-big-play-button {
//     background-color: rgba(0, 0, 0, 0.6);
//     border: 2px solid #fff;
//     border-radius: 50%;
//     width: 60px;
//     height: 60px;
//     line-height: 56px;
//     margin-left: -30px;
//     margin-top: -30px;

//     &:hover {
//       background-color: rgba(0, 0, 0, 0.8);
//     }
//   }

//   .vjs-control-bar {
//     background-color: rgba(0, 0, 0, 0.7);
//   }

//   .vjs-progress-control {
//     .vjs-progress-holder {
//       height: 4px;
//     }

//     .vjs-play-progress {
//       background-color: #1890ff;
//     }
//   }
// }
</style>
