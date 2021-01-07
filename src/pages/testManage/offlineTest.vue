<!--线下考试-->
<template>
  <div>
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
            v-model="condition.conditionModel.collageUuid"
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
          <el-select v-model="condition.conditionModel.courseUuid" placeholder="请选择专业课" clearable>
            <el-option
              v-for="item in specialtyLists"
              :key="item.uuid"
              :label="item.specialtyName"
              :value="item.uuid"
            ></el-option>
          </el-select>
        </el-form-item>

        <div class="fr">
          <el-form-item>
            <el-input
              v-model="condition.conditionModel.additionalParameter"
              placeholder="输入考试名称"
              @keyup.enter.native="loadData"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="loadData">搜索</el-button>
          </el-form-item>
          <el-button type="success" icon="el-icon-plus" @click="jump('offlineTestAdd')">新增考试</el-button>
        </div>
      </el-form>

      <el-table slot="list" :data="demoList" stripe border>
        <el-table-column prop="ID" align="center" label="ID" width="70px">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column prop="paperName" align="center" label="考试名称" width="200px">
          <template slot-scope="scope">{{ scope.row.examName }}</template>
        </el-table-column>
        <el-table-column prop="schoolName" align="center" label="报名费">
          <template slot-scope="scope">{{ scope.row.entryFree }}</template>
        </el-table-column>
        <el-table-column prop="majorName" align="center" label="院校">
          <template template slot-scope="scope">{{ scope.row.schoolName }}</template>
        </el-table-column>
        <el-table-column prop="specialtyName" align="center" label="专业">
          <template template slot-scope="scope">{{ scope.row.majorName }}</template>
        </el-table-column>
        <el-table-column prop="paperClassifyName" align="center" label="课程名称">
          <template slot-scope="scope">{{ scope.row.specialtyName }}</template>
        </el-table-column>
        <el-table-column prop="createDate" align="center" label="考试时间" width="250">
          <template
            slot-scope="scope"
          >{{ scope.row.examStartTime.substr(0, 16) }} - {{scope.row.examEndTime.substr(10, 6)}}</template>
        </el-table-column>
        <el-table-column prop="createDate" align="center" label="报名截止时间">
          <template slot-scope="scope">{{ scope.row.applyEndDate }}</template>
        </el-table-column>
        <el-table-column prop="createDate" align="center" label="状态">
          <template slot-scope="scope">{{ scope.row.status }}</template>
        </el-table-column>
        <el-table-column prop="createDate" align="center" label="创建时间">
          <template slot-scope="scope">{{ scope.row.createDate }}</template>
        </el-table-column>
        <el-table-column prop="created_at" align="center" label="操作" width="300">
          <template slot-scope="scope">
            <div class="box">
              <span
                class="link falcon-primary"
                @click="jump('offlineTestAdd', scope.row.uuid)"
              >编辑/查看</span>
              <span
                @click="jump('registerStudent', scope.row.uuid)"
                class="link falcon-primary"
              >报名学员</span>
              <el-popconfirm
                @onConfirm="updateStatus(scope.row.uuid)"
                confirmButtonText="确定"
                cancelButtonText="取消"
                title="确定改变当前试卷状态？"
              >
                <span
                  slot="reference"
                  class="link falcon-danger"
                >{{!scope.row.isOffline ? '下线' : '上线'}}</span>
              </el-popconfirm>
              <span class="link falcon-primary" @click="jump('proctorVideo', scope.row.uuid)">监考视频</span>
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
  name: "OnlineTest",
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
      // table
      condition: {
        conditionModel: {
          collageUuid: "",
          majorUuid: "",
          courseUuid: "",
          additionalParameter: "",
          isOfflineExam: true,
        },
      },
      demoList: [],
      pageSearch: this.$api.testManage.getListExamBasic,
      options: [],
    };
  },
    created() {
        this.$emit('getMeteData', this.$Bre.breadCrumbs([0, 6, 64]));
    },
    mounted() {
    this.getSchoolListAction();
  },
  methods: {
    ...mapActions("school", [
      "getSchoolListAction",
      "getMajorListAction",
      "getStudyManageAction",
    ]),
    //   刷新列表
    loadData() {
      this.$refs.demoTable.loadData();
    },
    // 页面跳转
    jump(name, id) {
      this.$router.push({
        name: name,
        query: {
          id: id,
          type: 'offlineTest'
        },
      });
    },
    // 院校改变
    schoolChange(val) {
      this.condition.conditionModel.majorUuid = "";
      this.condition.conditionModel.courseUuid = "";
      this.getMajorListAction({
        schoolUuid: val,
      });
    },
    // 专业改变
    majorChange(val) {
      this.condition.conditionModel.courseUuid = "";
      this.getStudyManageAction({
        schoolUuid: this.condition.conditionModel.collageUuid,
        majorUuid: val,
      });
    },
    // 上线，下线
    async updateStatus(id) {
      const params = {
        uuid: id,
      };
      const res = await this.$api.testManage.updateExamBasicStatus(params);

      if (res.code == 0) {
        this.loadData();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.link {
  cursor: pointer;
  display: inline-block;
  margin-right: 10px;
}
</style>
