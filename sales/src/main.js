import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import ECharts from 'vue-echarts/components/ECharts.vue'

Vue.use(ElementUI)
Vue.component('chart', ECharts)

new Vue({
    el: '#app',
    render: h => h(App)
})

//全局变量header
Vue.prototype.urlHeader = 'http://10.60.43.111:19999'