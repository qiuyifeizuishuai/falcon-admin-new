<!--判断题-->
<template>
  <div class="falcon-choice-jude">
    <el-form :model="form" ref="judeForm" >
        <div v-for="(itmeDos, indexDos) in form.topicDOS" :key="indexDos">
            <el-form-item label="判断题题目" :rules="{required: true}"></el-form-item>
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
                        ></el-input>
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
            <el-form-item label="正确答案" style="margin-bottom: 0">
                <span
                    style="color: #409EFF;font-size: 12px;cursor: pointer"
                    v-if="topicStyle === '阅读判断题'"
                    @click="isSwitch(isSwitchName)"
                >切换成{{ isSwitchName }}</span>
            </el-form-item>
            <el-form-item >
                <el-radio-group v-model="itmeDos.answerRight[0].name">
<<<<<<< HEAD
                    <el-radio :label="topicStyle === '阅读判断题'? isSwitchName === '中文'? 'True' : '正确' : '正确'">{{topicStyle === '阅读判断题'? isSwitchName === '中文'? 'True' : '正确' : '正确'}}</el-radio>
                    <el-radio :label="topicStyle === '阅读判断题'? isSwitchName === '中文'? 'False' : '错误' : '错误'">{{topicStyle === '阅读判断题'? isSwitchName === '中文'? 'False' : '错误' : '错误'}}</el-radio>
                    <el-radio label="Not Given" v-if="topicStyle === '阅读判断题'">{{isSwitchName === '中文'? 'Not Given' : '不确定'}}</el-radio>
=======
                    <el-radio :label="topicStyle === '阅读判断题样式'? isSwitchName === '中文'? 'True' : '正确' : '正确'">{{topicStyle === '阅读判断题样式'? isSwitchName === '中文'? 'True' : '正确' : '正确'}}</el-radio>
                    <el-radio :label="topicStyle === '阅读判断题样式'? isSwitchName === '中文'? 'False' : '错误' : '错误'">{{topicStyle === '阅读判断题样式'? isSwitchName === '中文'? 'False' : '错误' : '错误'}}</el-radio>
                    <el-radio label="Not Given" v-if="topicStyle === '阅读判断题样式'">{{isSwitchName === '中文'? 'Not Given' : '不确定'}}</el-radio>
>>>>>>> development
                </el-radio-group>
            </el-form-item>
            <el-form-item label="答案解析" style="margin-bottom: 0"></el-form-item>
            <el-form-item>
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
                        ></FalConUpload>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="本题分数" :rules="{required: true}"
            ></el-form-item>
            <el-form-item :prop="`topicDOS.${indexDos}.questionScore`"
                          :rules="{ message: '请输入本题分数(必须为整数)',validator: validatePass}">
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
                        ></el-input>
                    </el-col>
                </el-row>
            </el-form-item>
<<<<<<< HEAD
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
import { questionMethods } from "./common.js";
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
      upload: {
        auto: true,
        url: "/api/exam/upload/uploadFile",
        limit: 1,
        name: "file",
        listStyle: "picture-card",
      },
      isEnglish: ['True', 'False', 'Not Given'],
      isSwitchName: '中文',
      form: {
          topicDOS: [
              {
<<<<<<< HEAD
                  id: '',
=======
                  knowledgePoint: '',
>>>>>>> development
                  relationId: "", //课节uuid 或者 试卷uuid
                  questionType: "判断题",
                  topicType: "",
                  questionTypeName: "", // 题型名称
<<<<<<< HEAD
                  questionDetail: {name: "", path: []},
=======
                  questionDetail: {name: "", path: [], audioPath: []},
>>>>>>> development
                  answerRight: [
                      {name: ""},
                  ],
                  answerParse: {name: "", path: []},
                  questionScore: "",
              }
          ]
      },
    };
  },
    created() {
<<<<<<< HEAD
      this.form.topicDOS[0].answerRight[0].name = this.topicStyle === '阅读判断题'? 'True' : '正确';
      this.form.topicDOS[0].questionType = this.topicStyle === '阅读判断题'? '阅读判断题' : '判断题';
=======
      this.form.topicDOS[0].answerRight[0].name = this.topicStyle === '阅读判断题样式'? 'True' : '正确';
      this.form.topicDOS[0].questionType = this.topicStyle === '阅读判断题样式'? '阅读判断题' : '判断题';
>>>>>>> development

    },
    methods: {
        validateFrom() {
            return new Promise(rev => {
                this.$refs['judeForm'].validate(async valid => {
                    rev(valid);
                });
            });
        },
        isSwitch(type) {
            this.isSwitchName = type === '中文'?  '英文' : '中文';
        }
    }
};
</script>

<style lang="scss" scoped>
.falcon-choice-jude {
  .upload-box {
    display: flex;
  }
}
/deep/
.is-required{margin-bottom: 0}
</style>
