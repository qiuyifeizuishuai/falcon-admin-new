<template>
    <div>
        <b class="f-s-16">待办工作</b>
        <div class="commits">
            <div class="row">
                <div class="col-xl-2 col-md-4 col-sm-6 commit-box" v-for="(item, index) in dataList" :key="index" v-show="isPermissions.includes(item.path) || !item.isRouter ">
                    <div class="number">{{item.dataTotal}}</div>
                    <div class="title">{{ item.dataName }}</div>
                    <div class="view" v-if="item.isRouter"><span @click="goRouter(item.path)">查看</span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-8" style="margin-bottom: 30px">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="card-title">学生答疑待回复</span>
                    </div>
                    <div v-for="(item, index) in askStudentLists" :key="index" class="text item card-small-box">
                        <div class="flex-bt">
                            <div class="flex">
                                <img src="../../assets/css/apple/images/coming-soon.jpg" class="course-image" alt="">
                                <div class="course-title">
                                    <b>{{item.name}}</b>
                                    <span>{{item.type | courseType}}</span>
                                </div>
                            </div>
                            <div class="f-s-14"><span style="margin-right: 10px">{{item.total}}条未回复</span> <span
                                class="cursor" @click="viewAsk(item.lessonsUuid)">查看</span></div>
                        </div>
                    </div>
                </el-card>
            </div>
            <div class="col-xl-4 ">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="card-title">待阅卷</span>
                    </div>
                    <div v-for="(item, index) in readList" :key="index" class="text item card-small-box"
                         style="padding-top: 10px;padding-bottom: 10px">
                        <div class="flex-bt">
                            <div class="check-title" style="width: 100%;">
                                <b style="margin-bottom: 5px">{{item.specialtyName}} - {{item.examName}}</b>
                                <div class="flex-bt">
                                    <span>阅卷截止时间 {{item.paperInspectionEndTime}}</span>
                                    <span class="cursor f-s-14" @click="goRead(item.uuid)">查看</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dataList: [
                    {dataName: '考试人脸待审核', dataTotal: 0, path: '/forAudit', isRouter: true},
                    {dataName: '转账报名待审核', dataTotal: 0, path: '/costManagement', isRouter: true},
                    {dataName: '学生投诉未处理', dataTotal: 0, path: '/rootMessage', isRouter: true},
                    {dataName: '直播申请待审核', dataTotal: 0, path: '/liveClassCheck', isRouter: true},
                    {dataName: '学生答疑未处理', dataTotal: 0, path: '', isRouter: false},
                    {dataName: '待阅卷', dataTotal: 0, path: '', isRouter: false},
                ],
                readList: [], // 待阅卷列表
                askStudentLists: [], //  答疑列表
                isPermissions: []
            };
        },
        mounted() {
            this.checkTotal();
            this.liveCheckTotal();
            this.readTotal();
            this.transferTotal();
            this.complaintsTotal();
            this.askTotal();
            this.askStudentList();
        },
        filters: {
            courseType(val) {
                if (val === 'generalExamination') {
                    return '国考课程';
                } else if (val === 'elective') {
                    return '选修课程';
                } else {
                    return '认定课程';
                }
            }
        },
        created() {
            let isNavData = window.sessionStorage.getItem('navDataArr');
            if(isNavData) this.isPermissions = isNavData.split(',');
            this.$emit('getMeteData', this.$Bre.breadCrumbs([0, 1]));
        },
        methods: {
            goRouter(val) {
                this.$router.push(val);
            },
            goRead(uuid) {
                this.$router.push({path: '/testScoring?id=' + uuid});
            },
            viewAsk(uuid) {
                this.$router.push({
                    path: '/answerQuestions', query: {
                        id: uuid
                    }
                });
            },
            async askStudentList() {
                // 答疑List
                let res = await this.$api.dashboard.askStudentList();
                this.askStudentLists = res.data;
            },
            async askTotal() {
                // 答疑total
                let res = await this.$api.dashboard.askStudentTotal();
                this.dataList[4].dataTotal = res.data;
            },
            async complaintsTotal() {
                let res = await this.$api.dashboard.complaintsTotal();
                this.dataList[2].dataTotal = res.data;
            },
            async transferTotal() {
                // 转账报名
                let res = await this.$api.dashboard.transferTotal();
                this.dataList[1].dataTotal = res.total;
            },
            async readTotal() {
                // 待阅卷
                let res = await this.$api.dashboard.readTotal();
                this.dataList[5].dataTotal = res.data.length;
                this.readList = res.data;
            },
            async checkTotal() {
                // 待审核total
                let res = await this.$api.dashboard.checkTotal(10, 1);
                this.dataList[0].dataTotal = res.data.total;
            },
            async liveCheckTotal() {
                // 待审核total
                let res = await this.$api.dashboard.liveCheckTotal(10, 1);
                this.dataList[3].dataTotal = res.data.total;
            }

        }
    };
</script>

<style scoped>
    .commits {
        margin: 20px 0 60px;
    }

    .commit-box {
        text-align: center;
    }

    .commit-box .number {
        font-size: 26px;
        font-weight: bold;
        color: #409EFF;
    }

    .commit-box .title {
        font-size: 16px;
        color: #909399;
        margin: 10px 0;
    }

    .commit-box .view span, .cursor {
        color: #409EFF !important;
        cursor: pointer;
    }

    .flex-bt {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .course-image {
        border-radius: 100%;
        width: 45px;
        height: 45px;
    }

    .card-title {
        font-size: 16px;
        font-weight: bold;
    }

    .course-title {
        margin-left: 15px;
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: space-between
    }

    .check-title {
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: space-between
    }

    .course-title b, .check-title b {
        font-size: 16px;
    }

    .course-title span, .check-title span {
        color: #909399;
    }

    .flex {
        align-items: center;
        display: flex;
    }

    .card-small-box {
        padding: 15px 0px;
        border-bottom: 1px solid #d5dbe3;
    }

    /deep/ .el-card__body {
        padding-top: 0;
    }
</style>
