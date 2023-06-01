import * as Base from '@/api/Base'
import localEnums from '@/configs/enums'
import Storage from '@/utils/Storage'

import { DictResponse } from './interface'
/** 全局字典，服务器获取 */
export let serviceEnum: any = ref({ ...localEnums, ...(Storage.get('AllEnums') || {}) })
/** 获取字典接口 */
async function Qe() {
	let [data]: DictResponse[][] = await Base.getAllEnum()
	if (data) {
		let n: any = {}
		if (data) {
			data.forEach(item => {
				n[item.type] = (item.dictList || []).map(({ name, code }) => ({ name, code }))
			})
		}
		serviceEnum.value = { ...serviceEnum.value, ...n }
		Storage.set('AllEnums', n)
		return Promise.resolve()
	} else {
		console.error('获取全局枚举信息失败！')
		/** 因为字典接口不是100%重要，所以暂时return成功，注意使用字典之前 用 xx || [] 或者 xx || {} 符号来catch异常 */
		return Promise.resolve(data)
	}
}
/** 获取全局字典 */
export async function GetAllEnum() {
	// 获取一次就不再获取，除非刷新
	let se = Storage.get('AllEnums')
	if (se) {
		setTimeout(() => {
			Qe()
		}, 3000)
		return Promise.resolve()
	}
	/** 等待 */
	return Qe()
}
