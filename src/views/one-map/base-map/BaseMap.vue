<template>
  <div class="map-container">
    <div ref="mapContainer" class="map"></div>
  </div>
</template>

<script setup>
// 在 script 部分顶部添加
import "ol/ol.css";
import { onMounted, ref } from "vue";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM"; // 使用 OpenStreetMap 作为图层源
import { fromLonLat } from "ol/proj";
import XYZ from "ol/source/XYZ";

const mapContainer = ref(null);
onMounted(() => {
  console.log("BaseMap mounted");
  initMap();
});

function initMap() {
  if (!mapContainer.value) return;
  console.log("Initializing map...");
  try {
    const map = new Map({
      target: mapContainer.value, // 获取 Vue 组件的 DOM 元素作为地图容器
      // layers 地图图层。 支持配置多个图层，根据图层添加的先后顺序，决定叠加顺序。
      layers: [
        // Tile Layer加载瓦片地图服务
        new TileLayer({
          // 创建一个图层，使用 OpenStreetMap 作为图源
          // source: new OSM(), // bc9b7dd18daa088b38d12cf6c9cce28d  b4de09d275b75f76b2cee810865bba2e
          source: new XYZ({
            // url: "http://wprd0{a-d}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}",
            // url: "http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}",
            // url: "https://aqzhsltileservice.zhslapp.com:20111/tileservice/imagery/TianAerial/{z}/{x}/{y}",
            url: "http://t0.tianditu.gov.cn/img_w/wmts?tk=bc9b7dd18daa088b38d12cf6c9cce28d",
            // url: "http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=bc9b7dd18daa088b38d12cf6c9cce28d",
          }),
          // http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=bc9b7dd18daa088b38d12cf6c9cce28d
        }),
      ],
      // 地图视图。配置地图相关信息，如：中心点、缩放等级、透明度、坐标系规则、旋转角度等
      view: new View({
        // 设置地图的视图，例如中心点和缩放级别
        center: fromLonLat([116.39, 39.91]), // 北京坐标示例
        zoom: 10, // 缩放级别，数字越大，地图越详细  默认缩放等级
        maxZoom: 20, // 最大缩放等级
        minZoom: 5, // 最小缩放等级
        // projection: "EPSG:4326", // 坐标系规则
        extent: [], // 边界值
      }),
      // controls 地图使用控件
      controls: [],
    });
  } catch (e) {
    console.log(
      "%c [ e ]-58",
      "font-size:13px; background:pink; color:#bf2c9f;",
      e
    );
  }
}
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 800px;
}
.map {
  width: 800px;
  height: 800px;
}
</style>
