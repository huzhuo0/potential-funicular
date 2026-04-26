<template>
  <div class="base-a2-progress">
    <div class="inspect-sort" :class="sortList.length < 5 ? 'less-sort' : ''">
      <template v-if="sortList.length">
        <div
          v-for="(item, index) in sortList"
          :key="index"
          class="sort-item"
          :class="sortList.length < 5 ? 'less-sort-item' : ''"
        >
          <div class="sort-icon">
            <img :src="item.icon" alt="" />
          </div>
          <div
            :title="showTip ? item.label : ''"
            class="sort-label"
            @mouseenter="
              (e) => (showTip = e.target.clientWidth < e.target.scrollWidth)
            "
          >
            {{ item.label || "-" }}
          </div>
          <div class="sort-progress">
            <div class="sort-progress-bg"></div>
            <div
              class="sort-progress-value"
              :style="{ width: item.progress + '%' }"
            ></div>
          </div>
          <div class="sort-value">{{ item.value || "-" }}个</div>
        </div>
      </template>
      <div v-else class="no-data"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const showTip = ref(false);
const sortList = ref([]);
const originsSortList = ref([
  {
    label: "枞阳县职校南门排污口",
    value: 0, // 假设最大为300
    progress: 0,
    // eslint-disable-next-line
    icon: require("./images/sort-one-icon.png"),
  },
  {
    label: "枞阳县南路大桥排污口",
    value: 0,
    progress: 0,
    // eslint-disable-next-line
    icon: require("./images/sort-two-icon.png"),
  },
  {
    label: "铜官区环城路排污口",
    value: 0,
    progress: 0,
    // eslint-disable-next-line
    icon: require("./images/sort-three-icon.png"),
  },
  {
    label: "枞阳县西边桥头排污口",
    value: 0,
    progress: 0,
    // eslint-disable-next-line
    icon: require("./images/sort-four-icon.png"),
  },
  {
    label: "经济技术开发区污口",
    value: 0,
    progress: 0,
    // eslint-disable-next-line
    icon: require("./images/sort-five-icon.png"),
  },
]);
onMounted(() => {
  getData();
});

function getData() {
  let data = [
    {
      id: 1,
      name: "枞阳县职校南门排污口",
      count: 130,
    },
    {
      id: 2,
      name: "枞阳县南路大桥排污口",
      count: 102,
    },
    {
      id: 3,
      name: "铜官区环城路排污口",
      count: 99,
    },
    {
      id: 4,
      name: "枞阳县西边桥头排污口",
      count: 140,
    },
    {
      id: 5,
      name: "经济技术开发污口",
      count: 66,
    },
  ];
  let max = Math.max(...data.map((item) => Number(item.count)));
  max = Math.ceil(max / 10) + max;
  let length = data.length > 5 ? 5 : data.length;
  sortList.value = originsSortList.value.slice(0, length).map((item, index) => {
    item.label = data[index].name || "-";
    item.value = data[index].count || item.value;
    item.id = data[index].id;
    item.progress = data[index].count
      ? ((Number(data[index].count) / max) * 100).toFixed(2)
      : item.progress;
    return item;
  });
  console.log(sortList.value, "sortList.value");
}
</script>

<style lang="less" scoped>
.base-a2-progress {
  width: 100%;
  padding: 0 5px;
  background: linear-gradient(
    90deg,
    rgba(21, 33, 51, 0.76) 0%,
    rgba(25, 51, 105, 0.6) 100%
  );
  height: 100%;
  .inspect-sort {
    width: 100%;
    height: 166px;
    // margin-bottom: 13px;
    // padding-top: 40px;
    margin-bottom: 17px;
    padding-top: 10px;
    box-sizing: content-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    &.less-sort {
      justify-content: flex-start;
    }
    .sort-item {
      display: flex;
      height: 24px;
      align-items: center;
      &.less-sort-item {
        margin: 7px 0;
      }
      .sort-icon {
        width: 22px;
        height: 24px;
        margin-right: 4px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .sort-label {
        width: 120px;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 14px;
        color: #ffffff;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        text-align: right;
        margin-right: 4px;
      }
      .sort-progress {
        width: calc(100% - 205px);
        height: 22px;
        position: relative;
        .sort-progress-bg {
          width: 100%;
          position: absolute;
          left: 0;
          top: 0;
          height: 22px;
          background: rgba(36, 94, 166, 0.28);
          z-index: 10;
        }
        .sort-progress-value {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 11;
          height: 14px;
          background: linear-gradient(
            270deg,
            rgba(90, 255, 221, 1) 0%,
            rgba(11, 128, 255, 0.2) 100%
          );
          border: 1px solid rgba(95, 212, 254, 1);
        }
      }
      .sort-value {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        width: 50px;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 16px;
        color: #eaf1ff;
        line-height: 22px;
        text-align: right;
        margin-left: 4px;
      }
    }
  }
}
</style>
