<!--试卷管理-->
<template>
  <div class="examinationManagement">
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
          <el-select
            v-model="condition.conditionModel.courseUuid"
            placeholder="请选择专业课"
            clearable
          >
            <el-option
              v-for="item in specialtyLists"
              :key="item.uuid"
              :label="item.specialtyName"
              :value="item.uuid"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-button
          class="fr"
          type="success"
          icon="el-icon-plus"
          @click="
            $router.push({ name: 'addExamination', query: { isAdded: 'use' } })
          "
          >新增试卷</el-button
        >
        <el-button class="fr mar20" type="primary" @click="loadData"
          >搜索</el-button
        >
        <el-form-item class="fr">
          <el-input
            v-model="condition.conditionModel.paperName"
            placeholder="请输入试卷名称"
            clearable
          />
        </el-form-item>
      </el-form>

      <el-table slot="list" :data="demoList" stripe border>
        <el-table-column prop="ID" align="center" label="ID" width="70px">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column prop="paperName" align="center" label="试卷名称">
          <template slot-scope="scope">{{ scope.row.paperName }}</template>
        </el-table-column>
        <el-table-column prop="schoolName" align="center" label="院校">
          <template slot-scope="scope">{{ scope.row.schoolName }}</template>
        </el-table-column>
        <el-table-column prop="majorName" align="center" label="专业">
          <template template slot-scope="scope">{{
            scope.row.majorName
          }}</template>
        </el-table-column>
        <el-table-column prop="specialtyName" align="center" label="课程名称">
          <template template slot-scope="scope">{{
            scope.row.specialtyName
          }}</template>
        </el-table-column>
        <el-table-column
          prop="paperClassifyName"
          align="center"
          label="试卷分类"
        >
          <template slot-scope="scope">{{
            scope.row.paperClassifyName
          }}</template>
        </el-table-column>
        <el-table-column prop="createDate" align="center" label="创建时间">
          <template slot-scope="scope">{{ scope.row.createDate }}</template>
        </el-table-column>
        <el-table-column
          prop="created_at"
          align="center"
          label="操作"
          width="250"
        >
          <template slot-scope="scope">
            <div class="box">
              <span
                class="span"
                @click="
                  $router.push({
                    name: 'addExamination',
                    query: { uuid: scope.row.uuid, isAdded: 'see' },
                  })
                "
                >编辑/查看</span
              >
              <em class="emClass"></em>
              <span
                class="span"
                @click="
                  $router.push({
                    name: 'examQuestionList',
                    query: {
                      examId: scope.row.uuid,
                    },
                  })
                "
                >管理试卷题目</span
              >
              <em class="emClass"></em>
              <span class="span" @click="deleteSub(scope.row.uuid)">删除</span>
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
  name: "examinationManagement",
  data() {
    return {
      // 查询条件
      condition: {
        conditionModel: {
          collageUuid: "",
          majorUuid: "",
          courseUuid: "",
        },
      },
      // table数组
      demoList: [],
      // 分页查询api接口
      pageSearch: this.$api.classificationManage.paperPracticeList,
      ishodeen: false,
      // schoolList: [],
      // majorList: [],
      // specialtyList: [],
    };
  },
  computed: {
    // 院校,专业,课程
    ...mapState("school", {
      schoolLists: (state) => state.schoolLists,
      majorLists: (state) => state.majorLists,
      specialtyLists: (state) => state.specialtyLists,
    }),
  },
    created() {
        this.$emit('getMeteData', this.$Bre.breadCrumbs([0, 5, 53]));
    },
  methods: {
    ...mapActions("school", [
      "getSchoolListAction",
      "getMajorListAction",
      "getStudyManageAction",
    ]),
    loadData() {
      this.$refs.demoTable.loadData();
    },
    deleteSub(id) {
      this.$confirm("是否删除此项题目?", "提示", { type: "warning" })
        .then(() => {
          this.$api.classificationManage.deletePaperPractice(id).then((res) => {
            if (res.code == 0) {
              if (res.code == 0) {
                this.loadData("删除成功");
              } else {
                this.$message.error("删除失败,请重试!");
              }
            }
          });
        })
        .catch(() => {
          console.log("取消了");
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
  },
  mounted() {
    this.getSchoolListAction();
    // 院校
    // this.$api.common.schoolsList({}).then((res) => {
    //   if (res.code == 0) this.schoolList = res.data;
    // });
    // 专业
    // this.$api.common.majorList({}).then((res) => {
    //   if (res.code == 0) this.majorList = res.data;
    // });
    // 专业课
    // this.$api.studyManage.getSpecialtyList({}).then((res) => {
    //   if (res.code == 0) this.specialtyList = res.data;
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
    color: #f56c6c;
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
    &:first-child {
      color: #409dff;
    }
    &:nth-child(3) {
      color: #409dff;
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
