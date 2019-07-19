<template>
  <div class="team-view">
    <div class="title flex-center">
      <div class="txt">合作视图</div>
    </div>
    <div class="empty"></div>
    <div class="items">
      <ViewButton class="item" v-for="(item, index) in items" :key="index" />
    </div>
  </div>
</template>

<script>
import ViewButton from './ViewButton'
export default {
  props: {
    items: {
      type: Array,
      default: () => ([])
    }
  },
  created () {
    console.log(this.items)
  },
  components: { ViewButton }
}
</script>

<style scoped lang="scss">
@import '../assets/style/index.scss';
.team-view {
  position: absolute;
  left: -50%;
  right: -50%;
  top: -50%;
  bottom: -50%;
  transform: scale(0.5);
  .title{
    height: 4%;
    font-size: calc(var(--fontSize-13) * 2);
    font-weight: bold;
    .txt {
      margin-left: 12%;
    }
  }
  .empty {
    height: 2%;
  }
  .items {
    width: 68%;
    height: 85%;
    margin-left: 14%;
    display: flex;
    flex-wrap: wrap;
    .item {
      width: 100%;
      height: 10%;
      .top {
        color: $grey;
        font-size: var(--fontSize-18);
      }
    }
  }
}
</style>
