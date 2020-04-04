<template>
    <el-container>
        <el-header>
            <div class="header-title">用户账号管理</div>
        </el-header>
        <el-main>
            <el-form
                class="searchForm"
                ref="searchForm"
                :model="searchForm"
                label-width="80px"
                :rules="rules"
                :inline="true"
            >
                <el-form-item label="查询用户" prop="userId">
                    <el-input
                        class="search-input"
                        v-model="searchForm.userId"
                        placeholder="请输入需要查询的用户ID"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        @click="searchAccount('searchForm')"
                        :loading="buttonLoading"
                    >查询用户</el-button>
                </el-form-item>
            </el-form>
            <el-form
                ref="userForm"
                :model="userForm"
                label-width="100px"
                :rules="userRules"
                v-if="isFormShow"
            >
                <el-row type="flex" justify="center">
                    <el-col :span="8">
                        <el-form-item label="学号/工号：" prop="userId">
                            <el-input v-model.number="userForm.userId" :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="center">
                    <el-col :span="8">
                        <el-form-item label="注册时间：">
                            <el-date-picker
                                style="width:100%"
                                v-model="userForm.createdAt"
                                type="date"
                                placeholder="账号注册时间"
                                :readonly="true"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="center">
                    <el-col :span="8">
                        <el-form-item label="更改时间：">
                            <el-date-picker
                                style="width:100%"
                                v-model="userForm.updatedAt"
                                type="date"
                                placeholder="账号更改时间"
                                :readonly="true"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="center" v-if="isPasswordShow">
                    <el-col :span="8">
                        <el-form-item label="新密码：" prop="newPassword">
                            <el-input v-model="userForm.newPassword"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="center">
                    <el-col :span="8">
                        <el-form-item label="身份：" prop="role">
                            <el-select v-model="userForm.role" placeholder="请设置用户角色权限：">
                                <el-option label="学生" value="1"></el-option>
                                <el-option label="教师" value="2"></el-option>
                                <el-option label="管理员" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-row type="flex" justify="space-around">
                            <el-col :span="4">
                                <el-button type="danger" @click="deleteAccount()">删除账号</el-button>
                            </el-col>
                            <el-col :span="4">
                                <el-button
                                    type="primary"
                                    @click="resetAccount()"
                                    v-if="!isPasswordShow"
                                >重置账号</el-button>
                            </el-col>
                            <el-col :span="4">
                                <el-button
                                    type="primary"
                                    @click="updateAccount('userForm')"
                                    v-if="isPasswordShow"
                                >提交</el-button>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </el-form>
        </el-main>
    </el-container>
</template>

<script>
export default {
    data() {
        return {
            isPasswordShow: false,
            isFormShow: false,
            buttonLoading: false,
            searchForm: {
                userId: ""
            },
            userForm: {
                userId: "",
                newPassword: "",
                createdAt: "",
                updatedAt: "",
                role: ""
            },
            rules: {
                userId: [
                    {
                        required: true,
                        type: "string",
                        message: "请输入用户账号(仅数字)",
                        min: 10,
                        trigger: "blur"
                    }
                ]
            },
            userRules: {
                userID: [
                    {
                        required: true,
                        type: "string",
                        message: "请输入用户账号(仅数字)",
                        min: 10,
                        trigger: "blur"
                    }
                ],
                newPassword: [
                    {
                        required: true,
                        message: "请输入6-16位的密码",
                        min: 6,
                        max: 16,
                        trigger: "blur"
                    }
                ],
                createAt: [
                    {
                        required: true,
                        type: "date",
                        trigger: "blur"
                    }
                ],
                updateAt: [
                    {
                        required: true,
                        type: "date",
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
        searchAccount(formName) {
            this.isPasswordShow = false;
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.buttonLoading = true;
                    let self = this;
                    let token = sessionStorage.getItem("token"); //获取token
                    self.$axios({
                        method: "post",
                        url: self.$api.login.searchAccount,
                        data: this.searchForm,
                        headers: {
                            //设置请求头，带token到后台
                            Authorization: "Bearer " + token
                        }
                    }).then(
                        response => {
                            if (response.data.result == 1) {
                                response.data.user.role = response.data.user.role.toString(); //转字符串，解决显示错误
                                self.userForm = response.data.user; //后台传回的数据赋值给userForm，其中有id
                                self.buttonLoading = false;
                                self.isFormShow = true;
                                self.$message.success("用户查询成功");
                            }
                        },
                        error => {
                            console.log(error);
                            self.$message.error("查询失败");
                            self.buttonLoading = false;
                        }
                    );
                }
            });
        },
        deleteAccount() {
            this.$confirm("是否确认删除账号?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                let self = this;
                let token = sessionStorage.getItem("token"); //从sessionStorage获取token
                self.$axios({
                    method: "post",
                    url: self.$api.login.deleteAccount,
                    data: self.userForm,
                    headers: {
                        Authorization: "bearer " + token
                    }
                }).then(
                    response => {
                        if (response.data.result == 1) {
                            this.$message.success("账号删除成功");
                        }
                    },
                    error => {
                        console.log(error);
                        this.$message.error("账号删除失败");
                    }
                );
            });
        },
        resetAccount() {
            this.isPasswordShow = true;
        },
        updateAccount(formName) {
            this.userForm.updatedAt = new Date(
                this.userForm.updatedAt
            ).getTime();
            this.userForm.createdAt = new Date(
                this.userForm.createdAt
            ).getTime();
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let self = this;
                    let token = sessionStorage.getItem("token"); //从sessionStorage获取token
                    let params = {
                        id: this.userForm.id,
                        userId: this.userForm.userId,
                        password: this.userForm.newPassword,
                        role: this.userForm.role
                    };
                    self.$axios({
                        method: "post",
                        url: self.$api.login.updateAccount,
                        data: params,
                        headers: {
                            Authorization: "bearer " + token
                        }
                    }).then(
                        response => {
                            if (response.data.result == 1) {
                                this.$message.success("账号修改成功");
                            }
                        },
                        error => {
                            console.log(error);
                            this.$message.error("账号修改失败");
                        }
                    );
                }
            });
        }
    }
};
</script>

<style scoped>
.el-header {
    padding: 0 20px;
    background-color: #e9ecef;
}
.header-title {
    font-weight: 600;
    line-height: 60px;
    text-align: left;
}
.search-input {
    width: 1000px;
}
.searchForm {
    margin-bottom: 50px;
    border-bottom: 2px solid #e9ecef;
}
.userForm {
    padding: 20px;
    margin: auto;
    width: 80%;
}
</style>