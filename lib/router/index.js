import Vue from '../../web_modules/vue/dist/vue.esm.browser.js'
import VueRouter from '../../web_modules/vue-router/dist/vue-router.esm.browser.js'
import httpVueLoader from '../../web_modules/http-vue-loader/src/httpVueLoader.js'
const Home = httpVueLoader('./pages/Home.vue')

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
  
]

const router = new VueRouter({
  routes
})

export default router