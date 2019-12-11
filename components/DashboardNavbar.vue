<template>
  <div>
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <nuxt-link
        class="navbar-brand col-sm-3 col-md-2 mr-0"
        to="/admin/dashboardproducts"
      >
        ASin DESIGN
      </nuxt-link>
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a @click.prevent="signout" class="nav-link" href="#">登出</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    signout () {
      this.$store.dispatch('signout')
    }
  }
}
</script>
