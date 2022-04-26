import vue from '@vitejs/plugin-vue'
/** 拓展 set，可以直接使用 naame */
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'

const base: any = {
	isProd: process.env.NODE_ENV === 'production',
	/** 项目页面title */
	name: '花木兰 - 后台管理系统',
	/** 目标接口域名 */
	target: 'https://mulan.diumx.com'
}

export default defineConfig({
	server: {
		host: process.env.HOST,
		open: false,
		proxy: {
			// 项目接口
			'/api': {
				target: base.target,
				changeOrigin: true,
				rewrite: path => path.replace(/^\/api/, '/api'),
				cookieDomainRewrite: ''
			}
		}
	},
	plugins: [vue(), VueSetupExtend()],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	}
})
