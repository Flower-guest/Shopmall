<template>
  <div class="detail-goods-info" v-if="Object.keys(goods).length !== 0">
    <div>{{ goods.title }}</div>
    <div class="info-price">
      <span class="n-price">{{ goods.newPrice }}</span>
      <span class="o-price">{{ goods.oldPrice }}</span>
      <span class="discount">{{ goods.discount }}</span>
    </div>
    <div class="info-other">
      <span>{{ goods.columns[0] }}</span>
      <span>{{ goods.columns[1] }}</span>
      <span>{{ goods.services[4].name }}</span>
    </div>
    <div class="info-serves">
      <span
        class="info-service-item"
        v-for="index in goods.services.length - 1"
        :key="index"
      >
        <img :src="goods.services[index - 1].icon" />
        <span>{{ goods.services[index - 1].name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goods: {
      type: Object,
    },
  },
};
</script>

<style lang="less" scoped>
.detail-goods-info {
  margin-top: 15px;
  padding: 0 8px;

  .info-price {
    margin-top: 10px;

    .n-price {
      font-size: 24px;
      color: @color-high-text;
    }

    .o-price {
      font-size: 13px;
      margin-left: 5px;
      color: #999;
      text-decoration: line-through;
    }

    .discount {
      font-size: 12px;
      margin-left: 5px;
      padding: 2px 5px;
      background-color: @color-high-text;
      color: @color-background;
      border-radius: 10px;
      position: relative;
      top: -8px;
    }
  }

  .info-other {
    margin-top: 15px;
    line-height: 30px;
    display: flex;
    font-size: 13px;
    border-bottom: 1px solid rgba(100, 100, 100, 0.1);
    justify-content: space-between;
    color: #999;
  }

  .info-serves {
    display: flex;
    justify-content: space-between;
    line-height: 60px;

    .info-service-item img {
      width: 14px;
      height: 14px;
      position: relative;
      top: 2px;
    }

    .info-service-item span {
      font-size: 13px;
      color: #333;
    }
  }
}
</style>