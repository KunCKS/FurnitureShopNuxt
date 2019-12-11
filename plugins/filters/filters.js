import Vue from 'vue'
import CurrencyFilter from './components/currency'
import CashSignFilter from './components/cash-sign'
import FormatTime from './components/format-time'
Vue.filter('currency', CurrencyFilter)
Vue.filter('cash-sign', CashSignFilter)
Vue.filter('formatTime', FormatTime)
