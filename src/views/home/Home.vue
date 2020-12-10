<template>
  <div class="home">
    <navbar class="home-nav">
      <div slot="center">购物街</div>
    </navbar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends" />
  </div>
</template>

<script>
import Navbar from "components/common/navbar/Navbar";
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView.vue";

import { getHomeMultidata } from "network/home";

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
    };
  },
  components: {
    Navbar,
    HomeSwiper,
    RecommendView,
  },
  created() {
    getHomeMultidata()
      .then((res) => {
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style lang="less" scoped>
.home-nav {
  background-color: @color-tint;
  color: @color-background;
}
</style>
