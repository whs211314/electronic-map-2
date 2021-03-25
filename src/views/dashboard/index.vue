<template>
  <div class="dashboard" v-if="isReady">
    <div class="dashboard-bg position-space"></div>
    <!-- 便民服务 -->
    <div class="show-top" v-if="services.length">
      <div class="title-show flex-center">
        <div class="txt">{{ services[0].btType }}</div>
      </div>
      <div class="empty"></div>
      <div class="items-show">
        <div class="item" v-for="item in services[0].btmapList" :key="item.id">
          <MButton
            :type="item.isGroup ? 7 : 1"
            :txt="item.txt"
            :hasDialog="Boolean(item.dialogTxt)"
            position="top"
            :dialogTxt="item.dialogTxt"
          />
        </div>
      </div>
    </div>
    <!-- 政务服务能力 -->
    <div class="show-middle" v-if="services.length">
      <div class="title-show flex-center">
        <div class="txt">{{ services[1].btType }}</div>
      </div>
      <div class="empty"></div>
      <div class="items-show" style="height: 70%">
        <div class="item" v-for="item in services[1].btmapList" :key="item.id">
          <MButton
            :type="1"
            :txt="item.txt"
            :hasDialog="true"
            position="top"
            :dialogTxt="item.dialogTxt"
          />
        </div>
      </div>
    </div>
    <!-- 实体经济服务 -->
    <div class="show-bottom" v-if="services.length">
      <div class="title-show flex-center">
        <div class="txt">{{ services[2].btType }}</div>
      </div>
      <div class="empty"></div>
      <div class="items-show">
        <div class="item" v-for="item in services[2].btmapList" :key="item.id">
          <MButton
            :type="1"
            :txt="item.txt"
            :hasDialog="true"
            position="bottom"
            :dialogTxt="item.dialogTxt"
          />
        </div>
      </div>
    </div>
    <!-- 扶贫能力展示 -->
    <div class="show-right" v-if="services.length">
      <div class="title-show flex-center">
        <div class="txt">{{ services[3].btType }}</div>
      </div>
      <div class="empty"></div>
      <div class="items-show">
        <div class="item" v-for="item in services[3].btmapList" :key="item.id">
          <MButton
            type="1"
            :txt="item.txt"
            :hasDialog="true"
            position="bottom"
            :isLarge="true"
            :dialogTxt="item.dialogTxt"
          />
        </div>
        <div class="item" v-for="(item, index) in 6 - services[3].btmapList.length" :key="index" />
      </div>
    </div>
    <!-- 饼图部分 -->
    <div class="pie">
      <Pie :pieList="pieList" :tier="tier" />
    </div>
    <!-- 民生占比 -->
    <div class="livelihood">
      <Livelihood />
    </div>
    <!-- 交易信息区 -->
    <div class="summary">
      <DealInfo v-if="!internalNetwork" :sum="sum" />
      <!-- 商户画像 -->
      <merchantsPortrait
        :home_url="home_url"
        :home_url1="home_url1"
        :basicInfo="basicInfo"
        :client="client"
        :patrol="patrol"
        :record="record"
        :deal="deal"
        :data="currJmpInfo"
        v-if="internalNetwork"
      />
    </div>
    <!-- 地图 -->
    <div class="map-bk"></div>
    <div class="map-transform"></div>
    <div class="map">
      <component
        :ref="chartType"
        :is="chartType"
        :topData="topItem"
        :currentTradeName="currentTradeName"
        :riskStatus="riskStatus"
        :terminalStatus="terminalStatus"
        @popup="handlePopup"
        @goDown="handleGoDown"
        @showDeploy="chartType = 'ChartDeploy'"
      />
      <MPopup
        v-show="popupVisible"
        :popup="popup"
        :visible.sync="popupVisible"
        @deployEvent="handleDeployEvent"
      />
    </div>
    <!-- 百度地图 -->
    <BDMap class="map" v-show="isShowBdMap" :lng="lng" :lat="lat" @back="closeBdMap"></BDMap>
    <!-- 地图操作 -->
    <div class="map-operation">
      <div
        class="deal fr flex-center"
        :class="{ active: chartType === 'ChartDeal' }"
        @click="handleChart('ChartDeal')"
      >
        <div class="txt">交易地图</div>
      </div>
      <div
        class="deploy fl flex-center"
        :class="{ active: chartType !== 'ChartDeal' }"
        @click="handleChart('ChartDeploy')"
      >
        <div class="txt">分布地图</div>
      </div>
    </div>
    <!-- 合作视图 -->
    <div class="teamview">
      <TeamView @teamview="handleTeamview" :currentTradeName="currentTradeName" ref="teamviewRef" />
    </div>
    <!-- 实时监控 -->
    <div class="monitor-top-r">
      <MonitorDeal :items="monitorDealList" />
    </div>
    <!-- 监控按钮 active -->
    <div class="monitor-top-l items-monitor flex-center">
      <div
        class="item flex-center"
        :key="index"
        :class="monitorIndex == item.id ? 'active' : ''"
        v-for="(item, index) in monitors"
        @click="monitorClick(item.id)"
      >
        <div class="txt">{{ item.type }}</div>
      </div>
    </div>
    <!-- 服务点视图-->
    <div v-if="monitorIndex === 0" class="monitor-middle">
      <serviceMonitorChart />
    </div>
    <!-- 异常终端视图 -->
    <div v-if="monitorIndex === 1" class="monitor-middle">
      <terminalMonitorChart :riskStatus.sync="terminalStatus" />
    </div>
    <!-- 交易视图 -->
    <div v-if="monitorIndex === 2" class="monitor-middle">
      <transactionMonitorChart />
    </div>
    <!-- 风险预警 -->
    <div v-if="monitorIndex === 3" class="monitor-middle">
      <riskMonitorChart :riskStatus.sync="riskStatus"  />
    </div>
    <!-- 巡检 -->
    <div v-if="monitorIndex === 4" class="monitor-middle">
      <patrolMonitorChart />
    </div>
    <!-- 服务点交易排名 -->
    <div class="monitor-bottom">
      <RankService @topEvent="handleTopEvent" />
    </div>
    <MDialog :dialogVisible.sync="dialogVisible" :dataObj="dialogData" />
  </div>
</template>

<script>
import MButton from '@/components/MButton'
import TeamView from '@/components/TeamView'
import MonitorDeal from '@/components/MonitorDeal'
import Pie from '@/components/Pie'
import Livelihood from '@/components/Livelihood'
import DealInfo from '@/components/DealInfo'
import merchantsPortrait from '@/components/merchantsPortrait'
import RankService from '@/components/RankService'
import serviceMonitorChart from '@/components/serviceMonitorChart'
import terminalMonitorChart from '@/components/terminalMonitorChart'
import transactionMonitorChart from '@/components/transactionMonitorChart'
import riskMonitorChart from '@/components/riskMonitorChart'
import patrolMonitorChart from '@/components/patrolMonitorChart'
import ChartDeploy from '@/components/ChartDeploy'
import ChartDeal from '@/components/ChartDeal'
import ChartTop from '@/components/ChartTop'
import ChartTerminal from '@/components/ChartTerminal'
import ChartRisk from '@/components/ChartRisk'
import MPopup from '@/components/MPopup'
import BDMap from '@/components/BDMap'
import MDialog from '@/components/Dialog'
import * as api from '@/api'
import resizeMixin from '@/components/resize'
import { sortBy } from 'lodash'

export default {
  mixins: [resizeMixin],
  components: {
    MButton,
    TeamView,
    MonitorDeal,
    Pie,
    Livelihood,
    DealInfo,
    merchantsPortrait,
    RankService,
    serviceMonitorChart,
    terminalMonitorChart,
    transactionMonitorChart,
    riskMonitorChart,
    patrolMonitorChart,
    ChartDeploy,
    ChartDeal,
    ChartTop,
    ChartTerminal,
    ChartRisk,
    BDMap,
    MPopup,
    MDialog
  },
  data () {
    return {
      terminalStatus: 0, // 终端
      riskStatus: 0, // 风险
      currentTradeName: '',
      lng: 112.66422891165496,
      lat: 26.880964432436038,
      isShowBdMap: false, // 是否显示百度地图
      internalNetwork: false, // 是否内部网点弹窗
      monitorIndex: 2, // 监控按钮初始化索引
      basicInfo: false, // 基本信息
      client: false, // 客户信息
      patrol: false, // 远程巡检
      record: false, // 巡检记录
      deal: false, // 交易
      chartType: 'ChartDeploy', // 地图类型
      tier: [],
      numberId: '',
      home_url: '',
      home_url1: '',
      popupVisible: false,
      popup: {},
      topItem: {},
      currJmpInfo: {}, // 当前服务点数据
      monitorPageNo: 1,
      pieList: {
        taCountryYearCount: '',
        taCountryCount: ''
      }, // 饼图数据
      sum: {
        netSum: '',
        serverCount: '',
        cardAllSum: '',
        transAllSum: '',
        phoneCustomerCount: '',
        areaCount: '',
        yearCardCount: '',
        yearAddCardMoney: '',
        rate: ''
      },
      services: [],
      dialogVisible: false,
      dialogData: {},
      monitors: [
        // { id: 0, type: '服务点视图' },
        { id: 2, type: '交易视图' },
        { id: 1, type: '终端监测' },
        { id: 3, type: '风险预警' },
        { id: 4, type: '巡检' }
      ],
      monitorDealList: []
    }
  },
  created () {
    const city = {
      cityName: '湖南省'
    }
    // 获取左导数据
    api.getBtList().then(res => {
      const list = res.data || []
      const one = sortBy((list[0].btmapList || []), 'id')
      const arr = one.slice(0, 3).map(e => ({ txt: e.group, isGroup: true }))
      list[0].btmapList = [...arr, ...one]
      this.services = list
    })
    api.getPieData(city).then(res => {
      this.pieList.taCountryYearCount = (res.data[0].taProvinceYearCount / res.data[0].taCountryYearCount).toFixed(2) * 100
      this.pieList.taCountryCount = (res.data[0].taProvinceCount / res.data[0].taCountryCount).toFixed(2) * 100
      console.log(this.pieList)
    })
    this.pieBotton()
  },
  watch: {
    popupVisible (val) {
      if (!val) {
        this.internalNetwork = false
        this.numberId = ''
      }
    },
    chartType () {
      this.currentTradeName = ''
    }
  },
  methods: {
    // 监控按钮弹窗
    monitorClick (index) {
      this.monitorIndex = index
      if (index === 1) {
        this.chartType = 'ChartTerminal'
        this.terminalStatus = 0
      } else if (index === 3) {
        this.chartType = 'ChartRisk'
        this.riskStatus = 0
      } else {
        this.chartType = 'ChartDeploy'
      }
    },
    // 地图切换
    handleChart (type) {
      if (type === 'ChartDeploy') {
        this.tier = []
        this.$nextTick(() => {
          this.$refs.ChartDeploy.goBackInitMap()
          this.$refs.teamviewRef.getData()
          this.pieBotton()
        })
      }
      this.popupVisible = false
      this.chartType = type
    },
    async handlePopup (popup) {
      this.dialogVisible = false
      // console.log('-----popup', popup)
      const mchId = popup.data.jpmMchId
      if (!mchId) {
        console.warn('当前服务点 MchID 不存在')
        return
      }

      try {
        const res = await api.getMchPhotoInfo({ mchId })
        this.dialogVisible = true
        this.dialogData = res.data
      } catch (e) { }
    },
    // 百度地图返回按钮
    closeBdMap () {
      this.isShowBdMap = false
    },
    handleDeployEvent (data, code) {
      this.internalNetwork = true
      // let arr = [81072069, 86617567, 90231567, 93538191, 97778229, 98662928, 99593687, 99901760, 68729821, 68758978, 68988123, 69366959, 69830902, 72018175, 72317666, 71303370, 79658960, 80915399, 79976903, 83026812, 92665315, 93008812, 91368263, 97702962]
      console.warn('--点击部署选项触发--', data.rank)
      if (this.numberId === '') {
        this.numberId = data.id
        // this.home_url = require('../../assets/jingli/' + arr[Math.floor(Math.random() * arr.length)] + '.png')
      }
      this.currJmpInfo.essential = data // 基础信息
      this.home_url1 = 'http://54.0.94.84/jxt_image/' + data.jpmDoorHeadImagePath + ''
      switch (code) {
        case 1:
          this.basicInfo = true // 基本信息
          this.client = false
          this.patrol = false
          this.record = false
          this.deal = false
          let allName = {
            cityName: data.jpmCity,
            areaName: data.jpmArea,
            streetName: data.jpmStreet
          }
          this.lat = Number(data.jpmLon)
          this.lng = Number(data.jpmLat)
          this.isShowBdMap = true
          api.getMchInfoListLog(allName).then(res => {
            if (!data.jpmDoorHeadImagePath) {
              // this.currJmpInfo.essential = res.data[0] // 基础信息
              this.currJmpInfo = Object.assign({}, this.currJmpInfo, { essential: res.data[0] })
              this.home_url1 = 'http://54.0.94.84/jxt_image/' + res.data[0].jpmDoorHeadImagePath + ''
            }
          })
          break
        case 2:
          this.basicInfo = false
          this.patrol = false
          this.record = false
          this.deal = false
          api.getManagerInfo({ 'mchId': data.jpmMchId }).then(res => {
            // this.currJmpInfo.client = res.data[0]
            this.currJmpInfo = Object.assign({}, this.currJmpInfo, { client: res.data[0] })
            this.home_url = 'http://54.0.94.84/kehujingli/' + res.data[0].managerCode + '.png'
            this.client = true // 基本信息 home_url
          })
          // if (Number(this.numberId) === data.id) {
          //   this.home_url = this.home_url
          // } else {
          //   this.home_url = require('../../assets/jingli/' + arr[Math.floor(Math.random() * arr.length)] + '.png')
          // }
          break
        case 3:
          this.client = false
          this.basicInfo = false
          this.patrol = false
          this.record = false
          api.getMchTrans({ 'mchId': data.jpmMchId }).then(res => {
            this.currJmpInfo = Object.assign({}, this.currJmpInfo, { deal: res.data })
            this.deal = true // 交易
          })
          break
        case 4:
          this.patrol = true // 巡检信息
          this.client = false
          this.basicInfo = false
          this.record = false
          this.deal = false
          break
        case 5:
          this.patrol = false // 巡检记录
          this.client = false
          this.basicInfo = false
          this.deal = false
          api.getCheckInfo({ 'mchId': data.jpmMchId }).then(res => {
            this.currJmpInfo = Object.assign({}, this.currJmpInfo, { record: res.data })
            this.record = true
          })
          break
      }
    },
    handleGoDown (e) {
      console.warn('--部署地图下钻触发--')
      console.info(JSON.stringify(e))
      if (e.level !== 1) {
        this.tier.push(e)
      } else {
        this.tier = []
      }
      const { level, name } = e
      // 合作视图仅在市县级更新
      if (level === 2) this.$refs.teamviewRef.getData(1, name)
      if (level === 1) this.$refs.teamviewRef.getData()
      // 饼图下数据
      this.pieBotton(e)
    },
    pieBotton (e) {
      let pieBotton = {
        areaType: 0,
        cityName: e ? e.name : '',
        areaName: '',
        pageIndex: 1
      }
      if (e && e.level === 2) {
        pieBotton.areaType = 1
        pieBotton.pageIndex = 1
        this.pieApi(pieBotton)
      }
      if (e && e.level === 3) {
        pieBotton.cityName = e.allName.split('_')[0]
        pieBotton.areaName = e.allName.split('_')[1]
        pieBotton.pageIndex = 1
        pieBotton.areaType = 2
        this.pieApi(pieBotton)
      }
      if (e && e.level === 1) {
        let pieBotton = {
          areaType: 0,
          cityName: e ? e.name : '',
          areaName: '',
          pageIndex: 1
        }
        this.pieApi(pieBotton)
      }
      if (!e) {
        this.pieApi(pieBotton)
      }
    },
    pieApi ({ areaType, cityName, areaName }) {
      // 饼图下数据
      api.getDataSumNew({
        cityName: areaType === 0 ? '湖南省' : cityName,
        areaName
      }).then(res => {
        this.sum = res.data
      })
    },
    fromData (time) {
      var dateee = new Date(time).toJSON()
      console.log(dateee)
      var date = new Date(+new Date(dateee)).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')

      return date
    },
    // 点击排行榜
    handleTopEvent (item) {
      this.tier = []
      this.popupVisible = false
      this.chartType = 'ChartTop'
      this.topItem = item
      this.$nextTick(() => {
        this.$refs[this.chartType].mapChart()
      })
    },
    handleTeamview (tradeName) {
      this.chartType = 'ChartDeploy'
      this.currentTradeName = tradeName
      this.$nextTick(() => {
        this.$refs[this.chartType].handleFilter(tradeName)
      })
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/style/dashboard.scss';
</style>
