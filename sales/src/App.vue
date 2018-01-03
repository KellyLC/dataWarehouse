<template>
  <div id="app">
    <!-- <customer-query></customer-query> -->
    <!-- <seller-query></seller-query> -->
    <div v-if="isLogin">
      <component :is="view"></component>
    </div>
    <div v-else>
      <loginReg @login-success="loginSuccess"></loginReg>
    </div>
  </div>
</template>

<script>
  import buyer from './components/customer-query.vue'
  import seller from './components/seller-query.vue'
  import checker from './components/checker-query.vue'
  import loginReg from './components/login&register.vue'

  export default {
    methods: {},
    components: {
      buyer: buyer,
      seller: seller,
      checker: checker,
      loginReg: loginReg,
    },
    data() {
      return {
        isLogin: false,
        view: loginReg,
      }
    },
    methods: {
        loginSuccess(val) {
        this.isLogin = true
        if (val == "seller") {
          this.view = seller
        }
        else if(val == "buyer") {
          this.view = buyer
        }
        else if (val == "checker") {
          this.view = checker
        }
      },
    }
  }
</script>

<style>
  #app {
    font-family: Helvetica, sans-serif;
    text-align: center;
    overflow: hidden;
  }
</style>
