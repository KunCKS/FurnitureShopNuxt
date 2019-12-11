<template>
  <div>
    <loading :active.sync="isLoading" />
    <div class="text-right py-3">
      <button @click="openModal(true)" class="btn btn-large btn-secondary">
        新建Coupon
      </button>
    </div>
    <table class="table">
      <thead class="thead-light">
        <tr>
          <th scope="col">
            Coupon名稱
          </th>
          <th scope="col" width="200">
            Coupon Code
          </th>
          <th scope="col" width="110">
            截止日
          </th>
          <th scope="col" width="80">
            折數
          </th>
          <th scope="col" width="130">
            編輯
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="item.id">
          <td>{{ item.title }}</td>
          <td>{{ item.code }}</td>
          <td>{{ item.due_date | formatTime }}</td>
          <td>
            {{ item.percent }}
            <!-- <span v-if="item.is_enabled">已啟用</span>
            <span v-if="!item.is_enabled">未啟用</span>-->
          </td>
          <td>
            <a
              @click.prevent="openModal(false, item)"
              class="btn btn-outline-primary btn-sm"
              href="#"
            >編輯</a>
            <a
              @click.prevent="openModal(false, item, true)"
              class="btn btn-outline-danger btn-sm"
              href="#"
            >刪除</a>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination :pagination="pagination" @gopage="getCouponsData" />
    <div
      id="couponModal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 id="couponModalLabel" class="modal-title">
              <span v-if="isNew">新增Coupon</span>
              <span v-if="!isNew">編輯Coupon</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    id="title"
                    v-model="tempCoupon.title"
                    type="text"
                    class="form-control"
                    placeholder="請輸入標題"
                  >
                </div>

                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label for="category">折數</label>
                    <input
                      id="category"
                      v-model="tempCoupon.percent"
                      type="number"
                      class="form-control"
                      placeholder="請輸入折數"
                    >
                  </div>
                  <div class="form-group col-md-12">
                    <label for="price">折扣碼</label>
                    <input
                      id="unit"
                      v-model="tempCoupon.code"
                      type="unit"
                      class="form-control"
                      placeholder="請輸入折扣碼"
                    >
                  </div>
                  <div class="form-group col-md-12">
                    <label for="origin_price">到期日</label>
                    <input
                      id="origin_price"
                      v-model="tempCoupon.due_date"
                      type="date"
                      class="form-control"
                      placeholder="請輸入到期日"
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button @click="updateCoupon" type="button" class="btn btn-primary">
              <i v-if="isLoading" class="fas fa-spinner fa-spin" />確認
            </button>
          </div>
        </div>
      </div>
    </div>
    <div id="delcouponModal" class="modal fade" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 id="delcouponModalLabel" class="modal-title">
              <span>刪除Coupon</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 {{ tempCoupon.title }} Coupon。
            <strong class="text-danger">(刪除後將無法恢復)</strong>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button @click="removeCoupon" type="button" class="btn btn-danger">
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import axios from 'axios'
import pagination from '~/components/Pagination'
export default {
  layout: 'admin',
  components: {
    pagination
  },
  data () {
    return {
      coupons: [],
      pagination: {},
      tempCoupon: {},
      tempTimestamp: ''
    }
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    },
    isNew () {
      return this.$store.state.isNew
    }
  },
  created () {
    this.getCouponsData()
  },
  methods: {
    getCouponsData (page = 1) {
      const vm = this
      vm.$store.dispatch('updateLoading', true)
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`
      axios.get(api).then((response) => {
        console.log('後台取得Coupons資料：', response)
        vm.coupons = response.data.coupons
        vm.pagination = response.data.pagination
        vm.$store.dispatch('updateLoading', false)
      })
      // 將現有的分頁資料利用props傳到元件中，再利用emit將點擊時觸發的資料回傳到此頁面中，這樣就可以利用資料重新AJAX得到新的一筆分頁資料
      // 函式中先預設變數帶入1
    },
    updateCoupon () {
      const vm = this
      vm.$store.dispatch('updateLoading', true)
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`
      let method = 'post'
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`
        method = 'put'
      }
      vm.formatTimestamp(vm.tempCoupon.due_date)
      const coupon = vm.tempCoupon
      axios[method](api, { data: coupon }).then((response) => {
        if (!response.data.success) {
          console.log('更新coupon失敗', response)
          vm.$store.dispatch('updateLoading', false)
          $('#couponModal').modal('hide')
        } else {
          console.log('updateCoupon:', response)
          vm.$store.dispatch('updateLoading', false)
          $('#couponModal').modal('hide')
          vm.getCouponsData()
        }
      })
    },
    removeCoupon () {
      const vm = this
      vm.$store.dispatch('updateLoading', true)
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`
      axios.delete(api).then((response) => {
        console.log('deleteCoupons:', response)
        vm.$store.dispatch('updateLoading', false)
        if (!response.data.success) {
          console.log(response.data.message)
        }
        $('#delcouponModal').modal('hide')
        vm.getCouponsData()
      })
    },
    openModal (isNew, item, isDel) {
      if (isNew) {
        this.tempCoupon = {}
        this.tempTimestamp = ''
        this.$store.dispatch('updateisNew', true)
      } else if (!isNew && isDel) {
        this.tempCoupon = Object.assign({}, item)
        $('#delcouponModal').modal('show')
        return
      } else {
        this.tempCoupon = Object.assign({}, item)
        this.formatTime(this.tempCoupon.due_date)
        this.$store.dispatch('updateisNew', false)
      }
      $('#couponModal').modal('show')
    },
    formatTime (timestamp) {
      const dates = new Date(timestamp * 1000)
      const year = dates.getFullYear()
      const month =
        dates.getMonth() < 10
          ? `0${dates.getMonth() + 1}`
          : dates.getMonth() + 1
      const date =
        dates.getDate() < 10 ? `0${dates.getDate()}` : dates.getDate()
      this.tempCoupon.due_date = `${year}-${month}-${date}`
      console.log('formatTime:', this.tempCoupon.due_date)
    },
    formatTimestamp (date) {
      const dates = new Date(date)
      this.tempCoupon.due_date = Math.floor(dates.getTime() / 1000)
      console.log('formatTimestamp:', this.tempCoupon.due_date)
    }
  }
}
</script>
