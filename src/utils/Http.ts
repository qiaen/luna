/** 接口请求统一封装 */
let axios = (window as any).axios
/** 允许的方法 */
type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'
export default class Http {
	static ask(method: Method, url: string, data: any) {
		const payload = ['GET'].includes(method) ? 'params' : 'data'
		return axios({
			method,
			url,
			[payload]: data
		}).then((res: any) => {
			if (res) {
				return res.data
			} else {
				Promise.reject(new Error())
			}
		}).catch((err: any) => {
			Promise.reject(err)
		})
	}
}
