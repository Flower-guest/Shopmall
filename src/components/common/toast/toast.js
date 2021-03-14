// 分装插件
// 1.导入组件
import Toast from './toast.vue'

const obj = {};

obj.install = function (Vue) {
  // 2.创建组件构造器
  const toastContrustor = Vue.extend(Toast);

  // 3.new的方式，根据组件构造器，可以创建出来一个组件对象
  const toast = new toastContrustor();

  // 4.将组件对象手动挂载到某一元素上
  toast.$mount(document.createElement('div'));

  // 将toast.$el对应的就是div添加到body里面
  document.body.appendChild(toast.$el)

  // 5.添加至vue原型里面
  Vue.prototype.$toast = toast;
}
// 6.导出obj对象
export default obj;
