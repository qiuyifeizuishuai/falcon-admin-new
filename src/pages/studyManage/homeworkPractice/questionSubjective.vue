<!--主观题-->
<template>
    <div class="falcon-choice-subjective">
        <el-form :model="form" ref="subjectForm">
            <div v-for="(itmeDos, indexDos) in form.topicDOS" :key="indexDos">
                <el-form-item label="简答题题目" :rules="{required: true}"
                ></el-form-item>
                <el-form-item
                    :prop="`topicDOS.${indexDos}.questionDetail.name`"
                    :rules="{validator: validatePass,message: '请输入题目'}"
                >
                    <el-row :gutter="10" type="flex">
                        <el-col :span="10">
                            <el-input
                                v-model="itmeDos.questionDetail.name"
                                type="textarea"
                                rows="4"
                                placeholder="如题目有参考图，可点击上传，没有则不用"
                            />
                        </el-col>

                        <el-col :span="10">
                            <FalConUpload
                                :limit="upload.limit"
                                :url="upload.url"
                                :auto="upload.auto"
                                :fileList="itmeDos.questionDetail.path[0]"
                                @handleSuccess="imgUpload($event, 'questionDetail', indexDos)"
                                @handleRemove="removeUpload($event, 'questionDetail', indexDos)"
                            ></FalConUpload>
                        </el-col>
                    </el-row>
<<<<<<< HEAD
=======
                    <el-row>
                        <el-col :span="5">
                            <el-upload
                                style="margin-top: 30px"
                                action="/api/exam/upload/uploadFile"
                                :file-list="fileList"
                                :before-upload="audioBefore"
                                :on-success="audioUpload"
                                :on-remove="removeAudio"
                            >
                                <el-button type="primary" plain>点击上传音频</el-button>
                            </el-upload>
                        </el-col>
                    </el-row>
>>>>>>> development
                </el-form-item>
                <el-form-item label="答案解析" :rules="{required: true}"></el-form-item>
                <el-form-item
                    :prop="`topicDOS.${indexDos}.answerParse.name`"
                    :rules="{validator: validatePass, message: '请输入答案解析'}"
                >
                    <el-row :gutter="10" type="flex">
                        <el-col :span="10">
                            <el-input
                                v-model="itmeDos.answerParse.name"
                                type="textarea"
                                rows="4"
                                placeholder="请输入答案解析"
                            ></el-input>
                        </el-col>

                        <el-col :span="10">
                            <FalConUpload
                                :limit="upload.limit"
                                :url="upload.url"
                                :auto="upload.auto"
                                :fileList="itmeDos.answerParse.path[0]"
                                @handleSuccess="imgUpload($event, 'answerParse', indexDos)"
                                @handleRemove="removeUpload($event, 'answerParse', indexDos)"
                            />
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="得分点" :rules="{required: true}"></el-form-item>
                <el-form-item
                    v-for="(item, index) in itmeDos.scorePoints"
                    :key="index"
                >
                    <el-row>
                        <el-col :span="7">
                            <el-input v-model="item.scorePoint" type="text" rows="4" placeholder="请输入得分点内容"/>
                        </el-col>
                        <el-col :span="1" style="text-align: center;color: #999">--</el-col>
                        <el-col :span="7">
                            <el-input v-model="item.scorePointKeyWordsString" type="text" rows="4"
                                      placeholder="请输入得分关键词，多个词使用 '/' 分隔"/>
                        </el-col>
                        <el-col :span="1" style="text-align: center;color: #999">--</el-col>
                        <el-col :span="4">
                            <el-input v-model="item.scorePointsScore" type="text" rows="4" placeholder="请输入该点分值"/>
                        </el-col>
                        <el-col :span="1" v-if="index !== 0">
                            <el-button type="primary" plain style="margin-left: 10px" @click="dltScorePoint(indexDos, index)">删除</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item>
                    <el-row>
                        <el-col :span="20">
                            <div class="addScoring" @click="addScorePoint(indexDos)">+ 添加</div>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="本题分数" :rules="{required: true}"></el-form-item>
                <el-form-item
                    :prop="`topicDOS.${indexDos}.questionScore`"
                    :rules="{ message: '请输入本题分数(必须为整数)',validator: validatePass}"
                >
<<<<<<< HEAD
                    <el-row :gutter="10" type="flex" align="middle">
                        <el-col :span="5">
=======
                    <el-row type="flex" align="middle">
                        <el-col :span="10">
>>>>>>> development
                            <el-input
                                v-model="itmeDos.questionScore"
                                type="text"
                                rows="4"
                                placeholder="请输入整数"
                            />
                        </el-col>
                    </el-row>
                </el-form-item>
<<<<<<< HEAD
                <!--            <el-form-item style="margin-top: 30px">-->
                <!--                <el-button type="primary" @click="submitForm('subjectForm', 'jump')"-->
                <!--                >确认</el-button-->
                <!--                >-->
                <!--                <el-button v-if="!id" @click="addNext()">确认添加下一题</el-button>-->
                <!--                <el-button @click="cancelHandler()">取消</el-button>-->
                <!--            </el-form-item>-->
=======
                <el-form-item label="知识点来源" style="margin-bottom: 0"></el-form-item>
                <el-form-item>
                    <el-row type="flex">
                        <el-col :span="10">
                            <el-input
                                type="text"
                                rows="4"
                                v-model="itmeDos.knowledgePoint"
                                placeholder="请输入知识点来源"
                            />
                        </el-col>
                    </el-row>
                </el-form-item>
>>>>>>> development
            </div>
        </el-form>
    </div>
</template>

<script>
import {questionMethods} from "./common.js";
import FalConUpload from "@/plugins/upload/uploadFile";

export default {
    name: "ChoiceMultiple",
    mixins: [questionMethods],
    components: {
        FalConUpload,
    },
    data() {
        return {
            id: "", //路由参数id
            // dialogImageUrl: "",
            // dialogVisible: false,
            upload: {
                auto: true,
                url: "/api/exam/upload/uploadFile",
                limit: 1,
                name: "file",
                listStyle: "picture-card",
            },
            options: [],
            form: {
                topicDOS: [
                    {
<<<<<<< HEAD
                        id: '',
=======
                        knowledgePoint: '',
>>>>>>> development
                        relationId: "", //课节uuid 或者 试卷uuid
                        questionType: '简答题',
                        topicType: "",
                        questionTypeName: "", // 题型名称
<<<<<<< HEAD
                        questionDetail: {name: "", path: []},
=======
                        questionDetail: {name: "", path: [], audioPath: []},
>>>>>>> development
                        answerRight: [
                            {name: "", path: []},
                        ],
                        scorePoints: [
                            {scorePoint: "", scorePointKeyWordsString: '', scorePointsScore: ''}
                        ],
                        answerParse: {name: "", path: []},
                        questionScore: "",
                    }
                ],
            },
        };
    },
    methods: {
        validateFrom() {
            return new Promise(rev => {
                this.$refs['subjectForm'].validate(async valid => {
                    rev(valid);
                });
            });
        },
        addScorePoint(indexDos) {
<<<<<<< HEAD
            const  data = {scorePoint: "", scorePointKeyWords: '', scorePointsScore: ''};
=======
            let  data = {scorePoint: "", scorePointKeyWords: '', scorePointsScore: ''};
>>>>>>> development
            this.form['topicDOS'][indexDos].scorePoints.push(data);
        },
        dltScorePoint(indexDos, index) {
            this.form['topicDOS'][indexDos].scorePoints.splice(index,  1);
        },
        /**
         * 添加下一题
         */
        addNext() {
            this.submitForm("subjectForm");
        },
    },
};
</script>

<style lang="scss">
.falcon-choice-subjective {
    .el-upload--picture-card {
        width: 60px;
        height: 60px;
        line-height: 60px;

        .el-icon-plus {
            line-height: inherit;
        }
    }

    .el-upload-list--picture-card .el-upload-list__item {
        width: 60px;
        height: 60px;
        margin: 0 8px 8px 0;
        display: inline-block;
    }

    .addScoring {
        width: 100%;
        height: 30px;
        border: 1px dashed #c0c1c2;
        color: #999;
        line-height: 30px;
        text-align: center;
        cursor: pointer;
    }
}
</style>
<style lang="scss" scoped>
.falcon-choice-subjective {
    .upload-box {
        display: flex;
    }
}

/deep/
.is-required {
    margin-bottom: 0
}
</style>
