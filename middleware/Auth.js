import axios from 'axios'
export default ({ route, redirect }) => {
  if (process.server) {
    if (route.meta[0].requiresAuth) {
      console.log('需要驗證')
      const api = `${process.env.VUE_APP_APIPATH}/api/user/check`
      axios.post(api).then((response) => {
        console.log('檢查用戶是否仍持續登入：', response)
        if (!response.data.success) {
          alert('請重新登入')
          return redirect('/login')
        }
      })
    } else {
      console.log('不需要驗證')
    }
  }
  console.log('routerAuth')
  console.log(route.meta[0].requiresAuth)
  if (route.meta[0].requiresAuth) {
    console.log('需要驗證')
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`
    axios.post(api).then((response) => {
      console.log('檢查用戶是否仍持續登入：', response)
      if (!response.data.success) {
        alert('請重新登入')
        return redirect('/login')
      }
    })
  } else {
    console.log('不需要驗證')
  }
}
