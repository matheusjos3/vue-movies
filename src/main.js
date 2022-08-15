import { createApp } from 'vue'
import PhosphorVue from 'phosphor-vue'
import App from './App.vue';
import router from './router';

const app = createApp(App);
app.use(PhosphorVue);
app.use(router);
app.mount("#app");
// createApp(App).mount('#app')
