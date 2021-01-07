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
                <el-form-item label="学生名字" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入学生姓名" />
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="性别" prop="sex">
                    <el-select v-model="ruleForm.sex" style="width: 100%">
                        <el-option label="男" value="man"></el-option>
                        <el-option label="女" value="girl"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="年龄" prop="age">
                    <el-input v-model="ruleForm.age" ></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="身份证" prop="idCard" >
                    <el-input v-model="ruleForm.idCard"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="联系电话" prop="phone">
                    <el-input v-model="ruleForm.phone" />
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="登录密码" prop="password">
                    <el-input show-password v-model="ruleForm.password" type="password" />
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="紧急电话" prop="emergencyPhone">
                    <el-input v-model="ruleForm.emergencyPhone" />
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="ruleForm.email" />
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="通讯地址">
                    <el-input v-model="ruleForm.address" />
                </el-form-item>
            </el-col>
<!--            <el-col :span="8">-->
<!--&lt;!&ndash;                <el-form-item label="身份证正面" prop="frontCardImg">&ndash;&gt;-->
<!--                <el-form-item label="身份证正面">-->
<!--                    <uploadFile-->
<!--                        ref="imgUpload"-->
<!--                        @handleSuccess="imgUploadFront"-->
<!--                        :limit="upload.limit"-->
<!--                        :url="upload.url"-->
<!--                        :auto="upload.auto"-->
<!--                        name="file"-->
<!--                        :data="upload.data"-->
<!--                        :fileList="ruleForm.frontCardImg"-->
<!--                    ></uploadFile>-->
<!--                </el-form-item>-->
<!--            </el-col>-->
<!--            <el-col :span="8">-->
<!--&lt;!&ndash;                <el-form-item label="身份证反面" prop="reverseCardImg">&ndash;&gt;-->
<!--                <el-form-item label="身份证反面">-->
<!--                    <uploadFile-->
<!--                        ref="imgUpload"-->
<!--                        @handleSuccess="imgUploadReverse"-->
<!--                        :limit="upload.limit"-->
<!--                        :url="upload.url"-->
<!--                        :auto="upload.auto"-->
<!--                        name="file"-->
<!--                        :data="upload.data"-->
<!--                        :fileList="ruleForm.reverseCardImg"-->
<!--                    ></uploadFile>-->
<!--                </el-form-item>-->
<!--            </el-col>-->
        </el-row>
        <TitleName titleName="报考信息"/>

        <el-row :gutter="60">
            <el-col :span="8">
                <el-form-item label="院校" prop="schoolUuid">
                    <el-select @change="schoolChange" v-model="ruleForm.schoolUuid" placeholder="请选择院校" style="width: 100%">
                        <el-option
                            v-for="(item, index) in schoolLists"
                            :key="index"
                            :label="item.schoolName"
                            :value="item.uuid"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-col>

            <el-col :span="8">
                <el-form-item label="准考证" prop="admission">
                    <el-input v-model="ruleForm.admission" />
                </el-form-item>
            </el-col>

            <el-col :span="8">
                <el-form-item label="学号" prop="id">
                    <el-input v-model="ruleForm.id" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="专业及班级" prop="majorAndGrade">
                    <div class="dynamic-input" v-for="(item, index) in ruleForm.majorAndGrade" :key="index">
                        <el-form-item :prop="'majorAndGrade.' + index + '.majorUuid'" :rules="{ required: true, message: '请选择专业' }">
                            <el-select @change="majorChange($event, index)" v-model="item.majorUuid" placeholder="请选择专业" clearable>
                                <el-option
                                    v-for="item in majorLists"
                                    :key="item.uuid"
                                    :label="item.majorName"
                                    :value="item.uuid"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <span class="mal10 mar10">--</span>
                        <el-form-item :prop="'majorAndGrade.' + index + '.gradeUuid'" :rules="{required: true, message: '请选择班级'}">
                            <el-select v-model="item.gradeUuid" placeholder="请选择班级" clearable>
                                <el-option
                                    v-for="item in classList[index]"
                                    :key="item.uuid"
                                    :label="item.gradeName"
                                    :value="item.uuid"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <i v-if="index > 0" class="el-icon-remove-outline mal10 f22px falcon-del-icon" @click="removeDomain(index)"></i>
                    </div>
                    <el-button type="primary" @click="addDomain">新增专业及班级</el-button>
                </el-form-item>
            </el-col>
        </el-row>
        <TitleName titleName="账号有效期" style="margin-top: 15px"/>
      <el-form-item>
        <div>
          <el-radio-group v-model="period">
            <div v-if="false">
              <!--                            砍掉获取学位账户过期功能-->
              <el-radio label="1">
                获取学位后
                <el-input type="number" min="1" style="width: 80px" v-model="periodDay" placeholder="天" />天
              </el-radio>
            </div>
            <div style="padding: 20px 0px">
              <el-radio label="2">
                <el-date-picker
                  v-model="periodTime"
                  type="daterange"
                  range-separator="-"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </el-radio>
            </div>
            <div>
              <el-radio label="3">永久</el-radio>
            </div>
          </el-radio-group>
        </div>
      </el-form-item>
      <el-form-item>
          <div style="height: 30px"></div>
          <div class="buttonDiv">
              <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
          </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
// import uploadFile from "@/plugins/upload/uploadFile";

export default {
  computed: {
    // 院校,专业,班级
    ...mapState("school", {
      schoolLists: (state) => state.schoolLists,
      majorLists: (state) => state.majorLists,
      gradeLists: (state) => state.gradeLists,
    }),
  },
  // components: {
  //   uploadFile,
  // },
  data() {
    return {
      upload: {
        url: "/api/exam/upload/uploadFiles",
        auto: true,
        limit: 1,
        data: {},
      },
      periodDay: 30,
      periodTime: [],
      period: "3",
      ruleForm: {
        schoolUuid: null,
        name: "",
        // professional: null,
        // grade: null,
        majorAndGrade: [
          {
            majorUuid: "",
            gradeUuid: "",
          },
        ],
        phone: null,
        id: null,
        // frontCardImg: null,
        // reverseCardImg: null,
        sex: null,
        email: null, // 新增 邮箱
        address: null, // 新增 地址
        age: null,
        idCard: null,
        emergencyPhone: null,
        admission: null,
        password: "",
      },
      // collageOptions: [],
      classList: [],
      rules: {
        id: [{ required: true, message: "请输入学号", trigger: "blur" }],
        name: [{ required: true, message: "请输入学生名称", trigger: "blur" }],
        schoolUuid: [
          { required: true, message: "院校不能为空", trigger: "blur" },
        ],
        majorAndGrade: [
          {
            type: "array",
            required: true,
          },
        ],
        age: [
          {
            pattern: /^[1-9]\d*$/,
            message: "年龄必须为正整数",
            trigger: "blur",
          },
        ],
        idCard: [
          { required: true, message: "身份证不能为空", trigger: "blur" },
          {
            pattern: /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
            message: "身份证不合法",
            trigger: "blur",
          },
        ],
        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            pattern: /^1[3|4|5|7|8|9][0-9]\d{8}$/,
            message: "手机号格式不对",
            trigger: "blur",
          },
        ],
        // frontCardImg: [
        //   { required: true, message: "请上传身份证正面照", trigger: "blur" },
        // ],
        // reverseCardImg: [
        //   { required: true, message: "请上传身份证反面照", trigger: "blur" },
        // ],
        email: [
          {
            pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
            message: "邮箱格式不对",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            pattern: /(?!^bai\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{6,14}/,
            message: "密码必须是6-14个字符，并且只能输入英文字母和数字",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    let typeName =
      this.$route.query.type === "edit" ? "编辑/查看学生" : "新增学生";
    this.$emit("getMeteData", this.$Bre.breadCrumbs([0, 4, 41]), typeName);
  },
  mounted() {
    this.getSchoolListAction();
    if (this.$route.query.type == "edit") {
      this.getDetails();
    }
  },
  methods: {
    ...mapActions("school", [
      "getSchoolListAction",
      "getMajorListAction",
      "getGradeListAction",
    ]),

    // 图片预览
    pictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    getDetails() {
      this.$api.account.getStudentDetails(this.$route.query.id).then((res) => {
        console.log(res);
        let data = this.ruleForm;
        if (res.data.isPeriod) {
          if (res.data.periodDay) {
            this.period = "1";
            this.periodDay = res.data.periodDay;
          } else if (res.data.periodEndDate && res.data.periodStartDate) {
            this.period = "2";
            this.periodTime.push(res.data.periodStartDate);
            this.periodTime.push(res.data.periodEndDate);
          }
        } else {
          this.period = "3";
        }

        // 请求专业
        this.schoolChange(res.data.schoolUuid);
        console.log(res.data.majorAndGrade);
        // 请求班级
        res.data.majorAndGrade.forEach((item, index) => {
          this.majorChange(item.majorUuid, index);
        });

        data.name = res.data.studentName;
        // data.professional = res.data.major;
        // data.grade = res.data.grade;
        data.majorAndGrade = res.data.majorAndGrade;
        data.email = res.data.email;
        data.address = res.data.detailed;
        data.id = res.data.id;
        // data.frontCardImg = res.data.frontCardImg;
        // data.reverseCardImg = res.data.reverseCardImg;
        data.schoolUuid = res.data.schoolUuid;
        data.sex = res.data.sex;
        data.age = res.data.age;
        data.idCard = res.data.card;
        data.phone = res.data.phone;
        data.emergencyPhone = res.data.urgentPhone;
        data.admission = res.data.exam;
        data.password = res.data.password;
      });
    },
    imgUploadFront(response) {
      this.ruleForm.frontCardImg = response.data[0];
    },
    imgUploadReverse(response) {
      this.ruleForm.reverseCardImg = response.data[0];
    },
    //   新增院校及专业
    addDomain() {
      const key = Date.now();
      this.ruleForm.majorAndGrade.push({
        gradeUuid: "",
        majorUuid: "",
        key: key,
      });

      // 专业下拉集合
      this.classList.push([]);
    },
    // 删除院校及专业
    removeDomain(index) {
      if (index !== -1) {
        this.ruleForm.majorAndGrade.splice(index, 1);
        this.classList.splice(index, 1);
      }
    },
    // 院校改变
    schoolChange(val) {
      this.ruleForm.majorAndGrade = [
        {
          majorUuid: "",
          gradeUuid: "",
        },
      ];

      this.getMajorListAction({
        schoolUuid: val,
      }).then(() => {
        this.classList = [];
      });
    },
    // 专业改变
    majorChange(val, index) {
      if (this.ruleForm.majorAndGrade[index]) {
        this.ruleForm.majorAndGrade[index].gradeUuid = "";
      }
      this.getGradeListAction({
        schoolUuid: this.ruleForm.schoolUuid,
        majorUuid: val,
      }).then(() => {
        this.$set(this.classList, index, this.gradeLists); //赋值给classList而不是直接用gradeLists，目的是页面需要进行额外的操作
      });
    },
    handleChange() {
      console.log(this.selectedOptions);
    },
    submitForm(formName) {
      console.log(this.$data);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.$route.query.type == "add") {
            let data = {
              schoolUuid: this.ruleForm.schoolUuid,
              // majors: this.ruleForm.professional,
              // grades: this.ruleForm.grade,
              majorAndGrade: this.ruleForm.majorAndGrade,
              studentName: this.ruleForm.name,
              email: this.ruleForm.email,
              // frontCardImg: this.ruleForm.frontCardImg,
              // reverseCardImg: this.ruleForm.reverseCardImg,
              id: this.ruleForm.id,
              detailed: this.ruleForm.address,
              sex: this.ruleForm.sex,
              age: this.ruleForm.age,
              card: this.ruleForm.idCard,
              phone: this.ruleForm.phone,
              urgentPhone: this.ruleForm.emergencyPhone,
              exam: this.ruleForm.admission,
              password: this.ruleForm.password,
            };
            if (this.period == "3") {
              // eslint-disable-next-line camelcase
              data.isPeriod = false;
            } else if (this.period == "2") {
              data.isPeriod = true;
              // eslint-disable-next-line camelcase
              data.periodStartDate = this.periodTime[0];
              // eslint-disable-next-line camelcase
              data.periodEndDate = this.periodTime[1];
            } else if (this.period == "1") {
              data.isPeriod = true;
              data.periodStartDate = null;
              data.periodEndDate = null;
              // eslint-disable-next-line camelcase
              data.periodDay = this.periodDay;
            }
            this.$api.account.createStudentManage(data).then((res) => {
              console.log(res);
              this.$message.success("创建学生成功");
              this.$router.push({ path: "/studentManage" });
            });
          } else {
            let data = {
              schoolUuid: this.ruleForm.schoolUuid,
              // majors: this.ruleForm.professional,
              // grades: this.ruleForm.grade,
              majorAndGrade: this.ruleForm.majorAndGrade,
              studentName: this.ruleForm.name,
              uuid: this.$route.query.id,
              id: this.ruleForm.id,
              frontCardImg: this.ruleForm.frontCardImg,
              reverseCardImg: this.ruleForm.reverseCardImg,
              email: this.ruleForm.email,
              detailed: this.ruleForm.address,
              sex: this.ruleForm.sex,
              age: this.ruleForm.age,
              card: this.ruleForm.idCard,
              phone: this.ruleForm.phone,
              urgentPhone: this.ruleForm.emergencyPhone,
              exam: this.ruleForm.admission,
              password: this.ruleForm.password,
            };
            if (this.period == "3") {
              // eslint-disable-next-line camelcase
              data.isPeriod = false;
            } else if (this.period == "2") {
              data.isPeriod = true;
              // eslint-disable-next-line camelcase
              data.periodStartDate = this.periodTime[0];
              // eslint-disable-next-line camelcase
              data.periodEndDate = this.periodTime[1];
            } else if (this.period == "1") {
              data.isPeriod = true;
              data.periodStartDate = null;
              data.periodEndDate = null;
              // eslint-disable-next-line camelcase
              data.periodDay = this.periodDay;
            }
            // eslint-disable-next-line no-unused-vars
            this.$api.account.updateStudentManage(data).then((res) => {
              this.$message.success("编辑成功");
              this.$router.push({ path: "/studentManage" });
            });
          }
        } else {
          // this.$refs.imgUpload.submitUpload();
          // return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs.imgUpload.submitUpload();
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.falcon-del-icon {
  vertical-align: middle;
  color: #c0ccda;
  cursor: pointer;
}

.dynamic-input {
  display: flex;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
