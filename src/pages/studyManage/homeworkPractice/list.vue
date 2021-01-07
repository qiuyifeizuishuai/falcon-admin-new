<!--作业练习-->
<template>
    <div class="falcon-homework-list">
        <base-list
            ref="demoTable"
            :condition="condition"
            :datas.sync="demoList"
            :pageSearch="pageSearch"
            :isPaging="false"
        >
            <el-form
                :inline="true"
                :model="condition"
                class="search-form"
                slot="search"
                label-width="80px"
            >
                <div class="fr">
                    <el-form-item>
                        <el-input
                            v-model="condition.conditionModel.name"
                            placeholder="请输入题目"
                            @keyup.enter.native="loadData"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="loadData">搜索</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" icon="el-icon-plus" @click="jump()">新增题目</el-button>
                    </el-form-item>
                    <el-button type="success" @click="moreUploadDialog=true" icon="el-icon-plus">批量新增</el-button>
                </div>
            </el-form>

            <!-- tableList -->
            <el-table slot="list" :data="demoList" stripe border>
                <el-table-column prop="id" align="center" label="序号" width="70px">
                    <template slot-scope="scope">{{ scope.$index + 1 }}</template>
                </el-table-column>
                <el-table-column prop="created_at" align="center" label="题目" width="300px">
                    <template slot-scope="scope">
                        {{ scope.row.questionDetail.name | textLength }}
                    </template>
                </el-table-column>
                <el-table-column prop="created_at" align="center" label="分数">
                    <template slot-scope="scope">{{ scope.row.questionScore }}</template>
                </el-table-column>
                <el-table-column prop="created_at" align="center" label="题型">
                    <template slot-scope="scope">{{ scope.row.questionType }}</template>
                </el-table-column>
                <el-table-column prop="created_at" align="center" label="创建人">
                    <template slot-scope="scope">{{ scope.row.createUserName }}</template>
                </el-table-column>
                <el-table-column prop="created_at" align="center" label="创建时间">
                    <template slot-scope="scope">{{ scope.row.createTime }}</template>
                </el-table-column>
                <el-table-column prop="created_at" align="center" label="操作">
                    <template slot-scope="scope">
            <span
                class="link falcon-primary"
                @click="jump(scope.row.questionType, scope.row.id, scope.row.questionTypeName)"
            >编辑/</span
            >
                        <span class="link falcon-primary" @click="jump(scope.row.questionType, scope.row.id)">查看</span>
                        <el-popconfirm
                            @onConfirm="delOne(scope.row.id)"
                            confirmButtonText="确定"
                            cancelButtonText="取消"
                            title="确定删除该条数据？"
                        >
              <span slot="reference" class="link falcon-danger mal10"
              >删除</span
              >
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </base-list>
        <el-dialog
            :visible.sync="moreUploadDialog"
            width="600px"
            :fullscreen="true"
            :before-close="handleClose">
        <div v-if="!tableStatus"
                 style="display: flex;justify-content: space-around;align-items: center;height: 100vh">
                <div style="text-align: center">
                    <p>1、下载模版表格，按要求填写信息</p>
                    <img src="@/assets/excel.png" class="m-b-20" alt="">
                    <downLoadTemplate types="topic" />
                </div>
                <div style="text-align: center">
                    <p>2、上传文件</p>
                    <img src="@/assets/uploadPng.png" class="m-b-20" alt="">
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
                <el-table
                    :data="errorTableData"
                    style="width: 100%">
                    <el-table-column
                        prop="row"
                        label="行号"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        prop="column"
                        label="列号"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        prop="errorMessage"
                        label="错误原因">
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
                        <el-button style="margin-top: 50px; " type="primary" plain>重新上传</el-button>
                    </el-upload>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {questionType2} from "@/tools/config.js";
    import Cookies from "js-cookie";
    import downLoadTemplate from "@/plugins/DownLoadTemplate";
    import Sortable from "sortablejs";

    export default {
        name: "HomeworkList",
        components: {
            downLoadTemplate
        },
        data() {
            return {
                // 新增题目类型
                errorTableData: [],
                moreUploadDialog: false,
                tableStatus: false,
                addLists: questionType2,
                demandForm: {
                    total: "",
                    qualified: "",
                    isFinish: "是",
                },
                // table
                condition: {
                    conditionModel: {
                        relationId: this.$route.query.relationId, //课节uuid 或者 试卷uuid
                        topicType: "zuo_ye", //题目类型
                        name: "", // 题目
                    },
                    perPage: 999
                },
                demoList: [],
                pageSearch: this.$api.homework.getHomeworkList,
                options: [],
                // settingForm
                settingForm: {
                    uuid: this.$route.query.relationId,
                    jobTotalScore: "",
                    passScore: "",
                    isJobComplete: "true",
                },
                fileName: {
                    topicType: "zuo_ye",
                    relationId: this.$route.query.relationId
                },
                token: {
                    token: Cookies.get('token')
                }
            };
        },
        created() {
            if(this.$route.query.type === 'notIdentifiedClass'){
<<<<<<< HEAD
=======
                this.condition.conditionModel.topicType = 'lian_xi';
>>>>>>> development
                this.$emit('getMeteData', this.$Bre.breadCrumbs([0, 3, 35]), '作业管理');
            }else if(this.$route.query.type === 'takeClass'){
                this.$emit('getMeteData', this.$Bre.breadCrumbs([0, 3, 36]), '作业管理');
            }else {
                this.$emit('getMeteData', this.$Bre.breadCrumbs([0, 3, 34]), '作业管理');
            }
        },
        mounted() {
            this.getTopicScore();
            this.rowDrop();
        },
        filters: {
            textLength(val) {
                return val.length > 100? val.slice(0, 100) + '...' : val;
            }
        },
        methods: {
            rowDrop () {
                const tbody = document.querySelector('.el-table__body-wrapper tbody');
                const _this = this;
                Sortable.create(tbody, {
                    draggable: ".el-table__row",
                    animation: 180,
                    delay: 0,
                    onEnd ({ newIndex, oldIndex }) {
                        _this.$api.homework.topicNum({
                            afterTopicNum: _this.demoList[newIndex].topicNum,
                            beforeTopicNum : _this.demoList[oldIndex].topicNum,
                            relationId: _this.demoList[oldIndex].relationId,
                            topicId: _this.demoList[oldIndex].id
                        }).then(res => {
                            if(res.code === 0) {
                                _this.$Message.success('置换成功');
                                _this.demoList = [];
                                _this.$refs.demoTable.loadData();
                            }
                        });
                    }
                });
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(() => {
                        done();
                        this.loadData();
                        this.tableStatus = false;
                    }).catch(() => {});
            },
            beforeAvatarUpload(file) {
                // this.$refs.uploadTemplate.clearFiles();
                const isLt10M = file.size / 1024 / 1024 < 50;
                if (!isLt10M) {
                    this.$message.error('上传文件大小不能超过 50MB!');
                }
                return isLt10M;
            },
            uploadSuccess(response) {
                if (response.data.isParseExcelSuccess) {
                    this.$message.success('上传成功');
                    this.tableStatus = false;
                    this.moreUploadDialog = false;
                } else {
                    this.$message.error('解析失败');
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
                this.$message.error('导入模板错误，导入失败！');
            },
            // 刷新列表
            loadData() {
                this.$refs.demoTable.loadData();
            },
            // 删除
            async delOne(id) {
                const params = {
                    id: id,
                };
                const data = await this.$api.homework.delQuestion(params);

                if (data.code == 0) {
                    this.$message({
                        message: "删除成功",
                        type: "success",
                    });
                    this.loadData();
                } else {
                    this.$message({
                        message: data.message,
                        type: "error",
                    });
                }
            },
            // 新增题目跳转
            jump(key, id, typeName) {
                this.$router.push({
                    name: 'topicEntry',
                    query: {
                        id: id,
                        topicType: this.condition.conditionModel.topicType,
                        relationId: this.condition.conditionModel.relationId,
                        questionType: key,
                        questionTypeName: typeName
                    },
                });
            },
            // 作业总分数
            async getTopicScore() {
                const params = {
                    id: this.condition.conditionModel.relationId,
                };
                const res = await this.$api.homework.getTopicScore(params);
                if (res.code == 0) {
                    this.settingForm.jobTotalScore = res.data;
                }
            },
        },
    };
</script>

<style lang="scss">
    .el-radio-button__inner,
    .el-radio-group {
        vertical-align: inherit;
    }

    .upload-demo {
        display: inline-block
    }
</style>
<style lang="scss" scoped>
    .falcon-homework-list {
        .link {
            cursor: pointer;
        }
    }
</style>
