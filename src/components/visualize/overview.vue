<template>
  <div class="card-list" ref="content">
    <a-list
      :grid="{gutter: 24, lg: 3, md: 2, sm: 1, xs: 1}"
      :dataSource="dataSource"
    >
      <a-list-item slot="renderItem" slot-scope="item">
        <template  v-if="item!== null">
          <a-card :hoverable="true">
            <a-card-meta>
              <div style="margin-bottom: 3px" slot="title">{{ item.title }}</div>
              <a-avatar class="card-avatar" slot="avatar" :src="item.avatar" size="large"/>
              <div class="meta-content" slot="description">{{ item.content }}</div>
            </a-card-meta>
            <template class="ant-card-actions" slot="actions">
              <a>打开</a>
              <a>删除</a>
            </template>
          </a-card>
        </template>
        <template v-else>
          <a-button class="new-btn" type="dashed">
            <a-icon type="plus"/>
            新建流程
          </a-button>
        </template>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>

const dataSource = []
for (let i = 1; i < 8; i++) {
  dataSource.push({
    title: '测试案例'+i,
    avatar: '',
    content: '数据显示方案'+i
  })
}
dataSource.push(null);
import {Component, Vue} from 'vue-property-decorator';
import API from "@/Api/api_data";
import {Tabs,List,Button,Card,Avatar,Icon} from 'ant-design-vue';
@Component({
  components: {
    'a-tabs': Tabs,
    'a-tab-pane': Tabs.TabPane,
    'a-list': List,
    'a-button': Button,
    'a-list-item':List.Item,
    'a-card': Card,
    'a-card-meta':Card.Meta,
     'a-avatar':Avatar,
    'a-icon':Icon,

  },
})
export default class overview extends Vue {
  data () {
    return {
      dataSource
    }
  }
}
</script>

<style lang="less" scoped>
  .card-avatar {
    width: 48px;
    height: 48px;
    border-radius: 48px;
  }

  .ant-card-actions {
    background: #f7f9fa;
    li {
      float: left;
      text-align: center;
      margin: 12px 0;
      color: rgba(0, 0, 0, 0.45);
      width: 50%;

      &:not(:last-child) {
        border-right: 1px solid #e8e8e8;
      }

      a {
        color: rgba(0, 0, 0, .45);
        line-height: 22px;
        display: inline-block;
        width: 100%;
        &:hover {
          color: #1890ff;
        }
      }
    }
  }

  .new-btn {
    background-color: #fff;
    border-radius: 2px;
    width: 100%;
    height: 188px;
  }

  .meta-content {
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    height: 64px;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
</style>
