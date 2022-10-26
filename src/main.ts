import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { BootstrapVue } from "bootstrap-vue";
import { BootstrapVueIcons } from "bootstrap-vue";
import NavbarComponent from "@/components/navbar-component.vue";

import Unicon from "vue-unicons/dist/vue-unicons-vue2.umd";
import {
  uniCreateDashboard,
  uniDiary,
  uniPizzaSlice,
  uniUser,
} from "vue-unicons/dist/icons";

Unicon.add([uniCreateDashboard, uniDiary, uniPizzaSlice, uniUser]);
Vue.use(Unicon, {
  height: 32,
  width: 32,
});

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.component("navbar-component", NavbarComponent);

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "@/styles/_custom.scss";

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");