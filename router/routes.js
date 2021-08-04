const routes = [
	{
		path: '/pages/index/index',
		name: 'Index',
		permission: ['获取简历信息'],
		component: () => import('@/pages/index/index')
	},
	{
		path: '/pages/login/login',
		name: 'Login',
		component: () => import('@/pages/login/login')
	},
	{
		path: '/pages/detail/detail',
		name: 'Detail',
		permission: ['获取简历信息'],
		component: () => import('@/pages/detail/detail')
	},
	{
		path: '/pages/signIn/signIn',
		name: 'SignIn',
		permission: ['签到'],
		component: () => import('@/pages/signIn/signIn')
	},
	{
		path: '/pages/appointment/appointment',
		name: 'Appointment',
		permission: ['预约面试'],
		component: () => import('@/pages/appointment/appointment')
	},
	{
		path: '/pages/analyse/analyse',
		name: 'Analyse',
		permission: ['查看评析', '评析'],
		component: () => import('@/pages/analyse/analyse')
	},
	{
		path: '/pages/edit/edit',
		name: 'Edit',
		permission: ['编辑简历'],
		component: () => import('@/pages/edit/edit')
	},
	{
		path: '/pages/apply/apply',
		name: 'Apply',
		component: () => import('@/pages/apply/apply')
	},
	{
		path: '/pages/internship/internship',
		name: 'Internship',
		component: () => import('@/pages/internship/internship')
	}
]

export default routes