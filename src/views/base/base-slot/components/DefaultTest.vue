<template>
  <div>
    <p>匿名插槽</p>
    <p>
      现在 template>元素中的所有内容都将会被传入相应的插槽。任何没有被包裹在带有
      v-slot 的 template中的内容都会被视为默认插槽的内容。
    </p>
    <slot></slot>
    <slot name="hz"></slot>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "DefaultTest",
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped></style>
