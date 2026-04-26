<template>
  <div class="table-container" :style="{ width: width, height: height }">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="忍者の時代はもうすぐ終わる"/> -->
    <el-button class="addBtn" @click="addTableData">新增</el-button>
    <el-button class="addBtn">删除</el-button>
    <table-list
      :tableData="tableData"
      :columnList="tableList"
      @btnClick="btnClickEvent"
    >
    </table-list>
    <table-list
      :tableData="tableData"
      :columnList="tableList1"
      @btnClick="btnClickEvent"
    >
    </table-list>
    <!-- <div>1111</div> -->
    <el-dialog
      v-model="dialogVisible"
      :title="title"
      width="50%"
      :before-close="handleClose"
    >
      <el-form :model="formData" label-width="120px">
        <el-form-item label="姓名" :prop="formData.name">
          <el-input
            v-model="formData.name"
            placeholder="请输入姓名"
            :disabled="type === 'view'"
          />
        </el-form-item>
        <el-form-item label="性别" :prop="formData.sex">
          <el-radio-group v-model="formData.sex" :disabled="type === 'view'">
            <el-radio label="男" />
            <el-radio label="女" />
            <el-radio label="未知" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄" :prop="formData.age">
          <el-input
            v-model="formData.age"
            placeholder="请输入年龄"
            :disabled="type === 'view'"
          />
        </el-form-item>
        <el-form-item label="头像" :prop="formData.peosonalImg">
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:3000/people/upload"
            style="
              width: 100px;
              height: 100px;
              border: 1px solid black;
              position: relative;
              z-index: 99;
            "
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            name="peosonalImg"
            :limit="1"
          >
            <!-- <div v-if="imageUrl!==''" style="position:relative;z-index:999">
                          <img :src="imageUrl" class="avatar" width="100" height="100" style="vertical-align:middle" />
                          <Close style="width: 1em; height: 1em; margin-right: 8px;position:absolute;right:-24px;top:-8px;" @click.stop="changeImg"  />
                      </div> -->
            <img
              v-if="imageUrl !== ''"
              :src="imageUrl"
              class="avatar"
              width="100"
              height="100"
              @click.stop="lookImg"
            />
            <Close
              v-if="imageUrl !== ''"
              style="
                width: 1em;
                height: 1em;
                margin-right: 8px;
                position: absolute;
                right: -24px;
                top: -8px;
              "
              @click.stop="changeImg"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="职业" :prop="formData.work">
          <el-input
            v-model="formData.work"
            placeholder="请输入职业"
            :disabled="type === 'view'"
          />
        </el-form-item>
        <el-form-item label="目标" :prop="formData.ideal">
          <el-input
            v-model="formData.ideal"
            placeholder="请输入目标"
            :disabled="type === 'view'"
          />
        </el-form-item>
        <el-form-item label="爱好" :prop="formData.hobby">
          <el-input
            v-model="formData.hobby"
            placeholder="请输入爱好"
            :disabled="type === 'view'"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" v-if="type !== 'view'" @click="confirmData"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>
    <!-- <auto-scroll-table></auto-scroll-table> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import mixinTest from '@/utils/mixin.js' // 局部混入
import tableList from "@/components/tableList.vue";
import autoScrollTable from "@/components/table/autoScrollTable1.vue";
import { ElMessageBox } from "element-plus";
var qximg = require("@/assets/img/qxnormal.png");
var jjimg = require("@/assets/img/jjnormal.png");
var tzimg = require("@/assets/img/tznormal.png");
var qiaoba = require("@/assets/img/qiaoba.jpg");
var shanzhi = require("@/assets/img/shanzhi.jpg");
var wusuobu = require("@/assets/img/wusuobu.jpg");
export default {
  name: "BaseTable",
  components: {
    // HelloWorld
    tableList,
    autoScrollTable,
  },
  // mixins: [mixinTest],
  data() {
    return {
      // testList: [],
      imageUrl: "",
      type: "add",
      width: "100%",
      height: window.innerHeight + "px",
      dialogVisible: false,
      formData: {
        name: "",
        sex: "",
        age: "",
        work: "",
        ideal: "",
        hobby: "",
        peosonalImg: "",
      },
      title: "新增人员信息",
      tableData: [],
      tableList: [
        { label: "姓名", key: "name" },
        { label: "性别", key: "sex" },
        { label: "年龄", key: "age" },
        {
          imgSlotName: true,
          label: "头像",
          key: "peosonalImg",
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
          key: "peosonalImg",
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
            { key: "view", url: qximg },
            { key: "edit", url: jjimg },
            { key: "delete", url: tzimg },
          ],
        },
      ],
    };
  },
  mounted() {
    window.onresize = () => {
      /* 实时监听浏览器窗口的变化 */
      this.height = window.innerHeight + "px";
    };
    this.getPeopleList();
  },
  methods: {
    changeImg() {
      this.imageUrl = "";
    },
    lookImg() {},
    handleAvatarSuccess(res) {
      this.imageUrl = res.data;
      this.formData.peosonalImg = res.data;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    addTableData() {
      this.formData = {
        name: "",
        sex: "",
        age: "",
        work: "",
        ideal: "",
        hobby: "",
        peosonalImg: "",
      };
      this.imageUrl = "";
      this.type = "add";
      this.dialogVisible = true;
      console.log(this.dialogVisible, "dialog显示");
    },
    confirmData() {
      if (this.type === "add") {
        this.$axios.post("/people/addPeopleData", this.formData).then((res) => {
          console.log(res.data.data, "新增请求返回的数据");
          if (res.data.status === 200) {
            console.log("新增成功");
            this.dialogVisible = false;
            this.getPeopleList();
          }
        });
      } else if (this.type === "edit") {
        this.$axios
          .post("/people/editPeopleData", this.formData)
          .then((res) => {
            console.log(res.data.data, "编辑请求返回的数据");
            if (res.data.status === 200) {
              console.log("编辑成功");
              this.dialogVisible = false;
              this.getPeopleList();
            }
          });
      }
    },
    handleClose() {
      this.dialogVisible = false;
    },
    btnClickEvent(row, key) {
      console.log(row, "按钮点击");
      console.log(row.name, "按钮点击1");
      console.log(key, "按钮点击2");
      if (key === "编辑") {
        this.type = "edit";
        this.title = "编辑人员信息";
        this.dialogVisible = true;
        this.formData = {
          id: row.id,
          name: row.name,
          sex: row.sex,
          age: row.age,
          work: row.work,
          ideal: row.ideal,
          hobby: row.hobby,
          peosonalImg: row.peosonalImg,
        };
        if (row.peosonalImg) {
          this.imageUrl = row.peosonalImg;
        } else {
          this.imageUrl = "";
        }
      } else if (key === "查看") {
        this.type = "view";
        this.title = "查看人员信息";
        this.dialogVisible = true;
        this.formData = {
          id: row.id,
          name: row.name,
          sex: row.sex,
          age: row.age,
          work: row.work,
          ideal: row.ideal,
          hobby: row.hobby,
          peosonalImg: row.peosonalImg,
        };
        if (row.peosonalImg) {
          this.imageUrl = row.peosonalImg;
        } else {
          this.imageUrl = "";
        }
      } else if (key === "删除") {
        this.type = "delete";
        ElMessageBox.confirm("是否确定删除此条信息?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.deleteData(row.id);
          })
          .catch(() => {});
        // this.deleteData(row.id)
      }
    },
    deleteData(val) {
      this.$axios.post("/people/deletePeople", { id: val }).then((res) => {
        console.log(res.data.data, "删除返回的数据");
        // this.tableData = res.data.data
        this.getPeopleList();
      });
    },
    getPeopleList() {
      this.$axios.get("/people/peopleList").then((res) => {
        console.log(res.data.data, "请求返回的数据");
        this.tableData = res.data.data;
      });
    },
  },
};
</script>
<style lang="less">
.table-container {
  position: relative;
}
.el-upload {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.closeIcon {
  position: absolute;
  top: 0;
  right: 20px;
}
</style>
