<template>
  <navbar>
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="" />
    </div>
    <div slot="center" class="title">
      <div
        v-for="(value, index) in titles"
        :key="index"
        class="title-item"
        @click="titleClick(index)"
        :class="{ active: index === currentIndex }"
      >
        {{ value }}
      </div>
    </div>
  </navbar>
</template>

<script>
import Navbar from "components/common/navbar/Navbar.vue";
export default {
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  components: { Navbar },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
    },
    backClick() {
      this.$router.back();
    },
  },
};
</script>

<style lang="less" scoped>
.back {
  img {
    vertical-align: -5px;
  }
}
.title {
  display: flex;
  font-size: 13px;
  color: @color-text;
  height: 100%;
  .title-item {
    flex: 1;
  }
}
.active {
  color: @color-tint;
}
</style>