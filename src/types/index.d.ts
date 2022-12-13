export {}
/**
 * 注意
 * NT 是 New Trade 新内贸的简写，不同的项目，考虑到qiankun微服务，所以建议全局搜索然后换一下
 */
declare global {
	interface Window {
		/** 阿里 ali-oss cdn */
		OSS: any
		/** axios cdn */
		axios: any
		/** 是否需要登录 */
		LN_needAuth: boolean
		/** 设置主题 */
		setTheme: Function
	}
}
