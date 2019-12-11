<template>
  <div class="container pt-md-3 pb-md-5 section-full-height">
    <loading :active.sync="isLoading" />
    <div class="row justify-content-center">
      <div class="col-10">
        <div class="row">
          <div class="col-12 col-sm">
            <div
              class="alert alert-primary text-center alert-rounded"
              role="alert"
            >
              1.輸入訂單資料
            </div>
          </div>
          <div class="col-12 col-sm">
            <div
              class="alert border-primary text-center alert-rounded"
              role="alert"
            >
              2.金流付款
            </div>
          </div>
          <div class="col-12 col-sm">
            <div
              class="alert border-primary text-center alert-rounded"
              role="alert"
            >
              3.完成
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-md-4">
      <form class="col-md-7 px-4">
        <div class="form-row mb-3">
          <div class="col-12 h5 mb-3 text-center">
            訂單資訊
          </div>
          <div class="col-md-6">
            <label for="username">收件人姓名</label>
            <input
              :class="{ 'is-invalid': errors.has('name') }"
              id="username"
              type="text"
              v-validate="'required'"
              class="form-control"
              v-model="order.user.name"
              name="name"
              placeholder="輸入姓名"
            >
            <span
v-if="errors.has('name')"
class="text-danger">姓名欄位不得留空</span>
          </div>
          <div class="col-md-6">
            <label for="usertel">收件人電話</label>
            <input
              :class="{ 'is-invalid': errors.has('tel') }"
              id="usertel"
              type="tel"
              v-validate="'required'"
              class="form-control"
              v-model="order.user.tel"
              name="tel"
              placeholder="請輸入電話"
            >
            <span
v-if="errors.has('tel')"
class="text-danger">電話欄位不得留空</span>
          </div>
        </div>

        <div class="form-group">
          <label for="useremail">Email</label>
          <input
            :class="{ 'is-invalid': errors.has('email') }"
            id="useremail"
            type="email"
            v-validate="'required|email'"
            class="form-control"
            v-model="order.user.email"
            name="email"
            placeholder="請輸入 Email"
          >
          <span v-if="errors.has('email')" class="text-danger">{{
            errors.first('email')
          }}</span>
        </div>

        <div class="form-group">
          <label for="useraddress">收件人地址</label>
          <input
            :class="{ 'is-invalid': errors.has('address') }"
            id="useraddress"
            type="text"
            v-validate="'required'"
            class="form-control"
            v-model="order.user.address"
            name="address"
            placeholder="請輸入地址"
          >
          <span
v-if="errors.has('address')"
class="text-danger">地址欄位不得留空</span>
        </div>

        <div class="form-group">
          <label for="comment">
            備註
            <small class="text-muted">(選填)</small>
          </label>
          <textarea
            id="comment"
            name
            v-model="order.message"
            class="form-control"
            cols="30"
            rows="4"
          />
        </div>
      </form>

      <div class="col-md-5 border shadow d-flex flex-column">
        <div class="h5 text-center mt-3">
          您的訂單
        </div>
        <table class="table mt-3">
          <thead>
            <tr>
              <td>商品</td>
              <td width="100">
                總計
              </td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cartData.carts" :key="item.id">
              <td>{{ item.product.title }} Ｘ{{ item.qty }}</td>
              <td class="text-right">
                {{ item.product.price | currency }}
              </td>
            </tr>
          </tbody>
          <tfoot class="border-top">
            <tr>
              <th>總計</th>
              <td class="text-right">
                {{ cartData.total | currency }}
              </td>
            </tr>
            <tr v-if="cartData.final_total < cartData.total">
              <th>
                折扣價
                <small class="text-success">(已套用coupon優惠)</small>
              </th>
              <td class="text-right">
                {{ cartData.final_total | currency }}
              </td>
            </tr>
          </tfoot>
        </table>
        <div class="order-submit-section p-2 mt-auto">
          <div class="d-flex">
            <strong class>配送方式</strong>
            <div class="ml-auto">
              <div class="form-check ml-auto">
                <input
                  :class="{ 'is-invalid': errors.has('payment') }"
                  id="CVS_COD"
                  class="form-check-input"
                  v-model="order.user.payment_method"
                  type="radio"
                  v-validate="'required'"
                  name="payment"
                  value="CVS_COD"
                  checked
                >
                <label
class="form-check-label mr-3"
for="CVS_COD">超商付款</label>
              </div>
              <div class="form-check">
                <input
                  :class="{ 'is-invalid': errors.has('payment') }"
                  id="credit_card"
                  class="form-check-input"
                  v-model="order.user.payment_method"
                  type="radio"
                  v-validate="'required'"
                  name="payment"
                  value="credit_card"
                >
                <label
class="form-check-label"
for="credit_card">信用卡付款</label>
              </div>
              <div v-if="errors.has('payment')" class="text-danger">
                請選擇付款方式
              </div>
            </div>
          </div>

          <button
            @click.prevent="createOrder"
            class="btn btn-outline-success btn-block mt-4"
          >
            <i v-if="uploadCart" class="fas fa-spinner fa-spin" />送出訂單
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 上面表單使用vee-validate套件來做驗證，errors為套件所提供的變數，其可調用has,first等方法，has內的值指向input的name屬性。
import $ from 'jquery'
export default {
  data () {
    return {
      // 建立訂單資料用以傳送到後端
      order: {
        user: {},
        message: ''
      }
    }
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    },
    cartData () {
      return this.$store.state.cartData
    },
    uploadCart () {
      return this.$store.state.uploadCart
    }
  },
  created () {
    this.$store.dispatch('getCartData')
  },
  methods: {
    // 建立訂單資料並傳送
    createOrder () {
      // 利用vee validator進行驗證，這邊是防止資料不完全則無法通過的語法
      this.$validator.validate().then((valid) => {
        if (valid) {
          this.$store.dispatch('createOrder', this.order)
        } else {
          this.$store.dispatch('uploadCart', false)
          $(event.target).removeAttr('disabled')
        }
      })
    }
  }
}
</script>
