import Vue from 'vue'
import App from './App.vue'
import { ethers } from "ethers";


Vue.use(ethers);
Vue.config.productionTip = false
Vue.prototype.$env = process.env

new Vue({
  render: h => h(App),
}).$mount('#app')
