import messages from '@intlify/unplugin-vue-i18n/messages';
import { createPinia } from 'pinia';
import { createApp, markRaw } from 'vue';
import { createI18n } from 'vue-i18n';
import App from './App.vue';
import { privateClient } from './core/private_client';
import { publicClient } from './core/public_client';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import router from './router';
import { useSettingsStore } from './stores/home/account/settings';

loadFonts();
const app = createApp(App);
const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages,
});

const pinia = createPinia();
pinia.use(({ store }) => {
  store.router = markRaw(router);
  store.publicClient = markRaw(publicClient);
  store.privateClient = markRaw(privateClient);
});

app.use(i18n);
app.use(pinia);
app.use(router);
app.use(vuetify);

const settingsStore = useSettingsStore();
settingsStore.setup(i18n.global, vuetify.theme);

app.mount('#app');
