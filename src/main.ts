import { createApp } from 'vue'
import router from './router/'
import App from './App.vue'
import './assets/css/base.scss'
// 安装自定义组件
import components from './components/'
// 安装自定义指令
import directives from './directives/'
const app = createApp(App)
app.use(router).use(components).use(directives)
app.mount('#app')
