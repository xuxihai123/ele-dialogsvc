<template>
  <div class="alert-style">
    <template v-if="textMessage">
      <div class="message">{{ textMessage }}</div>
    </template>
    <template v-if="dynamicComponent">
      <component :is="dynamicComponent"></component>
    </template>
    <template v-if="vnode">
      <slot></slot>
    </template>
    <div class="el-message-box__btns">
      <el-button type="primary" size="small" @click="confirm">确定</el-button>
    </div>
  </div>
</template>
<script>
import {isVNode} from '../utils';
import {Button as ElButton} from 'element-ui';
export default {
  inject: ['close', 'dismiss'],
  props: ['message'],
  components: {
    ElButton,
  },
  data() {
    return {
      textMessage: '',
      dynamicComponent: '',
      vnode: false,
    };
  },
  mounted() {
    if (isVNode(this.message)) {
      // eslint-disable-next-line
      this.$slots.default = [this.message];
      this.vnode = true;
    } else if (this.message.render) {
      this.dynamicComponent = this.message;
    } else {
      this.textMessage = this.message;
    }
  },
  methods: {
    confirm() {
      this.close('confirm');
      // this.$emit('close', 1234);
    },
  },
};
</script>

<style lang="scss">
.alert-style {
  .btns {
    line-height: 32px;
    text-align: right;
  }
}
</style>
