<template>
  <div class="livelihood-inner">
    <div class="left">民生缴费笔数及占比</div>
    <div class="center">{{ livelihood.count }}笔</div>
    <div class="right">{{ livelihood.rate * 100 }}%</div>
  </div>
</template>

<script>
import { getOneEcpJxtMsjf } from '@/api'
export default {
  data () {
    return {
      livelihood: {
        rate: 0,
        count: 0
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      getOneEcpJxtMsjf().then(res => {
        const { jfbsCount, jfbsMix } = res.data
        this.livelihood = {
          rate: jfbsMix,
          count: jfbsCount
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.livelihood-inner {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  background-color: rgba(42, 102, 114, 0.4);
  border: 1px solid #42958f;
  border-radius: 4px;
  font-size: var(--fontSize-12);
  &:before {
    content: '';
    position: absolute;
    top: -15px;
    bottom: -15px;
    left: -10px;
    right: -20px;
    border: 3px solid #38b0b3;
    border-radius: 4px;
  }
  .left {
    color: #00fff0;
  }
  .center {
    color: #91fff9;
  }
  .right {
    color: #ff8926;
  }
}
</style>
