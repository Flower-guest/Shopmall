import {
  debounce
} from "./utils"
export const itemListenerMixin = {
  data() {
    return {
      itemImglistener: null,
      newRefresh: null,
    }
  },
  mounted() {
    this.newRefresh = debounce(this.$refs.scroll.refresh, 1000);
    // 对监听事件保存
    this.itemImglistener = () => {
      this.newRefresh();
    };
    this.$bus.$on("itemImgLoad", this.itemImglistener);
  },
}
