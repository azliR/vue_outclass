import messages from '@intlify/unplugin-vue-i18n/messages';
import axios from 'axios';
import { createPinia } from 'pinia';
import { createApp, markRaw } from 'vue';
import { createI18n } from 'vue-i18n';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import router from './router';

loadFonts();
const app = createApp(App);
const i18n = createI18n({
  legacy: false,
  locale: 'id',
  messages,
});

const pinia = createPinia();
pinia.use(({ store }) => {
  store.router = markRaw(router);
  store.axios = markRaw(axios);
});

app.use(i18n);
app.use(pinia);
app.use(router);
app.use(vuetify);
app.mount('#app');
