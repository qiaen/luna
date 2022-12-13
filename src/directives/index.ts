import { permission } from '@/store/Auth'
const Permission = (el: any, bind: any) => {
	if (permission.value && permission.value.length) {
		let hide = false
		/** 查找权限逻辑 */
		if (!permission.value.includes(bind.value)) {
			hide = true
		}
		if (hide) {
			el.style.display = 'none'
		}
	} else {
		el.style.display = 'none'
	}
}
/** 自定义指令，已安装: v-permission="12" */
export default {
	install(app: any) {
		app.directive('permission', Permission)
	}
}
