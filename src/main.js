import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia=createPinia()
pinia.use(piniaPluginPersistedstate)
import App from './App.vue'
import router from './router'

import vant from 'vant';
import 'vant/lib/index.css';
import { Uploader } from 'vant';
import { Form, Field, CellGroup } from 'vant'
import { Dialog } from 'vant';
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(vant)
app.use(Uploader)
app.use(Form);
app.use(Field);
app.use(CellGroup);
app.use(Dialog);

app.mount('#app')
