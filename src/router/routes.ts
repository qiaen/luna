import { $t } from '@/configs/language'
/** 注意，name要和组件内的name一致，用于路由缓存识别！！！ */ 
export default [
	{
		path: '/',
		name: $t('首页'),
		component: () => import('@/views/layout/index.vue'),
		meta: {
			title: $t('首页')
		},
		children: [
			{
				path: '/datasource/:id',
				name: '用户详情',
				component: () => import('@/views/data-source/index.vue'),
				meta: {
					menu: false
				}
			},
			{
				path: '/test',
				name: '测试页面',
				component: () => import('@/views/test/index.vue'),
				meta: {
					menu: false
				}
			},
			{
				path: '/403',
				name: '无权限',
				file: '/error/403.vue',
				component: () => import('@/views/error/403.vue'),
				meta: {
					title: '403',
					icon: 'iconfont icon-a-shengqifennushangxindaku-07'
				}
			},
			{
				path: '/:pathMatch(.*)*',
				name: '404',
				file: '/error/404.vue',
				component: () => import('@/views/error/404.vue'),
				meta: {
					title: '404',
					icon: 'iconfont icon-a-shengqifennushangxindaku-05'
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
	},
	{
		path: '/test',
		name: '测试',
		component: () => import(`@/views/test/index.vue`),
		meta: {
			title: '测试'
		}
	}
]
