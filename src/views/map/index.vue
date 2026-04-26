<!--
 * @FilePath: \hz-project\src\views\map\index.vue
 * @Description: 
-->
<template>
  <div>
    <div id="map" style="width: 100%; height: 500px"></div>
  </div>
</template>

<script>
// import * as ol from "ol";
// import TileLayer from "ol/layer/Tile.js";
// import "ol/ol.css";
// import { Map, View } from "ol";
// import Map from 'ol/Map.js'
// impor
// import { Draw } from "ol/interaction";
// import { Tile } from "ol/layer";
// import { OSM, Vector } from "ol/source";
export default {
  name: "mapComponent",
  components: {},
  data() {
    return { olMap: null };
  },
  mounted() {
    // this.initMap();
  },
  methods: {
    initMap() {
      this.olMap = new ol.Map({
        // 设置地图图层
        layers: [
          // 创建一个使用Open Street Map地图源的瓦片图层
          new ol.Tile({ source: new ol.source.OSM() }),
        ],
        // 设置显示地图的视图
        view: new ol.View({
          center: [0, 0], // 定义地图显示中心于经度0度，纬度0度处
          zoom: 2, // 并且定义地图显示层级为2
        }),
        // 让id为map的div作为地图的容器
        target: "map",
      });
    },
  },
};
</script>
<style lang="less" scoped></style>
