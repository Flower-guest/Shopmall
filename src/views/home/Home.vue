<template>
  <div class="home">
    <navbar class="home-nav">
      <div slot="center">购物街</div>
    </navbar>
    <b-scroll class="content">
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        :titles="['流行', '新款', '精选']"
        class="tab-control"
        @title-click="titleType"
      />
      <goods-list :goods="showGoods" />
    </b-scroll>
  </div>
</template>

<script>
// 私有组件
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
// 公共组件
import Navbar from "components/common/navbar/Navbar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BScroll from "components/common/scroll/BScroll";
// axios请求
import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
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
      currentType: "pop",
      scroll: null,
    };
  },
  components: {
    Navbar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    BScroll,
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  methods: {
    /**
    事件监听方法
     */
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
    /* 
    网络请求方法
     */
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
