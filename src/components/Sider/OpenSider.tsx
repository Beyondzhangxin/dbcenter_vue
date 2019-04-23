import {Component, Vue, Prop, Watch} from 'vue-property-decorator';
import {CreateElement} from 'vue';
import {Menu, Button, Icon, Divider, Layout} from 'ant-design-vue';
import {routes} from '@/router'

@Component({
    components: {
        'a-menu-item': Menu.Item,
        'a-menu': Menu,
        'a-submenu': Menu.SubMenu,
        'a-button': Button,
        'a-icon': Icon,
        'a-divider': Divider,
        'a-layout-sider': Layout.Sider,
    }
})
export default class OpenSider extends Vue {
    @Prop({default: '#545454'}) private bgColor!: string;
    @Prop({default: '#fff'}) private txtColor!: string;

    keys: string[] = []
    openKeys: string[] = []

    mounted(): void {
    }


    routeToArray(route: string): { routeArr: string[], params: string } {
        if (!route) {
            return {
                routeArr: [],
                params: '',
            };
        }
        const arr: string[] = route.split('/');
        const ret: string[] = [];
        let params = '';
        arr.shift();
        arr.forEach((item, index) => {
            if (parseInt(item, 10)) {
                params = item;
                return;
            }
            ret.push(index ? item : `/${item}`);
        });
        return {
            routeArr: ret,
            params,
        };
    }

    @Watch('$route', {immediate: true, deep: true})
    routeChange(to: any, from: any) {
        this.keys = this.routeToArray(to.path).routeArr;
        const open = this.keys.concat();
        open.pop();
        this.openKeys = open || [];
    }

    openChange(openKeys: string[]) {
        this.openKeys = openKeys;
    }

    openPage(item: any) {
        // console.log(path);
        // console.log(item.key);
        this.$router.push({name: item.key});
    }


    render(h: CreateElement) {
        return (<a-layout-sider>
                {
                    this.createMenu()
                }
            </a-layout-sider>

        )
    }

    getGroup(): number {
        // let routes:any = this.$router.options.routes;
        // console.log(this.routeToArray(this.$route.path));
        let parentPath: string = this.routeToArray(this.$route.path).routeArr[0];
        for (let x: number = 0; x < routes.length; x++) {
            if (routes[x].path === parentPath) {
                // console.log(parentPath);
                return x;
            }
        }
        return 0
    }

    createMenu() {
        // let routes:any = this['$router']['options'].routes;
        let index_group: number = this.getGroup();
        // console.log(index_group);
        return (<a-menu defaultSelectedKeys={[this.$route.name]} mode="inline" theme="dark"
                        on-click={(params: { item: any, key: string, keyPath: string[] }) => {
                            const keyPath = params.keyPath.reverse();
                            this.openPage(params);
                        }}>
            {
                this.renderOpenMenu(routes[index_group].children)
            }
        </a-menu>)
    }

    renderOpenMenu(menuData: [], parentPath?: string): (JSX.Element | null)[] {
        return menuData.map((item: any) => {
            if (item.children) {
                let isEmpty = true;
                item.children.forEach((items: any) => {
                    if (!items.hidden) {
                        isEmpty = false;
                    }
                });
                if (isEmpty) {
                    return <a-menu-item
                        id={item.path}
                        key={`${item.name}`}>
                        <svg class="sidebar icon" aria-hidden="true">
                            <use xlinkHref={"#icon-" + item.meta.icon}></use>
                        </svg>
                        {/* <a-icon type={item.meta.icon}></a-icon> */}
                        <span>{item.meta.title}</span>
                    </a-menu-item>;
                }
                return <a-submenu id={item.path} key={item.name}>
                    <template slot="title">
                        {/* <a-icon type={item.icon}></a-icon> */}
                        <svg class="sidebar icon" aria-hidden="true">
                            <use xlinkHref={"#icon-" + item.meta.icon}></use>
                        </svg>
                        <span>{item.meta.title}</span>
                    </template>
                    {this.renderOpenMenu(item.children, parentPath ? `${parentPath}/${item.path}` : item.path)}
                </a-submenu>;
            } else {
                if (item.meta.title) {
                    return <a-menu-item
                        id={item.path}
                        key={`${item.name}`}>
                        <svg class="sidebar icon" aria-hidden="true">
                            <use xlinkHref={"#icon-" + item.meta.icon}></use>
                        </svg>
                        {/* <a-icon type={item.meta.icon}></a-icon> */}
                        <span>{item.meta.title}</span>
                    </a-menu-item>;
                }
                return null
            }
        })
    }

}
