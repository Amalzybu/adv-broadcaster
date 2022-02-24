import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


// Register the component globally
// Vue.component('vue-skeleton-loader', VueSkeletonLoader);


// callTest()

createApp(App).use(store).use(router).mount('#app')
