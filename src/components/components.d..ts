import Sline from './sline.vue'
import Drawer from './drawer.vue'
import Filters from './filters.vue'
/** id是用户的id，可以是number或者string */
declare module '@vue/runtime-core' {
	export interface GlobalComponents {
		/** 表头显示 */
		Sline: typeof Sline
		/** 右侧滑出弹窗 */
		Drawer: typeof Drawer
		/** 搜索条件筛选 */
		Filters: typeof Filters
	}
}
