<!--管理考试题目-->
<template>
  <div class="falcon-homework-list">
    <base-list
      ref="demoTable"
      :condition="condition"
      :datas.sync="demoList"
      :pageSearch="pageSearch"
      :isPaging="false"
    >
      <el-form
        :inline="true"
        :model="condition"
        class="search-form"
        slot="search"
        label-width="80px"
      >
        <el-button type="primary" @click="setDemand">主观题选做设置</el-button>
          <el-button type="primary" @click="isTopicOpen">题型介绍设置</el-button>
        <div class="fr">
          <el-form-item>
            <el-input
              v-model="condition.name"
              placeholder="请输入题目"
              @keyup.enter.native="loadData"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="loadData">搜索</el-button>
          </el-form-item>
          <el-form-item>
              <el-button type="success" icon="el-icon-plus" @click="jump()">新增题目</el-button>
          </el-form-item>
          <el-button
            type="success"
            @click="moreUploadDialog = true"
            icon="el-icon-plus"
            >批量新增</el-button
          >
        </div>
      </el-form>

      <!-- tableList -->
      <el-table slot="list" :data="demoList" row-key="id" stripe border>
        <el-table-column prop="id" align="center" label="序号" width="70px">
          <template slot-scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column
          prop="created_at"
          align="center"
          label="题目"
          width="300px"
        >
          <template slot-scope="scope">
              <p v-html="scope.row.questionDetail.name"></p>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" align="center" label="分数">
          <template slot-scope="scope">{{ scope.row.questionScore }}</template>
        </el-table-column>
        <el-table-column prop="created_at" align="center" label="题型">
          <template slot-scope="scope">{{ scope.row.questionType }}</template>
        </el-table-column>
        <el-table-column prop="created_at" align="center" label="创建人">
          <template slot-scope="scope">{{ scope.row.createUserName }}</template>
        </el-table-column>
        <el-table-column prop="created_at" align="center" label="创建时间">
          <template slot-scope="scope">{{ scope.row.createTime }}</template>
        </el-table-column>
        <el-table-column prop="created_at" align="center" label="操作">
          <template slot-scope="scope">
            <span
              class="link falcon-primary"
              @click="jump(scope.row.questionType, scope.row.id, scope.row.questionTypeName)"
              >编辑/查看</span
            >
            <el-popconfirm
              @onConfirm="delOne(scope.row.id)"
              confirmButtonText="确定"
              cancelButtonText="取消"
              title="确定删除该条数据？"
            >
              <span slot="reference" class="link falcon-danger mal10"
                >删除</span
              >
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </base-list>
    <el-dialog
      :visible.sync="moreUploadDialog"
      width="600px"
      :fullscreen="true"
      :before-close="handleClose"
    >
      <div
        v-if="!tableStatus"
        style="
          display: flex;
          justify-content: space-around;
          align-items: center;
          height: 100vh;
        "
      >
        <div style="text-align: center">
          <p>1、下载模版表格，按要求填写信息</p>
          <img src="@/assets/excel.png" class="m-b-20" alt="" />
          <downLoadTemplate types="topic"></downLoadTemplate>
        </div>
        <div style="text-align: center">
          <p>2、上传文件</p>
          <img src="@/assets/uploadPng.png" class="m-b-20" alt="" />
          <div>
            <el-upload
              class="upload-demo"
              action="/api/exam/upload/import-excel"
              :limit="999"
              :data="fileName"
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
        <el-table :data="errorTableData" style="width: 100%">
          <el-table-column prop="row" label="行号" width="100">
          </el-table-column>
          <el-table-column prop="column" label="列号" width="100">
          </el-table-column>
          <el-table-column prop="errorMessage" label="错误原因">
          </el-table-column>
        </el-table>
        <div style="text-align: center">
          <el-upload
            class="upload-demo"
            action="/api/exam/upload/import-excel"
            :limit="999"
            :data="fileName"
            ref="uploadTemplate"
            :headers="token"
            :before-upload="beforeAvatarUpload"
            :on-error="uploadError"
            :on-success="uploadSuccess"
          >
            <el-button style="margin-top: 50px" type="primary" plain
              >重新上传</el-button
            >
          </el-upload>
        </div>
      </div>
    </el-dialog>
    <!-- 主观题选做设置 -->
    <el-dialog
      title="主观题选做设置"
      :visible.sync="settingVisible"
      width="500px"
    >
      <el-form ref="settingForm" :model="settingForm" label-width="100px">
        <el-form-item
          :rules="{ required: true, message: '请输入选做题数' }"
          label="题型选择"
          prop="chooseDoType"
        >
          <el-select v-model="settingForm.chooseDoType" placeholder="请选择">
            <el-option
              v-for="(item, index) in chooseTopicData"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :rules="{ required: true, message: '请输入选做题数' }"
          label="选做题数"
          prop="chooseDoNum"
        >
          <el-input
            clearable
            type="number"
            v-model="settingForm.chooseDoNum"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="settingSubmit">确定</el-button>
        <el-button @click="settingVisible = false">取 消</el-button>
      </span>
    </el-dialog>
      <Topic ref="topic" :paperUuid="$route.query.examId" />
  </div>
</template>

<script>
import { questionType } from "@/tools/config.js";
import Cookies from "js-cookie";
import downLoadTemplate from "@/plugins/DownLoadTemplate";
import Sortable from "sortablejs";
import Topic from '@/components/topic/topic';
export default {
  name: "HomeworkList",
  components: {
    downLoadTemplate,
      Topic
  },
  data() {
    return {
      settingVisible: false,
      errorTableData: [],
      chooseTopicData: [],
      settingForm: {
        chooseDoType: "",
        chooseDoNum: "",
        uuid: this.$route.query.examId,
      },
      moreUploadDialog: false,
      tableStatus: false,
      // 新增题目类型
      addLists: questionType,
      demandForm: {
        total: "",
        qualified: "",
        isFinish: "是",
      },
      // table
      condition: {
          relationId: this.$route.query.examId, //试卷uuid
          topicType: "shi_juan", //题目类型
          name: "", // 题目
      },
      demoList: [],
      pageSearch: this.$api.homework.topicsGet,
      options: [],
      fileName: {
        topicType: "shi_juan",
        relationId: this.$route.query.examId,
      },
      token: {
        token: Cookies.get("token"),
      },
    };
  },
  created() {
    this.$emit(
      "getMeteData",
      this.$Bre.breadCrumbs([0, 5, 53]),
      "管理试卷题目"
    );
    this.getTopicData();
  },
  mounted() {
    // this.rowDrop();
  },
  filters: {
    textLength(val) {
      return val.length > 100 ? val.slice(0, 100) + "..." : val;
    },
  },
  methods: {
      isTopicOpen() {
          this.$refs['topic'].isTopicOpen();
      },
    rowDrop() {
      const tbody = document.querySelector(".el-table__body-wrapper tbody");
      const _this = this;
      Sortable.create(tbody, {
        draggable: ".el-table__row",
        animation: 180,
        delay: 0,
        onEnd({ newIndex, oldIndex }) {
          _this.$api.homework
            .topicNum({
              afterTopicNum: _this.demoList[newIndex].topicNum,
              beforeTopicNum: _this.demoList[oldIndex].topicNum,
              relationId: _this.demoList[oldIndex].relationId,
              topicId: _this.demoList[oldIndex].id,
            })
            .then((res) => {
              if (res.code === 0) {
                _this.$Message.success("置换成功");
                _this.demoList = [];
                _this.$refs.demoTable.loadData();
              }
            });
        },
      });
    },
    getDataMaster() {
      this.$api.homework
        .getPaperBasicInfo(this.$route.query.examId)
        .then((res) => {
          if (res.code === 0) {
            this.settingForm.chooseDoType = res.data.chooseDoType;
            this.settingForm.chooseDoNum = res.data.chooseDoNum;
          }
        });
    },
    // 设置作业要求
    setDemand() {
      this.settingVisible = !this.settingVisible;
      if (this.settingVisible) this.getDataMaster();
    },
    getTopicData() {
      this.$api.homework.questionTypes(this.$route.query.examId).then((res) => {
        if (res.code === 0) this.chooseTopicData = res.data;
      });
    },
    settingSubmit() {
      this.$refs.settingForm.validate(async (valid) => {
        if (valid) {
          const params = this.settingForm;
          const data = await this.$api.testManage.setSubjectiveNum(params);
          if (data.code == 0) {
            {
              this.$message({
                message: "设置成功",
                type: "success",
              });
              this.settingVisible = false;
            }
          } else {
            this.$message({
              message: data.message,
              type: "success",
            });
          }
        }
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
          this.loadData();
          this.tableStatus = false;
        })
        .catch(() => {});
    },
    beforeAvatarUpload(file) {
      // this.$refs.uploadTemplate.clearFiles();
      const isLt10M = file.size / 1024 / 1024 < 50;
      if (!isLt10M) {
        this.$message.error("上传文件大小不能超过 50MB!");
      }
      return isLt10M;
    },
    uploadSuccess(response) {
      if (response.data.isParseExcelSuccess) {
        this.$message.success("上传成功");
        this.tableStatus = false;
        this.moreUploadDialog = false;
      } else {
        this.$message.error("解析失败");
        this.tableStatus = true;
        this.errorTableData = response.data.list;
        this.$refs.uploadTemplate.clearFiles();
      }
    },
    uploadError() {
      // console.log(JSON.stringify(err));
      //   let msg = JSON.stringify(err);
      //   let msg1 = JSON.parse(msg);
      // ;
      // let msg =JSON.parse().message;
      this.$message.error("导入模板错误，导入失败！");
    },
    // 刷新列表
    loadData() {
      this.$refs.demoTable.loadData();
    },
    // 删除
    async delOne(id) {
      const params = {
        id: id,
      };
      const data = await this.$api.homework.delQuestion(params);
      if (data.code == 0) {
        this.$message({
          message: "删除成功",
          type: "success",
        });
        this.loadData();
      } else {
        this.$message({
          message: data.message,
          type: "error",
        });
      }
    },
    // 新增题目跳转
    jump(key, id, typeName) {
        this.$router.push({
            name: 'topicEntry',
            query: {
                id: id,
                topicType: this.condition.topicType,
                relationId: this.condition.relationId,
                questionType: key,
                questionTypeName: typeName
            },
        });
    },
  },
};
</script>

<style lang="scss">
.el-radio-button__inner,
.el-radio-group {
  vertical-align: inherit;
}

.upload-demo {
  display: inline-block;
}
</style>
<style lang="scss" scoped>
.falcon-homework-list {
  .link {
    cursor: pointer;
  }

  /deep/ .el-select {
    width: 100%;
  }
}
</style>
