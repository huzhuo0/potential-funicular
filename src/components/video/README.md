# VideoPlayer 组件使用说明

## 功能特性

- ✅ 支持 MP4 格式视频播放
- ✅ 支持 M3U8 (HLS) 格式视频播放
- ✅ 响应式设计，自适应容器大小
- ✅ 自定义播放控制
- ✅ 事件监听和回调
- ✅ 音量控制
- ✅ 播放速率控制
- ✅ 自动检测视频格式
- ✅ 兼容Vite构建工具

## 依赖包

确保项目中已安装以下依赖：

```json
{
  "dependencies": {
    "video.js": "^8.23.3",
    "hls.js": "^1.5.0"
  }
}
```

## 技术实现

本组件使用以下技术栈：

- **Video.js**: 提供视频播放器核心功能
- **HLS.js**: 处理M3U8格式的HLS流媒体播放
- **Vue 3 Composition API**: 现代化的Vue组件开发

### HLS支持说明

- 使用 `hls.js` 库处理M3U8格式视频
- 自动检测浏览器HLS支持能力
- 支持Safari原生HLS播放
- 兼容Vite等现代构建工具

## 基本用法

```vue
<template>
  <div class="video-container">
    <VideoPlayer
      src="https://example.com/video.m3u8"
      :autoplay="false"
      :loop="true"
      :volume="0.6"
      @onPlay="handlePlay"
      @onPause="handlePause"
      @onEnded="handleEnded" />
  </div>
</template>

<script setup>
import VideoPlayer from './VideoPlayer.vue'

const handlePlay = () => {
  console.warn('视频开始播放')
}

const handlePause = () => {
  console.warn('视频暂停')
}

const handleEnded = () => {
  console.warn('视频播放结束')
}
</script>
```

## Props 属性

| 属性名      | 类型    | 默认值               | 说明             |
| ----------- | ------- | -------------------- | ---------------- |
| src         | String  | '/video/video-1.mp4' | 视频源地址       |
| closeSwitch | Boolean | true                 | 是否显示关闭按钮 |
| autoplay    | Boolean | false                | 是否自动播放     |
| loop        | Boolean | false                | 是否循环播放     |
| volume      | Number  | 0.6                  | 初始音量 (0-1)   |

## Events 事件

| 事件名  | 说明               | 回调参数 |
| ------- | ------------------ | -------- |
| onPlay  | 视频开始播放时触发 | -        |
| onPause | 视频暂停时触发     | -        |
| onEnded | 视频播放结束时触发 | -        |
| closed  | 关闭播放器时触发   | -        |

## Methods 方法

通过 ref 可以调用以下方法：

| 方法名            | 说明       | 参数                 |
| ----------------- | ---------- | -------------------- |
| play()            | 播放视频   | -                    |
| pause()           | 暂停视频   | -                    |
| setVolume(volume) | 设置音量   | volume: Number (0-1) |
| close()           | 关闭播放器 | -                    |

## 使用示例

```vue
<template>
  <div>
    <VideoPlayer
      ref="playerRef"
      src="https://example.com/stream.m3u8"
      :autoplay="false" />

    <div class="controls">
      <button @click="play">播放</button>
      <button @click="pause">暂停</button>
      <button @click="setVolume(0.8)">设置音量</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VideoPlayer from './VideoPlayer.vue'

const playerRef = ref(null)

const play = () => {
  playerRef.value?.play()
}

const pause = () => {
  playerRef.value?.pause()
}

const setVolume = volume => {
  playerRef.value?.setVolume(volume)
}
</script>
```

## 支持的视频格式

### MP4 格式

- 文件扩展名：`.mp4`
- MIME 类型：`video/mp4`

### M3U8 格式 (HLS)

- 文件扩展名：`.m3u8`
- MIME 类型：`application/x-mpegURL`
- 支持直播流和点播
- 使用HLS.js库处理

## 注意事项

1. **CORS 问题**：如果播放跨域的视频文件，需要确保服务器设置了正确的 CORS 头
2. **HTTPS 要求**：某些浏览器在 HTTPS 环境下要求视频源也必须是 HTTPS
3. **浏览器兼容性**：M3U8 格式需要浏览器支持 HLS，现代浏览器通常都支持
4. **网络要求**：M3U8 格式需要稳定的网络连接，支持自适应码率
5. **构建工具兼容性**：已解决与Vite等现代构建工具的兼容性问题

## 样式自定义

组件提供了基础的样式，您可以通过 CSS 变量或深度选择器进行自定义：

```css
/* 自定义播放器样式 */
:deep(.video-js) {
  .vjs-big-play-button {
    background-color: rgba(0, 0, 0, 0.6);
    border: 2px solid #fff;
  }

  .vjs-control-bar {
    background-color: rgba(0, 0, 0, 0.7);
  }
}
```

## 故障排除

### 常见问题

1. **M3U8视频无法播放**

   - 检查视频源URL是否正确
   - 确认服务器支持CORS
   - 检查浏览器控制台是否有错误信息

2. **构建时出现webpack相关错误**

   - 已通过使用hls.js替代videojs-contrib-hls解决
   - 确保使用最新版本的依赖包

3. **视频播放卡顿**
   - 检查网络连接稳定性
   - 确认视频源服务器性能
   - 考虑调整HLS.js配置参数
