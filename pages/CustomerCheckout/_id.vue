<template>
  <div
    class="container"
    style="min-height:calc(100vh - 83.38px - 205.6px - 24px)"
  >
    <loading :active.sync="isLoading" />
    <div class="row justify-content-center my-4">
      <div class="col-12">
        <div class="form-row">
          <div class="col-12 col-sm">
            <div
              class="alert border-primary text-center alert-rounded"
              role="alert"
            >
              1.輸入訂單資料
            </div>
          </div>
          <div class="col-12 col-sm">
            <div
              :class="{ 'alert-primary': !isPaid, 'border-primary': isPaid }"
              class="alert text-center alert-rounded"
              role="alert"
            >
              2.金流付款
            </div>
          </div>
          <div class="col-12 col-sm">
            <div
              :class="{ 'alert-primary': isPaid, 'border-primary': !isPaid }"
              class="alert text-center alert-rounded"
              role="alert"
            >
              3.完成
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 mt-md-4">
        <div class="row border p-4 shadow justify-content-center">
          <div class="col-12">
            <table class="table">
              <tbody>
                <tr>
                  <th class="border-0" width="120">
                    下單日期
                  </th>
                  <td class="border-0">
                    {{ orderData.create_at | formatTime }}
                  </td>
                </tr>
                <tr>
                  <th>訂單編號</th>
                  <td>{{ orderData.id }}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{{ orderData.user.email }}</td>
                </tr>
                <tr>
                  <th>姓名</th>
                  <td>{{ orderData.user.name }}</td>
                </tr>
                <tr>
                  <th>收件人電話</th>
                  <td>{{ orderData.user.tel }}</td>
                </tr>
                <tr>
                  <th>收件人地址</th>
                  <td>{{ orderData.user.address }}</td>
                </tr>
                <tr>
                  <th>訂單金額</th>
                  <td>{{ orderData.total | currency }}</td>
                </tr>
                <tr>
                  <th>付款狀態</th>
                  <td>
                    <span v-if="!isPaid">尚未付款</span>
                    <span v-if="isPaid" class="text-success">付款完成</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-if="!isPaid" class="col-md-5">
            <div class="text-right">
              <button @click="checkout" class="btn btn-danger btn-block">
                確認付款去
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    },
    isPaid () {
      return this.$store.state.isPaid
    },
    orderData () {
      return this.$store.state.orderData
    }
  },
  created () {
    this.getOrderData()
  },
  methods: {
    // 取得訂單資料
    getOrderData () {
      this.$store.dispatch('getOrderData', this.$route.params.id)
    },
    // 確定付款功能
    checkout () {
      this.$store.dispatch('checkout', this.orderData.id)
    }
  }
}
</script>
