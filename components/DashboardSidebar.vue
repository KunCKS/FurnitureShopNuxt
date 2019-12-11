<template>
  <div>
    <nav class="col-md-2 d-none d-md-block bg-light sidebar">
      <div class="sidebar-sticky">
        <h6
          class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
        >
          <span>管理員</span>
          <a class="d-flex align-items-center text-muted" href="#">
            <span data-feather="plus-circle" />
          </a>
        </h6>
        <ul class="nav flex-column mb-2">
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/admin/dashboardproducts">
              <i class="fas fa-box-open" /> 產品列表
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/admin/dashboardorders">
              <i class="far fa-list-alt" /> 訂單列表
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/admin/coupons">
              <i class="fas fa-ticket-alt" /> 優惠券列表
            </nuxt-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {}
</script>
