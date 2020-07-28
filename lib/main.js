let native = require("../native");
import Vue from "../web_modules/vue/dist/vue.esm.browser.js";
import httpVueLoader from "../web_modules/http-vue-loader/src/httpVueLoader.js";
import router from "./router/index.js";
const App = httpVueLoader("./App.vue");

Vue.config.productionTip = false;

new Vue({
    router,
    render: (h) =>
        h(App, {
            props: {
                native: native,
            },
        }),
}).$mount("#app");
