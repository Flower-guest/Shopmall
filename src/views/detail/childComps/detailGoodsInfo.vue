<template>
  <div>
    <div>{{ detailInfo.title }}</div>
    <div>{{}}</div>
  </div>
</template>

<script>
export default {
  props: {
    detailInfo: {
      type: Object,
    },
  },
};
</script>

<style>
</style>