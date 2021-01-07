<!--班级学生管理-学习进度查询-->
<template>
    <div class="takeClass">
        <base-list
            ref="demoTable"
            :condition="condition"
            :datas.sync="demoList"
            :pageSearch="pageSearch"
            :isPaging="true"
        >
            <el-form
                :inline="true"
                :model="condition"
                class="search-form"
                slot="search"
                label-width="80px"
            >
                <el-button class="fr mar20" type="primary" @click="loadData">搜索</el-button>
                <el-form-item class="fr">
                    <el-input
                        v-model="condition.specialtyName"
                        placeholder="请输入课程名称"
                        clearable
                    />
                </el-form-item>
            </el-form>

            <el-table slot="list" :data="demoList" stripe border>
                <el-table-column prop="ID" align="center" label="#" width="70px">
                    <template slot-scope="scope">{{scope.$index+1}}</template>
                </el-table-column>
                <el-table-column prop="schoolName" align="center" label="课程名称">
                    <template slot-scope="scope">{{ scope.row.specialtyName }}</template>
                </el-table-column>
                <el-table-column prop="schoolName" align="center" label="课程类型">
                    <template slot-scope="scope">{{ scope.row.type | type}}</template>
                </el-table-column>
                <el-table-column prop="schoolName" align="center" label="学习状态">
                    <template slot-scope="scope">{{scope.row.progress| progress}}</template>
                </el-table-column>
                <el-table-column prop="schoolName" align="center" label="章节进度">
                    <template slot-scope="scope">{{ scope.row.lessonsName }}</template>
                </el-table-column>
                <el-table-column prop="schoolName" align="center" label="学习进度">
                    <template slot-scope="scope">{{ scope.row.progress? scope.row.progress : 0 }}%</template>
                </el-table-column>
                <el-table-column prop="schoolName" align="center" label="作业练习平均得分">
                    <template slot-scope="scope">{{ scope.row.avgScore |avgScore}}</template>
                </el-table-column>
                <el-table-column prop="schoolName" align="center" label="累积学时">
                    <template slot-scope="scope">{{ scope.row.timeCost? scope.row.timeCost : 0 |formatSeconds}}</template>
                </el-table-column>
            </el-table>
        </base-list>
    </div>
</template>

<script>
    export default {
        name: "history",
        filters: {
            formatSeconds(value) {
                let theTime = parseInt(value);// 秒
                let middle = 0;// 分
                let hour = 0;// 小时

                if (theTime > 60) {
                    middle = parseInt(theTime / 60);
                    theTime = parseInt(theTime % 60);
                    if (middle > 60) {
                        hour = parseInt(middle / 60);
                        middle = parseInt(middle % 60);
                    }
                }
                let result = "" + parseInt(theTime) + "秒";
                if (middle > 0) {
                    result = "" + parseInt(middle) + "分" + result;
                }
                if (hour > 0) {
                    result = "" + parseInt(hour) + "小时" + result;
                }
                return result;
            },
            avgScore(val) {
                if (val) {
                    return val + '分';
                } else {
                    return '未完成作业';
                }
            },
            progress(val) {
                if (val == 100) {
                    return '已完成';
                } else {
                    return '学习中';
                }
            },
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
        data() {
            return {
                // 查询条件
                condition: {
                    conditionModel: {},
                    studentUuid: this.$route.query.id
                },
                // table数组
                demoList: [],
                // 分页查询api接口
                pageSearch: this.$api.grade.getStudentHistory,
            };
        },
        created() {
            this.$emit('getMeteData', this.$Bre.breadCrumbs([0, 4, 41]), '学习进度');
        },
        methods: {
            loadData() {
                this.$refs.demoTable.loadData();
            }
        },
    };
</script>

<style lang="scss" scoped>
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
