<template>
  <swiper :options="swiperOption" ref="mySwiperA">
    <swiper-slide
      class="swiper-slide"
      v-for="(banner, index) in banners"
      :key="index"
    >
      <a :href="banner.link">
        <img :src="banner.image" />
      </a>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      swiperOption: {
        spaceBetween: 30,
        centeredSlides: true,
        loop: true,
        autoplay: {
          delay: 2000,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      },
    };
  },
  methods: {
    swipers() {
      console.log(this.$refs.mySwiperA);
    },
  },
  mounted() {
    this.swipers();
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  width: 100%;

  img {
    width: 100%;
  }
}
</style>