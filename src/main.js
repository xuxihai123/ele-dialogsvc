import ModalBaseImpl from './ModalBase';
import AlertContent from './contents/alert.vue';
import ConfirmContent from './contents/confirm.vue';

function buildComponent(Component, message) {
  return {
    render: function(h) {
      return h(Component, {
        props: {message},
        class: {'builtin-modal': true},
      });
    },
  };
}

class ModalService extends ModalBaseImpl {
  alert(options) {
    return this.open(buildComponent(AlertContent, options.message), options);
  }
  confirm(options) {
    return this.open(buildComponent(ConfirmContent, options.message), options);
  }
  install(Vue) {
    let self = this;

    function newOpen(vm, content, options) {
      options.parent = options.parent || vm;
      return self.open.apply(self, [content, options]);
    }
    Vue.mixin({
      beforeCreate: function() {
        const vm = this;
        vm.$dialogSvc = {
          open: newOpen.bind(self, vm),
          dismissAll: self.dismissAll.bind(self),
          hasOpenModals: self.hasOpenModals.bind(self),
          alert: self.alert,
          confirm: self.confirm,
        };
      },
    });
  }
}

/* eslint-disable no-console */
console.log(`[${process.env.__PKGNAME__}] version:${process.env.__VERSION__}`);

export default new ModalService();
