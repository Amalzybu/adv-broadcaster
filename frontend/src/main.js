import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Skeleton from 'vue-loading-skeleton';
import VueSkeletonLoader from 'skeleton-loader-vue';

// Register the component globally
// Vue.component('vue-skeleton-loader', VueSkeletonLoader);


// callTest()

createApp(App).use(store).use(router).component('vue-skeleton-loader', VueSkeletonLoader).mount('#app')
