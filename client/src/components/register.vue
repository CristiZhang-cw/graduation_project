<template>
    <div class="container">
        <div class="header-container">
            <div class="header"></div>
        </div>
        <el-form
            class="registerForm"
            ref="registerForm"
            :model="form"
            label-width="100px"
            :rules="rules"
        >
            <h2>注册</h2>
            <el-form-item label="学号/工号" prop="userId">
                <el-input v-model.number="form.userId"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" show-password></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
                <el-input v-model="form.confirmPassword" show-password></el-input>
            </el-form-item>
            <el-form-item label="您的身份是" prop="role">
                <el-radio-group v-model="form.role">
                    <el-radio label="1">学生</el-radio>
                    <el-radio label="2">教师</el-radio>
                    <el-radio label="3">管理员</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="register('registerForm')">注册</el-button>
                <el-button type="primary" @click="reset('registerForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "register",
    data() {
        return {
            form: {
                userId: "",
                password: "",
                confirmPassword: "",
                role: ""
            },
            rules: {
                userId: [
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
                ],
                confirmPassword: [
                    {
                        type: "string",
                        required: true,
                        trigger: "blur",
                        validator: function(rule, value, callback) {
                            if (value === "") {
                                callback(new Error("请再次确认密码"));
                            } else if (value !== this.password) {   //这里的this指向rules
                                callback(new Error("两次输入的密码不一致"));
                            } else {
                                callback();
                            }
                        }
                    }
                ],
                role: [
                    {
                        required: true,
                        message: "请选择您的身份",
                        trigger: "change"
                    }
                ]
            }
        };
    },
    methods: {
        register(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$confirm("是否确定进行注册?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    }).then(() => {
                        let self = this;
                        let params = {
                            userId: self.form.userId,
                            password: self.form.password,
                            role: self.form.role
                        };
                        self.$axios({
                            method: "post",
                            url: self.$api.login.register,
                            data: params
                        }).then(function(response) {
                            if (response.data.result == 1) {
                                self.$message.success("注册成功");
                                setTimeout(() => {
                                    self.$router.push({
                                        name: "login"
                                    });
                                }, 1000);
                            } else {
                                self.$message.error("注册失败，请检查注册信息");
                            }
                        });
                    });
                } else {
                    console.log("error");
                    return false;
                }
            });
        },
        reset(formName) {
            this.$refs[formName].resetFields();
        }
    }
};
</script>

<style scoped>
.header-container {
    width: 400px;
    height: 350px;
    position: relative;
    border-right: 1px solid;
}
.header {
    width: 400px;
    height: 85px;
    background: url("../assets/schoollogo.jpg") no-repeat;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}
.container {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
.registerForm {
    width: 800px;
    height: 350px;
    display: flex;
    flex-direction: column;
    padding: 40px;
    text-align: center;
    position: relative;
    overflow: hidden;
}
.registerForm h2 {
    color: #4863d9;
}
.registerForm button {
    transform: translateX(-50px);
}
</style>