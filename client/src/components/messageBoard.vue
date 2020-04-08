<template>
    <el-container>
        <el-header>
            <div class="header-title">留言板</div>
        </el-header>
        <el-main>
            <ul>
                <li v-for="item in messageBoard" :key="item.id">
                    <div class="board-title">{{item.userId}} {{item.userName}} :</div>
                    <div class="board-body">
                        {{item.message}}
                        <span>{{item.createdAt}}</span>
                    </div>
                </li>
            </ul>
            <el-form ref="messageForm" :model="messageForm" label-width="100px" rules="rules">
                <el-form-item label="您的昵称：" prop="userName">
                    <el-input v-model="messageForm.userName"></el-input>
                </el-form-item>
                <el-form-item label="请留言" prop="message">
                    <el-input
                        type="textarea"
                        v-model="messageForm.message"
                        placeholder="请写下您的留言"
                        :autosize="{ minRows:8,maxRows:10}"
                    ></el-input>
                </el-form-item>
                <el-button type="primary" icon="el-icon-check" @click="publish('messageForm')">发表留言</el-button>
            </el-form>
        </el-main>
    </el-container>
</template>

<script>
export default {
    mounted() {
        let token = sessionStorage.getItem("token");
        this.$axios({
            method: "post",
            url: this.$api.messageApi.selectMessage,
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(response => {
            if (response.data.result == 1) {
                this.messageBoard = response.data.messageList
            }
        });
    },
    data() {
        return {
            messageBoard: [],
            messageForm: {
                userName: "",
                message: ""
            },
            rules: {
                userName: [
                    {
                        required: true,
                        message: "请输入昵称",
                        trigger: "blur"
                    }
                ],
                message: [
                    {
                        required: true,
                        message: "请输入昵称",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        publish(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let params = this.messageForm;
                    params.userId = this.$store.state.userId;
                    let token = sessionStorage.getItem("token");

                    this.$axios({
                        method: "post",
                        url: this.$api.messageApi.addMessage,
                        data: params,
                        headers: {
                            Authorization: "Bearer " + token
                        }
                    }).then(response => {
                        if (response.data.result == 1) {
                            this.$message.success("留言发表成功");
                            this.messageBoard.push(response.data.message);
                        }
                    });
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
    position: relative;
}
ul {
    margin: auto;
    padding: 0;
    width: 80%;
    height: 800px;
    overflow: auto;
}
li {
    list-style: none;
}
li .board-title {
    text-align: left;
    font-size: 20px;
    color: #007bff;
}
li .board-body {
    width: 100%;
    height: 100px;
    border-top: 1px solid #007bff;
    text-align: left;
    font-size: 19px;
    position: relative;
}
li .board-body span {
    position: absolute;
    right: 0;
    bottom: 0;
}
</style>