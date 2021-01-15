<template>
  <div class="banner" :class="[isshowmini?'widthMini':'']">
    <div class="row" :class="[isshowmini?'widthMini':'']">
      <div class="logo">
        <div>LDS2000</div>
        <div>
          <ul>
            <li>{{language.bannerlab1}}</li>
            <li>{{language.bannerlab2}}</li>
          </ul>
        </div>
      </div>
      <div class="vuemenu" v-show="!isshowmini"
        :class="[isshowmini?'animated bounceOutRight':'',isshowmini==false?'animated bounceInRight':'']">
        <div>
          <ul>
            <li v-for="(item,key) in items" v-show="item.enable" @click="menuclk(item.name)" :key="key"
              :class="[(item.name==selectitem)?'selectitem':'']">
              <a v-if="item.name=='help'" :href="[item.name=='help'?helpurl:'']" target="_blank"><i class="fas "
                  :class="item.icon"></i>
                <div class="vmenuP">{{item.label}}</div>
              </a>
              <a v-else><i class="fas " :class="item.icon"></i>
                <div class="vmenuP">{{item.label}}</div>
              </a>
            </li>
          </ul>
        </div>
        <div class="changewindows">{{language.serverlabel}}:{{servertime}}</div>
      </div>
    </div>
    <!-- <div class="trangle" @click="isshowmini=!isshowmini"
      :class="[isshowmini?'animated bounceInLeft':'',isshowmini==false?'animated bounceOutLeft':'']"></div>
  </div> -->
  <div class="trangle" @click="trangle"
      :class="[isshowmini?'animated bounceInLeft':'',isshowmini==false?'animated bounceOutLeft':'']"></div>
  </div>
</template>

<script>
  import {
    Badge
  } from 'iview';
  import date from '@/mixin/date'
  export default {
    data() {
      return {
        items: [{
            name: 'dispatchFunction',
            label: '调度功能',
            icon: 'fa-headphones',
            enable: true
          },
          {
            name: 'servicemanager',
            label: '勤务管理',
            icon: 'fa-address-card',
            enable: true
          },
          {
            name: 'options',
            label: '参数设置',
            icon: 'fa-cogs',
            enable: true
          },
          {
            name: 'help',
            label: '帮助',
            icon: 'fa-question-circle',
            enable: true
          },
          {
            name: 'exit',
            label: '结束系统',
            icon: 'fa-door-open',
            enable: true
          },
        ],
        selectitem: 'dispatchFunction',
        new_smscount: 0,
        username: 'admin',
        date: new Date(1571984937504),
        helpurl: 'eTRA GIS_HELP/help.html',
        language: {
          bannerlab1: '单兵和车辆定位',
          bannerlab2: '指挥调度系统',
          serverlabel: '服务器时间'
        },
        SMSEnable: true,
        DSSEnable: true,
      }
    },
    props: ['isshowmini'],
    mixins: [date],
    components: {
      Badge,
    },
    methods: {
      trangle(){
        this.$emit('trangle')
      },
      menuclk: function (val) {

        switch (val) {
          case "dispatchFunction":
          case "servicemanager":
            if (val == this.selectitem) return;
            break;

          default:
            break;
        }
        this.selectitem = val;
        this.$emit('Bannerselectedchange', val);
      },
      updatetime: function (value) {
        var crtTime = new Date(value);
        return dateFtt("yyyy-MM-dd hh:mm", crtTime);
      },
      view_sms: function () {
        openwindows('sms_sjx');
        this.new_smscount = 0;
      },
      newsmsIn: function (issi, smstype, msg, id, isconsume) {
        if (smstype == "0") {
          this.new_smscount += 1;
        }
      },
      updateuseprameters() {
        this.username = useprameters.usename;
        this.date = new Date(parseInt(useprameters.servertime));

        if (useprameters.DSSEnable == '0') { //隐藏辅助决策
          this.$set(this.items[1], 'enable', false);
          this.DSSEnable = false;
        }
        if (useprameters.SMSEnable == '0') {
          this.SMSEnable = false
        }
        if (useprameters.SystemType == "2") {
          this.helpurl = "eTRA GIS_HELP_SEA/help.html";
        } else {
          if (useprameters.defaultLanguage == "zh-CN") {
            this.helpurl = "eTRA GIS_HELP/help.html";
          } else {
            this.helpurl = "eTRA GIS_HELP_En/help.html";
          }
        }
      },
      setlanguage() {
        this.items.splice(0);
        let ddgn = GetTextByName("Schedulingfunction");
        let qwgl = GetTextByName("Lang_qwgl");
        let settings = GetTextByName("Parametersetting");
        let help = GetTextByName("help");
        let exit = GetTextByName("loginout");
        let serverlabel = GetTextByName("servertimeLabel");
        this.items.push({
          name: 'dispatchFunction',
          label: ddgn,
          icon: 'fa-headphones',
          enable: true
        }, {
          name: 'servicemanager',
          label: qwgl,
          icon: 'fa-address-card',
          enable: this.DSSEnable
        }, {
          name: 'options',
          label: settings,
          icon: 'fa-cogs',
          enable: true
        }, {
          name: 'help',
          label: help,
          icon: 'fa-question-circle',
          enable: true
        }, {
          name: 'exit',
          label: exit,
          icon: 'fa-door-open',
          enable: true
        });
        this.language = {
          bannerlab1: '',
          bannerlab2: '',
          serverlabel: serverlabel
        }
      },
    },
    mounted() {
      let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
      this.timer = setInterval(() => {
        _this.date = new Date(_this.date).getTime() + 60000; // 修改数据date
        _this.date = new Date(_this.date);
      }, 60000)

    },
    beforeDestroy() {
      if (this.timer) {
        clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
      }
    },
    computed: {
      servertime: function () {
        return this.dateFtt("yyyy-MM-dd hh:mm", this.date);
      },

    }
  }

</script>


<style scoped>
.widthMini{
  width: auto;
}
html,body {
  margin: 0;
  padding: 0;

}

.trangle {
  position: absolute;
  width: 0px;
  height: 0px;
  border-left: 29px solid #164B77;
  border-top: 29px solid transparent;
  border-bottom: 29px solid transparent;
  left: 240px;
  top: 0px;
  z-index: -1;
}

.changewindows {
  position: absolute;
  top: 3px;
  right: 10px;

  height: 22px;
  font-size: 16px;
  line-height: 22px;

  cursor: pointer;
}

.banner {
  height: 58px;
}

h1,
h2 {
  font-weight: normal;
}

.row {
  height: 58px;

  color: #ffffff;
}

.vuemenu {
  background-color: #164B77;
  height: 58px;
}
.vmenuP{
  position: relative;
  width: 80px;
  height: 20px;
  margin-top: 0px;
  top:0px;
}
.row a {
  color: #ffffff;
}

.row>div:nth-child(1) {
  float: left;
  width: 240px;
  height: 58px;
  line-height: 58px;
  font-size: 18px;
  background-color: #042657;
}

.row>div:nth-child(2) {
  float: left;
  width: calc(100% - 240px);
}

.row>div:nth-child(2) svg {
  display: block !important;
  margin-left: 28px;
  margin-top: 10px;
  font-size: 24px;
}

.row>div:nth-child(2) div div {

  margin-top: -15px;
  width: 80px;
  text-align: center;
}

.row>div:nth-child(2)>div:nth-child(2) {
  float: right;
  width: 220px;
  margin-top: 0px;
}

ul {
  list-style-type: none;
  padding: 0;
  height: 58px;
}

.row>div:nth-child(2) li {

  margin: 0 0px;
  height: 100%;
  float: left;
  list-style-type: none;
  position: relative;
  display: list-item;
  width: 80px;
  vertical-align: middle;
  text-align: center;
  line-height: 58px;
  transition: width 0.2s, background 0.2s, 0.2s linear .2s;
  /*反向过渡*/
}

a {
  color: #42b983;
}

.row>div:nth-child(2)>div:nth-child(2) li {
  margin: 0 0px;
  float: left;
  list-style-type: none;
  display: list-item;
}

.row>div:nth-child(2)>div:nth-child(2) li:nth-child(-n+2) {
  width: 40px;
  margin-top: 25px;
  font-size: 22px;
}

.row>div:nth-child(2)>div:nth-child(2) li:nth-child(3) {
  margin-top: -45px;
  font-size: 14px;
  margin-left: 80px;
}

.selectitem {
  background-color: #2B81BE;
  transition: width, background, 0.2s linear 0.2s;
}

.logo div:nth-child(1) {
  width: 100px;
  float: left;
  font-size: 20px;
}

.logo div:nth-child(2) {
  width: calc(100% - 100px);
  float: left;
  font-size: 16px;
  text-align: right;
  text-align: justify;
}

.logo div:nth-child(2) li {
  height: 16px;

  text-align: justify;
}

.logo div:nth-child(2) ul {
  margin-top: -8px;
  margin-left: -2px;
}

.logo div:nth-child(2) li:nth-child(2) {
  letter-spacing: 3px
}

.sms {
  width: 60px !important;
  z-index: 11 !important;

}

</style><style>.banner .ivu-badge-count {
  top: 0px !important;
}

</style>
