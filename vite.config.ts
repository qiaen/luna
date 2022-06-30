import vue from '@vitejs/plugin-vue'
// import importToCDN from 'vite-plugin-cdn-import'
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
		VueSetupExtend(),
		// importToCDN({
		// 	modules: [
		// 		{
		// 			name: 'vue',
		// 			var: 'Vue',
		// 			path: `https://cdn.bootcdn.net/ajax/libs/vue/3.2.33/vue.global.prod.js`,
		// 		},
		// 		{
        //             name: 'vue-demi',
        //             var: 'VueDemi',
        //             path: "https://cdn.bootcdn.net/ajax/libs/vue-demi/0.13.1/index.iife.min.js",
        //         },
		// 		// {
        //         //     name: 'element-plus',
        //         //     var: 'ElementPlus',
        //         //     path: 'https://cdn.bootcdn.net/ajax/libs/element-plus/2.2.6/index.full.min.js',
        //         //     css: 'https://cdn.bootcdn.net/ajax/libs/element-plus/2.2.6/theme-chalk/index.min.css',
        //         // },
        //         // {
        //         //     name: 'pinia',
        //         //     var: 'Pinia',
        //         //     path: 'dist/pinia.iife.min.js'
        //         // },
		// 		{
		// 			name: 'vuex',
		// 			var: 'Vuex',
		// 			path: `https://cdn.bootcdn.net/ajax/libs/vuex/4.0.2/vuex.global.prod.min.js`,
		// 		},
		// 		{
		// 			name: 'vue-router',
		// 			var: 'VueRouter',
		// 			path: `https://cdn.bootcdn.net/ajax/libs/vue-router/4.0.14/vue-router.global.prod.min.js`,
		// 		}
		// 	],
		// }),
		Components({
			resolvers: [
				ElementPlusResolver({
					importStyle: 'sass'
				})
			]
		})
	]
})
