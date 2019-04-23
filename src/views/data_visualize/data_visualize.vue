<template>
 <div>
     <div>
         <a-tabs defaultActiveKey="1">
             <a-tab-pane tab="概览" key="1">
                <data_v></data_v>
             </a-tab-pane>
             <a-tab-pane tab="数据分析" key="2">
                 <analyze></analyze>
             </a-tab-pane>

         </a-tabs>
     </div>
 </div>
</template>

<script>
    import {Component, Vue} from 'vue-property-decorator';
    import API from "@/Api/api_data";
    import {Tabs} from 'ant-design-vue';
    import data_v from '@/components/visualize/overview';
    import analyze from '@/components/visualize/Analysis';
    @Component({
        components: {
            'a-tabs': Tabs,
            'a-tab-pane': Tabs.TabPane,
            data_v,
            analyze

        },
    })
    export default class data_visualize extends Vue{

    }
</script>

<style scoped>

</style>
