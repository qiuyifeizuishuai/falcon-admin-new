<!-- 新增教师 -->
<template>
    <div class="addCurriculum modify-ruleForm">
        <TitleName titleName="基本信息"/>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
            <el-row :gutter="60">
                <el-col :span="8">
                    <el-form-item label="教师名称" prop="teacherName">
                        <el-input type="text" placeholder="请输入教师名称" v-model="ruleForm.teacherName" />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="联系电话" prop="phone">
                        <el-input placeholder="请输入联系电话" v-model="ruleForm.phone" />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="密码" prop="password">
                        <el-input
                            type="password"
                            placeholder="如不填写,则系统会随机生成密码发送至教师手机"
                            v-model="ruleForm.password"
                            show-password
                        />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="邮箱" prop="email">
                        <el-input placeholder="请输入邮箱" v-model="ruleForm.email" />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="微信号" >
                        <el-input placeholder="请输入微信号" v-model="ruleForm.wxNumber" />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="QQ">
                        <el-input placeholder="请输入QQ号" v-model="ruleForm.qqNumber" />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="通讯地址" >
                        <el-input placeholder="请填写通讯地址" v-model="ruleForm.detailed" />
                    </el-form-item>
                </el-col>
                <el-col :span="16">
                    <el-form-item label="教师类型" prop="teacherType">
                        <el-checkbox-group v-model="ruleForm.teacherType">
                            <el-checkbox
                                v-for="(item,index) in teacherType"
                                :key="index"
                                :label="item.teacherTypeName"
                                :name="item.alias"
                            />
                        </el-checkbox-group>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="教师简介">
                        <el-input
                            type="textarea"
                            :rows="4"
                            placeholder="请输入教师简介"
                            v-model="ruleForm.content"
                            style="width: 50%"
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <TitleName titleName="院校及专业选择" style="margin-top: 15px"/>
            <el-row>
                <el-col :span="12">
                    <!-- 院校及专业 -->
                    <el-form-item label="院校及专业" prop="schoolAndMajors">
                        <div class="dynamic-input" v-for="(item, index) in ruleForm.schoolAndMajors" :key="index">
                            <el-form-item
                                :prop="'schoolAndMajors.' + index+'.schoolUuid'"
                                :rules="{
                required: true,message: '请选择院校'
              }"
                            >
                                <el-select
                                    @change="schoolChange($event, index)"
                                    v-model="item.schoolUuid"
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

                            <span class="mal10 mar10">--</span>

                            <el-form-item
                                :prop="'schoolAndMajors.' + index+'.majorUuid'"
                                :rules="{
                required: true,message: '请选择专业'
              }"
                            >
                                <el-select v-model="item.majorUuid" placeholder="请选择专业" clearable>
                                    <el-option
                                        v-for="item in majorList[index]"
                                        :key="item.uuid"
                                        :label="item.majorName"
                                        :value="item.uuid"
                                    ></el-option>
                                </el-select>
                            </el-form-item>

                            <i
                                v-if="index>0"
                                class="el-icon-remove-outline mal10 f22px falcon-del-icon"
                                @click="removeDomain(index)"
                            ></i>
                        </div>

                        <el-button type="primary" @click="addDomain">新增院校及专业</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
            <TitleName titleName="上传头像" style="margin-top: 15px"/>
            <el-form-item label="头像">
                <uploadFile
                    ref="imgUpload"
                    @handleSuccess="imgUploadLogo"
                    @handleRemove="handleRemove"
                    :limit="upload.limit"
                    :url="upload.url"
                    :auto="upload.auto"
                    name="file"
                    :data="upload.data"
                    :fileList="ruleForm.headImage"
                ></uploadFile>
            </el-form-item>
            <el-form-item>
                <div style="height: 30px"></div>
                <div class="buttonDiv">
                    <el-button type="primary" @click="submit">{{isAdded == 'see' ? '修改' : '新增'}}</el-button>
                    <el-button @click="$router.go(-1)">取消</el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {mapState, mapActions} from "vuex";
    import uploadFile from "@/plugins/upload/uploadFile";

    export default {
        name: "addCurriculum",
        components: {uploadFile},
        computed: {
            // 院校,专业,班级
            ...mapState("school", {
                schoolLists: (state) => state.schoolLists,
                majorLists: (state) => state.majorLists,
            }),
        },
        data() {
            return {
                upload: {
                    url: "/api/exam/upload/uploadFiles",
                    auto: true,
                    limit: 1,
                    data: {},
                },
                ruleForm: {
                    // schools: "",
                    // majors: "",
                    teacherType: [],
                    schoolAndMajors: [
                        {
                            schoolUuid: "",
                            majorUuid: "",
                        },
                    ],
                },
                rules: {
                    email:[
                        {
                            pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                            message: '邮箱格式不对',
                            trigger: 'blur'
                        }

                    ],
                    teacherName: [{required: true, message: "请输入教师名称"}],
                    schoolAndMajors: [
                        {type: "array", required: true, message: "请输入院校及专业"},
                    ],
                    // schools: [{ required: true, message: "请选择院校" }],
                    // majors: [{ required: true, message: "请选择专业" }],
                    phone: [
                        {required: true, message: "请输入联系电话", trigger: "blur"},
                        {
                            pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
                            message: '手机号格式不对',
                            trigger: 'blur'
                        }
                    ],
                    password: [
                        {
                            pattern: /(?!^bai\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{6,14}/,
                            message: '密码必须是6-14个字符，并且只能输入英文字母和数字',
                            trigger: 'blur'
                        }
                    ],
                    teacherType: [
                        {
                            type: "array",
                            required: true,
                            message: "请选择教师类型",
                            trigger: "change",
                        },
                    ],
                },
                isAdded: this.$route.query.isAdded,
                //   schoolList: [],
                majorList: [],
                teacherType: [],
            };
        },
        methods: {
            ...mapActions("school", ["getSchoolListAction", "getMajorListAction"]),
            //   新增院校及专业
            addDomain() {
                const key = Date.now();
                this.ruleForm.schoolAndMajors.push({
                    schoolUuid: "",
                    majorUuid: "",
                    key: key,
                });

                // 专业下拉集合
                this.majorList.push([]);
            },
            // 删除错误/正确答案
            removeDomain(index) {
                if (index !== -1) {
                    this.ruleForm.schoolAndMajors.splice(index, 1);
                    this.majorList.splice(index, 1);
                }
            },
            // 院校改变
            schoolChange(val, index) {
                this.ruleForm.majors = "";
                this.getMajorListAction({
                    schoolUuid: val,
                }).then(() => {
                    // this.majorList[index] = this.majorLists;//vue不能监听通过索引改变数组值
                    this.$set(this.majorList, index, this.majorLists);
                });
            },
            submit() {
                this.$refs.ruleForm.validate((valid) => {
                    let params = [];
                    let str = [];
                    this.teacherType.map((item) => {
                        this.ruleForm.teacherType.map((i) => {
                            if (item.teacherTypeName == i) {
                                params.push(item.uuid);
                                str.push(item.alias);
                            }
                        });
                    });
                    this.ruleForm.teacherTypes = params;
                    this.ruleForm.alias = str.toString();
                    if (valid) {
                        if (this.isAdded == "use") {
                            this.$api.teacherManage
                                .addTeacher(this.ruleForm)
                                .then((res) => {
                                    if (res.code == 0) {
                                        this.$message({
                                            message: "添加成功",
                                            type: "success",
                                            duration: 1500,
                                            onClose: () => {
                                                this.$router.go(-1);
                                            },
                                        });
                                    } else {
                                        this.$message.error("添加失败,请重试!");
                                    }
                                })
                                .catch((error) => {
                                    this.$message.error(error);
                                });
                        } else {
                            this.$api.teacherManage
                                .updateTeacher(this.ruleForm)
                                .then((res) => {
                                    if (res.code == 0) {
                                        this.$message({
                                            message: "修改成功",
                                            type: "success",
                                            duration: 1500,
                                            onClose: () => {
                                                this.$router.go(-1);
                                            },
                                        });
                                    } else {
                                        this.$message.error("修改失败,请重试!");
                                    }
                                })
                                .catch((error) => {
                                    this.$message.error(error);
                                });
                        }
                    } else {
                        return false;
                    }
                });
            },
            imgUploadLogo(response) {
                this.ruleForm.headImage = response.data[0];
            },
            handleRemove() {
                this.ruleForm.headImage = '';
            }
        },
        created() {
            let typeName = this.$route.query.isAdded === 'see'? '编辑/查看老师' : '新增老师';
            this.$emit('getMeteData', this.$Bre.breadCrumbs([0, 3, 33]), typeName);
            this.getSchoolListAction();
            // 教师类型
            this.$api.teacherManage.typeTeacher().then((res) => {
                if (res.code == 0){
                    this.teacherType = res.data;
                    if (this.isAdded == "see") {
                        this.$api.teacherManage
                            .selectTeacher(this.$route.query.uuid)
                            .then((res) => {
                                if (res.code == 0) {
                                    let arrayData = [];
                                    this.teacherType.map((item) => {
                                        res.data.teacherTypes.map((i) => {
                                            if (item.uuid == i) {
                                                arrayData.push(item.teacherTypeName);
                                            }
                                        });
                                    });
                                    res.data.teacherType = arrayData;
                                    this.ruleForm = res.data;

                                    // 请求专业
                                    res.data.schoolAndMajors.forEach((item, index) => {
                                        this.schoolChange(item.schoolUuid, index);
                                    });
                                }
                            });
                    }
                }

            });

        },
    };
</script>

<style lang="scss" scoped>
    .falcon-del-icon {
        vertical-align: middle;
        color: #c0ccda;
        cursor: pointer;
    }

    .dynamic-input {
        display: flex;
        align-items: center;
        margin-bottom: 20px;

        &:last-child {
            margin-bottom: 0;
        }
    }
</style>
