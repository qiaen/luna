import { ElMessage } from 'element-plus'
import { downloadBlob } from '@/utils/Public'
import Storage from '@/utils/Storage'
/** axios 通过cdn引入 */
const AxIns = window.axios.create({
	baseURL: '/api',
	/** 超时时间 3 分钟 */
	timeout: 1000 * 60 * 3,
	withCredentials: true,
	headers: { appId: import.meta.env.VITE_APPID }
})
/** 处理headers */
AxIns.interceptors.request.use(
	(config: any) => {
		// 统一为请求接口增加token信息
		// 注意实际业务用到的method可能更复杂，这里需要增加逻辑判断
		if (config.method === 'get') {
			config.params = { ...(config.params || {}), token: Storage.get('token') }
		} else {
			config.data = { ...(config.data || {}), token: Storage.get('token') }
		}
		return config
	},
	(error: Error) => {
		return Promise.reject(error)
	}
)

/** 返回状态判断 */
AxIns.interceptors.response.use(
	(response: any) => {
		let res = response.data
		if (res.code == 401) {
			window.location.href = '/login'
		}
		/** 后端返回的是字节流，自动下载，使用方式可以参考 【 downloadFileByUrl 】的 responseType 配置 */
		if (response.request.responseType === 'blob') {
			let name = response.headers['content-disposition'] || response.config.headers.feFileName
			downloadBlob(response.data, name.replace('attachment;filename=', ''))
			return response
		}
		/** 前端开发可以决定这个接口出错时要不要弹出统一的错误通知，使用方式可以参考【 messageIsSilent 】 */
		if (res.code !== 200 && !response.config.headers.feSilent) {
			ElMessage({ type: 'error', message: res.message || '未知异常，请稍后重试 ~' })
		}
		return response
	},
	(error: Error) => {
		console.log('------ Request Error ------')
		console.log(error)
		let msg = error.message
		if (msg.indexOf('timeout') > -1) {
			ElMessage({ type: 'error', duration: 0, showClose: true, message: `请求超时，请稍后重试～` })
		} else {
			ElMessage({ type: 'error', message: msg })
		}
		return Promise.reject(error)
	}
)
export default AxIns
