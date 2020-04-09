<template>
    <el-container>
        <el-header>
            <div class="header-title">出档档案查询</div>
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
                <el-form-item label="查询档案" prop="userId">
                    <el-input
                        class="search-input"
                        v-model="searchForm.userId"
                        placeholder="请输入需要查询的用户ID"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        @click="searchFile('searchForm')"
                        :loading="buttonLoading"
                    >查询档案</el-button>
                </el-form-item>
            </el-form>
            <el-form
                class="fileForm"
                ref="fileInfo"
                :model="fileInfo"
                label-width="100px"
                :rules="fileRules"
                v-show="isFormShow"
            >
                <el-row>
                    <el-col :span="24" class="infoTitle">基本信息</el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="学号：" prop="userId">
                            <el-input v-model="fileInfo.userId" :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="姓名：" prop="name">
                            <el-input v-model="fileInfo.name" :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="性别：" prop="sex">
                            <el-select
                                style="width:100%"
                                v-model="fileInfo.sex"
                                placeholder="请选择性别"
                                :disabled="true"
                            >
                                <el-option label="男" value="0"></el-option>
                                <el-option label="女" value="1"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-form-item label="证件类型：" prop="certificate">
                            <el-select
                                style="width:100%"
                                v-model="fileInfo.certificate"
                                placeholder="请选择证件类型："
                                :disabled="true"
                            >
                                <el-option label="居民身份证" value="0"></el-option>
                                <el-option label="护照" value="1"></el-option>
                                <el-option label="港澳居民来往内地通信证" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="证件号码：" prop="certifiacteNumber">
                            <el-input v-model="fileInfo.certifiacteNumber" :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="民族：" prop="nation">
                            <el-input v-model="fileInfo.nation" :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="出生日期：" prop="birthday">
                            <el-date-picker
                                style="width:100%"
                                v-model="fileInfo.birthday"
                                type="date"
                                placeholder="出生日期"
                                format="yyyy年MM月dd日"
                                :readonly="true"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20" type="flex" justify="space-between">
                    <el-col :span="4">
                        <el-form-item label="入学日期：" prop="admissionTime">
                            <el-date-picker
                                style="width:100%"
                                v-model="fileInfo.admissionTime"
                                type="date"
                                placeholder="入学日期"
                                format="yyyy年MM月dd日"
                                :readonly="true"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="籍贯：" prop="hometown">
                            <el-input v-model="fileInfo.hometown" :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="出生地：" prop="birthPlace">
                            <el-input v-model="fileInfo.birthPlace" :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="健康状况：" prop="healthStatus">
                            <el-select
                                style="width:100%"
                                v-model="fileInfo.healthStatus"
                                placeholder="健康状况"
                                :disabled="true"
                            >
                                <el-option label="良好" value="0"></el-option>
                                <el-option label="一般" value="1"></el-option>
                                <el-option label="较差" value="2"></el-option>
                                <el-option label="有重大疾病" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="血型：" prop="bloodType">
                            <el-select
                                style="width:100%"
                                v-model="fileInfo.bloodType"
                                placeholder="血型"
                                :disabled="true"
                            >
                                <el-option label="A型血" value="A"></el-option>
                                <el-option label="B型血" value="B"></el-option>
                                <el-option label="AB型血" value="AB"></el-option>
                                <el-option label="O型血" value="O"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24" class="infoTitle">学籍信息</el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-form-item label="年级：" prop="grade">
                            <el-select
                                style="width:100%"
                                v-model="fileInfo.grade"
                                placeholder="年级"
                                :disabled="true"
                            >
                                <el-option label="2010级" value="2010"></el-option>
                                <el-option label="2011级" value="2011"></el-option>
                                <el-option label="2012级" value="2012"></el-option>
                                <el-option label="2013级" value="2013"></el-option>
                                <el-option label="2014级" value="2014"></el-option>
                                <el-option label="2015级" value="2015"></el-option>
                                <el-option label="2016级" value="2016"></el-option>
                                <el-option label="2017级" value="2017"></el-option>
                                <el-option label="2018级" value="2018"></el-option>
                                <el-option label="2019级" value="2019"></el-option>
                                <el-option label="2020级" value="2020"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="学院名称：" prop="college">
                            <el-input v-model="fileInfo.college" :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="专业名称：" prop="major">
                            <el-input v-model="fileInfo.major" :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="班级名称：" prop="class">
                            <el-input v-model="fileInfo.class" :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-form-item label="学制：" prop="schoolLength">
                            <el-select
                                v-model="fileInfo.schoolLength"
                                placeholder="请选择学制"
                                style="width:100%"
                                :disabled="true"
                            >
                                <el-option label="3年制" value="3"></el-option>
                                <el-option label="4年制" value="4"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="学籍状态：" prop="studentStatus">
                            <el-select
                                v-model="fileInfo.studentStatus"
                                placeholder="请选择学籍状态"
                                style="width:100%"
                                :disabled="true"
                            >
                                <el-option label="在读" value="0"></el-option>
                                <el-option label="已毕业" value="1"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="学历层次：" prop="education">
                            <el-select
                                v-model="fileInfo.education"
                                placeholder="请选择学历"
                                style="width:100%"
                                :disabled="true"
                            >
                                <el-option label="专科" value="0"></el-option>
                                <el-option label="本科" value="1"></el-option>
                                <el-option label="硕士研究生" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="是否在校：" prop="isAtSchool">
                            <el-select
                                v-model="fileInfo.isAtSchool"
                                placeholder="请选择在校状态"
                                style="width:100%"
                                :disabled="true"
                            >
                                <el-option label="在校" value="0"></el-option>
                                <el-option label="离校" value="1"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24" class="infoTitle">联系方式</el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-form-item label="宿舍号：" prop="roomNumber">
                            <el-input v-model="fileInfo.roomNumber" :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="电子邮箱:" prop="email">
                            <el-input v-model="fileInfo.email" :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="电话号码：" prop="phoneNumber">
                            <el-input v-model="fileInfo.phoneNumber" :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="家庭电话：" prop="familyNumber">
                            <el-input v-model="fileInfo.familyNumber" :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-form-item label="家庭所在地" prop="address">
                            <el-input v-model="fileInfo.address" :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="邮政编码：" prop="mailNumber">
                            <el-input v-model="fileInfo.mailNumber" :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="QQ号码：" prop="QQ">
                            <el-input v-model="fileInfo.QQ" :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="微信号：" prop="weixin">
                            <el-input v-model="fileInfo.weixin" :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24" class="infoTitle">其它信息</el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-form-item label="考生号：" prop="examineeNumber">
                            <el-input v-model="fileInfo.examineeNumber" :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="身高(M)：" prop="height">
                            <el-input v-model="fileInfo.height" :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="体重(KG)：" prop="weight">
                            <el-input v-model="fileInfo.weight" :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="婚姻状况：">
                            <el-select
                                v-model="fileInfo.marriage"
                                style="width:100%"
                                :disabled="true"
                            >
                                <el-option label="未婚" value="0"></el-option>
                                <el-option label="已婚" value="1"></el-option>
                                <el-option label="离婚" value="2"></el-option>
                                <el-option label="丧偶" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="毕业中学：">
                            <el-input v-model="fileInfo.highSchool" :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="高考成绩：" prop="gaokaoScore">
                            <el-input v-model="fileInfo.gaokaoScore" :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="入学方式：">
                            <el-select
                                v-model="fileInfo.admissionType"
                                placeholder
                                style="width:100%"
                                :disabled="true"
                            >
                                <el-option label="统一录取" value="1"></el-option>
                                <el-option label="自主招生" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="专业类别：">
                            <el-select
                                v-model="fileInfo.majorType"
                                style="width:100%"
                                :disabled="true"
                            >
                                <el-option label="文史" value="1"></el-option>
                                <el-option label="理工" value="2"></el-option>
                                <el-option label="艺术" value="3"></el-option>
                                <el-option label="体育" value="4"></el-option>
                            </el-select>
                        </el-form-item>
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
            isFormShow: false,
            buttonLoading: false,
            searchForm: {
                userId: ""
            },
            fileInfo: {},
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
            }
        };
    },
    methods: {
        searchFile(formName) {
            this.buttonLoading = true;
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let token = sessionStorage.getItem("token"); //从sessionStorage获取token
                    this.$axios({
                        method: "post",
                        url: this.$api.fileApi.searchDeleteFile,
                        data: this.searchForm,
                        headers: {
                            //设置请求头，带token到后台验证
                            Authorization: "Bearer " + token
                        }
                    }).then(
                        response => {
                            if (response.data.result == 1) {
                                this.$message.success("查询成功");
                                this.fileInfo = response.data.file;
                                this.buttonLoading = false;
                                this.isFormShow = true
                            }
                        },
                        error => {
                            console.log(error);
                            this.$message.error("查询失败");
                        }
                    );
                }
            });
        }
    }
};
</script>

<style scpoed>
.el-header {
    padding: 0 20px;
    background-color: #e9ecef;
}
.header-title {
    font-weight: 600;
    line-height: 60px;
    text-align: left;
    position: relative;
}
.search-input {
    width: 1000px;
}
.searchForm {
    margin-bottom: 50px;
    border-bottom: 2px solid #e9ecef;
}
.infoTitle {
    text-align: left;
    height: 30px;
    font-weight: 700;
    border-bottom: 2px solid #007bff;
    margin-bottom: 20px;
}
.fileForm {
    padding: 20px;
    margin: auto;
    width: 80%;
}
</style>