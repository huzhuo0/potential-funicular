<template>
  <div class="inspect-record">
    <div class="inspect-record-item">巡查记录1</div>
    <div class="inspect-record-item">巡查记录2</div>
    <div class="inspect-record-item">巡查记录3</div>
    <div class="inspect-record-item">巡查记录4</div>
    <div class="inspect-record-item">巡查记录5</div>
    <div class="inspect-record-item">巡查记录6</div>
    <div class="inspect-record-item">巡查记录7</div>
    <div class="inspect-record-item">巡查记录8</div>
  </div>
</template>

<script>
export default {
  name: "InspectRecord",
};
</script>

<style scoped lang="less">
.inspect-record {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  // justify-content: space-between;
  align-items: center;
  column-gap: 10px;
  row-gap: 10px;
  .inspect-record-item {
    width: 19.5%;
    height: 100px;
    background-color: red;
    border-radius: 10px;
  }
}
</style>
