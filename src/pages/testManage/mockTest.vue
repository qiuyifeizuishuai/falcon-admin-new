<template>
  <div class="professionalManage">
    <base-list
      ref="demoTable"
      :condition="condition"
      :datas.sync="demoList"
      :pageSearch="pageSearch"
      :isPaging="false"
    >
      <el-form
        style="display: flex; justify-content: space-between"
        :inline="true"
        :model="condition"
        class="search-form"
        slot="search"
        label-width="80px"
      >
        <div>
          <el-button type="primary" @click="goConfig">模拟考试设置</el-button>
            <el-button type="primary" @click="isTopicOpen">题型介绍设置</el-button>
        </div>
        <div>
          <el-form-item>
            <el-input
              v-model="condition.conditionModel.name"
              placeholder="请输入题目"
            ></el-input>
          </el-form-item>
          <el-button @click="loadData" class="mar10">搜索</el-button>
          <el-form-item>
              <el-button type="success" icon="el-icon-plus" @click="jump()">新增题目</el-button>
          </el-form-item>
          <el-button
            type="success"
            icon="el-icon-plus"
            @click="moreUploadDialog = true"
            >批量新增</el-button
          >
        </div>
      </el-form>

      <el-table slot="list" :data="demoList"  row-key="id" stripe border>
        <el-table-column prop="id" align="center" label="序号">
          <template slot-scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column prop="created_at" align="center" label="题目">
          <template slot-scope="scope">
              <p v-html="scope.row.questionDetail.name"></p>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" align="center" label="题型">
          <template slot-scope="scope">{{ scope.row.questionType }}</template>
        </el-table-column>
        <el-table-column prop="created_at" align="center" label="分数">
          <template slot-scope="scope"
            >{{ scope.row.questionScore }}分</template
          >
        </el-table-column>
        <el-table-column prop="created_at" align="center" label="操作">
          <template template slot-scope="scope">
            <el-button
              type="text"
              @click="jump(scope.row.questionType, scope.row.id, scope.row.questionTypeName)"
              >编辑/查看</el-button
            >
            <el-button
              type="text"
              style="color: #F56C6C"
              @click="deleteRow(scope.row)"
              >删除</el-button
            >
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
              :on-error="uploadErrorMore"
              :on-success="uploadSuccessMore"
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
            :on-error="uploadErrorMore"
            :on-success="uploadSuccessMore"
          >
            <el-button style="margin-top: 50px" type="primary" plain
              >重新上传</el-button
            >
          </el-upload>
        </div>
      </div>
    </el-dialog>
      <Topic ref="topic" :paperUuid="mockSettingUuid" />
  </div>
</template>

<script>
import { questionType } from "@/tools/config.js";
import Cookies from "js-cookie";
import downLoadTemplate from "@/plugins/DownLoadTemplate";
import Sortable from "sortablejs";
import Topic from '@/components/topic/topic';
export default {
  components: {
    downLoadTemplate,
      Topic
  },
  data() {
    return {
      errorTableData: [],
      moreUploadDialog: false,
      tableStatus: false,
      addLists: questionType,
      // 查询条件
      condition: {
        conditionModel: {},
      },
      mockSettingUuid: "",
      // table数组
      demoList: [],
      // 分页查询api接口
      pageSearch: this.$api.testManage.getExamMock,
      fileName: {
        topicType: "mo_ni",
        relationId: this.mockSettingUuid,
      },
      token: {
        token: Cookies.get("token"),
      },
    };
  },
  watch: {
    mockSettingUuid(val) {
      this.fileName.relationId = val;
    },
  },
  created() {
    this.$emit("getMeteData", this.$Bre.breadCrumbs([0, 6, 61]));
  },
  mounted() {
    this.getMockUuid();
    // this.rowDrop();
  },
  methods: {
      rowDrop () {
          const tbody = document.querySelector('.el-table__body-wrapper tbody');
          const _this = this;
          Sortable.create(tbody, {
              draggable: ".el-table__row",
              animation: 180,
              delay: 0,
              onEnd ({ newIndex, oldIndex }) {
                  _this.$api.homework.topicNum({
                      afterTopicNum: _this.demoList[newIndex].topicNum,
                      beforeTopicNum : _this.demoList[oldIndex].topicNum,
                      relationId: _this.demoList[oldIndex].relationId,
                      topicId: _this.demoList[oldIndex].id
                  }).then(res => {
                      if(res.code === 0) {
                          _this.$Message.success('置换成功');
                          _this.demoList = [];
                          _this.$refs.demoTable.loadData();
                      }
                  });
              }
          });
      },
      isTopicOpen() {
          this.$refs['topic'].isTopicOpen();
      },
    // 批量
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
          this.loadData();
          this.tableStatus = false;
        })
        .catch(() => {});
    },
    beforeAvatarUploadMore(file) {
      // this.$refs.uploadTemplate.clearFiles();
      const isLt10M = file.size / 1024 / 1024 < 50;
      if (!isLt10M) {
        this.$message.error("上传文件大小不能超过 50MB!");
      }
      return isLt10M;
    },
    uploadSuccessMore(response) {
      console.log(response);
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
    uploadErrorMore() {
      // console.log(JSON.stringify(err));
      //   let msg = JSON.stringify(err);
      //   let msg1 = JSON.parse(msg);
      // ;
      // let msg =JSON.parse().message;
      this.$message.error("导入模板错误，导入失败！");
    },
    getMockUuid() {
      this.$api.testManage
        .getExamMock({
          conditionModel: {},
          perPage: 10,
          start: 1,
        })
        .then((res) => {
          this.mockSettingUuid = res.data.map.uuid;
        });
    },
    goConfig() {
      this.$router.push({
        path: "/mockConfig",
        query: {
          uuid: this.mockSettingUuid,
        },
      });
    },
    deleteRow(row) {
      // 删除题目
        this.$confirm('此操作将永久删除该题目, 是否确认?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            this.$api.homework.delQuestion(row).then(() => {
                this.$message.success("删除成功");
                this.loadData();
            });
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });
        });
    },
    loadData() {
      this.$refs.demoTable.loadData();
    },
    // 新增题目跳转
    jump(key, id, typeName) {
      this.$router.push({
        name: 'topicEntry',
        query: {
          id: id,
          relationId: this.mockSettingUuid,
          topicType: "mo_ni",
          questionType: key,
          questionTypeName: typeName
        },
      });
    },
  },
};
</script>
<style scoped>
.upload-demo {
  display: inline-block;
}
</style>
