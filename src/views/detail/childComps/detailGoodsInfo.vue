<template>
  <div class="good-info" v-if="Object.keys(detailInfo).length !== 0">
    <div class="info-desc">
      <div class="start"></div>
      <div class="desc">{{ detailInfo.desc }}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{ detailInfo.detailImage[0].key }}</div>
    <div
      class="info-list"
      v-for="(list, index) in detailInfo.detailImage[0].list"
      :key="index"
    >
      <img :src="list" @load="loadImg" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    detailInfo: {
      type: Object,
    },
  },

  data() {
    return {
      counter: 0,
      imagesLength: 0,
    };
  },
  methods: {
    loadImg() {
      if (++this.counter === this.imagesLength) {
        this.$emit("imageLoad");
      }
    },
  },
  watch: {
    detailInfo() {
      // 获取图片的个数
      this.imagesLength = this.detailInfo.detailImage[0].list.length;
    },
  },
};
</script>

<style lang="less" scoped>
.good-info {
  padding: 20px 0;
  border-bottom: 5px solid #f2f5f8;

  .info-desc {
    padding: 0 15px;

    .start,
    .end {
      width: 90px;
      height: 1px;
      background-color: #a3a3a5;
      position: relative;
    }

    .start {
      float: left;
    }

    .end {
      float: right;
    }

    .start::before,
    .end::after {
      content: "";
      position: absolute;
      width: 5px;
      height: 5px;
      background-color: #333;
    }

    .start::before {
      top: -5px;
    }

    .end::after {
      right: 0;
      bottom: 0;
    }

    .desc {
      padding: 15px 0;
      font-size: 14px;
      color: @color-text;
    }
  }

  .info-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
  }

  .info-list {
    width: 100%;

    img {
      width: 100%;
    }
  }
}
</style>