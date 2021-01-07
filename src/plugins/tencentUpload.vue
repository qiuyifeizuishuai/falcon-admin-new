<template>
    <div>
        <el-button v-if="!videoFlag" type="text" @click="uploadFile">{{uploadType | type}}</el-button>
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
        props: ['uploadType', 'uuid', 'teacherUuid', 'title'],
        data() {
            return {
                videoUploadPercent: 0,
                videoFlag: false,
                statusCode:''
            };
        },
        filters: {
            type(val) {
                if (val == 'upload') {
                    return '上传视频';
                } else {
                    return '更新视频';
                }
            }
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
                    let data = {
                        uuid: this.uuid,
                        videoid: res.fileId,
                        title:this.title,
                        teacherUuid:this.teacherUuid
                    };
                    console.log(this);
                    this.$api.section.editLessons(data).then(r => {
                        console.log(r);
                        this.$message.success('上传视频成功');
                        this.statusCode = 'success';
                        this.$refs.uploadInput.value = '';
                        setTimeout(() => {
                            this.videoFlag = false;
                        }, 1100);

                        this.$emit('updateList');
                    }).catch(err=>{
                        this.$message.error('上传视频失败,请刷新页面重试');
                        this.statusCode = 'exception';
                        this.$refs.uploadInput.value = '';
                        setTimeout(() => {
                            this.videoFlag = false;
                        }, 1100);
                        console.log(err);
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
