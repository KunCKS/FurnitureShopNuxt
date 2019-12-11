import Vue from 'vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import VeeValidate from 'vee-validate'
import VueI18n from 'vue-i18n'
import zhTW from 'vee-validate/dist/locale/zh_TW'
import axios from 'axios'
axios.defaults.withCredentials = true
Vue.use(VueI18n)
Vue.component('loading', Loading)
// vee - validate;
const i18n = new VueI18n({
  locale: 'zhTW'
})
Vue.use(VeeValidate, {
  i18n,
  dictionary: {
    zhTW
  }
})
// 由於 Nuxt 在打包的時候會將放在 plugins 一起打包進去 server，那麼就會導致某些外掛是不能正常運作(因為要取得 window)
// 要解決這個方式就是要讓 Nuxt 在打包的時候，不要將套件打包進去 server，那麼解決方式很簡單只需要以下語法就可以解決了
if (process.client) {
  require('bootstrap')
  require('jquery')
  require('vue-carousel')
}
