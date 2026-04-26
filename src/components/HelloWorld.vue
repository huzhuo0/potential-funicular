<template>
  <div class="hello">
    <table-list
      :tableData="tableData"
      :columnList="tableList"
      @btnClick="btnClickEvent"
    >
    </table-list>
    <table-list
      :tableData="tableData1"
      :columnList="tableList1"
      @btnClick="btnClickEvent"
    >
    </table-list>
    <el-button @click="showGj">背景定时器切换做的动图</el-button>
    <div :class="{ alarmimg: isShowGif, hasalarm: isShowAlarm }"></div>
    <el-button @click="showGif">背景图是gif动图的效果</el-button>
    <div :class="{ gifAlarm: bgIsGif }"></div>
    <p class="font1">旁门正道标题体 12313213121 font1</p>
    <p class="font2">优设标题黑 12313213121 font2</p>
    <p class="font3">Digital-7Mono 12313213121 font3</p>
    <p class="font4">DigitsDB-Normal 12313213121 font4</p>
    <p class="font5">DIN-BoldItalicAlt 12313213121 font5</p>
    <p class="font6">DIN-Light 12313213121 font6</p>
    <p class="font7">DIN-Medium 12313213121 font7</p>
    <p class="font8">DIN-Regular 12313213121 font8</p>
    <p class="font9">DINEngschrift-Alternate 12313213121 font9</p>
    <p class="font10">DS-Digital-Bold-Italic 12313213121 font10</p>
    <p class="font11">FZZZHONGJ 12313213121 font11</p>
    <div class="donghua1"></div>
  </div>
</template>

<script>
import tableList from "@/components/tableList.vue";
// import lighting from '@/components/lightning.vue'
var qximg = require("../assets/img/qxnormal.png");
var jjimg = require("../assets/img/jjnormal.png");
var tzimg = require("../assets/img/tznormal.png");
var lufei = require("../assets/img/lf.jpg");
var suolong = require("../assets/img/suolong.jpg");
var qiaoba = require("../assets/img/qiaoba.jpg");
var shanzhi = require("../assets/img/shanzhi.jpg");
var namei = require("../assets/img/namei.jpg");
var wusuobu = require("../assets/img/wusuobu.jpg");

export default {
  name: "HelloWorld",
  components: {
    tableList,
    // lighting
  },
  props: {
    msg: String,
  },
  // filters: {
  //   phone () {
  //     return 1
  //   }
  //   // phone: (v) => {
  //   //   if (!v) return v
  //   //   return 1
  //   // }
  // },
  data() {
    return {
      timer: null,
      bgIsGif: true,
      isShowGif: false,
      isShowAlarm: false,
      iig: suolong,
      number1: 13114375992,
      tableData: [
        {
          name: "蒙奇D路飞",
          // sex: '男',
          sex: 1,
          age: " 18",
          work: "船长",
          ideal: "海贼王",
          avatorImg: lufei,
          width: 100,
          height: 100,
          hobby: "肉",
        },
        {
          name: "诺诺索亚-索隆",
          // sex: '男',
          sex: 1,
          age: "19",
          work: "剑豪",
          ideal: "世界第一剑豪",
          avatorImg: suolong,
          width: 100,
          height: 100,
          hobby: "酒",
        },
        {
          name: "娜美",
          // sex: '女',
          sex: 2,
          age: " 17",
          work: "航海士",
          ideal: "画未知海域航海图",
          avatorImg: namei,
          width: 100,
          height: 100,
          hobby: "money,橘子",
        },
      ],
      tableData1: [
        {
          name: "乌索布",
          // sex: '男',
          sex: 1,
          age: "18",
          work: "狙击手",
          ideal: "勇敢的海上战士",
          avatorImg: wusuobu,
          width: 100,
          height: 100,
          hobby: "吹牛，改造武器",
        },
        {
          name: "文斯莫克山治",
          // sex: '男',
          sex: 1,
          age: " 18",
          work: "厨师",
          ideal: "寻找allblue",
          avatorImg: shanzhi,
          width: 100,
          height: 100,
          hobby: "美食，美女",
        },
        {
          name: "托尼托尼乔巴",
          // sex: '男',
          sex: 1,
          age: "3",
          work: "医生",
          ideal: "学会所有医术帮助队友",
          avatorImg: qiaoba,
          width: 100,
          height: 100,
          hobby: "棉花糖",
        },
      ],
      tableList: [
        { label: "姓名", key: "name" },
        { label: "性别", key: "sex" },
        { label: "年龄", key: "age" },
        {
          imgSlotName: true,
          label: "头像",
          key: "avatorImg",
          imgWidth: 100,
          imgHeight: 100,
        },
        { label: "职业", key: "work" },
        { label: "目标", key: "ideal" },
        { zdDlotName: true, label: "爱好", key: "hobby" },
        {
          label: "操作",
          showBtn: true,
          btnList: [{ name: "查看" }, { name: "编辑" }, { name: "删除" }],
        },
      ],
      tableList1: [
        { label: "姓名", key: "name" },
        { label: "性别", key: "sex" },
        { label: "年龄", key: "age" },
        {
          imgSlotName: true,
          label: "头像",
          key: "avatorImg",
          imgWidth: 100,
          imgHeight: 100,
        },
        { label: "职业", key: "work" },
        { label: "目标", key: "ideal" },
        { zdDlotName: true, label: "爱好", key: "hobby" },
        {
          label: "操作",
          showIcon: true,
          iconList: [
            { key: "icon1", url: qximg },
            { key: "icon2", url: jjimg },
            { key: "icon3", url: tzimg },
          ],
        },
      ],
    };
  },
  methods: {
    showGj() {
      this.isShowGif = true;
      setTimeout(() => {
        window.clearInterval(this.timer);
        this.isShowGif = false;
        this.isShowAlarm = false;
        this.timeStatus = true;
        // clearInterval(this.timer)
      }, 3000);
    },
    showGif() {
      this.bgIsGif = true;
    },
    btnClickEvent(row, key) {
      console.log(row, "按钮点击");
      console.log(row.name, "按钮点击1");
      console.log(key, "按钮点击2");
    },
  },
  mounted() {
    // const arr = [...new Set([1, 2, 3, 5, 5, 2])]
    // console.log(arr, '63')
    this.tableData = this.tableData.map((item) => {
      if (item.sex === 1) {
        const data = item;
        data.sex = "男";
        return data;
      } else {
        const data = item;
        data.sex = "女";
        return data;
      }
    });
    this.tableData1 = this.tableData1.map((item) => {
      if (item.sex === 1) {
        const data = item;
        data.sex = "男";
        return data;
      } else {
        const data = item;
        data.sex = "女";
        return data;
      }
    });
  },
  watch: {
    isShowGif(val) {
      if (val) {
        window.clearInterval(this.timer);
        this.timer = setInterval(() => {
          if (!this.isShowGif && !this.isShowAlarm) {
            console.log("33");
          } else {
            this.isShowGif = !this.isShowGif;
            this.isShowAlarm = !this.isShowAlarm;
          }
        }, 100);
      } else {
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
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
.hello {
  width: 100%;
  height: 100%;
  .title {
    // width:100%;
    // height:100%;
    text-align: center;
  }
}
.alarmimg {
  width: 61px;
  height: 60px;
  position: absolute;
  background: red;
  right: 170px;
  bottom: 56px;
  background: url("../assets/img/bufaguang.png") no-repeat;
}
.hasalarm {
  width: 61px;
  height: 60px;
  position: absolute;
  background: red;
  right: 170px;
  bottom: 56px;
  background: url("../assets/img/faguang.png") no-repeat;
}
.gifAlarm {
  width: 61px;
  height: 60px;
  position: absolute;
  background: red;
  right: 25px;
  bottom: 25px;
  background: url("../assets/img/baojing.gif") no-repeat;
  z-index: 999;
}
</style>
