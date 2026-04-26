<template>
  <div class="home" :style="{ width: width, height: height }">
    <DefaultTest><p>默认插槽的内容呢</p></DefaultTest>
    <DefaultTest>
      <p>匿名插槽完整的写法是template v-slot:defautl template</p>
      <!-- <template v-slot:defautl></template> -->
    </DefaultTest>
    <hr />
    <NameSlot>
      <p>匿名1 匿名1 匿名1</p>
      <template v-slot:hzw>
        <p>有v-slot的具名插槽hzw</p>
      </template>
      <template v-slot:hzww>
        <p>有v-slot的具名插槽hzww</p>
      </template>
      <p>匿名2 匿名2 匿名2</p>
    </NameSlot>
    <NameSlot>
      <p>具名插槽的缩写</p>
      <p>
        跟v-on和v-bind一样，v-slot也有缩写，即把参数之前的所有内容（v-slot:）替换为字符#
        eg:v-slot:hzw 缩写为#hzw
      </p>
      <p>
        在缩写时只在有参数的时候缩写才有意义，否则无效，eg：#hzw 有效 eg2: #
        无效 eg3: #default 有效
      </p>
      <template v-slot:hzw>
        <p>有v-slot的具名插槽hzw</p>
      </template>
    </NameSlot>
    <hr />
    <FunctionSlot>
      <template v-slot:default="hhh">
        <p>{{ hhh }}</p>
        <p>{{ hhh.bindData.name }}</p>
      </template>
    </FunctionSlot>
    <FunctionSlot>
      <template v-slot="hhh">
        <p>
          v-slot后面不带参数表示的是默认插槽，不带参数是这样的 v-slot="data"
        </p>
        <p>v-slot后面带参数 这样表示的v-slot:name="data"</p>
        <p>{{ hhh }}</p>
        <p>{{ hhh.bindData.name }}</p>
      </template>
    </FunctionSlot>
    <FunctionSlot>
      <template v-slot="{ bindData }">
        <p>作用域插槽也可以解构插槽prop</p>
        <p>
          作用域插槽的内部工作原理是将你的插槽内容包裹在一个拥有单个参数的函数里
        </p>
        <p>{{ bindData }}</p>
        <p>{{ bindData.name }}</p>
      </template>
    </FunctionSlot>
  </div>
</template>

<script>
import DefaultTest from "./components/DefaultTest";
import NameSlot from "./components/NameSlot";
import FunctionSlot from "./components/FunctionSlot";

export default {
  name: "BaseSlot",
  components: {
    DefaultTest,
    NameSlot,
    FunctionSlot,
  },
  // mixins: [mixinTest],
  data() {
    return {
      width: "100%",
      height: window.innerHeight + "px",
    };
  },
  mounted() {
    window.onresize = () => {
      /* 实时监听浏览器窗口的变化 */
      this.height = window.innerHeight + "px";
    };
    // console.log(this.width, this.height, '999')
  },
};
</script>
<style lang="less" scoped></style>
