<template>
  <div class="professionalManage">
    <base-list
      ref="demoTable"
      :condition="condition"
      :datas.sync="demoList"
      :pageSearch="pageSearch"
      :isPaging="true"
    >
      <el-form
        style="display: flex;justify-content: space-between"
        :inline="true"
        :model="condition"
        class="search-form"
        slot="search"
        label-width="80px"
      >
        <div>
          <el-form-item>
            <el-select
              @change="schoolChange"
              v-model="condition.conditionModel.schoolUuid"
              placeholder="请选择院校"
              clearable
            >
              <el-option
                v-for="item in schoolLists"
                :key="item.uuid"
                :label="item.schoolName"
                :value="item.uuid"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select
              @change="majorChange"
              v-model="condition.conditionModel.majorUuid"
              placeholder="请选择专业"
              clearable
            >
              <el-option
                v-for="item in majorLists"
                :key="item.uuid"
                :label="item.majorName"
                :value="item.uuid"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="condition.conditionModel.gradeUuid" placeholder="请选择班级" clearable>
              <el-option
                v-for="item in gradeLists"
                :key="item.uuid"
                :label="item.gradeName"
                :value="item.uuid"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="condition.conditionModel.fieldName" placeholder="姓名/身份证/联系电话"></el-input>
          </el-form-item>
          <el-button type="primary" @click="loadData">搜索</el-button>
        </div>
        <div>
          <el-button type="success" icon="el-icon-plus" @click="moreUploadDialog=true">批量新增</el-button>
          <el-button type="warning" icon="el-icon-plus" @click="addStudent('add')">新增学生</el-button>
        </div>
      </el-form>

      <el-table slot="list" :data="demoList" stripe border>
        <el-table-column prop="id" align="center" label="学号" width="70px">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column prop="created_at" align="center" label="院校">
          <template slot-scope="scope">{{ scope.row.schoolName }}</template>
        </el-table-column>
          <el-table-column prop="schools" align="center" label="所属专业及班级">
              <template slot-scope="scope">
                  <p class="mar10" v-for="(item,index) in scope.row.majorAndGrade" :key="index">{{item.majorName}}/{{item.gradeName}}</p>
              </template>
          </el-table-column>
        <el-table-column prop="created_at" align="center" label="学生姓名">
          <template slot-scope="scope">{{ scope.row.studentName }}</template>
        </el-table-column>

        <el-table-column prop="created_at" align="center" label="性别">
          <template slot-scope="scope">{{ scope.row.sex | sex }}</template>
        </el-table-column>
        <el-table-column prop="created_at" align="center" label="年龄">
          <template slot-scope="scope">{{ scope.row.age }}</template>
        </el-table-column>
        <el-table-column prop="created_at" align="center" label="身份证">
          <template slot-scope="scope">{{ scope.row.card }}</template>
        </el-table-column>
        <el-table-column prop="created_at" align="center" label="准考证">
          <template slot-scope="scope">{{ scope.row.exam }}</template>
        </el-table-column>
        <el-table-column prop="created_at" align="center" label="联系电话">
          <template slot-scope="scope">{{ scope.row.phone }}</template>
        </el-table-column>
        <el-table-column prop="created_at" align="center" label="紧急电话">
          <template slot-scope="scope">{{ scope.row.urgentPhone }}</template>
        </el-table-column>
        <el-table-column prop="created_at" align="center" label="激活状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.isPass"
              active-color="#13ce66"
              @change="changeSwitch(scope.row.isPass,scope.row.uuid)"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" align="center" label="学习状态">
          <template slot-scope="scope">{{ scope.row.studentType | studentType}} </template>
        </el-table-column>
        <el-table-column prop="created_at" align="center" label="创建时间">
          <template slot-scope="scope">{{ scope.row.createDate }}</template>
        </el-table-column>
        <el-table-column prop="created_at" align="center" width="200" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="go('/addStudent',scope.row, 'edit')">编辑/查看</el-button>
<!--            <el-button type="text" @click="openSnap(scope.row)">查看抓拍</el-button>-->
            <el-button type="text" v-if="isSchool === 'false'" style="color: #e85f64" @click="deleteStudent(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </base-list>
      <el-dialog
          title="查看图片"
          :visible.sync="snapDialog"
          width="40%"
          >
          <el-carousel type="card" :interval="5000">
              <el-carousel-item v-for="item in imgList" :key="item">
                  <img :src="item" style="height: 100%;border-radius: 20px">
              </el-carousel-item>
          </el-carousel>
      </el-dialog>
      <el-dialog
          :visible.sync="moreUploadDialog"
          width="600px"
          :fullscreen="true"
          :before-close="handleClose">
          <div v-if="!tableStatus" style="display: flex;justify-content: space-around;align-items: center;height: 100vh">
              <div style="text-align: center">
                  <p>1、下载模版表格，按要求填写信息</p>
                  <img src="@/assets/excel.png" class="m-b-20" alt="">
                  <downLoadTemplate types="student"></downLoadTemplate>
              </div>
              <div style="text-align: center">
                  <p>2、上传文件</p>
                  <img src="@/assets/uploadPng.png" class="m-b-20" alt="">
                  <div>
                      <el-upload
                          class="upload-demo"
                          action="/api/user/down/batch-import-students"
                          :limit="999"
                          ref="uploadTemplate"
                          :headers="token"
                          :before-upload="beforeAvatarUpload"
                          :on-error="uploadError"
                          :on-success="uploadSuccess"
                      >
                          <el-button type="primary" plain>上传文件</el-button>
                      </el-upload>
                  </div>
              </div>
          </div>
          <div v-else>
              <el-table
                  :data="errorTableData"
                  style="width: 100%">
                  <el-table-column
                      prop="row"
                      label="行号"
                      width="100">
                  </el-table-column>
                  <el-table-column
                      prop="column"
                      label="列号"
                      width="100">
                  </el-table-column>
                  <el-table-column
                      prop="errorMessage"
                      label="错误原因">
                  </el-table-column>
              </el-table>
              <div style="text-align: center">
                  <el-upload
                      class="upload-demo"
                      action="/api/user/down/batch-import-students"
                      :limit="999"
                      ref="uploadTemplate"
                      :headers="token"
                      :before-upload="beforeAvatarUpload"
                      :on-error="uploadError"
                      :on-success="uploadSuccess"
                  >
                      <el-button style="margin-top: 50px; " type="primary" plain>重新上传</el-button>
                  </el-upload>
              </div>

          </div>
      </el-dialog>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import downLoadTemplate from "@/plugins/DownLoadTemplate";
import Cookies from "js-cookie";
export default {
  name: "professionalManage",
  computed: {
    // 院校,专业,班级
    ...mapState("school", {
      schoolLists: (state) => state.schoolLists,
      majorLists: (state) => state.majorLists,
      gradeLists: (state) => state.gradeLists,
    }),
  },
    components: {downLoadTemplate},
  data() {
    return {
        token: {
            token: Cookies.get('token')
        },
        tableStatus: false,
        errorTableData: [],
        snapDialog:false,
        imgList:[],
        isSchool: '',
        moreUploadDialog: false,
      // 查询条件
      condition: {
        conditionModel: {
          schoolUuid: "",
          majorUuid: "",
          gradeUuid: "",
        },
      },
      collegeOption: [],
      majorOption: [],
      gradeOptions: [],
      // table数组
      demoList: [],
      // 分页查询api接口
      pageSearch: this.$api.account.getStudentManageList,
    };
  },
  filters: {
      studentType(val){
          if(val==0){
              return '已毕业';
          }else{
              return '学习中';
          }
      },
    sex(val) {
      if (val == "man") {
        return "男";
      } else {
        return "女";
      }
    },
  },
  created() {
      this.$emit('getMeteData', this.$Bre.breadCrumbs([0, 4, 42]));
      this.isSchool = window.localStorage.getItem('isSchool');
  },
  mounted() {
    this.getSchoolListAction();
  },
  methods: {
    ...mapActions("school", [
      "getSchoolListAction",
      "getMajorListAction",
      "getGradeListAction",
    ]),
      handleClose(done) {
          this.$confirm('确认关闭？')
              .then(() => {
                  done();
                  this.loadData();
                  this.tableStatus = false;
              }).catch(() => {});
      },
      beforeAvatarUpload(file) {
          // this.$refs.uploadTemplate.clearFiles();
          const isLt10M = file.size / 1024 / 1024 < 50;
          if (!isLt10M) {
              this.$message.error('上传文件大小不能超过 50MB!');
          }
          return isLt10M;
      },
      uploadSuccess(response) {
          console.log(response);
          if (response.data.length === 0) {
              this.$message.success('上传成功');
              this.tableStatus = false;
              this.moreUploadDialog = false;
              this.loadData();
          } else {
              this.tableStatus = true;
              this.$message.error('解析失败');
              this.errorTableData = response.data;
              this.$refs.uploadTemplate.clearFiles();
          }
      },
      uploadError(err) {
          let msg = err.toString().split('"')[5];
          this.$message.error(msg);
      },
      openSnap(row){
        // 抓拍照片查看
        //   getSnapImgList
          this.$api.account.getSnapImgList(row.uuid).then(res=>{
             console.log(res);
             if(res.data){
                 if(res.data.imgs){
                     this.snapDialog = true;
                     this.imgList = res.data.imgs.split(",");
                 }else{
                     this.$message.warning('该学生没有完成人脸识别抓拍');
                 }
             }else{
                 this.$message.warning('该学生没有完成人脸识别抓拍');
             }

          });
      },
    // 院校改变
    schoolChange(val) {
      this.condition.conditionModel.majorUuid = "";
      this.condition.conditionModel.gradeUuid = "";
      this.getMajorListAction({
        schoolUuid: val,
      });
    },
    // 专业改变
    majorChange(val) {
      this.condition.conditionModel.gradeUuid = "";
      this.getGradeListAction({
        schoolUuid: this.condition.conditionModel.schoolUuid,
        majorUuid: val,
      });
    },
    deleteStudent(id) {
        this.$confirm('此操作将永久删除该学员, 是否确认?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            this.$api.account.deleteStudent(id.uuid).then((res) => {
                this.loadData();
                console.log(res);
                this.$message.success("删除成功");
            });
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });
        });

    },
    changeSwitch(val, id) {
      console.log(val);
      let data = {
        uuid: id,
        isPass: val,
      };
      this.$api.account.updateStudentIsPass(data).then((res) => {
        console.log(res);
        this.$message.success("修改成功");
      });
    },
    go(url, item, type) {
      this.$router.push({
        path: url,
        query: {
          id: item.uuid,
          type: type,
        },
      });
    },
    addStudent(type) {
      this.$router.push({
        path: "/addStudent",
        query: {
          type: type,
        },
      });
    },
    loadData() {
      this.$refs.demoTable.loadData();
    },
  },
};
</script>
