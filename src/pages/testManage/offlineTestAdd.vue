<!--线下考试-->
<template>
  <div class="modify-ruleForm falcon-onlineTest-form">
    <!-- form -->
    <el-form
      :model="form"
      :rules="rules"
      ref="offlineTestForm"
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
              placeholder="请输入报名费"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="考场地址" prop="offlineExamRoom">
            <el-input
              v-model="form.offlineExamRoom"
              placeholder="请输入考场地址"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="报考时间" prop="applyDate">
            <el-date-picker
              v-model="form.applyDate"
              type="daterange"
              range-separator="至"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :editable="false"
            ></el-date-picker>
            <b>报考结束时间不能小于今天</b>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="考试时间" prop="examTime">
            <el-date-picker
              v-model="form.examTime"
              type="datetimerange"
              range-separator="至"
              format="yyyy-MM-dd HH:mm"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :editable="false"
            ></el-date-picker>
            <b>考试开始/结束时间不能小于今天</b>
          </el-form-item>
        </el-col>

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
      <el-row>
        <el-col :span="24">
          <el-form-item label="" prop="type">
            <el-row>
              <el-col :span="3">
                <el-checkbox v-model="form.isProfessionalPeriod"
                  >专业课学时要求</el-checkbox
                >
              </el-col>
              <el-col :span="6">
                <el-form-item prop="professionalPeriodHour" inline-message>
                  <el-input
                    v-model="form.professionalPeriodHour"
                    type="number"
                    oninput="if(value<=0) value=1"
                    placeholder="专业课学时要求(小时)"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
<!--            <el-row>-->
<!--              <el-col :span="3">-->
<!--                <el-checkbox v-model="form.isMajorPeriod"-->
<!--                  >专业总学时要求</el-checkbox-->
<!--                >-->
<!--              </el-col>-->
<!--              <el-col :span="6">-->
<!--                <el-input-->
<!--                  v-model="form.majorPeriodHour"-->
<!--                  type="number"-->
<!--                  oninput="if(value<=0) value=1"-->
<!--                  placeholder="专业总学时要求(小时)"-->
<!--                  clearable-->
<!--                ></el-input>-->
<!--              </el-col>-->
<!--            </el-row>-->
            <el-row>
              <el-col :span="3">
                <el-checkbox v-model="form.isJobAverageScore"
                  >作业平均分</el-checkbox
                >
              </el-col>
              <el-col :span="6">
                <el-input
                  v-model="form.jobAverageScore"
                  type="number"
                  oninput="if(value<=0) value=1"
                  placeholder="作业平均分"
                  clearable
                ></el-input>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <div style="height: 30px"></div>
        <div class="buttonDiv">
          <el-button type="primary" @click="submitForm('offlineTestForm')"
            >保存</el-button
          >
          <el-button @click="cancelHandler">取消</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { dateTimeToDate } from "@/tools/func.js";
import { mapState, mapActions } from "vuex";
export default {
  name: "OnlineTestAdd",
  computed: {
    // 院校,专业,课程
    ...mapState("school", {
      schoolLists: (state) => state.schoolLists,
      majorLists: (state) => state.majorLists,
      specialtyLists: (state) => state.specialtyLists,
    }),
  },
  data() {
    return {
      id: this.$route.query.id,
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
        isJoinPracticeTest: false,
        isFaceFrequency: false,
        faceFrequency: "",
        isFaceHighestFrequency: false,
        faceHighestFrequency: "",
        isExamSubmit: false,
        examSubmitMinute: "",
        offlineExamRoom: "", //线下考试场地
        isOfflineExam: true,
        applyDate: [], //报名时间范围
        examTime: [], //考试时间范围
      },
      rules: {
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
          { type: "number", message: "请输入数字" },
        ],
        examTotalScore: [
          { required: true, message: "请输入试卷总分数" },
          { type: "number", message: "请输入数字" },
        ],
        examPassScore: [
          { required: true, message: "请输入试卷及格分数" },
          { type: "number", message: "请输入数字" },
        ],
        examExplain: [{ required: true, message: "请输入试卷说明" }],
        examRegisterNotice: [{ required: true, message: "请输入报考须知" }],
        applyDate: [
          { type: "array", required: true, message: "请输入报考时间" },
        ],
        examTime: [
          { type: "array", required: true, message: "请输入考试时间" },
        ],
        offlineExamRoom: [{ required: true, message: "请输入考场地址" }],
        // professionalPeriodHour: [{ validator: this.validatePass }],
      },
    };
  },
  created() {
    let typeName = this.$route.query.id
      ? "编辑/查看题目校考考试"
      : "新增校考考试";
    this.$emit("getMeteData", this.$Bre.breadCrumbs([0, 6, 64]), typeName);
    this.getSchoolListAction();

    if (this.id && this.id != "") {
      this.detailOnlineTest();
    }
  },
  // mounted() {
  //   if (this.id && this.id != "") {
  //     this.detailOnlineTest();
  //   }
  // },
  methods: {
    ...mapActions("school", [
      "getSchoolListAction",
      "getMajorListAction",
      "getStudyManageAction",
    ]),
    // 提交
    checkInput() {
      if (this.form.professionalPeriodHour) {
        this.form.isProfessionalPeriod = true;
      } else {
        this.form.isProfessionalPeriod = false;
      }
      if (this.form.majorPeriodHour) {
        this.form.isMajorPeriod = true;
      } else {
        this.form.isMajorPeriod = false;
      }
      if (this.form.jobAverageScore) {
        this.form.isJobAverageScore = true;
      } else {
        this.form.isJobAverageScore = false;
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.checkInput();
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
      this.resetForm("offlineTestForm");
      this.$router.go(-1);
    },
    // 重置
    resetForm(formName) {
      this.applyDate = "";
      this.examTime = "";
      this.form = {};
      this.$refs[formName].resetFields();
    },
    // 添加线上考试
    async addOnlineTest() {
      // 报考时间
      if (this.form.applyDate) {
        this.form.applyStartDate = dateTimeToDate(this.form.applyDate[0]);
        this.form.applyEndDate = dateTimeToDate(this.form.applyDate[1]);
      }
      // 考试时间
      if (this.form.examTime) {
        this.form.examStartTime = dateTimeToDate(this.form.examTime[0]);
        this.form.examEndTime = dateTimeToDate(this.form.examTime[1]);
      }

      const params = this.form;
      const res = await this.$api.testManage.addOnlineTest(params);

      if (res.code == 0) {
        this.$router.push({
          name: "offlineTest",
        });
        this.resetForm("offlineTestForm");
      }
    },
    // 修改
    async updateOnlineTest() {
      // 报考时间
      if (this.form.applyDate) {
        this.form.applyStartDate = dateTimeToDate(this.form.applyDate[0]);
        this.form.applyEndDate = dateTimeToDate(this.form.applyDate[1]);
      }
      // 考试时间
      if (this.form.examTime) {
        this.form.examStartTime = dateTimeToDate(this.form.examTime[0]);
        this.form.examEndTime = dateTimeToDate(this.form.examTime[1]);
      }
      const params = {
        uuid: this.id,
        ...this.form,
      };
      const res = await this.$api.testManage.updateOnlineTest(params);
      if (res.code == 0) {
        this.$router.push({
          name: "offlineTest",
        });
        this.resetForm("offlineTestForm");
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
        // 报考时间
        this.$set(this.form, "applyDate", [
          res.data.applyStartDate,
          res.data.applyEndDate,
        ]);
        // this.form.applyDate =;
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
    // 院校改变
    schoolChange(val) {
      this.form.majorUuid = "";
      this.form.courseUuid = "";
      this.getMajorListAction({
        schoolUuid: val,
      });
    },
    // 专业改变
    majorChange(val) {
      this.form.courseUuid = "";
      this.getStudyManageAction({
        schoolUuid: this.form.collageUuid,
        type: "disGeneralExamination",
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
  // width: 500px;
}
</style>
