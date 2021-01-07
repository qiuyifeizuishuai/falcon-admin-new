<template>
 <div>
     <el-dialog
         :visible.sync="moreUploadDialog"
         width="600px"
         :fullscreen="true"
         :before-close="handleClose">
         <div v-if="!tableStatus" style="display: flex;justify-content: space-around;align-items: center;height: 100vh">
             <div style="text-align: center">
                 <p>1、下载模版表格，按要求填写信息</p>
                 <img src="@/assets/excel.png" class="m-b-20" alt="">
                 <div>
                     <el-button type="primary" plain @click="downloadTemplate">下载模版</el-button>
                 </div>
             </div>
             <div style="text-align: center">
                 <p>2、上传文件</p>
                 <img src="@/assets/uploadPng.png" class="m-b-20" alt="">
                 <div>
                     <el-upload
                         class="upload-demo"
                         :action="batchAddData.upDataUrl"
                         :limit="999"
                         ref="uploadTemplate"
                         :data="batchAddData.typeId"
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
                     :action="batchAddData.upDataUrl"
                     :limit="999"
                     ref="uploadTemplate"
                     :headers="token"
                     :data="batchAddData.typeId"
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
import Cookies from "js-cookie";
import axios from "axios";

export default {
    name: "batch-add",
    props: {
        batchAddData: {}
    },
    data() {
        return {
            moreUploadDialog: false,
            tableStatus: false,
            errorTableData: [],
            token: {
                token: Cookies.get('token')
            },
        };
    },
    methods: {
        isOpen() {
            this.moreUploadDialog = true;
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(() => {
                    done();
                    this.tableStatus = false;
                }).catch(() => {});
        },
        beforeAvatarUpload(file) {
            const isLt10M = file.size / 1024 / 1024 < 50;
            if (!isLt10M) {
                this.$message.error('上传文件大小不能超过 50MB!');
            }
            return isLt10M;
        },
        uploadSuccess(response) {
            if (response.data.list.length === 0) {
                this.$message.success('上传成功');
                this.tableStatus = false;
                this.moreUploadDialog = false;
                this.$emit('loadData');
            } else {
                this.$message.error('解析失败');
                this.tableStatus = true;
                this.errorTableData = response.data.list;
                this.$refs.uploadTemplate.clearFiles();
            }
        },
        uploadError(err) {
            let msg = err.toString().split('"')[5];
            this.$message.error(msg);
        },
        async downloadTemplate(){
            try {
                let blob = await axios.get(`${this.batchAddData.downloadUrl}${this.$route.query.id}`, {
                    responseType: "blob"
                });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = '成绩录入.xlsx';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }catch (e) {
                console.log(e);
            }
        }
    }
};
</script>

<style scoped>

</style>
