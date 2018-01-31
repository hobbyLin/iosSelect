/**
 * Created by k186 on 2017/11/14.
 */
import pdSelectItem from './src/selectitem.vue'
import pdSelectBox from './src/selectBox.vue'

// 这是个底层组件 用于做类似ios选择器


const components = [
  pdSelectItem,
  pdSelectBox
];
const install = function (Vue) {
  if (install.installed) return
  components.map(component => {
    Vue.component(component.name, component)
  });
  if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
  }
};
export default {
  install,
  components,
  pdSelectItem,
  pdSelectBox
}

