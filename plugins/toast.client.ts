import type { PluginOptions } from 'vue-toastification'
import Toast from 'vue-toastification'
// Import the CSS or use your own!
import 'vue-toastification/dist/index.css'

const options: PluginOptions = {
  // You can set your default options here
  timeout: 2543,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.55,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: 'button',
  icon: true,
  rtl: false,
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, options)
})
