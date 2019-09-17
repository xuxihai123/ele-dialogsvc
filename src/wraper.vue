<template>
  <el-dialog
    class="dialog-svc-container"
    :title="title"
    :visible.sync="visible"
    :before-close="() => dismissModal('close-btn')"
    :customClass="customClass"
    :fullscreen="fullscreen"
    :modal="modal"
    :modalAppendToBody="modalAppendToBody"
    :appendToBody="appendToBody"
    :lockScroll="lockScroll"
    :closeOnClickModal="closeOnClickModal"
    :closeOnPressEscape="closeOnPressEscape"
    :showClose="showClose"
    :center="center"
  >
    <template v-if="dynamicComponent">
      <component :is="dynamicComponent"></component>
    </template>
    <template v-if="!dynamicComponent">
      <slot></slot>
    </template>
  </el-dialog>
</template>

<script>
import {Dialog} from 'element-ui';
export default {
  components: {
    'el-dialog': Dialog,
  },
  data() {
    return {
      visible: false,
      title: '',
      width: '50%',
      top: '15vh',
      customClass: '',
      fullscreen: false,
      modal: true,
      modalAppendToBody: false,
      appendToBody: false,
      lockScroll: false,
      closeOnClickModal: true,
      closeOnPressEscape: true,
      showClose: true,
      center: false,
      closeOnHashChange: false,
      dynamicComponent: '',
    };
  },
  provide() {
    let self = this;
    return {
      close: self.closeModal,
      dismiss: self.dismissModal,
    };
  },
  /* eslint-disable */
  mounted() {
    console.log('DialogSvcContainer mounted...');
  },
  destroyed() {
    console.log('DialogSvcContainer destroyed...');
  },
  methods: {
    closeModal(result) {
      this.handleAction('close', result);
    },
    dismissModal(reason) {
      this.handleAction('dismiss', reason);
    },

    handleAction(action, result) {
      throw Error('overide by mixin');
    },
    beforeClose(done, result) {
      throw Error('overide by mixin');
    },
  },
  /* eslint-enable */
};
</script>

<style lang="scss" scoped>
.dialog-svc-container {
  /deep/ .el-dialog__headerbtn {
    right: 6px;
    top: 6px;
  }
  /deep/ .el-dialog__body {
    height: 100%;
    width: 100%;
    box-sizing: inherit;
  }
}
</style>
