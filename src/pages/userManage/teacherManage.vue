<!--教师管理-->
<template>
  <div class="teacherManage">
    <base-list
      ref="demoTable"
      :condition="condition"
      :datas.sync="demoList"
      :pageSearch="pageSearch"
      :isPaging="true"
    >
      <el-form
        :inline="true"
        :model="condition"
        class="search-form"
        slot="search"
        label-width="80px"
      >
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
          <el-select v-model="condition.conditionModel.majorUuid" placeholder="请选择专业" clearable>
            <el-option
              v-for="item in majorLists"
              :key="item.uuid"
              :label="item.majorName"
              :value="item.uuid"
            ></el-option>
          </el-select>
        </el-form-item>
          <el-button class="fr m-l-20" type="success" @click="moreUploadDialog=true" icon="el-icon-plus">批量新增</el-button>
        <el-button
          class="fr"
          type="success"
          icon="el-icon-plus"
          @click="$router.push({name:'addTeacher',query:{isAdded:'use'}})"
        >新增老师</el-button>

        <el-button class="fr mar20" type="primary" @click="loadData">搜索</el-button>
        <el-form-item class="fr">
          <el-input
            v-model="condition.conditionModel.fieldName"
            placeholder="请输入教师名称，电话"
            clearable
          />
        </el-form-item>
      </el-form>

      <el-table slot="list" :data="demoList" stripe border>
        <el-table-column prop="ID" align="center" label="ID" width="70px">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
          <el-table-column prop="teacherName" align="center" label="教师名称">
              <template template slot-scope="scope">{{ scope.row.teacherName }}</template>
          </el-table-column>
        <el-table-column prop="schools" align="center" label="所属院校及专业">
          <template slot-scope="scope">
            <p class="mar10" v-for="(item,index) in scope.row.schoolAndMajors" :key="index">{{item.schoolUuid}}/{{item.majorUuid}}</p>
          </template>
        </el-table-column>

        <el-table-column prop="teacherTypes" align="center" label="教师类型">
          <template slot-scope="scope">
            <span class="mar10" v-for="(item,index) in scope.row.teacherTypes" :key="index">{{item}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="phone" align="center" label="联系电话">
          <template template slot-scope="scope">{{ scope.row.phone }}</template>
        </el-table-column>
        <el-table-column prop="pass" align="center" label="激活状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.isPass"
              @change="isPass(scope.row.uuid, scope.row.isPass)"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" align="center" label="创建时间">
          <template slot-scope="scope">{{ scope.row.createDate }}</template>
        </el-table-column>
        <el-table-column prop="created_at" align="center" label="操作">
          <template slot-scope="scope">
            <span
              class="span"
              :id="scope.row.created_at"
              @click="$router.push({name:'addTeacher',query:{uuid:scope.row.uuid,isAdded:'see'}})"
            >编辑/查看</span>
          </template>
        </el-table-column>
      </el-table>
    </base-list>
      <el-dialog
          :visible.sync="moreUploadDialog"
          width="600px"

          :fullscreen="true"
          :before-close="handleClose">
          <div v-if="!tableStatus"
               style="display: flex;justify-content: space-around;align-items: center;height: 100vh">
              <div style="text-align: center">
                  <p>1、下载模版表格，按要求填写信息</p>
                  <img src="@/assets/excel.png" class="m-b-20" alt="">
                  <downLoadTemplate types="teacher"></downLoadTemplate>
              </div>
              <div style="text-align: center">
                  <p>2、上传文件</p>
                  <img src="@/assets/uploadPng.png" class="m-b-20" alt="">
                  <div>
                      <el-upload
                          class="upload-demo"
                          action="/api/user/down/batch-import-teachers"
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
                      action="/api/user/down/batch-import-teachers"
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
import Cookies from "js-cookie";
import downLoadTemplate from "@/plugins/DownLoadTemplate";
export default {
  name: "teacherManage",
    components: {
        downLoadTemplate
    },
  computed: {
    // 院校,专业,班级
    ...mapState("school", {
      schoolLists: (state) => state.schoolLists,
      majorLists: (state) => state.majorLists,
    }),
  },
  data() {
    return {
        token: {
            token: Cookies.get('token')
        },
        errorTableData: [],
        moreUploadDialog: false,
        tableStatus: false,
      // 查询条件
      condition: {
        conditionModel: {
          schoolUuid: "",
          majorUuid: "",
        },
      },
      // table数组
      demoList: [],
      // 分页查询api接口
      pageSearch: this.$api.common.teacherList,
      ishodeen: false,
      schoolList: [],
      majorList: [],
    };
  },
  methods: {
    ...mapActions("school", ["getSchoolListAction", "getMajorListAction"]),
    // 院校改变
    schoolChange(val) {
      this.condition.conditionModel.majorUuid = "";
      this.getMajorListAction({
        schoolUuid: val,
      });
    },
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
              this.$message.error('解析失败');
              this.tableStatus = true;
              this.errorTableData = response.data;
              this.$refs.uploadTemplate.clearFiles();
          }
      },
      uploadError(err) {
        let msg = err.toString().split('"')[5];
          this.$message.error(msg);
      },
    loadData() {
      this.$refs.demoTable.loadData();
    },
    isPass(Id, pass) {
      let params = {};
      params.uuid = Id;
      params.isPass = pass;
      this.$api.teacherManage.updateTeacherPass(params).then((res) => {
        if (res.code == 0) this.$message.success("操作成功!");
      });
    },
  },
    created() {
        this.$emit('getMeteData', this.$Bre.breadCrumbs([0, 3, 33]));
    },
    mounted() {
    this.getSchoolListAction();
  },
};
</script>

<style lang="scss" scoped>
.span {
  color: #409dff;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
}
</style>
