<template>
    <div id="videoWrap" style="width: 100%; height: 100%">
        <video style="width: 100%;height: 100%" id="player-container-id" width="414" height="270" preload="auto" playsinline webkit-playsinline>
        </video>
    </div>
</template>

<script>
    export default {
        mounted() {
            this.createdVideoDom();
            // 创建视频
            this.createVideo();
        },
        props:['fileId'],
        watch: {
            fileId() {
                // 销毁视频
                this.destroyVideo();
                // 销毁视频容器
                this.createdVideoDom();
                // 创建视频
                this.createVideo();
            },
        },
        data(){
            return{
                player:null,
                playAuth:'',
            };
        },
        created() {

        },
        beforeDestroy() {
            this.destroyVideo();
        },
        methods:{
            createVideo() {
                this.$api.testManage.getAuthorKey(this.fileId).then(res=>{
                    console.log(res);
                    // eslint-disable-next-line no-undef
                    this.player = TCPlayer("player-container-id", {
                        fileID: this.fileId, // 资源ID
                        appID: "1303139375",
                        playbackRates: [0.5, 1, 1.25, 1.5, 2, 5], // 设置变速播放倍率选项
                        // width: document.getElementById("player-container-id").offsetWidth,
                        // height: document.getElementById("player-container-id").offsetHeight,
                        // controlBar: {
                        //     playbackRateMenuButton: false,
                        // },
                        psign: res.data,
                        plugins: {

                            ContinuePlay: { // 开启续播功能
                                auto: false, //[可选] 是否在视频播放后自动续播
                                text:'上次播放至 ', //[可选] 提示文案
                                btnText: '恢复播放' //[可选] 按钮文案
                            },
                            ProgressMarker: true, // pick
                        },
                    });
                });
                console.log(this.fileID);
            },
            createdVideoDom(){
                if (!document.getElementById("player-container-id")) {
                    const video = document.createElement("video");
                    video.style.width = "100%";
                    video.style.height = "100%";
                    video.setAttribute("id", "player-container-id");
                    video.setAttribute("preload", "auto");
                    document.getElementById("videoWrap").appendChild(video);
                    // eslint-disable-next-line no-undef
                }
            },
            destroyVideo() {
                // 清除视频
                if (this.player) {
                    this.player.dispose();
                    this.player = null;
                }
            },

        }
    };
</script>
<style lang="scss">
    .vjs-menu li.vjs-selected,
    .vjs-menu li.vjs-selected:focus,
    .vjs-menu li.vjs-selected:hover {
        background-color: green;
        color: #fff;
    }
</style>
