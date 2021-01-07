<!--统考考试成绩录入-->
<template>
    <div>
        <div class="flex-end" style="justify-content: space-between">
            <el-button class="fl" type="success" icon="el-icon-plus" @click="showOpen">批量新增</el-button>
            <div class="flex-end">
                <el-input class="w350" v-model="studentName" placeholder="输入学员名称搜索"></el-input>
                <el-button type="primary" @click="start=1,getList()">搜索</el-button>
            </div>
        </div>
        <div>
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column align="center" label="#" width="70px">
                    <template slot-scope="scope">{{scope.$index+1}}</template>
                </el-table-column>
                <el-table-column
                    prop="studentName"
                    label="学员名称"
                    >
                </el-table-column>
                <el-table-column
                    prop="gradeName"
                    label="班级名称">
                </el-table-column>
                <el-table-column
                    label="考试分数"
                    align="center"
                    >
                    <template slot-scope="row">
                        <el-input @blur="blurInput(row.row)" type="number"  v-model="row.row.score" style="width: 200px;" placeholder="请输入成绩分数"></el-input>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="block" style="float: right">
            <el-pagination
                layout="prev, pager, next, total"
                :page-size="perPage"
                @current-change="handleCurrentChange"
                :total="total">
            </el-pagination>
        </div>
        <batchAdd ref="batchAdd" :batchAddData="batchAddData" @loadData="getList"/>
    </div>
</template>

<script>
    import batchAdd from "@/components/batch-add/batch-add";

    export default {
        components: {batchAdd},
        data(){
            return{
                total:0,
                start:1,
                studentName:'',
                perPage:10,
                tableData:[],
                batchAddData: {
                    downloadUrl: '/api/user/down/export-report-template/unified/',
                    upDataUrl: '/api/exam/upload/import-unified-exam-score',
                    typeId: {
                        unifiedExamUuid: this.$route.query.id
                    }
                }
            };
        },
        filters:{
            score(val){
                if(val){
                    return val +'分';
                }else{
                    return '未录入成绩';
                }
            }
        },
        methods:{
            showOpen() {
                this.$refs['batchAdd'].isOpen();
            },
            getList(){
                let data = {
                    start:this.start,
                    perPage:this.perPage,
                    uuid:this.$route.query.id
                };
                this.$api.testManage.recordedGradeList(data, this.studentName).then(res=>{
                    console.log(res);
                    this.total = res.data.total;
                    this.tableData = res.data.records;
                });
            },
            handleCurrentChange(val){
                this.start = val;
                this.getList();
            },
            blurInput(row){
                if(!row.score || row.score < 0) {
                    this.$message.error('考试分数不能小于0');
                    return;
                }
                this.$confirm('是否确定录入该学员成绩', '成绩录入', {
                    confirmButtonText: '录入',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$api.testManage.recordedGradeStudent(this.$route.query.id, row).then(res=>{
                        console.log(res);
                        this.$message({
                            type: 'success',
                            message: '录入成功!'
                        });
                        this.getList();
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消录入'
                    });
                });

            }
        },
        created() {
            this.$emit('getMeteData', this.$Bre.breadCrumbs([0, 6, 63]), '成绩录入');
        },
        mounted() {
            this.getList();

        },
    };
</script>
<style scoped>
    .flex-end{
        display: flex;
        justify-content: flex-end;
    }
    .w350{
        width: 350px;
        margin-right: 10px;
    }
</style>
