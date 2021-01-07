<!--单选题-->
<template>
  <div class="falcon-choice-one">
    <!-- form -->
    <el-form :model="form" ref="choiceOneForm" >
        <div v-for="(itmeDos, indexDos) in form.topicDOS" :key="indexDos">
            <!-- 题目 -->
            <el-form-item
                label="单选题题目"
                :rules="{required: true}"
            ></el-form-item>
            <el-form-item
                :prop="`topicDOS.${indexDos}.questionDetail.name`"
                :rules="{message: '请输入题目', validator:validatePass}"
            >
                <el-row :gutter="10" type="flex">
                    <el-col :span="10">
                        <el-input
                            type="textarea"
                            rows="4"
                            v-model="itmeDos.questionDetail.name"
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
                        />
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
            <el-form-item
                label="正确答案"
                :prop="`topicDOS.${indexDos}.answerRight`"
                :rules="{
                  required: true,
                }"
            ></el-form-item>
            <el-form-item  :prop="`topicDOS.${indexDos}.answerRight.0.name`" :rules="{validator: validatePass,message: '请输入正确答案'}">
                <el-row :gutter="10" type="flex">
                    <el-col :span="10">
                        <el-input
                            type="textarea"
                            rows="4"
                            v-model="itmeDos.answerRight[0].name"
                            placeholder="如答案有参考图，可点击上传，没有则不用"
                        ></el-input>
                    </el-col>

                    <el-col :span="10">
                        <FalConUpload
                            :limit="upload.limit"
                            :url="upload.url"
                            :auto="upload.auto"
                            :fileList="itmeDos.answerRight[0].path[0]"
                            @handleSuccess="imgUploads($event, indexDos, 'answerRight', 0)"
                            @handleRemove="removeUploads($event, indexDos, 'answerRight', 0)"
                        ></FalConUpload>
                    </el-col>
                </el-row>
            </el-form-item>

            <!-- 错误答案 -->
            <el-form-item
                label="错误答案"
                class="mab0"
                :rules="[{ required: true }]"
            >
                <el-button size="small" type="primary" @click="addDomain('', indexDos)">增加选项</el-button>
            </el-form-item>

            <!-- 新增错误答案 -->
            <el-form-item
                v-for="(item, index) in itmeDos.answerError"
                :key="item.key"
                :prop="`topicDOS.${indexDos}.answerError.${index}.name`"
                :rules="{validator: validatePass, message: '请输入错误答案'}"
            >
                <el-row :gutter="10" type="flex">
                    <el-col :span="10">
                        <el-input
                            v-model="item.name"
                            type="textarea"
                            rows="3"
                            placeholder="如答案有参考图，可点击上传，没有则不用"
                        />
                    </el-col>

                    <el-col :span="10">
                        <div class="upload-box">
                            <el-button
                                v-if="index > 0"
                                class="mar10"
                                size="small"
                                @click.prevent="removeDomain(index, '', indexDos)"
                                style="height: 32px"
                            >删除</el-button
                            >
                            <FalConUpload
                                :limit="upload.limit"
                                :url="upload.url"
                                :auto="upload.auto"
                                :fileList="itmeDos.answerError[index].path[0]"
                                @handleSuccess="imgUploads($event, indexDos, 'answerError', index)"
                                @handleRemove="removeUploads($event, indexDos,'answerError', index)"
                            ></FalConUpload>
                        </div>
                    </el-col>
                </el-row>
            </el-form-item>

<!--            &lt;!&ndash; 答案解析 &ndash;&gt;-->
            <el-form-item
                label="答案解析"
                style="margin-bottom: 0"
            ></el-form-item>
            <el-form-item>
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
                            @handleSuccess="imgUpload($event, 'answerParse')"
                            @handleRemove="removeUpload($event, 'answerParse')"
                        ></FalConUpload>
                    </el-col>
                </el-row>
            </el-form-item>

            <!-- 本题分数 -->
            <el-form-item
                label="本题分数"
                :rules="{required: true}"
            ></el-form-item>
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
=======
            <el-form-item label="知识点来源" style="margin-bottom: 0"></el-form-item>
            <el-form-item>
                <el-row :gutter="10" type="flex">
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
                  topicType: "", //题目类型
                  questionType: "单选题",
                  questionTypeName: "", // 题型名称
<<<<<<< HEAD
                  questionDetail: { name: "", path: [] },
=======
                  questionDetail: { name: "", path: [], audioPath: []},
>>>>>>> development
                  answerRight: [
                      { name: "", path: [] }
                  ],
                  answerError: [
                      { name: "", path: [] },
                  ],
                  answerParse: { name: "", path: [] },
                  questionScore: "",
              }
          ]
      },
    };
  },
    methods: {
        validateFrom() {
            return new Promise(rev => {
                this.$refs['choiceOneForm'].validate( valid => {
                    rev(valid);
                });
            });
        },
    }
};
</script>
<style lang="scss" scoped>
.falcon-choice-one {
    padding-bottom: 30px;
  .upload-box {
    display: flex;
  }
}
/deep/
.is-required{margin-bottom: 0}
</style>
