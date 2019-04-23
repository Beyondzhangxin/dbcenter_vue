import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout/Layout';
const Dbcenter=()=>import('@/views/dbcenter/dbcenter.vue')
const func_flow=()=>import('@/views/func_flow/func_flow.vue')
const data_visualize=()=>import('@/views/data_visualize/data_visualize.vue')
const test=()=>import('@/components/test.vue')
Vue.use(Router)
let routes: any = [
    {
        path: '/',
        name: 'home',
        component: Layout,
        redirect:'/dbcenter',
        children: [{
            path:'dbcenter',
            component:Dbcenter,
            name:'数据中心',
            meta: {title: '数据中心', role: ['admin', 'editor'], icon: 'folder-open'},
        },{
            path:'func_flow',
            component:func_flow,
            name:'函数流程',
            meta: {title: '函数流程编排', role: ['admin', 'editor'], icon: 'folder-open'},
        },{
            path:'data_visualize',
            component:data_visualize,
            name:'data_visualize',
            meta: {title: '数据可视化', role: ['admin', 'editor'], icon: 'folder-open'},
        },{
            path:'test',
            component:test,
            name:'test',
            meta: {title: null, role: ['admin', 'editor'], icon: 'folder-open'},
        }]
    },
]
const newrouter = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: routes
})
newrouter.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    } else {
        document.title = '综合能源规划设计平台';
    }
    next();
});
export default newrouter;
export {routes};
