import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"

//引入cookies
import VueCookies from 'vue-cookies'
//引入element plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//我们使用sass 所以这里将base.css 改成base.scss
import '@/assets/base.scss'
//图标 图标在附件中
import '@/assets/icon/iconfont.css'
// 全局组件
import Dialog from "@/components/Dialog.vue"

const app = createApp(App)

app.use(router)
app.use(ElementPlus);
app.config.globalProperties.VueCookies = VueCookies;  // 全局cookie

app.config.globalProperties.globalInfo = {  // 全局常量
    bodyWidth: 1300,
}

app.component('Dialog', Dialog)

app.mount('#app')