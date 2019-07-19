<template>
  <div class="view-button" @click.stop="$emit('itemClick', item)">
    <div class="top position-center">
      <div class="name fl">{{item.tradeName}}</div>
      <div class="rate fr">{{item.mix}}%</div>
    </div>
    <div class="bottom">{{item.count}}个</div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss">
@import '../assets/style/index.scss';

.view-button {
  position: relative;
  cursor: pointer;
  @include bgImage('../assets/images/btn-4.png');
  .top {
    width: 75%;
    font-weight: bold;
    font-size: var(--fontSize-18);
  }
  .bottom {
    position: absolute;
    bottom: -5%;
    left: 54%;
    transform: translate3d(-50%, 0, 0);
    font-size: var(--fontSize-16);
    font-weight: bold;
  }
}
</style>
