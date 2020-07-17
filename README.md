# ele-dialogsvc

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn run serve
```

### Compiles and minifies for production

```
yarn run build
```

### Run your tests

```
yarn run test
```

### Lints and fixes files

```
yarn run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### usage

```
yarn install ele-dialogsvc
```

```js
import dialogSvc from 'ele-dialogsvc';
const modal = dialogSvc.open(<div>message</div>, {
  title: 'hello world',
  parent: '',
});
modal.result.then(
  (result) => {
    console.log(result);
  },
  (reason) => {
    console.log(reason);
  },
);

dialogSvc.open(<Helloworld></Helloworld>, {title:'hello lucy',parent:''}).result.then(
  (result)=>{
  console.log(result);
  },
  (reason)=>{
    console.log(reason);
});

// modal.close('okok');
// modal.dismiss('okok');

dialogSvc.alert({
  title: 'hello world',
  message: 'alert message',
});

dialogSvc.alert({
  title: 'hello world',
  message: <div style="color:red">alert message</div>,
});

dialogSvc
  .confirm({
    title: 'hello world',
    message: 'confirm message',
  })
  .result.then(
    (result) => {
      console.log(result);
    },
    (reason) => {
      console.log(reason);
    },
  );
```

### more usage

[examples](https://github.com/xuxihai123/el-dialogsvc/blob/master/example/views/Home.vue)

### ModalOptions

```ts
interface ModalOptions {
  //   visible?: boolean; // 是否显示 Dialog
  title?: string; // Dialog 的标题
  //   width?: number; // Dialog 的宽度
  //   top?: number; // Dialog CSS 中的 margin-top 值  default 15vh
  fullscreen?: boolean; // 是否为全屏 Dialog default false
  modal?: boolean; //是否需要遮罩层 default true
  modalAppendToBody?: boolean; // 遮罩层是否插入至 body 元素上，若为 false，则遮罩层会插入至 Dialog 的父元素上 default true
  appendToBody?: boolean; // Dialog 自身是否插入至 body 元素上
  lockScroll?: boolean; // 是否在 Dialog 出现时将 body 滚动锁定  default true
  customClass?: boolean; // Dialog 的自定义类名
  closeOnClickModal?: boolean; // 是否可以通过点击 modal 关闭 Dialog
  closeOnPressEscape?: boolean; // 是否可以通过按下 ESC 关闭 Dialog
  message?: any; // for alert/confirm message content
  showClose?: boolean; // 是否显示关闭按钮 default true
  center?: boolean; // 是否对头部和底部采用居中布局 defualt false
  parent?: Vue; // mounte dialog to parent or global
  beforeClose?: Callback; // 关闭前的回调，会暂停 Dialog 的关闭
}
```

### service api

```ts
interface ModalService {
  open: (content: VNode | Component, options: ModalOptions | void) => ModalRef; // vnode or {render:Function} component
  dismissAll: (reason: any) => void;
  hasOpenModals: () => boolean;
  alert: (options: ModalOptions) => ModalRef;
  confirm: (options: ModalOptions) => ModalRef;
}
```

### modal instance

```ts
interface ModalRef {
  id: number; // modal id
  context: Vue; // modal component instance
  result: Promise<any>; // A promise that is resolved when the modal is closed and rejected when the modal is dismissed
  close: (result: any) => void; // close  modal with result value
  dismiss: (reason: any) => void; // dismiss modal with reason value
  options: ModalOptions;
}
```
