<template>
  <div class="tableList">
      <el-table :data="tableData" :style="{width:tableWidth,height:tableHeight}" highlight-current-row='true'>
        <template v-for="(item,index) in columnList" :key="index">
          <!-- 标准不做修改 -->
          <el-table-column v-if="!item.showBtn&&!item.showIcon&&!item.imgSlotName" :prop="item.key" :label="item.label" :width="item.width" :align="alignsite">
          </el-table-column>
          <!-- 作用域插槽图片 -->
          <el-table-column v-else-if="item.imgSlotName" :prop="item.key" :label="item.label" :width="item.width" :align="alignsite">
             <template v-slot="scope">
              <img class="poniter iconStyle" :width="item.imgWidth"  :height="item.imgHeight" :src="scope.row[item.key]"/>
             </template>
          </el-table-column>
          <!-- 作用域插槽字典 -->
          <el-table-column v-else-if="item.zdSlotName" :prop="item.key" :label="item.label" :width="item.width" :align="alignsite">
             <template v-slot="scope">
              <span>{{scope.row[item.key]}}</span>
             </template>
          </el-table-column>
          <!-- 作用域插槽文字按钮 -->
          <el-table-column v-else-if="item.showBtn" :label="item.label" :width="item.width" :align="alignsite">
             <template v-slot="scope">
              <el-button v-for="i in item.btnList" :key="i" @click.stop.prevent="handBtn(scope.row,i.name)" class="tabBtn pointer">
                   <span class="pointer" :style="{color:i.color?i.color:'#42b983'}">{{i.name}}</span>
              </el-button>
             </template>
          </el-table-column>
          <!-- 作用域插槽icon按钮 -->
          <el-table-column v-else-if="item.showIcon" :label="item.label" :width="item.width" :align="alignsite">
             <template v-slot="scope">
              <img class="poniter iconStyle" :width="i.width" :height="i.height" v-for="i in item.iconList" :key="i" :src="i.url" @click="handBtn(scope.row,i.key)"/>
             </template>
          </el-table-column>
        </template>
      </el-table>
  </div>
</template>

<script>
export default {
  name: 'table',
  props: {
    // msg: String,
    tableData: Array,
    columnList: Array,
    tableWidth: {
      type: String,
      default: '100%'
    },
    tableHeight: {
      type: String,
      default: '100%'
    },
    alignsite: {
      type: String,
      default: 'center'
    }

  },
  data () {
    return {}
  },
  methods: {
    handBtn (row, key) {
      this.$emit('btnClick', row, key)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.tabBtn{
  border:none;
  padding:0;
  background:transparent;
}
.iconStyle{
  margin:0 5px;
}
</style>
