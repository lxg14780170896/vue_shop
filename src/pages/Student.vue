<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理中心</el-breadcrumb-item>
      <el-breadcrumb-item>学生管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="请输入学生姓名" v-model="getStu" clearable>
            <el-button slot="append" icon="el-icon-search" @click="searchStu"
              >搜索</el-button
            >
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-button @click="addStuDialogVisible = true"
            >添加学生信息</el-button
          >
        </el-col>
      </el-row>
      <el-table :data="stuInfo" style="width: 100%">
        <el-table-column prop="id" label="id"> </el-table-column>
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="age" label="年龄"> </el-table-column>
        <el-table-column prop="grade" label="年级"> </el-table-column>
        <el-table-column prop="sex" label="性别"> </el-table-column>
        <el-table-column prop="idcard" label="身份证号" width="300">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="editStu(scope.row.id)"
            ></el-button>
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-delete"
              @click="deleteStu(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="float: left;margin-top: 5px;"
      >
      </el-pagination>
    </el-card>

    <!-- 添加学生 -->
    <el-dialog
      title="添加学生"
      :visible.sync="addStuDialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        :model="addStuInfo"
        :rules="rules"
        ref="addStuForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addStuInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="addStuInfo.age"></el-input>
        </el-form-item>
        <el-form-item label="年级" prop="grade">
          <el-input v-model="addStuInfo.grade"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="addStuInfo.sex"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idcard">
          <el-input v-model="addStuInfo.idcard"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addStuDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addStu">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑学生 -->
    <el-dialog
      title="编辑学生"
      :visible.sync="editStuDialogVisible"
      width="30%"
      :before-close="handleClose1"
    >
      <el-form
        :model="editStuInfo"
        :rules="rules"
        ref="editStuForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editStuInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="editStuInfo.age"></el-input>
        </el-form-item>
        <el-form-item label="年级" prop="grade">
          <el-input v-model="editStuInfo.grade"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="editStuInfo.sex"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idcard">
          <el-input v-model="editStuInfo.idcard"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editStuDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateStu">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: {
        num: 1,
        size: 5,
      },
      total: 0,
      stuInfo: [],
      getStu: "",
      addStuInfo: {
        name: "",
        age: "",
        sex: "",
        grade: "",
        idcard: "",
      },
      editStuInfo: {
        id: "",
        name: "",
        age: "",
        sex: "",
        grade: "",
        idcard: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
        ],
        age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
        sex: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        grade: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        idcard: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 18, max: 18, message: "长度在18字符", trigger: "blur" },
        ],
      },
      addStuDialogVisible: false,
      editStuDialogVisible: false,
    };
  },
  methods: {
    async getStuInfo() {
      const { data: res } = await this.$http.get("/admin/stuInfo", {
        params: { num: this.query.num, size: this.query.size },
      });
      console.log(res);
      this.stuInfo = res.data;
      console.log(this.stuInfo);
      this.total = res.total;
    },
    async searchStu() {
      const { data: res } = await this.$http.get("/admin/searchStu", {
        params: { name: this.getStu },
      });
      this.stuInfo = res.data;
    },
    addStu() {
      this.$refs.addStuForm.validate(async (valid) => {
        if (valid) {
          const { data: res } = await this.$http.post(
            "/admin/addStu",
            this.addStuInfo
          );
          this.addStuDialogVisible = false;
          if (res.status == 200) {
            this.$message.success(res.msg);
            this.getStuInfo();
          } else {
            this.$message.error(res.msg);
          }
        } else {
          alert("信息不合法");
          return false;
        }
      });
    },
    async editStu(id) {
      this.editStuDialogVisible = true;
      const { data: res } = await this.$http.get("/admin/searchStu", {
        params: { id },
      });
      this.editStuInfo = res.data[0];
    },
    updateStu() {
      this.$refs.editStuForm.validate(async (valid) => {
        if (valid) {
          const { data: res } = await this.$http.put(
            `/admin/updateStu/${this.editStuInfo.id}`,
            this.editStuInfo
          );
          console.log(res);
          this.editStuDialogVisible = false;
          if (res.status == 200) {
            this.$message.success(res.msg);
            this.getStuInfo();
          } else {
            this.$message.error(res.msg);
          }
        } else {
          alert("信息不合法");
          return false;
        }
      });
    },
    deleteStu(id) {
      this.$confirm("此操作会删除学生信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await this.$http.delete(
            `/admin/deleteStu/${id}`
          );
          if (res.status == 200) {
            this.$message.success(res.msg);
            this.getStuInfo();
          } else this.$message.error(res.msg);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleClose() {
      this.$refs.addStuForm.resetFields();
      this.addStuDialogVisible = false;
    },
    handleClose1() {
      this.$refs.editStuForm.resetFields();
      this.editStuDialogVisible = false;
    },
    handleSizeChange(val) {
      this.query.size = val;
      this.getStuInfo()
    },
    handleCurrentChange(val) {
      this.query.num = val;
      this.getStuInfo()
    },
  },
  mounted() {
    this.getStuInfo();
  },
  watch: {
    getStu: {
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue === "") {
          this.getStuInfo();
        }
      },
    },
  },
};
</script>

<style scoped>
.el-card {
  margin-top: 20px;
}
</style>