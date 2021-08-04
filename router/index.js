import Vue from 'vue'
import {RouterMount,createRouter} from 'uni-simple-router';
import appConfig from '../config/index.js'; 
import store from '../store/index.js';
import ROUTES from './routes.js';
import Util from '@/lin/util/util.js';

let isLoginRequired = routeName => {
	let { notLoginRoute } = appConfig
	if (Array.isArray(notLoginRoute)) {
		for (let i = 0; i < notLoginRoute.length; i++) {
			// console.log(notLoginRoute[i])
			// console.log(routeName)
			if (notLoginRoute[i] === routeName) {
				return false;
			}
		}
		return true;
	}
}

const router = createRouter({
	// h5: {
	// 	vueRouterDev:true
	// },
	platform: process.env.VUE_APP_PLATFORM,  
	routes: [...ROUTES]
});
//全局路由前置守卫
router.beforeEach((to, from, next) => {
	// console.log('isLogin:' + isLoginRequired(to.name))
	// console.log('storelogin:' + !store.state.logined)
	//登录验证
	// console.log(to.name)
	// console.log(isLoginRequired(to.name))
	if (isLoginRequired(to.name) && !store.state.logined) {
		next({ path: '/pages/login/login'});
		// console.log(1)
		return;
	}
	//权限验证
	if (store && store.state && store.getters) {
		const { permissions, user } = store.getters;
		// console.log(permissions)
		// console.log(user)
		// console.log(user.admin)
		// console.log(to)
		// console.log(to.permission)
		// console.log(!Util.hasPermission(permissions, to, user))
		// console.log(permissions.some(permission => to.permission.indexOf(permission) > -1))
		// if (to.path !== '/pages/index/index' && !Util.hasPermission(permissions, to, user)) {
		if (!Util.hasPermission(permissions, to, user)) {
			uni.navigateBack({
				delta: 1
			})
			uni.showToast({
				title: '您无此页面的权限哟'
			})
			return;
		}
	}
	
	// 路由发生变化重新计时
	//Vue.prototype.$_lin_jump()
	
	if (to.meta.title) {
		document.title = to.meta.title
	}
	next()
});
// 全局路由后置守卫
router.afterEach((to, from) => {
    // console.log('跳转结束')
})

export {
	router,
	RouterMount
}