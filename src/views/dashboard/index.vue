<template>
  <div class="dashboard">
    <div class="logo"></div>
    <!-- 便民服务 -->
    <div class="show-top">
      <div class="title-show flex-center">
        <div class="txt">便民服务展示</div>
      </div>
      <!-- <div class="empty"></div> -->
      <div class="items-show">
        <div class="item" v-for="(item, index) in services1" :key="index" @click="showClick(index)">
          <MButton type="1" :txt="item.type" />
          <div v-show="activeIndex===index" class="prompt-dialog">{{item.name}}</div>
        </div>
      </div>
    </div>
    <!-- 政务服务能力 -->
    <div class="show-middle">
      <div class="title-show flex-center">
        <div class="txt">政务服务能力</div>
      </div>
      <div class="empty"></div>
      <div class="items-show">
        <div class="item" v-for="(item, index) in services2" :key="index">
          <MButton type="2" :txt="item" />
        </div>
      </div>
    </div>
    <!-- 实体经济服务 -->
    <div class="show-bottom">
      <div class="title-show flex-center">
        <div class="txt">实体经济服务</div>
      </div>
      <div class="empty"></div>
      <div class="items-show">
        <div class="item" v-for="(item, index) in services3" :key="index">
          <MButton type="2" :txt="item" />
        </div>
      </div>
    </div>
    <!-- 扶贫能力展示 -->
    <div class="show-right">
      <div class="title-show flex-center">
        <div class="txt">扶贫能力展示</div>
      </div>
      <div class="empty"></div>
      <div class="items-show">
        <div class="item" v-for="(item, index) in services4" :key="index">
          <MButton type="2" :txt="item" />
        </div>
      </div>
    </div>
    <!-- 饼图部分 -->
    <div class="pie">
      <Pie />
    </div>
    <!-- 交易信息区 -->
    <div class="summary">
      <DealInfo />
    </div>
    <!-- 地图 -->
    <div class="map">
      <MChart />
    </div>
    <!-- 地图操作 -->
    <div class="map-operation">
      <div class="deal fl flex-center active"><div class="txt">交易地图</div></div>
      <div class="deploy fr flex-center"><div class="txt">部署地图</div></div>
    </div>
    <!-- 合作视图 -->
    <div class="teamview">
      <TeamView :items="teamviews" />
    </div>
    <!-- 交易监控 -->
    <div class="monitor-top-r">
      <MonitorDeal :items="monitorDealList" />
    </div>
    <!-- 监控按钮 active -->
    <div class="monitor-top-l items-monitor flex-center">
      <div class="item flex-center" :key="index"
        v-for="(item, index) in monitors" @click="monitorClick(index)">
        <div class="txt">{{item.type}}</div>
      </div>
    </div>
    <!-- 服务点视图-->
    <div v-if="monitorIndex === 0" class="monitor-middle">
      <serviceMonitorChart />
    </div>
    <!-- 异常终端视图 -->
    <div v-if="monitorIndex === 1" class="monitor-middle">
      <terminalMonitorChart />
    </div>
    <!-- 交易视图 -->
    <div v-if="monitorIndex === 2" class="monitor-middle">
      <transactionMonitorChart />
    </div>
    <!-- 风险预警 -->
    <div v-if="monitorIndex === 3" class="monitor-middle">
      <riskMonitorChart />
    </div>
    <!-- 巡检 -->
    <div v-if="monitorIndex === 4" class="monitor-middle">
      <patrolMonitorChart />
    </div>
    <!-- 服务点交易排名 -->
    <div class="monitor-bottom">
      <RankService />
    </div>
  </div>
</template>

<script>
import MButton from '@/components/MButton'
import TeamView from '@/components/TeamView'
import MonitorDeal from '@/components/MonitorDeal'
import Pie from '@/components/Pie'
import DealInfo from '@/components/DealInfo'
import RankService from '@/components/RankService'
import serviceMonitorChart from '@/components/serviceMonitorChart'
import terminalMonitorChart from '@/components/terminalMonitorChart'
import transactionMonitorChart from '@/components/transactionMonitorChart'
import riskMonitorChart from '@/components/riskMonitorChart'
import patrolMonitorChart from '@/components/patrolMonitorChart'
import MChart from '@/components/MChart'

export default {
  components: { MButton, TeamView, MonitorDeal, Pie, DealInfo, RankService, serviceMonitorChart, terminalMonitorChart, transactionMonitorChart, riskMonitorChart, patrolMonitorChart, MChart },
  data () {
    return {
      activeIndex: -1, // 便民服务初始化索引
      monitorIndex: 0, // 监控按钮初始化索引
      services1: Array.from({ length: 9 }, () => ({ type: '现金业务', name: '我爱我家' })),
      services2: Array.from({ length: 9 }, () => '医院挂号'),
      services3: Array.from({ length: 6 }, () => '预约开户'),
      services4: Array.from({ length: 6 }, () => '农产品进城'),
      teamviews: Array.from({ length: 10 }, () => '农产品进城'),
      monitors: [{ type: '服务点视图' }, { type: '异常终端视图' }, { type: '交易视图' }, { type: '风险预警' }, { type: '巡检' }],
      monitorDealList: Array.from({ length: 5 }, () => ({ type: '存款', money: 1000, dealStatus: '成功', riskStatus: '正常', isChange: '是' }))
    }
  },
  methods: {
    // 便民服务弹窗
    showClick (index) {
      this.activeIndex = index
      setTimeout(() => {
        this.activeIndex = -1
      }, 3000)
    },
    // 监控按钮弹窗
    monitorClick (index) {
      this.monitorIndex = index
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/style/dashboard.scss';
</style>
