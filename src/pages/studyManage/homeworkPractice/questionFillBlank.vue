<!--填空题-->
<template>
  <div class="falcon-choice-fillblank">
    <el-form :model="form" ref="fillBlankForm">
        <div v-for="(itmeDos, indexDos) in form.topicDOS" :key="indexDos">
            <el-form-item label="填空题题目" :rules="{required: true}"></el-form-item>
            <el-form-item
                :prop="`topicDOS.${indexDos}.questionDetail.name`"
                :rules="{validator: validatePass, message: '请输入题目'}"
            >
                <el-row :gutter="10" type="flex">
                    <el-col :span="10">
                        <el-input
                            type="textarea"
                            rows="4"
                            v-model="itmeDos.questionDetail.name"
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

            <!-- 正确答案 -->
            <el-form-item label="正确答案" class="mab0" :rules="{required: true}">
                <el-button size="small" type="primary" @click="addDomain('right', indexDos)"
                >增加选项</el-button
                >
            </el-form-item>
            <!-- 新增正确答案 -->
            <el-form-item
                v-for="(item, index) in itmeDos.answerRight"
                :key="item.key"
                :prop="`topicDOS.${indexDos}.answerRight.${index}.name`"
                :rules="{validator: validatePass, message: '请输入正确答案'}"
            >
                <el-row :gutter="10" type="flex">
                    <el-col :span="10">
                        <el-input
                            v-model="item.name"
                            type="textarea"
                            rows="2"
                            placeholder="如答案有参考图，可点击上传，没有则不用"
                        ></el-input>
                    </el-col>

                    <el-col :span="10">
                        <div class="btn-box">
                            <el-button
                                v-if="index > 0"
                                class="mar10"
                                size="small"
                                @click.prevent="removeDomain(index, 'right', indexDos)"
                            >删除</el-button
                            >
                        </div>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="答案解析" style="margin-bottom: 0"></el-form-item>
            <el-form-item >
                <el-row :gutter="10" type="flex">
                    <el-col :span="10">
                        <el-input
                            type="textarea"
                            rows="4"
                            v-model="itmeDos.answerParse.name"
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
            <el-form-item label="本题分数" :rules="{required: true}"></el-form-item>
            <el-form-item
                :prop="`topicDOS.${indexDos}.questionScore`"
                :rules="{ message: '请输入本题分数(必须为整数)',validator: validatePass}"
            >
                <el-row :gutter="10" type="flex">
                    <el-col :span="10">
                        <el-input
                            type="text"
                            rows="4"
                            v-model="itmeDos.questionScore"
                            placeholder="请输入整数"
                        />
                    </el-col>
                </el-row>
            </el-form-item>
<<<<<<< HEAD

            <!--      <el-form-item style="margin-top: 30px">-->
            <!--        <el-button type="primary" @click="submitForm('fillBlankForm', 'jump')"-->
            <!--          >确认</el-button-->
            <!--        >-->
            <!--        <el-button v-if="!id" @click="submitForm('fillBlankForm')"-->
            <!--          >确认添加下一题</el-button-->
            <!--        >-->
            <!--        <el-button @click="cancelHandler()">取消</el-button>-->
            <!--      </el-form-item>-->
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
      // dialogImageUrl: "",
      // dialogVisible: false,
      upload: {
        auto: true,
        url: "/api/exam/upload/uploadFile",
        limit: 1,
        name: "file",
        listStyle: "picture-card",
      },
      form: {
          topicDOS: [
              {
<<<<<<< HEAD
                  id: '',
=======
                  knowledgePoint: '',
>>>>>>> development
                  relationId: "", //课节uuid 或者 试卷uuid
                  questionType: "填空题",
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
                this.$refs['fillBlankForm'].validate(async valid => {
                    rev(valid);
                });
            });
        },
    }
};
</script>

<style lang="scss" scoped>
.falcon-choice-fillblank {
  .upload-box {
    display: flex;
  }
}
/deep/
.is-required{margin-bottom: 0}
</style>

