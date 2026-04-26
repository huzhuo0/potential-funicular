import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus, { POPPER_INJECTION_KEY } from "element-plus";
import Antd from "ant-design-vue";
// import "ant-design-vue/dist/antd.less";
import "ant-design-vue/dist/reset.css";
import "element-plus/dist/index.css";
import "./assets/style/index.less";
import "ol/ol.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue"; /* 引入element-plus图标 */
import * as Icons from "@ant-design/icons-vue"; // 引入ant-design-vue 图标
import OuterCard from "./components/card/OuterCard.vue";
import InnerCard from "./components/card/InnerCard.vue";
// import { jsSeamlessScroll, cssSeamlessScroll} from 'vue-seamless-scroll/src'

import service from "./axios/index.js";
// import './assets/style/index.less'
// import './utils/filter.js'

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
for (const [key, component] of Object.entries(Icons)) {
  app.component(key, component);
}
app.use(store);
app.use(router);
app.use(ElementPlus);
app.use(Antd);
// app.use(jsSeamlessScroll)
// app.use(cssSeamlessScroll)
app.component("OuterCard", OuterCard);
app.component("InnerCard", InnerCard);
// vue3将axios挂载到全局
app.config.globalProperties.$axios = service;
app.mount("#app");

// createApp(App).use(store).use(router).use(ElementPlus).mount('#app')
