import * as Base from '@/api/Base'
import Storage from '@/utils/Storage'
/** 用户信息 */
export let userInfo: any = ref({})
/** 用户角色 */
/** 用户权限码 */
export let permission: any = ref([])
/** 获取用户信息 */
export async function GetUserInfo() {
	let [data] = await Base.getUserInfo()
	if (data) {
		let { permission: pm } = data
		userInfo.value = data
		permission.value = pm
		Storage.set('userInfo', data)
	}
	return data
}

/** 退出登陆，如果是在404，403页面退出，就跳转到首页，其他的则停留当前页面刷新 */
export async function Logout() {
	Storage.clear('token')
	let { pathname, origin } = window.location
	if (['/403', '/404'].includes(pathname)) {
		window.location.href = origin
	} else {
		window.location.reload()
	}
}
