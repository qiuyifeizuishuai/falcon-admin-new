<template>
    <div class="collegeConfig">
        <!--列表-->
        <div class="collegeConfig-list">
            <!--显示设置-->
            <div class="collegeConfig-showConfig collegeConfig-box">
                <el-card class="collegeConfig-showConfig-card">
                    <div slot="header">
                        <h2>显示设置</h2>
                    </div>
                    <div class="text item">
                        <div style="display: flex;height: 50px;align-items: center">
                            <div style="font-weight: 600">班务信息：</div>
                            <div><span>关闭&nbsp;</span>
                                <el-switch
                                    @change="hanldeSwitch('isClassService')"
                                    active-color="#13ce66"
                                    v-model="collegeConfigData.isClassService"
                                    inactive-color="#ff4949">
                                </el-switch>
                                <span>&nbsp;展示</span>
                            </div>
                        </div>
                    </div>
<!--                    <div class="text item">-->
<!--                        <div style="display: flex;height: 50px;align-items: center">-->
<!--                            <div style="font-weight: 600">授课老师：</div>-->
<!--                            <div><span>关闭&nbsp;</span>-->
<!--                                <el-switch-->
<!--                                    @change="hanldeSwitch('isGiveTeacher')"-->
<!--                                    active-color="#13ce66"-->
<!--                                    v-model="collegeConfigData.isGiveTeacher"-->
<!--                                    inactive-color="#ff4949">-->
<!--                                </el-switch>-->
<!--                                <span>&nbsp;展示</span>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
                    <div class="text item">
                        <div style="display: flex;height: 50px;align-items: center">
                            <div style="font-weight: 600">匿名投诉：</div>
                            <div><span>关闭&nbsp;</span>
                                <el-switch
                                    @change="hanldeSwitch('isMessages')"
                                    active-color="#13ce66"
                                    v-model="collegeConfigData.isMessages"
                                    inactive-color="#ff4949">
                                </el-switch>
                                <span>&nbsp;展示</span>
                            </div>
                        </div>
                    </div>
                </el-card>
            </div>
            <!--其他信息内容-->
            <div class="collegeConfig-otherGuide collegeConfig-box" v-if="false">
                <el-card class="box-card">
                    <div slot="header" class="collegeConfig-header">
                        <h2>其他信息内容</h2>
                        <span><el-button type="text" @click="handleInputSet('otherGuide')">设置</el-button>/<el-button
                            type="text" @click="handleInputModification('otherGuide')">修改</el-button></span>
                    </div>
                    <div class="collegeConfig-otherGuide-content">
                        <div class="collegeConfig-otherGuide-list">
                            <p style="font-weight: 600">学生端展示示列：</p>
                            <div class="collegeConfig-otherGuide-list-box">
                                <div style="height: 18px;margin: 0"><i></i>其他信息展示</div>
                                <el-row v-for="(value,index) in other" :key="index" style="padding: 5px 0 5px 10px">
                                    <el-col :span="2"><div class="grid-content" v-if="value !== 'undefined'"><span></span></div></el-col>
                                    <el-col :span="22"><div class="grid-content bg-purple-light" v-if="value !== 'undefined'">{{value}}</div></el-col>
                                </el-row>
                            </div>
                        </div>
                        <div class="collegeConfig-otherGuide-list collegeConfig-right">
                            <p style="margin-bottom: 20px;font-weight: 600">其他内容展示：</p>
                            <div style="border: 0" v-for="(value,index) in other" :key="index">
                                <div v-if="value !== 'undefined'">{{value}}</div>
                            </div>
                        </div>
                    </div>
                </el-card>
            </div>
            <!--告知书内容-->
            <div class="collegeConfig-notification collegeConfig-box">
                <el-card class="box-card">
                    <div slot="header" class="collegeConfig-header">
                        <h2>告知书内容</h2>
                        <span><el-button type="text" @click="handleSet('notification')">设置</el-button>/<el-button
                            type="text" @click="handleModification('notification')">修改</el-button></span>
                    </div>
                    <div class="collegeConfig-notification-content">
                        <el-input
                            readonly
                            type="textarea"
                            :rows="2"
                            v-html="collegeConfigData.notification">
                        </el-input>
                    </div>
                </el-card>
            </div>
            <!--考试须知-->
            <div class="collegeConfig-examination collegeConfig-box">
                <el-card class="box-card">
                    <div slot="header" class="collegeConfig-header">
                        <h2>考试须知</h2>
                        <span><el-button type="text" @click="handleSet('examNotice')">设置</el-button>/<el-button
                            type="text" @click="handleModification('examNotice')">修改</el-button></span>
                    </div>
                    <div class="collegeConfig-notification-content">
                        <el-input
                            readonly
                            type="textarea"
                            :rows="2"
                            v-html="collegeConfigData.examNotice">
                        </el-input>
                    </div>
                </el-card>
            </div>
            <!--报名费-->
            <div class="collegeConfig-money collegeConfig-box">
                <el-card class="box-card">
                    <div slot="header" class="collegeConfig-header">
                        <h2>报名费线下转账账户</h2>
                        <span><el-button type="text" @click="handleInputSet('money')">设置</el-button>/<el-button
                            type="text" @click="handleInputModification('money')">修改</el-button></span>
                    </div>
                    <div class="collegeConfig-money-content">
                        <div>银行名称：<span>{{collegeConfigData.bankName}}</span></div>
                        <div>银行账户：<span>{{collegeConfigData.bankNumber}}</span></div>
                        <div>开户行：<span>{{collegeConfigData.bankAddress}}</span></div>
                        <div>收款人：<span>{{collegeConfigData.payee}}</span></div>
                    </div>
                </el-card>
            </div>
            <!--富文本编辑器弹出层-->
            <Dialog :dialogTitle="dialogTitle" @dialogConfirm="dialogConfirm" ref="dialog">
                <!--富文本编辑器-->
                <vue-editor
                    :editor-toolbar="customToolbar"
                    :video="false"
                    v-model="content"
                ></vue-editor>
            </Dialog>
            <!--其他内容弹出层 -->
            <Dialog :dialogTitle="otherTitle" ref="otherGuideDialog" @dialogConfirm="otherGuideDialogConfirm">
                <div v-if="isShowInputForm">
                    <!--富文本编辑器-->
                    <el-input placeholder="请输入内容" v-model="other1.one" autocomplete="off"></el-input>
                    <el-input placeholder="请输入内容" v-model="other1.two" ></el-input>
                    <el-input placeholder="请输入内容" v-model="other1.three" ></el-input>
                </div>
                <!--这是报名费表单-->
                <el-form :model="ruleMoneyForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm"
                         v-else>
                    <el-form-item label="银行名称：" prop="bankName" :rules="[{ required: true, message: '银行名称不能为空'}]">
                        <el-input type="text" placeholder="请输入" v-model.number="ruleMoneyForm.bankName"
                                  autocomplete="off"
                                  style="width: 100%;margin-bottom: 0"></el-input>
                    </el-form-item>
                    <el-form-item label="银行账户：" prop="bankNumber"
                                  :rules="[{ required: true, message: '银行不能为空'},{ type: 'number', message: '银行必须为数字值'}]">
                        <el-input type="text" placeholder="请输入" v-model.number="ruleMoneyForm.bankNumber"
                                  autocomplete="off" style="width: 100%;margin-bottom: 0"></el-input>
                    </el-form-item>
                    <el-form-item label="开户行：" prop="bankAddress" :rules="[{ required: true, message: '开户行不能为空'}]">
                        <el-input type="text" placeholder="请输入" v-model.number="ruleMoneyForm.bankAddress"
                                  autocomplete="off"
                                  style="width: 100%;margin-bottom: 0"></el-input>
                    </el-form-item>
                    <el-form-item label="收款人：" prop="payee" :rules="[{ required: true, message: '收款人不能为空'}]">
                        <el-input type="text" placeholder="请输入" v-model.number="ruleMoneyForm.payee" autocomplete="off"
                                  style="width: 100%;margin-bottom: 0"></el-input>
                    </el-form-item>
                </el-form>
            </Dialog>
        </div>
    </div>
</template>

<script>
    import {
        getCollege,
        UpdateShowPort,
        UpdateOther,
        UpdateNotification,
        UpdateExamination,
        SetMoney
    } from "../../services/api/collegeConfig";
    //  弹出层
    import Dialog from "./Dialog";
    //  富文本编辑框
    import {VueEditor} from "vue2-editor";

    export default {
        name: "index",
        components: {Dialog, VueEditor},
        data() {
            return {
                collegeConfigData: {},
                //  其他内容
                other1: {
                  one:"",
                  two:"",
                  three:""
                },
                other:[],
                //  这是弹出层的报名费表单
                ruleMoneyForm: {
                    bankName: "",
                    bankNumber: "",
                    bankAddress: "",
                    payee: ""
                },
                // true 为其他内容 false为报名费
                isShowInputForm: true,
                otherTitle: "其他信息内容",
                dialogTitle: "告知书内容",
                //其他信息富文本编辑器配置
                otherCustomToolbar: [
                    ["bold", "italic", "underline"],
                    [{list: "ordered"}, {list: "bullet"}],
                ],
                //  富文本编辑器配置
                customToolbar: [
                    ["bold", "italic", "underline", "color", "code"],
                    [{list: "ordered"}, {list: "bullet"}],
                    ["image", "code-block"],
                    [{"header": [false, 1, 2, 3, 4, 5, 6]}]
                ],
                //  记录当前修改的是什么  作用于 ===> form表单
                currentContent: null,
                content: "",
                data:{}
            };
        },
        created() {
            this.$emit('getMeteData', this.$Bre.breadCrumbs([0, 10]));
            this.getData();
        },
        methods: {
            // 获取所有的数据
            getData() {
                getCollege().then(res => {
                    console.log(res);
                    if (res.code === 0) {
                        this.collegeConfigData = res.data;
                        // this.data = res.data;
                        this.other = res.data.other.split("\n");
                        // this.collegeConfigData = res.data;
                    } else {
                        console.log("请求失败");
                    }
                });
            },
            // 显示设置事件
            hanldeSwitch(value) {
                let obj = {};
                obj[value] = this.collegeConfigData[value];
                // 1.发送Ajax请求
                UpdateShowPort(obj).then(res => {
                    this.messageRemind(res.code);
                });
            },
            //  其他内容设置 与 报名费设置
            handleInputSet(value) {
                //otherGuide 判断是设置报名费还是 设置其他内容
                if (value === "otherGuide") {
                    this.otherTitle = "其他信息内容展示";
                    this.isShowInputForm = true;
                } else if (value === "money") {
                    this.otherTitle = "报名费线下转账户";
                            this.isShowInputForm = false;
                }
                this.$refs.otherGuideDialog.dialogVisible = true;
            },
            //  其他内容修改 与 报名费修改 事件
            handleInputModification(value) {
                if (value === "money") {
                    this.isShowInputForm = false;
                    this.otherTitle = "报名费线下转账户";
                    this.ruleMoneyForm = JSON.parse(JSON.stringify(this.collegeConfigData));
                } else {
                    this.isShowInputForm = true;
                    this.otherTitle = "其他信息内容展示";
                    this.other1.one = this.other[0];
                    this.other1.two = this.other[1];
                    this.other1.three = this.other[2];
                }
                this.$refs.otherGuideDialog.dialogVisible = true;
            },
            //  其他内容确定事件
            otherGuideDialogConfirm() {
                if (this.isShowInputForm) {
                    //  其他信息内容接口
                    let data = this.other1.one + "\n" + this.other1.two + "\n" + this.other1.three ;
                    UpdateOther({other: data}).then(res => {
                        this.messageRemind(res.code);
                    });
                    //  其他内容确定事件
                    this.other1.one="";
                    this.other1.two="";
                    this.other1.three="";
                    this.$refs.otherGuideDialog.dialogVisible = false;
                } else {
                    //  报名费确定事件
                    this.$refs["numberValidateForm"].validate((valid) => {
                        if (valid) {
                            //  报名费接口
                            SetMoney(this.ruleMoneyForm).then(res => {
                                this.messageRemind(res.code);
                            });
                            this.$refs.otherGuideDialog.dialogVisible = false;
                        } else {
                            return false;
                        }
                    });
                }
            },
            //  设置内容
            handleSet(value) {
                value === "examNotice" ? this.dialogTitle = "考试须知" : this.dialogTitle = "告知书内容";
                this.currentContent = value;
                this.$refs.dialog.dialogVisible = true;
            },
            //  修改内容
            handleModification(value) {
                value === "examNotice" ? this.dialogTitle = "考试须知" : this.dialogTitle = "告知书内容";
                //  记录当前的修改的标记
                this.currentContent = value;
                //   把当前点击的内容添加到content里面
                this.content = this.collegeConfigData[value];
                this.$refs.dialog.dialogVisible = true;
            },
            //  添加和修改告知书接口 与 添加和修改考试须知接口
            dialogConfirm() {
                if (this.currentContent === "notification") {
                    //  添加和修改告知书接口
                    let obj = {};
                    obj[this.currentContent] = this.content;
                    //  告知书接口
                    UpdateNotification(obj).then(res => {
                        console.log(res);
                        this.messageRemind(res.code);
                    });
                } else if (this.currentContent === "examNotice") {
                    //  添加和修改考试须知接口
                    let obj = {};
                    obj[this.currentContent] = this.content;
                    //  考试需求接口
                    UpdateExamination(obj).then(res => {
                        this.messageRemind(res.code);
                    });
                }
                this.content = "";
                this.$refs.dialog.dialogVisible = false;
            },
            //  请求结果返回判断
            messageRemind(code) {
                // code 0为成功 其余为失败
                if (code === 0) {
                    this.getData();
                    this.$message.success('成功');
                } else {
                    this.$message.success('失败');
                }
            },
            handleChange(value, val) {
                console.log(value);
                console.log(val);
            }
        },
    };
</script>

<style lang="scss" scoped>
    .collegeConfig {
        .collegeConfig-title {
            height: 100px;
            background-color: #FFFFFF;
            /*padding: 20px;*/

            h1 {
                margin-top: 10px;
                font-weight: 700;
            }
        }

        h2 {
            font-weight: 600;
        }

        /*列表样式*/
        .collegeConfig-list {
            /*padding: 20px;*/
        }

        /*卡片标题*/
        .collegeConfig-header {
            display: flex;
            align-items: center;

            span {
                margin-left: 10px;
                color: #0a6ebd;

                /deep/
                .el-button + .el-button {
                    margin-left: 0;
                }
            }
        }

        .collegeConfig-box {
            margin-top: 20px;
        }

        /*其他信息类容*/
        .collegeConfig-otherGuide {
            background-color: #FFFFFF;

            .collegeConfig-otherGuide-content {
                /*padding: 40px;*/
                display: flex;

                .collegeConfig-otherGuide-list {
                    padding: 40px;
                    width: 300px;

                    .collegeConfig-otherGuide-list-box {
                        border: 1px solid #cccccc;
                        /*height: 200px;*/
                        width: 200px;
                        padding: 10px;

                        i {
                            display: inline-block;
                            height: 100%;
                            width: 5px;
                            background-color: #4768FF;
                            margin-right: 10px;
                        }

                        div {
                            display: flex;
                            align-items: center;
                            /*margin: 0 20px;*/

                            span {
                                display: inline-block;
                                height: 5px;
                                width: 5px;
                                border-radius: 50%;
                                background-color: #4768FF;
                            }
                        }
                    }
                }

                .collegeConfig-right {
                    div {
                        padding: 5px 0;
                    }
                }
            }
        }

        /*!*告知书内容*!*/
        /*.collegeConfig-notification {*/
        /*}*/

        /*!*考试须知*!*/
        /*.collegeConfig-examination {*/
        /*}*/

        /*报名费模块*/
        .collegeConfig-money {
            .collegeConfig-money-content {
                div {
                    line-height: 30px;
                }
            }
        }

        /deep/
        .el-textarea__inner {
            resize: none;
            border: 0;
            height: 200px;
        }

        /deep/
        .el-dialog {
            background-color: #D7D7D7;

            .el-dialog__header {
                text-align: center;

                .el-dialog__title {
                    font-weight: 700;
                }
            }

            .el-dialog__body {
                text-align: center;

                .el-input {
                    width: 80%;
                    margin-bottom: 20px;
                }

                .quillWrapper {
                    background-color: #ffffff;
                }
            }

            .el-dialog__footer {
                text-align: center;
            }
        }
    }
</style>
