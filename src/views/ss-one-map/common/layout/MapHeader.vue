<template>
  <div class="header-wrapper">
    <div class="title" @click="goHome">青弋江数字孪生灌区</div>
    <MenuHeaderList ref="menuRef" :cockpit-list="cockpitList" />
    <div class="common-weather-wrap">
      <div class="time-info">{{ currentTime }}</div>
      <div class="weather-info">
        <span class="temperature">{{ dayweather }}</span>
        <span class="wather">{{ daytemp }}℃</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from "vue";
import MenuHeaderList from "./MenuHeaderList.vue";
import { useGlobalParamsStore } from "../../store/global-params.js";
import axios from "axios";
import dayjs from "dayjs";

import icon1 from "@/views/ss-thematic-map/assets/images/common/menu_ico1.png";
import icon1Active from "@/views/ss-thematic-map/assets/images/common/menu_ico1_active.png";
import icon2 from "@/views/ss-thematic-map/assets/images/common/menu_ico2.png";
import icon2Active from "@/views/ss-thematic-map/assets/images/common/menu_ico2_active.png";
import icon3 from "@/views/ss-thematic-map/assets/images/common/menu_ico3.png";
import icon3Active from "@/views/ss-thematic-map/assets/images/common/menu_ico3_active.png";
// 菜单组件
const menuRef = ref(null);
// 菜单列表
const cockpitList = [
  {
    name: "灌区全景一张图",
    value: "0",
    path: "/panorama-map",
  },
  {
    name: "水资源一张图",
    value: "1",
    path: "/water-resource-map",
    icon: icon1,
    iconActive: icon1Active,
  },
  {
    name: "防汛抗旱一张图",
    value: "2",
    path: "/flood-drought-map",
    icon: icon2,
    iconActive: icon2Active,
  },
  {
    name: "水工程一张图",
    value: "3",
    path: "/water-engineering-map",
    icon: icon3,
    iconActive: icon3Active,
  },
];
// 夜间温度
const nighttemp = ref("");
// 白天温度
const daytemp = ref("");
// 天气
const dayweather = ref("");
// 当前时间
const currentTime = ref("");

const globalParamsStore = useGlobalParamsStore();

const currentMenu = computed(() => {
  return globalParamsStore.currentMenu;
});

onMounted(() => {
  // 每秒更新显示的时间
  setInterval(() => {
    const now = dayjs().format("YYYY-M-D dddd HH:mm:ss");
    currentTime.value = now;
  }, 1000);
  getTodayWeather();
});

function clearMapLayer() {
  // TODO:清除地图的特殊处理
}

/**
 * 查看当前天气信息
 */
async function getTodayWeather() {
  const res = await axios({
    method: "get",
    url: "https://restapi.amap.com/v3/weather/weatherInfo",
    params: {
      key: "f6fdbae905ec1d24cb3c293ec9bf1de5",
      city: "341800",
      extensions: "all",
    },
  });
  if (res.status !== 200) return;
  let data = res.data;
  if (data.status === "1") {
    let resData = data.forecasts;
    if (resData.length > 0) {
      let weather = resData[0].casts[0];
      nighttemp.value = weather.nighttemp;
      daytemp.value = weather.daytemp;
      if (weather.dayweather === weather.nightweather) {
        dayweather.value = weather.dayweather;
      } else {
        dayweather.value = weather.dayweather + "转" + weather.nightweather;
      }
    }
  }
}
/**
 * 跳转首页
 */
function goHome() {
  menuRef.value?.goHome();
}
</script>

<style lang="less" scoped>
.header-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 72px;
  background: url("@/views/ss-thematic-map/assets/images/common/head_bg.png")
    no-repeat;
  background-size: 100% 100%;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  padding-left: 53px;
  padding-right: 72px;
  pointer-events: all;

  .title {
    font-family: YouSheBiaoTiHei;
    font-weight: 400;
    font-size: 42px;
    line-height: 55px;
    letter-spacing: 1px;
    text-shadow: 0px -2px 4px #5c9bff;
    color: #fff;
    user-select: none;
    cursor: pointer;
  }

  .common-weather-wrap {
    width: 376px;
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
    padding-left: 16px;
    padding-right: 20px;
    .time-info {
      height: 36px;
      font-size: 16px;
      color: #d4e4ff;
      display: flex;
      align-items: center;
    }
    .weather-info {
      height: 36px;
      font-size: 16px;
      color: #ffffff;
      display: flex;
      align-items: center;
      .temperature {
        margin-right: 6px;
      }
    }
  }
}
</style>
