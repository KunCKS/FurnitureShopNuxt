<template>
  <div>
    <news-overlay />
    <h1 class="m-0 text-hide">
      ASin Design
    </h1>
    <div class="position-relative">
      <!--        carousel section        -->
      <div class="scroll-down-icon">
        <i class="fas fa-angle-down icon" />
        scroll
      </div>
      <carousel
        :per-page="1"
        :navigate-to="someLocalProperty"
        :mouse-drag="true"
        :autoplay="true"
        :autoplayTimeout="2500"
        :loop="true"
        :autoplayHoverPause="false"
        :speed="1000"
        @page-change="titleAnimate"
        pagination-position="bottom-overlay"
        pagination-active-color="#ffffff"
        pagination-color="#e0e0e0"
      >
        <slide v-for="(item, index) in slideContent" :key="index">
          <div
            :style="`background-image:url('${item.imgUrl}')`"
            class="carousel-img"
          >
            <div class="carousel-slide-title d-flex align-items-end">
              <p :id="`title-${index}`" class="pl-md-9 pb-md-9 pl-5 pb-5 mb-0">
                {{ item.title }}
              </p>
            </div>
          </div>
        </slide>
      </carousel>
    </div>
    <!--        carousel section   END     -->
    <client-only><home-products /></client-only>

    <div
      class="parallax-bg-fixed"
      style="background-image:url('https://images.unsplash.com/photo-1503174971373-b1f69850bded?ixlib=rb-1.2.1&auto=format&fit=crop&w=1387&q=80');height:400px"
    />

    <!-- introduce style section -->
    <div class="container-fluid py-4">
      <div class="row style-intro-wrapper">
        <div class="col-md-6 col-12">
          <div
            class="style-intro-info-body big-title h-100 text-center text-primary d-flex flex-column justify-content-center"
          >
            <h3 class="name mb-0">
              <span
class="border border-top-0 border-bottom-0 px-3">Ećo Style</span>
            </h3>
            <small class="text-muted">ASin Design</small>
            <p class="style-intro-content mt-md-6 mt-3">
              設計師 Ećo
              著眼于自然形態、簡潔線條和舒適性，使用大量的淺色元素，流暢的曲線，營造了悠閒氣氛，並為空間注入一股活潑的氣息，打造出無論從哪個角度看都美貌不減，而且無比舒適的傢俱。
            </p>
          </div>
        </div>
        <div class="col-md-6 col-12">
          <div class="style-intro-img-body">
            <div
              class="img-back mx-auto"
              style="background-image:url('https://images.unsplash.com/photo-1517705008128-361805f42e86?ixlib=rb-1.2.1&auto=format&fit=crop&w=1279&q=80')"
            >
              <div class="title right text-white">
                Ećo
              </div>
              <div
                class="img-front right"
                style="background-image:url('https://images.unsplash.com/photo-1517705008128-361805f42e86?ixlib=rb-1.2.1&auto=format&fit=crop&w=1279&q=80')"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid py-4">
      <div class="row style-intro-wrapper flex-md-row-reverse">
        <div class="col-md-6 col-12">
          <div
            class="style-intro-info-body big-title text-center text-primary h-100 d-flex flex-column justify-content-center"
          >
            <h3 class="name mb-0">
              <span
class="border border-top-0 border-bottom-0 px-3">Ȏlḍ Style</span>
            </h3>
            <small class="text-muted">ASin Design</small>
            <p class="style-intro-content mt-md-6 mt-3">
              設計師 Ȏlḍ
              著眼于自然形態、文藝風格和舒適性，使用大量的褐色元素、流暢的曲線、新舊混搭、明暗交疊，並為空間注入一股藝術的氣息，打造出無論從哪個角度看都美貌不減，而且無比舒適的傢俱。
            </p>
          </div>
        </div>
        <div class="col-md-6 col-12">
          <div class="style-intro-img-body">
            <div
              class="img-back mx-auto"
              style="background-image:url('https://images.unsplash.com/photo-1551887196-72e32bfc7bf3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1228&q=80')"
            >
              <div class="title left text-white">
                Ȏlḍ
              </div>
              <div
                class="img-front left"
                style="background-image:url('https://images.unsplash.com/photo-1551887196-72e32bfc7bf3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1228&q=80')"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- introduce style section END -->

    <img-wall />

    <!-- Introduce Designer Section -->
    <div class="container-fluid my-4">
      <div class="big-title py-3">
        <h2 class="name text-primary mb-0">
          認識我們的設計師
        </h2>
        <div class="eng">
          Our Designers
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 col-12">
          <div class="card-designer px-lg-5 px-md-4">
            <div class="card-head">
              <div
                class="img ml-auto"
                style="background-image:url('https://images.unsplash.com/photo-1566810039093-63307ce3f6b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80')"
              />
            </div>
            <div class="card-body-content">
              <div class="name">
                <h4 class="px-3">
                  Ećo
                </h4>
                <span class="px-3">DESIGNER</span>
              </div>
              <div class="content">
                <span class="px-3 text-justify">
                  “ 設計從粗線條開始，然後向細節發展 “
                  對我來說，精細化非常重要。利用顏色和表面質感的相互作用，簡單的東西也可以和牆壁、藝術品等搭配起來，在房間中產生意義和聚焦點，並注入人的個性。
                  <br >— 設計師Ećo
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-12">
          <div class="card-designer px-lg-5 px-md-4">
            <div class="card-head">
              <div
                class="img ml-auto"
                style="background-image:url('https://images.unsplash.com/photo-1495078065017-564723e7e3e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1300&q=80')"
              />
            </div>
            <div class="card-body-content">
              <div class="name">
                <h4 class="pl-3">
                  Ȏlḍ
                </h4>
                <span class="pl-3">DESIGNER</span>
              </div>
              <div class="content">
                <span class="px-3 text-justify">
                  “
                  無論您是騎行還是僅用腳步丈量眼前的迷人街道，您都會邂逅眾多令人愉快的目的地
                  ”
                  我的靈感主要來自藝術，我在世界各地尋找素材，將人與作品（傢俱）彼此產生連結，細細的品味、探索和念想。這些藝術設計作品，需要一個永久的家。而您家，就是一個最好的珍藏之處。
                  <br >— 設計師 Ȏlḍ
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Introduce Designer Section END -->
    <introduce-company-section />
  </div>
</template>

<script>
// 外部元件、插件
import $ from 'jquery'
// 自訂元件
import { Carousel, Slide } from 'vue-carousel'
import IntroduceCompanySection from '~/components/IntroduceCompanySection'
import ImgWall from '~/components/ImgWall'
import NewsOverlay from '~/components/NewsOverlay'
import HomeProducts from '~/components/HomeProducts'
export default {
  components: {
    Carousel,
    Slide,
    IntroduceCompanySection,
    ImgWall,
    NewsOverlay,
    HomeProducts
  },
  data () {
    return {
      someLocalProperty: [], // Vue-Carousel Data
      slideContent: {
        // 自訂 slide v-for Data
        0: {
          imgUrl:
            'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1349&q=80',
          title: 'Ećo Series'
        },
        1: {
          imgUrl:
            'https://images.unsplash.com/photo-1551887196-72e32bfc7bf3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1228&q=80',
          title: 'Ȏlḍ Series'
        },
        2: {
          imgUrl:
            'https://images.unsplash.com/photo-1507149833265-60c372daea22?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1355&q=80',
          title: 'ḾetälGråy Series'
        }
      }
    }
  },
  methods: {
    // slide 標題動態載入，利用CSS的animate，語法寫在_utilities.scss，若slide數量與原本不一樣時，下方的變數需要調整一下
    // 此函式是根據 Vue-Carousel 自帶觸發的 page-change 事件來動作
    // 可參考 https://github.com/SSENSE/vue-carousel
    titleAnimate (e) {
      const total = 3 // 用於移除第一個slide ClassName移除的變數
      $(`#title-${e}`).addClass('fadeOut')
      if (e === 0) {
        $(`#title-${total - 1}`).removeClass('fadeOut')
        return
      }
      $(`#title-${e - 1}`).removeClass('fadeOut')
    }
  }
}
</script>
