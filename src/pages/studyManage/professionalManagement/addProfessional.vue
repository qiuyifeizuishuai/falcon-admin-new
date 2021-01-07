<!-- 新增专业 -->
<template>
    <div class="addProfessional modify-ruleForm">
        <TitleName titleName="基本信息"/>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" >
            <el-row :gutter="60">
                <el-col :span="8">
                    <el-form-item label="院校" prop="schoolUuid">
                        <el-select v-model="ruleForm.schoolUuid" placeholder="请选择院校" clearable style="width: 100%;">
                            <el-option
                                v-for="item in schoolList"
                                :key="item.uuid"
                                :label="item.schoolName"
                                :value="item.uuid"
                            ></el-option>
                    </el-select>
                </el-form-item></el-col>
                <el-col :span="8"><el-form-item label="专业名称" prop="majorName">
                    <el-input
                        type="text"
                        placeholder="请输入专业名称"
                        v-model="ruleForm.majorName"
                        clearable
                    ></el-input>
                </el-form-item></el-col>
                <el-col :span="8">
                    <el-form-item label="层次" prop="level">
                        <el-select
                            v-model="ruleForm.level"
                            placeholder="请选择层次"
                            style="width: 100%;"
                        >
                            <el-option
                                v-for="item in levelOption"
                                :key="item"
                                :label="item"
                                :value="item"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="报考类型" prop="type">
                        <el-select
                            v-model="ruleForm.type"
                            placeholder="请选择报考类型"
                            style="width: 100%;"
                        >
                            <el-option
                                v-for="item in typeOption"
                                :key="item"
                                :label="item"
                                :value="item"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="学习说明" prop="explain">
                        <el-input
                            type="textarea"
                            placeholder="请输入学习说明"
                            :rows="4"
                            style="width: 50%;"
                            maxlength="255"
                            show-word-limit
                            v-model="ruleForm.explain"
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
<!--            <TitleName titleName="毕业条件" style="margin-top: 15px"/>-->
<!--            <el-form-item>-->
<!--                <div class="list">-->
<!--                    <el-checkbox class="check" v-model="ruleForm.creditSwitch">学分达到</el-checkbox>-->
<!--                    <el-input class="input" type="number" oninput = "if(value<=0) value=1" v-model="ruleForm.credit" clearable></el-input>-->
<!--                </div>-->
<!--                <div class="list">-->
<!--                    <el-checkbox class="check" v-model="ruleForm.finishSwitch">学完多少门课程</el-checkbox>-->
<!--                    <el-input class="input" type="number" oninput = "if(value<=0) value=1" v-model="ruleForm.finish" clearable></el-input>-->
<!--                </div>-->
<!--                <div class="list">-->
<!--                    <el-checkbox class="check" v-model="ruleForm.hourSwitch">达到多少学时</el-checkbox>-->
<!--                    <el-input class="input" type="number" oninput = "if(value<=0) value=1" v-model="ruleForm.hour" clearable></el-input>-->
<!--                </div>-->
<!--                <div class="list">-->
<!--                    <el-checkbox v-model="ruleForm.passSwitch">考试全部通过</el-checkbox>-->
<!--                </div>-->
<!--            </el-form-item>-->
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
    export default {
        name: "addProfessional",
        data() {
            return {
                ruleForm: {
                    passSwitch:false
                },
                rules: {
                    level: [
                        {required: true, message: "请选择层次", trigger: "change"},
                    ],
                    type: [
                        {required: true, message: "请选择报考类型", trigger: "change"},
                    ],
                    schoolUuid: [
                        {required: true, message: "请选择院校", trigger: "change"},
                    ],
                    majorName: [
                        {required: true, message: "请输入专业名称", trigger: "blur"},
                    ],
                    explain: [
                        {required: true, message: "请输入学习说明", trigger: "blur"},
                    ],
                },
                typeOption: ['成人教育', '自学考试', '其他'],
                levelOption: ['专科', '本科', '研究生', '其他'],
                isAdded: this.$route.query.isAdded,
                uuid: "",
                schoolList: [],
            };
        },
        methods: {
            submit() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        if (this.ruleForm.credit) {
                            this.ruleForm.creditSwitch = true;
                        } else {
                            this.ruleForm.creditSwitch = false;
                        }
                        if (this.ruleForm.finish) {
                            this.ruleForm.finishSwitch = true;
                        } else {
                            this.ruleForm.finishSwitch = false;
                        }
                        if (this.ruleForm.hour) {
                            this.ruleForm.hourSwitch = true ;
                        } else {
                            this.ruleForm.hourSwitch = false;
                        }
                        //  这里是判断是添加还是修改
                        if (this.isAdded == "use") {
                            this.$api.studyManage
                                .addMajor(this.ruleForm)
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
                            this.$api.studyManage
                                .updateMajor(this.ruleForm)
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
        },
        created() {
            let typeName = this.$route.query.isAdded === 'see'? '编辑/查看专业' : '新增专业';
            this.$emit('getMeteData', this.$Bre.breadCrumbs([0, 3, 32]), typeName);
        },
        mounted() {
            // 院校
            this.$api.common.schoolsList({}).then((res) => {
                if (res.code == 0) this.schoolList = res.data;
            });
            if (this.isAdded == "see") {
                this.$api.studyManage.selectMajor(this.$route.query.uuid).then((res) => {
                    if (res.code == 0) this.ruleForm = res.data;
                });
            }
        },
    };
</script>

<style lang="scss" scoped>
    .list {
        width: 400px;
        display: flex;

        .check {
            width: 45%;
        }

        .input {
            flex: 1;
            margin-left: 10px;
        }
    }
</style>
