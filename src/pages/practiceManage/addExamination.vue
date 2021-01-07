<!-- 新增试卷 -->
<template>
  <div class="addExamination">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
    >
      <el-form-item label="试卷名称" prop="paperName">
        <el-input
          type="text"
          placeholder="请输入试卷名称"
          v-model="ruleForm.paperName"
          class="w400px"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="院校" prop="collageUuid">
        <el-select
          v-model="ruleForm.collageUuid"
          @change="schoolChange"
          placeholder="请选择院校"
          class="w400px"
        >
          <el-option
            v-for="item in schoolLists"
            :key="item.uuid"
            :label="item.schoolName"
            :value="item.uuid"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="专业" prop="majorUuid">
        <el-select
          v-model="ruleForm.majorUuid"
          @change="majorChange"
          placeholder="请选择专业"
          class="w400px"
        >
          <el-option
            v-for="item in majorLists"
            :key="item.uuid"
            :label="item.majorName"
            :value="item.uuid"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课程名称" prop="courseUuid">
        <el-select
          v-model="ruleForm.courseUuid"
          placeholder="请选择课程名称"
          @change="courseChange"
          class="w400px"
        >
          <el-option
            v-for="item in specialtyLists"
            :key="item.uuid"
            :label="item.specialtyName"
            :value="item.uuid"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="试卷分类" prop="paperClassifyUuid">
        <el-select
          v-model="ruleForm.paperClassifyUuid"
          placeholder="请选择试卷分类"
          class="w400px"
          clearable
        >
          <el-option
            v-for="item in examTypeLists"
            :key="item.uuid"
            :label="item.paperClassifyName"
            :value="item.uuid"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="考试时长" prop="examDuration">
        <el-input
          type="text"
          placeholder="请输入考试时长"
          v-model="ruleForm.examDuration"
          class="w400px"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="试卷总分数" prop="examTotalScore">
        <el-input
          type="text"
          placeholder="请输入试卷总分数"
          v-model="ruleForm.examTotalScore"
          class="w400px"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="试卷及格分数" prop="examPassScore">
        <el-input
          type="text"
          placeholder="请输入试卷及格分数"
          v-model="ruleForm.examPassScore"
          class="w400px"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="试卷说明" prop="examExplain">
        <el-input
          type="textarea"
          placeholder="请输入试卷说明"
          :rows="6"
          v-model="ruleForm.examExplain"
          class="w400px"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">{{
          isAdded == "see" ? "修改" : "新增"
        }}</el-button>
        <el-button @click="$router.go(-1)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "addExamination",
  computed: {
    ...mapState("school", {
      schoolLists: (state) => state.schoolLists,
      majorLists: (state) => state.majorLists,
      specialtyLists: (state) => state.specialtyLists,
      examTypeLists: (state) => state.examTypeLists,
    }),
  },
  data() {
    return {
      ruleForm: {
        collageUuid: "",
        courseUuid: "",
        majorUuid: "",
        paperClassifyUuid: "",
      },
      rules: {
        paperName: [
          { required: true, message: "请输入试卷名称", trigger: "blur" },
        ],
        collageUuid: [
          { required: true, message: "请选择院校", trigger: "blur" },
        ],
        majorUuid: [{ required: true, message: "请选择专业", trigger: "blur" }],
        courseUuid: [
          { required: true, message: "请选择课程", trigger: "blur" },
        ],
        paperClassifyUuid: [
          { required: true, message: "请选择试卷分类", trigger: "blur" },
        ],
        examDuration: [
          { required: true, message: "请输入考试时长", trigger: "blur" },
          {
            pattern: /^[1-9]\d*$/,
            message: "时间必须为正整数",
            trigger: "blur",
          },
        ],
        examTotalScore: [
          { required: true, message: "请输入试卷总分数", trigger: "blur" },
          {
            pattern: /^[1-9]\d*$/,
            message: "分数必须为正整数",
            trigger: "blur",
          },
        ],
        examPassScore: [
          { required: true, message: "请输入试卷及格分数", trigger: "blur" },
          {
            pattern: /^[1-9]\d*$/,
            message: "分数必须为正整数",
            trigger: "blur",
          },
        ],
        examExplain: [
          { required: true, message: "请输入试卷说明", trigger: "blur" },
        ],
      },
      isAdded: this.$route.query.isAdded,
      uuid: "",
      classificationList: [],
    };
  },
    created() {
        let typeName = this.$route.query.isAdded === 'see'? '编辑/查看试卷' : '新增试卷';
        this.$emit('getMeteData', this.$Bre.breadCrumbs([0, 5, 53]), typeName);
    },
    methods: {
    ...mapActions("school", [
      "getSchoolListAction",
      "getMajorListAction",
      "getStudyManageAction",
      "getExamTypeAction",
    ]),
    submit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.isAdded == "use") {
            this.$api.classificationManage
              .addPaperPractice(this.ruleForm)
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
            this.$api.classificationManage
              .updatePaperPractice(this.ruleForm)
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
    schoolChange(val) {
      // this.setEmptyAction();
      this.ruleForm.majorUuid = "";
      this.ruleForm.courseUuid = "";
      this.ruleForm.paperClassifyUuid = "";
      // 专业
      this.getMajorListAction({
        schoolUuid: val,
      });
    },
    majorChange(val) {
      this.ruleForm.courseUuid = "";
      this.ruleForm.paperClassifyUuid = "";
      this.getStudyManageAction({
        schoolUuid: this.ruleForm.collageUuid,
        majorUuid: val,
      });
    },
    courseChange(val, collageUuid) {
        this.ruleForm.paperClassifyUuid = "";
        // 试卷类型
        this.getExamTypeAction({
            schoolUuid: collageUuid || this.ruleForm.collageUuid,
            courseUuid: val
        });
    }
  },
  mounted() {
    this.getSchoolListAction();
    if (this.isAdded == "see") {
      this.$api.classificationManage
        .selectPaperPractice(this.$route.query.uuid)
        .then((res) => {
          if (res.code == 0) {
            this.schoolChange(res.data.collageUuid);
            this.majorChange(res.data.majorUuid);
            this.courseChange(res.data.courseUuid, res.data.collageUuid);
            this.ruleForm = res.data;
          }
        });
    }
  },
};
</script>
