<!--线上考试-->
<template>
  <div class="modify-ruleForm falcon-onlineTest-form">
    <!-- form -->
    <el-form
      :model="form"
      :rules="rules"
      ref="onlineTestForm"
      class="falcon-form"
      label-position="top"
    >
      <TitleName titleName="基本信息" />
      <el-row :gutter="60">
        <el-col :span="24">
          <el-form-item
            label="请选择院校、专业及课程"
            :rules="[{ required: true }]"
          >
            <el-row>
              <el-col :span="4">
                <el-form-item label="" prop="collageUuid">
                  <el-select
                    @change="schoolChange"
                    v-model="form.collageUuid"
                    placeholder="请选择院校"
                  >
                    <el-option
                      v-for="item in schoolLists"
                      :key="item.uuid"
                      :label="item.schoolName"
                      :value="item.uuid"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col style="text-align: center" :span="1">--</el-col>
              <el-col :span="4">
                <el-form-item label="" prop="majorUuid">
                  <el-select
                    @change="majorChange"
                    v-model="form.majorUuid"
                    placeholder="请选择专业"
                  >
                    <el-option
                      v-for="item in majorLists"
                      :key="item.uuid"
                      :label="item.majorName"
                      :value="item.uuid"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col style="text-align: center" :span="1">--</el-col>
              <el-col :span="4">
                <el-form-item label="" prop="courseUuid">
                  <el-select
                    v-model="form.courseUuid"
                    placeholder="请选择课程名称"
                  >
                    <el-option
                      v-for="item in specialtyLists"
                      :key="item.uuid"
                      :label="item.specialtyName"
                      :value="item.uuid"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="考试名称" prop="examName">
            <el-input
              v-model="form.examName"
              placeholder="请输入考试名称"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="报名费" prop="entryFree">
            <el-input
              v-model="form.entryFree"
              placeholder="请输入报名费(元)"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="考试时长" prop="examDuration">
            <el-input
              v-model.number="form.examDuration"
              placeholder="请输入考试时长(分钟)"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="试卷总分数" prop="examTotalScore">
            <el-input
              v-model.number="form.examTotalScore"
              placeholder="请输入试卷总分数"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="试卷及格分数" prop="examPassScore">
            <el-input
              v-model.number="form.examPassScore"
              placeholder="请输入试卷及格分数"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="阅卷截止时间 (阅卷截止时间不能小于今天)"
            prop="paperInspectionEndTime"
          >
            <el-date-picker
              v-model="form.paperInspectionEndTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择阅卷截止时间"
              :editable="false"
            ></el-date-picker>
            <!-- <b></b> -->
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="报考时间" prop="applyDate">
            <el-date-picker
              v-model="form.applyDate"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
            <b>报考结束时间不能小于今天</b>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="考试时间" prop="examTime">
            <el-date-picker
              v-model="form.examTime"
              type="datetimerange"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :editable="false"
            ></el-date-picker>
            <b>考试开始/结束时间不能小于今天</b>
          </el-form-item>
        </el-col>

        <el-col :span="16">
          <el-form-item label="试卷说明" prop="examExplain">
            <el-input
              v-model="form.examExplain"
              type="textarea"
              rows="5"
              placeholder="请输入试卷说明"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8"></el-col>
        <el-col :span="16">
          <el-form-item label="报考须知" prop="examRegisterNotice">
            <el-input
              v-model="form.examRegisterNotice"
              type="textarea"
              rows="5"
              placeholder="请输入报考须知"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <TitleName class="mat15" titleName="报考要求" />
      <el-row :gutter="60">
        <el-col :span="24">
          <el-row class="mab10">
            <el-col :span="3">
              <el-checkbox v-model="form.isProfessionalPeriod"
                >专业课学时</el-checkbox
              >
            </el-col>
            <el-col :span="6">
              <el-form-item prop="majorPeriodHour">
                <el-input
                  v-model="form.professionalPeriodHour"
                  oninput="if(value<=0) value=1"
                  clearable
                  type="number"
                  placeholder="请输入专业课学时要求(小时)"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

<!--          <el-row class="mab10">-->
<!--            <el-col :span="3">-->
<!--              <el-checkbox v-model="form.isMajorPeriod"-->
<!--                >专业总学时要求</el-checkbox-->
<!--              >-->
<!--            </el-col>-->
<!--            <el-col :span="6">-->
<!--              <el-form-item prop="majorPeriodHour">-->
<!--                <el-input-->
<!--                  v-model="form.majorPeriodHour"-->
<!--                  oninput="if(value<=0) value=1"-->
<!--                  clearable-->
<!--                  type="number"-->
<!--                  placeholder="请输入专业总学时要求(小时)"-->
<!--                ></el-input>-->
<!--              </el-form-item>-->
<!--            </el-col>-->
<!--          </el-row>-->

          <el-row class="mab10">
            <el-col :span="3">
              <el-checkbox v-model="form.isJobAverageScore"
                >作业平均分</el-checkbox
              >
            </el-col>
            <el-col :span="6">
              <el-form-item prop="jobAverageScore">
                <el-input
                  v-model="form.jobAverageScore"
                  oninput="if(value<=0) value=1"
                  clearable
                  type="number"
                  placeholder="请输入作业平均分"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <TitleName class="mat15" titleName="考试要求" />
      <el-row :gutter="60">
        <el-col :span="24">
          <el-form-item label="" prop="type">
            <el-row>
              <el-col :span="3">
                <el-checkbox v-model="form.isFaceFrequency"
                  >人脸识别频率</el-checkbox
                >
              </el-col>
              <el-col :span="6">
                <el-input
                  v-model="form.faceFrequency"
                  oninput="if(value<=0) value=1"
                  type="number"
                  clearable
                  placeholder="请输入识别频率（分钟/次）"
                ></el-input>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="3">
                <el-checkbox v-model="form.isFaceHighestFrequency"
                  >人脸识别最高次数</el-checkbox
                >
              </el-col>
              <el-col :span="6">
                <el-input
                  v-model="form.faceHighestFrequency"
                  oninput="if(value<=0) value=1"
                  clearable
                  type="number"
                  placeholder="请输入人脸识别最高次数"
                ></el-input>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="3">
                <el-checkbox v-model="form.isExamSubmit"
                  >提交试卷时间限制</el-checkbox
                >
              </el-col>
              <el-col :span="6">
                <el-input
                  v-model="form.examSubmitMinute"
                  clearable
                  oninput="if(value<=0) value=1"
                  type="number"
                  placeholder="不早于多少分钟"
                ></el-input>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <div style="height: 30px"></div>
        <div class="buttonDiv">
          <el-button type="primary" @click="submitForm('onlineTestForm')"
            >保存</el-button
          >
          <el-button @click="cancelHandler">取消</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { questionMethods } from "@/pages/studyManage/homeworkPractice/common";
export default {
  name: "OnlineTestAdd",
  mixins: [questionMethods],
  computed: {
    // 院校,专业,课程
    ...mapState("school", {
      schoolLists: (state) => state.schoolLists,
      majorLists: (state) => state.majorLists,
      specialtyLists: (state) => {
        return state.specialtyLists;
      },
    }),
  },
  data() {
    return {
      id: "",
      value1: "",
      // form
      form: {
        collageUuid: "",
        majorUuid: "",
        courseUuid: "",
        examName: "",
        entryFree: "",
        applyStartDate: "",
        applyEndDate: "",
        examStartTime: "",
        examEndTime: "",
        examDuration: "",
        examTotalScore: "",
        examPassScore: "",
        examExplain: "",
        isProfessionalPeriod: false,
        professionalPeriodHour: "",
        isMajorPeriod: false,
        majorPeriodHour: "",
        examRegisterNotice: "",
        isJobAverageScore: false,
        jobAverageScore: "",
        isFaceFrequency: false,
        faceFrequency: "",
        isFaceHighestFrequency: false,
        faceHighestFrequency: "",
        isExamSubmit: false,
        examSubmitMinute: "",
        offlineExamRoom: "",
        isOfflineExam: false,
        paperInspectionEndTime: "",
        applyDate: [], //报名时间范围
        examTime: [], //考试时间范围
      },
      rules: {
        paperInspectionEndTime: [{ required: true, message: "请选择截止时间" }],
        examName: [{ required: true, message: "请输入考试名称" }],
        collageUuid: [{ required: true, message: "请选择院校" }],
        majorUuid: [{ required: true, message: "请选择专业" }],
        courseUuid: [{ required: true, message: "请选择课程名称" }],
        entryFree: [
          { required: true, message: "请输入报名费" },
          {
            pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
            message: "请输入正确格式,可保留两位小数",
            trigger: "blur",
          },
        ],
        examDuration: [
          { required: true, message: "请输入考试时长" },
          {
            pattern: /^[1-9]\d*$/,
            message: "时长必须为正整数",
            trigger: "blur",
          },
        ],
        examTotalScore: [
          { required: true, message: "请输入试卷总分数" },
          {
            pattern: /^[1-9]\d*$/,
            message: "分数必须为正整数",
            trigger: "blur",
          },
        ],
        examPassScore: [
          { required: true, message: "请输入试卷及格分数" },
          {
            pattern: /^[1-9]\d*$/,
            message: "分数必须为正整数",
            trigger: "blur",
          },
        ],
        examExplain: [{ required: true, message: "请输入试卷说明" }],
        examRegisterNotice: [{ required: true, message: "请输入报考须知" }],
        applyDate: [
          { type: "array", required: true, message: "请输入报考时间" },
        ],
        examTime: [
          { type: "array", required: true, message: "请输入考试时间" },
        ],
        // professionalPeriodHour: [
        //   // { validator: this.validatePass },
        //   { type: "number", message: "请输入数字" },
        // ],
        // majorPeriodHour: [{ type: "number", message: "请输入数字" }],
        // jobAverageScore: [{ type: "number", message: "请输入数字" }],
      },
    };
  },

  created() {
    let typeName = this.$route.query.id ? "编辑/查看校考考试" : "新增校考考试";
    this.$emit("getMeteData", this.$Bre.breadCrumbs([0, 6, 62]), typeName);
    this.id = this.$route.query.id;
    this.getSchoolListAction();
    if (this.id) this.detailOnlineTest();
  },
  methods: {
    ...mapActions("school", [
      "getSchoolListAction",
      "getMajorListAction",
      "getStudyManageAction",
    ]),
    // 提交
    checkInputBind() {
      if (this.form.professionalPeriodHour) {
        // 专业课学时要求
        this.form.isProfessionalPeriod = true;
      } else {
        this.form.isProfessionalPeriod = false;
      }
      if (this.form.majorPeriodHour) {
        // 专业总学时要求
        this.form.isMajorPeriod = true;
      } else {
        this.form.isMajorPeriod = false;
      }
      if (this.form.jobAverageScore) {
        // 作业平均分
        this.form.isJobAverageScore = true;
      } else {
        this.form.isJobAverageScore = false;
      }
      if (this.form.faceFrequency) {
        // 人脸识别评率
        this.form.isFaceFrequency = true;
      } else {
        this.form.isFaceFrequency = false;
      }
      if (this.form.faceHighestFrequency) {
        // 人脸最高识别
        this.form.isFaceHighestFrequency = true;
      } else {
        this.form.isFaceHighestFrequency = false;
      }
      if (this.form.examSubmitMinute) {
        this.form.isExamSubmit = true;
      } else {
        this.form.isExamSubmit = false;
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.checkInputBind();
          if (this.id && this.id != "") {
            this.updateOnlineTest();
          } else {
            this.addOnlineTest();
          }
        }
      });
    },
    // 取消
    cancelHandler() {
      this.resetForm("onlineTestForm");
      this.$router.go(-1);
    },
    // 重置
    resetForm(formName) {
      this.applyDate = [];
      this.examTime = [];
      this.form = {};
      this.$refs[formName].resetFields();
    },
    // 添加线上考试
    async addOnlineTest() {
      // 报考时间
      if (this.form.applyDate) {
        this.form.applyStartDate = this.form.applyDate[0];
        this.form.applyEndDate = this.form.applyDate[1];
      }
      // 考试时间
      if (this.form.examTime) {
        this.form.examStartTime = this.form.examTime[0];
        this.form.examEndTime = this.form.examTime[1];
      }
      // 阅卷截止日期
      const params = this.form;
      const res = await this.$api.testManage.addOnlineTest(params);

      if (res.code == 0) {
        this.$router.push({
          name: "onlineTest",
        });
        this.resetForm("onlineTestForm");
      }
    },
    // 修改
    async updateOnlineTest() {
      // 报考时间
      if (this.form.applyDate) {
        this.form.applyStartDate = this.form.applyDate[0];
        this.form.applyEndDate = this.form.applyDate[1];
      }
      // 考试时间
      if (this.form.examTime) {
        this.form.examStartTime = this.form.examTime[0];
        this.form.examEndTime = this.form.examTime[1];
      }
      // 阅卷截止日期
      const params = {
        uuid: this.id,
        ...this.form,
      };
      const res = await this.$api.testManage.updateOnlineTest(params);
      if (res.code == 0) {
        this.$router.push({
          name: "onlineTest",
        });
        this.resetForm("onlineTestForm");
      }
    },
    // 线上考试详情
    async detailOnlineTest() {
      const params = {
        id: this.id,
      };
      const res = await this.$api.testManage.detailOnlineTest(params);
      if (res.code == 0) {
        // 院校、专业、课程联动
        this.schoolChange(res.data.collageUuid);
        this.majorChange(res.data.majorUuid);
        this.form = res.data;
        // 报考时
        this.$set(this.form, "applyDate", [
          res.data.applyStartDate,
          res.data.applyEndDate,
        ]);
        // 考试时间
        this.$set(this.form, "examTime", [
          res.data.examStartTime,
          res.data.examEndTime,
        ]);
      }
    },
    //专业课课时验证
    // validatePass(rule, value, callback) {
    //   if (this.form.isProfessionalPeriod && value == "") {
    //     callback(new Error("请输入专业课课时"));
    //   }
    // },
    // 院校改变，获取专业列表
    schoolChange(val) {
      this.form.majorUuid = "";
      this.form.courseUuid = "";
      this.getMajorListAction({
        schoolUuid: val,
      });
    },
    // 专业改变,获取课程列表
    majorChange(val) {
      this.form.courseUuid = "";
      this.getStudyManageAction({
        type: "disGeneralExamination",
        schoolUuid: this.form.collageUuid,
        majorUuid: val,
      });
    },
  },
};
</script>

<style lang="scss">
.falcon-onlineTest-form {
  .el-select {
    width: 100%;
  }
  .el-date-editor {
    width: 100%;
  }
}
</style>
<style lang="scss" scoped>
.falcon-form {
  .flex-form-item {
    display: flex;
    align-items: center;
    height: 40px;
    /deep/ label {
      margin-bottom: 0;
    }
  }
}
</style>
