<template>
  <div class="home">
    <navbar class="home-nav">
      <div slot="center">购物街</div>
    </navbar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends" />
    <feature-view />
    <tab-control
      :titles="['流行', '新款', '精选']"
      class="tab-control"
      @title-click="titleType"
    />
    <goods-list :goods="showGoods" />
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
    };
  },
  components: {
    Navbar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
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
  width: 100%;
  padding-top: 44px;
  .home-nav {
    background-color: @color-tint;
    color: @color-background;
  }
  .tab-control {
    position: -webkit-sticky;
    position: sticky;
    top: 44px;
  }
}
</style>
