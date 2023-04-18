import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

//引入vueuse/motion
import { MotionPlugin } from '@vueuse/motion'
//引入pinia 全局状态管理
import pinia from './store';
//引入路由
import router from './router';
//引入组件 element plus
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
//引入Remix Icon样式
import 'remixicon/fonts/remixicon.css'

//引入国际化
import i18n from '@/lang'


createApp(App).use(router).use(pinia).use(MotionPlugin).use(i18n).use(ElementPlus).mount('#app')