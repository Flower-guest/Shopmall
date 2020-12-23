<template>
  <div class="home">
    <navbar class="home-nav">
      <div slot="center">购物街</div>
    </navbar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      class="tab-control"
      @title-click="titleType"
      ref="tabControl"
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
        ref="tabControl"
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
import { debounce } from "common/utils.js";
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
  data() {
    return {
      banners: [],
      recommends: [],
      currentType: "pop",
      isShowBackTop: false,
      isFlex: false,
      topHeight: null,
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
  mounted() {
    // 监听item图片加载完，  事件总线
    const refresh = debounce(this.$refs.scroll.refresh);
    this.$bus.$on("itemImgLoad", () => {
      refresh();
    });
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
      this.topHeight = this.$refs.tabControl.$el.offsetTop;
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
