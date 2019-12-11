<template>
  <div class="container-fluid pdPage section-full-height pb-9">
    <loading :active.sync="isLoading" />
    <div class="row mt-md-4">
      <!-- 商品圖片 section-->
      <div class="col-md-7">
        <div class="pdPage-imgSection">
          <div class="pdPage-img shadow-lg">
            <a @click.prevent="backward" href="#" class="backwardBtn">Back</a>
            <img :src="productData.imageUrl" class="w-100" alt >
          </div>
        </div>
      </div>
      <!-- 商品資訊 section-->
      <div class="col-md-5">
        <div class="pdPage-info px-4">
          <div class="pb-4 border-bottom">
            <h4 class="text-muted mt-2 mt-sm-0">
              {{ productData.category_series }}
            </h4>
            <h2 class>
              {{ productData.title }}
            </h2>
          </div>

          <div class="py-4">
            <h4>【商品介紹】</h4>
            <p class="mt-3">
              {{ productData.description }}
            </p>
          </div>
          <div class="py-4">
            <h4>【商品詳情】</h4>
            <div class="form-row justify-content-center mt-4">
              <div class="col-10">
                <table class="table">
                  <tbody>
                    <tr>
                      <th>高度:</th>
                      <td>{{ detail.height }} cm</td>
                    </tr>
                    <tr>
                      <th>寬度:</th>
                      <td>{{ detail.width }} cm</td>
                    </tr>
                    <tr>
                      <th>深度:</th>
                      <td>{{ detail.depth }} cm</td>
                    </tr>
                    <tr>
                      <th>座位高度:</th>
                      <td>{{ detail.seatingHeight }} cm</td>
                    </tr>
                    <tr>
                      <th>扶手高度:</th>
                      <td>{{ detail.armrestHeight }} cm</td>
                    </tr>
                    <tr>
                      <th>支腿高度:</th>
                      <td>{{ detail.legsHeight }} cm</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="pdPage-info-price px-3 text-right">
            <del
v-if="productData.origin_price">NT{{ productData.origin_price | currency }}</del>
            <div class="text-success h3 d-inline-block">
              NT{{ productData.price | currency }}
            </div>
          </div>
          <div class="row mx-0 no-gutters">
            <div class="col-lg-5">
              <div class="input-group">
                <div class="input-group-prepend">
                  <a
                    id="button-addon1"
                    :class="{ disabled: qty === 1 }"
                    @click.prevent="qty = qty - 1"
                    href="#"
                    class="btn btn-outline-secondary"
                  >−</a>
                </div>
                <input
                  v-model.number="qty"
                  type="number"
                  min="1"
                  class="form-control text-center"
                >
                <div class="input-group-append">
                  <a
                    id="button-addon2"
                    :class="{ disabled: qty === 99 }"
                    @click.prevent="qty = qty + 1"
                    href="#"
                    class="btn btn-outline-secondary"
                  >+</a>
                </div>
              </div>
            </div>
            <div class="col-lg-5">
              <button
                @click="addCart(productData.id, qty)"
                class="btn btn-block btn-primary border ml-lg-2 mt-lg-0 mt-3 rounded-0"
              >
                <i
                  v-if="product_id === productData.id"
                  class="fas fa-spinner fa-spin"
                />
                加到購物車
                <i class="fas fa-shopping-cart" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <!--    相關商品 section    -->
      <div class="col-12 mt-6">
        <div class="similar-products-section px-3">
          <div class="similar-products-title">
            <span class="similar-products-title-content">相關商品</span>
          </div>
          <div class="row py-3 similar-products-content">
            <button
              @click.prevent="similarPre"
              :disabled="transPage == 0"
              class="btn pre"
            >
              <i class="fas fa-angle-left" />
            </button>
            <button
              @click="similarNext"
              :disabled="transPage == totalTransPage"
              class="btn next"
            >
              <i class="fas fa-angle-right" />
            </button>
            <div
              v-for="item in filterSimilar"
              :key="item.id"
              :style="`left:${translating}%`"
              class="col-lg-3 col-md-4 col-sm-6 col-12 similar-products"
            >
              <div
                class="products-card text-center border border-white shadow-sm"
              >
                <div class="products-card-imgSection">
                  <a
                    @click.prevent="toProductPage(item.id)"
                    href="#"
                    class="products-card-link text-decoration-none"
                  >
                    <div class="products-card-overlay d-flex">
                      <div class="btn btn-outline-secondary btn-sm m-auto">
                        更多細節
                      </div>
                    </div>
                  </a>
                  <div
                    :style="`background-image:url('${item.imageUrl}')`"
                    class="bg-cover similar-products-card-img"
                  />
                </div>
                <div
                  class="products-card-footer text-muted border-0 row no-gutters"
                >
                  <div class="col-12 py-3">
                    <div class="products-card-title text-center text-muted">
                      {{ item.title }}
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="products-card-originPrice text-right pr-3">
                      原價 {{ item.origin_price | currency }}
                    </div>
                    <div class="products-card-price text-right pr-3">
                      特價 {{ item.price | currency }}
                    </div>
                  </div>
                  <div class="col-12 p-1 d-flex">
                    <button
                      @click="toProductPage(item.id)"
                      class="btn btn-primary btn-block"
                    >
                      更多細節
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 外部插件
import $ from 'jquery'
export default {
  data () {
    return {
      nextDisabled: false,
      // status: {
      //   uploadCart: false // 作為商品加入購物車時的過場動圖條件
      // },
      translating: 0, // 綁定DOM style='left:值 '，相關商品是利用flex-nowrap overflow-hidden變成一長列，所以利用位移來製造移動的效果
      transPage: 0,
      qty: 1, // 這邊綁定使用者增加的數量，注意在DOM上的v-model要添加修飾符.number，否則預設會將值轉成string，導致自行輸入數字再利用btn添加時數字錯亂

      detail: {
        height: '85½',
        width: '366',
        depth: '325',
        seatingHeight: '41½',
        armrestHeight: '61½',
        legsHeight: '3½'
      },
      screenWidth: 0
    }
  },
  computed: {
    productData () {
      return this.$store.state.productData
    },
    productsData () {
      return this.$store.state.productsData
    },
    uploadCart () {
      return this.$store.state.uploadCart
    },
    product_id () {
      return this.$store.state.product_id
    },
    // 先過濾掉同樣的商品，再過濾同series的商品。
    filterSimilar () {
      const vm = this
      return vm.productsData
        .filter((item) => {
          return item.id !== vm.$route.params.id
        })
        .filter((item) => {
          return item.category_series === vm.productData.category_series
        })
    },
    // 計算目前相關商品數量因頁面大小顯示，會生成的頁數（位移的最大值）。
    // 當目前頁碼與總頁數相等時則button會開啟disabled的屬性，使移動的韓式無法觸發
    // 原本使用a連結來套用disabled ClassName禁止觸發位移函式，但點擊時會穿到而發生點擊到下方的相關商品，導致頁面轉換，所以改以button來使用
    totalTransPage () {
      // console.log($(window).width());
      const vm = this
      if (vm.screenWidth < 576) {
        // console.log("<576");
        return Math.floor(vm.filterSimilar.length)
      } else if (vm.screenWidth < 768 && vm.screenWidth >= 576) {
        // console.log(">576");
        return Math.floor(vm.filterSimilar.length / 2)
      } else if (vm.screenWidth < 992 && vm.screenWidth >= 768) {
        // console.log(">768");
        return Math.floor(vm.filterSimilar.length / 3)
      } else {
        // console.log(">992");
        return Math.floor(vm.filterSimilar.length / 4)
      }
    },
    isLoading () {
      return this.$store.state.isLoading
    }
  },
  created () {
    const vm = this
    vm.$store.dispatch('getProductData', vm.$route.params.id)
    vm.screenWidth = $(window).width() // 在渲染初期就要宣告screenWidth數值，否則會以 screenWidth < 576的方式計算total
    // 當視窗大小改變時重新取得視窗寬度
    if (process.client) {
      $(window).onresize = () => {
        if (vm.$route.fullPath.indexOf('/product/') !== 0) {
          $(window).onresize = null // 取消監視
          return // return 退出函式，否則下面語法一樣會執行一次。
        }
        vm.screenWidth = $(window).width()
        // console.log($(window).width());
      }
    }
  },
  methods: {
    // 添加商品到購物車
    addCart (id, qty = 1) {
      this.$store.dispatch('addCart', { id, qty })
    },
    // 回到上一頁
    backward () {
      this.$router.back()
    },
    // 向右位移相關商品
    similarNext () {
      const vm = this
      vm.transPage += 1 // 記錄位移頁碼，作為防止過度位移的參考
      vm.translating = -100 * vm.transPage
    },
    // 向左位移相關商品
    similarPre () {
      const vm = this
      vm.transPage -= 1 // 記錄位移頁碼
      vm.translating = -100 * vm.transPage
    },
    // 從目前商品頁面導航至相關商品的目標商品，注意這邊要重新getProductData一次，否則會呈現同一筆資料
    toProductPage (id) {
      const vm = this
      vm.$router.push(`/product/${id}`)
      // $(window).scrollTop(0);
      vm.$store.dispatch('getProductData', id)
    }
  }
}
</script>
