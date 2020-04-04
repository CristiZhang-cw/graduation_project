<template>
    <el-container class="wrap">
        <el-header>
            <div class="header-container">
                <a class="title" href="#">档案自动化管理系统</a>
                <i class="el-icon-right index-control" @click="tabSwitch($event)"></i>
                <!-- @command绑定点击菜单项后触发的时间
                    @command中的方法不能加括号！！！
                 -->
                <el-dropdown trigger="click" @command="userCommand">
                    <span class="el-dropdown-link">
                        用户操作
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="profile">个人中心</el-dropdown-item>
                        <el-dropdown-item divided command="signOut">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-header>
        <el-container>
            <el-aside width="200px" class="left-box">
                <ul class="left-box-list">
                    <li v-for="item in mianFunction" :key="item.id" @click="listClick(item.action)">
                        <i :class="item.icon"></i>
                        {{item.name}}
                    </li>
                </ul>
            </el-aside>
            <el-main class="right-box">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    name: "index",
    data() {
        return {
            mianFunction: [
                {
                    id: 1,
                    icon: "el-icon-s-home",
                    name: "首页",
                    action: "indexSelf" //为了让每个li执行不同的函数，添加action字段
                },
                {
                    id: 2,
                    icon: "el-icon-document",
                    name: "档案信息管理",
                    action: "fileInfo"
                },
                {
                    id: 3,
                    icon: "el-icon-takeaway-box",
                    name: "出档档案管理",
                    action: "deletedFile"
                },
                {
                    id: 4,
                    icon: "el-icon-user-solid",
                    name: "用户账号管理",
                    action: "userAccount"
                },
                {
                    id: 5,
                    icon: "el-icon-tickets",
                    name: "留言板管理",
                    action: "messageBoard"
                }
            ]
        };
    },
    methods: {
        tabSwitch(event) {
            if (event.target.classList.contains("index-control-click")) {
                event.target.classList.remove("index-control-click");
                document
                    .getElementsByClassName("left-box")[0]
                    .classList.remove("left-box-click");
            } else {
                event.target.classList.add("index-control-click");
                document
                    .getElementsByClassName("left-box")[0]
                    .classList.add("left-box-click");
            }
        },
        userCommand(command) {
            this[command]();
        },
        profile() {
            this.$router.push({
                name: "profile"
            });
        },
        signOut() {
            this.$confirm("是否确认退出登录?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                this.$store.commit({
                    type: "removeAccount",
                    token: "",
                    ID: ""
                });
                this.$router.push({
                    name: "login"
                });
            });
        },
        listClick(action) {
            this[action]();
        },
        indexSelf() {
            this.$router.push({
                name: "indexSelf"
            });
        },
        fileInfo() {
            this.$router.push({
                name: 'fileInfoManagement'
            })
        },
        deletedFile() {
            this.$router.push({
                name: 'deletedFileManagement'
            })
        },
        userAccount() {
            this.$router.push({
                name: 'accountManagement'
            })
        },
        messageBoard() {
            this.$router.push({
                name: 'messageBoard'
            })
        }
    }
};
</script>

<style scoped>
.wrap {
    width: 100vw;
    height: 100vh;
}
.el-header {
    width: 100%;
    box-sizing: border-box;
    padding: 8px 16px;
    background-color: #007bff;
}
.left-box {
    height: 100%;
    background-color: #283643;
    z-index: 99;
    transition: all 1s;
}
.left-box-click {
    width: 0 !important;
}
.right-box {
    height: 100%;
    padding: 0;
    background-color: #ffffff;
}
.header-container {
    width: 100%;
    height: 100%;
    margin: auto;
    position: relative;
}
.title {
    text-decoration: none;
    display: inline-block;
    color: #ffffff;
    font-size: 25px;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
}
.index-control {
    color: #ffffff;
    position: absolute;
    left: 260px;
    line-height: 44px;
    height: 44px;
    cursor: pointer;
    font-size: 25px;
    transition: all 1s;
}
.index-control-click {
    transform: rotateY(180deg);
}
.el-dropdown {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
}
.el-dropdown-link {
    cursor: pointer;
    color: #ffffff;
    font-size: 17px;
}
.left-box-list {
    box-sizing: border-box;
    overflow: hidden;
    margin: 0;
    padding: 20px 0 0 0;
    width: 100%;
    height: 100%;
}
.left-box-list li {
    box-sizing: border-box;
    color: #ffffff;
    list-style: none;
    width: 100%;
    height: 60px;
    line-height: 60px;
    margin: 0px 0 20px 0;
    text-overflow: clip;
    white-space: nowrap;
    font-size: 17px;
}
.left-box-list li:hover {
    border: 1px #ffffff solid;
}
</style>