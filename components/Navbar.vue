<template>
  <nav
    id="header-navbar"
    class="navbar navbar-expand-md navbar-light index-navBar negative-row-margin"
  >
    <div @click="dropdownToggle" class="cart-overlay" />
    <a
      id="menuBtnInNavBar"
      @click.prevent="flyoutShown"
      href="#"
      class="menuBtn position-absolute d-md-none"
    >
      <div class="btnBar" />
      <div class="btnBar" />
      <div class="btnBar" />
    </a>
    <nuxt-link class="p-0 mx-md-0 ml-6" to="/">
      <img src="../assets/Logo.svg" style="width:80px" alt >
    </nuxt-link>
    <div id="navbarSupportedContent" class="collapse navbar-collapse">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item mr-2">
          <nuxt-link class="nav-link" to="/products">
            商品
          </nuxt-link>
        </li>
        <li class="nav-item mr-2">
          <nuxt-link class="nav-link" to="/promotion">
            最新消息
          </nuxt-link>
        </li>
        <li class="nav-item mr-2">
          <nuxt-link class="nav-link" to="/contact">
            門市位置
          </nuxt-link>
        </li>
        <li class="nav-item dropdown mr-2">
          <a
            href="#"
            class="nav-link dropdown-toggle"
            role="button"
            data-toggle="dropdown"
          >查詢訂單</a>
          <!-- 查詢訂單隱藏的 menu -->
          <div class="dropdown-menu px-2 shadow">
            <div class="input-group input-group-sm">
              <input
                v-model="order_id"
                type="text"
                class="form-control border"
                placeholder="訂單編號"
              >
              <div class="input-group-append">
                <button
                  id="button-addon2"
                  @click.prevent="toOrder"
                  class="btn btn-outline-secondary"
                  type="button"
                >
                  送出
                </button>
              </div>
            </div>
          </div>
        </li>
        <li v-if="isSignedIn" class="nav-item mr-2 d-none">
          <a @click.prevent="signout" href="#" class="nav-link">會員登出</a>
        </li>
        <li v-if="!isSignedIn" class="nav-item mr-2 d-none">
          <nuxt-link class="nav-link" to="/login">
            會員登入
          </nuxt-link>
        </li>
      </ul>
    </div>
    <div class="dropdown ml-auto mr-md-0 mr-3">
      <a
        @click="dropdownToggle"
        href="#"
        class="nav-link navBar-cart-icon cart-dropdown"
      >
        <i class="fas fa-shopping-bag" />
        <span
          v-if="cartData.carts"
          class="badge badge-danger rounded-circle navBar-cart-totalItems"
        >{{ cartData.carts.length }}</span>
      </a>
      <!-- 購物車隱藏的 menu -->
      <div class="cart-dropdown-menu px-3 shadow rounded">
        <h6 class="text-primary">
          已選擇商品
        </h6>
        <div class="table-scroll">
          <div v-if="cartData.carts.length < 1" class="text-center py-6">
            購物車沒有產品喔！！
          </div>
          <table class="table table-sm">
            <tbody>
              <tr v-for="item in cartData.carts" :key="item.id">
                <td class="align-middle">
                  <button
                    @click="removeCartItem(item.id)"
                    type="button"
                    class="btn btn-outline-danger btn-sm border-0"
                  >
                    <i v-if="product_id !== item.id" class="far fa-trash-alt" />
                    <i
                      v-if="product_id === item.id"
                      class="fas fa-spinner fa-spin"
                    />
                  </button>
                </td>
                <td class="align-middle">
                  <div
                    :style="
                      `background-image:url('${item.product.imageUrl}');width:35px;height:35px`
                    "
                    class="bg-cover"
                  />
                </td>
                <td class="align-middle">
                  <div class="text-muted">
                    <div class="cart-title">
                      {{ item.product.title }}
                    </div>
                    <div class="cart-unit text-primary">
                      {{ item.qty }}/{{ item.product.unit }}
                    </div>
                  </div>
                </td>
                <td class="align-middle text-right">
                  <span class="text-success cart-price">{{
                    item.product.price | currency
                  }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          class="d-flex justify-content-between align-items-center pt-2 px-2 pb-2 border-top border-bottom"
        >
          <span>小計</span>
          <span class="h5 m-0 text-success">{{
            cartData.total | currency
          }}</span>
        </div>
        <a
          @click="toCart"
          href="#"
          class="btn btn-block btn-outline-primary mt-2"
        >結帳去</a>
      </div>
    </div>
  </nav>
</template>

<script>
import $ from 'jquery'
import axios from 'axios'
export default {
  data () {
    return {
      // 利用eventBus來變換值，作為頁面登入登出文字顯示的判斷
      order_id: '' // 綁定查詢訂單時輸入的資料
    }
  },
  computed: {
    cartData () {
      // const cartData = {
      //   carts: []
      // }
      // return cartData
      return this.$store.state.cartData
    },
    isSignedIn () {
      // return true
      return this.$store.state.isSignedIn
    },
    product_id () {
      // return '356677822'
      return this.$store.state.product_id
    }
  },
  created () {
    this.$store.dispatch('getCartData') // 取得購物車的資料
  },
  methods: {
    // 登出功能
    signout () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/logout`
      axios.post(api).then((response) => {
        const message = response.data.message
        vm.$store.dispatch('updateMessage', { message })
        vm.$store.dispatch('updateSignIn', false)
        vm.$router.push('/home')
      })
    },
    // 購物車內移除項目的功能
    removeCartItem (id) {
      this.$store.dispatch('removeCartItem', id)
    },
    // 查詢訂單功能
    toOrder () {
      this.$router.push(`/customercheckout/${this.order_id}`)
      this.order_id = ''
    },
    // 動態切換購物車 menu等 ClassName，相關樣式內容參考navBar.scss
    dropdownToggle () {
      // console.log($(".dropdown-toggle"));
      $('.cart-dropdown-menu').toggleClass('show')
      $('body').toggleClass('of-hidden')
      $('.cart-overlay').toggleClass('show')
    },
    // 結帳按鈕觸發時關閉購物車並導向結帳畫面
    toCart () {
      this.dropdownToggle()
      this.$router.push('/cart')
    },
    flyoutShown () {
      $('#menuBtnInNavBar').toggleClass('menuBtn-shown')
      $('#sideNav').toggleClass('show')
      // 點擊替換className達到sidebar動畫效果
    }
  }
  // scroll滑動數據
  // created() {
  //   let lastScrollY = 0;
  //   $(window).scroll(() => {
  //     console.log(scrollY, lastScrollY);
  //     if (scrollY < lastScrollY) {
  //       console.log("往上");
  //     } else {
  //       console.log("往下");
  //     }
  //     lastScrollY = scrollY;
  //   });
  // }
}
</script>
