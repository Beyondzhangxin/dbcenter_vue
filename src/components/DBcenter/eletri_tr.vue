<template>
    <div>
        <a-spin :delay=500 tip="上传中..." :spinning="uploadSpinning">
            <div :style="{ background: 'rgb(149, 188, 232)', padding: '12px 30px 9px' }">
                <a-button v-show="!flag" type="primary" @click="toggleFlag">
                    <a-icon type="left"/>
                    返回
                </a-button>

                <a-button type="primary" icon="search" style="margin-left: 20px;">搜索文件</a-button>
                <a-button v-show="!flag" @click="toExcel" type="primary" icon="download" style="margin-left: 20px;">下载
                </a-button>

            </div>
        </a-spin>
        <keep-alive>
            <a-table v-show="flag" :columns="columns"
                     :rowKey="record => record.tableName"
                     :dataSource="data">
                <!--<a-dropdown slot="filename"  slot-scope="record" :trigger="['click']">-->
                <!--&lt;!&ndash;<a-button  >&ndash;&gt;-->
                <!--&lt;!&ndash;</a-button>&ndash;&gt;-->
                <!--<a-button :visible="true" style="border: none" @click="fetchChannels(record.tableName)">{{record.tableName}}-->
                <!--</a-button>-->
                <!--<a-card v-show="channelFlag"  slot="overlay">-->
                <!--<a-row v-for="(channel,index) in channels" :gutter="16">-->
                <!--<a-col :offset="2" :span="18">{{channel}}</a-col>-->
                <!--<a-col :span="2"><a-checkbox name="dsfa"></a-checkbox></a-col>-->
                <!--</a-row>-->
                <div slot="filename" slot-scope="record" @click="fetchChannels(record.tableName)">
                    <a-popconfirm style="width:160px" placement="right" @confirm="openChannel" okText="确定"
                                  cancelText="取消">
                        <a-icon slot="icon" type=""/>
                        <template v-if="channels.length>0" slot="title">
                            <a-checkbox-group @change="selectChannel">
                                <a-row>
                                    <a-col v-for="(channel) in channels">
                                        <a-checkbox :value="channel">{{channel}}</a-checkbox>
                                    </a-col>
                                </a-row>
                            </a-checkbox-group>
                        </template>
                        <template v-else slot="title">
                            没有channel
                        </template>
                        <a href="#">{{record.tableName}}</a>
                    </a-popconfirm>
                </div>
                <!--</a-card>-->
                <!--&lt;!&ndash;<a-menu :multiple="true" v-show="channelFlag" mode="vertical" slot="overlay" @click="fetchFile">&ndash;&gt;-->
                <!--&lt;!&ndash;<a-menu-item v-for="(channel,index) in channels" :title="channel" :key="index">{{channel}}&ndash;&gt;-->
                <!--&lt;!&ndash;</a-menu-item>&ndash;&gt;-->
                <!--&lt;!&ndash;</a-menu>&ndash;&gt;-->

                <!--</a-dropdown>-->


                <!--<span slot="filename" slot-scope="record">-->
                <!--<a @click="fetchFile(record.tableName);toggleFlag()">{{record.tableName}}</a>-->
                <!--</span>-->
                <span slot="action" slot-scope="record">
                <a-popconfirm title="确定删除?" @confirm="delelte(record.tableName)" okText="确定" cancelText="取消"><a
                        style="color: red">删除</a></a-popconfirm>
                    <!--<a-divider type="vertical"/>-->
                    <!--<a-tag color="green"><span @click="download(record)">下载</span></a-tag>-->
                </span>
            </a-table>
        </keep-alive>
        <!--<a-affix :offsetTop="10">-->
        <!--<a-pagination v-model="currentId" :total="idCount" @change="handleFileTableChange" />-->
        <!--</a-affix>-->

        <div v-show="!flag">
            <a-spin :spinning="excel_download" tip="数据处理中...">
                <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
            <div>
                <a-menu mode="horizontal">
                    <a-menu-item @click="menuChange" v-for="item in checkedList" :key="item">{{item}}</a-menu-item>
                </a-menu>
            </div>
            <a-table :columns="fileColumn"
                     :loading="fileLoading"
                     :rowKey="record =>fileData.indexOf(record)"
                     :dataSource="fileData"
                     :pagination='false'
                     :scroll="{ y: 640 }"
            >
            </a-table>
            <a-row type="flex" justify="center">
                <a-pagination v-model="currentId" :pageSize="1" :total="10" @change="handleFileTableChange"/>
            </a-row></a-spin>
        </div>
    </div>
</template>

<script>
    import {Component, Vue} from 'vue-property-decorator';
    import API from "@/Api/api_data";
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
        Popconfirm,
        Divider,
        Dropdown,
        Pagination,
        Menu,
        Button,
        Tag,
        Spin,
        Checkbox,
        Affix,
        message
    } from 'ant-design-vue';
    import XLSX from 'xlsx';

    const plainOptions = ['Apsdfdsfffffdddddddddddddddddddddddddddddddddddddffffffffffple', 'Peadasfsfsdfffddddddddddddddddasdfasdfdfr', 'Oransdfffffffffffffffffffffffffffffffffffffffffffffffffge']
    const columns = [{
        title: '文件名',
        width: '30%',
        scopedSlots: {customRender: 'filename'},
    }, {
        title: '操作',
        key: 'action',
        scopedSlots: {customRender: 'action'},
    }];

    const workbook = {
        SheetNames: [],
        Sheets: {}
    }
    const MyIcon = Icon.createFromIconfontCN({
        scriptUrl: '//at.alicdn.com/t/font_1086089_jggr5xypmg.js', // 在 iconfont.cn 上生成
    });
    @Component({
        components: {
            'a-tabs': Tabs,
            'a-tab-pane': Tabs.TabPane,
            'a-card': Card,
            'a-table': Table,
            'a-input': Input,
            'a-row': Row,
            'a-tag': Tag,
            'a-icon': Icon,
            'a-divider': Divider,
            'a-checkbox': Checkbox,
            'a-col': Col,
            'a-button': Button,
            'a-progress': Progress,
            'a-modal': Modal,
            'a-popconfirm': Popconfirm,
            'my-icon': MyIcon,
            'a-spin': Spin,
            'a-checkbox-group': Checkbox.Group,
            'a-dropdown': Dropdown,
            'a-menu': Menu,
            'a-menu-item': Menu.Item,
            'a-menu-divider': Menu.Divider,
            'a-dropdown-button': Dropdown.Button,
            'a-pagination': Pagination,
            'a-affix': Affix,

        },
    })
    export default class eletri_tr extends Vue {
        data() {
            return {
                workbook,
                flag: true,
                data: [],
                pagination: {},
                loading: false,
                visible: false,
                columns,
                fileName: '',
                fileType: '',
                fileColumn: [{title: '数据', dataIndex: 'data'}, {title: '时间', dataIndex: 'time'}],
                fileLoading: false,
                file_open: '',
                fileData: [],
                filePagination: {},
                userId: 55,
                uploadSpinning: false,
                channels: [],
                selectedTable: '',
                idCount: 1,
                currentId: 1,
                selectedChannel: '',
                checkedList: [],
                excel_download:false,
            }
        }

        get channelFlag() {
            return this.channels.length > 0
        }

        toggleFlag() {
            this.flag = !this.flag;
        }

        selectChannel(checkedValues) {
            this.checkedList = checkedValues;
            // let index = this.selectedChannel.indexOf(channel)
            // event.target.checked ? this.selectedChannel.push(channel) : this.selectedChannel.splice(index, 1);
        }

        fetchChannels(tableName) {
            let data = {
                'tableName': tableName
            }
            API.electri_channels(data).then(data => {
                this.selectedTable = tableName;
                this.channels = data['channels']
            })
        }

        download(record) {
            console.log(record);

        }

        toExcel() {
            this.excel_download=true;
            let _headers = ['数据', '时间'];
            let headers = _headers.map((v, i) => Object.assign({}, {v: v, position: String.fromCharCode(65 + i) + 1}))
                .reduce((prev, next) => Object.assign({}, prev, {[next.position]: {v: next.v}}), {});
            let sheet_data = {}
            this.checkedList.map(item => {
                sheet_data[item] = {
                    'data': [],
                    'time': []
                }
            })
            let workbook = {};
            let outName = this.selectedTable + '.xlsx';
            API.electri_getTable({
                tableName: this.selectedTable,
                channels: JSON.stringify(this.checkedList)
            }).then(data => {
                let col = ['data', 'time']
                data.data.map(item => {
                    sheet_data[item[1]]['data'] = sheet_data[item[1]]['data'].concat(item[2])
                    sheet_data[item[1]]['time'] = sheet_data[item[1]]['time'].concat(item[3])
                })
                workbook['SheetNames'] = this.checkedList;
                workbook['Sheets'] = {};
                for (let name in sheet_data) {
                    let temp1 = sheet_data[name]['data']
                        .map((v, i) => col.map((k, j) => Object.assign({}, {
                            v: sheet_data[name][k][i],
                            position: String.fromCharCode(65 + j) + (i + 2)
                        }))).reduce((prev, next) => prev.concat(next));
                    let data=temp1.reduce((prev, next) => Object.assign({}, prev, {[next.position]: {v: next.v}}), {});
                    // 合并 headers 和 data
                    let output = Object.assign({}, headers, data);
                    // 获取所有单元格的位置
                    var outputPos = Object.keys(output);
                    // 计算出范围
                    var ref = outputPos[0] + ':' + outputPos[outputPos.length - 1];
                    // 构建 workbook 对象
                    workbook['Sheets'][name] = Object.assign({}, output, {'!ref': ref})
                }
                // 导出 Excel
                XLSX.writeFile(workbook, outName);
                this.excel_download=false;
            })
        }

        menuChange(item) {
            this.selectedChannel = item.key;
            this.fetchFile(item.key);
        }

        openChannel() {
            if (this.checkedList.length > 0) {
                this.toggleFlag();
                this.fetchFile(this.checkedList[0])
            }
        }

        fetchFile(item) {
            let data = {
                'tableName': this.selectedTable,
                'channel': item,
                'id': 1
            }
            this.selectedChannel = item
            API.electri_idChannelData(data).then(data => {
                let temp = []
                let datas = data['data']
                let times = data['time'];
                for (let i = 0; i < datas.length; i++) {
                    temp.push({'data': datas[i], 'time': times[i]});
                }
                this.fileData = temp

            })
            API.electri_channelIdCount({
                'tableName': this.selectedTable,
                'channel': item,
            }).then(data => {
                this.idCount = data['count']
            })
        }

        handleFileTableChange(page) {
            let data = {
                'tableName': this.selectedTable,
                'channel': this.selectedChannel,
                'id': page
            }
            API.electri_idChannelData(data).then(data => {
                let temp = []
                let datas = data['data']
                let times = data['time'];
                for (let i = 0; i < datas.length; i++) {
                    temp.push({'data': datas[i], 'time': times[i]});
                }
                this.fileData = temp
            })
        }

        delelte(name) {
            let ob = {'tableName': name};
            API.electri_delTable(ob).then(data => {
                message.success('删除成功！');
                this.$emit('dataChange');
                this.updateData();
            });
        }

        //update data
        updateData() {
            API.electri_Tables({}).then((data) => {
                this.data = data.data;
            });
        }

        //    initialize data
        mounted() {

            this.updateData()
        }

    }
</script>

<style scoped>
</style>
