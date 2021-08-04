import Vue from 'vue'
import App from './App'
import { router,RouterMount } from './router/index.js'
import store from '@/store/index.js'
Vue.config.productionTip = false
Vue.use(router)

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
// #ifdef H5
	RouterMount(app,router,'#app')
// #endif

// #ifndef H5
	app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif
// app.$mount(); 
