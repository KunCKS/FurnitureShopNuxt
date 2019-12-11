<template>
  <div
    id="news-overlay"
    @click="delOverlay"
    class="news-overlay d-none justify-content-center align-items-center align-items-center"
  >
    <div class="news-card d-flex justify-content-center align-items-center">
      <!-- <img :src="`${imgUrl}`" alt class="news-card-img rounded" /> -->
      <div
        :style="`background-image:url(${imgUrl})`"
        class="coupon-wrapper rounded"
      >
        <div
          class="coupon-card p-3 bg-white d-flex flex-column justify-content-center text-center shadow"
        >
          <div class="counpon-subtitle-top Ubuntu">
            LIMITED TIME ONLY
          </div>
          <div
            class="counpon-title h2 Volkhov m-0 d-flex justify-content-center align-items-center"
          >
            50
            <span>
              <div class="unit Volkhov">%</div>
              <div class="unit Volkhov">OFF</div>
            </span>
          </div>
          <div class="Volkhov counpon-subtitle-bottom m-sm-0 my-2">
            Opening Promotion
          </div>
          <div class="Ubuntu mt-sm-4">
            WITH THE CODE
          </div>
          <div class="Ubuntu">
            OPEN50OFF
          </div>
          <div class="row justify-content-center">
            <div class="col-md-5">
              <button
                @click="delOverlay"
                class="btn btn-sm btn-outline-primary mt-sm-4 mt-2"
                type="button"
              >
                SHOP NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import couponImg from "@/assets/COUPON票券_2.png";
import $ from 'jquery'
export default {
  data () {
    return {
      imgUrl:
        'https://images.unsplash.com/photo-1493552152660-f915ab47ae9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
    }
  },
  created () {
    setTimeout(() => {
      $('#news-overlay').removeClass('d-none')
      $('#news-overlay').addClass('d-flex')
    }, 1500)
    // 設定在頁面載入1.5秒後讓overlay顯示
  },
  methods: {
    delOverlay () {
      $('#news-overlay').removeClass('d-flex')
      $('#news-overlay').addClass('d-none')
      // 由於d-flex與d-none在bootstrap css 中皆設定為!important所以這邊用移除添加的方式來做顯示切換
    }
  }
}
</script>
