import Storage from '@/utils/Storage'
import { CurrentTab } from '../interface'
import { defineStore } from 'pinia'
import { ref, Ref } from 'vue'
export const useLayout = defineStore('layout', () => {
	/** 用户所有的菜单 */
	let menus: Ref<any[]> = ref([])
	/** 修改项目菜单 */
	function SetMenus(ms: any) {
		menus.value = ms
	}

	/**是否折叠，true：收起，false：展开 */
	let isCollapse = ref(!!Storage.get('DSMenuCollapse'))
	/** 菜单是否折叠 */
	function SetMenuCollapse() {
		isCollapse.value = !isCollapse.value
		Storage.set('DSMenuCollapse', isCollapse.value ? 1 : '')
	}

	/** 已打开的tab菜单, [{key:value}] */
	let menuTabs = ref([{ path: '/', label: 'Dashboard', icon: 'iconfont icon-dashboard' }])
	/* 缓存的页面地址 */
	let cachedViews = ref(['/'])
	/**当前需要展开的菜单, [value] */
	let defaultOpeneds: Ref<any[]> = ref([])
	/** 当前选中的tab */
	let currentTab: Ref<CurrentTab> = ref({ path: '', label: '' })
	/** 设定选中的tab */
	function SetCurrentTab(tab: any) {
		/** 在打开的tabs内找当前要选中的tab */
		let currt = menuTabs.value.find((item: any) => {
			return item.path === tab.path
		})
		// console.log(state, tab)
		// if(tab.path === '/work-order/list' || tab.path === '/work-order/form') return;
		if (currt) {
			// tabs内存在要打开的tab
			currentTab.value = currt
		} else {
			// 不存在则添加新的
			menuTabs.value.push(tab)
			currentTab.value = tab
			// 在要缓存的页面列表添加当前path，
			// keep-alive识别的是组件名称而非路由名称，页面缓存异常请检查页面name是否重复或未与对应的路由一致
			// 所以如果想要启用缓存只需要讲页面组件的name改成和路由地址不一致即可，相反一致的话会被缓存
			cachedViews.value.push(tab.path)
		}
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
	function RemoveTab(tab: any) {
		// tabs只有一个时不能删除/
		if (tab.path === '/' && menuTabs.value.length <= 1) {
			return Promise.reject('tabs只有一个时不能删除/')
		}
		// 在已打开的tabs中删除
		for (let [index, item] of menuTabs.value.entries()) {
			if (item.path === tab.path) {
				menuTabs.value.splice(index, 1)
				if (tab.path === currentTab.value.path) {
					break
				}
			}
		}
		// 在缓存的页面中删除
		let index = cachedViews.value.indexOf(tab.path)
		if (index > -1) {
			cachedViews.value.splice(index, 1)
		}
		return Promise.resolve()
	}
	/** 关闭所有，关闭其他tabs */
	function CloseTabs(type: string) {
		if (type === 'all') {
			menuTabs.value = [{ path: '/', label: 'Dashboard', icon: 'iconfont icon-dashboard' }]
			cachedViews.value = []
		}
		if (type === 'others') {
			menuTabs.value = menuTabs.value.filter((item: any) => item.path == currentTab.value.path)
			cachedViews.value = [currentTab.value.path]
		}
		return Promise.resolve()
	}

	return {
		/** 用户菜单 */
		menus,
		/** 修改项目菜单 */
		SetMenus,
		/**是否折叠，true：收起，false：展开 */
		isCollapse,
		/** 菜单是否折叠 */
		SetMenuCollapse,
		/** 当前选中的tab */
		currentTab,
		/** 已打开的tab菜单, [{key:value}] */
		menuTabs,
		/*
		 * 缓存的keep-alive页面name，不在此列则不缓存
		 * 注意：为了方便管理，这里的name采用的是path，所以组件命名也要用path
		 * [value]
		 **/
		cachedViews,
		/**当前需要展开的菜单, [value] */
		defaultOpeneds,
		/** 设定选中的tab */
		SetCurrentTab,
		/** 删除一个tab */
		RemoveTab,
		/** 关闭所有，关闭其他tabs */
		CloseTabs
	}
})
