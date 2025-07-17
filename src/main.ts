import { createApp } from 'vue';
import './assets/index.css';
import App from './App.vue';
import 'iconify-icon';
import { plugin } from '@formkit/vue';
import config from '../formkit.config.ts';
import router from './router';
import { createMetaManager } from 'vue-meta';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(createMetaManager());
app.use(plugin, config);
app.mount('#app');
