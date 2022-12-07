import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import { BootstrapVue } from 'bootstrap-vue';
import { BootstrapVueIcons } from 'bootstrap-vue';
import NavbarComponent from '@/components/navbar-component.vue';
import vSelect from 'vue-select';
import './libs/validation-rules.js';

import Unicon from 'vue-unicons/dist/vue-unicons-vue2.umd';
import {
  uniCreateDashboard,
  uniDiary,
  uniPizzaSlice,
  uniUser,
  uniEditAlt,
  uniSave,
  uniPlus,
  uniPercentage,
  uniPlusCircle,
  uniTimes,
  uniSearch,
  uniWeight,
  uniTrophy,
  uniArrowDown,
} from 'vue-unicons/dist/icons';

Unicon.add([
  uniCreateDashboard,
  uniDiary,
  uniPizzaSlice,
  uniUser,
  uniEditAlt,
  uniSave,
  uniPlus,
  uniPercentage,
  uniPlusCircle,
  uniTimes,
  uniSearch,
  uniWeight,
  uniTrophy,
  uniArrowDown,
]);
Vue.use(Unicon, {});

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.component('navbar-component', NavbarComponent);
Vue.component('v-select', vSelect);

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import '@/styles/_custom.scss';

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
