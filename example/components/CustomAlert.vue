<template>
  <div class="custom-alert">
    <div class="message">alert body....</div>
    <div class="btns"><button @click="close(111)">确定</button></div>
  </div>
</template>
<script>
export default {
  inject: ['close', 'dismiss'],
  mounted() {
    console.log('CustomConfirm...');
    // console.log(this.close);
    console.log(this.$route);
  },
};
</script>

<style lang="scss" scoped>
.custom-alert {
  .btns {
    text-align: right;
  }
}
</style>
