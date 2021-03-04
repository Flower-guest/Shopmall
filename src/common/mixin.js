import {
  debounce
} from "./utils"
export const itemListenerMixin = {
  data() {
    return {
      itemImglistener: null,
      refresh: null,
    }
  },
  mounted() {
    this.refresh = debounce(this.$refs.scroll.refresh);
    // 对监听事件保存
    this.itemImglistener = () => {
      this.refresh();
    };
    this.$bus.$on("itemImgLoad", this.itemImglistener);
  },
}
