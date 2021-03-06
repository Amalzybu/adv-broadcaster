import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' 


// Register the component globally
// Vue.component('vue-skeleton-loader', VueSkeletonLoader);


// callTest()

createApp(App).
use(store).
use(Vuesax).
use(router).
use(VueSweetalert2).
mount('#app')
