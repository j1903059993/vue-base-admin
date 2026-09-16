import { createApp } from 'vue'
import 'ant-design-vue/dist/reset.css'
import './styles/index.css'
import App from './App.vue'
import router from './router'
import { pinia } from './stores'
import { useSettingsStore } from './stores/settings'

const app = createApp(App)
app.use(pinia)
useSettingsStore(pinia).applyTheme()
app.use(router)
app.mount('#app')
