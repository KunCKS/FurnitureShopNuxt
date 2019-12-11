<template>
  <div class="row no-gutters">
    <loading :active.sync="isLoading" />
    <!-- 商品sidebar -->
    <div class="col-md-2">
      <div class="p-2 sticky-top products-side-bar">
        <div class="px-3 py-4 border-top h6 mb-0">
          商品列表
        </div>
        <ul id="accordionProducts" class="navbar-nav">
          <li class="nav-item border-top py-2">
            <div class="card border-0">
              <div
                id="productsHeadingOne"
                class="card-header p-0 border-0 bg-white"
              >
                <h5 class="mb-0">
                  <button
                    class="btn btn-link dropdown-toggle h7 mb-0 pl-md-3 pr-md-1"
                    data-toggle="collapse"
                    data-target="#ProductsCollapseOne"
                  >
                    沙發
                    <span class="h8">SOFAS</span>
                  </button>
                </h5>
              </div>
              <div
                id="ProductsCollapseOne"
                class="collapse"
                data-parent="#accordionProducts"
              >
                <div class="card-body py-2">
                  <ul class="navbar-nav mr-auto">
                    <li v-for="item in seriesList" :key="item" class="nav-item">
                      <nuxt-link
                        :to="`/products/沙發/${item}`"
                        class="nav-link h7 font-weight-normal mb-0"
                      >
                        {{ item }} 系列
                      </nuxt-link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>

          <li class="nav-item border-top py-2">
            <div class="card border-0">
              <div
                id="productsHeadingTwo"
                class="card-header p-0 border-0 bg-white"
              >
                <h5 class="mb-0">
                  <button
                    class="btn btn-link dropdown-toggle h7 mb-0 pl-md-3 pr-md-1"
                    data-toggle="collapse"
                    data-target="#ProductsCollapseTwo"
                  >
                    椅子
                    <span class="h8">CHAIRS</span>
                  </button>
                </h5>
              </div>
              <div
                id="ProductsCollapseTwo"
                class="collapse"
                aria-labelledby="headingOne"
                data-parent="#accordionProducts"
              >
                <div class="card-body py-2">
                  <ul class="navbar-nav mr-auto">
                    <li
                      v-for="(item, index) in seriesList"
                      :key="index"
                      class="nav-item"
                    >
                      <nuxt-link
                        :to="`/products/椅子/${item}`"
                        class="nav-link h7 font-weight-normal mb-0"
                      >
                        {{ item }} 系列
                      </nuxt-link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>

          <li class="nav-item border-top py-2">
            <div class="card border-0">
              <div
                id="productsHeadingThree"
                class="card-header p-0 border-0 bg-white"
              >
                <h5 class="mb-0">
                  <button
                    class="btn btn-link dropdown-toggle h7 mb-0 pl-md-3 pr-md-1"
                    data-toggle="collapse"
                    data-target="#ProductsCollapseThree"
                  >
                    桌子
                    <span class="h8">TABLES</span>
                  </button>
                </h5>
              </div>
              <div
                id="ProductsCollapseThree"
                class="collapse"
                data-parent="#accordionProducts"
              >
                <div class="card-body py-2">
                  <ul class="navbar-nav mr-auto">
                    <li
                      v-for="(item, index) in seriesList"
                      :key="index"
                      class="nav-item"
                    >
                      <nuxt-link
                        :to="`/products/桌子/${item}`"
                        class="nav-link h7 font-weight-normal mb-0"
                      >
                        {{ item }} 系列
                      </nuxt-link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>

          <li class="nav-item border-top border-bottom py-2">
            <div class="card border-0">
              <div
                id="productsHeadingFour"
                class="card-header p-0 border-0 bg-white"
              >
                <h5 class="mb-0">
                  <button
                    class="btn btn-link dropdown-toggle h7 mb-0 pl-md-3 pr-md-1"
                    data-toggle="collapse"
                    data-target="#ProductsCollapseFour"
                  >
                    收納系列
                    <span class="h8">STORAGE</span>
                  </button>
                </h5>
              </div>
              <div
                id="ProductsCollapseFour"
                class="collapse"
                data-parent="#accordionProducts"
              >
                <div class="card-body py-2">
                  <ul class="navbar-nav mr-auto">
                    <li
                      v-for="(item, index) in seriesList"
                      :key="index"
                      class="nav-item"
                    >
                      <nuxt-link
                        :to="`/products/收納系列/${item}`"
                        class="nav-link h7 font-weight-normal mb-0"
                      >
                        {{ item }} 系列
                      </nuxt-link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 商品列表 -->
    <div class="col-md-10">
      <div v-if="filterData.length == 0" class="text-center py-6">
        此系列產品，設計師還在努力創作中！
      </div>
      <div class="row mx-0 mt-md-2">
        <div
          v-for="item in filterData"
          :key="item.id"
          class="col-md-6 mb-md-3 mt-md-0 mt-2"
        >
          <div class="products-card text-center border border-white shadow">
            <div class="products-card-imgSection">
              <a
                @click.prevent="moreInfo(item.id)"
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
                class="bg-cover products-card-img"
              />
            </div>
            <div
              class="products-card-footer text-muted border-0 p-3 row no-gutters"
            >
              <div class="col-8 my-auto">
                <div class="products-card-title text-left">
                  {{ item.category_series }}
                </div>
                <div class="products-card-title text-left text-muted">
                  {{ item.title }}
                </div>
              </div>
              <div class="col-4">
                <div class="products-card-originPrice text-right">
                  原價
                  <del>{{ item.origin_price | currency }}</del>
                </div>
                <div class="products-card-price text-right">
                  特價 {{ item.price | currency }}
                </div>
              </div>
              <div class="col-12 d-flex mt-2">
                <button
                  @click="addCart(item.id)"
                  class="btn btn-primary btn-sm ml-auto"
                >
                  <i
                    v-if="product_id === item.id"
                    class="fas fa-spinner fa-spin"
                  />
                  加入購物車
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <pagination
        v-if="
          ($route.fullPath === '/products/') | ($route.fullPath === '/products')
        "
        :pagination="pagination"
        @gopage="getPagination"
      />
      <div class="row py-md-8 py-2 no-gutters">
        <div class="col-11 border-top mx-auto d-md-block d-none" />
      </div>
    </div>
  </div>
</template>

<script>
// 上面模板包含了sidebar及產品list，相關CSS樣式寫在productsSideBar.scss及productsCard.scss
// 自訂元件
import $ from 'jquery'
import Pagination from './Pagination'
// 外部插件
export default {
  components: {
    Pagination
  },
  computed: {
    // 商品頁面資料呈現的過濾機制
    filterData () {
      const vm = this
      if (
        vm.$route.fullPath === '/products/' ||
        vm.$route.fullPath === '/products'
      ) {
        return vm.pageProducts // 當在 products route時，則以10筆資料為一頁的方式呈現（AJAX取得得分頁資料）
      } else {
        // 以下做法是利用$route.params來改變過濾的條件，因此各個route-link只要帶入到需要的route就可進行資料的過濾。
        // 這邊先過濾category再進行series的過濾
        const filteredData = vm.productsData.filter((item) => {
          return item.category === vm.$route.params.category
        })
        // ex:沙發的所有系列
        if (
          (vm.$route.params.series === '所有') |
          (vm.$route.params.series === '')
        ) {
          return filteredData
        } else {
          // ex:沙發的其他系列
          const Data = filteredData.filter((item) => {
            return item.category_series === vm.$route.params.series
          })
          return Data
        }
      }
      // 記錄一下修正過程
      // 原本過濾data是利用 product sidebar點擊時將不同的category及series值帶到data中的變數filterTarget來進行過濾
      // 但這樣要利用外外層(隔了一層)的抽屜式sidebar來點擊進行頁面移動及data傳入非常麻煩
      // 原本嘗試event bus的方式，但在兩route的hook中會導致無法擷取到資料
      // 想破頭想不到解決方式
      // 後來觀察到電商網頁在切換不同產品時期route會改變，才豁然開朗也可以利用route來傳遞要filter的target
    },
    isLoading () {
      return this.$store.state.isLoading
    },
    product_id () {
      return this.$store.state.product_id
    },
    productsData () {
      return this.$store.state.productsData
    },
    seriesList () {
      return this.$store.state.seriesList
    },
    pageProducts () {
      return this.$store.state.pageProducts
    },
    pagination () {
      return this.$store.state.pagination
    }
  },
  created () {
    this.getPagination()
  },
  methods: {
    // 取得分頁資料
    getPagination (page = 1) {
      this.$store.dispatch('getPagination', page)
    },
    // 添加商品到購物車
    addCart (id, qty = 1) {
      this.$store.dispatch('addCart', { id, qty })
    },
    // 將商品頁面導至單一商品頁面
    moreInfo (id) {
      this.$router.push(`/product/${id}`)
      $(window).scrollTop(0)
    }
  }
}
</script>
