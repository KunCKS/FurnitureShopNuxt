<template>
  <div>
    <loading :active.sync="isLoading" />
    <div class="text-right py-3">
      <button
        @click="openModal(true)"
        class="btn btn-large btn-secondary"
        data-toggle="modal"
        data-target="#productModal"
      >
        新建產品
      </button>
    </div>
    <table class="table">
      <thead class="thead-light">
        <tr>
          <th scope="col" width="100">
            系列
          </th>
          <th scope="col" width="100">
            種類
          </th>
          <th scope="col">
            產品名稱
          </th>
          <th scope="col" width="110">
            原價
          </th>
          <th scope="col" width="110">
            售價
          </th>
          <th scope="col" width="100">
            是否啟用
          </th>
          <th scope="col" width="130">
            編輯
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.category_series }}</td>
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">
            {{ item.origin_price | currency }}
          </td>
          <td class="text-right">
            {{ item.price | currency }}
          </td>
          <td>
            <span v-if="item.is_enabled" class="text-success">已啟用</span>
            <span v-if="!item.is_enabled" class="text-danger">未啟用</span>
          </td>
          <td>
            <button
              @click="openModal(false, item)"
              class="btn btn-primary btn-sm"
            >
              編輯
            </button>
            <button
              @click="openModal(false, item, true)"
              class="btn btn-danger btn-sm"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination :pagination="pagination" @gopage="getProductsData" />
    <div id="productModal" class="modal fade" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 id="exampleModalLabel" class="modal-title">
              <span v-if="isNew">新增產品</span>
              <span v-if="!isNew">編輯產品</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    id="image"
                    v-model="tempProduct.imageUrl"
                    type="text"
                    class="form-control"
                    placeholder="請輸入圖片連結"
                  >
                </div>
                <div class="form-group">
                  <label for="customFile">
                    或 上傳圖片
                    <i v-if="upLoading" class="fas fa-spinner fa-spin" />
                  </label>
                  <input
                    id="customFile"
                    ref="files"
                    @change="upload"
                    type="file"
                    class="form-control"
                  >
                </div>
                <img :src="tempProduct.imageUrl" class="img-fluid" alt >
                <div v-if="tempProduct.image" class="form-group mt-2">
                  <label for="imageName">檔名</label>
                  <input
                    id="imageName"
                    v-model="tempProduct.image"
                    class="form-control"
                    name="imageName"
                  >
                </div>
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    id="title"
                    v-model="tempProduct.title"
                    type="text"
                    class="form-control"
                    placeholder="請輸入標題"
                  >
                </div>

                <div class="form-row">
                  <div class="form-group col-md-4">
                    <label for="category-series">分類-系列</label>
                    <input
                      id="category-series"
                      v-model="tempProduct.category_series"
                      type="text"
                      class="form-control"
                      placeholder="請輸入分類-系列"
                    >
                  </div>
                  <div class="form-group col-md-4">
                    <label for="category">分類-類型</label>
                    <input
                      id="category"
                      v-model="tempProduct.category"
                      type="text"
                      class="form-control"
                      placeholder="請輸入分類-類型"
                    >
                  </div>
                  <div class="form-group col-md-4">
                    <label for="price">單位</label>
                    <input
                      id="unit"
                      v-model="tempProduct.unit"
                      type="unit"
                      class="form-control"
                      placeholder="請輸入單位"
                    >
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input
                      id="origin_price"
                      v-model="tempProduct.origin_price"
                      type="number"
                      class="form-control"
                      placeholder="請輸入原價"
                    >
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      id="price"
                      v-model="tempProduct.price"
                      type="number"
                      class="form-control"
                      placeholder="請輸入售價"
                    >
                  </div>
                </div>
                <hr >

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea
                    id="description"
                    v-model="tempProduct.description"
                    type="text"
                    class="form-control"
                    placeholder="請輸入產品描述"
                  />
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea
                    id="content"
                    v-model="tempProduct.content"
                    type="text"
                    class="form-control"
                    placeholder="請輸入產品說明內容"
                  />
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      id="is_enabled"
                      v-model="tempProduct.is_enabled"
                      class="form-check-input"
                      type="checkbox"
                    >
                    <label
class="form-check-label"
for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button @click="update" type="button" class="btn btn-primary">
              <i v-if="isLoading" class="fas fa-spinner fa-spin" />確認
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      id="delProductModal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 id="delProductModalLabel" class="modal-title">
              <span>刪除產品</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 {{ tempProduct.title }} 商品
            <strong class="text-danger">(刪除後將無法恢復)</strong>。
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              @click="delProduct(tempProduct.id)"
              type="button"
              class="btn btn-danger"
            >
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import axios from 'axios'
import Pagination from '~/components/DashboardPagination'
// 在main.js中引入bootstrap時，雖然有安裝jQuery及propers，但他們只是bootstrap的相依套件而已，並沒有載入到裡面來，
// 所以這邊要自己引入到元件內＄才有定義
export default {
  middleware: 'Auth',
  meta: {
    requiresAuth: true
  },
  layout: 'admin',
  components: {
    Pagination
  },
  data () {
    return {
      products: [],
      tempProduct: {
        // title: "",
        // category:"",
        // origin_price: "",
        // price: "",
        // unit: "",
        // image: "",
        // description: "",
        // content: "",
        // is_enabled: 1,
        // imageUrl: ""
      },
      pagination: {},
      // isNew: false,
      upLoading: false
    }
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    },
    isNew () {
      return this.$store.state.isNew
    }
  },
  created () {
    const vm = this
    vm.getProductsData()
  },
  methods: {
    getProductsData (page = 1) {
      const vm = this
      vm.$store.dispatch('updateLoading', true)
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products?page=${page}`
      axios.get(api).then((response) => {
        console.log('後台取得資料：', response)
        vm.products = response.data.products
        vm.pagination = response.data.pagination
        vm.$store.dispatch('updateLoading', false)
      })
      // 將現有的分頁資料利用props傳到元件中，再利用emit將點擊時觸發的資料回傳到此頁面中，這樣就可以利用資料重新AJAX得到新的一筆分頁資料
      // 函式中先預設變數帶入1
    },
    update () {
      const vm = this
      vm.$store.dispatch('updateLoading', true)
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`
      let method = 'post'
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`
        method = 'put'
      }
      axios[method](api, { data: vm.tempProduct }).then((response) => {
        console.log('建立新產品：', response)
        this.getProductsData(vm.pagination.current_page)
        vm.$store.dispatch('updateLoading', false)
        $('#productModal').modal('hide')
      })
      // 這邊依照isNew變數來辦判斷要帶入的api及使用的 XHR方法
    },
    upload () {
      const vm = this
      // console.log(vm.$refs.files.files[0].name);
      vm.tempProduct.image = vm.$refs.files.files[0].name
      const uploadedFile = vm.$refs.files.files[0]
      vm.upLoading = true
      const formData = new FormData()
      formData.append('file-to-upload', uploadedFile)
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`
      axios
        .post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((response) => {
          // console.log(response.data, response, "上傳");
          vm.upLoading = false
          console.log(response.data, vm.$bus)
          if (response.data.success) {
            // vm.tempProduct.imageUrl = response.data.imageUrl;
            // console.log(vm.tempProduct);
            vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl)
            // console.log(vm.tempProduct);
            vm.$store.dispatch('updateMessage', { message: '上傳成功' })
          } else {
            const message = response.data.message
            vm.$store.dispatch('updateMessage', { message, status: 'danger' })
          }
        })
    },
    openModal (isNew, item, isDel) {
      if (isNew) {
        this.tempProduct = {}
        this.$store.dispatch('updateisNew', true)
      } else if (!isNew && isDel) {
        this.tempProduct = Object.assign({}, item)
        $('#delProductModal').modal('show')
      } else {
        this.tempProduct = Object.assign({}, item)
        this.$store.dispatch('updateisNew', false)
        $('#productModal').modal('show')
      } // 由於使用同一個modal，所以我們在這邊建立三個變數來去判斷要呈現的modal資料，依綁定時帶入的變數來去決定呈現的結果//因為傳參考的特性，再將資料丟到tempProduct時記得建立成新的物件
    },
    delProduct (id) {
      const vm = this
      vm.$store.dispatch('updateLoading', true)
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${id}`
      axios.delete(api).then((response) => {
        console.log('刪除產品：', response)
        this.getProductsData()
        vm.$store.dispatch('updateLoading', false)
        $('#delProductModal').modal('hide')
      })
    }
    // addFileName() {
    //   // console.log($("#customFile").val());
    //   let fileVal = $("#customFile").val();
    //   // console.log(fileVal.lastIndexOf("\\"));
    //   let index = fileVal.lastIndexOf("\\");
    //   // console.log(fileVal.substring(index + 1));
    //   this.tempProduct.image = fileVal.substring(index + 1);
    //   //利用change事件來添加檔名到變數中，這邊利用lastIndexOf帶入'\\'找到字串的index，然後利用index帶入substring()來return字串
    // }//忘記有ref屬性啦！！這邊不使用勒！
  }
}
</script>
