<template>
  <div>
    <detail-nav-bar class="detail-nav" />
    <b-scroll :probe-type="3" :pull-up-load="true" class="content">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-goods-info :detail-info="goods"></detail-goods-info>
    </b-scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/detailNavBar.vue";
import DetailSwiper from "./childComps/detailSwiper.vue";
import DetailGoodsInfo from "./childComps/detailGoodsInfo.vue";
import BScroll from "components/common/scroll/BScroll.vue";

// 网络请求
import { getDetail, Goods } from "network/detail.js";
export default {
  name: "detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    BScroll,
    DetailGoodsInfo,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
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

        this.goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );
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
  height: calc(100% - 44px);
}
</style>