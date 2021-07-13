import Vue from "vue";
import App from "./App.vue";
import store from "./store";

const io = require("socket.io-client");
const socket = io("http://localhost:3000");

Vue.config.productionTip = false;
window.socket = socket;

new Vue({
    store,
    render: h => h(App)
}).$mount("#app");
