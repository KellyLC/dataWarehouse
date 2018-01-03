<template>
    <div class="page">
        <el-container id="container">
            <el-header style="background-color:#505F7C ">
                <h1 style="color: white; test-align: left">Checker</h1>
            </el-header>
            <el-container>
                <el-aside style="border: 1px solid #eee">
                    <el-menu default-active="1" style="text-align: left; border: none">
                        <el-menu-item index="1" @click="clickMenuAt(1)">
                            <div slot="title">
                                <i class="el-icon-document"></i>
                                <span slot="title">查看所有反馈</span>
                            </div> 
                        </el-menu-item>   
                        <el-menu-item index="2" @click="clickMenuAt(2)">
                            <div slot="title">
                                <i class="el-icon-search"></i>
                                <span slot="title">查询反馈ID</span>
                            </div>
                        </el-menu-item>
                        <el-menu-item index="3" @click="clickMenuAt(3)">
                            <div slot="title">
                                <i class="el-icon-search"></i>
                                <span slot="title">处理反馈</span>
                            </div>
                        </el-menu-item>
                        <el-menu-item index="4" @click="clickMenuAt(4)"> 
                            <i class="el-icon-search"></i>
                            <span slot="title">查看退货订单</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main>
                        <el-collapse-transition>
                            <el-card class="box-card" v-show="showAllFeeds">
                                <div slot="header">
                                    <span>所有反馈</span>
                                </div>
                                <div>
                                    <el-table 
                                        :data="allFeeds"                                  
                                        border
                                        style="width: 100%">
                                        <el-table-column
                                        fixed
                                        prop="feedID"
                                        label="反馈ID"
                                        width="150">
                                        </el-table-column>
                                        <el-table-column
                                        prop="userID"
                                        label="反馈用户ID"
                                        width="120">
                                        </el-table-column>
                                        <el-table-column
                                        prop="feedbackName"
                                        label="反馈主题"
                                        width="120">
                                        </el-table-column>
                                        <el-table-column
                                        prop="feedbackAdvice"
                                        label="反馈建议"
                                        width="300">
                                        </el-table-column>
                                        <el-table-column
                                        prop="solution"
                                        label="反馈解决方案"
                                        width="200">
                                        </el-table-column>
                                        <el-table-column
                                        prop="solved"
                                        label="是否解决"
                                        width="100">
                                        </el-table-column>
                                        <el-table-column
                                        prop="phone"
                                        label="用户手机号"
                                        width="120">
                                        </el-table-column>                                        
                                        <el-table-column
                                        fixed="right"
                                        prop="checkerID"
                                        label="管理员ID"
                                        width="100">
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </el-card>
                        </el-collapse-transition>
                        <el-collapse-transition>
                            <el-card class="box-card"  v-show="feedsQuery">
                                <div slot="header">
                                    <span>查询反馈ID</span>
                                    <div class="demo-input-suffix" style="width: 640px; margin: 20px auto">
                                        <el-input placeholder="请输入查询反馈ID" v-model="feedID" >
                                            <el-button slot="append" icon="el-icon-search" @click="queryForFeed"></el-button>
                                        </el-input>
                                    </div>
                                </div>
                                <div>
                                    <el-table 
                                        :data="IDqueryForfeeds"                                  
                                        border
                                        style="width: 100%">
                                        <el-table-column
                                        fixed
                                        prop="feedID"
                                        label="反馈ID"
                                        width="150">
                                        </el-table-column>
                                        <el-table-column
                                        prop="userID"
                                        label="反馈用户ID"
                                        width="120">
                                        </el-table-column>
                                        <el-table-column
                                        prop="feedbackName"
                                        label="反馈主题"
                                        width="120">
                                        </el-table-column>
                                        <el-table-column
                                        prop="feedbackAdvice"
                                        label="反馈建议"
                                        width="300">
                                        </el-table-column>
                                        <el-table-column
                                        prop="solution"
                                        label="反馈解决方案"
                                        width="200">
                                        </el-table-column>
                                        <el-table-column
                                        prop="solved"
                                        label="是否解决"
                                        width="100">
                                        </el-table-column>
                                        <el-table-column
                                        prop="phone"
                                        label="用户手机号"
                                        width="120">
                                        </el-table-column>                                        
                                        <el-table-column
                                        fixed="right"
                                        prop="checkerID"
                                        label="管理员ID"
                                        width="100">
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </el-card>
                        </el-collapse-transition>
                        <el-collapse-transition>
                            <el-card class="box-card" v-show="dealFeeds">
                                <div slot="header">
                                    <span>处理反馈</span>
                                </div>
                                <div>
                                    <div style="margin: 20px;"></div>
                                    <el-form label-position="right" label-width="80px" :model="solution">
                                    <el-form-item label="反馈ID">
                                        <el-input v-model="solution.ID"></el-input>
                                    </el-form-item>
                                    <el-form-item label="解决方案">
                                        <el-input type="textarea" v-model="solution.description"></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="primary" @click="admitSolutions">提交</el-button>
                                    </el-form-item>
                                    </el-form>
                                </div>
                            </el-card>
                        </el-collapse-transition>
                        <el-collapse-transition>
                            <el-card class="box-card" v-show="returnOrders">
                                <div slot="header">
                                    <span>查看退货订单</span>
                                </div>
                                <div>
                                    <el-table 
                                        :data="allReturnOrders"                                  
                                        border
                                        style="width: 100%">
                                        <el-table-column
                                        fixed
                                        prop="orderID"
                                        label="订单ID"
                                        width="150">
                                        </el-table-column>
                                        <el-table-column
                                        prop="orderTitle"
                                        label="订单名"
                                        width="120">
                                        </el-table-column>
                                        <el-table-column
                                        prop="orderState"
                                        label="订单状态"
                                        width="120">
                                        </el-table-column>
                                        <el-table-column
                                        prop="createTime"
                                        label="创建日期"
                                        width="150">
                                        </el-table-column>
                                        <el-table-column
                                        prop="orderDescrip"
                                        label="订单描述"
                                        width="200">
                                        </el-table-column>
                                        <el-table-column
                                        prop="address"
                                        label="订单地址"
                                        width="300">
                                        </el-table-column>
                                        <el-table-column
                                        fixed="right"
                                        prop="buyerID"
                                        label="卖家ID"
                                        width="120">
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </el-card>
                        </el-collapse-transition>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    data(){
        return {
            showAllFeeds: true,
            feedsQuery: false,
            dealFeeds: false,
            returnOrders: false,
            IDqueryForfeeds: [], 
            feedbacks: [],
            allFeeds: [],
            feedID: '',
            allReturnOrders: [],
            solution: {},

        }
    },
    methods: {
        getAllFeeds(){
            this.allFeeds = []
            let self = this;
            $.ajax({
                crossDomain: true,
                // xhrFields: {
                //     withCredentials: true
                // },
                dataType: "json",
                data: JSON.stringify({
                    userName: "buyer",
                    passWord: "buyer"
                }),
                contentType: "application/json;charset=UTF-8",
                url: "http://10.60.43.111:16666/getFeeds",
                type: "post",
                success: function(data) {
                    var i
                    for (i in data) {
                        var j
                        for(j in data[i]){
                            var temp = {feedID:'',
                                        feedbackName: '',
                                        solved: '',
                                        feedbackAdvice: '',
                                        checkerID: '',
                                        solution: '',
                                        userID: '',
                                        phone: ''}
                            temp.feedID = data[i][j].ID
                            temp.feedbackName = data[i][j].FEEDBACK_NAME
                            temp.solved = data[i][j].SOLVED
                            temp.feedbackAdvice = data[i][j].FEEDBACK_ADVICE
                            temp.checkerID = data[i][j].BACK_CHECKER_NAME
                            temp.solution = data[i][j].SOLUTION
                            temp.userID = data[i][j].USER_NAME
                            temp.phone = data[i][j].PHONE
                            self.allFeeds.push(temp)
                        }
                    }
                }
            });
        },
        admitSolutions(){
            let self = this;
            $.ajax({
                crossDomain: true,
                // xhrFields: {
                //     withCredentials: true
                // },
                dataType: "json",
                data: JSON.stringify({
                    id: self.solution.ID,
                    solution: self.solution.description,
                    backCheckerId: "1",
                }),
                contentType: "application/json;charset=UTF-8",
                url: "http://10.60.43.111:16666/dealFeedback",
                type: "post",
                success: function(data) {
                    self.$message({
                        message: data.data,
                        type: 'success'
                    })
                }
            });
        },
        queryForFeed(){
            this.IDqueryForfeeds = []
            let self = this;
            $.ajax({
                crossDomain: true,
                // xhrFields: {
                //     withCredentials: true
                // },
                dataType: "json",
                data: JSON.stringify({
                    id: self.feedID,
                }),
                contentType: "application/json;charset=UTF-8",
                url: "http://10.60.43.111:16666/getFeedbackInfo",
                type: "post",
                success: function(data) {
                    console.log(data)
                    var i
                    for (i in data) {
                        console.log(data[i])
                        var j
                        for(j in data[i]){
                            var temp = {feedID:'',
                                        feedbackName: '',
                                        solved: '',
                                        feedbackAdvice: '',
                                        checkerID: '',
                                        solution: '',
                                        userID: '',
                                        phone: ''}
                            temp.feedID = data[i][j].ID
                            temp.feedbackName = data[i][j].FEEDBACK_NAME
                            temp.solved = data[i][j].SOLVED
                            temp.feedbackAdvice = data[i][j].FEEDBACK_ADVICE
                            temp.checkerID = data[i][j].BACK_CHECKER_NAME
                            temp.solution = data[i][j].SOLUTION
                            temp.userID = data[i][j].USER_NAME
                            temp.phone = data[i][j].PHONE
                            self.IDqueryForfeeds.push(temp)
                        }
                    }
                }
            });
        },
        clickMenuAt(index){
            if (index=="1") {
                this.showAllFeeds = true
                this.feedsQuery = false
                this.dealFeeds = false
                this.returnOrders = false
                this.getAllFeeds()
            }
            else if (index=="2") {
                this.showAllFeeds = false
                this.feedsQuery = true
                this.dealFeeds = false
                this.returnOrders = false
            }
            else if (index=="3") {
                this.showAllFeeds = false
                this.feedsQuery = false
                this.dealFeeds = true
                this.returnOrders = false
            }
            else if (index=='4') {
                this.showAllFeeds = false
                this.feedsQuery = false
                this.dealFeeds = false
                this.returnOrders = true
                this.queryForReturn()
            }
        },
        queryForReturn(){
            this.allReturnOrders = []
            let self = this;
            $.ajax({
                crossDomain: true,
                // xhrFields: {
                //     withCredentials: true
                // },
                dataType: "json",
                data: JSON.stringify({
                    userName: "buyer",
                    passWord: "buyer"
                }),
                contentType: "application/json;charset=UTF-8",
                url: "http://10.60.43.111:16666/getReturnOrders",
                type: "post",
                success: function(data) {
                    var i
                    for (i in data) {
                        var j
                        for(j in data[i]){
                            var temp = {orderID:'',
                                        orderTitle: '',
                                        orderState: '',
                                        orderDescrip: '',
                                        createTime: '',
                                        address: '',
                                        buyerID: ''}
                            temp.orderID = data[i][j].ID
                            temp.orderTitle = data[i][j].TITLE
                            temp.orderState = data[i][j].STATE
                            temp.orderDescrip = data[i][j].DESCRIPTION
                            temp.createTime = data[i][j].CREATE_TIME
                            temp.address = data[i][j].ADDRESS
                            temp.buyerID = data[i][j].USER_NAME
                            console.log(temp)
                            self.allReturnOrders.push(temp)
                        }
                    }
                }
            });
        }
    },
    mounted() {
        this.getAllFeeds()
    }
  
}
</script>

<style>

</style>


