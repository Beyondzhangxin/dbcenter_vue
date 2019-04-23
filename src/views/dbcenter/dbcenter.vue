<template>
    <div>
        <a-tabs defaultActiveKey="1">
            <a-tab-pane tab="概览" key="1">
                <a-row :gutter=16>
                    <a-col span="8">
                        <a-card title="使用情况">
                            <div class="last_result pt1">
                                <h1 style="height:80px;overflow:hidden">
                                    <v-number :value='spaceInfo.used_space_size/(1024**2)' :option="myVueNumberOption"></v-number>
                                </h1>
                                <span>已用空间大小(M)</span>
                            </div>
                            <div class="last_result pt2">
                                <h1 style="height:80px;overflow:hidden">
                                    <v-number :value='spaceInfo.left_space_size/(1024**2)' :option="myVueNumberOption"></v-number>
                                </h1>
                                <span>剩余空间大小(M)</span>
                            </div>
                            <div class="last_result pt3">
                                <h1 style="height:80px;overflow:hidden">
                                    <v-number :value='spaceInfo.allowed_space_size/(1024**2)' :option="myVueNumberOption"></v-number>
                                </h1>
                                <span>总空间大小(M)</span>
                            </div>
                        </a-card>
                    </a-col>
                    <a-col span="16">
                        <a-card title="使用分布详情">
                            <a-row :gutter=16>
                                <a-col span="8">
                                    <div class="middle_result">
                                        <a-progress type="circle" strokeColor="#2058a5" :format='(percent)=>{percent=spaceInfo.used_space_size/spaceInfo.allowed_space_size*100;
                                        return percent.toFixed(2)+"%"}'/>
                                        <h2>{{(spaceInfo.used_space_size/(1024**2)).toFixed(2)}}M</h2>
                                        <h5>自定义数据</h5>
                                    </div>
                                </a-col>
                                <a-col span="8">
                                    <div class="middle_result">
                                        <a-progress type="circle" strokeColor="#2058a5"/>
                                        <h2>0.06461334</h2>
                                        <h5>电磁暂态仿真结果数据</h5>
                                    </div>
                                </a-col>
                                <a-col span="8">
                                    <div class="middle_result">
                                        <a-progress type="circle" strokeColor="#2058a5"/>
                                        <h2>0.06461334</h2>
                                        <h5>潮流结果数据</h5>
                                    </div>
                                </a-col>
                                <a-col span="8">
                                    <div class="middle_result">
                                        <a-progress type="circle" strokeColor="#2058a5"/>
                                        <h2>0.06461334</h2>
                                        <h5>分析结果数据</h5>
                                    </div>
                                </a-col>
                                <a-col span="8">
                                    <div class="middle_result">
                                        <a-progress type="circle" strokeColor="#2058a5"/>
                                        <h2>0.06461334</h2>
                                        <h5>算例文件</h5>
                                    </div>
                                </a-col>
                                <a-col span="8">
                                    <div class="middle_result">
                                        <a-progress type="circle" strokeColor="#2058a5"/>
                                        <h2>0.06461334</h2>
                                        <h5>模型管理</h5>
                                    </div>
                                </a-col>
                                <a-col span="8">
                                    <div class="middle_result">
                                        <a-progress type="circle" strokeColor="#2058a5"/>
                                        <h2>0.06461334</h2>
                                        <h5>其他</h5>
                                    </div>
                                </a-col>
                            </a-row>
                        </a-card>
                    </a-col>
                </a-row>
            </a-tab-pane>
            <a-tab-pane tab="自定义数据" key="2" forceRender>
                <custom_data  v-on:dataChange="updateData"></custom_data>

            </a-tab-pane>
            <a-tab-pane tab="电磁暂态仿真结果数据" key="3"><elecri_tr></elecri_tr></a-tab-pane>
            <a-tab-pane tab="潮流结果数据" key="4">潮流结果数据</a-tab-pane>
            <a-tab-pane tab="分析结果数据" key="5">分析结果数据</a-tab-pane>
            <a-tab-pane tab="算例文件" key="6">算例文件</a-tab-pane>
            <a-tab-pane tab="模型管理" key="7">模型管理</a-tab-pane>
            <a-tab-pane tab="其他" key="8">其他</a-tab-pane>
        </a-tabs>
    </div>
</template>
<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import API from "@/Api/api_data";
    import {Tabs, Card, Table, Input, Col, Row, Progress, Button} from 'ant-design-vue';
    import {VueNumberCounter} from 'vue-number-counter';
    import 'vue-number-counter/dist/vue-number-counter.css';
    import custom_data from '@/components/DBcenter/custom_data.vue';
    import elecri_tr from '@/components/DBcenter/eletri_tr.vue';
    @Component({
        components: {
            'a-tabs': Tabs,
            'a-tab-pane': Tabs.TabPane,
            'a-card': Card,
            'a-table': Table,
            'a-input': Input,
            'a-row': Row,
            'a-col': Col,
            'a-button': Button,
            'a-progress': Progress,
            'v-number': VueNumberCounter,
            custom_data,
            elecri_tr

        },
    })
    export default class extends Vue {
        private temp:number=46546
        //data initialize part
        private spaceInfo:object={}
        //update data
        updateData(){
            API.getSpaceInfo({userId: 55}).then((data: any) => {
                this.spaceInfo = data;
            }).catch((resp: any) => {
                console.log('mistakes')
            });
        }


        mounted(){
           this.updateData();
        }


        private myVueNumberOption ={
            duration: 2000,
            characterWidth: 30,
            // addCharacter: ['♪', '€', '£', '$', '¥', ','],
            decimals: 2,
            thousandsSeparatorFlag: true,
            replaceCharacterMap: [',', '.', '9', '8', '7', '6', '5', '4', '3', '2', '1', '0']
            // replaceCharacterMap: ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', 'A', 'b', 'c', 'd', 'e', 'f', 'g']
        }

    }
</script>
<style lang="less">
    .last_result {
        width: 100%;
        height: 180px;
        margin-bottom: 20px;
        text-align: center;
        color: #fff;
        padding: 35px 0px 20px 0px;
    }

    .last_result h1 {
        color: #fff;
        margin-bottom: 15px;
    }

    .last_result.pt1 {
        background: rgb(32, 88, 165);
        background-image: url('../../assets/sample/b01.png');
        background-repeat: no-repeat;
        background-position: left;
    }

    .last_result.pt2 {
        background: #4c92f2;
        background-image: url('../../assets/sample/b02.png');
        background-repeat: no-repeat;
        background-position: right;
    }

    .last_result.pt3 {
        background: #20a0a5;
        background-image: url('../../assets/sample/b03.png');
        background-repeat: no-repeat;
        background-position: left;
    }

    .middle_result {
        width: 100%;
        height: 180px;
        margin-bottom: 20px;
        border: #e5e5e5 1px solid;
        text-align: center;
        padding: 0px;
    }

    .middle_result h2 {
        margin: 5px 0px 5px 0px;
    }
</style>
