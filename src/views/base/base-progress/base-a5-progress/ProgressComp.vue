<template>
  <div class="progress-comp">
    <div class="progress-title">
      <div class="name">{{ data.name }}</div>
      <div class="value">
        <span>{{ data.plan }}</span>
        <span>/</span>
        <span>{{ data.actual }}</span>
        <span>/</span>
        <span>{{ data.per }}%</span>
      </div>
    </div>
    <div class="progress-bar">
      <div class="inner" :style="{ width: data.per + '%' }"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressComp',
  components: {},
  props: {
    /**
     * 接受外部传入的面板数据  {actual-实际值，plan-计划值，per-进度}
     */
    data: {
      type: Object,
      default() {
        return {
          name: '区域名称',
          plan: 0,
          actual: 0,
          per: 0
        }
      }
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="less">
.progress-comp {
  width: 100%;
  margin-bottom: 16px;
  padding: 0 5px;
}
.progress-title {
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  .name {
    font-weight: 600;
    color: #e4eaff;
  }
  .value {
    span {
      font-weight: 400;
      font-family: PingFangSC-Regular, PingFang SC;
      &:nth-child(1) {
        color: #ffffff;
      }
      &:nth-child(2) {
        color: #3ebcee;
      }
      &:nth-child(3) {
        color: #ffffff;
      }
      &:nth-child(4) {
        color: #3ebcee;
      }
      &:nth-child(5) {
        color: #67f9b5;
      }
    }
  }
}
.progress-bar {
  width: 100%;
  height: 12px;
  background: rgba(48, 118, 221, 0.5);
  display: flex;
  align-items: center;
  .inner {
    height: 4px;
    background: linear-gradient(315deg, #0bb2ea 0%, #00ffff 100%);
    position: relative;

    &:after {
      content: '';
      position: absolute;
      top: -4px;
      right: 0;
      width: 3px;
      height: 12px;
      background: #ffffff;
    }
  }
}
</style>
