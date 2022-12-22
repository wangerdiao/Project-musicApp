import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {getVantPlugins} from './plugins'
const app = createApp(App)
getVantPlugins(app) //使用封装的vant组件函数
app.use(store)
app.use(router)
app.mount('#app')
