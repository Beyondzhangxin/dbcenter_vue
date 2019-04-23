<template>
    <div>
        <a-spin :delay=500 tip="上传中..." :spinning="uploadSpinning">
            <div :style="{ background: 'rgb(149, 188, 232)', padding: '12px 30px 9px' }">
                <a-button v-show="!flag" type="primary" @click="toggleFlag">
                    <a-icon type="left"/>
                    返回
                </a-button>
                <a-button type="primary" icon="folder-add" style="margin-left: 20px;" @click="triggerUpload">上传文件</a-button>
                <a-modal
                        title="上传文件"
                        v-model="visible"
                        @ok="handleOk"
                >
                    <a-row :gutter=16>
                        <a-col span="16">
                            <span>文件名</span>
                            <a-input span="8" v-model="fileName" placeholder="请输入文件名"/>
                        </a-col>
                        <a-col span="8">
                            <span>文件类型</span>
                            <a-input v-model="fileType" placeholder="请输入文件类型"/>
                        </a-col>
                    </a-row>
                </a-modal>
                <input type='file' ref="excel_upload" @change="postFile" style="display: none;"/>
                <a-button type="primary" icon="search" style="margin-left: 20px;">搜索文件</a-button>
            </div>
        </a-spin>

        <keep-alive>
            <a-table v-show="flag" :columns="columns"
                     :rowKey="record => record.targetname"
                     :dataSource="data">
            <span slot="filename" slot-scope="record">
                <a @click="fetchFile(record.targetname);toggleFlag()">{{record.sourcename}}</a>
            </span>
                <span slot="action" slot-scope="record">
                <a-popconfirm title="确定删除?" @confirm="delelte(record.targetname)" okText="确定" cancelText="取消">
    <a>删除</a>
  </a-popconfirm>
    </span>
            </a-table>
        </keep-alive>
        <a-table :customRow="test" v-show="!flag" :columns="fileColumn"
                 :loading="fileLoading"
                 :rowKey="record =>fileData.indexOf(record)"
                 :pagination="filePagination"
                 :dataSource="fileData"
                 @change="handleFileTableChange">

        </a-table>
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
        Button,
        Spin,
        message
    } from 'ant-design-vue';
    import XLSX from 'xlsx';

    const columns = [{
        title: '文件名',
        width: '20%',
        scopedSlots: {customRender: 'filename'},
    }, {
        title: '上传日期',
        dataIndex: 'date',
        width: '20%',

    }, {
        title: '用户id',
        dataIndex: 'user',
    }, {
        title: '文件类型',
        dataIndex: 'type',
    }, {
        title: '大小(Bytes)',
        dataIndex: 'filesize',
    }, {
        title: '操作',
        key: 'action',
        scopedSlots: {customRender: 'action'},
    }];
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
            'a-icon': Icon,
            'a-col': Col,
            'a-button': Button,
            'a-progress': Progress,
            'a-modal': Modal,
            'a-popconfirm': Popconfirm,
            'my-icon': MyIcon,
            'a-spin':Spin,


        },
    })
    export default class custom_data extends Vue {
        data() {
            return {
                flag: true,
                data: [],
                pagination: {},
                loading: false,
                visible: false,
                columns,
                fileName: '',
                fileType: '',
                fileColumn: [],
                fileLoading: false,
                file_open: '',
                fileData: [],
                filePagination: {},
                userId:55,
                uploadSpinning:false
            }
        }

        test(record, index) {
            console.log(record);
        }

        handleOk(e) {
            let upload_ins = this.$refs['excel_upload'];
            upload_ins.click();
            this.visible = false
        }

        toggleFlag() {
            this.flag = !this.flag;
        }

        fetchFile(fileName, params = {}) {
            let data = {
                'targetName': fileName,
                'current': 1,
                'pageSize': 10,
                ...params
            }
            this.file_open = fileName;
            API.getFile(data).then(data => {
                let temp = data.columns.slice(0, data.columns.length - 2).map((item, index) => {
                    return {
                        title: item,
                        dataIndex: item
                    }
                });
                this.fileColumn = temp;
                this.fileData = data.data.map((item, index) => {
                    let tem = {};
                    item.map((t, i) => {
                        tem[data.columns[i]] = t
                    })
                    return tem;
                })
                const pagination = {...this.filePagination}
                pagination.current = 1;
                pagination.total = data.total;
                this.filePagination = pagination;
            })
        }

        handleFileTableChange(pagination, filters, sorter) {
            const pager = {...this.filePagination};
            pager.current = pagination.current;
            this.filePagination = pager;
            this.fetchFile(this.file_open, {
                current: this.filePagination.current,
            });
        }

        triggerUpload() {
            this.visible = true
        }

        delelte(name) {
            let list = [];
            list.push(name);
            let ob = {'tablelist': JSON.stringify(list)};
            API.deleteDBfile(ob).then(data => {
                message.success('删除成功！');
                this.$emit('dataChange');
                this.updateData();
            });
        }

        postFile(e) {
            this.uploadSpinning=true
            if ((e.target.files)[0]['name'].indexOf('xlsx') >= 0) {
                this.getExcel(e)
            } else {
                let files = e.target.files;
                var f = files[0];
                var reader = new FileReader();
                reader.readAsDataURL(f);
                reader.onload = e=> {
                    var data = e.target.result.split(',')[1];
                    this.process_mat(data, f);
                };
            }
        }
        process_mat(data, param) {
            var data = {
                    data: data,
                    fileName: this.fileName,
                    size: param.size,
                    fullName: param.name,
                    lastModified: param.lastModified,
                    dataType: this.fileType,
                    userId: this.userId,
                }
            ;
            API.postDBdata(JSON.stringify(data), {
                dataType: 'json',
                cache: false,
                processData: false,
                contentType: false,
            }).then((data) => {
                this.uploadSpinning=false;
                if (data.error_num == 0) {
                    this.$emit('dataChange');
                    this.updateData();
                    message.success('上传成功！')
                } else if (data.error_num == 1) {
                    message.error('上传失败！');
                } else {
                   message.warn('存储空间已满！');
                }
            })
            // jQuery.ajax({
            //     dataType: 'json',
            //     data: JSON.stringify(data),
            //     url: url,
            //     type: 'post',
            //     cache: false,
            //     processData: false,
            //     contentType: false,
            //     success: function (data) {
            //
            //     },
            // });
        }

        getExcel(e) {
            console.log('file');
            let files = e.target.files;
            let f = files[0]
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                var data = e.target.result;
                var wb = XLSX.read(data, {type: "binary"});
                //execl的处理逻辑
                var sheet0 = wb.Sheets[wb.SheetNames[0]]
                var str = XLSX.utils.sheet_to_json(sheet0, {raw: false, header: 1})

                var post_data = {
                    data: JSON.stringify(str),
                    fileName: this.fileName,
                    size: f.size,
                    fullName: f.name,
                    lastModified: f.lastModified,
                    dataType: this.fileType,
                    userId: this.userId,
                }
                API.postDBdata(post_data).then((data) => {
                    this.uploadSpinning=false;
                    this.$emit('dataChange');
                    this.updateData();
                    message.success('上传成功！')
                });
            }
            fileReader.readAsBinaryString(f);
        }

        //update data
        updateData() {
            API.getFileList({userId: 55, targetName: 'cloudpss.index'}).then((data) => {
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
