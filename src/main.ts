import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import 'halfmoon'
import { plugin, defaultConfig } from '@formkit/vue'
import { Router } from './router'
import '@formkit/themes/genesis'

createApp(App).use(plugin, defaultConfig).use(Router).mount('#app')
