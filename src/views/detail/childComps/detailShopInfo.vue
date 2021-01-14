<template>
  <div class="detail-shop-info">
    <div class="shop-top">
      <img :src="shop.shopLogo" />
      <span>{{ shop.name }}</span>
    </div>
    <div class="shop-middle">
      <div class="shop-middle-left shop-middle-item">
        <div class="info-sells">
          <div class="sells-count">
            {{ shop.cSells | sellCountFilter }}
          </div>
          <div class="sells-text">总销量</div>
        </div>
        <div class="info-goods">
          <div class="goods-count">
            {{ shop.cGoods }}
          </div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <div class="shop-middle-right shop-middle-item">
        <table>
          <tr v-for="(item, index) in shop.score" :key="index">
            <td>{{ item.name }}</td>
            <td>
              <span :class="[item.isBetter ? 'better-more' : 'score-better']">{{
                item.score
              }}</span>
            </td>
            <td>
              <span :class="[item.isBetter ? 'better' : 'score']">{{
                item.isBetter ? "高" : "低"
              }}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    shop: {
      type: Object,
    },
  },
  filters: {
    sellCountFilter: function (value) {
      if (value < 10000) return value;
      return (value / 10000).toFixed(1) + "万";
    },
  },
};
</script>

<style lang="less" scoped>
.detail-shop-info {
  border-bottom: 5px solid @color-border;
  padding: 25px 8px;

  .shop-top {
    height: 45px;
    display: flex;
    align-items: center;
    img {
      border-radius: 50%;
      height: 100%;
    }
    span {
      margin-left: 10px;
      color: @color-text;
    }
  }
  .shop-middle {
    margin-top: 15px;
    display: flex;

    .shop-middle-item {
      flex: 1;
    }
    .shop-middle-left {
      display: flex;
      justify-content: space-evenly;
      color: #333;
      text-align: center;
      align-items: center;
      border-right: 1px solid rgba(0, 0, 0, 0.1);

      .sells-count,
      .goods-count {
        font-size: 18px;
      }

      .sells-text,
      .goods-text {
        font-size: 12px;
        margin-top: 10px;
      }
    }

    .shop-middle-right {
      margin-left: 30px;
      font-size: 13px;

      table td {
        padding: 5px 7px;

        .score {
          color: #fff;
          background-color: #5ea732;
        }
        .better {
          color: #fff;
          background-color: #f13e3a;
        }
        .score-better {
          color: #5ea732;
        }
        .better-more {
          color: #f13e3a;
        }
      }
    }
  }
  .shop-bottom {
    text-align: center;
    margin-top: 10px;
    .enter-shop {
      width: 150px;
      height: 30px;
      line-height: 30px;
      margin: auto;
      border-radius: 10px;
      color: @color-text;
      background-color: @color-border;
    }
  }
}
</style>