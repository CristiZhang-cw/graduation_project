<template>
    <el-container>
        <el-header>
            <div class="header-title">首页</div>
        </el-header>
        <el-main>
          <!-- gutter设置栅栏的间隔 -->
            <el-row gutter="20">
                <el-col :span="8">
                    <el-card>
                        <div slot="header">用户总数</div>
                        <div>{{cardData.userCount}}</div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card>
                        <div slot="header">档案数量</div>
                        <div>{{cardData.fileCount}}</div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card>
                        <div slot="header">总访问次数</div>
                        <div>{{cardData.visitCount}}</div>
                    </el-card>
                </el-col>
            </el-row>
            <h6 class="echarts-title">近七天访问数据</h6>
            <echarts></echarts>
            <div>1</div>
        </el-main>
    </el-container>
</template>

<script>
import echarts from './echarts/echarts'
export default {
  components:{echarts},
    data() {
        return {
            cardData: {
                userCount: "",
                fileCount: "",
                visitCount: ""
            }
        };
    }
};
</script>

<style scoped>
.el-header {
    padding: 0 20px;
    background-color: #e9ecef;
}
.header-title {
    font-weight: 400;
    line-height: 60px;
    text-align: left;
}
.echarts-title {
  font-size: 18px;
  text-align: left;
  height: 60px;
  font-weight: 500;
  line-height: 60px;
  color: #6c757d;
  border-bottom: 2px solid #e9ecef;
  box-sizing: border-box;
}
</style>