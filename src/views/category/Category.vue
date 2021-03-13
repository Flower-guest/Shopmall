<template>
  <div class="category">
    <navbar class="category-nav">
      <div slot="center">商品分类</div>
    </navbar>
    <div class="center">
      <cate-gory-title :title="date" />
      <!-- <b-scroll :probe-type="3" :pull-up-load="true"> </b-scroll> -->
    </div>
  </div>
</template>

<script>
import Navbar from "components/common/navbar/Navbar.vue";
import BScroll from "components/common/scroll/BScroll.vue";
import CateGoryTitle from "./childComps/cateGoryTitle.vue";

import { getTitle } from "network/category.js";
export default {
  components: { Navbar, BScroll, CateGoryTitle },
  name: "Category",
  data() {
    return {
      date: [],
    };
  },
  mounted() {},
  created() {
    this._getTitle();
  },
  methods: {
    _getTitle() {
      getTitle()
        .then((res) => {
          this.date = res.data.data.category.list;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="less" scoped>
.category {
  height: 100vh;
  width: 100%;
  padding: 44px 0 49px;
  position: relative;

  .category-nav {
    background-color: @color-tint;
    color: @color-background;
  }

  .center {
    height: 100%;
  }
}
</style>
