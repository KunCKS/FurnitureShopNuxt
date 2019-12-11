import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import $ from 'jquery'
// import router from '../router'
Vue.use(Vuex)
const createStore = () => {
  return new Vuex.Store({
    strict: true,
    state: {
      isLoading: false, // AJAX作業時loading過場動畫條件
      uploadCart: false, // 過場動圖條件
      product_id: '', // 作為商品加入購物車時的過場動圖條件
      isSignedIn: false, // 作為頁面登入登出文字顯示的判斷
      isPaid: false, // 作為是否已付款的條件變數
      isNew: false,
      productsData: [], // 商品資料
      productData: {
        // 取得單筆資料
        imageUrl: ''
      },
      pageProducts: [], // 分頁商品資料
      pagination: {}, // 分頁頁碼資料
      seriesList: [], // 利用function過濾出來的產品系列
      messages: [], // Alert訊息
      cartData: {
        carts: {
          0: { product: { imageUrl: '' } }
        }
      },
      orderData: { user: { email: '' } }
    },
    actions: {
      // --------前台---------
      updateLoading (context, status) {
        context.commit('LOADING', status)
      },
      uploadCart (context, status) {
        context.commit('UPLOADCART', status)
      },
      updateSignIn (context, status) {
        context.commit('SIGNIN', status)
      },
      // 取得商品資料
      getProductsData (context) {
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
        context.commit('LOADING', true)
        axios.get(api).then((response) => {
          // console.log('產品頁面取得資料：', response)
          context.commit('PRODUCTS', response.data.products)
          const series = response.data.products
            .map((item) => {
              return item.category_series
            })
            .filter((item, index, arr) => {
              return arr.indexOf(item) === index
            })
          // 關於 seriesList過濾，indexOf若直接item.category_series並與filter(item, index, arr)中arr每項資料做比對是會沒有結果的，
          // 所以要利用 map()將要過濾的資料先建立為新的陣列，再做 filter()
          series.unshift('所有') // 在陣列最前面加入新的data
          context.commit('SERIESLIST', series)
          context.commit('LOADING', false)
        })
      },
      // 取得單筆商品資料，利用$route.params來取得要做AJAX的目標
      getProductData (context, id) {
        context.commit('INITPRODUCT')
        // console.log(id)
        context.commit('LOADING', true)
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`
        axios.get(api).then((response) => {
          // console.log('取得單筆產品資料：', response)
          context.commit('PRODUCT', response.data.product)
          context.commit('LOADING', false)
        })
      },
      // 取得購物車資料
      getCartData (context) {
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
        axios.get(api).then((response) => {
          // console.log('取得購物車資料：', response)
          context.commit('CARTDATA', response.data.data)
        })
      },
      // 添加商品到購物車
      addCart (context, { id, qty = 1 }) {
        const addTarget = event.target
        $(addTarget).attr('disabled', true)
        // context.commit('UPLOADCART', true) // 作為購物車動態icon的開關條件
        context.commit('PRODUCT_ID', id) // 作為商品加入購物車時的過場動圖條件
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
        const item = {
          product_id: id,
          qty
        }
        axios.post(api, { data: item }).then((response) => {
          // console.log('加到購物車內：', response)
          const message = response.data.message
          if (response.data.success) {
            // context.commit('UPLOADCART', false) // 作為購物車動態icon的開關條件
            context.commit('PRODUCT_ID', null)
            $(addTarget).removeAttr('disabled')
            context.dispatch('updateMessage', { message }) // 回應購物車添加是否成功的訊息，參考 Alert.vue
            context.dispatch('getCartData') // 重新讀取購物車資料
          } else {
            // context.commit('UPLOADCART', false)
            context.commit('PRODUCT_ID', null)
            $(addTarget).removeAttr('disabled')
            context.dispatch('updateMessage', { message, status: 'danger' }) // 回應購物車添加是否成功的訊息，參考 Alert.vue
          }
        })
      },
      // 刪除購物車中的資料
      removeCartItem (context, id) {
        // 避免重複點擊，原本是在v-for渲染時為btn加上id再從這邊只掉id來disabled，現在用event.target會更簡潔
        if (event.target.nodeName === 'I') {
          $(event.target.parentElement).attr('disabled', true)
        } else {
          $(event.target).attr('disabled', true)
        }
        context.commit('PRODUCT_ID', id)
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
        axios.delete(api).then((response) => {
          // console.log("刪除購物車資料：", response);
          context.dispatch('getCartData') // 重新讀取購物車資料
        })
      },
      // 取得分頁資料
      getPagination (context, page = 1) {
        context.commit('LOADING', true)
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`
        axios.get(api).then((response) => {
          // console.log("取得pagination資料：", response);
          context.commit('PAGEPRODUCTS', response.data.products)
          context.commit('PAGINATION', response.data.pagination)
          // vm.pageProducts = response.data.products
          // vm.pagination = response.data.pagination
          context.commit('LOADING', false)
        })
      },
      // Alert 訊息
      updateMessage (context, { message, status = 'success' }) {
        const timestamp = Math.floor(new Date() / 1000)
        // console.log('Alert:', message, status)
        context.commit('MESSAGES', { message, status, timestamp })
        context.dispatch('removeMessageWithTiming', timestamp)
        // 執行定時清除訊息
      },
      removeMessage (context, num) {
        context.commit('REMOVEMESSAGE', num)
      },
      removeMessageWithTiming (context, timestamp) {
        // 在updateMessage()執行時，將新建立訊息的timestamp帶入到這邊，並與messages陣列中的物件作比對，若符合的則執行setTimeout()並清除。
        setTimeout(() => {
          context.commit('REMOVEMESSAGEWITHTIMING', timestamp)
        }, 5000)
      },
      // 使用coupon折扣
      useCoupon (context, CouponCode) {
        context.commit('LOADING', true)
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
        const code = { code: CouponCode }
        axios.post(api, { data: code }).then((response) => {
          // console.log("套用Coupon：", response);
          const message = response.data.message
          if (response.data.success) {
            context.commit('FINALTOTAL', response.data.data.final_total)
            context.dispatch('updateMessage', { message })
            context.commit('LOADING', false)
          } else {
            context.dispatch('updateMessage', { message, status: 'danger' })
            context.commit('LOADING', false)
          }
        })
      },
      // --------前台 END---------
      // 建立訂單資料並傳送
      createOrder (context, orderData) {
        $(event.target).attr('disabled', true) // 避免重複點擊
        context.commit('UPLOADCART', true)
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`
        const order = orderData
        axios.post(api, { data: order }).then((response) => {
          // console.log("建立訂單：", response);
          if (response.data.success) {
            context.dispatch('getCartData')
            this.$router.push(`/customercheckout/${response.data.orderId}`)
            context.commit('UPLOADCART', false)
            $(event.target).removeAttr('disabled')
          } else {
            context.commit('UPLOADCART', false)
            context.dispatch('updateMessage', {
              message: '訂單建立失敗，請洽客服人員',
              status: 'danger'
            })
            $(event.target).removeAttr('disabled')
          }
        })
      },
      // 取得訂單資料
      getOrderData (context, id) {
        context.dispatch('updateLoading', true)
        // const id = vm.$route.params.id // 利用route提供要帶入api的值
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${id}`
        axios.get(api).then((response) => {
          // console.log("取得訂單資料：", response);
          if (response.data.order == null) {
            context.dispatch('updateMessage', {
              message: '查無此訂單',
              status: 'warning'
            })
            this.$router.push('/home')
          } else {
            context.commit('ORDERDATA', response.data.order)
            context.commit('ISPAID', response.data.order.is_paid)
            context.dispatch('updateLoading', false)
          }
        })
      },
      // 確定付款功能
      checkout (context, id) {
        context.dispatch('updateLoading', true)
        $(event.target).addClass('disabled')
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${id}`
        axios.post(api).then((response) => {
          // console.log("結帳付款：", response);
          if (response.data.success) {
            context.commit('ISPAID', true)
            context.commit('LOADING', false)
          } else {
            context.dispatch('updateMessage', {
              message: '付款失敗',
              status: 'danger'
            })
            context.commit('LOADING', false)
          }
        })
      },
      // 登出
      signout (context) {
        const api = `${process.env.VUE_APP_APIPATH}/logout`
        axios.post(api).then((response) => {
          if (!response.data.success) {
            console.log('登出訊息:', response.data)
            const message = response.data.message
            context.dispatch('updateMessage', { message, status: 'danger' })
          } else {
            this.$router.push('/')
          }
        })
      },
      // 登入
      login (context, data) {
        context.commit('LOADING', true)
        const api = `${process.env.VUE_APP_APIPATH}/admin/signin`
        axios.post(api, data).then((response) => {
          console.log('登入訊息：', response.data.message)
          if (response.data.success) {
            context.commit('SIGNIN', true)
            context.commit('LOADING', false)
            this.$router.push('/admin/DashboardProducts')
          } else {
            context.commit('LOADING', false)
            const message = response.data.message
            context.dispatch('updateMessage', { message, status: 'danger' })
            // console.log("emit danger");
          }
        })
      },
      updateisNew (context, status) {
        context.commit('ISNEW', status)
      }
    },
    mutations: {
      // Status
      LOADING (state, status) {
        state.isLoading = status
      },
      UPLOADCART (state, status) {
        state.uploadCart = status
      },
      PRODUCT_ID (state, payload) {
        state.product_id = payload
      },
      SIGNIN (state, status) {
        state.isSignedIn = status
      },
      ISPAID (state, status) {
        state.isPaid = status
      },
      ISNEW (state, status) {
        state.isNew = status
      },
      // Data
      PRODUCTS (state, payload) {
        state.productsData = payload
      },
      PRODUCT (state, payload) {
        state.productData = payload
      },
      PAGEPRODUCTS (state, payload) {
        state.pageProducts = payload
      },
      PAGINATION (state, payload) {
        state.pagination = payload
      },
      INITPRODUCT (state) {
        state.productData = { imageUrl: '' }
      },
      SERIESLIST (state, payload) {
        state.seriesList = payload
      },
      MESSAGES (state, payload) {
        state.messages.push(payload)
      },
      REMOVEMESSAGEWITHTIMING (state, timestamp) {
        state.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            state.messages.splice(i, 1)
          }
        })
      },
      REMOVEMESSAGE (state, num) {
        state.messages.splice(num, 1)
      },
      CARTDATA (state, payload) {
        state.cartData = payload
      },
      FINALTOTAL (state, payload) {
        state.cartData.final_total = payload
      },
      ORDERDATA (state, payload) {
        state.orderData = payload
      }
    }
  })
}
export default createStore
