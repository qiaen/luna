import { App } from 'vue'
import Sline from './sline.vue'
import Drawer from './drawer.vue'
import Filters from './filters.vue'
import ZmUpload from './zm-upload/index.vue'

/** 自定义组件，已安装：sline, drawer */
export default {
    install: (app: App) => {
        app.component('sline', Sline)
        app.component('drawer', Drawer)
        app.component('filters', Filters)
		app.component('zm-upload', ZmUpload)
    }
}
