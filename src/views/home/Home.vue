<template>
  <div class="home">
    <navbar class="home-nav">
      <div slot="center">购物街</div>
    </navbar>
  </div>
</template>

<script>
import Navbar from "components/common/navbar/Navbar";
import { getHomeMultidata } from 'network/home'
export default {
  name: "Home",
  components: { 
    Navbar 
  },
   created(){
      getHomeMultidata()
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }
};
</script>

<style lang="less" scoped>
.home-nav {
  background-color: @color-tint;
  color: @color-background;
}
</style>
