<template>
  <div>
    <swiper :options="swiperOption" class="detail-swiper">
      <swiper-slide v-for="(topImage, index) in topImages" :key="index">
        <img :src="topImage" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
  props: {
    topImages: {
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
};
</script>

<style lang="less" scoped>
.detail-swiper {
  height: 300px;
  overflow: hidden;
  img {
    width: 100%;
  }
}

.swiper-container {
  --swiper-pagination-color: @color-tint; /* 两种都可以 */
}
</style>