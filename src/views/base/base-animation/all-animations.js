// import { defineAsyncComponent } from "vue";

// 使用 webpack 的 require.context 动态导入所有 Animation.vue 文件
const moduleContext = require.context("./", true, /.*Animation\.vue$/);

// 定义一个空对象，用于存储导入的组件
const chartComponents = {};

// 遍历所有导入的模块
moduleContext.keys().forEach((path) => {
  // 提取文件名并转换为 PascalCase
  const fileName = path.match(/\/([^/]+)\.vue$/)[1];
  // 将文件名转换为模块名
  const moduleName = fileName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

  // 直接使用导入的组件
  chartComponents[moduleName] = moduleContext(path).default;
});

// 导出 chartComponents 对象
export default chartComponents;
