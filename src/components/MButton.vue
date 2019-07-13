<template>
  <div class="m-button position-space" :class="btnCls">
    <span class="txt position-center">{{txt}}</span>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: [String, Number],
      default: 1
    },
    txt: String
  },
  computed: {
    btnCls () {
      return `btn-${this.type}`
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/style/index.scss';

.m-button {
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  font-weight: bold;
  .txt {
    word-break: keep-all;
  }
}

.btn-1 {
  background-image: url(../assets/images/btn-1.png);
}
.btn-2 {
  background-image: url(../assets/images/btn-2.png);
}
.btn-3 {
  background-image: url(../assets/images/btn-3.png);
}
.btn-4 {
  background-image: url(../assets/images/btn-4.png);
}
</style>
