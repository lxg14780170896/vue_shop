<template>
  <el-container>
    <el-header>
      <div>
        <img src="../assets/logo.png" height="50px" />
        <span>简易管理系统</span>
      </div>
      <el-button @click="loginOut">点击退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse?'64px':'200px'">
        <div @click="isCollapse=!isCollapse" style="cursor: pointer;">|||</div>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">管理中心</span>
            </template>
            <el-menu-item index="/home/student">学生管理</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
    data() {
        return {
            isCollapse:false
        }
    },
  methods: {
    loginOut() {
      sessionStorage.clear();
      this.$router.push("/login");
    },
  },
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-header div {
  width: 250px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.el-header div span {
  font-size: 20px;
  color: green;
}
.el-header .el-button {
  width: 100px;
  height: 40px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  height: 700px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}
</style>