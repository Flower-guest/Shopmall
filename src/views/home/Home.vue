<template>
  <div class="home">
    <navbar class="home-nav">
      <div slot="center">购物街</div>
    </navbar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      class="tab-control"
      @title-click="titleType"
      ref="tabControl1"
      v-show="isFlex"
    />
    <b-scroll
      class="content"
      ref="scroll"
      @position="showBackTop"
      :probe-type="3"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper
        :banners="banners"
        @swiperImgLoad="swiperImgLoad"
      ></home-swiper>
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        :titles="['流行', '新款', '精选']"
        class="tab-control"
        @title-click="titleType"
        ref="tabControl2"
      />
      <goods-list :goods="showGoods" />
    </b-scroll>
    <back-top v-show="isShowBackTop" @click.native="backTop" />
  </div>
</template>

<script>
// 私有组件
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
// 公共组件
import BackTop from "components/content/backtop/BackTop";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Navbar from "components/common/navbar/Navbar";
import BScroll from "components/common/scroll/BScroll";
import { itemListenerMixin } from "common/mixin.js";
// axios请求
import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  components: {
    Navbar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    BScroll,
    BackTop,
  },
  mixins: [itemListenerMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      currentType: "pop",
      isShowBackTop: false,
      isFlex: false,
      topHeight: null,
      scollY: null,
      goods: {
        pop: {
          page: 0,
          list: [],
        },
        new: {
          page: 0,
          list: [],
        },
        sell: {
          page: 0,
          list: [],
        },
      },
    };
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  // 记录浏览器跳转时得位置
  activated() {
    this.$refs.scroll.scrollTo(0, this.scollY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // 保存Y值
    this.scollY = this.$refs.scroll.getScrollY();
    // 取消全局事件
    this.$bus.$off("itemImgLoad", this.homeItemListener);
  },

  methods: {
    /**事件监听方法*/
    titleType(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    showBackTop(position) {
      this.isShowBackTop = -position.y > 1000;
      this.isFlex = -position.y > this.topHeight;
    },
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 800);
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    swiperImgLoad() {
      this.topHeight = this.$refs.tabControl2.$el.offsetTop;
    },
    /* 网络请求方法*/
    getHomeMultidata() {
      getHomeMultidata()
        .then((res) => {
          this.banners = res.data.data.banner.list;
          this.recommends = res.data.data.recommend.list;
        })
        .catch((err) => console.log(err));
    },
    getHomeGoods(type) {
      let page = this.goods[type].page + 1;
      getHomeGoods(type, page)
        .then((res) => {
          this.goods[type].list.push(...res.data.data.list);
          this.goods[type].page += 1;
          this.$refs.scroll.finishPullUp();
        })
        .catch((err) => console.log(err));
    },
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  height: 100vh;
  width: 100%;
  padding: 44px 0 49px;
  position: relative;
  .home-nav {
    background-color: @color-tint;
    color: @color-background;
  }
  .tab-control {
    position: relative;
    z-index: 9;
  }
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
}
</style>
