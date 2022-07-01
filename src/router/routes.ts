/** 注意，name要和组件内的name一致，用于路由缓存识别！！！ */ 
export default [
	{
		path: '/',
		name: '首页',
		component: () => import('@/views/layout/index.vue'),
		meta: {
			title: '首页'
		},
		children: [
			{
				path: '/403',
				name: '无权限',
				file: '/error/403.vue',
				component: () => import('@/views/error/403.vue'),
				meta: {
					title: '403',
					icon: 'iconfont icon-zidongqingli'
				}
			},
			{
				path: '/:pathMatch(.*)*',
				name: '404',
				file: '/error/404.vue',
				component: () => import('@/views/error/404.vue'),
				meta: {
					title: '404',
					icon: 'iconfont icon-zuoyeyaoqiu'
				}
			}
		]
	},
	{
		path: '/login',
		name: '登录',
		component: () => import(`@/views/login/index.vue`),
		meta: {
			title: 'login'
		}
	}
]
