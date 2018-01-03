<template>
    <div class="page">
        <el-container id="container">
            <el-header style="background-color:#505F7C ">
                <h1 style="color: white; test-align: left">Seller</h1>
            </el-header>
            <el-container>
                <el-aside style="border: 1px solid #eee">
                    <el-menu default-active="1" style="text-align: left; border: none">
                        <el-menu-item index="1" @click="clickMenuAt(1)">
                            <div slot="title">
                                <i class="el-icon-document"></i>
                                <span slot="title">查看所有订单</span>
                            </div> 
                        </el-menu-item>   
                        <el-menu-item index="2" @click="clickMenuAt(2)">
                            <div slot="title">
                                <i class="el-icon-search"></i>
                                <span slot="title">查询订单状态</span>
                            </div>
                        </el-menu-item>
                        <el-menu-item index="3" @click="clickMenuAt(3)">
                            <div slot="title">
                                <i class="el-icon-edit"></i>
                                <span slot="title">修改订单状态</span>
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
                            <el-card class="box-card" v-show="showAllOrders">
                                <div slot="header">
                                    <span>所有订单</span>
                                </div>
                                <div>
                                    <el-table 
                                        :data="allOrdersData"                                  
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
                        <el-collapse-transition>
                            <el-card class="box-card"  v-show="orderQuery">
                                <div slot="header">
                                    <span>查询订单状态</span>
                                    <div class="demo-input-suffix" style="width: 640px; margin: 20px auto">
                                        <el-input placeholder="请输入查询订单ID" v-model="orderQueryID" >
                                            <el-button slot="append" icon="el-icon-search" @click="queryForOrder"></el-button>
                                        </el-input>
                                    </div>
                                </div>
                                <div>
                                    <el-table 
                                        :data="orderForIDQuery"                                  
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
                                        width="100">
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </el-card>
                        </el-collapse-transition>
                        <el-collapse-transition>
                            <el-card class="box-card"  v-show="changeOrderState">
                                <div slot="header">
                                    <span>修改订单状态</span>
                                </div>
                                <div>
                                    <div style="margin: 20px;"></div>
                                    <el-form label-position="right" label-width="80px" :model="states">
                                    <el-form-item label="订单ID" style="width: 640px; margin: 20px auto">
                                        <el-input placeholder="请输入修改订单ID" v-model="states.changeStateID" ></el-input>
                                    </el-form-item>
                                    <el-form-item label="修改状态" style="width: 640px; margin: 20px auto">
                                        <el-input placeholder="请输入修改订单状态" v-model="states.state"></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="primary" @click="changeState">提交</el-button>
                                    </el-form-item>
                                    </el-form>
                                </div>
                            </el-card>
                        </el-collapse-transition>
                        <el-collapse-transition>
                            <el-card class="box-card" v-show="returnQuery">
                                <div slot="header">
                                    <span>查看退货订单</span>
                                </div>
                                <div>
                                    <el-table 
                                        :data="allreturnOrders"                                  
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

<script type="text/ecmascript-6">
export default {
    name: "seller-query",
    data() {
        return {
            showAllOrders: true,
            orderQuery: false,
            returnQuery: false,
            changeOrderState: false,
            orderQueryID: '',
            allOrdersData: [],
            allreturnOrders: [],
            allIDOrders: '',
            orderForIDQuery: [],
            states: {},
        }
    },
    methods: {
        changeState(){
            let self = this;
            $.ajax({
                crossDomain: true,
                // xhrFields: {
                //     withCredentials: true
                // },
                dataType: "json",
                data: JSON.stringify({
                    id: self.states.changeStateID,
                    state: self.states.state
                }),
                contentType: "application/json;charset=UTF-8",
                url: "http://10.60.43.111:16666/changeOrderState",
                type: "post",
                success: function(data) {
                    self.$message({
                        message: data.data,
                        type: 'success'
                    })
                }
            });
        },
        queryForReturn(){
            this.allreturnOrders = []
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
                    // console.log(data)
                    var i
                    for (i in data) {
                        console.log(data[i])
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
                            self.allreturnOrders.push(temp)
                        }
                    }
                }
            });
        },
        queryForOrder(){
            this.orderForIDQuery = []
            let self = this;
            $.ajax({
                crossDomain: true,
                // xhrFields: {
                //     withCredentials: true
                // },
                dataType: "json",
                data: JSON.stringify({
                    id: self.orderQueryID
                }),
                contentType: "application/json;charset=UTF-8",
                url: "http://10.60.43.111:16666/getOrderInfo",
                type: "post",
                success: function(data) {
                    console.log(data)
                    var i
                    for (i in data) {
                        console.log(data[i])
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
                            self.orderForIDQuery.push(temp)
                        }
                    }
                }
            });
        },
        clickMenuAt(index){
            if (index=="1") {
                this.showAllOrders = true
                this.orderQuery = false
                this.returnQuery = false
                this.changeOrderState = false
                this.getAllOrders()
            }
            else if (index=="2") {
                this.showAllOrders = false
                this.orderQuery = true
                this.returnQuery = false
                this.changeOrderState = false
            }
            else if (index=="3") {
                this.showAllOrders = false
                this.orderQuery = false
                this.changeOrderState = true
                this.returnQuery = false
            }
            else if (index == "4") {
                this.showAllOrders = false
                this.orderQuery = false
                this.changeOrderState = false
                this.returnQuery = true
                this.queryForReturn()
            }
        },
        login() {
            let self = this;
            $.ajax({
                crossDomain: true,
                // xhrFields: {
                //     withCredentials: true
                // },
                dataType: "json",
                contentType: "application/json;charset=UTF-8",
                url: "http://10.60.43.111:16666/register",
                data: JSON.stringify({
                userName: "seller",
                passWord: "seller",
                role: buyer
                }),
                type: "post",
                success: function(data) {
                if (data.rspCode == 200 && data.rspMsg == "操作成功") {
                    console.log(data);
                } else {
                    //   self.$message.error(data.rspMsg);
                    console.log(data);
                    return;
                }
                },
                error: function(data) {
                // self.$message.error("网络错误！");
                console.log(data);
                return;
                }
            });
        },
        getAllOrders() {
            this.allOrdersData = []
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
                url: "http://10.60.43.111:16666/getOrders",
                type: "post",
                success: function(data) {
                    // console.log(data)
                    var i
                    for (i in data) {
                        console.log(data[i])
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
                            self.allOrdersData.push(temp)
                        }
                    }
                }
            });
        }
    },
    mounted() {
        this.getAllOrders()
    }
};
</script>

<style>

</style>