<template>
  <div class="container">
    <div class="row no-gutters">
      <div class="col-3 img-wall border border-secondary">
        <nuxt-link to="/product/-LpYLxew6t8FkPJ1a2k9" class="w-100">
          <img
            src="~/assets/img/furniture-1-0.jpg"
            alt
            class="img-wall-img w-100"
          >
          <div class="img-wall-overlay"/>
        </nuxt-link>
      </div>
      <div class="col-3 img-wall border border-secondary">
        <nuxt-link to="/product/-LpXSNOX3OTXSDYvAmlC" class="w-100">
          <img
            src="~/assets/img/furniture-1-1.jpg"
            alt
            class="img-wall-img w-100"
          >
          <div class="img-wall-overlay"/>
        </nuxt-link>
      </div>
      <div class="col-3 img-wall border border-secondary">
        <nuxt-link to="/product/-LpXSNOX3OTXSDYvAmlC" class="w-100">
          <img
            src="~/assets/img/furniture-1-2.jpg"
            alt
            class="img-wall-img w-100"
          >
          <div class="img-wall-overlay"/>
        </nuxt-link>
      </div>
      <div class="col-3 img-wall border border-secondary">
        <nuxt-link to="/product/-LpXSNOX3OTXSDYvAmlC" class="w-100">
          <img
            src="~/assets/img/furniture-1-3.jpg"
            alt
            class="img-wall-img w-100"
          >
          <div class="img-wall-overlay"/>
        </nuxt-link>
      </div>
      <div class="col-3 img-wall border border-secondary">
        <nuxt-link to="/product/-LpYLxew6t8FkPJ1a2k9" class="w-100">
          <img
            src="~/assets/img/furniture-1-4.jpg"
            alt
            class="img-wall-img w-100"
          >
          <div class="img-wall-overlay"/>
        </nuxt-link>
      </div>
      <div class="col-3 img-wall border border-secondary">
        <nuxt-link to="/product/-LpYLxew6t8FkPJ1a2k9" class="w-100">
          <img
            src="~/assets/img/furniture-1-5.jpg"
            alt
            class="img-wall-img w-100"
          >
          <div class="img-wall-overlay"/>
        </nuxt-link>
      </div>
      <div class="col-3 img-wall border border-secondary">
        <nuxt-link to="/product/-LpYLxew6t8FkPJ1a2k9" class="w-100">
          <img
            src="~/assets/img/furniture-1-6.jpg"
            alt
            class="img-wall-img w-100"
          >
          <div class="img-wall-overlay"/>
        </nuxt-link>
      </div>
      <div class="col-3 img-wall border border-secondary">
        <nuxt-link to="/product/-LpXSNOX3OTXSDYvAmlC" class="w-100">
          <img
            src="~/assets/img/furniture-1-7.jpg"
            alt
            class="img-wall-img w-100"
          >
          <div class="img-wall-overlay"/>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
// export default {
//   data() {
//     return {
//       imgWallLink: {
//         0: "#",
//         1: "#",
//         2: "#",
//         3: "#",
//         4: "#",
//         5: "#",
//         6: "#",
//         7: "#"
//       }
//     };
//   }
// };

// 以下為原本利用v-for生成imgwall的寫法，但在綁定src利用變數輸出圖片位置後，在npm run build時，src路徑無法自動編譯成發布版本的路徑，
// 需手動調整，目前還沒找出方法，故目前手動寫8個DOM來生成元件

//  <!-- <div
//         class="col-3 img-wall border border-secondary"
//         v-for="(item,index) in imgWallLink"
//         :key="index"
//       >
//         <a :href="imgWallLink[index]" class="w-100">
//           <img
//             :src="`https://kuncks.github.io/FurnitureShop_ghPages/static/images/furniture-1-${index}.jpg`"
//             alt
//             class="img-wall-img w-100"
//           />
//         </a>
//         <div class="img-wall-overlay"></div>
//       </div>-->
</script>
