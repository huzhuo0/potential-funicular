# Vue3 + liveqing + webpack

## 1. 安装依赖

```bash
yarn add @liveqing/liveplayer-v3  # 安装liveqing-player  播放器插件
yarn add copy-webpack-plugin # 安装copy-webpack-plugin  复制依赖  注意版本问题 copy-webpack-plugin版本过高会报错
```

## 2. 引入 liveplayer-lib.min.js 将 node_modules/@liveqing/liveplayer-v3/dist/component/liveplayer-lib.min.js 复制到 public/js 目录下

# 然后在 html.js 中引入 liveplayer-lib.min.js

```bash
         vite引用
           <script src="js/liveplayer-lib.min.js"></script>
         如果正在使用 vue-cli: 也就是webpack引用
            <script src="<%= BASE_URL %>js/liveplayer-lib.min.js"></script>

```

## 3. vue-config.js 配置修改

```bash
   const CopyWebpackPlugin = require("copy-webpack-plugin"); // 引入copy-webpack-plugin
   然后在configureWebpack里配置：
      plugins: [
      new CopyWebpackPlugin([
        {
          from: "node_modules/@liveqing/liveplayer-v3/dist/component/crossdomain.xml",
        },
        {
          from: "node_modules/@liveqing/liveplayer-v3/dist/component/liveplayer.swf",
        },
        {
          from: "node_modules/@liveqing/liveplayer-v3/dist/component/liveplayer-lib.min.js",
          to: "js/",
        },
      ]),
    ],

```

## 4.使用

```js
import LivePlayer from "@liveqing/liveplayer-v3";
```

## 3. 使用组件

```html
<template>
  <div>
    <LivePlayer
      :videoUrl="'/rtp/34020000001320000055_34020000001320000005/hls.m3u8?originTypeStr=rtp_push'"
      fluent
      autoplay
      live
      stretch
    ></LivePlayer>
  </div>
</template>
```
