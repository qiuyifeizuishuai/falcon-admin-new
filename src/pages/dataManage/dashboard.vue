<template>
    <div>
        <div style="margin-bottom: 20px">
            <el-select v-model="schoolValue" @change="schoolChange" filterable placeholder="请选择学校">
                <el-option
                    v-for="item in schoolLists"
                    :key="item.uuid"
                    :label="item.schoolName"
                    :value="item.uuid">
                </el-option>
            </el-select>
        </div>
        <div v-if="schoolValue">
            <div class="row">
                <div class="col-xl-3 col-md-6">
                    <div class="widget widget-stats bg-blue">
                        <div class="stats-icon"><i class="fa fa-users"></i></div>
                        <div class="stats-info">
                            <h4>学生人数</h4>
                            <p>{{topData.studentTotal}} 名</p>
                        </div>
                        <div class="stats-link">
                            <a>
                                <div class="flex-bt">
                                    <div>
                                        <span>今日新增学生 {{topData.todayInsertStudentTotal}}人 </span>
                                    </div>
                                    <div @click="go('/studentManage')">
                                        <span class="f-small">查看更多</span> <i class="fa fa-arrow-alt-circle-right"></i>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-md-6">
                    <div class="widget widget-stats bg-indigo">
                        <div class="stats-icon"><i class="fa fa-users"></i></div>
                        <div class="stats-info">
                            <h4>教师人数</h4>
                            <p>{{topData.teacherTotal}} 名</p>
                        </div>
                        <div class="stats-link">
                            <a>
                                <div class="flex-bt">
                                    <div><span>今日新增老师 {{topData.todayInsertTeacherTotal}}人</span>
                                    </div>
                                    <div @click="go('/teacherManage')">
                                        <span class="f-small">查看更多</span> <i class="fa fa-arrow-alt-circle-right"></i>
                                    </div>
                                </div>

                            </a>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-md-6">
                    <div class="widget widget-stats bg-grey-darker">
                        <div class="stats-icon"><i class="fa fa-desktop"></i></div>
                        <div class="stats-info">
                            <h4>国考及认定课程</h4>
                            <p>{{topData.disElectiveTotal}} 门</p>
                        </div>
                        <div class="stats-link">
                            <a>
                                <div class="flex-bt">
                                    <div>
                                        <span>学习人数 {{topData.disElectivePeopleNumber}}人 </span>
                                    </div>
                                    <div @click="go('/professionalClass')"><span class="f-small">查看更多</span> <i
                                        class="fa fa-arrow-alt-circle-right"></i>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-md-6">
                    <div class="widget widget-stats bg-black-lighter">
                        <div class="stats-icon"><i class="fa fa-desktop"></i></div>
                        <div class="stats-info">
                            <h4>选修课</h4>
                            <p>{{topData.electiveTotal}} 门</p>
                        </div>
                        <div class="stats-link">
                            <a>
                                <div class="flex-bt">
                                    <div>
                                        <span>学习人数 {{topData.electivePeopleNumber}} </span>
                                    </div>
                                    <div @click="go('/takeClass')">
                                        <span class="f-small">查看更多</span> <i class="fa fa-arrow-alt-circle-right"></i>

                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="center">
                <el-tabs v-model="activeName" type="border-card">

                    <el-tab-pane name="major">
                        <span slot="label"><i class="el-icon-s-custom"></i> 专业人数</span>
                        <div class="row">
                            <div class="col-xl-8">
                                <!-- begin panel -->
                                <panel title="专业趋势（人）">
                                    <BarChart ref="chart" :data="middleData.barChartPeople.data"
                                              :options="middleData.barChartPeople.options"></BarChart>
                                </panel>
                                <!-- end panel -->
                            </div>
                            <div class="col-xl-4">
                                <panel title="专业人数排名（人）" bodyClass="p-t-0">
                                    <div class="table-responsive">
                                        <table class="table table-valign-middle">
                                            <thead>
                                            <tr>
                                                <th>专业</th>
                                                <th>人数</th>
                                                <th>排名</th>
                                            </tr>
                                            </thead>
                                            <tbody>

                                            <tr v-for="(item, index) in middleData.sortPeople" :key="index">
                                                <td v-if="index<=12"><label class="label label-default">{{item.majorName}}</label>
                                                </td>
                                                <td v-if="index<=12">{{item.peopleNumber}}人</td>
                                                <td v-if="index<=12">{{index+1}}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </panel>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane name="apply">
                        <span slot="label"><i class="el-icon-data-line"></i> 报名情况</span>
                        <el-date-picker
                            style="margin-bottom: 10px"
                            :clearable="false"
                            v-model="middleData.dateValue"
                            type="daterange"
                            align="right"
                            @change="dateChange"
                            unlink-panels
                            value-format="yyyy/MM/dd"
                            range-separator="-"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions"
                        >
                        </el-date-picker>
                        <div class="row">
                            <div class="col-xl-8">
                                <panel title="报考费用（元）">
                                    <BarChart ref="chart1" :data="middleData.barChartMoney.data"
                                              :options="middleData.barChartMoney.options"></BarChart>
                                </panel>
                            </div>
                            <div class="col-xl-4">
                                <panel title="报名费用排名（元）" bodyClass="p-t-0">
                                    <div class="table-responsive">
                                        <table class="table table-valign-middle">
                                            <thead>
                                            <tr>
                                                <th>排名</th>
                                                <th>专业</th>
                                                <th>费用</th>
                                            </tr>
                                            </thead>
                                            <tbody>

                                            <tr v-for="(item, index) in middleData.sortMoney" :key="index">
                                                <td v-if="index<=12">{{index+1}}</td>
                                                <td v-if="index<=12"><label class="label label-default">{{item.majorName}}</label>
                                                </td>
                                                <td v-if="index<=12">¥ {{item.signUpCost}}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </panel>
                            </div>
                        </div>
                    </el-tab-pane>

                </el-tabs>
            </div>
            <panel style="margin-top: 27px" title="专业报表" bodyClass="p-t-0" v-if="bottomData.length>0">
                <div style="overflow: scroll;display: flex;padding: 5px 2px">
                    <div class="pie-class" @click="checkViewPieDetails(item)"
                         v-for="(item, index) in bottomData" :key="index" :class="item.majorUuid==activeUuid?'active-pie':''">
                        <span class="f-s-18">{{item.majorName}}</span>
                        <div class="flex-end m-t-0">
                            <div>
                                <div><span style="color: #909399">考试通过率</span></div>
                                <span class="f-s-26 font-weight-bold">{{item.passRate}}%</span>
                            </div>
                            <div style="padding: 0 0 0 45px">
                                <el-progress :show-text="true" type="circle" width="80" :stroke-width="12" :percentage="item.passRate"></el-progress>
                            </div>
                        </div>
                    </div>
                </div>
                <line-chart style="margin-top: 15px" :data="lineChart.data" ref="lineAll" :options="lineChart.options" class="height-sm"></line-chart>
            </panel>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from "vuex";
    import panel from '@/plugins/panel/Panel.vue';
    import BarChart from '@/components/vue-chartjs/BarChart';
    import LineChart from '@/components/vue-chartjs/LineChart';

    export default {
        components: {
            panel,
            LineChart,
            BarChart
        },
        data() {
            let now = new Date();
            let y = now.getFullYear();
            let m = now.getMonth() + 1;
            let d = now.getDate();
            let nowDay = y + '/' + m + '/' + d;
            return {
                bottomData: [],
                activeUuid: '',
                activeTitleName: '',
                lineChart: {
                    data: {
                        labels: [],
                        datasets: [{
                            label: '考试及格率',
                            backgroundColor: 'rgba(52, 143, 226, 0.2)',
                            borderColor: '#348fe2',
                            pointBackgroundColor: '#348fe2',
                            pointRadius: 2,
                            borderWidth: 2,
                            data: []
                        }, {
                            label: '报考人数',
                            backgroundColor: 'rgba(45, 53, 60, 0.2)',
                            borderColor: '#2d353c',
                            pointBackgroundColor: '#2d353c',
                            pointRadius: 2,
                            borderWidth: 2,
                            data: []
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        hover: {
                            mode: 'nearest',
                            intersect: true
                        },
                        tooltips: {
                            mode: 'index',
                            intersect: false,
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                    min: 0
                                }
                            }]
                        }
                    }
                },
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                schoolValue: null,
                activeName: 'major',
                topData: {
                    todayInsertTeacherTotal: 0, // 老师新增人数今日
                    todayInsertStudentTotal: 0, // 学生新增人数今日
                    teacherTotal: 0, // 老师总数
                    studentTotal: 0, // 学生总数
                    electiveTotal: 0, // 选修课课程数
                    electivePeopleNumber: 0, // 选修课人数
                    disElectiveTotal: 0, // 非选修课课程数
                    disElectivePeopleNumber: 0 // 非修课人数
                },
                middleData: {
                    dateValue: ['2020/01/01', nowDay],
                    barChartPeople: {
                        data: {
                            labels: [],
                            datasets: [{
                                label: '专业人数',
                                borderWidth: 2,
                                borderColor: '#727cb6',
                                backgroundColor: 'rgba(114, 124, 182, 0.3)',
                                data: []
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            hover: {
                                mode: 'nearest',
                                intersect: true
                            },
                            tooltips: {
                                mode: 'index',
                                intersect: false,
                            },
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true,
                                        min: 0
                                    }
                                }]
                            }
                        }
                    },
                    barChartMoney: {
                        data: {
                            labels: [],
                            datasets: [{
                                label: '报名费用',
                                borderWidth: 2,
                                borderColor: '#2d353c',
                                backgroundColor: 'rgba(45, 53, 60, 0.3)',
                                data: []
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            hover: {
                                mode: 'nearest',
                                intersect: true
                            },
                            tooltips: {
                                mode: 'index',
                                intersect: false,
                            },
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true,
                                        min: 0
                                    }
                                }]
                            }
                        }
                    },
                    sortPeople: [],
                    sortMoney: []
                }
            };
        },
        created() {
            this.$emit('getMeteData', this.$Bre.breadCrumbs([0, 2]));
        },
        mounted() {
            this.getSchoolListAction();
        },
        watch: {
            schoolLists() {
                if (this.schoolLists.length > 0) {
                    this.schoolValue = this.schoolLists[0].uuid;
                } else {
                    this.$message.warning('暂无学院所以无法查看面板');
                }
            },
            schoolValue() {
                this.getDashboardTop(this.schoolValue);
                this.dashboardMiddlePeopleNumber(this.schoolValue);
                this.dashboardMiddleMoney(this.schoolValue);
                this.dashboardBottomPieList(this.schoolValue);
            }
        },
        computed: {
            // 院校,专业,课程
            ...mapState("school", {
                schoolLists: (state) => state.schoolLists,
            }),
        },
        methods: {
            ...mapActions("school", [
                "getSchoolListAction",
            ]),
            checkViewPieDetails(item) {
                this.activeUuid = item.majorUuid;
                this.dashboardLinePeople(item.majorUuid);
            },
            schoolChange(val) {
                console.log(val);
            },
            dashboardLinePeople(majorUuid) {
                this.$api.dashboard.dashboardLinePeople(majorUuid).then(res => {
                    this.lineChart.data.labels=[];
                    this.lineChart.data.datasets[0].data = [];
                    this.lineChart.data.datasets[1].data = [];
                    res.data.map(i=>{
                        this.lineChart.data.labels.push(i.examName);
                        this.lineChart.data.datasets[0].data.push(i.passTotal);
                        this.lineChart.data.datasets[1].data.push(i.testTotal);
                    });
                    this.$refs.lineAll.renderChart(this.lineChart.data, this.lineChart.options);
                });
            },
            dashboardBottomPieList(schoolUuid) {
                this.$api.dashboard.dashboardPieList(schoolUuid).then(res => {
                    console.log(res);
                    this.bottomData = res.data;
                    if (res.data.length > 0) {
                        this.dashboardLinePeople(res.data[0].majorUuid);
                        this.activeUuid = res.data[0].majorUuid;
                    }
                });
            },
            async dashboardMiddlePeopleNumber(schoolUuid) {
                await this.$api.dashboard.dashboardMiddlePeopleNumber(schoolUuid).then(res => {
                    this.middleData.barChartPeople.data.labels = [];
                    this.middleData.barChartPeople.data.datasets[0].data = [];
                    this.middleData.sortPeople = res.data.sortList;
                    res.data.list.map(i => {
                        this.middleData.barChartPeople.data.labels.push(i.majorName);
                        this.middleData.barChartPeople.data.datasets[0].data.push(i.peopleNumber);
                    });
                });
                this.$refs.chart.renderChart(this.middleData.barChartPeople.data, this.middleData.barChartPeople.options);
            },
            async dashboardMiddleMoney(schoolUuid) {
                await this.$api.dashboard.dashboardMiddleMoney(schoolUuid, this.middleData.dateValue[1], this.middleData.dateValue[0]).then(res => {
                    this.middleData.barChartMoney.data.labels = [];
                    this.middleData.barChartMoney.data.datasets[0].data = [];
                    this.middleData.sortMoney = res.data.sortList;
                    res.data.list.map(i => {
                        this.middleData.barChartMoney.data.labels.push(i.majorName);
                        this.middleData.barChartMoney.data.datasets[0].data.push(i.signUpCost);
                    });
                });
                this.$refs.chart1.renderChart(this.middleData.barChartMoney.data, this.middleData.barChartMoney.options);
            },
            getDashboardTop(schoolUuid) {
                this.$api.dashboard.dashboardTop(schoolUuid).then(res => {
                    this.topData = res.data;
                });
            },
            dateChange(val) {
                this.dashboardMiddleMoney(this.schoolValue);
                console.log(val);
            },
            go(url) {
                this.$router.push({path: url});
            }
        }
    };
</script>

<style scoped>
    /deep/ .center .chartjs-render-monitor {
        height: 450px !important;
    }

    .flex-bt {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .flex-end{
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }
    .active-pie{
        border-top: 3px solid #409EFF;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    }
    .pie-class{
        margin-right: 3px;
        border-radius: 2px;
        padding: 13px 30px;
        cursor:pointer;
    }
    .flex-center {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .f-small {
        cursor: pointer;
    }

    /deep/ .panel .panel-body {
        padding: 0;
    }
</style>
