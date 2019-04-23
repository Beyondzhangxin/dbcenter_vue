<template>
  <div :class="[prefixCls, reverseColor && 'reverse-color' ]">
    <span>
      <slot name="term"></slot>
      <span class="item-text">
        <slot></slot>
      </span>
    </span>
    <span :class="[flag]"><a-icon :type="`caret-${flag}`"/></span>
  </div>
</template>

<script>
  import {Icon} from 'ant-design-vue'
export default {
  name: 'Trend',
  components:{
    'a-icon':Icon
  },
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-trend'
    },
    /**
       * 上升下降标识：up|down
       */
    flag: {
      type: String,
      required: true
    },
    /**
       * 颜色反转
       */
    reverseColor: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
  @import "~ant-design-vue/lib/style/index";
  @ant-pro-prefix             : ant-pro;
  @trend-prefix-cls: ~"@{ant-pro-prefix}-trend";

  .@{trend-prefix-cls} {
    display: inline-block;
    font-size: @font-size-base;
    line-height: 22px;

    .up,
    .down {
      margin-left: 4px;
      position: relative;
      top: 1px;

      i {
        font-size: 12px;
        transform: scale(0.83);
      }
    }

    .item-text {
      display: inline-block;
      margin-left: 8px;
      color: rgba(0,0,0,.85);
    }

    .up {
      color: @red-6;
    }
    .down {
      color: @green-6;
      top: -1px;
    }

    &.reverse-color .up {
      color: @green-6;
    }
    &.reverse-color .down {
      color: @red-6;
    }
  }
</style>
