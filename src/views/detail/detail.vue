<template>
  <div>
    <detail-nav-bar class="detail-nav" />
    <b-scroll :probe-type="3" :pull-up-load="true" class="content">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop" />
    </b-scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/detailNavBar.vue";
import DetailSwiper from "./childComps/detailSwiper.vue";
import DetailBaseInfo from "./childComps/detailBaseInfo.vue";
import BScroll from "components/common/scroll/BScroll.vue";

// 网络请求
import { getDetail, Goods, Shop } from "network/detail.js";
import DetailShopInfo from "./childComps/detailShopInfo.vue";
export default {
  name: "detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    BScroll,
    DetailBaseInfo,
    DetailShopInfo,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
    };
  },
  methods: {},
  created() {
    this.iid = this.$route.params.iid;

    getDetail(this.iid)
      .then((res) => {
        console.log(res);
        // 获取轮播图照片
        const data = res.data.result;
        this.topImages = data.itemInfo.topImages;
        // 商品信息
        this.goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );
        // 店铺信息
        this.shop = new Shop(data.shopInfo);
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style lang="less" scoped>
.detail-nav {
  position: relative;
}
.content {
  height: calc(100% - 95px);
}
</style>