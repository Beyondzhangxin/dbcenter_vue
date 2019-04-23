import { Component, Vue } from 'vue-property-decorator';
import { CreateElement } from 'vue';
import { Dropdown, Icon, Menu, notification } from 'ant-design-vue';
import {Layout} from 'ant-design-vue';
import logout from '@/Api/api_logout';


@Component({
    components:{
        'a-layout-header':Layout.Header,
        'a-dropdown': Dropdown,
        'a-icon':Icon,
        'a-menu-item': Menu.Item,
        'a-menu-divider': Menu.Divider,
        'a-menu': Menu,
    }
})
export default class Header extends Vue{

    private info_notification(){
      notification['info']({
        message: '退出登录',
        description:'您已退出登录综合能源系统'
      });
    }


    menuClick(params: {item: any, key: string, keyPath: string[]}): void {
        const self = this;
        switch (params.key) {
          case '1':
            this.$router.push('/main');
            break;
          case '2':
            break;
          case '3':
            // Cookies.remove('token');
            // new Utils().setCookie('TK', '')
            // this.$store.commit('cleanUserInfo')
            logout()
            this.info_notification()
            this.$router.push('/login');
            break;
          default:
            break;
        }
      }
    render(h:CreateElement){
        const self = this;
        return(<a-layout-header style={{ padding: 0 ,position:'relative'}}>
        <img src={require('../../assets/header/logo1.png')} style={{width:'200px'}} />
        <div style={{position:'absolute',right:'40px',height:'64px',top:'0px'}}>
            <a-dropdown trigger={['click']}>
              <span class="ant-dropdown-link">
                <span class="name" style={{fontSize:'12px'}}>Jason</span>
                <img src={require('../../assets/profile.jpg')} style={{width:'40px',height:'40px',borderRadius:'20px',background:'#2361ae',margin:'0 8px 0 17px'}}/>
                <a-icon type="caret-down" />
              </span>
              <a-menu slot="overlay" on-click={this.menuClick}>
                <a-menu-item key="1">主页</a-menu-item>
                <a-menu-item key="2">修改密码</a-menu-item>
                <a-menu-divider />
                <a-menu-item key="3"><font color="red">退出登录</font></a-menu-item>
              </a-menu>
            </a-dropdown>
        </div>
        </a-layout-header>)
    }
}
