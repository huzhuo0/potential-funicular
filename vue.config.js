/*
 * @Author: Porco
 * @Date: 2019-10-22 16:27:51
 * @LastEditTime: 2020-02-21 01:26:23
 * @FilePath: /client-v4/vue.config.js
 * @Description: 请填写文件注释
 */

const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
function resolve(dir) {
  return path.join(__dirname, dir);
}

// const baseUrl = {
//   dev: 'http://localhost:8080',
//   prod: '暂无'
// }

const name = "vue Element Admin"; // page title

// port = 9527 npm run dev OR npm run dev --port = 9527
const port = process.env.port || 8080;

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  publicPath: "/", // 默认'/'，部署应用包时的基本 URL
  // outputDir: 'dist',
  // assetsDir: 'public',
  // lintOnSave: process.env.NODE_ENV === 'dev',
  lintOnSave: false,
  // productionSourceMap: false,
  // css相关配置
  // css: {
  //   // 是否使用css分离插件 ExtractTextPlugin
  //   extract: true,
  //   // 开启 CSS source maps?
  //   sourceMap: true,
  //   // css预设器配置项
  //   loaderOptions: {},
  //   // 启用 CSS modules for all css / pre-processor files.
  //   modules: false
  // },
  devServer: {
    port,
    open: true,
    //   overlay: {
    //     warnings: false,
    //     errors: true
    //   },
    proxy: {
      "/rtp": {
        target: "http://218.202.207.70:18800",
        changeOrigin: true,
      },
      //     // change xxx-api/login => mock/login
      //     // detail: https://cli.vuejs.org/config/#devserver-proxy
      //     '/': {
      //       target: process.env.NODE_ENV === 'dev' ? baseUrl.dev : '',
      //       // target: 'http://192.168.1.181:10014', // https://pkyl.iot5gx.com:8866/
      //       // target: 'https://community.nanjingdata.cn:8248', // 江北环境地址
      //       // target: 'https://jnds.iot5gx.com:8348', // 江宁环境地址
      //       changeOrigin: true,
      //       pathRewrite: {
      //         '^/': '/'
      //       }
      //     }
      //     // [process.env.VUE_APP_BASE_API]: {
      //     //   target: 'http://192.168.1.181:10014',
      //     //   changeOrigin: true,
      //     //   pathRewrite: {
      //     //     [`^${process.env.VUE_APP_BASE_API}`]: '',
      //     //   },
      //     // },
    },
    //   // after: require('./mock/mock-server.js')
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name,
    resolve: {
      alias: {
        "@": resolve("src"),
        "@config": resolve("config"),
        "@argus": resolve("argus"),
        "@public": resolve("public"),
        "@style": resolve("src/style"),
      },
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
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
        ],
      }),
    ],
  },
  chainWebpack: (config) => {
    // 让Babel处理node_modules中的ol包
    config.module
      .rule("js")
      .include.add(/node_modules\/ol/) // 重点：添加ol目录
      .end()
      .use("babel-loader")
      .loader("babel-loader")
      .tap((options) => {
        // 先初始化options（如果为undefined则创建空对象）
        options = options || {};
        // 确保预设包含@babel/preset-env
        options.presets = [["@babel/preset-env", { targets: "defaults" }]];
        return options;
      });
  },
  /* chainWebpack (config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test

    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 20000 }))

    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap((options) => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
      .when(process.env.NODE_ENV === 'dev',
        config => config.devtool('cheap-source-map'))

    config
      .when(process.env.NODE_ENV === 'prod',
        config => config.devtool(false))

    config
      .when(process.env.NODE_ENV !== 'dev',
        (config) => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  maxSize: 1000000,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                // vuejs: {
                //   name: 'chunk-vue', // split elementUI into a single package
                //   priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                //   test: /[\\/]node_modules[\\/]_?vue(.*)/, // in order to adapt to cnpm
                // },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  maxSize: 1000000,
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/, // in order to adapt to cnpm
                  chunks: 'async'
                },
                echartsVenodr: { // 异步加载echarts包
                  test: /(echarts|zrender)/,
                  priority: 20, // 高于async-commons优先级
                  maxSize: 1000000,
                  name: 'chunk-echarts',
                  chunks: 'async'
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        })
    // config
    //   .when(process.env.NODE_ENV !== 'dev',
    //     (c) => {
    //       c.merge({
    //         plugin: {
    //           install: {
    //             plugin: require('uglifyjs-webpack-plugin'),
    //             args: [{
    //               sourceMap: false,
    //               uglifyOptions: {
    //               // compress: {
    //               //   // 删除所有的 `console` 语句
    //               //   drop_console: true,
    //               // },
    //                 output: {
    //                 // 最紧凑的输出
    //                   beautify: false,
    //                   // 删除所有的注释
    //                   comments: false,
    //                 },
    //               },
    //             }],
    //           },
    //         },
    //       });
    //     });
  } */
};
