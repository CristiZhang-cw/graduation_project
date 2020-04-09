<template>
    <el-container>
        <el-header>
            <div class="header-title">
                档案信息管理
                <el-button
                    type="primary"
                    icon="el-icon-plus"
                    class="newFile"
                    @click="newFile('fileInfo')"
                >新增档案</el-button>
            </div>
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
                            <el-input v-model="fileInfo.userId" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="姓名：" prop="name">
                            <el-input v-model="fileInfo.name" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="性别：" prop="sex">
                            <el-select
                                style="width:100%"
                                v-model="fileInfo.sex"
                                placeholder="请选择性别"
                                :disabled="readonly"
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
                                :disabled="readonly"
                            >
                                <el-option label="居民身份证" value="0"></el-option>
                                <el-option label="护照" value="1"></el-option>
                                <el-option label="港澳居民来往内地通信证" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="证件号码：" prop="certifiacteNumber">
                            <el-input v-model="fileInfo.certifiacteNumber" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="民族：" prop="nation">
                            <el-input v-model="fileInfo.nation" :readonly="readonly"></el-input>
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
                                :readonly="readonly"
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
                                :readonly="readonly"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="籍贯：" prop="hometown">
                            <el-input v-model="fileInfo.hometown" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="出生地：" prop="birthPlace">
                            <el-input v-model="fileInfo.birthPlace" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="健康状况：" prop="healthStatus">
                            <el-select
                                style="width:100%"
                                v-model="fileInfo.healthStatus"
                                placeholder="健康状况"
                                :disabled="readonly"
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
                                :disabled="readonly"
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
                                :disabled="readonly"
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
                            <el-input v-model="fileInfo.college" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="专业名称：" prop="major">
                            <el-input v-model="fileInfo.major" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="班级名称：" prop="class">
                            <el-input v-model="fileInfo.class" :readonly="readonly"></el-input>
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
                                :disabled="readonly"
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
                                :disabled="readonly"
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
                                :disabled="readonly"
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
                                :disabled="readonly"
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
                            <el-input v-model="fileInfo.roomNumber"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="电子邮箱:" prop="email">
                            <el-input v-model="fileInfo.email"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="电话号码：" prop="phoneNumber">
                            <el-input v-model="fileInfo.phoneNumber"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="家庭电话：" prop="familyNumber">
                            <el-input v-model="fileInfo.familyNumber"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-form-item label="家庭所在地" prop="address">
                            <el-input v-model="fileInfo.address"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="邮政编码：" prop="mailNumber">
                            <el-input v-model="fileInfo.mailNumber"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="QQ号码：" prop="QQ">
                            <el-input v-model="fileInfo.QQ"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="微信号：" prop="weixin">
                            <el-input v-model="fileInfo.weixin"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24" class="infoTitle">其它信息</el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-form-item label="考生号：" prop="examineeNumber">
                            <el-input v-model="fileInfo.examineeNumber"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="身高(M)：" prop="height">
                            <el-input v-model="fileInfo.height"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="体重(KG)：" prop="weight">
                            <el-input v-model="fileInfo.weight"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="婚姻状况：" prop="marriage">
                            <el-select v-model="fileInfo.marriage" style="width:100%">
                                <el-option label="未婚" value="0"></el-option>
                                <el-option label="已婚" value="1"></el-option>
                                <el-option label="离婚" value="2"></el-option>
                                <el-option label="丧偶" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="毕业中学：" prop="highSchool">
                            <el-input v-model="fileInfo.highSchool"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="高考成绩：" prop="gaokaoScore">
                            <el-input v-model="fileInfo.gaokaoScore"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="入学方式：" prop="admissionType">
                            <el-select
                                v-model="fileInfo.admissionType"
                                placeholder
                                style="width:100%"
                            >
                                <el-option label="统一录取" value="1"></el-option>
                                <el-option label="自主招生" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="专业类别：" prop="majorType">
                            <el-select v-model="fileInfo.majorType" placeholder style="width:100%">
                                <el-option label="文史" value="1"></el-option>
                                <el-option label="理工" value="2"></el-option>
                                <el-option label="艺术" value="3"></el-option>
                                <el-option label="体育" value="4"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-row style="margin-top:60px" v-show="isFormShow">
                <el-col :span="24">
                    <el-button
                        type="primary"
                        icon="el-icon-check"
                        @click="submitFile('fileInfo')"
                    >提交</el-button>
                    <el-button type="danger" icon="el-icon-close" @click="deletedFile()">档案出档</el-button>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

    <script>
export default {
    data() {
        return {
            isFormShow: false,
            readonly: true,
            buttonLoading: false,
            searchForm: {
                userId: ""
            },
            fileInfo: {
                userId: "", //学号
                name: "", //姓名
                sex: "", //性别
                certificate: "", //证件类型
                certifiacteNumber: "", //证件号码
                nation: "", //民族
                birthday: "", //出生日期
                admissionTime: "", //入学日期
                hometown: "", //籍贯
                birthPlace: "", //出生地
                healthStatus: "", //健康状况
                bloodType: "", //血型
                grade: "", //年级
                college: "", //学院名称
                major: "", //专业名称
                class: "", //班级名称
                schoolLength: "", //学制
                studentStatus: "", //学籍状态
                education: "", //学历层次
                isAtSchool: "", //是否在校
                roomNumber: "", //宿舍号
                email: "", //电子邮箱
                phoneNumber: "", //电话号码
                familyNumber: "", //家庭电话
                address: "", //家庭所在地
                mailNumber: "", //邮政编码
                QQ: "", //QQ号
                weixin: "", //微信
                examineeNumber: "", //考生号
                height: "", //身高
                weight: "", //体重
                marriage: "", //婚姻状况
                highSchool: "", //毕业中学
                gaokaoScore: "", //高考成绩
                admissionType: "", //入学方式
                majorType: "" //专业类别
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
            fileRules: {
                userId: [
                    {
                        required: true,
                        type: "string",
                        message: "请输入用户账号(仅数字)",
                        min: 10,
                        trigger: "blur"
                    }
                ],
                name: [
                    {
                        required: true,
                        type: "string",
                        message: "请输入姓名",
                        trigger: "blur"
                    }
                ],
                sex: [
                    {
                        required: true,
                        message: "请选择性别",
                        trigger: "blur"
                    }
                ],
                certificate: [
                    {
                        required: true,
                        message: "请选择证件类型",
                        trigger: "blur"
                    }
                ],
                certifiacteNumber: [
                    {
                        required: true,
                        type: "string",
                        message: "请输入证件号码",
                        trigger: "blur"
                    }
                ],
                nation: [
                    {
                        required: true,
                        message: "请输入民族",
                        trigger: "blur"
                    }
                ],
                birthday: [
                    {
                        required: true,
                        type: "date",
                        message: "请选择出生日期",
                        trigger: "blur"
                    }
                ],
                admissionTime: [
                    {
                        required: true,
                        type: "date",
                        message: "请选择入学日期",
                        trigger: "blur"
                    }
                ],
                hometown: [
                    {
                        required: true,
                        type: "string",
                        message: "请输入籍贯",
                        trigger: "blur"
                    }
                ],
                birthPlace: [
                    {
                        required: true,
                        type: "string",
                        message: "请输入出生地",
                        trigger: "blur"
                    }
                ],
                healthStatus: [
                    {
                        required: true,
                        message: "请选择健康状况",
                        trigger: "blur"
                    }
                ],
                bloodType: [
                    {
                        required: true,
                        message: "请选择血型",
                        trigger: "blur"
                    }
                ],
                grade: [
                    {
                        required: true,
                        message: "请选择年级",
                        trigger: "blur"
                    }
                ],
                college: [
                    {
                        required: true,
                        type: "string",
                        message: "请输入学院",
                        trigger: "blur"
                    }
                ],
                major: [
                    {
                        required: true,
                        type: "string",
                        message: "请输入专业名称",
                        trigger: "blur"
                    }
                ],
                class: [
                    {
                        required: true,
                        type: "string",
                        message: "请输入班级名称",
                        trigger: "blur"
                    }
                ],
                schoolLength: [
                    {
                        required: true,
                        message: "请选择学制",
                        trigger: "blur"
                    }
                ],
                studentStatus: [
                    {
                        required: true,
                        message: "请选择学籍状态",
                        trigger: "blur"
                    }
                ],
                education: [
                    {
                        required: true,
                        message: "请选择学历层次",
                        trigger: "blur"
                    }
                ],
                isAtSchool: [
                    {
                        required: true,
                        message: "请选择是否在校",
                        trigger: "blur"
                    }
                ],
                roomNumber: [
                    {
                        message: "请输入宿舍号",
                        type: "string",
                        trigger: "blur"
                    }
                ],
                email: [
                    {
                        message: "请输入正确的邮箱",
                        type: "email",
                        trigger: "blur"
                    }
                ],
                phoneNumber: [
                    {
                        message: "请输入正确的电话",
                        type: "string",
                        trigger: "blur"
                    }
                ],
                familyNumber: [
                    {
                        message: "请输入正确的电话",
                        type: "string",
                        trigger: "blur"
                    }
                ],
                address: [
                    {
                        type: "string",
                        message: "请输入地址",
                        trigger: "blur"
                    }
                ],
                mailNumber: [
                    {
                        type: "string",
                        message: "请输入正确的邮政编码",
                        trigger: "blur"
                    }
                ],
                QQ: [
                    {
                        type: "string",
                        message: "请输入QQ号",
                        trigger: "blur"
                    }
                ],
                weixin: [
                    {
                        type: "string",
                        message: "请输入微信号",
                        trigger: "blur"
                    }
                ],

                height: [
                    {
                        type: "string",
                        message: "请输入身高",
                        trigger: "blur"
                    }
                ],
                weight: [
                    {
                        type: "string",
                        message: "请输入体重",
                        trigger: "blur"
                    }
                ],
                marriage: [
                    {
                        type: "string",
                        trigger: "blur"
                    }
                ],
                highSchool: [
                    {
                        type: "string",
                        trigger: "blur"
                    }
                ],
                gaokaoScore: [
                    {
                        type: "string",
                        message: "请输入高考成绩",
                        trigger: "blur"
                    }
                ],
                admissionType: [
                    {
                        type: "string",
                        trigger: "blur"
                    }
                ],
                majorType: [
                    {
                        type: "string",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        newFile(formName) {
            this.isFormShow = true; //使用v-show绑定，因为js执行速度大于dom加载速度，使用v-if会导致后面几行代码失效
            this.readonly = false;
            document
                .getElementsByClassName("fileForm")[0]
                .classList.add("addFile");
            this.$refs[formName].resetFields();
        },
        searchFile(formName) {
            if (
                //存在这个添加box-shadow的类就把它移除
                document
                    .getElementsByClassName("fileForm")[0]
                    .classList.contains("addFile")
            ) {
                document
                    .getElementsByClassName("fileForm")[0]
                    .classList.remove("addFile");
            }
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.buttonLoading = true;
                    let self = this;
                    let token = sessionStorage.getItem("token"); //获取token
                    self.$axios({
                        method: "post",
                        url: self.$api.fileApi.searchfile,
                        data: this.searchForm,
                        headers: {
                            //设置请求头，带token到后台
                            Authorization: "Bearer " + token
                        }
                    }).then(
                        response => {
                            if (response.data.result == 1) {
                                self.$message.success("档案查询成功");
                                this.buttonLoading = false;
                                self.isFormShow = true;
                                self.$store.commit({
                                    //查找到档案后，把id存到vuex中，以便update时传id到后台
                                    type: "addFileID",
                                    fileID: response.data.file.id
                                });
                                delete response.data.file.id;
                                delete response.data.file.createdAt;
                                delete response.data.file.updatedAt;
                                console.log(response.data);
                                self.fileInfo = response.data.file;
                                self.isFormShow = true;
                                this.readonly = true;
                            }
                        },
                        error => {
                            console.log(error);
                            self.buttonLoading = false;
                            self.$refs['fileInfo'].resetFields();
                            self.$message.error("档案不存在");
                        }
                    );
                }
            });
        },
        submitFile(formName) {
            this.fileInfo.birthday = new Date(this.fileInfo.birthday).getTime(); //后台传回数据时，date为字符串，验证会不通过，要转成date对象
            this.fileInfo.admissionTime = new Date(
                this.fileInfo.admissionTime
            ).getTime();
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$confirm("是否确认提交?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    }).then(() => {
                        if (
                            //如果存在这个类，就是新增档案
                            document
                                .getElementsByClassName("fileForm")[0]
                                .classList.contains("addFile")
                        ) {
                            let self = this;
                            let token = sessionStorage.getItem("token"); //从sessionStorage获取token
                            self.$axios({
                                method: "post",
                                url: self.$api.fileApi.addfile,
                                data: self.fileInfo,
                                headers: {
                                    //设置请求头，带token到后台验证
                                    Authorization: "Bearer " + token
                                }
                            }).then(
                                response => {
                                    if (response.data.result == 1) {
                                        self.$message.success("档案入档成功");
                                        document
                                            .getElementsByClassName(
                                                "fileForm"
                                            )[0]
                                            .classList.remove("addFile");
                                    }
                                    self.isFormShow = false;
                                },
                                error => {
                                    console.log(error);
                                    self.$message.error(
                                        "档案入档失败,请检查档案信息"
                                    );
                                }
                            );
                        } else {
                            //不存在这个类就是更新档案
                            let self = this;
                            let params = self.fileInfo;
                            params.id = self.$store.state.fileID; //从vuex中获取档案的id
                            let token = sessionStorage.getItem("token");
                            self.$axios({
                                method: "post",
                                url: self.$api.fileApi.updatefile,
                                data: params,
                                headers: {
                                    Authorization: "Bearer " + token
                                }
                            }).then(
                                response => {
                                    if (response.data.result == 1) {
                                        self.$message.success("档案修改成功");
                                    }
                                },
                                error => {
                                    console.log(error);
                                    self.$message.error(
                                        "档案入档失败,请检查档案信息"
                                    );
                                }
                            );
                        }
                    });
                }
            });
        },
        deletedFile() {
            this.$confirm("是否进行档案出档?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                let token = sessionStorage.getItem("token"); //从sessionStorage获取token
                let params = {
                    id: this.$store.state.fileID
                };
                this.$axios({
                    method: "post",
                    url: this.$api.fileApi.deletedFile,
                    data: params,
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }).then(
                    response => {
                        console.log(response);
                        this.$message.success("出档成功");
                    },
                    error => {
                        console.log(error);
                        this.$message.success("出档失败");
                    }
                );
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
    position: relative;
}
.newFile {
    position: absolute;
    top: 50%;
    right: 10%;
    transform: translateY(-50%);
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
.addFile {
    border: 2px solid #007bff;
    box-shadow: 0px 0px 60px #007bff;
}
</style>