<template>
  <div class="section-full-height">
    <products-header :productsHeaderData="productsHeaderData" />
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-sm-6 col-12 py-3">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d903.8762382104771!2d121.53292082923296!3d25.01693221428499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDAxJzAxLjAiTiAxMjHCsDMyJzAwLjUiRQ!5e0!3m2!1szh-TW!2stw!4v1570256542197!5m2!1szh-TW!2stw"
            width="100%"
            height="450"
            frameborder="0"
            style="border:0;"
            allowfullscreen
          />
        </div>
        <div class="col-sm-6 col-12 py-3">
          <div
            id="contact"
            class="text-center h3 text-muted border-bottom py-3 promotion-title"
          >
            <i class="fas fa-phone-volume" /> 聯絡我們
          </div>
          <div class="text-center mt-4">
            <h5>門市位置</h5>
            <p>台北市台中區高雄路777777號</p>
            <h5>電話</h5>
            <p>(02)12345678</p>
            <h5>電子郵件</h5>
            <p>
              <a href="mailto:carrer@asin.tw">carrer@asin.tw</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ProductsHeader from '~/components/ProductsHeader'
export default {
  components: {
    ProductsHeader
  },
  data () {
    return {
      productsHeaderData: {
        title: '門市位置',
        bgColor: '#fbfbfb',
        imgUrl:
          'https://images.unsplash.com/photo-1494203484021-3c454daf695d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
      }
    }
  }
}
</script>
