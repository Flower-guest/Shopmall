<template>
  <div class="good-item" @click="itemClick">
    <div class="img">
      <img :src="showImage" @load="imgLoad" />
    </div>
    <div class="good-info">
      <p>{{ gooditem.title }}</p>
      <span class="price">{{ gooditem.price }}</span>
      <span class="collect">{{ gooditem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    gooditem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    imgLoad() {
      // 事件总线，发送监听图片加载事件
      if (this.$route.path.indexOf("/home") !== -1) {
        this.$bus.$emit("itemImgLoad");
      } else if (this.$route.path.indexOf("/detail") !== -1) {
        this.$bus.$emit("detailitemImgLoad");
      }
    },
    itemClick() {
      // this.$router.push("/detail/" + this.gooditem.iid);
      let iid = this.gooditem.iid || this.gooditem.item_id;
      this.$router.push({
        path: "/detail",
        query: {
          iid: iid,
        },
      });
    },
  },
  computed: {
    showImage() {
      return this.gooditem.image || this.gooditem.show.img;
    },
  },
};
</script>

<style lang="less" scoped>
.good-item {
  width: 48%;
  padding-bottom: 5px;

  .img {
    width: 100%;
    height: 267.26px;
    margin-bottom: 5px;

    img {
      width: 100%;
      border-radius: 5px;
    }
  }

  .good-info {
    font-size: 12px;
    text-align: center;

    p {
      overflow: hidden; //超出的文本隐藏
      text-overflow: ellipsis; //溢出用省略号显示
      white-space: nowrap; //溢出不换行
      margin-bottom: 3px;
    }

    .price {
      color: @color-tint;

      &::after {
        content: "";
        display: inline-block;
        width: 14px;
        height: 14px;
        background: url(~assets/img/common/collect.svg) no-repeat;
        background-size: cover;
        margin: 0 3px;
        vertical-align: -10%;
      }
    }
  }
}
</style>