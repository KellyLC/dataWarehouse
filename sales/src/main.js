import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import Message from 'element-ui/lib/message'
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
// import VueCharts from 'vue-chartjs'

Vue.use(ElementUI)
Vue.use(Message)

new Vue({
    el: '#app',
    render: h => h(App)
})

// new Vue({
//     el: '#app',
//     template: '<App/>',
//     components: { App }
// })

//全局变量header
Vue.prototype.urlHeader = 'http://10.60.43.111:19999'
Vue.prototype.salesHeader = "http://10.60.43.111:16666"