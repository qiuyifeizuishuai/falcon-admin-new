<!--系统消息===>发送消息-->
<template>
    <div class="sendMessage">
        <!--面包屑导航标题-->
        <div class="sendMessage-title">
            <Breadcrumb :list="['首页','消息中心','系统消息']"/>
            <h1>发送消息</h1>
        </div>
        <!--选择框-->
        <div class="sendMessage-message sendMessageBox">
            <el-form :label-position="labelPosition" label-width="80px">
                <el-form-item label="接受对象">
                    <el-radio v-model="radio" label="1" v-if="type === 'system'">发送给院校</el-radio>
                    <el-radio v-model="radio" label="2">发送给教师</el-radio>
                    <el-radio v-model="radio" label="3">发送给学生</el-radio>
                </el-form-item>
                <!--发送给院校-->
                <el-form-item v-if="radio === '1'">
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                            v-for="item in AcademyOptions"
                            :key="item.userUuid"
                            :label="item.schoolName"
                            :value="item.userUuid">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!--发送给老师-->
                <el-form-item v-else-if="radio === '2'">
                    <el-select v-model="teacherContent.schoolContent" placeholder="请选择学校" @change="handleTeacherAcademy">
                        <el-option
                            v-for="item in AcademyOptions"
                            :key="item.schoolName"
                            :label="item.schoolName"
                            :value="item.uuid">
                        </el-option>
                    </el-select>
                    <el-select v-model="teacherContent.teacherTypeContent" multiple placeholder="请选择老师类型" style="margin-left: 20px;"  @change="handleTeacherType">
                        <el-option
                            v-for="(item,index) in teacherTypeOptions"
                            :key="index"
                            :label="item.teacherTypeName"
                            :value="item.uuid">
                        </el-option>
                    </el-select>
                    <el-select v-model="teacherContent.allTeacherContent" multiple style="margin-left: 20px;" placeholder="请选择老师">
                        <el-option
                            v-for="(item,index) in TeacherName"
                            :key="index"
                            :label="item.teacherName"
                            :value="item.uuid">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!--发送给学生-->
                <el-form-item v-else-if="radio === '3'">
                    <el-select v-model="studentContent.schoolContent" placeholder="请选择院校" @change="handleStudent">
                        <el-option
                            v-for="item in AcademyOptions"
                            :key="item.uuid"
                            :label="item.schoolName"
                            :value="item.uuid">
                        </el-option>
                    </el-select>

                    <el-select
                        v-model="studentContent.majorContent" placeholder="请选择专业" @change="handleStudentMajor"
                        multiple
                        style="margin-left: 20px;">
                        <el-option
                            v-for="item in studentMajor"
                            :key="item.uuid"
                            :label="item.majorName"
                            :value="item.uuid">
                        </el-option>
                    </el-select>

                    <el-select
                        v-model="studentContent.classContent" placeholder="请选择班级"
                        multiple
                        style="margin-left: 20px;">
                        <el-option
                            v-for="item in studentName"
                            :key="item.uuid"
                            :label="item.gradeName"
                            :value="item.uuid">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="消息标题">
                    <el-input v-model="messageTitle"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <!--富文本编辑器-->
        <div class="sendMessage-vueEditor sendMessageBox">
            <el-form :label-position="labelPosition" label-width="80px">
                <el-form-item label="消息正文">
                    <vue-editor
                        :editor-toolbar="customToolbar"
                        :video="false"
                        v-model="content"
                    ></vue-editor>
                </el-form-item>
            </el-form>
        </div>
        <!--底部按钮-->
        <div class="sendMessage-bottom-button sendMessageBox">
            <el-button @click="$router.push('/rootMessage')">取消</el-button>
            <el-button type="primary" @click="handleSubmit">发送</el-button>
        </div>
    </div>
</template>

<script>
    //  富文本编辑框
    import {VueEditor} from "vue2-editor";
    import {sendAcademy, sendTeacherType, sendTeacherName, sendStudentMajor, sendStudentClass, sendSubmit} from "../../services/api/sendMessage";

    export default {
        name: "sendMessage",
        components: {VueEditor},
        data() {
            return {
                customToolbar: [
                    ["bold", "italic", "underline", "color", "code"],
                    [{list: "ordered"}, {list: "bullet"}],
                    ["image", "code-block"],
                    [{"header": [false, 1, 2, 3, 4, 5, 6]}]
                ],
                radio: window.localStorage.getItem("isSchool") === 'true' ? '2' : '1',
                labelPosition: 'left',
                //  院校列表
                AcademyOptions: [],
                //  院校消息
                AcademyContent: "全部学院",
                //  老师类型选项
                teacherTypeOptions: [],
                //  所有老师名字
                TeacherName: [],
                // 全部专业
                studentMajor: [],
                //  全部班级
                studentName: [],
                //  当前选中的院校
                value: "",
                //  发送给老师的值
                teacherContent: {
                    schoolContent: "",
                    teacherTypeContent: [],
                    allTeacherContent: []
                },
                //  发送给学生的内容
                studentContent: {
                    schoolContent: "",
                    majorContent: [],
                    classContent: []
                },
                //  消息的标题
                messageTitle: "",
                //  富文本编辑器的内容
                content: "",
                //  判断是院校还是系统
                type:""
            };
        },
        computed: {
            Deduplication() {
                let obj = {};
                return this.TeacherName.reduce((prevArr, currentItem) => {
                    obj[currentItem.uuid] ? "" : obj[currentItem.uuid] = true && prevArr.push(currentItem);
                    return prevArr;
                }, []);
            }
        },
        methods: {
            //  老师院校消息
            handleTeacherAcademy() {
                this.teacherContent.teacherTypeContent = [];
                this.teacherContent.allTeacherContent = [];
                sendTeacherType().then(res => {
                    this.teacherTypeOptions = this.isResponse(res);
                });
            },
            //  老师类型change事件
            handleTeacherType(val) {
                let data = {};
                this.TeacherName = [];
                this.teacherContent.allTeacherContent = [];
                let teacherTypes = val;
                data.schools = this.teacherContent.schoolContent;
                data.teacherTypes = teacherTypes;
                sendTeacherName(data).then(res => {
                    this.TeacherName = res.data;
                });
            },
            //  发送给学生
            handleStudent(val) {
                this.studentContent.majorContent = [];
                this.studentContent.classContent = [];
                sendStudentMajor({conditionModel:{schoolUuid:val}}).then(res => {
                    this.studentMajor = this.isResponse(res);
                });
            },
            //  学生班级
            handleStudentMajor(val) {
                this.studentName = [];
                // this.studentContent.classContent = [];
                val.forEach(value => {
                    sendStudentClass({conditionModel:{majorUuid:value}}).then(res => {
                        this.studentName.push(...this.isResponse(res));
                    });
                });
            },
            //  获取院校的选项
            getAcademyData() {
                sendAcademy().then(res => {
                    this.AcademyOptions = this.isResponse(res);
                });
            },
            //  发送消息
            handleSubmit() {
                let obj = {
                    title: this.messageTitle,
                    content: this.content,
                    receivers: [],
                    type:this.type
                };
                if (this.radio === "1") {
                    //  发送给院校
                    obj['usertype'] = "school";
                    obj['receivers'].push(this.value);
                    sendSubmit(obj).then(res => {
                        this.sendMessageResponse(res);
                    });
                } else if (this.radio === "2") {
                    //  发送给教师
                    obj['usertype'] = "teacher";
                    obj['receivers'] = this.teacherContent.allTeacherContent;
                    if (this.teacherContent.allTeacherContent.length !== 0) {
                        sendSubmit(obj).then(res => {
                            this.sendMessageResponse(res);
                        });
                    } else {
                        this.$message.error("请选择老师");
                    }
                } else {
                    //  发送给学生
                    obj['usertype'] = "student";
                    obj['receivers'] = this.studentContent.classContent;
                    if (this.studentContent.classContent.length !== 0) {
                        sendSubmit(obj).then(res => {
                            this.sendMessageResponse(res);
                        });
                    } else {
                        this.$message.error("请选择班级");
                    }
                }
            },
            //  响应结果判断
            isResponse(res) {
                if (res.code === 0) {
                    return res.data;
                } else {
                    this.$message.error('请求数据失败');
                    return [];
                }
            },
            //  发送消息返回结果判断
            sendMessageResponse(res) {
                if (res.code === 0) {
                    this.$message({
                        message: '消息发送成功',
                        type: 'success'
                    });
                    this.$router.push("/rootMessage");
                } else {
                    this.$message.error('消息发送失败');
                }
            }
        },
        created() {
            this.getAcademyData();
            //  true为院校
            if (window.localStorage.getItem("isSchool") === 'true') {
                this.type = 'college';
            } else {
                this.type = 'system';
            }
        }
    };
</script>

<style lang="scss" scoped>
    .sendMessage {
        .sendMessageBox {
            margin: 20px;
            padding: 20px;
        }

        .sendMessage-message {

            .el-select {
                margin-right: 50px;
            }

            .el-input {
                width: 50%;
            }
        }

        .sendMessage-bottom-button {
            text-align: right;
        }
    }
</style>
