<template>
    <div class="container">
        <div class="header-container">
            <div class="header"></div>
        </div>
        <el-form class="registerForm" ref="registerForm" :model="form" label-width="100px" :rules="rules">
            <h2>注册</h2>
            <el-form-item label="学号/工号" prop="userId">
                <el-input v-model.number="form.userId"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" show-password></el-input>
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
                form: "",
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
            this.$refs[formName].validate((valid) => {
                if(valid) {
                    alert('已提交')
                } else {
                    console.log('error');
                    return false
                }
            });
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