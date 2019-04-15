<template>
  <div class="custom-confirm">
    <div>confirm body....</div>
    <div class="btns">
      <button @click="close(111)">确定</button>
      <button @click="dismiss(222)">取消</button>
    </div>
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
.custom-confirm {
  .btns {
    text-align: right;
  }
}
</style>
