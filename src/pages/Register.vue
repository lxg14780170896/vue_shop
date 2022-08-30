<template>
  <div id="header">
    <div id="main">
      <span>用户注册</span>
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
      <span
        >电话号码:<input
          type="text"
          placeholder="请输入电话号码"
          v-model="form.telephone"
      /></span>
      <span
        >地址:<input
          type="text"
          placeholder="请输入地址"
          v-model="form.address"
      /></span>
      <div>
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
        telephone: "",
        address: "",
      },
    };
  },
  methods: {
    async register() {
      const {data:res}= await this.$http.post("/api/register", this.form);
      console.log(res);
      if (res.status === 200) {
        this.$message.success("注册成功,即将跳转登录页面");
        setTimeout(() => {
          this.$router.push({
            path: "/login",
          });
        }, 500);
      }
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
  margin-left: -30px;
}
#main > span {
  margin-left: 30px;
}
input {
  width: 280px;
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
.rigister {
  background-color: skyblue;
  border-style: none;
  transform: translateX(80%);
}
</style>