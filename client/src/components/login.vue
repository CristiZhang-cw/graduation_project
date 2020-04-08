<template>
    <div class="container">
        <el-form class="loginForm" ref="form" :rules="rules" :model="form" label-width="80px">
            <h2>登录</h2>
            <el-form-item label="用户名" prop="userName">
                <el-input v-model.number="form.userName" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" placeholder="请输入密码" show-password></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="login('form')">登录</el-button>
                <el-button type="primary" @click="register()">注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "login",
    data() {
        return {
            form: {
                userName: "",
                password: ""
            },
            rules: {
                userName: [
                    {
                        required: true,
                        type: "number",
                        message: "请输入用户名(仅数字)",
                        min: 10,
                        trigger: "blur"
                    }
                ],
                password: [
                    {
                        required: true,
                        message: "请输入6-16位的密码",
                        min: 6,
                        max: 16,
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        login(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$confirm("是否确认登陆?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    }).then(() => {
                        let self = this;
                        let params = {
                            userId: self.form.userName,
                            password: self.form.password
                        };
                        self.$axios({
                            method: "post",
                            url: self.$api.login.login,
                            data: params
                        }).then(
                            response => {
                                if (response.data.result == 1) {
                                    self.$message.success("登录成功");
                                    self.$store.commit({
                                        type: "addAccount",
                                        token: response.data.token,
                                        ID: response.data.user.id,
                                        userId: response.data.user.userId
                                    });
                                    self.$router.push({
                                        name: "index"
                                    });
                                }
                            },
                            error => {
                                console.log(error);
                                self.$message.error("用户名或密码错误");
                                
                            }
                        );
                    });
                }
            });
        },
        register() {
            this.$router.push({
                name: "register"
            });
        }
    }
};
</script>

<style scoped>
.container {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url("../assets/loginBG.jpg") fixed no-repeat;
    background-size: cover;
}
.loginForm {
    width: 800px;
    height: 270px;
    display: flex;
    flex-direction: column;
    padding: 40px;
    text-align: center;
    position: relative;
    z-index: 100;
    background: inherit;
    border-radius: 18px;
    overflow: hidden;
}
.loginForm::before {
    content: "";
    width: calc(100% + 20px);
    height: calc(100% + 20px);
    background: inherit;
    box-shadow: inset 0 0 0 200px rgba(255, 255, 255, 0.25);
    position: absolute;
    top: -10px;
    left: -10px;
    z-index: -1;
    filter: blur(6px);
    overflow: hidden;
}
.loginForm h2 {
    font-size: 30px;
    font-weight: 400; /*定义由粗到细的字符。400 等同于 normal，而 700 等同于 bold。*/
    color: skyblue;
}
.loginForm button {
    transform: translateX(-40px);
    width: 200px;
}
.loginForm button:nth-of-type(2) {
    margin-left: 100px;
}
</style>