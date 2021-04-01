import Vue from 'vue'
// import '@babel/polyfill'
import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import store from './store'

import i18n from './lang' // Internationalization
import './icons' // icon
import './errorLog' // error log
import './permission' // permission control
import '@/styles/index.scss' // global css
// import './mock' // simulation data
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

// 还要特别引入china.json，这样中国地图才会出现，不然只会出现右下角的南海诸岛
import china from 'echarts/map/json/china.json'
echarts.registerMap('china', china)

import * as filters from './filters' // 全局过滤器
// 使用时直接{{articleList.time| parseTime}}</span>
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
import install from './plugins'
Vue.use(install)
// import VueQuillEditor from 'vue-quill-editor'
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'
Vue.use(Element, { locale })
// Vue.use(VueQuillEditor)

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})
Vue.config.productionTip = false
import Workflow from '@/components/workflow/index.vue'
Vue.component('workflow', Workflow)
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
