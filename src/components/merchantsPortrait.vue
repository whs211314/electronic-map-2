<template>
  <div class="deal-info">
    <!-- 服务点信息 -->
    <div v-if="basicInfo" style="height:100%;">
      <div class="left fl">
        <div class="picture">
          <img :src="home_url1" alt="" width="100%">
        </div>
      </div>
      <div class="right fr">
        <div class="item r1 extra">
          <div class="label"><div class="txt">业主姓名</div></div>
          <div class="value orange">{{data.essential.jpmOwnerName}}</div>
        </div>
        <div class="item r2">
          <div class="label"><div class="txt">服务点名称</div></div>
          <div class="value">{{data.essential.jpmVillage}}</div>
        </div>
        <div class="item r3 extra">
          <div class="label"><div class="txt">服务点状态</div></div>
          <div class="value orange">正常</div>
        </div>
      </div>
    </div>
    <!-- 客户经理 -->
    <div v-if="client" style="height:100%;" >
      <div class="left fl">
        <div class="picture">
          <img :src="home_url" alt="" width="100%">
        </div>
      </div>
      <div class="right fr">
        <div class="item r1 extra">
          <div class="label"><div class="txt">姓名</div></div>
          <div class="value orange">{{data.client.manager?data.client.manager:''}}</div>
        </div>
        <div class="item r2">
          <div class="label"><div class="txt">电话</div></div>
          <div class="value">{{data.client.managerPhone?data.client.managerPhone: ''}}</div>
        </div>
        <div class="item r3 extra">
          <div class="label"><div class="txt">员工编号</div></div>
          <div class="value orange">{{data.client.managerCode ?data.client.managerCode:''}}</div>
        </div>
      </div>
    </div>
    <!-- 远程巡检 -->
    <div v-if="patrol"  style="height:100%;">
      <div class="connecting"></div>
    </div>
    <!-- 巡检记录 -->
    <div v-if="record"  style="height:100%;">
      <div class="right">
        <div class="item extra">
          <div class="label"><div class="txt">巡检时间</div></div>
          <div class="value orange">{{data.record.jtmEndDate?data.record.jtmEndDate:''}}</div>
        </div>
        <div class="item r2">
          <div class="label"><div class="txt">巡检结果</div></div>
          <div class="value">{{data.record.checkResult?data.record.checkResult:''}}</div>
        </div>
        <div class="item r3 extra">
          <div class="label"><div class="txt">巡检方式</div></div>
          <div class="value orange">{{data.record.checkTypeName?data.record.checkTypeName:''}}</div>
        </div>
      </div>
    </div>
    <!-- 交易 -->
    <div v-if="deal"  style="height:100%;">
      <div class="right">
        <div class="item extra">
          <div class="label"><div class="txt">返佣金额</div></div>
          <div class="value orange">{{data.deal.transAllSum?parseInt(data.deal.transAllSum/100*0.003): ''}}元</div>
        </div>
        <div class="item r2">
          <div class="label"><div class="txt">交易金额</div></div>
          <div class="value">{{data.deal.transAllSum?parseInt(data.deal.transAllSum/1000000):''}}万元</div>
        </div>
        <div class="item r3 extra">
          <div class="label"><div class="txt">交易笔数</div></div>
          <div class="value orange">{{data.deal.transAllCount?data.deal.transAllCount: ''}}笔</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object
    },
    basicInfo: { // 基本信息
      type: Boolean,
      default: false
    },
    client: { // 客户经理
      type: Boolean,
      default: false
    },
    patrol: { // 远程巡检
      type: Boolean,
      default: false
    },
    record: { // 巡检记录
      type: Boolean,
      default: false
    },
    deal: { // 交易
      type: Boolean,
      default: false
    },
    dialogTxt: String,
    home_url: String,
    home_url1: String
  },
  data () {
    return {
    }
  },
  created () {
    console.log(this.data)
  }
}
</script>

<style scoped lang="scss">
@import '../assets/style/index.scss';
.deal-info {
  position: absolute;
  left: -50%;
  right: -50%;
  top: -50%;
  bottom: -50%;
  transform: scale(0.5);
  .txt {
    width: 100%;
    text-align: left;
  }
  .left, .right {
    width: 50%;
    height: 100%;
  }
  .picture {
    height: 70%;
    width: 85%;
    background: #019897;
  }
  .item {
    height: 28%;
    .label {
      height: 30%;
    }
    .value {
      height: 70%;
    }
    &.extra {
      height: 30%;
      .label {
        height: 50%;
      }
      .value {
        height: 50%;
      }
    }
  }
  .right {
    position: relative;
    .r3 {
      position: absolute;
    }
    .r4 {
      position: absolute;
      bottom: 0;
    }
  }
  .label {
    @extend .flex-center;
    font-size: var(--fontSize-16);
  }
  .value {
    font-size: calc(var(--fontSize-12) * 2);
    color: $light-blue;
    font-weight: bold;
    &.orange {
      color: #00FFF0;
    }
  }
  .connecting{
    @include bgImage('../assets/images/connecting.png');
    background-repeat: no-repeat;
    background-size: 100%;
    height: 100%;
    position: relative;
  }
}
</style>
