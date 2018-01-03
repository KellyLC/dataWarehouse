<template>
    <div>
        <div>
            <div class="uk-card uk-card-default uk-card-body uk-width-1-2@m" id="login-box">
                    <div class="uk-grid-small uk-flex-middle" uk-grid>
                        <div class="uk-width-expand">
                            <h1 class="login-header" >一个销售系统</h1>
                            <h1 class="login-header" style="font-size: 36px; font-weight: 100; font-family: Helvetica Neue; margin-top:-10px; margin-bottom: 20px;">专卖电影票</h1>
                        </div>
                    </div>
                    <ul class="uk-child-width-expand" uk-tab>
                        <li class="uk-active"><a href="#username" data-toggle="tab" @click="tab(1)"><p>Login</p></a></li>
                        <li><a href="#register" data-toggle="tab" @click="tab(2)"><p>Register</p></a></li>
                    </ul>
                    <div id="myTabContent" class="tab-content">
                        <div v-show="login" class="tab-pane fade in active" id="username">
                            <div style="margin-top: 30px;">
                                <el-input prefix-icon="fa fa-user fa-fw" placeholder="Please enter your username" v-model="userName4Login" style="width: 480px">
                                </el-input>
                            </div>
                            <div style="margin-top: 30px; margin-bottom: 50px;">
                                <el-input prefix-icon="fa fa-key fa-fw" placeholder="Please enter your password" v-model="pwd4Username" style="width: 480px" type="password">
                                </el-input>
                            </div>
                            <div class="uk-card-footer">
                                 <el-button type="info" style="width: 480px; background: #424242 font-weight: 100" @click="loginOnUsername">Login</el-button>
                            </div>
                        </div>
                        <div v-show="reg" class="tab-pane fade" id="register">
                            <div style="margin-top: 30px;">
                                <el-input prefix-icon="fa fa-user fa-fw" placeholder="Please enter a new username" v-model="username4Reg" style="width: 480px">
                                </el-input>
                            </div>
                            <div style="margin-top: 30px; margin-bottom: 50px;">
                                <el-input prefix-icon="fa fa-key fa-fw" placeholder="Please enter your password" v-model="pwd4Reg" style="width: 480px" type="password">
                                </el-input>
                            </div>
                            <div style="margin-top: 30px; margin-bottom: 50px;">  
                                <el-radio v-model="roleToReg" label="seller">Seller</el-radio>
                                <el-radio v-model="roleToReg" label="buyer">Customer</el-radio>
                                <el-radio v-model="roleToReg" label="checker">Administrator</el-radio>
                            </div>
                            <div class="uk-card-footer">
                                 <el-button type="info" style="width: 480px; background: #424242 font-weight: 100" @click="register">Register</el-button>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    </div>
</template>

<script>
import buyer from './customer-query.vue'
import seller from './seller-query.vue'
import checker from './checker-query.vue'

export default {
  name: "login-register",
  data() {
    return {
      activeName: "second",
      userName4Login: "",
      pwd4Username: "",
      username4Reg: "",
      pwd4Reg: "",
      roleToReg: "",
      myLogin: this.isLogin,
      login: true,
      reg: false,
    };
  },
  props: ["isLogin"],
  components: {
      buyer,
      seller,
      checker,
  },
  methods: {
    tab(id){
        if (id=="1"){
            this.login = true;
            this.reg = false
        }else{
            this.login = false
            this.reg = true
        }
    },
    loginOnUsername() {
      let self = this;
      $.ajax({
        crossDomain: true,
        // xhrFields: {
        //   withCredentials: true
        // },
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        url: this.salesHeader + "/login",
        data: JSON.stringify({
          userName: this.userName4Login,
          passWord: this.pwd4Username
        }),
        type: "POST",
        success: function(data) {
          console.log(data);
          if (data.msg == "登录成功") {
            self.pwd4Username = "";
            self.userName4Login = "";
            if (data.role=="seller") {
                self.$emit("login-success", "seller");
            }else if (data.role=="buyer") {
                self.$emit("login-success", "buyer")
            }else if (data.role=="checker") {
                self.$emit ("login-success", "checker")
            }
          } else {
            self.pwd4Username = "";
            self.userName4Login = "";
            self.$message.error(data.error);
            return;
          }
        },
        error: function(data) {
          self.$message.error("网络错误！");
          return;
        }
      });

          
    },
    register() {
      if (this.roleToReg == '') {
          this.$message.error("需选定用户身份！");
      }else{
          let self = this;
          $.ajax({
          crossDomain: true,
        //   xhrFields: {
        //     withCredentials: true
        //   },
          dataType: "json",
          contentType: "application/json;charset=UTF-8",
          url: this.salesHeader + "/register",
          data: JSON.stringify({
            userName: this.username4Reg,
            passWord: this.pwd4Reg,
            role: this.roleToReg
          }),
          type: "POST",
          success: function(data) {
            if (data.rspCode == 200 && data.rspMsg == "操作成功") {
              console.log(data);
                self.username4Reg = "";
                self.pwd4Reg = "";
                self.$message({
                    message: "注册成功！",
                    type: success
                    });
            } else {
                self.$message.error(data.error);
                console.log(data)
                return;
            }
          },
          error: function(data) {
            self.$message.error("网络错误！");
            return;
          }
        }); 
      }
    },
    mounted () {
    }
  }
};
</script>

<style>
@import "../../node_modules/uikit/dist/css/uikit.min.css";
@import "../../node_modules/uikit/dist/css/uikit-rtl.min.css";
</style>

<style scoped>
body {
  background: #eeeeee;
}

.login-header {
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  color: #424242;
  text-align: center;
  font-size: 64px;
}

#login-box {
  margin: 0 auto;
  text-align: center;
  z-index: 10;
}

/*
CSS Reset
http://meyerweb.com/eric/tools/css/reset/
*/

* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

html,
body {
  width: 100%;
  height: 100%;
  /* overflow: hidden; */
}

#particles {
  position: absolute;
  top: 0px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #eeeeee;
}

p {
  margin: 0 0 30px 0;
  font-size: 20px;
}
  
</style>



