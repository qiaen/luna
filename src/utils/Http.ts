/** 接口请求统一封装 */
let axios = (window as any).axios
/** 允许的方法 */
type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'
export default class Http {
	static setPromise(method: Method, url: string, data: any) {
		return new Promise((resolve, reject) => {
			switch (method) {
				case 'GET':
					axios.get(url, {
						params: data
					}).then((res: any) => {
						if (res) {
							resolve(res.data)
						} else {
							reject(new Error())
						}
					}).catch((err: any) => {
						reject(err)
					})
					break
				case 'POST':
				case 'PUT':
					axios({
						method: method,
						url: url,
						data: data
					}).then((res: any) => {
						if (res) {
							resolve(res.data)
						} else {
							reject(new Error())
						}
					}).catch((err: any) => {
						reject(err)
					})
					break
				case 'DELETE':
					axios.delete(url, {
						data: data
					}).then((res: any) => {
						// 后台已RequestBody接收
						if (res) {
							resolve(res.data)
						} else {
							reject(new Error())
						}
					}).catch((err: any) => {
						reject(err)
					})
				break
			}
		})
	}
}
