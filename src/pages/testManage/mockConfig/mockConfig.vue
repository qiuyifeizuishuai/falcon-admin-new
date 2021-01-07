<template>
  <div class="modify-ruleForm">
    <TitleName titleName="基本信息" />
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      class="demo-ruleForm"
      label-position="top"
    >
      <el-row :gutter="60">
        <el-col :span="8">
          <el-form-item label="考试时长" prop="duration">
            <el-input
              v-model="ruleForm.duration"
              oninput="if(value<=0) value=1"
              type="number"
              placeholder="分钟"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="试卷总分数" prop="score">
            <el-input
              v-model="ruleForm.score"
              oninput="if(value<=0) value=1"
              type="number"
              min="1"
              placeholder="请输入总分数"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="及格分数" prop="passScore">
            <el-input
              v-model="ruleForm.passScore"
              oninput="if(value<=0) value=1"
              type="number"
              min="1"
              placeholder="请输入及格分数"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item label="考试说明" prop="desc">
            <el-input
              type="textarea"
              :autosize="{ minRows: 6 }"
              v-model="ruleForm.desc"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <TitleName class="mat15" titleName="基本信息" />
      <el-row :gutter="60">
        <el-col :span="24">
          <el-form-item label="考试要求" prop="requirements">
            <el-checkbox-group
              class="requirements"
              v-model="ruleForm.requirements"
            >
              <div>
                <el-checkbox
                  label="人脸识别频率（分钟/次）"
                  name="1"
                ></el-checkbox>
                <el-input
                  class="w350"
                  v-model="ruleForm.faceFrequency"
                  clearable
                  oninput="if(value<=0) value=1"
                  type="number"
                  placeholder="请输入频率（分钟/次）"
                ></el-input>
              </div>
              <div>
                <el-checkbox label="人脸识别最高次数" name="2"></el-checkbox>
                <el-input
                  class="w350"
                  v-model="ruleForm.faceHight"
                  clearable
                  oninput="if(value<=0) value=1"
                  type="number"
                  placeholder="最高次数"
                ></el-input>
              </div>
              <div>
                <el-checkbox
                  label="每位学员可以参考模拟考试次数"
                  name="3"
                ></el-checkbox>
                <el-input
                  type="number"
                  class="w350"
                  oninput="if(value<=0) value=1"
                  clearable
                  v-model="ruleForm.reference"
                ></el-input>
              </div>
              <div>
                <el-checkbox
                  label="提交试卷时间限制（不得早于多少分钟）"
                  name="4"
                ></el-checkbox>
                <el-input
                  v-model="ruleForm.timeLimit"
                  class="w350"
                  oninput="if(value<=0) value=1"
                  clearable
                  type="number"
                  placeholder=""
                ></el-input>
              </div>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <div style="height: 30px"></div>
        <div class="buttonDiv">
          <el-button type="primary" @click="submitForm('ruleForm')"
            >确定</el-button
          >
          <el-button @click="$router.push({ path: '/mockTest' })"
            >返回</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        requirements: [],
        duration: 180,
        score: 100,
        passScore: 60,
        desc: "",
        faceHight: 10,
        reference: 10,
        faceFrequency: 3,
        timeLimit: 30,
      },
      rules: {
        duration: [
          { required: true, message: "考试时长不能为空", trigger: "blur" },
        ],
        score: [
          { required: true, message: "总分数不能为空", trigger: "change" },
        ],
        passScore: [
          { required: true, message: "及格分数不能为空", trigger: "change" },
        ],
        desc: [
          { required: true, message: "考试说明不能为空", trigger: "change" },
        ],
        requirements: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个考试要求",
            trigger: "change",
          },
        ],
      },
    };
  },
  created() {
    this.$emit(
      "getMeteData",
      this.$Bre.breadCrumbs([0, 6, 61]),
      "模拟考试设置"
    );
  },
  mounted() {
    this.getDetails();
  },
  methods: {
    getDetails() {
      let uuid = this.$route.query.uuid;
      if (uuid) {
        this.$api.testManage.getSettingExamMockDetails(uuid).then((res) => {
          this.ruleForm.duration = res.data.examDuration;
          this.ruleForm.desc = res.data.examExplain;
          this.ruleForm.passScore = res.data.examPassScore;
          this.ruleForm.faceFrequency = res.data.faceFrequency;
          this.ruleForm.score = res.data.examTotalScore;
          this.ruleForm.faceHight = res.data.faceHighestFrequency;
          this.ruleForm.reference = res.data.practiceNum;
          this.ruleForm.timeLimit = res.data.examSubmitMinute;
          if (res.data.isFaceFrequency) {
            this.ruleForm.requirements.push("人脸识别频率（分钟/次）");
          }
          if (res.data.isFaceHighestFrequency) {
            this.ruleForm.requirements.push("人脸识别最高次数");
          }
          if (res.data.isPracticeNum) {
            this.ruleForm.requirements.push("每位学员可以参考模拟考试次数");
          }
          if (res.data.isExamSubmit) {
            this.ruleForm.requirements.push(
              "提交试卷时间限制（不得早于多少分钟）"
            );
          }
        });
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.$route.query.uuid) {
            // update
            let data = {
              uuid: this.$route.query.uuid,
              examDuration: this.ruleForm.duration, // 时长
              examExplain: this.ruleForm.desc, // 说明
              examPassScore: this.ruleForm.passScore, // 及格分数
              examTotalScore: this.ruleForm.score, // 总分数
              faceFrequency: this.ruleForm.faceFrequency,
              faceHighestFrequency: this.ruleForm.faceHight,
              practiceNum: this.ruleForm.reference,
              examSubmitMinute: this.ruleForm.timeLimit,
              isFaceFrequency: false,
              isFaceHighestFrequency: false,
              isPracticeNum: false,
              isExamSubmit: false,
            };
            this.ruleForm.requirements.map((i) => {
              switch (i) {
                case "人脸识别频率（分钟/次）":
                  data.isFaceFrequency = true;
                  break;
                case "人脸识别最高次数":
                  data.isFaceHighestFrequency = true;
                  break;
                case "每位学员可以参考模拟考试次数":
                  data.isPracticeNum = true;
                  break;
                case "提交试卷时间限制（不得早于多少分钟）":
                  data.isExamSubmit = true;
                  break;
              }
            });
            this.$api.testManage.updateSettingExamMock(data).then((res) => {
              console.log(res);
              this.$message.success("更新成功");
              this.$router.push({ path: "/simulationTest" });
            });
          } else {
            // create
            let data = {
              examDuration: this.ruleForm.duration, // 时长
              examExplain: this.ruleForm.desc, // 说明
              examPassScore: this.ruleForm.passScore, // 及格分数
              examTotalScore: this.ruleForm.score, // 总分数
              faceFrequency: this.ruleForm.faceFrequency,
              faceHighestFrequency: this.ruleForm.faceHight,
              practiceNum: this.ruleForm.reference,
              examSubmitMinute: this.ruleForm.timeLimit,
              isFaceFrequency: false,
              isFaceHighestFrequency: false,
              isPracticeNum: false,
              isExamSubmit: false,
            };
            this.ruleForm.requirements.map((i) => {
              switch (i) {
                case "人脸识别频率（分钟/次）":
                  data.isFaceFrequency = true;
                  break;
                case "人脸识别最高次数":
                  data.isFaceHighestFrequency = true;
                  break;
                case "每位学院可以参考模拟考试次数":
                  data.isPracticeNum = true;
                  break;
                case "提交试卷时间限制（不得早于多少分钟）":
                  data.isExamSubmit = true;
                  break;
              }
            });
            // examSubmitMinute
            this.$api.testManage.createSettingExamMock(data).then((res) => {
              console.log(res);
              this.$message.success("设置成功");
              this.$router.push({ path: "/simulationTest" });
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.requirements .el-checkbox {
  width: 280px;
}
.w350 {
  width: 150px;
}
</style>
