<!--直播课审核-->
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
                    placeholder="输入课程名称/申请老师名称"
                ></el-input>
            </div>
            <el-button type="primary" @click="getList(),start = 1">搜索</el-button>
        </div>
        <div>
            <el-table
                :data="tableData"
                align="center"
                style="width: 100%">
                <el-table-column prop="id" align="center" label="#" width="70px">
                    <template slot-scope="scope">{{scope.$index+1}}</template>
                </el-table-column>
                <el-table-column
                    prop="schoolName"
                    label="院校"
                    align="center"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="majorName"
                    label="专业"
                    align="center"
                    width="100">
                </el-table-column>
                <el-table-column
                    label="班级"
                    align="center"
                    width="100">
                    <template slot-scope="row">
                        <div v-for="(item, index) in row.row.grades" :key="index">{{item}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="teacherName"
                    label="申请老师"
                    align="center"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="title"
                    label="课程名称"
                    align="center"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="startDate"
                    align="center"
                    label="直播时间"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="createDate"
                    label="申请时间"
                    align="center"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="studentSite"
                    label="学生观看直播地址"
                    align="center"
                    width="250">
                </el-table-column>
                <el-table-column
                    prop="teacherSite"
                    label="老师授课直播地址"
                    align="center"
                    width="250">
                </el-table-column>
                <el-table-column
                    label="审核状态"
                    fixed="right"
                    align="center"
                    width="80">
                    <template slot-scope="row">
                        <span>{{row.row.status | status}}</span>
                    </template>
                </el-table-column>

                <el-table-column
                    label="操作"
                    align="center"
                    fixed="right"
                    width="90">
                    <template slot-scope="row" >
                        <el-button type="text" :disabled="!(row.row.status==1)" @click="append(row.row, true)">通过</el-button>
                        <el-button type="text" :disabled="!(row.row.status==1)"  @click="append(row.row, false)">拒绝</el-button>
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
        <div>
            <!--            拒绝-->
            <el-dialog
                title="拒绝审核"
                :visible.sync="refuseVisible"
                width="40%"
            >
                <el-input
                    type="textarea"
                    :rows="7"
                    placeholder="请输入拒绝理由 （站内信方式发送）"
                    v-model="reject">
                </el-input>
                <span slot="footer" class="dialog-footer">
                <el-button @click="refuseVisible = false">取 消</el-button>
                <el-button type="primary" @click="rejectCheck">确 定</el-button>
              </span>
            </el-dialog>
        </div>
        <div>
            <!--            成功审核-->
            <el-dialog
                title="审核成功"
                :visible.sync="agreeVisible"
                width="40%"
            >
                <el-input v-model="studentSite" placeholder="学生观看地址 https://... or http://..."></el-input>
                <el-input style="margin: 10px 0" v-model="teacherSite" placeholder="老师授课地址 https://... or http://..."></el-input>
                <el-input
                    type="textarea"
                    :rows="7"
                    placeholder="请输入站内信内容"
                    v-model="reject">
                </el-input>
                <span slot="footer" class="dialog-footer">
                <el-button @click="agreeVisible = false">取 消</el-button>
                <el-button type="primary" @click="agreeCheck">确 定</el-button>
              </span>
            </el-dialog>
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
                reject:'',
                agreeVisible:false,
                studentSite:'',
                teacherSite:'',
                search: '',
                collageUuid: '',
                uuid:null,
                refuseVisible:false,
                // table
                total:0,
                start:1,
                perPage:10,
                tableData:[],
            };
        },
        filters:{
            status(val){
                if(val==0){
                    return '通过';
                }else if(val==1){
                    return '待审核';
                }else{
                    return '拒绝';
                }
            }
        },
        created() {
            this.$emit('getMeteData', this.$Bre.breadCrumbs([0, 12, 37]));
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
            agreeCheck(){
                // 同意
                let data = {
                    reject:this.reject,
                    status:0,
                    studentSite:this.studentSite,
                    teacherSite:this.teacherSite
                };
                this.$api.studyManage.submitLiveCheck(this.uuid, data).then(res=>{
                    console.log(res);
                    this.$message.success('操作成功，已通过审核');
                    this.agreeVisible = false;
                    this.getList();
                });
            },
            rejectCheck(){
                // 拒绝
                let data = {
                    reject:this.reject,
                    status:2,
                    studentSite:'',
                    teacherSite:''
                };
                this.$api.studyManage.submitLiveCheck(this.uuid, data).then(res=>{
                   console.log(res);
                    this.$message.success('操作成功，已拒绝');
                    this.refuseVisible = false;
                    this.getList();
                });
            },
            getList(){
                let data = {
                    start:this.start,
                    perPage:this.perPage,
                    majorUuid:this.majorUuid,
                    fieldName:this.search,
                    schoolUuid:this.collageUuid
                };
                this.$api.studyManage.liveCheckList(data).then(res=>{
                    console.log(res);
                    this.total = res.data.total;
                    this.tableData = res.data.records;
                });
            },
            append(row, status){
                // submitLiveCheck
                this.uuid = row.uuid;
                if(status){
                    this.agreeVisible = true;
                }else{
                    this.refuseVisible = true;
                }
                console.log(row, status);
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
