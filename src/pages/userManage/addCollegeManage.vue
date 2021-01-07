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
                <el-form-item label="院校名称" prop="name" >
                    <el-input v-model="ruleForm.name" ></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="院校负责人">
                    <el-input v-model="ruleForm.principal" ></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="联系电话" prop="phone">
                    <el-input v-model="ruleForm.phone" ></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="所在地区" prop="selectedOptions">
                    <el-cascader
                        style="width: 100%"
                        size="large"
                        :options="options"
                        v-model="ruleForm.selectedOptions"
                        @change="handleChange"
                    >
                    </el-cascader>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="详细地址">
                    <el-input
                        v-model="ruleForm.addressValue"
                        placeholder="请输入详细地址"
                    ></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="院校性质">
                    <el-input v-model="ruleForm.nature"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="院校类型">
                    <el-checkbox-group v-model="ruleForm.type">
                        <el-checkbox label="211" name="211"></el-checkbox>
                        <el-checkbox label="985" name="985"></el-checkbox>
                        <el-checkbox label="双一流" name="双一流"></el-checkbox>
                        <el-checkbox label="全国'五院四系'之一" name="五院四系"></el-checkbox>
                        <el-checkbox label="普通本科院校" name="普通本科院校"></el-checkbox>
                        <el-checkbox label="普通专科院校" name="普通专科院校"></el-checkbox>
                        <el-checkbox label="培训机构" name="培训机构"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="院校简介">
                    <el-input  type="textarea"  v-model="ruleForm.content" :rows="4" maxlength="255" show-word-limit style="width: 50%;"  />
                </el-form-item>
            </el-col>
        </el-row>
       <TitleName titleName="账号设置" style="margin-top: 15px"/>
        <el-row :gutter="60">
            <el-col :span="8">
                <el-form-item label="登录账号(创建后无法修改，请谨慎操作)" prop="username">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        content="* 账号用户名注册后无法修改，请谨慎操作"
                        placement="right"
                    >
                        <el-input v-model="ruleForm.username" :disabled="$route.query.type == 'edit'" />
                    </el-tooltip>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="密码" prop="password">
                    <el-input v-model="ruleForm.password" type="password" show-password />
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="主题">
                    <el-select v-model="ruleForm.theme" placeholder="请选择主题" style="width: 100%">
                        <el-option label="蔚蓝天空" value="blue"></el-option>
                        <el-option label="红色玫瑰" value="red"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <TitleName titleName="上传照片" style="margin-top: 15px"/>
        <el-row :gutter="60">
            <el-col :span="8">
                <el-form-item label="LOGO">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        content="上传的图片不能超过10M哦～"
                        placement="left"
                    >
                        <upload
                            ref="imgUpload"
                            :fileList="ruleForm.logo"
                            @handleSuccess="imgUploadLogo"
                            @handleRemove="deleteImg('logo')"
                            :limit="upload.limit"
                            :url="upload.url"
                            :auto="upload.auto"
                            name="file"
                            :data="upload.data"
                        ></upload>
                    </el-tooltip>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="Hearder背景">
                    <upload
                        ref="imgUpload"
                        :fileList="ruleForm.bgImg"
                        @handleSuccess="imgUploadBg"
                        @handleRemove="deleteImg('bgImg')"
                        :limit="upload.limit"
                        :url="upload.url"
                        :auto="upload.auto"
                        name="file"
                        :data="upload.data"
                    ></upload>
                </el-form-item>
            </el-col>
        </el-row>

      <el-form-item>
          <div style="height: 30px"></div>
          <div class="buttonDiv">
              <el-button type="primary" @click="submitForm('ruleForm')"
              >保存</el-button
              >
              <el-button @click="resetForm('ruleForm')">返回</el-button>
          </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { regionData } from "element-china-area-data";
import upload from "@/plugins/upload/uploadFile.vue";

export default {
  components: {
    upload,
  },
  data() {
    return {
      upload: {
        url: "/api/exam/upload/uploadFiles",
        auto: true,
        limit: 1,
        data: {},
      },
      options: regionData, // 地区列表
      ruleForm: {
        name: "",
        content: "",
        bgImg: "",
        userUuid: "",
        logo: "",
        selectedOptions: [],
        addressValue: "",
        principal: "",
        phone: null,
        type: [],
        nature: null,
        theme: "red",
        username: "",
        password: "",
      },
      rules: {
        phone: [
          {
            pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
            message: "手机号格式不对",
            trigger: "blur",
          },
        ],
        selectedOptions: [
          {
            type: "array",
            required: true,
            message: "请选择所在地区",
            trigger: "change",
          },
        ],
        name: [{ required: true, message: "请输入院校名称", trigger: "blur" }],
        password: [
          { required: true, message: "登录密码不能为空", trigger: "blur" },
          {
            pattern: /(?!^bai\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{6,14}/,
            message: "密码必须是6-14个字符，并且只能输入英文字母和数字",
            trigger: "blur",
          },
        ],
        username: [
          { required: true, message: "登录账号不能为空", trigger: "blur" },
        ],
      },
    };
  },
    created() {
      let typeName = this.$route.query.type === 'edit'? '编辑/查看学院' : '新增学院';
      this.$emit('getMeteData', this.$Bre.breadCrumbs([0, 3, 31]), typeName);
    },
    mounted() {
    if (this.$route.query.type == "edit") {
      this.getDetails();
    }
  },
  methods: {
    getDetails() {
      console.log(this.$route.query.id);
      this.$api.account
        .getCollegeDetails(this.$route.query.id)
        .then((response) => {
          // console.log(res.data.data);
          let data = this.ruleForm;
          let res = response.data;
          data.name = res.schoolName;
          data.logo = res.logo;
          // let option = ["110000", "110100", "110101"];
          let option = ["", "", ""];
          option = [
            res.province.toString(),
            res.city.toString(),
            res.area.toString(),
          ];
          data.selectedOptions = option;
          data.content = res.content;
          data.addressValue = res.detailed;
          data.principal = res.principal;
          data.phone = res.phone;
          if (res.type.length != 0) {
            console.log(data.type, 1);
            data.type = res.type.split(",");
            console.log(data.type, 2);
          }
          data.nature = res.nature;
          data.userUuid = res.userUuid;
          data.bgImg = res.background;
          data.theme = res.theme;
          data.username = res.username;
          data.password = res.password;
          console.log(this.ruleForm);
        });
    },
    imgUploadLogo(response) {
      this.$message.success("上传Logo图片成功");
      console.log(response);
      this.ruleForm.logo = response.data[0];
    },
    imgUploadBg(response) {
      this.$message.success("上传背景图片成功");
      console.log(response);
      this.ruleForm.bgImg = response.data[0];
    },
    handleChange() {
      console.log(this.ruleForm.selectedOptions);
    },
    deleteImg(type) {
      if (type == "logo") {
        this.ruleForm.logo = "";
      } else {
        this.ruleForm.bgImg = "";
      }
    },
    editCollege() {
      let datas = this.ruleForm;
      let type = this.ruleForm.type.join(",");
      let data = {
        uuid: this.$route.query.id,
        schoolName: datas.name,
        logo: datas.logo,
        content: datas.content,
        userUuid: datas.userUuid,
        province: datas.selectedOptions[0],
        city: datas.selectedOptions[1],
        area: datas.selectedOptions[2],
        detailed: datas.addressValue,
        principal: datas.principal,
        phone: datas.phone,
        type: type,
        nature: datas.nature,
        background: datas.bgImg,
        theme: datas.theme,
        password: datas.password,
        username: datas.username,
      };
      this.$api.account.putCollegeManageList(data).then((res) => {
        console.log(res);
        this.$message.success("修改成功");
        this.$router.push({ path: "/collegeManage" });
      });
    },
    createCollege() {
      let type = "";
      this.ruleForm.type.map((item) => {
        type = type + item + ",";
      });
      type = type.slice(0, type.length - 1);
      let data = {
        schoolName: this.ruleForm.name,
        province: this.ruleForm.selectedOptions[0],
        city: this.ruleForm.selectedOptions[1],
        area: this.ruleForm.selectedOptions[2],
        content: this.ruleForm.content,
        detailed: this.ruleForm.addressValue,
        principal: this.ruleForm.principal,
        phone: this.ruleForm.phone,
        type: type,
        nature: this.ruleForm.nature,
        background: this.ruleForm.bgImg,
        logo: this.ruleForm.logo,
        theme: this.ruleForm.theme,
        username: this.ruleForm.username,
        password: this.ruleForm.password,
      };
      console.log(data);
      this.$api.account.createCollegeManage(data).then((res) => {
        console.log(res);
        this.$message.success("新增院校成功");
        this.$router.push({ path: "/collegeManage" });
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.$route.query.type == "add") {
            this.createCollege();
          } else {
            this.editCollege();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    pictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    resetForm() {
      this.$router.push({ path: "collegeManage" });
    },
  },
};
</script>
<style scoped lang="scss">

.img {
  border-radius: 10px;
  width: 400px;
}
</style>
