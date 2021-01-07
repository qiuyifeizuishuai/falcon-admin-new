<!-- 新增课程 -->
<template>
  <div class="addCurriculum modify-ruleForm">
      <TitleName titleName="基本信息"/>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
    >
        <el-row :gutter="60">
            <el-col :span="8">
                <el-form-item label="院校" prop="schoolUuid" >
                    <el-select @change="schoolChange" v-model="ruleForm.schoolUuid" style="width: 100%" placeholder="请选择院校">
                        <el-option
                            v-for="item in schoolLists"
                            :key="item.uuid"
                            :label="item.schoolName"
                            :value="item.uuid"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="专业" prop="majorUuid">
                    <el-select @change="majorChange" clearable v-model="ruleForm.majorUuid" placeholder="请选择专业" style="width: 100%">
                        <el-option
                            v-for="item in majorLists"
                            :key="item.uuid"
                            :label="item.majorName"
                            :value="item.uuid"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="班级" v-if="ruleForm.type == 'elective'">
                    <el-select clearable v-model="ruleForm.gradeUuid" placeholder="请选择班级" style="width: 100%">
                        <el-option
                            v-for="item in gradeLists"
                            :key="item.uuid"
                            :label="item.gradeName"
                            :value="item.uuid"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="课程名称" prop="specialtyName">
                    <el-input type="text" placeholder="请输入课程名称" v-model="ruleForm.specialtyName" clearable/>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="课程代码" prop="codeName">
                    <el-input placeholder="请输入课程代码" v-model="ruleForm.codeName" clearable/>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="授课老师" prop="teacherUuid">
                    <el-select v-model="ruleForm.teacherUuid" placeholder="请选择授课老师" clearable style="width: 100%">
                        <el-option
                            v-for="item in teacherLists"
                            :key="item.uuid"
                            :label="item.teacherName"
                            :value="item.uuid"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8" v-if="this.$route.query.type !== 'elective'">
                <el-form-item label="学分" prop="credit">
                    <div style="display: flex;align-items: center;justify-content: space-between">
                        <el-input placeholder="请输入学分" v-model="ruleForm.credit" clearable style="width: 90%"/> 学分
                    </div>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="学习说明">
                    <el-input type="textarea" placeholder="请输入学习说明" v-model="ruleForm.studyDescription" :rows="4" maxlength="255" show-word-limit style="width: 50%;" />
                </el-form-item>
            </el-col>
        </el-row>
        <TitleName titleName="教程版本" style="margin-top: 15px"/>
      <el-form-item>
        <div style="display: flex; margin: 10px 0" v-for="(item, index) in ruleForm.textBooks" :key="index">
          <el-input v-model="item.bookName" style="width: 300px" placeholder="教材名称" />
          -
          <el-input v-model="item.version" style="width: 200px" placeholder="教材版本" />
          -
          <el-input v-model="item.author" style="width: 200px" placeholder="作者" />
          -
          <el-input v-model="item.publish" placeholder="出版社" style="width: 300px" />
          -
          <el-input v-model="item.enableTime" placeholder="启动日期" style="width: 300px" />
          <el-button style="margin-left: 10px" type="danger" @click="$delete(ruleForm.textBooks, index)">删除</el-button>
        </div>
        <div style="width: 100%; text-align: center; border: 1px #409eff dashed" @click="addVersion">添加</div>
      </el-form-item>
      <TitleName  titleName="认定成绩成绩构成(注：无考核是指，用户听完课程即完成学习)" style="margin-top: 30px"  v-if="!(this.$route.query.type === 'generalExamination' || this.$route.query.type === 'elective')"/>
        <el-form-item  v-if="!(this.$route.query.type === 'generalExamination' || this.$route.query.type === 'elective')">
            <el-radio-group v-model="ruleForm.isHaveExamine" @change="isAssessment">
                <el-radio :label="true">有考核</el-radio>
                <el-radio :label="false">无考核</el-radio>
            </el-radio-group>
        </el-form-item>
        <div v-if="!(this.$route.query.type === 'generalExamination' || this.$route.query.type === 'elective') && ruleForm.isHaveExamine">
            <el-form-item
                label="平时成绩占比："
                prop="workPercentage"
            >
                <div>
                    <el-input
                        type="number"
                        placeholder="请输入平时成绩占比"
                        v-model="ruleForm.workPercentage"
                        oninput = "if(value>100) value=100;if(value<0) value=0"
                        class="w400px"
                        style="margin-right: 5px"
                        clearable
                    />% 注：取学生平时作业的平均分
                </div>
            </el-form-item>
            <el-form-item label="考试成绩占比：" prop="testPercentage">
                <div>
                    <el-input
                        type="number"
                        placeholder="请输入考试成绩占比"
                        v-model="ruleForm.testPercentage"
                        oninput = "if(value>100) value=100;if(value<0) value=0"
                        class="w400px"
                        clearable
                        style="margin-right: 5px"
                    />% 注：取学生考试的最终成绩
                </div>
            </el-form-item>
            <el-form-item label="听课学时占比：" prop="lessonsPercentage">
                <div>
                    <el-input
                        type="number"
                        placeholder="请输入听课学时占比"
                        v-model="ruleForm.lessonsPercentage"
                        oninput = "if(value>100) value=100;if(value<0) value=0"
                        class="w400px"
                        clearable
                        style="margin-right: 5px"
                    />% 注：3项占比的和必须为100%
                </div>
            </el-form-item>
        </div>

<!--      <el-form-item class="grade" v-if="!(this.$route.query.type == 'generalExamination' + '') && ruleForm.isHaveExamine">-->
<!--&lt;!&ndash;        <div>&ndash;&gt;-->
<!--&lt;!&ndash;          课程总成绩：&ndash;&gt;-->
<!--&lt;!&ndash;          <el-input&ndash;&gt;-->
<!--&lt;!&ndash;            type="number"&ndash;&gt;-->
<!--&lt;!&ndash;            placeholder="请输入课程总成绩"&ndash;&gt;-->
<!--&lt;!&ndash;            v-model="ruleForm.scoreTotal"&ndash;&gt;-->
<!--&lt;!&ndash;            oninput = "if(value<0) value=1"&ndash;&gt;-->
<!--&lt;!&ndash;            class="w400px"&ndash;&gt;-->
<!--&lt;!&ndash;            style="margin-right: 5px"&ndash;&gt;-->
<!--&lt;!&ndash;            clearable&ndash;&gt;-->
<!--&lt;!&ndash;          />分 注：课程总成绩按照60%为及格分数&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--        <div>-->
<!--          平时成绩占比：-->
<!--          <el-input-->
<!--            type="number"-->
<!--            placeholder="请输入平时成绩占比"-->
<!--            v-model="ruleForm.workPercentage"-->
<!--            oninput = "if(value>100) value=100;if(value<0) value=0"-->
<!--            class="w400px"-->
<!--            style="margin-right: 5px"-->
<!--            clearable-->
<!--          />% 注：取学生平时作业的平均分-->
<!--        </div>-->
<!--        <div>-->
<!--          考试成绩占比：-->
<!--          <el-input-->
<!--            type="number"-->
<!--            placeholder="请输入考试成绩占比"-->
<!--            v-model="ruleForm.testPercentage"-->
<!--            oninput = "if(value>100) value=100;if(value<0) value=0"-->
<!--            class="w400px"-->
<!--            clearable-->
<!--            style="margin-right: 5px"-->
<!--          />% 注：取学生考试的最终成绩-->
<!--        </div>-->
<!--        <div>-->
<!--          听课学时占比：-->
<!--          <el-input-->
<!--            type="number"-->
<!--            placeholder="请输入听课学时占比"-->
<!--            v-model="ruleForm.lessonsPercentage"-->
<!--            oninput = "if(value>100) value=100;if(value<0) value=0"-->
<!--            class="w400px"-->
<!--            clearable-->
<!--            style="margin-right: 5px"-->
<!--          />% 注：3项占比的和必须为100%-->
<!--        </div>-->
<!--      </el-form-item>-->
      <TitleName titleName="学习要求" style="margin-top: 15px"/>
      <el-form-item label="日学习时长限制">
        <el-input
          placeholder="请输入日学习时长限制(填0则不限制)"
          v-model="ruleForm.dayDuration"
          class="w400px"
          type="number"
          oninput = "if(value>1440) value=1440;if(value<=0) value=0"
        />
        分钟 注：填0则为不限制
      </el-form-item>
      <el-form-item label="学时要求" prop="period">
        <el-input
          placeholder="请输入学时要求(不填则为视频总时长)"
          v-model="ruleForm.period"
          class="w400px"
          clearable
        />
        分钟
      </el-form-item>
        <el-checkbox
            class="bloack"
            v-model="ruleForm.isBeforeClass"
            label="是否必须看完上一节课程，才能观看下一节课程"
        ></el-checkbox>
        <el-checkbox
            class="bloack"
            v-model="ruleForm.isFast"
            label="是否可以快进视频"
        ></el-checkbox>
        <div class="list" style="align-items: center;margin-bottom: 10px">
            <el-checkbox class="check" v-model="ruleForm.isFace">需要人脸识别认证才计入学时</el-checkbox>
            <el-input
                class="input"
                type="number"
                oninput = "if(value<=0) value=1"
                v-model="ruleForm.faceFrequency"
                placeholder="请输入识别频率"
                clearable
            /> 分钟/次
        </div>
      <el-form-item v-if="this.$route.query.type === 'disGeneralExamination'">
          作业合格分数总分的
        <el-input
          style="width: 200px;margin-left: 10px;margin-right: 5px"
          type="number"
          clearable
          v-model="ruleForm.passScoreProportion"
          oninput = "if(value>100) value=100;if(value<=0) value=1"
          placeholder="请输入作业合格分数"
        />%
      </el-form-item>
        <div v-if="this.$route.query.type === 'disGeneralExamination'">
            <TitleName titleName="作业要求" style="margin-top: 30px"/>
            <el-form-item label="其他设置">
                <el-checkbox
                    class="bloack"
                    v-model="ruleForm.isJovComplete"
                    label="作业必须完成"
                ></el-checkbox>
                <el-checkbox
                    class="bloack"
                    v-model="ruleForm.isStudyWork"
                    label="是否需要完成学习，才能做作业"
                ></el-checkbox>
                <el-checkbox
                    class="bloack"
                    v-model="ruleForm.isBeforeWork"
                    label="是否必须完成上一节作业，才能观看下一节课程"
                ></el-checkbox>
            </el-form-item>
        </div>

      <TitleName titleName="上传课程封面" style="margin-top: 15px"/>
        <el-form-item>
            <uploadFile
                ref="imgUpload"
                :fileList="ruleForm.surfacePlot"
                @handleSuccess="imgUploadLogo"
                @handleRemove="handleRemove"
                :limit="upload.limit"
                :url="upload.url"
                :auto="upload.auto"
                name="file"
                :data="upload.data"
            ></uploadFile>
        </el-form-item>
      <el-form-item>
          <div style="height: 30px"></div>
          <div class="buttonDiv">
              <el-button type="primary" @click="submit">{{
                      isAdded == "see" ? "修改" : "新增"
                  }}</el-button>
              <el-button @click="$router.go(-1)">取消</el-button>
          </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import uploadFile from "@/plugins/upload/uploadFile";
import { mapState, mapActions } from "vuex";

export default {
  name: "addCurriculum",
  components: { uploadFile },
  data() {
    return {
      upload: {
        url: "/api/exam/upload/uploadFiles",
        auto: true,
        limit: 1,
        data: {},
      },
      ruleForm: {
        schoolUuid: "",
        majorUuid: null,
        gradeUuid: null,
        period: null,
        teacherUuid: null,
        surfacePlot  : '',
        isHaveExamine: true,
        scoreTotal: 100,
        workPercentage: "",
        textBooks: [
          /*{
            bookName: "",
            version: "",
            author: "",
            publish: "",
            enableTime: "",
          },*/
        ],
      },
      rules: {

          period:[
              {
                  pattern: /^[1-9]\d*$/,
                  message: '时间必须为正整数',
                  trigger: 'blur'
              }
          ],
        schoolUuid: [{ required: true, message: "请选择院校名称" }],
        codeName: [{ required: true, message: "请输入课程代码" }],
        workPercentage: [{ required: true, message: "请输入平时成绩占比", trigger: "blur"}],
        testPercentage: [{ required: true, message: "考试成绩占比", trigger: "blur"}],
        lessonsPercentage: [{ required: true, message: "听课学时占比", trigger: "blur"}],
        majorUuid: [
          {
            required: this.$route.query.type == "elective" ? false : true,
            message: "请选择专业",
          },
        ],
        teacherUuid: [
          {
            required: this.$route.query.type == "elective" ? false : true,
            message: "请选择授课老师",
          },
        ],
        specialtyName: [
          { required: true, message: "请输入课程名称", trigger: "blur" },
        ],
        credit: [
            {
                pattern: /^[1-9]\d*$/,
                message: '学分必须为正整数',
                trigger: 'blur'
            },
          {
            required: this.$route.query.type == "elective" ? false : true,
            message: "请输入学分",
            trigger: "blur",
          },
        ],
      },
      isAdded: this.$route.query.isAdded,
      //   schoolList: [],
      //   majorList: [],
      teacherList: [],
    };
  },
  computed: {
    // 院校,专业,课程
    ...mapState("school", {
      schoolLists: (state) => state.schoolLists,
      majorLists: (state) => state.majorLists,
      gradeLists: (state) => state.gradeLists,
      teacherLists: (state) => state.teacherLists,
    }),
  },
  methods: {
    ...mapActions("school", [
      "getSchoolListAction",
      "getMajorListAction",
      "getGradeListAction",
      "getTeacherAction",
    ]),
    isAssessment(val) {
        this.ruleForm.isHaveExamine = val;
    },
    addVersion() {
      let obj = {
        bookName: "",
        version: "",
        author: "",
        publish: "",
        enableTime: "",
      };
      this.ruleForm.textBooks.push(obj);
    },
    imgUploadLogo(response) {
      // this.$message.success('上传成功');
      this.ruleForm.surfacePlot = response.data[0];
    },
      handleRemove() {
          this.ruleForm.surfacePlot = '';
      },
    submit() {
        if(this.ruleForm.faceFrequency){
            this.ruleForm.isFace = true;
        }else{
            this.ruleForm.isFace = false;
        }

      this.$refs.ruleForm.validate((valid) => {
          this.ruleForm.scoreTotal = 100;
        if (valid) {
            // if(this.ruleForm.isHaveExamine) {
            //     if((this.ruleForm.workPercentage + this.ruleForm.lessonsPercentage) > 0){
            //         if(!this.ruleForm.scoreTotal){
            //             this.$message.warning('请填写课程总成绩');
            //             return false;
            //         }
            //     }
            // }
            if(this.ruleForm.type != 'generalExamination'){
                if(this.ruleForm.isHaveExamine) {
                    if((this.ruleForm.workPercentage + this.ruleForm.lessonsPercentage) > 0){
                        if(!this.ruleForm.scoreTotal){
                            this.$message.warning('请填写课程总成绩');
                            return false;
                        }
                    }
                }
            }
          if (this.isAdded == "use") {
            this.$api.studyManage
              .addSpecialty(this.ruleForm)
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
              console.log(this.ruleForm);
            this.$api.studyManage
              .updateSpecialty(this.ruleForm)
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
    // 院校改变
    schoolChange(val) {
      this.ruleForm.majorUuid = "";
      this.ruleForm.teacherUuid = "";
      this.getMajorListAction({
        schoolUuid: val,
      });

      this.getTeacherAction({
        schoolUuid: val,
        majorUuid: "",
        type: "shangke",
      });
    },
    // 专业改变
    majorChange(val) {
      this.ruleForm.gradeUuid = "";
      this.ruleForm.teacherUuid = "";
      this.getGradeListAction({
        schoolUuid: this.ruleForm.schoolUuid,
        majorUuid: val,
      });
      this.getTeacherAction({
        schoolUuid: this.ruleForm.schoolUuid,
        majorUuid: val,
        type: "shangke",
      });
    },
  },
  created() {
      let typeName = this.$route.query.isAdded === 'see'? '编辑/查看课程' : '新增课程';
      if(this.$route.query.type === 'disGeneralExamination') {
          this.$emit('getMeteData', this.$Bre.breadCrumbs([0, 3, 34]), typeName);
      }else if(this.$route.query.type === 'elective') {
          this.ruleForm.isHaveExamine = false;
          this.$emit('getMeteData', this.$Bre.breadCrumbs([0, 3, 36]), typeName);
      }else {
          this.$emit('getMeteData', this.$Bre.breadCrumbs([0, 3, 35]), typeName);
      }
    this.getSchoolListAction();
    // 授课老师
    // this.$api.common.teacherList({}).then((res) => {
    //   if (res.code == 0) this.teacherList = res.data;
    // });
    if (this.isAdded == "see") {
      this.$api.studyManage
        .selectSpecialty(this.$route.query.uuid)
        .then((res) => {
          if (res.code == 0) {
            this.schoolChange(res.data.schoolUuid);
            this.majorChange(res.data.majorUuid);
            this.ruleForm = res.data;
          }
        });
    } else this.ruleForm.type = this.$route.query.type;
  },
};
</script>

<style lang="scss" scoped>
.bloack {
  display: block;
}
.grade {
  div {
    padding: 3px 0;
  }
}

.list {
  width: 500px;
  display: flex;

  .input {
    flex: 1;
    margin: 0 5px 0 10px;
  }
}
</style>
