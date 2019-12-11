<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li :class="{ disabled: !pagination.has_pre }" class="page-item">
        <a
          @click.prevent="goPage(pagination.current_page - 1)"
          class="page-link"
          href="#"
          aria-label="Previous"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        :class="{ active: pagination.current_page === page }"
        v-for="page in pagination.total_pages"
        :key="page"
        class="page-item"
      >
        <a @click.prevent="goPage(page)" class="page-link" href="#">{{
          page
        }}</a>
      </li>
      <li :class="{ disabled: !pagination.has_next }" class="page-item">
        <a
          @click="goPage(pagination.current_page + 1)"
          class="page-link"
          href="#"
          aria-label="Next"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['pagination'],
  methods: {
    // a連結點擊時會根據props傳入的資料來做判斷(currentpage)，再將數值回傳到函式內並 emit 到 DashboardProducts.vue
    goPage (page) {
      this.$emit('gopage', page)
    }
  }
}
</script>
