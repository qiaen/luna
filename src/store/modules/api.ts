// 用来全局调用和缓存接口信息
import * as Base from '@/api/Base'
import * as Code from '@/configs/code'
import Storage from '@/utils/Storage'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useApi = defineStore('api', () => {
	/** 用户信息 */
	let userInfo = ref({})
	/** 用户拥有的菜单 */
	let userMenu = ref([])
	/** 获取用户信息和菜单 */
	async function GetUserInfo() {
		return Base.getUserInfo({ appCode: Code.APPCODE })
			.then((res: any) => {
				if (res.code == 200) {
					userInfo.value = res.data
					userMenu.value = res.data.menu
					Storage.set('userInfo', res.data)
				}
				return Promise.resolve(res)
			})
			.catch((err: any) => {
				return Promise.reject(err)
			})
	}

	/** 全局字典，服务器获取 */
	let serviceEnum = ref({})
	/** 获取字典接口 */
	async function Qe() {
		let res = await Base.getAllEnum()
		if (res && res.code == 200) {
			serviceEnum.value = res.data			
			Storage.set('serviceEnum', res.data)
			return Promise.resolve(res)
		} else {
			console.error('获取全局枚举信息失败！')
			return Promise.reject(res)
		}
	}
	/** 获取全局字典 */
	async function GetAllEnum() {
		// 如果在本地找到枚举信息，直接先返回成功，但仍然会请求最新的枚举
		let se = Storage.get('serviceEnum')
		if (se) {
			/** 暂时先用本地，不需要等 */
			serviceEnum.value = se
			Qe()
			return Promise.resolve({ code: 200, data: se })
		}
		/** 等待 */
		return Qe()
	}
	return {
		/** 用户信息 */
		userInfo,
		/** 用户拥有的菜单 */
		userMenu,
		/** 获取用户信息和菜单 */
		GetUserInfo,
		/** 全局字典，服务器获取 */
		serviceEnum,
		/** 获取全局字典 */
		GetAllEnum
	}
})
