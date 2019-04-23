import { Component,Vue} from 'vue-property-decorator';
import {LocaleProvider} from 'ant-design-vue';
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
import './App.less';
@Component({
  components:{
    'a-locale-provider': LocaleProvider,
  }
})
export default class App extends Vue {
  render() {
      const self = this;
      return (
        <div id="app">
        <a-locale-provider locale={zh_CN}>
        <router-view/>
        </a-locale-provider>
        </div>
      );
  }
}
