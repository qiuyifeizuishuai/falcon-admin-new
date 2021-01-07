<template>
    <div class="questionAsk">
        <el-form :model="form" ref="subjectForm">
            <el-form-item
                label="一题多问题目"
                :rules="{required: true}"
            ></el-form-item>
            <el-form-item prop="content">
                <el-row>
                    <el-col :span="20">
                        <vue-editor
                            v-model="form.topicFatherDO.questionDetail.name"
                            useCustomImageHandler
                            @image-added="handleImageAdded"
                        />
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="5">
                        <el-upload
                            style="margin-top: 30px"
                            action="/api/exam/upload/uploadFile"
                            :file-list="fileList"
                            :before-upload="audioBefore"
                            :on-success="audioUpload"
<<<<<<< HEAD
                            :on-remove="removeUpload"
=======
                            :on-remove="removeAudio"
>>>>>>> development
                        >
                            <el-button type="primary" plain>点击上传音频</el-button>
                        </el-upload>
                    </el-col>
                </el-row>
            </el-form-item>
        </el-form>
        <div class="addTemplate">
            <h3 @click="getListData">题目设置 <span>注：可拖拽题目，对题目重新排序</span></h3>
            <div class="addTemplateCent">
                <div class="addTemplateCentIndex" v-for="(item, index) in addTemplate" :key="index">
                    <QuestionChoiceOne
                        ref="topicTypeIndex"
                        :indexData="index"
                        v-if="item.templateName === '单选题'"
                        :topicSelectionTo="item.templateName"/>
                    <QuestionChoiceMultiple
                        ref="topicTypeIndex"
                        :indexData="index"
                        v-if="item.templateName === '多选题'"
                        :topicSelectionTo="item.templateName"/>
                    <QuestionJudge
                        :indexData="index"
                        ref="topicTypeIndex"
                        v-if="item.templateName === '判断题' || item.templateName === '阅读判断题'"
                        :topicStyle="item.templateName"
                        :topicSelectionTo="item.templateName"/>
                    <QuestionFillBlank
                        ref="topicTypeIndex"
                        :indexData="index"
                        v-if="item.templateName === '填空题'"
                        :topicSelectionTo="item.templateName"/>
                    <QuestionSubjective
                        ref="topicTypeIndex"
                        :indexData="index"
                        v-if="item.templateName === '简答题'"
                        :topicSelectionTo="item.templateName"/>
                    <el-button @click="delListIndex(index)" class="dleIcon" type="danger" icon="el-icon-delete" circle plain></el-button>
                </div>
            </div>
            <el-popover placement="bottom" width="80" trigger="click" v-model="visible">
                <p
                    v-for="(item, key) in addLists"
                    :key="key"
                    @click="addListIndex(item)"
                >
                    <span class="falcon-link">{{ item }}</span>
                </p>
                <el-button type="primary" icon="el-icon-plus" slot="reference">新增题目</el-button>
            </el-popover>
        </div>
    </div>
</template>

<script>
import {VueEditor} from "vue2-editor";
import {questionMethods} from "@/pages/studyManage/homeworkPractice/common";
import QuestionChoiceMultiple from "./questionChoiceMultiple";
import QuestionChoiceOne from "./questionChoiceOne";
import QuestionJudge from "./questionJudge";
import QuestionFillBlank from "./questionFillBlank";
import QuestionSubjective from "./questionSubjective";
export default {
    name: "questionAsk",
    components: {
        VueEditor,
        QuestionChoiceOne,
        QuestionChoiceMultiple,
        QuestionJudge,
        QuestionFillBlank,
        QuestionSubjective,
    },
    mixins: [questionMethods],
    data() {
        return {
            visible: false,
            addTemplate: [],
<<<<<<< HEAD
            fileList: [],
            form: {
                topicDOS: [],
                topicFatherDO: {
                    id: '',
=======
            form: {
                topicDOS: [],
                topicFatherDO: {
>>>>>>> development
                    questionTypeName: '',
                    relationId: '',
                    questionType: '',
                    questionDetail: {
                        audioPath: [],
                        name: '',
                        path: []
                    }
                }
            },
            addLists: ['单选题', '判断题', '多选题', '填空题', '简答题', '阅读判断题']
        };
    },
<<<<<<< HEAD
=======
    mounted() {
      if(this.$route.query.topicType === 'zuo_ye') this.addLists.splice(4, 1);
    },
>>>>>>> development
    methods: {
        addListIndex(name) {
            const data= {templateName: name };
            this.addTemplate.push(data);
            this.visible = false;
        },
        delListIndex(index) {
            this.addTemplate.splice(index, 1);
            this.form.topicDOS.splice(index, 1);
        },
<<<<<<< HEAD
        audioBefore(file) {
            if(file.name.split('.')[1] !== 'mp3') {
                this.$message.error("上传文件必须是mp3格式");
                return false;
            }
        },
        audioUpload(data) {
           this.form.topicFatherDO.questionDetail.audioPath.push(data.data);
        },
        removeUpload(file, fileList) {
            this.form.topicFatherDO.questionDetail.audioPath = [];
            if(fileList != '') {
                fileList.forEach(val => {
                    this.form.topicFatherDO.questionDetail.audioPath.push(val.url || val.response.data);
                });
            }
        },
=======
>>>>>>> development
        handleImageAdded(file, Editor, cursorLocation, resetUploader) {
            let formData = new FormData();
            formData.append("file", file);
            this.$api.homework.uploadFile(formData).then(res => {
                if(res.code === 0) {
                    let url = res.data; // Get url from response
                    Editor.insertEmbed(cursorLocation, "image", url);
                    resetUploader();
                }
            });
        },
        getListData(type) {
            if(this.$refs.topicTypeIndex === undefined) return;
            let isTrue = [];
            this.form.topicDOS = [];
            this.$refs.topicTypeIndex.forEach(val => {
                val.validateFrom().then(res => {
                    isTrue.push(res);
                });
                setTimeout(() => {
                    if(!isTrue.includes(false)) {
                        this.form.topicDOS.push(val.form.topicDOS[0]);
                    }
                }, 100);
            });
            setTimeout(() => {
                if(!isTrue.includes(false)) {
                    this.$emit('submitQuestionAsk', type);
                }
            }, 150);
        },
    }
};
</script>

<style scoped>
.addTemplate {
    width: 100%;
    margin-top: 30px;
    padding-bottom: 20px;
}

.addTemplate h3 {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #DCDFE6;
    font-size: 16px;
    color: #333;
}

.addTemplate h3 span {
    font-size: 12px;
    margin-left: 10px;
    color: #999
}
.addTemplateCent{width: 100%;padding: 10px 0}
.addTemplateCent .addTemplateCentIndex{box-shadow: 0 0 10px rgba(0,0,0, 0.2);padding: 20px;border-radius: 10px;margin-bottom: 20px;position: relative}
.addTemplateCent .addTemplateCentIndex .dleIcon{position: absolute;right: 20px;top: 20px}

/deep/
.is-required {
    margin-bottom: 0
}

</style>
