<!--专业课-->
<template>
    <div class="professionalManage">
        <base-list ref="demoTable" :condition="condition" :datas.sync="demoList" @listLoaded="listLoaded" :pageSearch="pageSearch" :isPaging="true">
            <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
<!--                <div class="record">-->
<!--                    <el-row>-->
<!--                        <el-col :span="8">-->
<!--                            <div class="recordIndex recordIndexBor">-->
<!--                                <span>已完成学习</span>-->
<!--                                <p>60%学生</p>-->
<!--                            </div>-->
<!--                        </el-col>-->
<!--                        <el-col :span="8">-->
<!--                            <div class="recordIndex recordIndexBor">-->
<!--                                <span>已达80%学习进度</span>-->
<!--                                <p>60%学生</p>-->
<!--                            </div>-->
<!--                        </el-col>-->
<!--                        <el-col :span="8">-->
<!--                            <div class="recordIndex">-->
<!--                                <span>未达60%学习进度</span>-->
<!--                                <p>60%学生</p>-->
<!--                            </div>-->
<!--                        </el-col>-->
<!--                    </el-row>-->
<!--                </div>-->
                <el-form-item>
                    <el-select @change="schoolChange" v-model="condition.collegeUuid" placeholder="请选择院校" clearable>
                        <el-option v-for="item in schoolLists" :key="item.uuid" :label="item.schoolName" :value="item.uuid"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="condition.majorUuid" placeholder="请选择专业" clearable @change="classChange">
                        <el-option v-for="item in majorLists" :key="item.uuid" :label="item.majorName" :value="item.uuid"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="condition.classUuid" placeholder="请选择班级" clearable>
                        <el-option v-for="item in gradeLists" :key="item.uuid" :label="item.gradeName" :value="item.uuid"></el-option>
                    </el-select>
                </el-form-item>
                <DownLoadTemplate types="progress" :typeNumber="2" :datas="condition" class="mar20 fr" />
                <el-button class="mar20 fr" type="primary" @click="loadData">搜索</el-button>
                <el-form-item class="fr">
                    <el-input v-model="condition.searchName" placeholder="请输入学生名称/课程名称" clearable/>
                </el-form-item>
                <el-form-item>
                    <div style="width: 100%">
                        <el-select v-model="condition.floorSchedule" placeholder="请选择开始进度" clearable>
                            <el-option v-for="(item, index) in 10" :disabled="condition.ceilingSchedule !== '' && condition.ceilingSchedule <= index*10" :key="index" :label="index*10" :value="index*10"></el-option>
                        </el-select>
                        -
                        <el-select v-model="condition.ceilingSchedule" placeholder="请选择结束进度" clearable>
                            <el-option v-for="(item, index) in 11" :disabled="condition.floorSchedule >= index*10" :key="index" :label="index*10" :value="index*10"></el-option>
                        </el-select>
                        <p v-if="conditionMap.studentSchedule !== '-'" style="display: inline-block;font-size: 24px;color: #333;margin-left: 30px;">{{ parseInt(conditionMap.studentSchedule) || 0 }}%学生<span style="font-size: 14px;color: #999">已达进度</span></p>
                    </div>
                </el-form-item>
            </el-form>
            <el-table slot="list" :data="demoList" stripe border>
                <el-table-column prop="serialNumber" align="center" label="#" width="50px"></el-table-column>
                <el-table-column prop="collegeName" align="center" label="学院名称"></el-table-column>
                <el-table-column prop="studentName" align="center" label="学生姓名"></el-table-column>
                <el-table-column prop="majorName" align="center" label="专业"></el-table-column>
                <el-table-column prop="className" align="center" label="班级"></el-table-column>
                <el-table-column prop="specialtyName" align="center" label="课程名称"></el-table-column>
                <el-table-column prop="specialtyType" align="center" label="课程类型">
                    <template slot-scope="scope">{{ scope.row.specialtyType | type}}</template>
                </el-table-column>
                <el-table-column prop="chapterSchedule" align="center" label="章节进度"></el-table-column>
                <el-table-column prop="studySchedule" align="center" label="学习进度" sortable></el-table-column>
                <el-table-column prop="workAverageScore" align="center" label="作业练习平均得分"></el-table-column>
                <el-table-column prop="accumulativeHours" align="center" label="累计学时"></el-table-column>
            </el-table>
        </base-list>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import DownLoadTemplate from '@/plugins/DownLoadTemplate';
export default {
    name: "learningProcess",
    components: {DownLoadTemplate},
    data() {
        return {
            schoolUuidData: "",
            // 查询条件
            condition: {
                collegeUuid: "",
                majorUuid: "",
                classUuid: "",
                searchName: "",
                floorSchedule: '',
                ceilingSchedule: '',
            },
            conditionMap: "",
            // table数组
            demoList: [],
            // 分页查询api接口
            pageSearch: this.$api.studyManage.studyRecords,
        };
    },
    computed: {
        // 院校,专业,课程
        ...mapState("school", {
            schoolLists: (state) => state.schoolLists,
            majorLists: (state) => state.majorLists,
            gradeLists: (state) => state.gradeLists,
        }),
    },
    filters: {
        type(val) {
            if (val == 'disGeneralExamination') {
                return '认定课程';
            } else if (val == 'generalExamination') {
                return '国考课程';
            } else {
                return '选修课';
            }
        }
    },
    created() {
        this.$emit('getMeteData', this.$Bre.breadCrumbs([0, 3, 38]));
    },
    methods: {
        ...mapActions("school", ["getSchoolListAction", "getMajorListAction", "getGradeListAction"]),
        loadData() {
            this.$refs.demoTable.loadData();
        },
        listLoaded(val) {
            this.conditionMap = val.map;
        },
        // 院校改变
        schoolChange(val) {
            this.condition.majorUuid = "";
            this.schoolUuidData = val;
            this.getMajorListAction({
                schoolUuid: val,
            });
        },
        classChange(val) {
            this.condition.classUuid = "";
            this.getGradeListAction({
                schoolUuid:  this.schoolUuidData,
                majorUuid: val,
            });
        }
    },
    mounted() {
        this.getSchoolListAction();
    },
};
</script>

<style lang="scss" scoped>
.record{
    width: 100%;
    border-bottom: 1px solid #EBEEF5;margin-bottom: 20px;
    .recordIndex{
        width: 100%;text-align: center;margin-bottom: 30px;
        span{font-size: 12px;color: #999}
        p{font-size: 24px;color: #333;margin-top: 3px}
    }
    .recordIndexBor{
        border-right: 1px solid #EBEEF5;
    }
}

.box {
    display: flex;
    align-items: center;
    justify-content: center;
    .span {
        color: #409dff;
        cursor: pointer;
        &:hover {
            opacity: 0.7;
        }
    }
    .emClass {
        display: inline-block;
        height: 14px;
        width: 1px;
        background-color: #e5e5e5;
        margin: 0 10px;
    }
}
</style>
