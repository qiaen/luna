import { language } from '@/store/Layout'
export const options: any = {
	花木兰: {
		en: 'HuaMuLan'
	},
	'后台管理系统模版Vue3+TS': {
		en: 'WMS Template Vue3+TS'
	},
	首页: {
		en: 'Home'
	},
	浅色主题: {
		en: 'Light mode'
	},
	深色主题: {
		en: 'Dark mode'
	},
	快捷设置: {
		en: 'Quick setting'
	},
	退出登录: {
		en: 'Log out'
	},
	用户名: {
		en: 'User name'
	},
	状态: {
		en: 'Status'
	},
	邮箱地址: {
		en: 'E-mail'
	},
	身份信息: {
		en: 'User identity'
	},
	创建时间: {
		en: 'Creation time'
	},
	开始时间: {
		en: 'Start time'
	},
	结束时间: {
		en: 'End time'
	},
	收起: {
		en: 'Fold'
	},
	展开: {
		en: 'Expand'
	},
	重置: {
		en: 'Reset'
	},
	查询: {
		en: 'Search'
	},
	新增: {
		en: 'Add'
	},
	编辑: {
		en: 'Edit'
	},
	删除: {
		en: 'Delete'
	},
	批量删除: {
		en: 'Batch remove'
	},
	全部: {
		en: 'All'
	},
	头像: {
		en: 'Avatar'
	},
	手机号: {
		en: 'All'
	},
	操作: {
		en: 'All'
	},
	是: {
		en: 'Y'
	},
	否: {
		en: 'N'
	},
	'初始化加载中....': {
		en: 'Initialize the loading....'
	}
}
export function $t(val: string) {
	let lv = language.value
	return options[val] ? options[val][lv] || val : val
}
