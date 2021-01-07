<!-- 班级管理-->
<template>
    <div class="professionalManage">
        <el-dialog
            title="设置班干部"
            :visible.sync="dialogVisible"
            width="30%"
        >
            <p style="font-weight: bold">班干部名称：</p>
            <el-input v-model="leaderName" placeholder="请输入班干部名称"></el-input>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="leader">确 定</el-button>
          </span>
        </el-dialog>

        <base-list ref="demoTable" :condition="condition" :datas.sync="demoList" :pageSearch="pageSearch"
                   :isPaging="true">
            <el-form style="display: flex;justify-content: space-between" :inline="true" :model="condition"
                     class="search-form" slot="search" label-width="80px">
                <div>
                    <el-form-item>
                        <el-input v-model="condition.conditionModel.gradeName" placeholder="请输入姓名"></el-input>
                    </el-form-item>
                    <el-button type="primary" @click="loadData">搜索</el-button>
                </div>
            </el-form>
            <el-table slot="list" :data="demoList" stripe border>
                <el-table-column prop="id" align="center" label="#" width="70px">
                    <template slot-scope="scope">{{scope.$index+1}}</template>
                </el-table-column>
                <el-table-column prop="created_at" align="center" label="学生姓名">
                    <template slot-scope="scope">{{ scope.row.studentName }}</template>
                </el-table-column>
                <el-table-column prop="created_at" align="center" label="学员ID">
                    <template slot-scope="scope">{{ scope.row.id }}</template>
                </el-table-column>
                <el-table-column align="center" label="联系方式">
                    <template slot-scope="scope">{{ scope.row.phone }}</template>
                </el-table-column>
                <el-table-column align="center" label="入班时间">
                    <template slot-scope="scope">{{ scope.row.createDate }}</template>
                </el-table-column>
                <el-table-column prop="leader" align="center" label="职务">
                    <template slot-scope="scope">{{ scope.row.leader | leader}}</template>
                </el-table-column>
                <el-table-column prop="leader" align="center" label="证书">
                    <template slot-scope="scope" v-if="scope.row.diploma">
                        <el-button type="primary" @click="openImgPreview(scope.row.diploma)">查看证书</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="created_at" align="center" label="操作" width="300">
                    <template slot-scope="scope">
                       <div style="display: inline-block">
                           <el-upload
                               class="upload-demo"
                               action="/api/exam/upload/uploadFiles"
                               :on-remove="handleRemove"
                               :on-progress="handleProgress"
                               :before-remove="beforeRemove"
                               :on-error="onError"
                               :on-change="handleChange"
                               :on-success="handSuccess"
                               :show-file-list="false"
                               :file-list="fileList">
                               <el-button type="text" @click="uploadImgs(scope.row.uuid)">上传证书</el-button>
                           </el-upload>
                       </div>
                        <el-button style="margin-left: 10px" type="text" @click="go('/studentHistory',scope.row)">学习进度</el-button>
                        <el-button type="text" @click="openLeaderDialog(scope)">设置班干部</el-button>
                        <el-button type="text" style="color: #e85f64" @click="deleteUser(scope.row.uuid)">移除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </base-list>
        <div class="prw" v-if="view">
            <el-dialog
                title="查看证书"
                :visible.sync="view">
                <el-image
                    fit="contain"
                    v-show="item"
                    style="height: 200px;width: 200px;margin-right: 10px"
                    v-for="(item, index) in imgList" :key="index"
                    :src="item" />
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                leaderName: '',
                dialogVisible: false,
                view: false,
                uuid: '',
                // 查询条件
                condition: {
                    conditionModel: {
                        uuid: this.$route.query.id
                    }
                },
                // table数组
                demoList: [],
                // 分页查询api接口
                pageSearch: this.$api.grade.getGradeAllStudent,
                // 证书上传
                studentUuid: '',
                loading: null, // 进度条
                fileList: [],
            };
        },
        filters: {
            leader(val) {
                if (val) {
                    return val;
                } else {
                    return '学生';
                }
            }
        },
        created() {
            this.$emit('getMeteData', this.$Bre.breadCrumbs([0, 4, 41]), '学生管理');
        },
        methods: {
            openImgPreview(imgList) {
                this.imgList = imgList.split(";");
                this.view = true;
                console.log(this.imgList);
                if (this.imgList.length > 2) {
                    this.imgList =  this.imgList.slice(0, 2);
                }
            },
            handleProgress() {
                this.loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgb(0, 0, 0, 0.7)'
                });

            },
            handleChange(file, fileList) {
                this.fileList = fileList.slice(-3);
                console.log(this.fileList);
            },
            uploadImgs(id) {
                this.$message.warning('注意：上传的证书，只会取最新的俩张证书');
                console.log(id);
                this.studentUuid = id;
            },
            handSuccess(file) {
                this.loading.close();
                // eslint-disable-next-line no-unused-vars
                this.$api.testManage.uploadStudentCertificate(this.studentUuid, this.$route.query.id, file.data.toString()).then(res => {
                    this.$message.success('上传成功');
                    this.loadData();
                });
            },
            // eslint-disable-next-line no-unused-vars
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${file.name}？`);
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            onError() {
                this.loading.close();
                this.$message.error('上传失败');
            },
            deleteUser(id) {
                this.$confirm('是否移除该学生', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$api.grade.deleteStudent(id, this.$route.query.id).then(() => {
                        // console.log(res);
                        this.$message.success('移除成功');
                        this.$refs.demoTable.loadData();
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消移除'
                    });
                });
            },
            openLeaderDialog(scope) {
                this.dialogVisible = true;
                this.uuid = scope.row.uuid;
                this.leaderName = scope.row.leader;
            },
            leader() {
                // let data = {
                //     studentUuid: this.uuid,
                //     leader: this.leaderName,
                //     gradeUuid: this.$route.query.id
                // };
                if(!this.leaderName) {
                    this.$message.error('班干部名称不能为空');
                    return;
                }
                this.$api.grade.updateStudentIsLeader( this.uuid, this.leaderName, this.$route.query.id).then(res => {
                    console.log(res);
                    this.$message.success('操作成功');
                    this.dialogVisible = false;
                    this.loadData();
                });
            },
            go(url, item) {
                this.$router.push({
                    path: url, query: {
                        id: item.uuid,
                        type: 'edit'
                    }
                });
            },
            loadData() {
                this.$refs.demoTable.loadData();
            },
        },
    };
</script>
<style lang="scss" scoped>
.professionalManage {
    .prw {
        height: 100%;
    }
    /deep/
    .el-icon-circle-close {
        color: #FFFFFF;
    }
}
</style>
