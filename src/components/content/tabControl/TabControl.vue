<template>
  <div class="tab-control">
    <div
      class="tab-control-itme"
      v-for="(title, index) in titles"
      :key="index"
      :class="{ active: index === currentIndex }"
      @click="itemClick(index)"
    >
      <span>{{ title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("title-click", index);
    },
  },
};
</script>

<style lang="less" scoped>
.tab-control {
  display: flex;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
  text-align: center;

  .tab-control-itme {
    flex: 1;

    span {
      padding: 5px;
    }
  }

  .active {
    color: @color-high-text;

    span {
      border-bottom: 3px solid @color-tint;
    }
  }
}
</style>