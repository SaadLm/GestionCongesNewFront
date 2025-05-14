import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import "./assets/css/style.css";
import ArgonDashboard from "./argon-dashboard";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap-vue/dist/bootstrap-vue.css'








const appInstance = createApp(App);
appInstance.use(store);
appInstance.use(router);
appInstance.use(ArgonDashboard);
appInstance.mount("#app");
