<template>
  <div>
    <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
      <div class="info-header">
        <div class="header-title">用户评价</div>
        <div class="header-more">
          更多
          <i class="arrow-right"></i>
        </div>
      </div>
      <div class="info-user">
        <img :src="commentInfo.user.avatar" />
        <span>{{ commentInfo.user.uname }}</span>
      </div>
      <div class="info-detail">
        <p>{{ commentInfo.content }}</p>
        <div class="info-other">
          <span class="date">{{ commentInfo.created | showDate }}</span>
          <span>{{ commentInfo.style }}</span>
        </div>
      </div>
      <div class="info-img">
        <img
          v-for="(item, index) in commentInfo.images"
          :key="index"
          :src="item"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "common/utils.js";

export default {
  props: {
    commentInfo: {
      type: Object,
    },
  },
  filters: {
    showDate: function (value) {
      let date = new Date(value * 1000);
      return formatDate(date, "yyyy-MM-dd");
    },
  },
};
</script>

<style lang="less" scoped>
.comment-info {
  padding: 5px 12px;
  color: #333;
  border-bottom: 5px solid #f2f5f8;

  .info-header {
    display: flex;
    justify-content: space-between;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    .header-title {
      font-size: 15px;
    }

    .header-more {
      font-size: 13px;

      .arrow-right {
        border-top: 1px solid #999;
        border-left: 1px solid #999;
        width: 9px;
        height: 9px;
        background-color: transparent;
        -webkit-transform: rotate(135deg);
        transform: rotate(135deg);
        display: inline-block;
        margin-left: 0.1rem;
      }
    }
  }

  .info-user {
    padding: 10px 0 5px;

    img {
      width: 42px;
      height: 42px;
      border-radius: 50%;
    }

    span {
      position: relative;
      font-size: 15px;
      top: -15px;
      margin-left: 10px;
    }
  }
  .info-detail {
    padding: 0 5px 15px;
    p {
      font-size: 14px;
      color: #777;
    }
    .info-other {
      margin-top: 10px;
      font-size: 12px;
      color: #999999;

      .date {
        margin-right: 8px;
      }
    }
  }
}
</style>