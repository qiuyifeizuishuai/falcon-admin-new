<!--线上考试-->
<template>
  <div class="falcon-onlineTest-form">
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
        <div class="fr">
          <el-form-item>
            <el-input
              v-model="condition.conditionModel.studentName"
              placeholder="输入学员名称"
              @keyup.enter.native="loadData"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="loadData">搜索</el-button>
          </el-form-item>
        </div>
          <el-button v-if="$route.query.type" type="success" icon="el-icon-plus" @click="showOpen">批量新增</el-button>
      </el-form>

      <el-table slot="list" :data="demoList" stripe border>
        <el-table-column prop="ID" align="center" label="#" width="70px">
          <template slot-scope="scope">{{ scope.$index+1 }}</template>
        </el-table-column>
        <el-table-column prop="paperName" align="center" label="学员名称">
          <template slot-scope="scope">{{ scope.row.studentName }}</template>
        </el-table-column>
        <el-table-column prop="schoolName" align="center" label="考试得分">
          <template slot-scope="scope">
             <el-input style="width: 50%" v-model.trim="scope.row.testScore" @focus="handleFocus(scope.row)" @blur="handleBlur(scope.row)" v-if="isShow"></el-input>
              <span v-else>{{scope.row.testScore}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="majorName" align="center" label="报名时间">
          <template template slot-scope="scope">{{ scope.row.createTime }}</template>
        </el-table-column>
      </el-table>
    </base-list>
      <batchAdd ref="batchAdd" :batchAddData="batchAddData" @loadData="loadData"/>
  </div>
</template>

<script>
import batchAdd from  '@/components/batch-add/batch-add';
export default {
  name: "OnlineTestAdd",
  components: {batchAdd},
  data() {
    return {
      // table
      pageSearch: this.$api.testManage.getExamStudent,
      condition: {
        conditionModel: {
          examUuid: this.$route.query.id, //考试id
          studentName: "", //学生姓名
        },
      },
      demoList: [],
      options: [],
      isShow: false,
      currentScore:null,
      batchAddData: {
          downloadUrl: '/api/user/down/export-report-template/offline/',
          upDataUrl: '/api/exam/upload/import-offline-exam-score',
          typeId: {
              examUuid: this.$route.query.id
          }
       }
    };
  },
  created() {
      if(this.$route.query.type === "offlineTest") {
          this.isShow = true;
      }
      if(this.$route.query.type) {
          this.$emit('getMeteData', this.$Bre.breadCrumbs([0, 6, 64]), '报名学员');
          return;
      }
      this.$emit('getMeteData', this.$Bre.breadCrumbs([0, 6, 62]), '报名学员');
  },
    methods: {
        showOpen() {
          this.$refs['batchAdd'].isOpen();
        },
    //   刷新列表
    loadData() {
      this.$refs.demoTable.loadData();
    },
        //  拷贝当前的成绩
    handleFocus(value) {
        this.currentScore = value.testScore;
    },
        //  提交成绩
    handleBlur(value) {
        if (value.testScore) {
            this.$confirm('你确定提交成绩吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let data = {
                    examUuid:this.$route.query.id,
                    score:Number(value.testScore),
                    studentUuid:value.studentUuid
                };
                this.$api.testManage.submitPerformance(data).then(res => {
                    if(res.code === 0) {
                        this.$message.success("成绩提交成功");
                   } else {
                       this.$message.error("成绩提交失败");
                        value.testScore = this.currentScore;
                   }
                });
            }).catch(() => {
                value.testScore = this.currentScore;
            });
        } else if (value.testScore) {
            this.$message.error("请输入正确的数字");
            value.testScore = this.currentScore;
        }
    }
  },
};
</script>
