<!-- 班级管理-->
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
            <el-select v-model="condition.conditionModel.majorUuid" placeholder="请选择专业" clearable>
              <el-option
                v-for="item in majorLists"
                :key="item.uuid"
                :label="item.majorName"
                :value="item.uuid"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div>
          <el-form-item>
            <el-input v-model="condition.conditionModel.gradeName" placeholder="请输入班级名称"></el-input>
          </el-form-item>
          <el-button type="primary" @click="loadData">搜索</el-button>
          <el-button type="warning" icon="el-icon-plus" @click="addGrade">新增班级</el-button>
        </div>
      </el-form>
      <el-table slot="list" :data="demoList" stripe border>
        <el-table-column prop="id" align="center" label="#" width="70px">
          <template slot-scope="scope">{{scope.$index+1}}</template>
        </el-table-column>
        <el-table-column prop="created_at" align="center" label="院校">
          <template slot-scope="scope">{{ scope.row.schoolName }}</template>
        </el-table-column>
        <el-table-column prop="created_at" align="center" label="专业">
          <template slot-scope="scope">{{ scope.row.majorName }}</template>
        </el-table-column>
        <el-table-column prop="created_at" align="center" label="班级名称">
          <template template slot-scope="scope">{{ scope.row.gradeName }}</template>
        </el-table-column>
        <el-table-column prop="created_at" align="center" label="班主任">
          <template slot-scope="scope">{{ scope.row.teacherName }}</template>
        </el-table-column>
        <el-table-column prop="created_at" align="center" label="创建时间">
          <template slot-scope="scope">{{ scope.row.createDate }}</template>
        </el-table-column>
        <el-table-column prop="created_at" align="center" label="操作" width="300">
          <template slot-scope="scope">
            <el-button type="text" @click="go('/addGrade',scope.row)">编辑/查看</el-button>
            <el-button type="text" @click="go('/gradeStudentManagement',scope.row)">管理学生</el-button>
              <el-button type="text" @click="isShowExport(scope.row)">导出成绩</el-button>
            <el-button type="text" @click="go('/gradeExpense',scope.row)">班费管理</el-button>
          </template>
        </el-table-column>
      </el-table>
    </base-list>
      <el-dialog
          title="请选择导出成绩的课程"
          :visible.sync="isExport">
          <el-form :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="课程类型">
                  <el-radio-group v-model="ruleForm.isUpdate" @change="classChange">
<!--                      <el-radio label="">全部课程</el-radio>-->
                      <el-radio label="offline">认定课程</el-radio>
<!--                      <el-radio label="unified">国考课程</el-radio>-->
                  </el-radio-group>
              </el-form-item>
              <el-form-item label="请选择课程" v-if="ruleForm.isUpdate">
                  <el-select v-model="ruleForm.region" multiple  placeholder="请选择课程">
                      <el-option v-for="(item, index) in specialtyNameList" :key="index" :label="item.specialtyName" :value="item.uuid"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item>
                  <el-button @click="isExport = false">取消</el-button>
                  <el-button type="primary"  @click="submitForm('ruleForm')">导出</el-button>
              </el-form-item>
          </el-form>
      </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { downLoadFiles } from '@/tools/funcEx';
import axios from "axios";
export default {
  name: "professionalManage",
  data() {
    return {
        isExport: false,
        dataExport: [],
      // 查询条件
      condition: {
        conditionModel: {
          collageUuid: "",
          majorUuid: "",
        },
      },
        ruleForm: {
            isUpdate: 'offline',
            region: []
        },
        specialtyNameList: [],
      // table数组
      demoList: [],
      // 分页查询api接口
      pageSearch: this.$api.grade.selectGrade
    };
  },
  computed: {
    // 院校,专业,课程
    ...mapState("school", {
      schoolLists: (state) => state.schoolLists,
      majorLists: (state) => state.majorLists,
    }),
  },
    created() {
        this.$emit('getMeteData', this.$Bre.breadCrumbs([0, 4, 41]));
    },
    mounted() {
    this.getSchoolListAction();
  },
  methods: {
    ...mapActions("school", ["getSchoolListAction", "getMajorListAction"]),
      classChange(val) {
          this.specialtyNameList = [];
          this.ruleForm.region = [];
          this.$api.studyManage.getSpecialtyList({
              conditionModel: {
                  majorUuid: val.majorUuid,
                  type: 'disGeneralExamination'
              }
          }).then(res => {
              if(res.code === 0 ) {
                  let all = [{
                      specialtyName: '全部',
                      uuid: ''
                  }];
                  this.specialtyNameList = [...all, ...res.data];
              }
          });
      },
      submitForm(formName) {
          const than = this;
          this.$refs[formName].validate(valid => {
              if(!valid) return;
              let params = {
                  gradeName: than.dataExport.gradeName,
                  gradeUuid: than.dataExport.uuid,
                  specialtyUuids: than.ruleForm.region.length === 0? '' : than.ruleForm.region,
                  type: than.ruleForm.isUpdate || ''
              };
              axios.get(`/api/exam/upload/export-batch-student-score/${params.gradeName}/${params.gradeUuid}?specialtyUuids=${params.specialtyUuids}&type=${params.type}`, {
                  responseType: "blob"
              }).then(res => {
                  downLoadFiles(res);
              });
          });
      },
      isShowExport(data) {
        this.dataExport = data;
        this.classChange(data);
        this.isExport = true;
      },
    go(url, item) {
      this.$router.push({
        path: url,
        query: {
          id: item.uuid,
          type: "edit",
        },
      });
    },
    addGrade() {
      this.$router.push({
        path: "/addGrade",
        query: {
          type: "add",
        },
      });
    },
    loadData() {
      this.$refs.demoTable.loadData();
    },
    // 院校改变
    schoolChange(val) {
      this.condition.conditionModel.majorUuid = "";
      this.getMajorListAction({
        schoolUuid: val,
      });
    },
  },
};
</script>
