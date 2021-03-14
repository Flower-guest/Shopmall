<template>
  <div class="detail">
    <detail-nav-bar
      class="detail-nav"
      @navposition="navposition"
      ref="detailnav"
    />
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
      <detail-goods-info
        :detail-info="detailInfo"
        @detailImgLoad="detailImgLoad"
      />
      <detail-param-info ref="param" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <detail-recommend-list ref="recommend" :recommend-list="recommendList" />
    </b-scroll>
    <back-top v-show="detailShowBackTop" @click.native="back" />
    <detail-bottom-bar @addToCart="addToCart" />
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
import BackTop from "components/content/backtop/BackTop.vue";
import BScroll from "components/common/scroll/BScroll.vue";
import { itemListenerMixin } from "common/mixin.js";
import { debounce } from "common/utils.js";
// 网络请求
import {
  getDetail,
  Goods,
  Shop,
  ParamInfo,
  getRecommend,
} from "network/detail.js";
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
  mixins: [itemListenerMixin],
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
      themeTopY: [],
      getThemeTopY: null,
      isCenter: false,
    };
  },
  created() {
    this._getDetail();
    this._getRecommend();
    this.getThemeTopY = debounce(() => {
      this.themeTopY = [];
      this.themeTopY.push(0);
      this.themeTopY.push(this.$refs.param.$el.offsetTop - 44);
      this.themeTopY.push(this.$refs.comment.$el.offsetTop - 44);
      this.themeTopY.push(this.$refs.recommend.$el.offsetTop - 44);
      this.themeTopY.push(Number.MAX_VALUE);
    });
  },
  destroyed() {
    this.$bus.$off("itemImgLoad", this.itemListenerMixin);
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
        if (error) return;
        this.recommendList = res.data.data.list;
      });
    },
    // 1.是否显示返回  2.滚动内容显示对应标题
    contentScoroll(position) {
      const positionY = -position.y;
      const length = this.themeTopY.length;
      this.detailShowBackTop = -position.y > 1000;
      for (let i = 0; i < length - 1; i++) {
        if (
          positionY >= this.themeTopY[i] &&
          positionY < this.themeTopY[i + 1]
        ) {
          this.detailIndex(i);
        }
      }
    },
    detailIndex(i) {
      this.$refs.detailnav.currentIndex = i;
    },
    // 返回顶部
    back() {
      this.$refs.scroll.scrollTo(0, 0, 800);
    },
    // 监听详情图片加载完成
    detailImgLoad() {
      this.refresh();
      this.getThemeTopY();
    },
    // 点击顶部导航栏跳转指定位置
    navposition(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 200);
    },
    // 添加购物车
    addToCart() {
      // 获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.nowPrice;
      product.iid = this.iid;
      this.$store.dispatch("addCarts", product).then((res) => {
        this.$toast.show(res);
      });
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
  overflow: hidden;

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