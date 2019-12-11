<template>
  <div
    :class="{
      'bg-img-show': productsHeaderData.imgUrl,
      'd-flex': productsHeaderData.imgUrl,
      'flex-column': productsHeaderData.imgUrl,
      'justify-content-center': productsHeaderData.imgUrl,
      'align-items-center': productsHeaderData.imgUrl,
      'text-white': productsHeaderData.imgUrl,
    }"
    :style="
      `background-color: ${productsHeaderData.bgColor};background-image: url(${productsHeaderData.imgUrl})`
    "
    class="text-center py-6 px-4"
  >
    <h1 :class="{ 'mb-4': !productsHeaderData.imgUrl }" class="h2">
      {{ productsHeaderData.title }}
    </h1>
    <p>{{ productsHeaderData.content }}</p>
  </div>
</template>

<script>
export default {
  props: ['productsHeaderData']
}
</script>
<style lang="scss">
.bg-img-show {
  background-size: cover;
  background-position: center 75%;
  height: 40vh;
}
</style>
