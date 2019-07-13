<template>
  <div class="view-button">
    <div class="top position-center">
      <div class="name fl">{{item.name}}</div>
      <div class="rate fr">{{item.rate}}%</div>
    </div>
    <div class="bottom">{{item.num}}个</div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({
        name: '块存储',
        rate: '50',
        num: 1200
      })
    }
  }
}
</script>

<style lang="scss">
@import '../assets/style/index.scss';

.view-button {
  position: relative;
  @include bgImage('../assets/images/btn-4.png');
  .top {
    width: 60%;
    font-weight: bold;
    font-size: var(--fontSize-16);
  }
  .bottom {
    position: absolute;
    bottom: 0;
    left: 54%;
    transform: translate3d(-50%, 0, 0);
    font-size: var(--fontSize-14);
    font-weight: bold;
  }
}
</style>
