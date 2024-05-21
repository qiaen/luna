/** 接口请求统一封装，导入axios实例，避免qiankun时多个cdn axios冲突 */
import axios from './Axios'
/** 允许的方法 */
type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'
/** 当code != 200 时，返回的是false
 *  当code == 200 时，返回的是后端的data，
 *  正常情况这个data是有值，如果的确没有data，只用data判断会有误，所以这时候用返回的第二个全量response做判断即可
 */
/** 后端接口返回的信息 */
interface Response<T> {
	/** 后端 状态码 */
	code: number
	/** 后端返回的实际数据 */
	data: T
	/** 信息，成功 / 错误提示语 */
	message: string,
	total?: number
}
/** others
 * 可以用来自定义信息，例如
 * { responseType: 'blob', headers : { headerInfo: 'hello word' } } */

export default class Http {
	static ask<T>(method: Method, url: string, data?: any, others: object = {}): Promise<[T, {
		code: number
		/** 后端返回的实际数据 */
		data: T
		/** 信息，成功 / 错误提示语 */
		message: string,
		total?: number
	}]> {
		const payload = ['GET'].includes(method) ? 'params' : 'data'
		return axios({
			method,
			url,
			[payload]: data,
			...others
		}).then((res: { data: Response<T>}) => {
			/** 这里的res.data是接口返回的实际数据 */
			let { code, data } = res.data
			/** 若业务代码内每次都判断code稍显麻烦，所以这里针对code为200，解构返回后端的data，同事保留第2个参数为全量的response信息 */
			return [code === 200 ? data : false, res.data]
		}).catch((err: any) => {
			/** 这里不要改成return Promise.reject()，如果改了可能照成失败后loading不会消失
			 * 想要判断是否成功，用xxx.then(res => ) res是false则失败
			 * 你的Promise.all都会被resolve，建议用用Array.find去自行判断 */
			return [false, err]
		})
	}
}
