<template>
  <div>
    <div class="icon-selector" :class="{ active: isChecked }">
      <img src="~/assets/img/cart/tick.svg" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isChecked: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="less" scoped>
.icon-selector {
  border-radius: 50%;
  border: 2px solid #ccc;
}
.active {
  background-color: #ff8198;
  border-color: #ff8198;
}
</style>