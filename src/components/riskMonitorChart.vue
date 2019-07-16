<template>
  <div class="monitor-chart position-space">
    <div class="title">
      <div class="tab">
        <div class="item active flex-center">风险预警  总数量：97 在全国占比：0.1%</div>
      </div>
    </div>
    <!-- 交易笔数柱状图 -->
    <div class="chart">
      <div id="line-chart"></div>
      <div class="monitor-table">
        <table>
          <thead>
            <tr>
              <td :key="index" v-for="(item, index) in headers">{{item}}</td>
            </tr>
          </thead>
          <tbody>
            <tr :key="index" v-for="(item, index) in bodys">
              <td>{{item.type}}</td>
              <td>{{item.money}}</td>
              <td>{{item.dealStatus}}</td>
            </tr>
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <td :key="index" v-for="(item, index) in headers1">{{item}}</td>
            </tr>
          </thead>
          <tbody>
            <tr :key="index" v-for="(item, index) in bodys">
              <td>{{item.type}}</td>
              <td>{{item.money}}</td>
              <td>{{item.dealStatus}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  data () {
    return {
      headers: ['移机', '高额小频', '异常大频'],
      headers1: ['三个月不动户', '半年不动户', '一年不动户'],
      bodys: [
        { type: '1500个', money: '2500个', dealStatus: '3500个' }
      ]
    }
  },
  methods: {
    chartInit () {
      let myChart = echarts.init(document.getElementById('line-chart'))
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        title: {
          text: '10000',
          left: '20%',
          top: '50%',
          textStyle: {
            color: '#fff',
            fontSize: 12,
            align: 'center'
          }
        },
        graphic: {
          type: 'text',
          left: '21.5%',
          top: '43%',
          style: {
            text: '总数量',
            textAlign: 'center',
            fill: '#fff',
            fontSize: 12
          }
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['30%', '70%'],
            center: ['27%', '50%'],
            label: {
              normal: {
                formatter: '{a|{b}}\n{hr|}\n{per|{d}%}',
                show: true,
                padding: [0, -35],
                rich: {
                  a: {
                    color: '#ffffff',
                    fontSize: 8,
                    lineHeight: 20,
                    align: 'center'
                  },
                  hr: {
                    width: '100%',
                    height: 0,
                    alien: 'center'
                  },
                  per: {
                    color: '#ffffff',
                    align: 'center',
                    fontSize: 8
                  }
                }
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '12'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 25, name: '半年不动户' },
              { value: 25, name: '三个月不动户' },
              { value: 35, name: '高额小频' },
              { value: 15, name: '移机' },
              { value: 35, name: '异常大频' },
              { value: 15, name: '一年不动户' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      myChart.setOption(option, true)
    }
  },
  mounted () {
    this.chartInit()
  }
}
</script>

<style scoped lang="scss">
@import '../assets/style/index.scss';
.monitor-chart {
  .title {
    position: absolute;
    top: 1%;
    left: 20%;
    width: 100%;
    height: 12%;
    font-size: var(--fontSize-12);
    font-weight: bold;
    .tab {
      @extend .flex-center;
      justify-content: start;
      .item {
        width: 46%;
        cursor: pointer;
        &.active {
          background: #00b7b4;
        }
      }
    }
  }
  .chart {
    position: absolute;
    left: 20%;
    bottom: 0;
    height: 86%;
    width: 70%;
    #line-chart, #line-grade, #line-activity {
      height: 100%;
    }
    .monitor-table {
      @include bgImage('../assets/images/tc-bg02.png');
      @include position(52, -500, 52, 2355);
      // background: #2C848B;
      // border-radius: 5px;
      font-size: var(--fontSize-12);
      padding: 2%;
      table {
        border-collapse:collapse;
        text-align: center;
        font-size: var(--fontSize-8);
        thead {
          tr {
            height: 20px;
          }
        }
        tbody{
          tr {
            td {
              width: 21%;
              padding: 8% 0;
              border: 1px solid #00C6D9;
            }
          }
        }
      }
    }
  }
}
</style>
