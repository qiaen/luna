import { createApp } from 'vue'
import store from './store/'
import router from './router/'
import App from './App.vue'
import './assets/css/base.scss'
// axios请求相关前置，拦截，超时等预处理 
import './configs/axios'
// 安装自定义组件
import components from './components/'
// 安装自定义指令
import directives from './directives/'
const app = createApp(App)
app.use(store).use(router).use(components).use(directives)
app.mount('#app')
