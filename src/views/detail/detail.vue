<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav" />
    <b-scroll
      :probe-type="3"
      :pull-up-load="true"
      class="contents"
      ref="scrolls"
    >
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" />
    </b-scroll>
    <detail-bottom-bar />
  </div>
</template>

<script>
import DetailNavBar from "./childComps/detailNavBar.vue";
import DetailSwiper from "./childComps/detailSwiper.vue";
import DetailBaseInfo from "./childComps/detailBaseInfo.vue";
import DetailShopInfo from "./childComps/detailShopInfo.vue";
import DetailBottomBar from "./childComps/detailBottomBar.vue";
import DetailGoodsInfo from "./childComps/detailGoodsInfo.vue";

import BScroll from "components/common/scroll/BScroll.vue";
import { debounce } from "common/utils.js";
// 网络请求
import { getDetail, Goods, Shop } from "network/detail.js";
export default {
  name: "detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    BScroll,
    DetailBaseInfo,
    DetailShopInfo,
    DetailBottomBar,
    DetailGoodsInfo,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
    };
  },

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
        this.detailInfo = data.detailInfo;
      })
      .catch((err) => console.log(err));
  },
  mounted() {
    setTimeout(() => {
      this.$refs.scrolls.refresh();
    }, 3000);
  },
};
</script>

<style lang="less" scoped>
.detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
  width: 100%;

  .detail-nav {
    position: relative;
    z-index: 1;
    background-color: #fff;
  }

  .contents {
    height: calc(100% - 104px);
    overflow: hidden;
  }
}
</style>