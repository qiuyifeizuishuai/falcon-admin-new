<!--线上考试-->
<template>
  <div class="modify-ruleForm falcon-onlineTest-form">
    <el-form
      :model="form"
      :rules="rules"
      ref="onlineTestForm"
      label-width="120px"
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
                <el-form-item prop="collageUuid">
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
                <el-form-item prop="majorUuid">
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
                <el-form-item prop="courseUuid">
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

        <el-col :span="6">
          <el-form-item label="考试名称" prop="examName">
            <el-input
              v-model="form.examName"
              placeholder="请输入考试名称"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="报名网站" prop="website">
            <el-input
              v-model="form.website"
              placeholder="https://... or http://..."
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="60">
        <el-col :span="12">
          <el-form-item label="备注" prop="remark">
            <el-input
              v-model="form.remark"
              type="textarea"
              maxlength="300"
              rows="6"
              show-word-limit
              placeholder="备注"
            ></el-input>
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
        website: "",
        remark: "",
        collageUuid: "",
        majorUuid: "",
        courseUuid: "",
        examName: "",
      },
      rules: {
        website: [{ required: true, message: "请输入报名网站" }],
        examName: [{ required: true, message: "请输入考试名称" }],
        collageUuid: [{ required: true, message: "请选择院校" }],
        majorUuid: [{ required: true, message: "请选择专业" }],
        courseUuid: [{ required: true, message: "请选择课程名称" }],
      },
    };
  },
  created() {
    let typeName = this.$route.query.id
      ? "编辑/查看题目国考考试"
      : "新增国考考试";
    this.$emit("getMeteData", this.$Bre.breadCrumbs([0, 6, 63]), typeName);
    this.getSchoolListAction();

    if (this.id && this.id != "") {
      this.detailOnlineTest();
    }
  },
  methods: {
    ...mapActions("school", [
      "getSchoolListAction",
      "getMajorListAction",
      "getStudyManageAction",
    ]),
    cancelHandler() {
      this.$router.go(-1);
    },
    detailOnlineTest() {
      this.$api.testManage.getUnifiedExaminationDetails(this.id).then((res) => {
        console.log(res);
        this.schoolChange(res.data.schoolUuid);
        this.majorChange(res.data.majorUuid);
        this.form.examName = res.data.examName;
        this.form.collageUuid = res.data.schoolUuid;
        this.form.majorUuid = res.data.majorUuid;
        this.form.courseUuid = res.data.specialtyClassUuid;
        this.form.website = res.data.website;
        this.form.remark = res.data.remark;
      });
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (this.id && this.id != "") {
            this.updateOnlineTest();
          } else {
            // 新增
            this.addOnlineTest();
          }
        }
      });
    },
    updateOnlineTest() {
      let data = {
        examName: this.form.examName,
        uuid: this.id,
        remark: this.form.remark,
        specialtyClassUuid: this.form.courseUuid,
        website: this.form.website,
      };
      this.$api.testManage.updateUnifiedExaminationDetails(data).then((res) => {
        console.log(res);
        this.$message.success("更新成功");
        this.$router.go(-1);
      });
    },
    addOnlineTest() {
      let form = this.form;
      let data = {
        examName: form.examName,
        remark: form.remark,
        specialtyClassUuid: form.courseUuid,
        website: form.website,
      };
      this.$api.testManage.addUnifiedExamination(data).then((res) => {
        console.log(res);
        this.$router.go(-1);
      });
    },
    schoolChange(val) {
      // this.setEmptyAction();
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
        majorUuid: val,
        type: "generalExamination",
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
  .select-group {
    display: flex;
  }
}
</style>
