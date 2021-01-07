<template>
    <div class="topicEntry">
        <div class="topicEntrySelect">
            <el-row :gutter="50">
                <el-form  ref="formData" :rules="rules" :model="formData">
                    <el-col :span="5">
                        <el-form-item label="请选择题型样式" prop="topicStyle">
                            <el-select v-model="formData.topicStyle" @change="topicChange" placeholder="请选择题型样式" :disabled="Boolean($route.query.questionType)">
<<<<<<< HEAD
                                <el-option label="单选题" value="单选题"></el-option>
                                <el-option label="判断题" value="判断题"></el-option>
                                <el-option label="多选题" value="多选题"></el-option>
                                <el-option label="填空题" value="填空题"></el-option>
                                <el-option v-if="topicType !== 'zuo_ye'" label="简答题" value="简答题"></el-option>
                                <el-option v-if="topicType !== 'zuo_ye'" label="一题多问" value="一题多问"></el-option>
                                <el-option v-if="topicType !== 'zuo_ye'" label="阅读判断题" value="阅读判断题"></el-option>
=======
                                <el-option label="单选题样式" value="单选题样式"></el-option>
                                <el-option label="判断题样式" value="判断题样式"></el-option>
                                <el-option label="多选题样式" value="多选题样式"></el-option>
                                <el-option label="填空题样式" value="填空题样式"></el-option>
                                <el-option v-if="topicType !== 'zuo_ye'" label="简答题样式" value="简答题样式"></el-option>
                                <el-option label="一题多问样式" value="一题多问样式"></el-option>
<!--                                <el-option v-if="topicType !== 'zuo_ye'" label="阅读判断题样式" value="阅读判断题"></el-option>-->
>>>>>>> development
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="请选择题型" prop="topicSelection">
                            <el-select
                                v-model="formData.topicSelection"
                                filterable
                                remote
                                :remote-method="remoteMethod"
                                placeholder="请输入或选择">
                                <el-option
                                    v-for="item in getTopicData"
                                    :key="item.uuid"
                                    :label="item.classifyName"
                                    :value="item.classifyName">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-row>
        </div>

        <div class="topicDry">
<!--            单选题-->
            <QuestionChoiceOne
                ref="topicType"
                :topicSelection="formData.topicSelection"
<<<<<<< HEAD
                v-if="formData.topicStyle === '单选题'" />
=======
                v-if="formData.topicStyle === '单选题样式'" />
>>>>>>> development
<!--            多选题-->
            <QuestionChoiceMultiple
                ref="topicType"
                :topicSelection="formData.topicSelection"
<<<<<<< HEAD
                v-if="formData.topicStyle === '多选题'" />
<!--            判断题-->
            <QuestionJudge
                ref="topicType"
                v-if="formData.topicStyle === '判断题' || formData.topicStyle === '阅读判断题'"
=======
                v-if="formData.topicStyle === '多选题样式'" />
<!--            判断题-->
            <QuestionJudge
                ref="topicType"
                v-if="formData.topicStyle === '判断题样式' || formData.topicStyle === '阅读判断题样式'"
>>>>>>> development
                :topicSelection="formData.topicSelection"
                :topicStyle="formData.topicStyle" />
<!--            填空题-->
            <QuestionFillBlank
                ref="topicType"
                :topicSelection="formData.topicSelection"
<<<<<<< HEAD
                v-if="formData.topicStyle === '填空题'" />
=======
                v-if="formData.topicStyle === '填空题样式'" />
>>>>>>> development
<!--            简答题-->
            <QuestionSubjective
                ref="topicType"
                :topicSelection="formData.topicSelection"
<<<<<<< HEAD
                v-if="formData.topicStyle === '简答题'" />
=======
                v-if="formData.topicStyle === '简答题样式'" />
>>>>>>> development
<!--            一题多问-->
            <QuestionAsk
                ref="topicType"
                @submitQuestionAsk="submitQuestionAsk"
                :topicSelection="formData.topicSelection"
                :topicStyle="formData.topicStyle"
<<<<<<< HEAD
                v-if="formData.topicStyle === '一题多问'" />
=======
                v-if="formData.topicStyle === '一题多问样式'" />
>>>>>>> development
        </div>
        <div class="modify-ruleForm">
            <div style="height: 30px"></div>
            <div class="buttonDiv">
                <el-button @click="routerGo">取消</el-button>
                <el-button type="primary" @click="submit('submit')">保存</el-button>
                <el-button type="primary" @click="submit('submitNext')">保存并添加下一题</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import QuestionChoiceMultiple from "./questionChoiceMultiple";
import QuestionChoiceOne from "./questionChoiceOne";
import QuestionJudge from "./questionJudge";
import QuestionFillBlank from "./questionFillBlank";
import QuestionSubjective from "./questionSubjective";
import QuestionAsk from "./questionAsk";
export default {
    name: "topicEntry",
    components: {
        QuestionChoiceMultiple,
        QuestionChoiceOne,
        QuestionJudge,
        QuestionFillBlank,
        QuestionSubjective,
        QuestionAsk
    },
    data() {
        return {
            formData: {
                topicSelection: '',
                topicStyle: ''
            },
            rules: {
                topicSelection: [
                    { required: true, message: '请选择题型', trigger: 'change' }
                ],
                topicStyle: [
                    { required: true, message: '请选择题型样式', trigger: 'change' }
                ],
            },
            getTopicData: [],
            relationId: '',
            topicType: ''
        };
    },
    created() {
        this.relationId = this.$route.query.relationId;
        this.topicType = this.$route.query.topicType;
        this.formData.topicStyle = this.$route.query.questionType;
        this.formData.topicSelection = this.$route.query.questionTypeName;
        this.getTopic();
    },
    methods: {
        // 提交
        submit(type) {
            const than = this;
            this.$refs['formData'].validate(valid => {
                if(valid) {
                    if(type === 'submit') {
<<<<<<< HEAD
                        if(this.formData.topicStyle === '单选题') than.$refs['topicType'].submitForm('choiceOneForm', 'jump');
                        if(this.formData.topicStyle === '多选题') than.$refs['topicType'].submitForm('choiceMultipleForm', 'jump');
                        if(this.formData.topicStyle === '判断题' || this.formData.topicStyle === '阅读判断题') than.$refs['topicType'].submitForm('judeForm', 'jump');
                        if(this.formData.topicStyle === '填空题') than.$refs['topicType'].submitForm('fillBlankForm', 'jump');
                        if(this.formData.topicStyle === '简答题') than.$refs['topicType'].submitForm('subjectForm', 'jump');
                        if(this.formData.topicStyle === '一题多问') {
                            than.$refs['topicType'].getListData('jump');
                        }
                    }else {
                        if(this.formData.topicStyle === '单选题') than.$refs['topicType'].submitForm('choiceOneForm');
                        if(this.formData.topicStyle === '多选题') than.$refs['topicType'].submitForm('choiceMultipleForm');
                        if(this.formData.topicStyle === '判断题' || this.formData.topicStyle === '阅读判断题') than.$refs['topicType'].submitForm('judeForm');
                        if(this.formData.topicStyle === '填空题') than.$refs['topicType'].submitForm('fillBlankForm');
                        if(this.formData.topicStyle === '简答题') than.$refs['topicType'].submitForm('subjectForm');
                        if(this.formData.topicStyle === '一题多问') {
=======
                        if(this.formData.topicStyle === '单选题样式') than.$refs['topicType'].submitForm('choiceOneForm', 'jump');
                        if(this.formData.topicStyle === '多选题样式') than.$refs['topicType'].submitForm('choiceMultipleForm', 'jump');
                        if(this.formData.topicStyle === '判断题样式' || this.formData.topicStyle === '阅读判断题') than.$refs['topicType'].submitForm('judeForm', 'jump');
                        if(this.formData.topicStyle === '填空题样式') than.$refs['topicType'].submitForm('fillBlankForm', 'jump');
                        if(this.formData.topicStyle === '简答题样式') than.$refs['topicType'].submitForm('subjectForm', 'jump');
                        if(this.formData.topicStyle === '一题多问样式') {
                            than.$refs['topicType'].getListData('jump');
                        }
                    }else {
                        if(this.formData.topicStyle === '单选题样式') than.$refs['topicType'].submitForm('choiceOneForm');
                        if(this.formData.topicStyle === '多选题样式') than.$refs['topicType'].submitForm('choiceMultipleForm');
                        if(this.formData.topicStyle === '判断题样式' || this.formData.topicStyle === '阅读判断题样式') than.$refs['topicType'].submitForm('judeForm');
                        if(this.formData.topicStyle === '填空题样式') than.$refs['topicType'].submitForm('fillBlankForm');
                        if(this.formData.topicStyle === '简答题样式') than.$refs['topicType'].submitForm('subjectForm');
                        if(this.formData.topicStyle === '一题多问样式') {
>>>>>>> development
                            than.$refs['topicType'].getListData();
                        }
                    }
                }
            });
        },
        // 返回上一级
        routerGo() {
            this.$router.go(-1);
        },
        submitQuestionAsk(type) {
            this.$refs['topicType'].submitForm('subjectForm', type);
        },
        // 获取题型数据
        async getTopic() {
            const params = {
                uuid: this.relationId,
                type: this.topicType,
            };
            const res = await this.$api.homework.getSubjectiveAll(params);
            if (res.code === 0) this.getTopicData = res.data;
        },
        // 保存题型输入的值
        remoteMethod(query) {
            this.formData.topicSelection = query;
        },
        topicChange() {
            this.formData.topicSelection = '';
        },
    }
};
</script>

<style scoped>
/*.topicEntry .topicDry{margin-top: 15px}*/
/deep/
.topicEntrySelect .el-form-item__label{width: 100%;text-align: left}
.topicEntrySelect .el-select{width: 100%;}
</style>
