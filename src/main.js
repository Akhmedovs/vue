import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'

import en from "@/locales/en.json"
import ru from "@/locales/ru.json"
import ua from "@/locales/ua.json"

const messages = {
    en, 
    ru,
    ua,
};
const i18n = createI18n({
    locale: "en",
    messages,
})

import App from './App.vue'
import router from './router'


import '@/assets/scss/mixin.scss'
import '@/assets/scss/styles.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
