<template>
  <div class="toast" v-show="isShow">
    <div>{{ massage }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      massage: "",
      isShow: false,
    };
  },
  methods: {
    show(massage, time = 2000) {
      this.isShow = true;
      this.massage = massage;
      setTimeout(() => {
        this.isShow = false;
      }, time);
    },
  },
};
</script>

<style lang="less" scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 8px 10px;
  transform: translate(-50%, -50%);
  color: #fff;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10000000;
}
</style>