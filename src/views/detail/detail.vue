<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav" />
    <b-scroll
      :probe-type="3"
      :pull-up-load="true"
      class="contents"
      ref="scroll"
      @position="contentScoroll"
    >
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" />
      <detail-param-info :param-info="paramInfo" />
      <detail-comment-info :comment-info="commentInfo" />
      <detail-recommend-list :recommend-list="recommendList" />
    </b-scroll>
    <back-top v-show="detailShowBackTop" @click.native="back" />
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
import DetailParamInfo from "./childComps/detailParamInfo.vue";
import DetailCommentInfo from "./childComps/detailCommentInfo.vue";
import DetailRecommendList from "./childComps/detailRecommendList.vue";
import BScroll from "components/common/scroll/BScroll.vue";
import { debounce } from "common/utils.js";
// 网络请求
import {
  getDetail,
  Goods,
  Shop,
  ParamInfo,
  getRecommend,
} from "network/detail.js";
import BackTop from "../../components/content/backtop/BackTop.vue";
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
    DetailParamInfo,
    DetailCommentInfo,
    DetailRecommendList,
    BackTop,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendList: [],
      detailShowBackTop: false,
    };
  },

  created() {
    this._getDetail();
    this._getRecommend();
  },

  mounted() {
    let refresh = debounce(this.$refs.scroll.refresh);
    this.$bus.$on("detailitemImgLoad", () => {
      refresh();
    });
  },

  methods: {
    _getDetail() {
      this.iid = this.$route.query.iid;
      //请求数据
      getDetail(this.iid)
        .then((res) => {
          // 获取轮播图照片
          const data = res.data.result;
          //获取顶部信息
          this.topImages = data.itemInfo.topImages;
          // 商品信息
          this.goods = new Goods(
            data.itemInfo,
            data.columns,
            data.shopInfo.services
          );
          // 店铺信息
          this.shop = new Shop(data.shopInfo);
          // 获取商品信息
          this.detailInfo = data.detailInfo;
          // 保存参数信息
          this.paramInfo = new ParamInfo(
            data.itemParams.info,
            data.itemParams.rule
          );
          // 获取评论信息
          if (data.rate.list) {
            this.commentInfo = data.rate.list[0];
          }
        })
        .catch((err) => console.log(err));
    },
    _getRecommend() {
      getRecommend().then((res, error) => {
        console.log(res);
        if (error) return;
        this.recommendList = res.data.data.list;
      });
    },
    contentScoroll(position) {
      this.detailShowBackTop = -position.y > 1000;
    },
    back() {
      this.$refs.scroll.scrollTo(0, 0, 800);
    },
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