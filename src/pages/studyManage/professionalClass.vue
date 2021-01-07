<!--专业课-->
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
        <el-button
          class="fr"
          type="success"
          icon="el-icon-plus"
          @click="$router.push({name:'addCurriculum',query:{isAdded:'use',type:'disGeneralExamination'}})"
        >新增课程</el-button>
        <el-button class="fr mar20" type="primary" @click="loadData">搜索</el-button>
        <el-form-item class="fr">
          <el-input
            v-model="condition.conditionModel.specialtyName"
            placeholder="请输入课程名称"
            clearable
          />
        </el-form-item>
      </el-form>

      <el-table slot="list" :data="demoList" stripe border>
        <el-table-column prop="ID" align="center" label="ID" width="70px">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column prop="schoolName" align="center" label="院校">
          <template slot-scope="scope">{{ scope.row.schoolName }}</template>
        </el-table-column>
        <el-table-column prop="majorName" align="center" label="专业">
          <template template slot-scope="scope">{{ scope.row.majorName }}</template>
        </el-table-column>
        <el-table-column prop="teacherName" align="center" label="授课老师">
          <template template slot-scope="scope">{{ scope.row.teacherName }}</template>
        </el-table-column>
        <el-table-column prop="specialtyName" align="center" label="课程名称">
          <template template slot-scope="scope">{{ scope.row.specialtyName }}</template>
        </el-table-column>
        <el-table-column prop="credit" align="center" label="学分">
          <template template slot-scope="scope">{{ scope.row.credit }}</template>
        </el-table-column>
        <el-table-column prop="period" align="center" label="学时要求">
          <template template slot-scope="scope">{{ scope.row.period |time}}</template>
        </el-table-column>
        <el-table-column prop="dayDuration" align="center" label="时长限制">
          <template template slot-scope="scope">{{ scope.row.dayDuration |time}}</template>
        </el-table-column>
        <el-table-column prop="createDate" align="center" label="创建时间">
          <template slot-scope="scope">{{ scope.row.createDate }}</template>
        </el-table-column>
        <el-table-column prop="isPass" align="center" label="激活状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.isPass"
              @change="isPass(scope.row.uuid)"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>
          <el-table-column label="课件" align="center">
              <template slot-scope="scope">
                  <el-upload
                      class="upload-demo"
                      action="/api/exam/upload/uploadFiles"
                      :limit="99"
                      :show-file-list="false"
                      :before-upload="beforeAvatarUploadCourseware"
                      :on-error="uploadErrorCourseware"
                      :on-success="uploadSuccessCourseware"
                  >
                      <el-button size="small" type="warning" v-if="scope.row.filePath" @click="upload=scope.row">更新课件</el-button>
                      <el-button size="small" type="priamry" @click="upload=scope.row" v-else>上传课件</el-button>
                  </el-upload>
              </template>
          </el-table-column>
        <el-table-column prop="created_at" align="center" label="操作" width="180">
          <template slot-scope="scope">
            <div class="box">
              <span
                class="span"
                @click="$router.push({name:'addCurriculum',query:{uuid:scope.row.uuid,isAdded:'see',type:'disGeneralExamination'}})"
              >编辑/查看</span>
              <em class="emClass"></em>
              <span
                class="span"
                @click="$router.push({path:'/sectionManagement', query:{
                            id:scope.row.uuid,
                            schoolUuid:scope.row.schoolUuid
                        }})"
              >章节管理</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </base-list>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "professionalManage",
  data() {
    return {
        uploadForm:{
            url:'/api/exam/upload/uploadFiles'
      },
        upload:{},
      // 查询条件
      condition: {
        conditionModel: {
          collageUuid: "",
          majorUuid: "",
          type: "disGeneralExamination",
        },
      },
      // table数组
      demoList: [],
      // 分页查询api接口
      pageSearch: this.$api.studyManage.getSpecialtyList,
      ishodeen: false,
      //   schoolList: [],
      //   majorList: [],
    };
  },
  computed: {
    // 院校,专业,课程
    ...mapState("school", {
      schoolLists: (state) => state.schoolLists,
      majorLists: (state) => state.majorLists,
    }),
  },
    filters:{
        time(val){
            if(val){
                return val +'分钟';
            }else{
                return '暂无设置';
            }
        }
    },
    created() {
        this.$emit('getMeteData', this.$Bre.breadCrumbs([0, 3, 34]));
    },
    methods: {
    ...mapActions("school", ["getSchoolListAction", "getMajorListAction"]),
    loadData() {
      this.$refs.demoTable.loadData();
    },
      uploadSuccessCourseware(response){
          let data = {
              filePath: response.data[0],
          };
          console.log(data);
          this.$api.studyManage.uploadCourseware(this.upload.uuid, data).then(() => {
              this.$message.success('上传成功');
              this.loadData();
          });
      },
      uploadErrorCourseware(){
          this.$message.error('上传课件失败,请刷新页面重试');
          this.loadData();
      },
      beforeAvatarUploadCourseware(file) {
          const isLt10M = file.size / 1024 / 1024 < 50;
          if (!isLt10M) {
              this.$message.error('上传文件大小不能超过 50MB!');
          }
          return isLt10M;
      },
      uploadSuccess(){
          this.$message.success('上传成功');
      },
      uploadError(){
          this.$message.error('上传失败，请重新上传');
      },
      isPass(Id) {
      this.$api.studyManage.updateSpecialtyPass(Id).then((res) => {
        if (res.code == 0) this.$message.success("操作成功!");
      });
    },
    open() {
      this.$router.push({ name: "addCurriculum" });
    },
    // 院校改变
    schoolChange(val) {
      this.condition.conditionModel.majorUuid = "";
      this.getMajorListAction({
        schoolUuid: val,
      });
    },
  },
  mounted() {
    this.getSchoolListAction();
    // 院校
    // this.$api.common.schoolsList({}).then(res => {
    //     if (res.code == 0) this.schoolList = res.data;
    // });
    // 专业
    // this.$api.common.majorList({}).then(res => {
    //     if (res.code == 0) this.majorList = res.data;
    // });
  },
};
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  align-items: center;
  justify-content: center;
  .span {
    color: #409dff;
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
  }
  .emClass {
    display: inline-block;
    height: 14px;
    width: 1px;
    background-color: #e5e5e5;
    margin: 0 10px;
  }
}
</style>
