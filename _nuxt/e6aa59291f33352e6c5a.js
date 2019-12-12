(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{206:function(t,e,o){"use strict";(function(t){o(61);var r=o(2),n=o.n(r),c=o(215);e.a={middleware:"Auth",meta:{requiresAuth:!0},layout:"admin",components:{Pagination:c.a},data:function(){return{products:[],tempProduct:{},pagination:{},upLoading:!1}},computed:{isLoading:function(){return this.$store.state.isLoading},isNew:function(){return this.$store.state.isNew}},created:function(){this.getProductsData()},methods:{getProductsData:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,e=this;e.$store.dispatch("updateLoading",!0);var o="".concat("https://vue-course-api.hexschool.io","/api/").concat("komu","/admin/products?page=").concat(t);n.a.get(o).then((function(t){console.log("後台取得資料：",t),e.products=t.data.products,e.pagination=t.data.pagination,e.$store.dispatch("updateLoading",!1)}))},update:function(){var e=this,o=this;o.$store.dispatch("updateLoading",!0);var r="".concat("https://vue-course-api.hexschool.io","/api/").concat("komu","/admin/product"),c="post";o.isNew||(r="".concat("https://vue-course-api.hexschool.io","/api/").concat("komu","/admin/product/").concat(o.tempProduct.id),c="put"),n.a[c](r,{data:o.tempProduct}).then((function(r){console.log("建立新產品：",r),e.getProductsData(o.pagination.current_page),o.$store.dispatch("updateLoading",!1),t("#productModal").modal("hide")}))},upload:function(){var t=this;t.tempProduct.image=t.$refs.files.files[0].name;var e=t.$refs.files.files[0];t.upLoading=!0;var o=new FormData;o.append("file-to-upload",e);var r="".concat("https://vue-course-api.hexschool.io","/api/").concat("komu","/admin/upload");n.a.post(r,o,{headers:{"Content-Type":"multipart/form-data"}}).then((function(e){if(t.upLoading=!1,console.log(e.data,t.$bus),e.data.success)t.$set(t.tempProduct,"imageUrl",e.data.imageUrl),t.$store.dispatch("updateMessage",{message:"上傳成功"});else{var o=e.data.message;t.$store.dispatch("updateMessage",{message:o,status:"danger"})}}))},openModal:function(e,o,r){e?(this.tempProduct={},this.$store.dispatch("updateisNew",!0)):!e&&r?(this.tempProduct=Object.assign({},o),t("#delProductModal").modal("show")):(this.tempProduct=Object.assign({},o),this.$store.dispatch("updateisNew",!1),t("#productModal").modal("show"))},delProduct:function(e){var o=this,r=this;r.$store.dispatch("updateLoading",!0);var c="".concat("https://vue-course-api.hexschool.io","/api/").concat("komu","/admin/product/").concat(e);n.a.delete(c).then((function(e){console.log("刪除產品：",e),o.getProductsData(),r.$store.dispatch("updateLoading",!1),t("#delProductModal").modal("hide")}))}}}}).call(this,o(42))},215:function(t,e,o){"use strict";var r={props:["pagination"],methods:{goPage:function(t){this.$emit("gopage",t)}}},n=o(3),component=Object(n.a)(r,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("nav",{attrs:{"aria-label":"Page navigation example"}},[o("ul",{staticClass:"pagination"},[o("li",{staticClass:"page-item",class:{disabled:!t.pagination.has_pre}},[o("a",{staticClass:"page-link",attrs:{href:"#","aria-label":"Previous"},on:{click:function(e){return e.preventDefault(),t.goPage(t.pagination.current_page-1)}}},[o("span",{attrs:{"aria-hidden":"true"}},[t._v("«")])])]),t._v(" "),t._l(t.pagination.total_pages,(function(e){return o("li",{key:e,staticClass:"page-item",class:{active:t.pagination.current_page===e}},[o("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(o){return o.preventDefault(),t.goPage(e)}}},[t._v(t._s(e))])])})),t._v(" "),o("li",{staticClass:"page-item",class:{disabled:!t.pagination.has_next}},[o("a",{staticClass:"page-link",attrs:{href:"#","aria-label":"Next"},on:{click:function(e){return e.preventDefault(),t.goPage(t.pagination.current_page+1)}}},[o("span",{attrs:{"aria-hidden":"true"}},[t._v("»")])])])],2)])}),[],!1,null,null,null);e.a=component.exports},246:function(t,e,o){"use strict";o.r(e);var r=o(206).a,n=o(3),component=Object(n.a)(r,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("loading",{attrs:{active:t.isLoading},on:{"update:active":function(e){t.isLoading=e}}}),t._v(" "),o("div",{staticClass:"text-right py-3"},[o("button",{staticClass:"btn btn-large btn-secondary",attrs:{"data-toggle":"modal","data-target":"#productModal"},on:{click:function(e){return e.preventDefault(),t.openModal(!0)}}},[t._v("\n        新建產品\n      ")])]),t._v(" "),o("table",{staticClass:"table"},[t._m(0),t._v(" "),o("tbody",t._l(t.products,(function(e){return o("tr",{key:e.id},[o("td",[t._v(t._s(e.category_series))]),t._v(" "),o("td",[t._v(t._s(e.category))]),t._v(" "),o("td",[t._v(t._s(e.title))]),t._v(" "),o("td",{staticClass:"text-right"},[t._v("\n            "+t._s(t._f("currency")(e.origin_price))+"\n          ")]),t._v(" "),o("td",{staticClass:"text-right"},[t._v("\n            "+t._s(t._f("currency")(e.price))+"\n          ")]),t._v(" "),o("td",[e.is_enabled?o("span",{staticClass:"text-success"},[t._v("已啟用")]):t._e(),t._v(" "),e.is_enabled?t._e():o("span",{staticClass:"text-danger"},[t._v("未啟用")])]),t._v(" "),o("td",[o("button",{staticClass:"btn btn-primary btn-sm",on:{click:function(o){return o.preventDefault(),t.openModal(!1,e)}}},[t._v("\n              編輯\n            ")]),t._v(" "),o("button",{staticClass:"btn btn-danger btn-sm",on:{click:function(o){return o.preventDefault(),t.openModal(!1,e,!0)}}},[t._v("\n              刪除\n            ")])])])})),0)]),t._v(" "),o("pagination",{attrs:{pagination:t.pagination},on:{gopage:t.getProductsData}}),t._v(" "),o("div",{staticClass:"modal fade",attrs:{id:"productModal",tabindex:"-1",role:"dialog"}},[o("div",{staticClass:"modal-dialog modal-lg",attrs:{role:"document"}},[o("div",{staticClass:"modal-content border-0"},[o("div",{staticClass:"modal-header bg-dark text-white"},[o("h5",{staticClass:"modal-title",attrs:{id:"exampleModalLabel"}},[t.isNew?o("span",[t._v("新增產品")]):t._e(),t._v(" "),t.isNew?t._e():o("span",[t._v("編輯產品")])]),t._v(" "),t._m(1)]),t._v(" "),o("div",{staticClass:"modal-body"},[o("div",{staticClass:"row"},[o("div",{staticClass:"col-sm-4"},[o("div",{staticClass:"form-group"},[o("label",{attrs:{for:"image"}},[t._v("輸入圖片網址")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.tempProduct.imageUrl,expression:"tempProduct.imageUrl"}],staticClass:"form-control",attrs:{id:"image",type:"text",placeholder:"請輸入圖片連結"},domProps:{value:t.tempProduct.imageUrl},on:{input:function(e){e.target.composing||t.$set(t.tempProduct,"imageUrl",e.target.value)}}})]),t._v(" "),o("div",{staticClass:"form-group"},[o("label",{attrs:{for:"customFile"}},[t._v("\n                    或 上傳圖片\n                    "),t.upLoading?o("i",{staticClass:"fas fa-spinner fa-spin"}):t._e()]),t._v(" "),o("input",{ref:"files",staticClass:"form-control",attrs:{id:"customFile",type:"file"},on:{change:t.upload}})]),t._v(" "),o("img",{staticClass:"img-fluid",attrs:{src:t.tempProduct.imageUrl,alt:""}}),t._v(" "),t.tempProduct.image?o("div",{staticClass:"form-group mt-2"},[o("label",{attrs:{for:"imageName"}},[t._v("檔名")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.tempProduct.image,expression:"tempProduct.image"}],staticClass:"form-control",attrs:{id:"imageName",name:"imageName"},domProps:{value:t.tempProduct.image},on:{input:function(e){e.target.composing||t.$set(t.tempProduct,"image",e.target.value)}}})]):t._e()]),t._v(" "),o("div",{staticClass:"col-sm-8"},[o("div",{staticClass:"form-group"},[o("label",{attrs:{for:"title"}},[t._v("標題")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.tempProduct.title,expression:"tempProduct.title"}],staticClass:"form-control",attrs:{id:"title",type:"text",placeholder:"請輸入標題"},domProps:{value:t.tempProduct.title},on:{input:function(e){e.target.composing||t.$set(t.tempProduct,"title",e.target.value)}}})]),t._v(" "),o("div",{staticClass:"form-row"},[o("div",{staticClass:"form-group col-md-4"},[o("label",{attrs:{for:"category-series"}},[t._v("分類-系列")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.tempProduct.category_series,expression:"tempProduct.category_series"}],staticClass:"form-control",attrs:{id:"category-series",type:"text",placeholder:"請輸入分類-系列"},domProps:{value:t.tempProduct.category_series},on:{input:function(e){e.target.composing||t.$set(t.tempProduct,"category_series",e.target.value)}}})]),t._v(" "),o("div",{staticClass:"form-group col-md-4"},[o("label",{attrs:{for:"category"}},[t._v("分類-類型")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.tempProduct.category,expression:"tempProduct.category"}],staticClass:"form-control",attrs:{id:"category",type:"text",placeholder:"請輸入分類-類型"},domProps:{value:t.tempProduct.category},on:{input:function(e){e.target.composing||t.$set(t.tempProduct,"category",e.target.value)}}})]),t._v(" "),o("div",{staticClass:"form-group col-md-4"},[o("label",{attrs:{for:"price"}},[t._v("單位")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.tempProduct.unit,expression:"tempProduct.unit"}],staticClass:"form-control",attrs:{id:"unit",type:"unit",placeholder:"請輸入單位"},domProps:{value:t.tempProduct.unit},on:{input:function(e){e.target.composing||t.$set(t.tempProduct,"unit",e.target.value)}}})])]),t._v(" "),o("div",{staticClass:"form-row"},[o("div",{staticClass:"form-group col-md-6"},[o("label",{attrs:{for:"origin_price"}},[t._v("原價")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.tempProduct.origin_price,expression:"tempProduct.origin_price"}],staticClass:"form-control",attrs:{id:"origin_price",type:"number",placeholder:"請輸入原價"},domProps:{value:t.tempProduct.origin_price},on:{input:function(e){e.target.composing||t.$set(t.tempProduct,"origin_price",e.target.value)}}})]),t._v(" "),o("div",{staticClass:"form-group col-md-6"},[o("label",{attrs:{for:"price"}},[t._v("售價")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.tempProduct.price,expression:"tempProduct.price"}],staticClass:"form-control",attrs:{id:"price",type:"number",placeholder:"請輸入售價"},domProps:{value:t.tempProduct.price},on:{input:function(e){e.target.composing||t.$set(t.tempProduct,"price",e.target.value)}}})])]),t._v(" "),o("hr"),t._v(" "),o("div",{staticClass:"form-group"},[o("label",{attrs:{for:"description"}},[t._v("產品描述")]),t._v(" "),o("textarea",{directives:[{name:"model",rawName:"v-model",value:t.tempProduct.description,expression:"tempProduct.description"}],staticClass:"form-control",attrs:{id:"description",type:"text",placeholder:"請輸入產品描述"},domProps:{value:t.tempProduct.description},on:{input:function(e){e.target.composing||t.$set(t.tempProduct,"description",e.target.value)}}})]),t._v(" "),o("div",{staticClass:"form-group"},[o("label",{attrs:{for:"content"}},[t._v("說明內容")]),t._v(" "),o("textarea",{directives:[{name:"model",rawName:"v-model",value:t.tempProduct.content,expression:"tempProduct.content"}],staticClass:"form-control",attrs:{id:"content",type:"text",placeholder:"請輸入產品說明內容"},domProps:{value:t.tempProduct.content},on:{input:function(e){e.target.composing||t.$set(t.tempProduct,"content",e.target.value)}}})]),t._v(" "),o("div",{staticClass:"form-group"},[o("div",{staticClass:"form-check"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.tempProduct.is_enabled,expression:"tempProduct.is_enabled"}],staticClass:"form-check-input",attrs:{id:"is_enabled",type:"checkbox"},domProps:{checked:Array.isArray(t.tempProduct.is_enabled)?t._i(t.tempProduct.is_enabled,null)>-1:t.tempProduct.is_enabled},on:{change:function(e){var o=t.tempProduct.is_enabled,r=e.target,n=!!r.checked;if(Array.isArray(o)){var c=t._i(o,null);r.checked?c<0&&t.$set(t.tempProduct,"is_enabled",o.concat([null])):c>-1&&t.$set(t.tempProduct,"is_enabled",o.slice(0,c).concat(o.slice(c+1)))}else t.$set(t.tempProduct,"is_enabled",n)}}}),t._v(" "),o("label",{staticClass:"form-check-label",attrs:{for:"is_enabled"}},[t._v("是否啟用")])])])])])]),t._v(" "),o("div",{staticClass:"modal-footer"},[o("button",{staticClass:"btn btn-outline-secondary",attrs:{type:"button","data-dismiss":"modal"}},[t._v("\n              取消\n            ")]),t._v(" "),o("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.update(e)}}},[t.isLoading?o("i",{staticClass:"fas fa-spinner fa-spin"}):t._e(),t._v("確認\n            ")])])])])]),t._v(" "),o("div",{staticClass:"modal fade",attrs:{id:"delProductModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true"}},[o("div",{staticClass:"modal-dialog",attrs:{role:"document"}},[o("div",{staticClass:"modal-content border-0"},[t._m(2),t._v(" "),o("div",{staticClass:"modal-body"},[t._v("\n            是否刪除 "+t._s(t.tempProduct.title)+" 商品\n            "),o("strong",{staticClass:"text-danger"},[t._v("(刪除後將無法恢復)")]),t._v("。\n          ")]),t._v(" "),o("div",{staticClass:"modal-footer"},[o("button",{staticClass:"btn btn-outline-secondary",attrs:{type:"button","data-dismiss":"modal"}},[t._v("\n              取消\n            ")]),t._v(" "),o("button",{staticClass:"btn btn-danger",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.delProduct(t.tempProduct.id)}}},[t._v("\n              確認刪除\n            ")])])])])])],1)}),[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("thead",{staticClass:"thead-light"},[o("tr",[o("th",{attrs:{scope:"col",width:"100"}},[t._v("\n            系列\n          ")]),t._v(" "),o("th",{attrs:{scope:"col",width:"100"}},[t._v("\n            種類\n          ")]),t._v(" "),o("th",{attrs:{scope:"col"}},[t._v("\n            產品名稱\n          ")]),t._v(" "),o("th",{attrs:{scope:"col",width:"110"}},[t._v("\n            原價\n          ")]),t._v(" "),o("th",{attrs:{scope:"col",width:"110"}},[t._v("\n            售價\n          ")]),t._v(" "),o("th",{attrs:{scope:"col",width:"100"}},[t._v("\n            是否啟用\n          ")]),t._v(" "),o("th",{attrs:{scope:"col",width:"130"}},[t._v("\n            編輯\n          ")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[e("span",{attrs:{"aria-hidden":"true"}},[this._v("×")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"modal-header bg-danger text-white"},[e("h5",{staticClass:"modal-title",attrs:{id:"delProductModalLabel"}},[e("span",[this._v("刪除產品")])]),this._v(" "),e("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[e("span",{attrs:{"aria-hidden":"true"}},[this._v("×")])])])}],!1,null,null,null);e.default=component.exports}}]);