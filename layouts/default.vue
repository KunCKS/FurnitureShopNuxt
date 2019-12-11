<template>
  <div>
    <Alert/>
    <client-only><Sidebar /></client-only>
    <div class="pl-md-8">
      <div class="container">
        <Navbar />
      </div>
      <nuxt />
    </div>
    <footer class="pl-md-8">
      <footer-content />
    </footer>
  </div>
</template>
<script>
import Alert from '../components/Alert'
import Sidebar from '~/components/Sidebar'
import footerContent from '~/components/FooterContent'
import Navbar from '~/components/Navbar'
export default {
  components: {
    Sidebar,
    footerContent,
    Navbar,
    Alert
  },
  created () {
    this.$store.dispatch('getProductsData')
  }
}
</script>
