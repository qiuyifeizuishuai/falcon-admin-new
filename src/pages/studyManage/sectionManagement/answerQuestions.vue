<!--答疑-->
<template>
    <div>
        <div class="flex-bt">
            <el-button v-if="activeName=='setting'" type="primary" @click="questionAnswerDialog=true,doStatus=true,sort=1,addAnswerValue=null,addQuestionValue=null">添加答疑</el-button>
            <div>
                <el-input class="w300" v-model="searchValue" placeholder="请输入问题搜索"></el-input>
                <el-button type="primary" @click="tabsChange">搜索</el-button>
            </div>
        </div>
        <el-tabs v-model="activeName" @tab-click="tabsChange">
            <el-tab-pane label="答疑配置" name="setting">
                <el-table
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                        label="#"
                        width="180">
                        <template slot-scope="row">
                            {{row.$index+1}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="question"
                        label="问题"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="answer"
                        label="答案">
                    </el-table-column>
                    <el-table-column
                        prop="creator"
                        label="创建人">
                    </el-table-column>
                    <el-table-column
                        prop="sort"
                        label="排序值">
                    </el-table-column>
                    <el-table-column
                        label="操作">
                        <template slot-scope="row">
                            <el-button type="text" @click="editQuestionAnswer(row.row),settingUuid = row.row.uuid,doStatus=false">编辑</el-button>
                            <el-button type="text" @click="deleteQuestionAnswer(row.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="学生提问" name="question">
                <el-table
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                        label="#"
                        width="50">
                        <template slot-scope="row">
                            {{row.$index+1}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="className"
                        label="班级"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        prop="creatorName"
                        label="提问人"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        label="提问时间"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        prop="question"
                        label="问题"
                        width="300">
                    </el-table-column>
                    <el-table-column
                        prop="answer"
                        label="回答">
                    </el-table-column>
                    <el-table-column
                        label="回答状态">
                        <template slot-scope="row">
                            {{row.row.answerStatus |answerStatus}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="120"
                        fixed="right"
                        >
                        <template slot-scope="row">
                            <div v-if="row.row.answerStatus">
                                <el-button v-if="!(row.row.operate)" type="text" @click="updateDisplay(row.row)">添加至答疑列表</el-button>
                                <el-button v-else type="text" disabled>已添加至答疑列表</el-button>
                            </div>
                            <div v-else>
                                <el-button type="text" @click="answerDialog=true,studentQuestionTextareaValue=row.row.question,studentQuestionUuid=row.row.uuid" > 回答</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
        <div>
            <el-dialog
                title="答疑配置"
                :visible.sync="questionAnswerDialog"
                width="40%"
            >
                <div>
                    <b>问题：</b>
                    <el-input
                        type="textarea"
                        :rows="6"
                        placeholder="请输入问题描述"
                        v-model="addQuestionValue">
                    </el-input>
                </div>
                <div class="textareaS">
                    <b>答案：</b>
                    <el-input
                        type="textarea"
                        :rows="6"
                        placeholder="请输入答案"
                        v-model="addAnswerValue">
                    </el-input>
                </div>
                <div>
                    <b>排序值：(注：数字越小，用户展示越靠前)</b>
                    <el-input v-model="sort" placeholder="排序值"></el-input>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="questionAnswerDialog = false">取 消</el-button>
                <el-button type="primary" @click="addQuestionAnswer()">确 定</el-button>
              </span>
            </el-dialog>
        </div>
        <div>
            <el-dialog
                title="回答问题"
                :visible.sync="answerDialog"
                width="40%"
            >
                <div>
                    <b class="bold">问题：</b>
                    <p>{{studentQuestionTextareaValue}}</p>
                </div>
                <div class="textareaS">
                    <b>
                        答案：
                    </b>
                    <el-input
                        type="textarea"
                        :rows="6"
                        placeholder="请输入答案"
                        v-model="addStudentAnswerValue">
                    </el-input>
                </div>

                <span slot="footer" class="dialog-footer">
                <el-button @click="answerDialog = false">取 消</el-button>
                <el-button type="primary" @click="addStudentQuestion()">确 定</el-button>
              </span>
            </el-dialog>
        </div>
        <div class="block">
            <el-pagination
                @current-change="pageChange"
                :current-page.sync="start"
                :page-size="perPage"
                layout="total, prev, pager, next"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                studentQuestionTextareaValue:'',
                studentQuestionUuid:'',
                addStudentAnswerValue:null,
                settingUuid:'',
                doStatus:true, // 操作状态
                answerDialog:false,
                addQuestionValue: null,
                addAnswerValue: null,
                sort: 1,
                questionAnswerDialog: false,
                start: 1,
                perPage: 15,
                searchValue: '',
                tableData: [],
                total: 0,
                activeName: 'setting'
            };
        },
        filters:{
            answerStatus(val){
                if(val){
                    return '已回答';
                }else{
                    return '待回答';
                }
            }
        },
        created() {
            if(this.$route.query.type === 'notIdentifiedClass'){
                this.$emit('getMeteData', this.$Bre.breadCrumbs([0, 3, 35]), '答疑管理');
            }else if(this.$route.query.type === 'takeClass'){
                this.$emit('getMeteData', this.$Bre.breadCrumbs([0, 3, 36]), '答疑管理');
            }else {
                this.$emit('getMeteData', this.$Bre.breadCrumbs([0, 3, 34]), '答疑管理');
            }
        },
        mounted() {
            this.tabsChange();
        },
        methods: {
            addStudentQuestion(){
                console.log(this.studentQuestionTextareaValue);
                let data = {
                    uuid:this.studentQuestionUuid,
                    answer:this.addStudentAnswerValue
                };
                this.$api.studyManage.responseAnswer(data).then(res=>{
                   console.log(res);
                    this.answerDialog = false;
                   this.tabsChange();
                });
            },
            updateDisplay(row){
                console.log(row.uuid);
                this.$api.studyManage.studentAnswerDisplayList(row.uuid).then(res=>{
                   console.log(res);
                   this.getStudentQuestions();
                });
            },
            getStudentQuestions(){
                let data = {
                    start: this.start,
                    perPage: this.perPage,
                    question: this.searchValue
                };
                this.$api.studyManage.studentAnswerQuestionList(this.$route.query.id, data).then(res=>{
                    console.log(res);
                    this.tableData = res.data.records;
                    this.total = res.data.total;

                });
            },
            editQuestionAnswer(row){
                // 回显。编辑
                this.questionAnswerDialog = true;
                this.addQuestionValue = row.question;
                this.addAnswerValue = row.answer;
                this.sort = row.sort;
            },
            addQuestionAnswer() {
                console.log(this.addQuestionValue, this.addAnswerValue, this.sort);
                if(this.addQuestionValue&&this.addAnswerValue&&this.sort){
                    if(this.doStatus){
                        // add
                        let data = {
                            question:this.addQuestionValue,
                            answer:this.addAnswerValue,
                            sort:Number(this.sort),
                            lessonsUuid:this.$route.query.id
                        };
                        this.$api.studyManage.addQuestionAnswerData(data).then(res=>{
                            console.log(res);
                            this.questionAnswerDialog = false;
                            this.getQuestions();
                        });
                    }else{
                        // edit
                        let data = {
                            question:this.addQuestionValue,
                            answer:this.addAnswerValue,
                            sort:Number(this.sort),
                            uuid:this.settingUuid
                        };
                        this.$api.studyManage.updateQuestionAnswerData(data).then(res=>{
                            console.log(res);
                            this.questionAnswerDialog = false;
                            this.getQuestions();
                        });
                    }
                }else{
                    this.$message.error('信息填写不完整');
                    return;
                }
            },
            getQuestions() {
                let data = {
                    start: this.start,
                    perPage: this.perPage,
                    question: this.searchValue
                };
                this.$api.studyManage.answerQuestionList(this.$route.query.id, data).then(res => {
                    console.log(res);
                    this.tableData = res.data.records;
                    this.total = res.data.total;
                });
            },
            deleteQuestionAnswer(row){
                this.$confirm('你确定删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 删除配置答疑
                    this.$api.studyManage.deleteQuestionAnswerData(row.uuid).then(()=>{
                        this.getQuestions();
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            tabsChange() {
                console.log(this.activeName);
                this.start = 1;
                if(this.activeName =='setting'){
                    this.getQuestions();
                    // 配置提问
                }else{
                    this.getStudentQuestions();
                    // 学生提问
                }
            },
            pageChange(val){
                this.start = val;
                if(this.activeName =='setting'){
                    this.getQuestions();
                    // 配置提问
                }else{
                    this.getStudentQuestions();
                    // 学生提问
                }
            }
        }
    };
</script>

<style scoped>
    .textareaS {
        margin: 20px 0;
    }

    .flex-bt {
        display: flex;
        justify-content: space-between;
    }

    .w300 {
        width: 300px;
        margin-right: 10px;
    }
    .block{
        display: flex;
        justify-content: flex-end;
    }
</style>
