<template>
  <section>
    <div
      class="bg-cover d-flex justify-content-center flex-column align-items-center introduce-company-section"
      style="background-image:url('https://images.unsplash.com/photo-1557618159-7d6fe547ae20?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80')"
    >
      <h2
        class="introduce-company-section-title h5 col-md-3 col-5 text-center text-white"
      >
        傳承品質
      </h2>
      <p
        class="introduce-company-section-content col-10 text-white text-justify mt-3"
      >
        因醉心於歐洲美學的深厚底蘊，與其工藝的剛毅究極。我們推崇精湛的工藝，一絲不苟地關注細節，堅持使用最高品質的材料。從裡到外，給全家人最挑剔的照顧。我們相信生活永遠可以有更好的方式，為熱愛也考究生活的您，營造完美宜人的空間氛圍。
      </p>
      <nuxt-link
        to="/products"
        class="introduce-company-section-btn btn btn-outline-light mt-4"
      >
        SHOP NOW
      </nuxt-link>
    </div>
  </section>
</template>

<style lang="scss">
.introduce-company-section {
  min-height: 450px;
  .introduce-company-section-title {
  }
  .introduce-company-section-content {
  }
  .introduce-company-section-btn {
    width: 200px;
    padding: 15px 0;
  }
}
</style>
