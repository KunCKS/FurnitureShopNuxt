export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || 'ASIN家具電商',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', content: 'ASIN家具電商' },
      {
        name: 'image',
        content:
          'https://images.unsplash.com/photo-1507149833265-60c372daea22?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=480&q=80'
      },
      { 'http-equiv': 'X-UA-Compatible', content: 'ie=edge' },
      { property: 'og:title', content: 'ASIN Furniture Shop' },
      { property: 'og:description', content: 'ASIN家具電商' },
      { property: 'og:site_name', content: 'ASIN Furniture Shop' },
      { property: 'og:locale', content: 'zh_TW' },
      { property: 'og:type', content: 'website' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css'
      }
    ],
    script: [
      // {
      //   src:
      //     'https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js',
      //   crossorigin: 'anonymous'
      // },
      // {
      //   src: 'https://code.jquery.com/jquery-3.4.1.slim.min.js',
      //   crossorigin: 'anonymous'
      // }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~/assets/all.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/filters/filters', '~/plugins/index'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
    // '@nuxtjs/router'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    // withCredentials: true
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend (config, ctx) {}
  },
  env: {
    VUE_APP_APIPATH: 'https://vue-course-api.hexschool.io',
    VUE_APP_CUSTOMPATH: 'komu'
  }
  // router: {
  //   extendRoutes (routes, resolve) {
  //     routes.push({
  //       name: 'default',
  //       path: '*',
  //       redirect: '/home',
  //       component: resolve(__dirname, '~/pages/Home')
  //     })
  //   }
  // }
}
