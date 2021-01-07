<!--线上考试-->
<template>
    <div>
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
                <el-form-item>
                    <el-select
                        @change="schoolChange"
                        v-model="condition.schoolUuid"
                        placeholder="请选择院校"
                        clearable
                    >
                        <el-option
                            v-for="item in schoolLists"
                            :key="item.uuid"
                            :label="item.schoolName"
                            :value="item.uuid"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select
                        @change="majorChange"
                        v-model="condition.majorUuid"
                        placeholder="请选择专业"
                        clearable
                    >
                        <el-option
                            v-for="item in majorLists"
                            :key="item.uuid"
                            :label="item.majorName"
                            :value="item.uuid"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="condition.gradeUuid" placeholder="请选择班级" clearable>
                        <el-option v-for="item in gradeLists" :key="item.uuid" :label="item.gradeName" :value="item.uuid"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="condition.specialtyUuids" placeholder="请选择专业课" multiple>
                        <el-option
                            v-for="item in specialtyLists"
                            :key="item.uuid"
                            :label="item.specialtyName"
                            :value="item.uuid"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <div class="fr">
                    <el-form-item>
                        <el-input
                            v-model="condition.searchName"
                            placeholder="请输入学生姓名搜索"
                            @keyup.enter.native="loadData"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="loadData">搜索</el-button>
                    </el-form-item>
                    <el-form-item>
                        <DownLoadTemplate :typeNumber="3" types="results" :datas="condition" />
                    </el-form-item>

                </div>
            </el-form>
            <el-table slot="list" :data="demoList" stripe border>
                <el-table-column type="index" align="center" label="#" width="70px">
                </el-table-column>
                <el-table-column prop="majorName" align="center" label="院校">
                    <template template slot-scope="scope">{{ scope.row.schoolName }}</template>
                </el-table-column>
                <el-table-column prop="specialtyName" align="center" label="专业">
                    <template template slot-scope="scope">{{ scope.row.majorName }}</template>
                </el-table-column>
                <el-table-column prop="paperClassifyName" align="center" label="课程名称">
                    <template slot-scope="scope">{{ scope.row.specialtyName }}</template>
                </el-table-column>
                <el-table-column prop="paperName" align="center" label="学生姓名">
                    <template slot-scope="scope">{{ scope.row.studentName }}</template>
                </el-table-column>
                <el-table-column prop="schoolName" align="center" label="线上最终成绩" sortable>
                    <template slot-scope="scope">{{ scope.row.finalScore }}</template>
                </el-table-column>
            </el-table>
        </base-list>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import DownLoadTemplate from '@/plugins/DownLoadTemplate';
export default {
    name: "resultList",
    components: {DownLoadTemplate},
    computed: {
        // 院校,专业,课程
        ...mapState("school", {
            schoolLists: (state) => state.schoolLists,
            majorLists: (state) => state.majorLists,
            gradeLists: (state) => state.gradeLists,
            specialtyLists: (state) => state.specialtyLists,
        }),
    },
    data() {
        return {
            // table
            condition: {
                schoolUuid: '',
                majorUuid: '',
                gradeUuid: '',
                specialtyUuids: [],
                searchName: '',
            },
            demoList: [],
            pageSearch: this.$api.testManage.studentScoresParam,
        };
    },
    created() {
        this.$emit('getMeteData', this.$Bre.breadCrumbs([0, 6, 67]));
        this.getSchoolListAction();
    },
    methods: {
        ...mapActions("school", [
            "getSchoolListAction",
            "getMajorListAction",
            "getStudyManageAction",
            "getGradeListAction"
        ]),
        //   刷新列表
        loadData() {
            this.$refs.demoTable.loadData();
        },
        // 院校改变
        schoolChange(val) {
            this.condition.majorUuid = "";
            this.condition.gradeUuid = "";
            this.condition.specialtyUuids = [];
            this.getMajorListAction({
                schoolUuid: val,
            });
        },
        // 专业改变
        majorChange(val) {
            this.condition.gradeUuid = "";
            this.condition.specialtyUuids = [];
            this.getGradeListAction({
                schoolUuid:  this.condition.schoolUuid,
                majorUuid: val,
            });
            this.getStudyManageAction({
                schoolUuid: this.condition.schoolUuid,
                majorUuid: val,
                type: 'disGeneralExamination'
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.link {
    cursor: pointer;
    display: inline-block;
    margin-right: 10px;
}
</style>
