<!--考试及阅卷-->
<template>
    <div class="falcon-scoring-list">
        <base-list
            ref="demoTable"
            :condition="condition"
            :datas.sync="demoList"
            :pageSearch="pageSearch"
            :isPaging="false"
            @listLoaded="listLoaded"
        >
            <el-form
                :inline="true"
                :model="condition"
                class="search-form"
                slot="search"
                label-width="80px"
            >
                <el-button type="primary" @click="setDemand">主观题选做设置</el-button>
                <el-button type="primary" @click="setCheckTeacherDialog = true"
                >设置阅卷督查老师
                </el-button
                >
                <el-button type="primary" @click="isTopicOpen">题型介绍设置</el-button>
                <Topic ref="topic" :paperUuid="$route.query.id" />
                <el-dialog
                    title="设置阅卷督查"
                    :visible.sync="setCheckTeacherDialog"
                    width="500px"
                >
                    <el-select
                        style="width: 200px; margin-left: 10px"
                        v-model="teacherCheck"
                        clearable
                        filterable
                        placeholder="请选择阅卷督查"
                    >
                        <el-option
                            v-for="item in teacherCheckList"
                            :key="item.uuid"
                            :label="item.teacherName"
                            :value="item.uuid"
                        >
                        </el-option>
                    </el-select>
                    <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="teacherCheckUpdate"
            >确定</el-button
            >
            <el-button @click="setCheckTeacherDialog = false">取 消</el-button>
          </span>
                </el-dialog>
                <div class="fr">
                    <el-form-item>
                        <el-input
                            v-model="condition.name"
                            placeholder="请输入题目"
                            @keyup.enter.native="loadData"
                        />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="loadData">搜索</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" icon="el-icon-plus" @click="jump()">新增题目</el-button>
                    </el-form-item>
                    <el-button
                        type="success"
                        icon="el-icon-plus"
                        @click="moreUploadDialog = true"
                    >批量新增
                    </el-button
                    >
                </div>
            </el-form>

            <!-- tableList -->
            <el-table slot="list" :data="demoList"  row-key="id"  stripe border >
                <el-table-column prop="topicNum" align="center" label="序号" width="70px" sortable></el-table-column>
                <el-table-column
                    prop="created_at"
                    align="center"
                    label="题目"
                    sortable
                    width="300px"
                >
                    <template slot-scope="scope" >
                        <p v-html="scope.row.questionDetail.name"></p>
                    </template>
                </el-table-column>
                <el-table-column
                    sortable
                    prop="created_at"
                    align="center"
                    label="分数"
                    width="80px"
                >
                    <template slot-scope="scope">{{ scope.row.questionScore }}</template>
                </el-table-column>
                <el-table-column sortable prop="created_at" align="center" label="题型">
                    <template slot-scope="scope">{{ scope.row.questionType }}</template>
                </el-table-column>
                <el-table-column sortable prop="created_at" align="center" label="创建人">
                    <template slot-scope="scope">{{ scope.row.createUserName }}</template>
                </el-table-column>
                <el-table-column sortable prop="created_at" align="center" label="阅卷老师">
                    <template slot-scope="scope">{{ scope.row.teacherName }}</template>
                </el-table-column>
                <el-table-column sortable prop="created_at" align="center" label="创建时间">
                    <template slot-scope="scope">{{ scope.row.createTime }}</template>
                </el-table-column>
                <el-table-column prop="created_at" align="center" label="操作" width="250px" sortable>
                    <template slot-scope="scope">
                    <span class="link falcon-link" @click="jump(scope.row.questionType, scope.row.id, scope.row.questionTypeName)">编辑/查看</span>
                        <span v-if="
                                scope.row.questionType !== '单选题' &&
                                scope.row.questionType !== '多选题' &&
                                scope.row.questionType !== '判断题' &&
                                scope.row.questionType !== '阅读判断题' &&
                                scope.row.questionType !== '填空题'
                              "
                            class="link falcon-link"
                            @click="settingTeacher(scope.row)"
                        >设置阅卷老师</span
                        >
                        <span  class="link falcon-danger mal10" @click="delOne(scope.row.id)">删除</span>
                    </template>
                </el-table-column>
            </el-table>
        </base-list>
        <el-dialog
            :visible.sync="moreUploadDialog"
            width="600px"
            :fullscreen="true"
            :before-close="handleClose"
        >
            <div
                v-if="!tableStatus"
                style="
          display: flex;
          justify-content: space-around;
          align-items: center;
          height: 100vh;
        "
            >
                <div style="text-align: center">
                    <p>1、下载模版表格，按要求填写信息</p>
                    <img src="@/assets/excel.png" class="m-b-20" alt=""/>
                    <downLoadTemplate types="topic"></downLoadTemplate>
                </div>
                <div style="text-align: center">
                    <p>2、上传文件</p>
                    <img src="@/assets/uploadPng.png" class="m-b-20" alt=""/>
                    <div>
                        <el-upload
                            class="upload-demo"
                            action="/api/exam/upload/import-excel"
                            :limit="999"
                            :data="fileName"
                            ref="uploadTemplate"
                            :headers="token"
                            :before-upload="beforeAvatarUpload"
                            :on-error="uploadError"
                            :on-success="uploadSuccess"
                        >
                            <el-button type="primary" plain>上传文件</el-button>
                        </el-upload>
                    </div>
                </div>
            </div>
            <div v-else>
                <el-table :data="errorTableData" style="width: 100%">
                    <el-table-column prop="row" label="行号" width="100">
                    </el-table-column>
                    <el-table-column prop="column" label="列号" width="100">
                    </el-table-column>
                    <el-table-column prop="errorMessage" label="错误原因">
                    </el-table-column>
                </el-table>
                <div style="text-align: center">
                    <el-upload
                        class="upload-demo"
                        action="/api/exam/upload/import-excel"
                        :limit="999"
                        :data="fileName"
                        ref="uploadTemplate"
                        :headers="token"
                        :before-upload="beforeAvatarUpload"
                        :on-error="uploadError"
                        :on-success="uploadSuccess"
                    >
                        <el-button style="margin-top: 50px" type="primary" plain
                        >重新上传
                        </el-button
                        >
                    </el-upload>
                </div>
            </div>
        </el-dialog>
        <!-- 主观题选做设置 -->
        <el-dialog
            title="主观题选做设置"
            :visible.sync="settingVisible"
            width="500px"
        >
            <el-form ref="settingForm" :model="settingForm" label-width="100px">
                <el-form-item
                    :rules="{ required: true, message: '请输入选做题数' }"
                    label="题型选择"
                    prop="chooseDoType"
                >
                    <el-select v-model="settingForm.chooseDoType" placeholder="请选择">
                        <el-option
                            v-for="(item, index) in chooseTopicData"
                            :key="index"
                            :label="item"
                            :value="item"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    :rules="{ required: true, message: '请输入选做题数' }"
                    label="选做题数"
                    prop="chooseDoNum"
                >
                    <el-input
                        clearable
                        type="number"
                        v-model="settingForm.chooseDoNum"
                    ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="settingSubmit">确定</el-button>
        <el-button @click="settingVisible = false">取 消</el-button>
      </span>
        </el-dialog>

        <!-- 设置阅卷老师 -->
        <el-dialog
            title="设置阅卷老师"
            :visible.sync="scoringVisible"
            width="500px"
        >
            <el-form ref="teacherForm" :model="teacherForm" label-width="100px">
                <el-form-item
                    :rules="{
            required: true,
            message: '请选择院校',
          }"
                    label="院校"
                    prop="collegeId"
                >
                    <el-select
                        @change="schoolChange"
                        v-model="teacherForm.collegeId"
                        clearable
                        placeholder="请选择院校"
                    >
                        <el-option
                            v-for="item in schoolLists"
                            :key="item.uuid"
                            :label="item.schoolName"
                            :value="item.uuid"
                        />
                    </el-select>
                </el-form-item>

                <el-form-item
                    label="阅卷老师"
                    :rules="{
                        required: true,
                        message: '请选择阅卷老师',
                      }"
                    prop="teacherId"
                >
                    <el-select
                        placeholder="请选择阅卷老师"
                        clearable
                        v-model="teacherForm.teacherId"
                    >
                        <el-option
                            v-for="item in readTeacher"
                            :key="item.uuid"
                            :label="item.teacherName"
                            :value="item.uuid"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="settingTeacherSubmit">确定</el-button>
        <el-button @click="scoringVisible = false">取 消</el-button>
      </span>
        </el-dialog>
    </div>
</template>

<script>
import {questionType} from "@/tools/config.js";
import {mapState, mapActions} from "vuex";
import downLoadTemplate from "@/plugins/DownLoadTemplate";
import Cookies from "js-cookie";
import Sortable from "sortablejs";
import Topic from '@/components/topic/topic';

export default {
    name: "HomeworkList",
    components: {
        downLoadTemplate,
        Topic
    },
    data() {
        return {
            // 批量上传
            token: {
                token: Cookies.get("token"),
            },
            fileName: {
                topicType: "xian_shang",
                relationId: this.$route.query.id,
            },
            errorTableData: [],
            moreUploadDialog: false,
            tableStatus: false,
            textareaTopic: "",
            //阅卷督查
            setCheckTeacherDialog: false,
            teacherCheck: null,
            teacherCheckList: [],
            // 新增题目类型
            addLists: questionType,
            demandForm: {
                total: "",
                qualified: "",
                isFinish: "是",
            },
            // table
            condition: {
                topicType: "xian_shang",
                relationId: this.$route.query.id,
                name: "", // 题目
                perPage: 999,
            },
            demoList: [],
            pageSearch: this.$api.homework.topicsGet,
            options: [],
            chooseTopicData: [],
            // settingForm
            settingVisible: false,
            settingForm: {
                uuid: this.$route.query.id,
                isOfflineExam: false,
                chooseDoNum: "",
                chooseDoType: "",
            },
            // 设置阅卷老师
            scoringVisible: false,
            teacherForm: {
                id: "",
                collegeId: "",
                teacherId: "",
                examBasicUuid: this.$route.query.id
            },
        };
    },
    computed: {
        // 院校,专业,课程
        ...mapState("school", {
            schoolLists: (state) => state.schoolLists,
            readTeacher: (state) => state.readTeacher,
        }),
    },
    created() {
        this.$emit("getMeteData", this.$Bre.breadCrumbs([0, 6, 62]), "考题及阅卷");
    },
    mounted() {
        this.getCheckTeacherList();
        this.getSchoolListAction();
        // this.getTopicData();
    },
    filters: {
        textLength(val) {
            return val.length > 100 ? val.slice(0, 100) + "..." : val;
        },
    },
    methods: {
        ...mapActions("school", ["getSchoolListAction", "getReadTeacherAction"]),
        listLoaded(data) {
            this.demoList = data.records;
            // this.rowDrop();
        },
        rowDrop() {
            const tbody = document.querySelector(".el-table__body-wrapper tbody");
            const _this = this;
            Sortable.create(tbody, {
                animation: 180,
                fallbackOnBody: true,
                filter: '.el-table__row--level-1',
                delay: 0,
                onEnd({newIndex, oldIndex}) {
                    _this.$api.homework
                        .topicNum({
                            afterTopicNum: _this.demoList[newIndex].topicNum,
                            beforeTopicNum: _this.demoList[oldIndex].topicNum,
                            relationId: _this.demoList[oldIndex].relationId,
                            topicId: _this.demoList[oldIndex].id,
                        })
                        .then((res) => {
                            if (res.code === 0) {
                                _this.$Message.success("置换成功");
                                _this.demoList = [];
                                _this.$refs.demoTable.loadData();
                            }
                        });
                },
            });
        },
        isTopicOpen() {
          this.$refs['topic'].isTopicOpen();
        },
        handleClose(done) {
            this.$confirm("确认关闭？")
                .then(() => {
                    done();
                    this.loadData();
                    this.tableStatus = false;
                })
                .catch(() => {
                });
        },
        getDataMaster() {
            this.$api.homework.getPaperBasicInfo(this.$route.query.id).then((res) => {
                if (res.code === 0) {
                    this.settingForm.chooseDoType = res.data.chooseDoType;
                    this.settingForm.chooseDoNum = res.data.chooseDoNum;
                }
            });
            // 获取主观题选做设置
            this.getTopicData();
        },
        getTopicData() {
            this.$api.homework.questionTypes(this.$route.query.id).then((res) => {
                if (res.code === 0) this.chooseTopicData = res.data;
            });
        },
        beforeAvatarUpload(file) {
            // this.$refs.uploadTemplate.clearFiles();
            const isLt10M = file.size / 1024 / 1024 < 50;
            if (!isLt10M) {
                this.$message.error("上传文件大小不能超过 50MB!");
            }
            return isLt10M;
        },
        uploadSuccess(response) {
            // console.log(response);
            if (response.data.isParseExcelSuccess) {
                this.$message.success("上传成功");
                this.tableStatus = false;
                this.moreUploadDialog = false;
                this.$refs.demoTable.loadData();
            } else {
                this.$message.error("解析失败");
                this.tableStatus = true;
                this.errorTableData = response.data.list;
                this.$refs.uploadTemplate.clearFiles();
            }
        },
        uploadError() {
            // console.log(JSON.stringify(err));
            //   let msg = JSON.stringify(err);
            //   let msg1 = JSON.parse(msg);
            // ;
            // let msg =JSON.parse().message;
            this.$message.error("导入模板错误，导入失败！");
        },
        // 刷新列表
        loadData() {
            this.$refs.demoTable.loadData();
        },
        // 删除
        delOne(id) {
            this.$confirm('此操作将永久删除该题目, 是否确认?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const params = {
                    id: id,
                };
                this.$api.homework.delTopics(params).then(res => {
                    if (res.code === 0) {
                        this.$message.success("删除成功");
                        this.loadData();
                    }else {
                        this.$message({
                            message: res.message,
                            type: "error",
                        });
                    }
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        // 主观题选作设置
        setDemand() {
            this.settingVisible = !this.settingVisible;
            if (this.settingVisible) this.getDataMaster();
        },
        settingSubmit() {
            this.$refs.settingForm.validate(async (valid) => {
                if (valid) {
                    const params = this.settingForm;
                    const data = await this.$api.testManage.setSubjectiveNum(params);
                    if (data.code == 0) {
                        {
                            this.$message({
                                message: "设置成功",
                                type: "success",
                            });
                            this.settingVisible = false;
                        }
                    } else {
                        this.$message({
                            message: data.message,
                            type: "success",
                        });
                    }
                }
            });
        },
        // 获取阅卷督查
        getCheckTeacherList() {
            this.$api.testManage
                .getCheckTeacherDetails(this.$route.query.id)
                .then((res) => {
                    this.teacherCheck = res.data.markExamUuid;
                    this.settingForm.chooseDoNum = res.data.chooseDoNum;
                });
            this.$api.testManage
                .getCheckTeacherList(this.$route.query.id)
                .then((res) => {
                    this.teacherCheckList = res.data;
                });
        },
        // 设置阅卷督查
        teacherCheckUpdate() {
            this.$api.testManage
                .setCheckTeacher(this.$route.query.id, this.teacherCheck)
                .then(() => {
                    this.$message.success("设置成功");
                    this.setCheckTeacherDialog = false;
                });
        },
        // 设置阅卷老师
        settingTeacher(row) {
            let id = row.id;
            this.scoringVisible = !this.scoringVisible;
            this.teacherForm.id = id;
            this.teacherForm.collegeId = row.collegeId;
            this.schoolChange(row.collegeId);
            this.teacherForm.teacherId = row.teacherId;
        },
        settingTeacherSubmit() {
            this.$refs.teacherForm.validate(async (valid) => {
                if (valid) {
                    const params = this.teacherForm;
                    const data = await this.$api.testManage.updateTopicTeacher(params);
                    if (data.code == 0) {
                        {
                            this.$message({
                                message: "设置成功",
                                type: "success",
                            });
                            this.scoringVisible = false;
                            this.loadData();
                        }
                    } else {
                        this.$message({
                            message: data.message,
                            type: "success",
                        });
                    }
                }
            });
        },
        // 新增题目跳转
        jump(key, id, typeName) {
            this.$router.push({
                name: 'topicEntry',
                query: {
                    id: id,
                    topicType: this.condition.topicType,
                    relationId: this.condition.relationId,
                    questionType: key,
                    questionTypeName: typeName
                },
            });
        },
        // 院校改变
        schoolChange(val) {
            this.teacherForm.teacherId = "";
            this.getReadTeacherAction({
                schoolUuid: val,
            });
        },
    },
};
</script>

<style lang="scss">
.falcon-scoring-list {
    .el-select {
        width: 100%;
    }

    .el-date-editor {
        width: 100%;
    }
}
</style>
<style lang="scss" scoped>
.falcon-scoring-list {
    .link {
        cursor: pointer;
        display: inline-block;
        margin-right: 10px;
    }
}
</style>
