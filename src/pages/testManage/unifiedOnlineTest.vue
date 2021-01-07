<!--线上考试-->
<template>
    <div style="padding-bottom: 30px;margin-top: 10px">
        <div class="search-top">
            <div>
                <el-select
                    @change="schoolChange"
                    v-model="collageUuid"
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
            </div>
            <div>
                <el-select
                    @change="majorChange"
                    v-model="majorUuid"
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
            </div>
           <div>
               <el-input
                   style="width: 300px"
                   v-model="search"
                   placeholder="输入考试名称"
               ></el-input>
           </div>
            <el-button type="primary" @click="getList(),start = 1">搜索</el-button>
            <el-button type="success" icon="el-icon-plus" @click="jump('onlineTestAddIsGeneral')">国考考试</el-button>

        </div>
        <div>
            <el-table
                :data="tableData"
                align="center"
                style="width: 100%">
                <el-table-column
                    prop="examName"
                    label="考试名称"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="schoolName"
                    label="院校"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="majorName"
                    label="专业">
                </el-table-column>
                <el-table-column
                    prop="specialtyClassName"
                    label="课程名称">
                </el-table-column>
                <el-table-column
                    prop="website"
                    label="报名网站">
                </el-table-column>
                <el-table-column
                    label="状态（上线/下线）">
                    <template slot-scope="row">
                        <el-switch
                            v-model="row.row.isPass"
                            active-color="#13ce66"
                            @change="IspassUpdate(row.row.uuid)"
                            inactive-color="#ff4949">
                        </el-switch>
                    </template>
                </el-table-column>

                <el-table-column
                    label="操作">
                    <template slot-scope="row">
                        <el-button type="text" @click="jump('onlineTestAddIsGeneral',row.row.uuid)">编辑</el-button>
                        <el-button type="text" @click="jump('recorded', row.row.uuid)">成绩录入</el-button>
                    </template>
                </el-table-column>

            </el-table>
            <div class="block" style="float: right">
                <el-pagination
                    layout="prev, pager, next, total"
                    :page-size="perPage"
                    @current-change="handleCurrentChange"
                    :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapActions} from "vuex";

    export default {
        name: "OnlineTest",
        computed: {
            // 院校,专业,课程
            ...mapState("school", {
                schoolLists: (state) => state.schoolLists,
                majorLists: (state) => state.majorLists,
                specialtyLists: (state) => state.specialtyLists,
            }),
        },
        data() {
            return {
                //面包屑
                majorUuid: '',
                search: '',
                collageUuid: '',
                // table
                total:0,
                start:1,
                perPage:10,
                tableData:[],
            };
        },
        created() {
            this.$emit('getMeteData', this.$Bre.breadCrumbs([0, 6, 63]));
            this.getSchoolListAction();
        },
        mounted() {
            this.getList();
        },
        methods: {
            ...mapActions("school", [
                "getSchoolListAction",
                "getMajorListAction",
                "getStudyManageAction",
            ]),
            getList(){
              console.log(this.$data);
              let data = {
                  start:this.start,
                  perPage:this.perPage,
                  majorUuid:this.majorUuid,
                  name:this.search,
                  collageUuid:this.collageUuid
              };
              this.$api.testManage.getUnifiedExamination(data).then(res=>{
                  console.log(res);
                  this.total = res.data.total;
                  this.tableData = res.data.records;
              });
            },
            IspassUpdate(id){
              this.$api.testManage.IsPassUnifiedExaminationDetails(id).then(res=>{
                  console.log(res);
                  this.$message.success('操作成功');
                  this.getList();
              }).catch(()=>{
                  this.$message.success('操作失败');
                  this.getList();
              });
            },
            // 页面跳转
            jump(name, id) {
                this.$router.push({
                    name: name,
                    query: {
                        id: id,
                    },
                });
            },
            handleCurrentChange(val){
              this.start = val;
              this.getList();
            },
            // 院校改变
            schoolChange(val) {
                this.majorUuid = "";
                this.getMajorListAction({
                    schoolUuid: val,
                });
                this.start = 1;
                this.getList();

            },
            // 专业改变
            majorChange() {
                this.start = 1;
                this.getList();
            },
        },
    };
</script>

<style lang="scss" scoped>
    .search-top{
        display: flex;
        div{
            margin-right: 10px;
        }
    }
    .link {
        cursor: pointer;
        display: inline-block;
        margin-right: 10px;
    }
</style>
