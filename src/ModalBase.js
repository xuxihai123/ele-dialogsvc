const defaults = {
  visible: false,
  title: '',
  customClass: '',
  center: false, // 是否对头部和底部采用居中布局 defualt false
  parent: '', // mounte dialog to parent or global
};

import Vue from 'vue';
import DialogSvcContainer from './wraper.vue';
import {Defered, isVNode} from './utils';

class ModalBase {
  constructor() {
    this.__queue = [];
    this.__validMap = {};
    this.counter = 0;
    this.topModal = undefined;
  }
  handleAction(context, action, result) {
    // console.log('handleAction=>action:' + action);
    const vm = context;
    vm.resolveData = {action, result};
    vm.beforeClose(this.getSafeClose(vm), vm.resolveData);
  }
  getSafeClose(context) {
    return (closeFlag) => closeFlag && context.$nextTick(() => this.doClose(context));
  }
  doClose(context) {
    const vm = context;
    const {action, result} = vm.resolveData;
    // console.log('doClose=>action:' + action);
    const modalRef = vm.modalRef;

    if (action === 'close') {
      modalRef.result.resolve(result);
    } else {
      modalRef.result.reject(result);
    }
    delete this.__validMap[modalRef.id];
    vm.$nextTick(() => {
      vm.visible = false;
      vm.$destroy();
      vm.$el.remove();
    });
  }
  /**
   * showNextModal
   */
  showNextModal() {
    const __queue = this.__queue;
    // console.log('..showNextMsg');
    const modalRef = __queue.shift();
    const self = this;
    if (modalRef) {
      const vm = modalRef.context;
      const options = modalRef.options;
      if (options.parent) {
        options.appendToBody = false;
      }
      Object.assign(vm, options);

      if (!options.parent) {
        document.body.appendChild(vm.$el);
      } else {
        options.parent.$el.appendChild(vm.$el);
      }

      Vue.nextTick(() => {
        vm.visible = true;
        self.__validMap[modalRef.id] = modalRef;
        self.topModal = modalRef;
      });
    }
  }
  /**
   * open dialog with content(options)
   */
  open(content, options) {
    let opts = Object.assign({}, defaults, options || {});
    const el = document.createElement('div');
    const ModalBoxConstructor = Vue.extend(DialogSvcContainer);
    const vm = new ModalBoxConstructor({parent: opts.parent}); // before/beforeCreate hook
    const defer = Defered();
    let beforeClose = (done) => done(true);
    if (opts.beforeClose) {
      beforeClose = opts.beforeClose;
    }
    if (isVNode(content)) {
      vm.$slots.default = [content];
    }
    if (content && content.render) {
      opts.dynamicComponent = content;
      delete vm.$slots.default;
    }

    const modalRef = {
      id: this.counter++,
      context: vm,
      result: defer,
      close: (result) => this.handleAction(vm, 'close', result),
      dismiss: (reason) => this.handleAction(vm, 'dismiss', reason),
      options: opts,
    };
    vm.modalRef = modalRef;
    vm.beforeClose = beforeClose;
    vm.handleAction = this.handleAction.bind(this, vm);
    this.__queue.push(modalRef);
    vm.$mount(el); // mounted hook
    this.showNextModal();
    return modalRef;
  }
  /**
   * dismissAll
   */
  dismissAll(reason) {
    const map = this.__validMap;
    Object.keys(map).forEach((key) => map[key].dismiss(reason));
    // console.log('dismissAll...');
  }

  /**
   * hasOpenModals
   */
  hasOpenModals() {
    return this.__queue.length > 0;
  }
}

export default ModalBase;
