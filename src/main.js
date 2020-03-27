import Vue from 'vue'
import App from './App.vue'
import "@/assets/style/weibo.css"
import http from "@/common/http"
import filters from "@/filters/"
Vue.prototype.$http=http
for(let key in filters){
  Vue.filter(key,filters[key])
}
Vue.prototype.$bus=new Vue()
Vue.config.productionTip = false
new Vue({
  el:"#app",
  render:h=>h(App)
})