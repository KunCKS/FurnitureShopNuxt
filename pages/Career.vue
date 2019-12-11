<template>
  <div class="section-full-height">
    <products-header :productsHeaderData="productsHeaderData" />
    <div class="container">
      <h5 class="py-4">
        以下資訊正是我們在尋找人才的職缺:
      </h5>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          (高雄) 儲備門市經理 Store Manager/Assistant Store Manager
        </li>
        <li class="list-group-item">
          (台北) 門市銷售專員 Sales Executive
        </li>
      </ul>
      <div>
        <h5 class="py-4">
          聯絡方式:
        </h5>
        <div class="pl-3">
          <h6>電子郵件</h6>
          <p>
            請將履歷寄至
            <a href="mailto:carrer@asin.tw">carrer@asin.tw</a>
          </p>
          <h6>地址</h6>
          <p>台北市台中區高雄路777777號</p>
          <h6>電話</h6>
          <p>(02)12345678</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ProductsHeader from '../components/ProductsHeader'
export default {
  components: {
    ProductsHeader
  },
  data () {
    return {
      productsHeaderData: {
        title: '加入團隊',
        imgUrl:
          'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
      }
    }
  }
}
</script>

<style scoped lang="scss">
.list-group-item:last-child {
  border-bottom: 1px solid rgba(0, 0, 0, 0.125) !important;
}
.list-group-item:first-child {
  border-top: 0 !important;
}
</style>
