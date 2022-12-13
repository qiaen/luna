import { createRouter, createWebHistory } from 'vue-router'
import { ElLoading } from 'element-plus'

/** 静态菜单列表 */
import routes from './routes'
import { depthRoute } from './func'
/** 一次性导入多个store */
import { Auth, Layout } from '@/store'
/** 项目信息 */
const title = import.meta.env.VITE_TITLE

/** 免登陆可进入的页面(白名单) */
const whiteList = ['/login', '/403', '/404']
/** 全局加载 */
const loadingFun = (text = '初始化数据加载中...') => {
	return (ElLoading as any).service({
		lock: true,
		fullscreen: true,
		text
	})
}
window.LN_needAuth = true
const router = createRouter({
	history: createWebHistory(),
	routes
})
/** 每次路由变动开始，可以拦截，等待请求用户信息，获取权限，用户专属菜单等 */
router.beforeEach(async (to, from) => {
	// 不在白名单
	if (!whiteList.includes(to.path)) {
		/** 需要授权登录 */
		if (window.LN_needAuth) {
			console.log('verify the login information at initialization')
			/** 接口返回的用户信息 开始 */
			let res = await Auth.GetUserInfo()
			if (res) {
				window.LN_needAuth = false
				let { menus } = res
				/**  递归路由 */
				let temp = depthRoute(menus, [])
				routes[0].children = [...temp, ...(routes[0].children as any)]
				/** 添加（重写）动态路由 */
				await router.addRoute(routes[0])
				/** 生成菜单，排除不需要显示的菜单 */
				Layout.SetMenus(menus.filter((item: any) => !item.hideInmenu))
				/** 用户已经登录，在这里可以继续异步做登录后的事情，比如获取全局枚举等 */
				// await api.GetAllEnum()
				return { path: to.path }
			} else {
				// 需要登录，即获取用户信息时失败
				return {
					path: '/login'
				}
			}
		}
	}
})
/** 每次路由变动后：可以做页面分析等 */
router.afterEach((to: any) => {
	// 切换选中的tab，请查看layout/tabs.vue
	Layout.SetCurrentTab({
		label: to.name,
		path: to.path,
		icon: to.meta?.icon
	})
	let doc: any = document
	doc.title = to.name ? `${to.name} - ${title}` : `${title} - 后台管理系统模版Vue3+TS`
	/** 隐藏首次进入的loading */
	Layout.loading && Layout.hideLoading()
})

export default router
