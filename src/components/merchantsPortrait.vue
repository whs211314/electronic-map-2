<template>
  <div class="deal-info">
    <!-- 服务点信息 -->
    <div v-if="basicInfo">
      <div v-if="isPicture" class="left fl">
        <div class="picture"></div>
      </div>
      <div class="right fr">
        <div class="item r1 extra">
          <div class="label"><div class="txt">业主姓名</div></div>
          <div class="value orange">{{(+data.jpmLat).toFixed(2)}}, {{(+data.jpmLon).toFixed(2)}}</div>
        </div>
        <div class="item r2">
          <div class="label"><div class="txt">服务点名称</div></div>
          <div class="value">某某范围~某某范围</div>
        </div>
        <div class="item r3 extra">
          <div class="label"><div class="txt">服务点状态</div></div>
          <div class="value orange">{{data.jpmOwnerName}}</div>
        </div>
      </div>
    </div>
    <!-- 客户经理 -->
    <div v-if="client">
      <div v-if="isPicture" class="left fl">
        <div class="picture"></div>
      </div>
      <div class="right fr">
        <div class="item r1 extra">
          <div class="label"><div class="txt">姓名</div></div>
          <div class="value orange">{{(+data.jpmLat).toFixed(2)}}, {{(+data.jpmLon).toFixed(2)}}</div>
        </div>
        <div class="item r2">
          <div class="label"><div class="txt">电话</div></div>
          <div class="value">某某范围~某某范围</div>
        </div>
        <div class="item r3 extra">
          <div class="label"><div class="txt">员工编号</div></div>
          <div class="value orange">{{data.jpmOwnerName}}</div>
        </div>
      </div>
    </div>
    <!-- 远程巡检 -->
    <div v-if="patrol">
      <div v-if="isPicture" class="left fl">
      </div>
      <div class="right fr">
      </div>
    </div>
    <!-- 巡检记录 -->
    <div v-if="record">
      <div class="right">
        <div class="item extra">
          <div class="label"><div class="txt">巡检时间</div></div>
          <div class="value orange">{{(+data.jpmLat).toFixed(2)}}, {{(+data.jpmLon).toFixed(2)}}</div>
        </div>
        <div class="item r2">
          <div class="label"><div class="txt">巡检结果</div></div>
          <div class="value">某某范围~某某范围</div>
        </div>
        <div class="item r3 extra">
          <div class="label"><div class="txt">巡检方式</div></div>
          <div class="value orange">{{data.jpmOwnerName}}</div>
        </div>
      </div>
    </div>
    <!-- 交易 -->
    <div v-if="deal">
      <div class="right">
        <div class="item extra">
          <div class="label"><div class="txt">返佣金额</div></div>
          <div class="value orange">{{(+data.jpmLat).toFixed(2)}}, {{(+data.jpmLon).toFixed(2)}}</div>
        </div>
        <div class="item r2">
          <div class="label"><div class="txt">交易金额</div></div>
          <div class="value">某某范围~某某范围</div>
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
  props: ['data'],
  data () {
    return {
      isPicture: false,
      basicInfo: false, // 服务点信息
      client: false, // 客户经理
      patrol: false, // 远程巡检
      record: false, // 巡检记录
      deal: true // 交易
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
