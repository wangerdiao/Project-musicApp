//封装一个插件，插件里面使用vant组件库 例如：app.use(button)
// 1. 引入你需要的组件
import { Button, Swipe, SwipeItem } from 'vant'; //按需引入
// 2. 引入组件样式
import 'vant/lib/index.css';
const plugins = [
    Button, Swipe, SwipeItem
]
export function getVantPlugins(app) {
    plugins.forEach(item => {
        return app.use(item)
    })

}