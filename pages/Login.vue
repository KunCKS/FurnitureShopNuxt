<template>
  <div class="container section-full-height">
    <loading :active.sync="isLoading" />
    <div class="row justify-content-center py-9">
      <div class="col-md-6">
        <form @submit.prevent="login" class="form-signin">
          <h1 class="h3 mb-3 font-weight-normal text-center">
            會員(管理員)登入
          </h1>
          <label for="inputEmail" class="sr-only">Email address</label>
          <input
            id="inputEmail"
            v-model="loginData.email"
            type="email"
            class="form-control"
            placeholder="Email address"
            required
            autofocus
          >
          <label for="inputPassword" class="sr-only">Password</label>
          <input
            id="inputPassword"
            v-model="loginData.password"
            type="password"
            class="form-control"
            placeholder="Password"
            required
          >
          <div class="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" > Remember me
            </label>
          </div>
          <button class="btn btn-lg btn-primary btn-block" type="submit">
            登入
          </button>
          <p class="mt-5 mb-3 text-muted text-center">
            &copy; 2017-2019
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginData: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    }
  },
  methods: {
    login () {
      const data = {
        username: this.loginData.email,
        password: this.loginData.password
      }
      // console.log(data) // TEST 測試用
      this.$store.dispatch('login', data)
    }
  }
}
</script>

<style lang="scss" scoped>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type='email'] {
  margin-bottom: -1px;
  border-radius: 0.25rem;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type='password'] {
  margin-bottom: 10px;
  border-radius: 0.25rem;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
