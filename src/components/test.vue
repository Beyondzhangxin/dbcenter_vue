<template>
    <a-cascader :options="options" :showSearch="{filter}" @change="onChange" placeholder="Please select" />
</template>
<script>
    import {
        Tabs,
        Card,
        Table,
        Input,
        Col,
        Row,
        Modal,
        Icon,
        Progress,
        Layout,
        Popconfirm,
        Menu,
        Breadcrumb,
        Button,
        message,
        Cascader
    } from 'ant-design-vue';
    export default {
        components: {
            'a-layout': Layout,
            'a-menu': Menu,
            'a-menu-item': Menu.Item,
            'a-sub-menu': Menu.SubMenu,
            'a-icon': Icon,
            'a-layout-sider': Layout.Sider,
            'a-breadcrumb':Breadcrumb,
            'a-breadcrumb-item':Breadcrumb.Item,
            'a-layout-header': Layout.Header,
            'a-layout-content': Layout.Content,
            'a-cascader': Cascader,
        },
        data() {
            return {
                options: [{
                    value: 'zhejiang',
                    label: 'Zhejiang',
                    children: [{
                        value: 'hangzhou',
                        label: 'Hangzhou',
                        children: [{
                            value: 'xihu',
                            label: 'West Lake',
                        }, {
                            value: 'xiasha',
                            label: 'Xia Sha',
                            disabled: true,
                        }],
                    }],
                }, {
                    value: 'jiangsu',
                    label: 'Jiangsu',
                    children: [{
                        value: 'nanjing',
                        label: 'Nanjing',
                        children: [{
                            value: 'zhonghuamen',
                            label: 'Zhong Hua men',
                        }],
                    }],
                }]
            }
        },
        methods: {
            onChange(value, selectedOptions) {
                console.log(value, selectedOptions);
            },
            filter(inputValue, path) {
                return (path.some(option => {
                        console.log(option);
                  return  (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1}
                    ));
            },
        }
    }
</script>
