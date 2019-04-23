import { Component, Vue } from 'vue-property-decorator';
import { CreateElement } from 'vue';
import {Layout} from 'ant-design-vue';
import Header from './Header';
import Sider from '@/components/Sider/OpenSider';
import './Layout.less';
@Component({
    components:{
        'a-layout':Layout,
        'a-layout-sider':Layout.Sider,
        'a-layout-header':Layout.Header,
        'a-layout-content':Layout.Content,
        'a-layout-footer':Layout.Footer,
        Header,
        Sider
    }
})
export default class Layout_template extends Vue {
    render(h:CreateElement){
        return (
            <a-layout id="components-layout-responsive">
                <Header />
                <a-layout>
                    <Sider />
                    <a-layout-content style={{ margin: '12px 16px 0' }}>
                        <router-view/>
                    </a-layout-content>
                    {/* <a-layout-footer style={{textAlign: 'center'}}>
                        CloudPSS ©2019 Created by CloudPSS
                    </a-layout-footer> */}
                </a-layout>
            </a-layout>
        )
    }
}
