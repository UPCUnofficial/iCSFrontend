<template>
  <v-app>
    <v-app-bar
        :color="dark?undefined:'white'"
        app
    >
      <div class="d-flex align-center">
        <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="https://i.loli.net/2021/09/19/6NW7c5qKm2hfDkj.png"
            transition="scale-transition"
            width="40"
        />
        <h2 class="shrink mt-1 hidden-sm-and-down">
          iCS Convertor
        </h2>


      </div>

      <v-spacer></v-spacer>

      <v-btn
          href="https://github.com/lx200916/UPC_ics-Public"
          icon

          target="_blank"
      >

        <v-icon style="font-size: 28px;">mdi-github</v-icon>
      </v-btn>
      <v-btn
          href="https://saltedfish.fun/"
          icon

          target="_blank"
      >

        <v-icon style="font-size: 28px;">mdi-fishbowl</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>

        <v-stepper
            v-model="steps"
            vertical
        >
          <v-stepper-step
              :complete="steps > 1"
              step="1"
          >
            上传课表文件
          </v-stepper-step>

          <v-stepper-content step="1">
            <v-card
                v-show="files==null||xlsValid===false"
                :color="dark?'grey darken-3':'grey lighten-5'"
                max-width="344"
                rounded

                style="margin:5px"

            >
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="text-overline mb-4">
                    未上传
                  </div>
                  <v-list-item-title class="text-h5 mb-1">

                  </v-list-item-title>
                  <v-list-item-subtitle>仅支持 <code>教务系统->学期理论课表->我的课表->打印</code> 导出的.xls文件</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar
                    size="80"
                    tile

                >
                  <svg height="48" style=" fill:#000000;" viewBox="0 0 48 48"
                       width="48" x="0px"
                       xmlns="http://www.w3.org/2000/svg"
                       y="0px">
                    <linearGradient id="0ptTM7js1LRNIAHonm3lla_qZ1FibjKOsRJ_gr1" gradientUnits="userSpaceOnUse"
                                    x1="14.242" x2="30.172"
                                    y1="8.358" y2="38.695">
                      <stop offset="0" stop-color="#2aa4f4"></stop>
                      <stop offset="1" stop-color="#007ad9"></stop>
                    </linearGradient>
                    <path
                        d="M48,26c0,6.63-5.37,12-12,12c-1.8,0-24.66,0-26.5,0C4.25,38,0,33.75,0,28.5	c0-4.54,3.18-8.34,7.45-9.28C9.15,12.21,15.46,7,23,7c5.51,0,10.36,2.78,13.24,7.01C42.76,14.13,48,19.45,48,26z"
                        fill="url(#0ptTM7js1LRNIAHonm3lla_qZ1FibjKOsRJ_gr1)"></path>
                    <path
                        d="M21,24.441v7c0,1.105,0.895,2,2,2h2c1.105,0,2-0.895,2-2v-7h2.648c1.336,0,2.006-1.616,1.061-2.561	l-5.295-5.295c-0.781-0.781-2.047-0.781-2.828,0l-5.295,5.295c-0.945,0.945-0.276,2.561,1.061,2.561H21z"
                        opacity=".05"></path>
                    <path
                        d="M21.5,23.941v7.5c0,0.828,0.672,1.5,1.5,1.5h2c0.828,0,1.5-0.672,1.5-1.5v-7.5h3.021	c0.938,0,1.408-1.134,0.745-1.798l-5.129-5.13c-0.627-0.627-1.644-0.627-2.271,0l-5.129,5.13c-0.663,0.663-0.194,1.798,0.745,1.798	H21.5z"
                        opacity=".07"></path>
                    <path
                        d="M18.607,23.441H22v8c0,0.552,0.448,1,1,1h2c0.552,0,1-0.448,1-1v-8h3.393	c0.54,0,0.81-0.653,0.428-1.034l-4.964-4.964c-0.473-0.473-1.241-0.473-1.714,0l-4.964,4.964	C17.797,22.788,18.067,23.441,18.607,23.441z"
                        fill="#fff"></path>
                  </svg>
                </v-list-item-avatar>
              </v-list-item>

              <v-card-actions>
                <v-btn color="orange lighten-2" outlined
                       text
                       @click="upload"
                >
                  上传文件
                </v-btn>
                <v-file-input
                    id="xls_upload"
                    v-model="files"
                    accept=".xls"
                    hide-input
                    label="上传课表"
                    style="display: none"
                    @change="parseXLS"


                >

                </v-file-input>
              </v-card-actions>
            </v-card>
            <v-card
                v-show="xlsValid"
                :color="dark?'grey darken-3':'grey lighten-5'"
                max-width="344"
                rounded
                style="padding-bottom: 10px;padding-top: 10px"
            >

              <v-list-item three-line>
                <v-list-item-content>
                  <p class="overline">学生课表</p>

                  <p class="text-h5 text--primary">
                    {{ info.name }}
                  </p>
                  <p class="caption font-weight-bold text--primary">
                    {{ info.major }}
                  </p>
                  <p class="caption font-weight-bold text--primary">
                    {{ info.class }}
                  </p>
                  <p class="caption  text--lighten-3">{{ info.date }}</p>
                </v-list-item-content>
                <v-list-item-avatar
                    size="80"
                    tile

                >
                  <svg height="48px" viewBox="0 0 48 48" width="48px" xmlns="http://www.w3.org/2000/svg">
                    <rect fill="#21a366" height="9" width="16" x="28" y="15"/>
                    <path d="M44,24H12v16c0,1.105,0.895,2,2,2h28c1.105,0,2-0.895,2-2V24z" fill="#185c37"/>
                    <rect fill="#107c42" height="9" width="16" x="28" y="24"/>
                    <rect fill="#3fa071" height="9" width="16" x="12" y="15"/>
                    <path d="M42,6H28v9h16V8C44,6.895,43.105,6,42,6z" fill="#33c481"/>
                    <path d="M14,6h14v9H12V8C12,6.895,12.895,6,14,6z" fill="#21a366"/>
                    <path
                        d="M22.319,13H12v24h10.319C24.352,37,26,35.352,26,33.319V16.681C26,14.648,24.352,13,22.319,13z"
                        opacity=".05"/>
                    <path
                        d="M22.213,36H12V13.333h10.213c1.724,0,3.121,1.397,3.121,3.121v16.425	C25.333,34.603,23.936,36,22.213,36z"
                        opacity=".07"/>
                    <path
                        d="M22.106,35H12V13.667h10.106c1.414,0,2.56,1.146,2.56,2.56V32.44C24.667,33.854,23.52,35,22.106,35z"
                        opacity=".09"/>
                    <linearGradient id="flEJnwg7q~uKUdkX0KCyBa" gradientUnits="userSpaceOnUse" x1="4.725" x2="23.055"
                                    y1="14.725"
                                    y2="33.055">
                      <stop offset="0" stop-color="#18884f"/>
                      <stop offset="1" stop-color="#0b6731"/>
                    </linearGradient>
                    <path
                        d="M22,34H6c-1.105,0-2-0.895-2-2V16c0-1.105,0.895-2,2-2h16c1.105,0,2,0.895,2,2v16	C24,33.105,23.105,34,22,34z"
                        fill="url(#flEJnwg7q~uKUdkX0KCyBa)"/>
                    <path
                        d="M9.807,19h2.386l1.936,3.754L16.175,19h2.229l-3.071,5l3.141,5h-2.351l-2.11-3.93L11.912,29H9.526	l3.193-5.018L9.807,19z"
                        fill="#fff"/>
                  </svg>
                </v-list-item-avatar>
              </v-list-item>
              <v-card-actions>
                <v-btn
                    color="teal accent-4"
                    text
                    @click="upload"

                >
                  重新上传
                </v-btn>
                <v-btn
                    text
                    @click="reveal=true"

                >
                  显示错误
                </v-btn>
              </v-card-actions>


              <v-expand-transition>
                <v-card
                    v-if="reveal"

                    class="transition-fast-in-fast-out v-card--reveal"
                    style="height: 100%;position: absolute;"
                >
                  <v-card-text class="pb-0">
                    <p class="text-h6 text--primary">
                      Oops!信息解析错误?
                    </p>
                    <p>
                      我们采用<code>正则表达式</code>的方式解析XLS文件中的文本内容,并呈现信息.因此如果文件格式有更新,可能会导致解析失败.
                    </p>
                    <p>
                      如果发现信息有误或'暂无',说明文件格式已更新.请到<a href="https://github.com/lx200916/UPC_ics-Public/issues">Github
                      Issue</a>区反馈.
                    </p>
                  </v-card-text>
                  <v-card-actions class="pt-0">
                    <v-btn
                        color="teal accent-4"
                        text
                        @click="reveal = false"
                    >
                      Close
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-expand-transition>
            </v-card>

            <v-btn
                v-if="files!=null"
                color="primary"
                style="margin-top: 20px;"
                @click="steps = 2"
            >
              下一步
            </v-btn>

          </v-stepper-content>

          <v-stepper-step
              :complete="steps > 2"
              step="2"
          >
            学期开始日

          </v-stepper-step>

          <v-stepper-content step="2">
            <p>为了确保正常解析,请先确认目标学期与学期开始周的周一日期.</p>
            <span class="text-body-1">本学期为:</span>
            <v-select v-model="schoolTerm"

                      :hint="`${schoolTerm.date}`"
                      :items="schoolTerms"
                      filled
                      item-text="name"
                      item-value="date"
                      label="选取"
                      style="max-width:344px"
                      persistent-hint
                      return-object

            ></v-select>
            <v-row v-if="schoolTerm.name=='自定义'">
              <v-col>
                <v-text-field
                    v-model="startDate.year"
                    filled
                    label="年份"
                    placeholder="如2020"
                    @change="concatDate"

                ></v-text-field>

              </v-col>
              <v-col>
                <v-text-field
                    v-model="startDate.month"
                    filled
                    label="月份"
                    placeholder="如09"
                    @change="concatDate"

                ></v-text-field>

              </v-col>
              <v-col>
                <v-text-field
                    v-model="startDate.day"
                    filled
                    label="日期"
                    placeholder="如01"
                    @change="concatDate"

                ></v-text-field>

              </v-col>
            </v-row>
            <p class="text--primary text-body-1">
              本学期开始于 <code>{{ schoolTerm.date }}</code>

            </p>

            <v-btn
                :loading="isLoading"
                color="primary"
                @click="parseEvent"

            >
              开始解析
            </v-btn>
            <v-btn text
                   @click="steps=steps-1">
              上一步
            </v-btn>
          </v-stepper-content>

          <v-stepper-step
              :complete="steps > 3"
              step="3"
          >
            预览课表
          </v-stepper-step>

          <v-stepper-content step="3">
            <span class="overline">
              点击日历块可查看详情,上下滑动可展示更多时间.
            </span>
            <v-sheet
                class="d-flex align-center"
                height="54"
                tile
            >
              <v-btn
                  class="ma-2"
                  icon
                  @click="$refs.calendar.prev()"
              >
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
              <v-spacer></v-spacer>

              <div class="text-center align-center  font-weight-bold" style="vertical-align: middle">{{ now }} -
                {{ getWeekDate }}
              </div>
              <v-spacer></v-spacer>
              <v-btn
                  class="ma-2"
                  icon
                  @click="$refs.calendar.next()"
              >
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-sheet>
            <v-sheet height="600" style="margin-bottom: 30px;">
              <v-calendar
                  ref="calendar"
                  v-model="now"
                  :event-overlap-threshold="30"
                  :events="events"
                  :type="$vuetify.breakpoint.mobile?'4day':'week'"
                  :weekdays="[1, 2, 3, 4, 5, 6, 0]"
                  @click:event="showEvent"
              ></v-calendar>
            </v-sheet>
            <v-btn
                color="primary"
                @click="steps = 4"
            >
              下一步
            </v-btn>
            <v-btn text @click="steps=steps-1">
              上一步
            </v-btn>
          </v-stepper-content>

          <v-stepper-step step="4">
            设置提醒
          </v-stepper-step>
          <v-stepper-content step="4">
               <span class="overline">
              在移动端导入时可设置课前提醒.提醒样式与是否生效取决于具体日历应用.
            </span>
            <v-select
                v-model="reminder"
                :items="reminders" filled
                style="max-width:344px"

                label="课前提醒"
            ></v-select>
            <v-btn
                color="primary"
                @click="geniCS"
            >
              生成
            </v-btn>
            <v-btn text
                   @click="steps=steps-1">
              上一步
            </v-btn>
          </v-stepper-content>
        </v-stepper>
      </v-container>
      <v-dialog
          v-model="details"
          max-width="500px"
      >
        <v-card>
          <v-card-title>
            {{ detailInfo.name }}
          </v-card-title>
          <div class="ml-4">
            <v-chip
                class="ma-2 v-chip--active"

                color="primary--text"
                label
            >
              <v-icon left>
                mdi-account-circle-outline
              </v-icon>
              {{ detailInfo.teacher }}
            </v-chip>
            <v-chip
                class="ma-2 v-chip--active"

                color="deep-purple--text accent-4"
                label
            >
              <v-icon left>
                mdi-map-marker-outline
              </v-icon>
              {{ detailInfo.position }}
            </v-chip>
            <v-divider class="mx-4 mb-2 ma-2"></v-divider>
            <div class="mx-2">
            <span class="text-body-1">
              上课周次
            </span>
              <v-chip-group
                  multiple
              >
                <v-chip
                    v-for="tag in detailInfo.date.split(',')"
                    :key="tag"
                    class="primary--text v-chip--active"
                >
                  第{{ tag }}周
                </v-chip>
              </v-chip-group>

              <p class="text-body-1 mb-1 ">
                上课节次
              </p>
              <v-chip
                  class="v-chip--active"

                  color="teal--text accent-4"
                  label
              >
                <v-icon left>
                  mdi-clock-outline
                </v-icon>
                {{ detailInfo.time }}
              </v-chip>
            </div>
          </div>
          <v-card-text></v-card-text>
        </v-card>
      </v-dialog>
    </v-main>
    <v-footer app
              padless
    >
      <v-col
          class="text-center"
          cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>SaltedFish @UPC</strong>
      </v-col>
    </v-footer>
    <v-snackbar
        v-model="snackbar"
    >
      生成完成!请检查下载.

      <template v-slot:action="{ attrs }">
        <v-btn
            color="pink"
            text
            v-bind="attrs"
            @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>

</template>

<script>
import XLSX from 'xlsx'
import schoolTerm from './assets/conf_schoolTerms.json'
import {iCSExport, Parser} from "@/plugins/parser";

const openDownloadDialog = (url, fileName) => {
  if (typeof url === 'object' && url instanceof Blob) {
    url = URL.createObjectURL(url); // 创建blob地址
  }
  const aLink = document.createElement('a');
  aLink.href = url;
  aLink.download = fileName;
  aLink.click();
};
export default {
  name: 'App',


  created() {
    this.setTheme()
    this.schoolTerm = this.schoolTerms[0]
    // console.log(icsString)
  }, computed: {
    getWeekDate: function () {
      console.log(this.now)
      let date = new Date(this.now)
      date.setDate(date.getDate() + (this.$vuetify.breakpoint.mobile ? 3 : 6))
      console.log(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate())
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    }
  },
  methods: {
    geniCS() {
      try {
        this.isLoading = true
        let content = iCSExport(this.shortEvents, this.reminder)
        let blob = new Blob([content], {
          type: "text/calendar;charset=utf-8"
        });
        this.isLoading = false

        openDownloadDialog(blob, 'class.ics')


      } catch (e) {
        console.log(e)
        this.isLoading = false
      }

    },
    showEvent({event}) {
      this.detailInfo = event
      this.detailInfo['date'] = this.detailInfo['date'].replace("(周)", "")
      this.details = true
    },
    setTheme() {
      const matchMedia = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : false
      if (!matchMedia) return
      this.$vuetify.theme.dark = matchMedia.matches
      this.dark = matchMedia.matches
      matchMedia.onchange = ({matches}) => {
        this.$vuetify.theme.dark = matches
        this.dark = matches

      }
    },
    upload() {
      this.xlsValid = false
      document.getElementById('xls_upload').click()
    },
    parseInfo(a1, a2) {

      let res1 = /）\s*(\S+)\s*学生/.exec(a1.v)
      let res2 = /学年学期：\s*(\S+)\s*班级：\s*(\S+)\s*所属班级：\s*(\S+)\s*学院：\s*(\S+)\s*/.exec(a2.v)
      if (res1 != null) {
        this.info.name = res1[1]
        this.xlsValid = true
      }
      if (res2 != null) {
        this.info.date = res2[1]
        this.info.class = res2[2]
        this.info.major = res2[4]
        this.xlsValid = true

      }


    },
    parseEvent() {

      this.isLoading = true
      try {
        this.now = this.schoolTerm.date
        let praseRes = Parser(this.sheets, new Date(this.schoolTerm.date))
        this.events = praseRes[0]
        this.shortEvents = praseRes[1]
        this.isLoading = false

        this.steps++
        this.$refs.calendar.scrollToTime('07:58')

      } catch (e) {
        this.isLoading = false
        console.log(e)
      }
    },
    parseXLS() {
      if (this.files === null)
        return
      let reader = new FileReader();
      let that = this
      reader.onload = function (e) {
        let data = new Uint8Array(e.target.result);
        let workbook = XLSX.read(data, {type: 'array'});
        that.sheets = workbook.Sheets[workbook.SheetNames[0]]
        console.log(that.sheets)
        that.parseInfo(that.sheets['A1'], that.sheets['A2'],)
        /* DO SOMETHING WITH workbook HERE */
      };
      reader.readAsArrayBuffer(this.files)

    },
    concatDate() {
      this.schoolTerm.date = this.startDate.year + '-' + this.startDate.month.padStart(2, '0') + '-' + this.startDate.day.padStart(2, "0")
    }
  },

  data: () => ({
    dark: false,
    steps: 1,
    files: null, sheets: null, info: {name: "暂无", major: "暂无", class: "暂无", date: "暂无"}, xlsValid: false, reveal: false,
    events: [], schoolTerm: null, schoolTerms: schoolTerm, startDate: {
      year: '', month: '', day: ''
    }, isLoading: false, now: '', details: false, detailInfo: {
      name: "大学英语(4-4)",
      teacher: '朱荫成(讲师（高校）)',
      date: '2-17',
      time: '[03-04-05节]',
      position: '南教303'

    }, shortEvents: [], reminder: '', reminders: [
      {text: '无提醒', value: ''},
      {text: '提前10分钟', value: '-PT10M'},
      {text: '提前30分钟', value: '-PT30M'},
      {text: '提前1小时', value: '-PT1H'},
      {text: '提前2小时', value: '-PT2H'},
      {text: '提前1天', value: '-P1D'},

    ], snackbar: false,
    //
  }),
};
</script>
<style>
::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}

.v-list--three-line .v-list-item .v-list-item__subtitle, .v-list-item--three-line .v-list-item__subtitle {
  -webkit-line-clamp: 5 !important;
}

.v-calendar .v-event-timed {
  white-space: pre-wrap !important;
}
</style>