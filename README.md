<h1><img height="52" src="https://user-content.gitlab-static.net/8ae8981a41b6b76e8fab9a3528e79364fb55664d/68747470733a2f2f6173736574732e6769746c61622d7374617469632e6e65742f75706c6f6164732f2d2f73797374656d2f70726f6a6563742f6176617461722f32353535303235342f64742d372e706e673f77696474683d323030"> 花木兰 - 后台管理系统模版</h1>

> 是一个基于Vue3+TS+Vite的前端系统管理框架，集成状态管理，动态路由，自主登录，权限控制，自定义主题，动态导入element组件等功能
>（注意：使用新组件需要重新执行`npm install`）

在线预览[http://mulan.diumx.com](http://mulan.diumx.com "http://mulan.diumx.com")

git仓库[https://github.com/qiaen/luna](https://github.com/qiaen/luna "https://github.com/qiaen/luna")
## Build Setup
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```
## 前置的几个原则
- 代码请务必遵守[JavaScript Standard Style 规范](https://standardjs.com/readme-zhcn.html "JavaScript Standard Style")，不用的包和变量务必删除，有必要的话可以采用eslint，代码自动格式化，养成良好的团队协作习惯
- 所有的js，api接口最好采用用到时加载，不用不加载的原则，比如select下拉选择，尽量在用户focus时加载，如果需要提前显示，可以手动拼装下拉选项
- 所有的加载，下载中务必增加loading状态，避免用户焦虑
- 所有的按钮尽量在loading时增加loading等待状态，且loading时禁用点击
- 共用的js，比如vue，vuex，axios尽量使用公司内部的cdn，大的包采用外链导入，外链导入可以优化打包速度和并行加载速度，其他优点这里不做展开

## 集成了自主登录，无需配置host，支持ip+端口号访问，方便开发阶段各个设备的兼容性测试
![现场保留](https://github.com/qiaen/static/blob/master/34783.png?raw=true "现场保留")

## 弹出层项目预览
![详情抽屉](https://github.com/qiaen/static/blob/master/9483.png?raw=true "详情抽屉")

## axios请求前置处理，请注意api接口配置是根据项目而定
```javascript
// 超时60秒
axios.defaults.timeout = 1000 * 60
axios.defaults.withCredentials = true
// 增加baseURL是为了省略在每个接口地址上添加/api
axios.defaults.baseURL = '/api'
axios.interceptors.request.use(
	config => {
		// 统一为请求接口增加token信息
		// 注意实际业务用到的method可能更复杂，这里需要增加逻辑判断
		if (config.method === 'get') {
			config.params = { ...(config.params || {}), token: Storage.get('token') }
		} else {
			config.data = { ...(config.data || {}), token: Storage.get('token') }
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)
```
## 接口错误，已对错误状态比如未授权，请求超时添加全局处理，如果有需要的话依然可以被catch捕捉到
```javascript
import { ElMessage } from "element-plus"
// 返回状态判断
axios.interceptors.response.use(
	response => {
		let res = response.data
		if (res.code === 401) {
			window.location.href = '#/login'
		}
		return response
	},
	error => {
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
// 如何捕获
DataSource.getList({
	keyword: this.params.keyword,
	pageNo: this.pageInfo.pageNo,
	pageSize: this.pageInfo.pageSize
}).then(res => {
	if (res.code == 0) {
		// 请求成功
	} else {
		this.$message.error(res.message)
	}
}).catch(err => {
	// 请求失败，axios统一拦截，并且传入错误消息
})
```
## 使用minxs混入全局data，methods，computed。常用的方法，请求加载中，主表放到data内，无需再在每个组件创建
```javascript
/** useMixins */
import { ref, reactive, computed } from 'vue'
import store from '../store/index'
/** 混入常用变量和方法，如分页相关方法，加载中，主表等 */
export default function setup(get: Function|void): object {
    /** 主表格数据，用来存放list数据 */
    let mainTable = ref([])
    /** 批量选择 */
    let mainSelected = ref([])
    /** 主表复选项变动 */
    function mainSelectionChange(rows: array) {
        mainSelected.value = rows
    }
    // let store = useStore()
    /** 表单分页信息, pageNo: 页码, total: 总数, pageSize: 每页数量, layout: 总数, layout: 支持功能, sizes: 可选分页*/
    let pageInfo = reactive( {
        // 当前查看的页码
        pageNo: 1,
        // 表总数量
        total: 0,
        // 每页数量，默认20
        pageSize: 20,
        // 分页组件支持的功能
        layout: 'total, sizes, prev, pager, next, jumper',
        // 可选择的分页数下拉选项
        sizes: [20, 50, 100, 200]
    })
    /** 主 加载中 */
    let xoading = ref(false)
    /** 初始化数据，重置页面为1，然后调用入参数get方法 */
    function init() {
        pageInfo.pageNo = 1
        get && get()
    }
    /** 每页数量变动，初始化到第一页开始加载 */
    function sizeChange(val: number) {
        pageInfo.pageNo = 1
        pageInfo.pageSize = val
        init()
    }
    /** 切换页码 */
    function pageChange(val: number) {
        pageInfo.pageNo = val
        get && get()
    }
    /** 接口枚举 */
    const serviceEnum: array = computed(() => store.getters.serviceEnum)
    /** 匹配枚举 返回label  this.matchEnum('PULL_INCRE_TYPE', 'day_all') */
    function matchEnum(type: string, key: string) {
        let enums = serviceEnum.value[type]
        let MN = ''
        if (enums) {
            for (let {name, value} of enums) {
                if (value == key) {
                    MN = name
                    break
                }
            }
        }
        return MN
    }
    
    return {
        mainTable,
        mainSelected,
        mainSelectionChange,
        pageInfo,
        sizeChange,
        pageChange,
        init,
        xoading,
        serviceEnum,
        matchEnum
    }
}
// views/data-source.vue
// 用到则引入
import useMixins from '@utils/Mixins'
export default {
	name: '/datasource',
	setup() {

		const Mx: any = useMixins()
		return {
			...Mx
		}
		// 或者按需要导入方法
		const { xoading, init } = useMixins()
		return {
			xoading,
			init
		}
	}
}
```

**其他功能请在启动后查看，这里不做具体解释。**
&copy;TEEMO. 2022

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
