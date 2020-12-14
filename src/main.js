import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import nativemod from "../native/index.node"
console.log(nativemod.hello())

Vue.config.productionTip = false
Vue.prototype.$native = nativemod
new Vue({
  router,
  render: function(h) {
    return h(App)
  },
}).$mount("#app")
