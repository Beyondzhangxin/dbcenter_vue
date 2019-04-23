<template>
    <div >
        <a-row :gutter="24">
            <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
                <chart-card :loading="loading" title="总数据量" total="1234M">
                    <a-tooltip title="详情" slot="action">
                        <a-icon type="info-circle-o"/>
                    </a-tooltip>
                    <div>
                        <trend flag="up" style="margin-right: 16px;">
                            <span slot="term">月同比</span>
                            12%
                        </trend>

                        <trend flag="down">
                            <span slot="term">周同比</span>
                            11%
                        </trend>
                    </div>
                    <template slot="footer">日均增长额<span>12.6M</span></template>
                </chart-card>
            </a-col>
            <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
                <chart-card :loading="loading" title="数据访问量" :total="18846 | NumberFormat ">
                    <a-tooltip title="访问详情" slot="action">
                        <a-icon type="info-circle-o" />
                    </a-tooltip>
                    <div>
                        <mini-area />
                    </div>
                    <template slot="footer">日访问量<span> {{ '1234' | NumberFormat }}次</span></template>
                </chart-card>
            </a-col>
        </a-row>
    </div>
</template>
<script>
    import {Component, Vue} from 'vue-property-decorator';
    import {Card, Row, Col, Tooltip, Icon} from 'ant-design-vue'
    import ChartCard from '@/components/others/ChartCard'
    import Trend from '@/components/others/Trend'
    import MiniArea from '@/components/others/MiniArea';
    @Component({
        components: {
            'a-card': Card,
            'a-row': Row,
            'a-col': Col,
            'a-tooltip': Tooltip,
            'a-icon': Icon,
            ChartCard,
            Trend,
            MiniArea,
        },
    })
    export default class analysis extends Vue {
        data() {
            return {
                loading: false,

            }
        }
    }
</script>


<style lang="less" scoped>

</style>
