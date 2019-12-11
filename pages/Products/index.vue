<template>
  <div>
    <products-header
      :productsHeaderData="productsHeaderData[`${headerTarget}`]"
    />
    <products-list />
    <a id="scrollTop" @click.prevent="scrollTop" href="#" class="scroll-top">
      <i class="fas fa-angle-double-up" />
    </a>
  </div>
</template>

<script>
// 自訂元件
import $ from 'jquery'
import ProductsHeader from '~/components/ProductsHeader'
import ProductsList from '~/components/ProductsList'

// 外部插件

export default {
  components: {
    ProductsHeader,
    ProductsList
  },
  data () {
    return {
      // header資料，這邊會利用 $route.params 來過濾要呈現資料，方法可看下方 computed 的 headerTarget（）
      productsHeaderData: {
        全系列: {
          title: '全系列',
          content:
            '生活是一種藝術，品味、 美感是其中的色彩、筆觸，人、物件與空間彼此呼應的共鳴， 為這門藝術注入光采的靈魂。透過純粹的素材、簡約的設計、卓越的工藝與獨特的風格， 創造舒適愜意的生活質感。',
          bgColor: '#fbfbfb'
        },
        沙發: {
          title: '新款沙發',
          content:
            '溫暖舒適的居家空間，必定少不了一座好沙發，不僅左右空間氛圍，更表達自我獨特的風格，反映個人生活哲學',
          bgColor: '#fbfbfb'
        },
        椅子: {
          title: '新款椅子',
          content:
            '如果您正尋找兼具設計又舒適的椅子，無需再躊躇。我們剛剛推出這些令人興奮的設計——現代家居的絕配。',
          bgColor: '#fbfbfb'
        },
        收納系列: {
          title: '新款收納系列',
          content:
            '如果您正尋找兼具設計又收納方便的傢俱，無需再躊躇。我們剛剛推出這些令人興奮的設計——現代家居的絕配。',
          bgColor: '#fbfbfb'
        },
        桌子: {
          title: '新款桌子',
          content:
            '桌是家庭生活的中心區域，乘載各式的生活樣貌，無需再躊躇，快來探索一張屬於您個人風格的桌子吧。',
          bgColor: '#fbfbfb'
        }
      }
    }
  },
  computed: {
    // 利用 $route.params 過濾 header 要呈現的資料
    headerTarget () {
      if (!this.$route.params.category) {
        return '全系列'
      }
      return this.$route.params.category
    }
  },
  mounted () {
    // 當 scrollTop() 大於某高度時，動態添加 ClassName
    $(window).scroll(() => {
      // //如果頁面不在/products及其子route時，則不再進行scroll監視。
      if (this.$route.fullPath.indexOf('/products') !== 0) {
        //   $(window).unbind("scroll");
        return // return 退出函式，否則下面語法一樣會執行一次。
      }
      if ($(window).scrollTop() > 90) {
        $('#scrollTop').addClass('shown')
      } else {
        $('#scrollTop').removeClass('shown')
      }
      // console.log($(window).scrollTop());
    })
  },
  methods: {
    // 滾動到最頂端
    scrollTop () {
      $('html,body').animate(
        {
          scrollTop: 0
        },
        700
      )
    }
  }
}
</script>
