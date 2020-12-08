<template>
  <div class="home">
    <router-view />
    <navbar>
      <div slot="center">购物街</div>
    </navbar>
  </div>
</template>

<script>
import Navbar from "components/common/navbar/Navbar.vue";
export default {
  name: "Home",
  components: { Navbar },
};
</script>

<style scoped>
</style>
