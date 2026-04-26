<template>
  <div>
    <p>作用域插槽</p>
    <p>
      作用域插槽是在父组件中使用子组件的时候，可以在父组件页面的子组件中访问子组件的数据
    </p>
    <!-- <p>注意 v-slot 只能添加在template上</p> -->
    <slot :bindData="tableData"></slot>
    <slot name="hzw"></slot>
  </div>
</template>

<script>
export default {
  name: "FunctionSlot",
  data() {
    return {
      tableData: {
        name: "九尾",
      },
    };
  },
};
</script>
<style lang="less" scoped></style>
