<template>
  <div class="about">
    <h1>example of modal service</h1>
    <div class="items">
      <el-button @click="openCase1">open api</el-button>
      <el-button @click="openCase2">open api-Vnode</el-button>
      <el-button @click="openCase3">open api-render component</el-button>
      <el-button @click="alertCase1">内置alert text</el-button>
      <el-button @click="alertCase2">内置alert vnode</el-button>
      <el-button @click="alertCase3">内置alert render component</el-button>
      <el-button @click="confirmCase1">内置confirm text </el-button>
      <el-button @click="confirmCase2">内置confirm vnode</el-button>
      <el-button @click="confirmCase3">内置confirm render componnet</el-button>
      <el-button @click="customAlert">custom Alert</el-button>
      <el-button @click="customConfirm">custom Confirm</el-button>
      <el-button @click="dismissExample">dismiss modal</el-button>
      <el-button @click="cancelAll">DismissAll modal</el-button>
    </div>
  </div>
</template>

<script>
import dialogService from '../../src/main';
import CustomAlert from '../components/CustomAlert.vue';
import CustomConfirm from '../components/CustomConfirm.vue';
import HelloWorld from '../components/HelloWorld.vue';
export default {
  methods: {
    openCase1() {
      dialogService.open(<div>this call open api</div>, {title: 'openCase1'});
    },
    openCase2() {
      dialogService.open(<HelloWorld />, {title: 'openCase2'});
    },
    openCase3() {
      dialogService.open(
        {
          render(h) {
            return h(HelloWorld, {});
          },
        },
        {title: 'openCase3'},
      );
    },
    alertCase1() {
      dialogService.alert({
        title: 'alertCase1',
        message: 'this builtin alert fill content text',
        beforeClose: function(done, result) {
          console.log(result);
          // done(false);
          done(true);
        },
      });
    },
    alertCase2() {
      dialogService.alert({
        title: 'alertCase2',
        message: <div>this builtin alert fill content vnode</div>,
      });
    },
    alertCase3() {
      dialogService.alert({
        title: 'alertCase3',
        message: {
          render(h) {
            return h(HelloWorld, {});
          },
        },
      });
    },
    confirmCase1() {
      dialogService
        .confirm({
          title: 'confirmCase1',
          message: 'this builtin alert fill content text',
          // beforeClose: function(done, result) {
          //   console.log(result);
          //   done(false);
          // },
        })
        .result.then(
          (result) => {
            console.log(result);
          },
          (reason) => {
            console.log(reason);
          },
        );
    },
    confirmCase2() {
      dialogService
        .confirm({
          title: 'confirmCase2',
          message: <div>this builtin alert fill content vnode</div>,
        })
        .result.then(
          (result) => {
            console.log(result);
          },
          (reason) => {
            console.log(reason);
          },
        );
    },
    confirmCase3() {
      dialogService
        .confirm({
          title: 'confirmCase3',
          message: {
            render(h) {
              return h(HelloWorld, {});
            },
          },
        })
        .result.then(
          (result) => {
            console.log(result);
          },
          (reason) => {
            console.log(reason);
          },
        );
    },
    customAlert() {
      dialogService.open(<CustomAlert />, {title: 'custom alert!'}).result.then(
        (result) => {
          console.log(result);
        },
        (reason) => {
          console.log(reason);
        },
      );
    },
    customConfirm() {
      dialogService
        .open(<CustomConfirm />, {
          // beforeClose: function(done, result) {
          //   console.log(result);
          //   done(false);
          // },
        })
        .result.then(
          (result) => {
            console.log(result);
          },
          (reason) => {
            console.log(reason);
          },
        );
    },

    dismissExample() {
      const dialog1 = dialogService.alert({
        title: 'dialog1',
        customClass: 'dialog-level1',
        message: 'this is dialog1 message',
      });
      const dialog2 = dialogService.alert({
        title: 'dialog2',
        customClass: 'dialog-level2',
        message: 'this is dialog2 message',
      });
      const dialog3 = dialogService.alert({
        title: 'dialog3',
        customClass: 'dialog-level3',
        message: 'this is dialog3 message',
      });
      // [dialog3, dialog2, dialog1].forEach((t, index) => setTimeout(() => t.dismiss(''), (index + 1) * 2000));
    },
    cancelAll() {
      dialogService.alert({
        title: 'dialog1',
        customClass: 'dialog-level1',
        message: 'this is dialog1 message',
      });
      dialogService.alert({
        title: 'dialog2',
        customClass: 'dialog-level2',
        message: 'this is dialog2 message',
      });
      dialogService.alert({
        title: 'dialog3',
        customClass: 'dialog-level3',
        message: 'this is dialog3 message',
      });
      setTimeout(() => {
        dialogService.dismissAll('fkfkf');
      }, 2000);
    },
  },
};
</script>

<style lang="scss">
.dialog-svc-container {
  .dialog-level1 {
    width: 600px;
    background-color: yellow;
  }
  .dialog-level2 {
    width: 500px;
    background-color: aqua;
    top: 150px;
  }
  .dialog-level3 {
    width: 400px;
    top: 300px;
  }
}
.items {
  display: flex;
  flex-direction: column;
  button {
    width: 300px;
    margin-left: 10px;
  }
}
</style>
