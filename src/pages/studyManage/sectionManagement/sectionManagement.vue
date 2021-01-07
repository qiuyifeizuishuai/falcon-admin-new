<template>
    <div>
        <div class="search-form">
            <div v-if="list.length>0">
                <el-button type="warning" v-if="disabled" @click="disabled=!disabled,loadingDrag()">启动拖拽模式</el-button>
                <el-button
                    type="success"
                    v-else
                    @click="disabled=!disabled,loadingDrag(),submitDrag()"
                >保存拖拽排序
                </el-button>
            </div>
            <div>
                <el-input style="width: 240px;margin-right: 10px" v-model="search" placeholder="请输入课章/课节标题"></el-input>
                <el-button icon="el-icon-search" @click="getSectionList">搜索</el-button>
                <el-button
                    icon="el-icon-plus"
                    type="primary"
                    @click="sectionVisible=true,sectionDialogType='add',sectionDialogValue = null"
                >新增课章
                </el-button>
            </div>
        </div>
        <vuedraggable
            class="wrapper substance"
            v-model="list"
            :options="{disabled:disabled}"
            @update="listChange"
        >
            <transition-group>
                <el-card
                    v-for="(item,index) in list"
                    :key="index+'o'"
                    class="item"
                    shadow="hover"
                    style="margin-bottom: 10px"
                >
                    <el-collapse v-model="activeNames" @change="handleChange">
                        <el-collapse-item :name="'item'+index">
                            <template slot="title">
                                <div>
                                    <el-tag effect="dark">
                                        <p style="font-size: 20px;max-width: 300px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis">{{item.title}} </p>
                                    </el-tag>
                                </div>
                                <div style="margin: 0 0 0 auto">
                                    <el-button-group>
                                        <el-button
                                            type="primary"
                                            @click.stop="childrenVisible= true,childrenDialogValue=null,childrenDialogType='add',childrenDialogSectionUuid=item.uuid"
                                            icon="el-icon-plus"
                                        >新增课节
                                        </el-button>
                                        <el-button
                                            type="primary"
                                            @click.stop="sectionVisible=true,sectionDialogType='edit',sectionDialogValue = item.title,sectionUUid=item.uuid"
                                            icon="el-icon-edit"
                                        >编辑课章
                                        </el-button>
                                        <el-button
                                            type="primary"
                                            @click.stop="deleteSection(item.uuid)"
                                            icon="el-icon-delete"
                                        >删除课章
                                        </el-button>
                                    </el-button-group>
                                </div>
                            </template>
                            <vuedraggable
                                @update="childChange"
                                v-model="item.lessonsList"
                                :options="{disabled:disabled}"
                            >
                                <transition-group>
                                    <el-card
                                        shadow="hover"
                                        v-for="(lessons, index) in item.lessonsList"
                                        :key="index+'p'"
                                        class="lessons"
                                    >
                                        <el-tooltip class="item" effect="dark" content="课节标题" placement="top">
                                            <div>
                                                <el-tag>
                                                    <p style="max-width: 300px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis">{{lessons.title}}</p>
                                                </el-tag>
                                            </div>
                                        </el-tooltip>
                                        <el-tooltip class="item" effect="dark" content="授课老师" placement="top">
                                            <div>
                                                <el-tag type="info" v-if="lessons.teacher">
                                                    {{lessons.teacher.teacherName}}
                                                </el-tag>
                                                <el-tag type="info" v-else>暂无老师授课</el-tag>
                                            </div>
                                        </el-tooltip>
                                        <el-tooltip class="item" effect="dark" content="是否上传视频" placement="top">
                                            <div>
                                                <el-tag type="success" effect="dark" v-if="lessons.videoid">已上传视频</el-tag>
                                                <el-tag type="danger" effect="dark" v-else>未上传视频</el-tag>
                                            </div>
                                        </el-tooltip>
                                        <el-tooltip class="item" effect="dark" content="是否上传课件" placement="top">
                                            <div>
                                                <el-tag type="success" effect="dark" v-if="lessons.filePath">已上传课件</el-tag>
                                                <el-tag type="danger" effect="dark" v-else>未上传课件</el-tag>
                                            </div>
                                        </el-tooltip>

                                        <el-tooltip class="item" effect="dark" content="创建时间" placement="top">
                                            <div>
                                                <el-tag type="warning">{{lessons.createTime}}</el-tag>
                                            </div>
                                        </el-tooltip>
                                        <div>
                                            <el-upload
                                                class="upload-demo"
                                                action="/api/exam/upload/uploadFiles"
                                                ref="my-upload"
                                                :show-file-list="uploadDemo"
                                                :before-upload="beforeAvatarUpload"
                                                :on-error="uploadError"
                                                :on-success="uploadSuccess"
                                            >
                                                <el-button type="text" v-if="lessons.filePath" @click="upload=lessons">更新课件</el-button>
                                                <el-button type="text" @click="upload=lessons" v-else>上传课件</el-button>
                                            </el-upload>
                                            <tencentUpload :uploadType="'update'" @updateList="getSectionList" :uuid="lessons.uuid" :teacherUuid="lessons.teacher.uuid" :title="lessons.title" v-if="lessons.videoid"></tencentUpload>
                                            <tencentUpload :uploadType="'upload'" @updateList="getSectionList" :uuid="lessons.uuid" :teacherUuid="lessons.teacher.uuid" :title="lessons.title" v-else></tencentUpload>
                                            <el-button type="text" @click="$router.push({name:'answerQuestions',query:{
                                                id:lessons.uuid,
                                                type: $route.query.type
                                            }})">答疑</el-button>
                                            <el-button type="text" v-if="$route.query.type !== 'takeClass'" @click="goWork(lessons.uuid)">作业</el-button>
                                            <el-button type="text" @click="editChildrenSection(lessons)">编辑</el-button>
                                            <el-button
                                                type="text"
                                                style="color:#F56C6C"
                                                @click="deleteChildrenSection(lessons)"
                                            >删除
                                            </el-button>
                                        </div>
                                    </el-card>
                                </transition-group>
                            </vuedraggable>
                        </el-collapse-item>
                    </el-collapse>
                </el-card>
            </transition-group>
        </vuedraggable>
        <el-dialog title="课章信息" :visible.sync="sectionVisible" width="30%" center>
            <div>
                <el-input v-model="sectionDialogValue" placeholder="请输入课章标题"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
        <el-button @click="sectionVisible = false">取 消</el-button>
        <el-button type="primary" @click="sectionVisible = false,sectionAddorEdit()">确 定</el-button>
      </span>
        </el-dialog>
        <el-dialog
            class="section-chilren"
            title="新增课节"
            :visible.sync="childrenVisible"
            width="30%"
            center
        >
            <div>
                <div>课节标题</div>
                <el-input v-model="childrenDialogValue" style="width: 300px;" placeholder="请输入课节标题"></el-input>
            </div>
            <div>
                <div>授课老师</div>
                <el-select v-model="childrenDialogTeacherValue" placeholder="请选择老师">
                    <el-option
                        v-for="item in teacherOptions"
                        :key="item.uuid"
                        :label="item.teacherName"
                        :value="item.uuid"
                    ></el-option>
                </el-select>
            </div>

            <span slot="footer" class="dialog-footer">
        <el-button @click="childrenVisible = false">取 消</el-button>
        <el-button type="primary" @click="childrenVisibleAddorEdit()">确 定</el-button>
      </span>
        </el-dialog>
        <el-dialog
            class="section-chilren"
            title="编辑课节信息"
            :visible.sync="editchildrenVisible"
            width="30%"
            center
        >
            <div>
                <div>课节标题</div>
                <el-input style="width: 300px;" v-model="editchildrenDialogValue" placeholder="请输入课节标题"></el-input>
            </div>
            <div>
                <div>授课老师</div>
                <el-select v-model="editchildrenDialogTeacherValue" placeholder="请选择老师">
                    <el-option
                        v-for="item in teacherOptions"
                        :key="item.uuid"
                        :label="item.teacherName"
                        :value="item.uuid"
                    ></el-option>
                </el-select>
            </div>

            <span slot="footer" class="dialog-footer">
        <el-button @click="editchildrenVisible = false">取 消</el-button>
        <el-button type="primary" @click="editchildrenVisibleEdit()">确 定</el-button>
      </span>
        </el-dialog>
    </div>
</template>

<script>
    import vuedraggable from "vuedraggable";
    import tencentUpload from "../../../plugins/tencentUpload";

    export default {
        components: {vuedraggable, tencentUpload},

        data() {
            return {
                upload:{},
                uploadDemo: true,
                editchildrenuuid: "",
                editchildrenVisible: false,
                editchildrenDialogValue: null,
                editchildrenDialogWorkStatus: null,
                editchildrenDialogTeacherValue: null,
                childrenDialogSectionUuid: null,
                childrenDialogType: "add",
                childrenDialogVideo: null,
                childrenDialogTeacherValue: null,
                childrenDialogWorkStatus: true,
                childrenVisible: false,
                childrenDialogValue: null,
                sectionDialogValue: null,
                search: null,
                sectionDialogType: "add",
                sectionUUid: null,
                sectionVisible: false,
                disabled: true,
                activeNames: ['item0'],
                teacherOptions: [],
                mustOptions: [
                    {
                        value: true,
                        label: "作业必须完成",
                    },
                    {
                        value: false,
                        label: "作业选择完成",
                    },
                ],
                list: [],
            };
        },
        created() {
            if(this.$route.query.type === 'notIdentifiedClass'){
                this.$emit('getMeteData', this.$Bre.breadCrumbs([0, 3, 35]), '章节管理');
            }else if(this.$route.query.type === 'takeClass'){
                this.$emit('getMeteData', this.$Bre.breadCrumbs([0, 3, 36]), '章节管理');
            }else {
                this.$emit('getMeteData', this.$Bre.breadCrumbs([0, 3, 34]), '章节管理');
            }
        },
        mounted() {
            this.getTeacher();
            this.getSectionList();
        },
        methods: {
            beforeAvatarUpload(file) {
                const isLt10M = file.size / 1024 / 1024 < 50;
                if (!isLt10M) {
                    this.$message.error('上传文件大小不能超过 50MB!');
                }
                this.uploadDemo = true;
                return isLt10M;
            },
            uploadSuccess(response){
                let data = {
                    uuid: this.upload.uuid,
                    filePath: response.data[0],
                    title:this.upload.title,
                    teacherUuid:this.upload.teacher.uuid
                };
                this.$api.section.editLessons(data).then(() => {
                    this.deleteAddGetList();
                    this.$message.success('上传成功');
                    this.uploadDemo = false;
                });
            },
            uploadError(){
                this.$message.error('上传课件失败,请刷新页面重试');
                this.getSectionList();
            },
            goWork(id) {
                if (id) {
                    this.$router.push({
                        name: "homeworkPractice",
                        query: {
                            relationId: id,
                            type: this.$route.query.type
                        },
                    });
                }
            },
            editChildrenSection(item) {
                console.log(item);
                this.editchildrenuuid = item.uuid;
                this.editchildrenVisible = true;
                this.editchildrenDialogValue = item.title;
                this.editchildrenDialogTeacherValue = item.teacher.uuid;
                this.editchildrenDialogWorkStatus = item.isJobComplete;
            },
            deleteChildrenSection(item) {
                // eslint-disable-next-line no-unused-vars
                this.$confirm('此操作将永久删除该课节, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$api.section.deleteLessons(item.uuid).then(() => {
                        this.$message.success("删除课节成功");
                        this.deleteAddGetList();
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            editchildrenVisibleEdit() {
                // 编辑课节
                let data = {
                    uuid: this.editchildrenuuid,
                    title: this.editchildrenDialogValue,
                    teacherUuid: this.editchildrenDialogTeacherValue,
                    isJobComplete: this.editchildrenDialogWorkStatus,
                };
                this.$api.section.editLessons(data).then((res) => {
                    console.log(res);
                    this.$message.success(res.message);
                    this.getSectionList();
                    this.editchildrenVisible = false;
                });
            },
            childrenVisibleAddorEdit() {
                // 新增课节
                if (
                    this.childrenDialogValue == null ||
                    this.childrenDialogTeacherValue == null
                ) {
                    this.$message.error("请先完善课节信息后在操作");
                } else {
                    if (this.childrenDialogType == "add") {
                        let data = {
                            title: this.childrenDialogValue,
                            sectionUuid: this.childrenDialogSectionUuid,
                            teacherUuid: this.childrenDialogTeacherValue,
                            isJobComplete: this.childrenDialogWorkStatus,
                        };
                        this.$api.section.addLessons(data).then((res) => {
                            console.log(res);
                            this.childrenVisible = false;
                            this.$message.success("新增课章成功");
                            this.deleteAddGetList();
                        });
                    }
                }
            },
            deleteSection(id) {
                this.$confirm('此操作将永久删除该课章, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$api.section.deleteSection(id).then((res) => {
                        console.log(res);
                        this.$message.success("删除课章成功");
                        this.deleteAddGetList();
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            sectionAddorEdit() {
                console.log(this.sectionDialogType);
                if (this.sectionDialogValue == null) {
                    this.$message.error("课章标题不能为空");
                } else {
                    if (this.sectionDialogType == "add") {
                        let data = {
                            title: this.sectionDialogValue,
                            specialtyclassUuid: this.$route.query.id,
                        };
                        this.$api.section.addSection(data).then((res) => {
                            console.log(res);
                            this.$message.success("新增课章成功");
                            this.deleteAddGetList();

                        });
                    } else {
                        let data = {
                            title: this.sectionDialogValue,
                            uuid: this.sectionUUid,
                        };
                        this.$api.section.updateSectionTitle(data).then((res) => {
                            console.log(res);
                            this.$message.success("编辑课章成功");
                            this.getSectionList();
                        });
                    }
                }
            },
            submitDrag() {
                // drag Save
                this.$api.section.updateSection(this.list).then((res) => {
                    console.log(res);
                    this.getSectionList();
                });
            },
            deleteAddGetList() {
                //删除或者添加的时候 渲染表格必须调用这个方法
                let data = {
                    conditionModel: {
                        title: this.search,
                        specialtyclassUuid: this.$route.query.id,
                    },
                };
                // eslint-disable-next-line no-unused-vars
                this.$api.section.getSetting(data).then((res) => {
                    // console.log(res);
                    this.list = res.data.records;
                    console.log(this.list);
                    this.$api.section.updateSection(this.list).then();
                    // this.submitDrag();
                });
            },
            getSectionList() {
                let data = {
                    conditionModel: {
                        title: this.search,
                        specialtyclassUuid: this.$route.query.id,
                    },
                };
                // eslint-disable-next-line no-unused-vars
                this.$api.section.getSetting(data).then((res) => {
                    // console.log(res);
                    this.list = res.data.records;
                    console.log(this.list);
                    // this.submitDrag();
                });
            },
            // eslint-disable-next-line no-unused-vars
            listChange(evt) {
                console.log(this.list);
            },
            childChange() {
                console.log(this.list);
            },
            handleChange(val) {
                console.log(val);
            },
            loadingDrag() {
                const loading = this.$loading({
                    lock: true,
                    text: "启动拖拽模块中...",
                    spinner: "el-icon-loading",
                    background: "rgba(0, 0, 0, 0.7)",
                });
                setTimeout(() => {
                    loading.close();
                    this.$message.success("已启动拖拽，请长按卡片进行拖拽，完成后请保存");
                }, 500);
            },
            getTeacher() {
                let data = {
                    conditionModel:{
                        schoolUuid:this.$route.query.schoolUuid,
                        teacherType:'shangke'
                    }
                };
                this.$api.account.getTeacherList(data).then((res) => {
                    console.log(res);
                    this.teacherOptions = res.data;
                });
            },
        },
    };
</script>

<style scoped>
    /deep/ .el-collapse-item__wrap {
        border: 0;
    }

    /deep/ .el-collapse-item__header {
        line-height: 0px;
        border-bottom: 0px;
        font-size: 18px;
    }

    .lessons {
        margin: 5px 0px;
    }

    .el-card__body > div {
        font-size: 14px;
        text-align: center;
        flex: 1 !important;
    }

    .search-form {
        display: flex;
        justify-content: space-between;
        padding: 0 15px;
        align-items: center;
    }

    /deep/ .el-collapse-item__arrow {
        display: none;
    }

    /deep/ .el-collapse {
        border: 0 !important;
    }

    .section-chilren div {
        margin-bottom: 10px;
        align-items: center;
        display: flex;
        justify-content: space-between;
    }

    /deep/ .el-card__body {
        display: flex !important;
        align-items: center;
        padding: 2px 5px 2px 20px;
    }

    .lessons div {

    }
</style>
