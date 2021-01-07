<template>
    <div>
        <el-button v-if="!videoFlag" type="primary" @click="uploadFile">新增监考视频</el-button>
        <input type="file" ref="uploadInput" style="display: none"  @change="upload">
        <el-progress
            v-if="videoFlag"
            :status="statusCode"
            :percentage="videoUploadPercent"
        ></el-progress>
    </div>
</template>

<script>
    import TcVod from 'vod-js-sdk-v6';
    export default {
        props: ['uuid'],
        data() {
            return {
                videoUploadPercent: 0,
                videoFlag: false,
                statusCode:''
            };
        },
        methods: {
            getSignature() {
                return this.$api.upload.getProof().then(res => {
                    return res.data;
                });
            },
            uploadFile() {
                this.$refs.uploadInput.click();
            },
            upload(event) {
                this.statusCode = '';
                this.videoFlag = true;
                this.videoUploadPercent = 0;
                const tcVod = new TcVod({
                    getSignature: this.getSignature
                });
                const uploader = tcVod.upload({
                    mediaFile: event.target.files[0],
                });
                let _this = this;
                uploader.on('media_progress', function (info) {
                    _this.videoUploadPercent = parseInt(info.percent * 100);
                });
                // eslint-disable-next-line no-unused-vars
                uploader.done().then(res => {
                    let index = this.$refs.uploadInput.value.lastIndexOf("\\");
                    let videoName = this.$refs.uploadInput.value.substring(index + 1, this.$refs.uploadInput.value.length);
                    console.log(videoName);
                    let data = {
                        videoName,
                        videoId:res.fileId,
                        testUuid:this.uuid
                    };
                    console.log(res);
                    this.$api.testManage.addProctorData(data).then(r=>{
                       console.log(r);
                        this.statusCode = 'success';
                        this.$message.success('上传视频成功');
                        this.$refs.uploadInput.value = '';
                        setTimeout(() => {
                            this.videoFlag = false;
                        }, 1100);
                        this.$emit('updateList');
                    }).catch(e=>{
                        this.$message.error('上传视频失败,请刷新页面重试');
                        this.statusCode = 'exception';
                        this.$refs.uploadInput.value = '';
                        console.log(e);
                        setTimeout(() => {
                            this.videoFlag = false;
                        }, 1100);
                    });

                }).catch(err => {
                    this.$message.error('上传视频失败,请刷新页面重试');
                    this.statusCode = 'exception';
                    this.$refs.uploadInput.value = '';
                    setTimeout(() => {
                        this.videoFlag = false;
                    }, 1100);
                    console.log(err);
                });

            }
        }
    };
</script>
