import Storage from '@/utils/Storage'
import { CurrentTab } from './interface'
import { Ref } from 'vue'
import { ResetRoute } from '@/router/index'
/** 首次进入的loading */
export let loading = ref(true)
/** 隐藏loading */
export function hideLoading() {
	loading.value = false
}

/** 用户所有的菜单 */
export let menus: Ref<any[]> = ref([])
/** 修改项目菜单 */
export function SetMenus(ms: any) {
	menus.value = ms
}

/**是否折叠，true：收起，false：展开 */
export let isCollapse = ref(!!Storage.get('DSMenuCollapse'))
/** 菜单是否折叠 */
export function SetMenuCollapse() {
	isCollapse.value = !isCollapse.value
	Storage.set('DSMenuCollapse', isCollapse.value ? 1 : '')
}

/** 已打开的tab菜单, [{key:value}] */
export let menuTabs = ref([{ path: '/', label: 'Dashboard', icon: 'iconfont icon-dashboard' }])
/* 缓存的页面地址 */
export let cachedViews = ref(['/'])
/**当前需要展开的菜单, [value] */
export let defaultOpeneds: Ref<any[]> = ref([])
/** 当前选中的tab */
export let currentTab: Ref<CurrentTab> = ref({ path: '', label: '' })
/** 设定选中的tab */
export function SetCurrentTab(tab: any) {
	/** 在打开的tabs内找当前要选中的tab */
	let currt = menuTabs.value.find((item: any) => {
		return item.path === tab.path
	})
	if (!currt) {
		menuTabs.value.push(tab)
		// 在要缓存的页面列表添加当前path，
		// keep-alive识别的是组件名称而非路由名称，页面缓存异常请检查页面name是否重复或未与对应的路由一致
		// 所以如果想要启用缓存只需要讲页面组件的name改成和路由地址不一致即可，相反一致的话会被缓存
		cachedViews.value.push(tab.path)
	}
	currentTab.value = tab
	// 如果菜单未折叠，匹配menus拿到要展开的菜单
	if (isCollapse.value) {
		for (let item of menus.value) {
			if (item.child && item.child.length) {
				if (item.child.some((m: any) => m.path === tab.path)) {
					defaultOpeneds.value = [item.path]
					break
				}
			}
		}
	}
}
/** 删除一个tab */
export function RemoveTab(tab: any) {
	// tabs只有一个时不能删除/
	if (tab.path === '/' && menuTabs.value.length <= 1) {
		return Promise.reject('tabs只有一个时不能删除/')
	}
	// 在已打开的tabs中删除
	menuTabs.value = menuTabs.value.filter(item => item.path !== tab.path)
	// 在缓存的页面中删除
	cachedViews.value = menuTabs.value.map(item => item.path)
	return Promise.resolve()
}
/** 关闭所有，关闭其他tabs */
export function CloseTabs(type: string) {
	if (type === 'all') {
		menuTabs.value = [{ path: '/', label: 'Dashboard', icon: 'iconfont icon-dashboard' }]
		cachedViews.value = []
	}
	if (type === 'others') {
		menuTabs.value = menuTabs.value.filter((item: any) => item.path === currentTab.value.path)
		cachedViews.value = [currentTab.value.path]
	}
	return Promise.resolve()
}

/** 主题色 */
export let isDark = ref(localStorage.HML_isDark ? '1' : '0')
/** 主题变动 */
export function SetTheme() {
	isDark.value = isDark.value == '1' ? '0' : '1'
}
/** 用户语言 */
let l = Storage.get('Language')
export let language = ref(l ? l : 'zh')
/** 语言变动 */
export function SetLanguage(v: any) {
	language.value = v
	ResetRoute()
	Storage.set('Language', v)
}
