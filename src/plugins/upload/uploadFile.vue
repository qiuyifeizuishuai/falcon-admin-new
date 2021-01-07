<template>
  <div class="falcon-upload">
    <el-upload
      class="upload-demo"
      :action="url"
      ref="upload"
      :multiple="false"
      :on-preview="handlePreview"
      :headers="headers"
      :before-remove="beforeRemove"
      :on-remove="handleRemove"
      :name="name"
      :data="data"
      :auto-upload="auto"
      :limit="limit"
      :on-exceed="handleExceed"
      :on-success="handleSuccess"
      :on-change="handleChange"
      :list-type="listStyle"
      :file-list="lists"
      :before-upload="beforeUpload"
      :accept="accept"
    >
      <slot name="content">
        <i class="el-icon-plus"></i>
      </slot>
    </el-upload>

    <!-- 图片预览 -->
    <el-dialog width="40%" :visible.sync="dialogVisible">
      <div style="text-align: center">
        <img
          style="max-width: 100%"
          :src="lists[0] ? lists[0].url : ''"
          alt="图片"
        />
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  mounted() {},
  props: {
    accept: {
      type: String,
      default: ".jpg,.jpeg,.png,.JPG,.JPEG",
    },
    fileList: String,
    listStyle: {
      type: String,
      default: "picture-card",
    },
    limit: Number,
    url: String,
    auto: Boolean,
    name: String,
    data: Object,
  },
  data() {
    return {
      dialogVisible: false,
      lists: [],
      headers: {
        // todo 添加header
        // token, formdata  ...
      },
    };
  },
  watch: {
    fileList(newVal) {
      if (!newVal) {
        this.lists = [];
        return;
      }
      if (this.lists[0]) {
        this.lists[0].url = newVal;
      } else {
        this.lists.push({
          url: newVal,
        });
      }
    },
  },
  methods: {
    // 删除前
    beforeRemove(file) {
      const name = file.name;
      if (file && file.status === "success") {
        return this.$confirm(`确定移除${name ? name : "该图片"}？`);
      }
    },
    // 删除
    handleRemove(file, fileList) {
      const response = {
        file: file,
        fileList: fileList,
      };
      this.lists = fileList;
      this.$emit("handleRemove", response);
    },
    // 预览
    handlePreview(file) {
      this.dialogVisible = true;
      this.$emit("handlePreview", file);
    },
    // 改变
    handleChange(file, fileList) {
      const res = {
        file: file,
        fileList: fileList,
      };
      this.lists = fileList;
      this.$emit("handleChange", res);
    },
    // 上传前
    beforeUpload(file) {
      let type = file.name.substring(file.name.lastIndexOf("."));
      let acceptArr = this.accept.split(",");

      if (acceptArr.indexOf(type) == -1) {
        this.$message({
          message: `上传文件只能是${this.accept}格式!`,
          type: "warning",
        });
        return false;
      }
        const isLt10M = file.size / 1024 / 1024 < 50;
        console.log(isLt10M);
        if (!isLt10M) {
            this.$message.error('上传文件大小不能超过 50MB!');
            return false;
        }
      return true;
    },
    // 文件超出个数限制时的钩子
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 ${this.limit} 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    // 提交
    submitUpload() {
      this.$refs.upload.submit();
    },
    // 上传成功
    handleSuccess(response) {
      this.$emit("handleSuccess", response);
    },
  },
};
</script>

<style lang="scss">
.falcon-upload {
  .el-upload--picture-card {
    width: 60px;
    height: 60px;
    line-height: 60px;

    .el-icon-plus {
      line-height: inherit;
    }
  }
  .el-upload-list--picture-card .el-upload-list__item {
    width: 60px;
    height: 60px;
    margin: 0 8px 8px 0;
    display: inline-block;
  }
}
</style>
