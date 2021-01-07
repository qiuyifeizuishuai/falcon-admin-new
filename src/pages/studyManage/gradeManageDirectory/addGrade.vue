<template>
  <div>
      <TitleName titleName="基本信息"/>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      class="demo-ruleForm modify-ruleForm"
    >
        <el-row :gutter="60">
            <el-col :span="8">
                <el-form-item label="院校" prop="schoolUuid">
                    <el-select @change="schoolChange" v-model="ruleForm.schoolUuid" placeholder="请选择院校" style="width: 100%">
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
                    <el-select @change="majorChange" v-model="ruleForm.majorUuid" placeholder="请选择专业" style="width: 100%">
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
                <el-form-item label="班级名称" prop="gradeName">
                    <el-input v-model="ruleForm.gradeName"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="班主任" prop="teacherUuid">
                    <el-select v-model="ruleForm.teacherUuid" placeholder="请选择班主任" style="width: 100%">
                        <el-option
                            v-for="(item, index) in teacherLists"
                            :key="index"
                            :label="item.teacherName"
                            :value="item.uuid"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
      <el-form-item>
          <div style="height: 30px"></div>
          <div class="buttonDiv">
              <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
              <el-button @click="resetForm()">返回</el-button>
          </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      rules: {
        schoolUuid: [
          { required: true, message: "请选择院校", trigger: "change" },
        ],
        majorUuid: [
          { required: true, message: "请选择专业", trigger: "change" },
        ],
        gradeName: [
          { required: true, message: "班级名称不能为空", trigger: "change" },
        ],
        type: [
          {
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change",
          },
        ],
        teacherUuid: [
          { required: true, message: "请选择班主任", trigger: "change" },
        ],
      },
      ruleForm: {
        schoolUuid: "",
        majorUuid: "",
        teacherUuid: "",
        gradeName: "",
      },
    };
  },
  computed: {
    // 院校,专业,课程
    ...mapState("school", {
      schoolLists: (state) => state.schoolLists,
      majorLists: (state) => state.majorLists,
      teacherLists: (state) => state.teacherLists,
    }),
  },
    created() {
        let typeName = this.$route.query.type === 'edit'? '编辑/查看班级' : '新增班级';
        this.$emit('getMeteData', this.$Bre.breadCrumbs([0, 4, 41]), typeName);
    },
    mounted() {
    this.getDetails();
    this.getSchoolListAction();
  },
  methods: {
    ...mapActions("school", [
      "getSchoolListAction",
      "getMajorListAction",
      "getTeacherAction",
    ]),
    getDetails() {
      if (this.$route.query.type == "edit") {
        this.$api.grade.getGradeDetails(this.$route.query.id).then((res) => {
            this.ruleForm.schoolUuid = res.data.schoolUuid;
          this.schoolChange(res.data.schoolUuid);
          this.majorChange(res.data.majorUuid);
          this.ruleForm = res.data;
        });
      }
    },
    // 院校改变
    schoolChange(val) {
      this.ruleForm.majorUuid = "";
      this.ruleForm.teacherUuid = "";
      this.getMajorListAction({
        schoolUuid: val,
      });
    },
    // 专业改变
    majorChange(val) {
      this.ruleForm.teacherUuid = "";
      console.log(1);
      this.getTeacherAction({
        schoolUuid: this.ruleForm.schoolUuid,
        majorUuid: val,
        type: "banzhuren",
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.$route.query.type == "edit") {
            let data = {
              uuid: this.$route.query.id,
              ...this.ruleForm,
            };
            this.$api.grade.updateGrade(data).then((res) => {
              console.log(res);
              this.$message.success("修改班级成功");
              this.$router.push({ path: "/gradeManage" });
            });
          } else {
            let data = {
              ...this.ruleForm,
            };
            this.$api.grade.creatGrade(data).then((res) => {
              console.log(res);
              this.$router.push({ path: "/gradeManage" });
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$router.push({ path: "/gradeManage" });
      // gradeManage
    },
  },
};
</script>
