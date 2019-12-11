<template>
  <div class="home-products py-md-9 py-4">
    <div class="container">
      <div class="big-title mb-md-3">
        <h2 class="name text-primary mb-0">
          商品專區
        </h2>
        <span class="eng m-0">Products</span>
      </div>
      <div class="row no-gutters">
        <div class="col-md-6">
          <div class="home-products-items">
            <nuxt-link to="/products">
              <div
                class="img"
                style="background-image:url('https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80')"
              />
              <span class="home-products-title">
                <div class="eng">Sofas</div>
                <h3>– 沙發</h3>
              </span>
            </nuxt-link>
          </div>
        </div>
        <div class="col-md-6">
          <div class="home-products-items negative-margin">
            <nuxt-link to="/products">
              <div
                class="img"
                style="background-image:url('https://images.unsplash.com/photo-1563710852660-8790e6d856ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80')"
              />
              <span class="home-products-title">
                <div class="eng">Chairs</div>
                <h3>– 椅子</h3>
              </span>
            </nuxt-link>
          </div>
        </div>
        <div class="col-md-6">
          <div class="home-products-items">
            <nuxt-link to="/products">
              <div
                class="img"
                style="background-image:url('https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80')"
              />
              <span class="home-products-title">
                <div class="eng">Tables</div>
                <h3>– 桌子</h3>
              </span>
            </nuxt-link>
          </div>
        </div>
        <div class="col-md-6">
          <div class="home-products-items negative-margin">
            <nuxt-link to="/products">
              <div
                class="img"
                style="background-image:url('https://images.unsplash.com/photo-1532588213355-52317771cce6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80')"
              />
              <span class="home-products-title">
                <div class="eng">Storage</div>
                <h3>– 收納系列</h3>
              </span>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  created () {
    const vm = this
    // 在頁面生成時監視畫面滾動的位置來進行DOM的動態樣式載入
    $(window).scroll(function () {
      // console.log(vm.$route)
      if (vm.$route.fullPath !== '/') {
        // $(window).unbind("scroll"); //有機會會造成home 及 products頁面切換時沒有正常監視帶修正。
        // 如果頁面不在home時，則不再進行scroll監視，否則會報錯。
        return // return 退出函式，否則下面語法一樣會執行一次而報錯。
      }
      const titlePOS = $('.home-products .big-title').offset().top // 取得元素位置
      const windowHeight = $(window).height() // 取得視窗高度
      const scollTop = $(window).scrollTop() // 取得目前距離最頂端多遠
      if (scollTop >= titlePOS - windowHeight / 2) {
        // 當元素到達視窗高度一半時及動態加入ClassName
        $('.home-products .home-products-title').addClass('shown')
      }
    })
  }
}
</script>
