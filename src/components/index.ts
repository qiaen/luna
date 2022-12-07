import type { Component } from 'vue'

import Sline from './sline.vue'
import Drawer from './drawer.vue'
import Filters from './filters.vue'

/** 自定义组件，已安装：sline, drawer */
const components: { [prop: string]: Component } = {
	Sline,
	Drawer,
	Filters
}

export default components
