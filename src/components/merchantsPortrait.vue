<template>
  <div class="deal-info">
    <!-- 服务点信息 -->
    <div v-if="basicInfo" style="height:100%;">
      <div class="left fl">
        <div class="picture">
          <img src="assets/jingli/9188025.png" alt="">
        </div>
      </div>
      <div class="right fr">
        <div class="item r1 extra">
          <div class="label"><div class="txt">业主姓名</div></div>
          <div class="value orange">{{data.jpmOwnerName}}</div>
        </div>
        <div class="item r2">
          <div class="label"><div class="txt">服务点名称</div></div>
          <div class="value">{{data.jpmStreet}}</div>
        </div>
        <div class="item r3 extra">
          <div class="label"><div class="txt">服务点状态</div></div>
          <div class="value orange">{{data.jpmStreet}}</div>
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
          <div class="value orange">{{data.jpmOwnerName}}</div>
        </div>
        <div class="item r2">
          <div class="label"><div class="txt">电话</div></div>
          <div class="value">{{data.jpmBlgBoId}}</div>
        </div>
        <div class="item r3 extra">
          <div class="label"><div class="txt">员工编号</div></div>
          <div class="value orange">{{data.jpmMchType}}</div>
        </div>
      </div>
    </div>
    <!-- 远程巡检 -->
    <div v-if="patrol"  style="height:100%;">
      <div class="left fl">
      </div>
      <div class="right fr">
      </div>
    </div>
    <!-- 巡检记录 -->
    <div v-if="record"  style="height:100%;">
      <div class="right">
        <div class="item extra">
          <div class="label"><div class="txt">巡检时间</div></div>
          <div class="value orange">{{data.jpmCreateTime.split("T")[0]+' '+data.jpmCreateTime.split("T")[1]}}</div>
        </div>
        <div class="item r2">
          <div class="label"><div class="txt">巡检结果</div></div>
          <div class="value">{{data.jpmMenuName}}</div>
        </div>
        <div class="item r3 extra">
          <div class="label"><div class="txt">巡检方式</div></div>
          <div class="value orange">{{data.jpmEqcompanyName}}</div>
        </div>
      </div>
    </div>
    <!-- 交易 -->
    <div v-if="deal"  style="height:100%;">
      <div class="right">
        <div class="item extra">
          <div class="label"><div class="txt">返佣金额</div></div>
          <div class="value orange">{{data.jpmMeloonId}}</div>
        </div>
        <div class="item r2">
          <div class="label"><div class="txt">交易金额</div></div>
          <div class="value">{{data.jpmMeloonId}}</div>
        </div>
        <div class="item r3 extra">
          <div class="label"><div class="txt">交易笔数</div></div>
          <div class="value orange">{{data.jpmOwnerName}}</div>
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
    home_url: Number
  },
  data () {
    return {
    }
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
    height: 20%;
    .label {
      height: 30%;
    }
    .value {
      height: 70%;
    }
    &.extra {
      height: 24%;
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
}
</style>
