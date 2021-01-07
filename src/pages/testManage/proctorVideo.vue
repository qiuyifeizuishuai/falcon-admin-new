<!--监考视频-->
<template>
    <div>
        <div>
            <proctorTencentUpload @updateList="getList" :uuid="$route.query.id"></proctorTencentUpload>
        </div>
        <div>
            <el-dialog
                :visible.sync="dialogVisible"
                width="60%"
                :before-close="handleClose"
            >
                <tencenterVideoPlay style="width: 100%;height: 500px" :fileId="fileId"></tencenterVideoPlay>
            </el-dialog>
        </div>
        <div>
            <el-table
                :data="tableData"
                stripe
                style="width: 100%">
                <el-table-column align="center" label="#" width="100">
                    <template slot-scope="scope">{{ scope.$index+1 }}</template>
                </el-table-column>
                <el-table-column
                    prop="videoName"
                    label="视频名称"
                >
                </el-table-column>
                <el-table-column
                    prop="uploadTime"
                    label="上传时间"
                    width="200">
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="150">
                    <template slot-scope="scope">
                        <el-button type="text" @click="playVideo(scope.row)">播放视频</el-button>
                        <el-button type="text" @click="deleteVideo(scope.row)" style="color:#F56C6C">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>

</template>

<script>
    import proctorTencentUpload from "../../plugins/proctorTencentUpload";
    import tencenterVideoPlay from "../../plugins/TencenterVideoPlay";

    export default {
        data() {
            return {
                tableData: [],
                fileId: '',
                dialogVisible: false,
            };
        },
        components: {
            proctorTencentUpload,
            tencenterVideoPlay
        },
        created() {
            this.$emit('getMeteData', this.$Bre.breadCrumbs([0, 6, 64]), '监考视频');
        },
        mounted() {
            this.getList();
        },
        methods: {
            handleClose(done) {
                this.$confirm('确认关闭视频播放窗口？')
                    .then(() => {
                        done();
                    })
                    .catch(() => {
                    });
            },
            playVideo(row) {
                this.dialogVisible = true;
                console.log(row);
                this.fileId = row.videoId;
            },
            deleteVideo(row) {
                this.$confirm('是否删除监考视频', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$api.testManage.deleteProctor(row.uuid).then(() => {
                        this.$message.success('删除监考视频成功');
                        this.getList();
                    }).catch(() => {
                        // console.log(err);
                        this.$message.success('删除监考视频失败');
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            getList() {
                this.$api.testManage.getProctorList(this.$route.query.id).then(res => {
                    // console.log(res);
                    this.tableData = res.data;
                });
            }
        }
    };
</script>

