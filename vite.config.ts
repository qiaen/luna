import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
/** 按需自动引入element-plus，使用前不需要导入（命令式除外），节省资源
  * 官网教程：https://element-plus.gitee.io/zh-CN/guide/theming.html#%E5%A6%82%E4%BD%95%E8%A6%86%E7%9B%96%E5%AE%83%EF%BC%9F 
*/
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
/** 拓展 set，可以直接使用 name */
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

const base: any = {
	isProd: process.env.NODE_ENV === 'production',
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
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	},
	/** 自定义ui主题色 */
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@use "./src/assets/css/ui.scss";`
			}
		}
	},
	plugins: [
		vue(),
		Components({
			resolvers: [
				ElementPlusResolver({
					importStyle: 'sass'
				})
			]
		}),
		VueSetupExtend()
	],
	build: {
		minify: 'terser'
	}
})
