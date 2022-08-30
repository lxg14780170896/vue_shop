<template>
  <div id="header">
    <div id="main">
      <span>简易管理系统</span>
      <span
        >用户名:<input
          type="text"
          placeholder="请输入用户名"
          v-model="form.username"
      /></span>
      <span
        >密码:<input
          type="password"
          placeholder="请输入密码"
          v-model="form.password"
      /></span>
      <div>
        <button class="login" @click="login">登录</button>
        <button class="rigister" @click="register">注册</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      const { data: res } = await this.$http.post("/api/login", this.form);
      if (res.status == 200) {
        this.$message.success("登陆成功");
        sessionStorage.setItem("token", res.token);
        setTimeout(() => {
          this.$router.push({
            path: "/home",
          });
        }, 500);
      }
    },
    register() {
      this.$router.push({
        path: "/register",
      });
    },
  },
};
</script>

<style scoped>
#header {
  width: 100%;
  height: 1000px;
  background-color: azure;
}
#main {
  width: 400px;
  height: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(240, 245, 255);
  display: flex;
  flex-flow: column;
  justify-content: space-around;
}
#main > span:first-child {
  color: blue;
  text-align: center;
  font-size: 20px;
}
#main > span:nth-child(2),
#main > span:nth-child(3) {
  margin-left: 30px;
}
input {
  width: 300px;
  height: 30px;
  border-style: none;
  float: right;
  margin-right: 5px;
  outline: none;
  text-indent: 5px;
}
button {
  width: 150px;
  height: 30px;
}
button:active {
  background-color: aqua;
}
.login {
  display: inline-block;
  margin-left: 30px;
  background-color: skyblue;
  border-style: none;
}
.rigister {
  float: right;
  margin-right: 30px;
  background-color: skyblue;
  border-style: none;
}
</style>