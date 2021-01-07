<!--系统消息-->
<template>
    <div class="rootMessage">
        <!--消息内容-->
        <div class="rootMessage-content">
            <el-tabs v-model="activeName" @tab-click="handleTab">
                <!--这是已发送消息-->
                <el-tab-pane name="first">
                    <span slot="label"><el-badge :value="null" class="item"><i
                        class="iconfont iconshengyin"></i></el-badge>已发送的消息</span>
                    <div class="rootMessage-background">
                        <!--已发送消息左边-->
                        <div class="rootMessage-sendMessage-left rootMessage-messageList">
                            <el-scrollbar>
                                <!--消息标题-->
                                <div class="rootMessage-messageList-title"><h5>已发送消息列表</h5>
                                    <el-button type="primary" @click="handleGoSendMessage">发送消息</el-button>
                                </div>
                                <!--消息列表-->
                                <div class="rootMessage-messageList-list" :class="{activeList:currentIndex === index }" v-for="(value,index) in sendMessageList"
                                     @click="handleSendMessageCurrentList(value, index)"
                                     :key="index">
                                    <h6 style="flex: 7;width: 100px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis" :class="{isRead: value.read_status}">{{value.title}}</h6>
                                    <p>{{value.created_at | timer}}</p>
                                </div>
                            </el-scrollbar>
                        </div>
                        <!--已发送消息右边-->
                        <div class="rootMessage-sendMessage-right rootMessage-messageList-right">
                            <div v-if="Object.keys(currentMessage).length !== 0">
                                <!--已发送消息右边的上半部分-->
                                <div class="rootMessage-messageList-right-title">
                                    <div style="justify-content: space-between">
                                        <em>{{currentMessage.title}}</em>
                                        <h6>{{currentMessage.created_at | timer}}</h6>
                                    </div>
                                </div>
                                <!--已发送消息右边下半部分-->
                                <div class="rootMessage-messageList-right-bottom">
                                    <!--这里要用v-html-->
                                    <div style="width: 100%" v-html="currentMessage.content"></div>
                                </div>
                                <el-button type="primary" @click="handleDelete">撤回</el-button>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <!--已接收消息列表-->
                <el-tab-pane name="two">
                    <span slot="label"><el-badge :value="UnReceiveListRead" class="item"><i
                        class="iconfont iconshengyin"></i></el-badge>已接收消息</span>
                    <div class="rootMessage-background">
                        <!--已接收消息左边-->
                        <div class="rootMessage-sendMessage-left rootMessage-messageList">
                            <el-scrollbar>
                                <!--消息标题-->
                                <div class="rootMessage-messageList-title"><h5>已接收消息列表</h5></div>
                                <!--消息列表-->
                                <div class="rootMessage-messageList-list" :class="{activeList:currentIndex === index }" v-for="(value,index) in receiveList"
                                     @click="handleReceiveMessageClick(value, index)"
                                     :key="index">
                                    <h6 style="flex: 7" :class="{isRead: value.read_status}">{{value._message.title}}</h6>
                                    <p>{{value.created_at | timer}}</p>
                                </div>
                            </el-scrollbar>
                        </div>
                        <!--已接收消息右边-->
                        <div class="rootMessage-sendMessage-right rootMessage-messageList-right">
                            <div v-if="Object.keys(currentMessage).length !== 0">
                                <!--已发送消息右边的上半部分-->
                                <div class="rootMessage-messageList-right-title">
                                    <div style="justify-content: space-between">
                                        <em>{{currentMessage.title || currentMessage.title}}</em>
                                        <h6>{{currentMessage.created_at | timer}}</h6>
                                    </div>
                                </div>
                                <!--已发送消息右边下半部分-->
                                <div class="rootMessage-messageList-right-bottom">
                                    <!--这里要用v-html-->
                                    <div style="width: 100%">{{currentMessage.content}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <!--投诉建议-->
                <el-tab-pane name="second">
                    <span slot="label"><el-badge :value="ComplaintCount" class="item"><i
                        class="iconfont iconshengyin"></i></el-badge>投诉建议</span>
                    <div class="rootMessage-background">
                        <!--投诉建议左边-->
                        <div class="rootMessage-complaint-left rootMessage-messageList">
                            <el-scrollbar>
                                <!--消息标题-->
                                <div class="rootMessage-messageList-title">
                                    <h5>投诉建议列表</h5>
                                </div>
                                <!--消息列表-->
                                <div class="rootMessage-messageList-list" :class="{activeList:currentIndex === index }" v-for="(value,index) in complaintList"
                                     @click="handleComplaintListCurrentList(value, index)"
                                     :key="index">
                                    <h6 style="flex: 7" :class="{isRead: value.read_status}">投诉建议</h6>
                                    <p>{{value.created_at | timer}}</p>
                                </div>
                            </el-scrollbar>
                        </div>
                        <!--投诉建议右边-->
                        <div class="rootMessage-messageList-right">
                            <div v-if="Object.keys(currentComplaint).length !== 0">
                                <div class="rootMessage-messageList-right-title">
                                    <div style="justify-content: space-between">
                                        <em>投诉建议</em>
                                        <h6>{{currentComplaint.created_at | timer}}</h6>
                                    </div>
                                    <div>
                                        <em>投诉人：</em>
                                        <span style="margin-right: 30px">{{currentComplaint.sender_name}}</span>
                                    </div>
                                    <div>
                                        <em>联系方式：</em>
                                        <span>{{currentComplaint.contact}}</span>
                                    </div>
                                </div>
                                <!--投诉右边下半部分-->
                                <div class="rootMessage-messageList-right-bottom">
                                    <div style="width: 100%">
                                        <div v-html="currentComplaint.content"></div>
                                        <!--有图片显示图片-->
                                        <img :src="currentComplaint.file" alt="" v-if="currentComplaint.file">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <!--纠错反馈-->
                <el-tab-pane name="third" v-if="isShow == 'true'">
                    <span slot="label"><el-badge :value="UnreadErrorList" class="item"><i
                        class="iconfont iconshengyin"></i></el-badge>纠错反馈</span>
                    <div class="rootMessage-background">
                        <!--投诉建议左边-->
                        <div class="rootMessage-complaint-left rootMessage-messageList">
                            <el-scrollbar>
                                <!--消息标题-->
                                <div class="rootMessage-messageList-title">
                                    <h5>纠错反馈列表</h5>
                                </div>
                                <!--消息列表-->
                                <div class="rootMessage-messageList-list"   :class="{activeList:currentIndex === index}" v-for="(value,index) in errorList"
                                     @click="handleErrorListCurrentList(value, index)"
                                     :key="index">
                                    <h6 style="flex: 7" :class="{isRead: value.status}">{{value.majorName}}错误反馈</h6>
                                    <p>{{value.createTime}}</p>
                                </div>
                            </el-scrollbar>
                        </div>
                        <!--已发送消息右边-->
                        <div class="rootMessage-messageList-right">
                            <el-scrollbar>
                                <div v-if="currentError.uuid">
                                    <div class="rootMessage-messageList-right-title">
                                        <div style="justify-content: space-between">
                                            <em>{{currentError.majorName}}错误反馈</em>
                                            <h6>{{currentError.createTime}}</h6>
                                        </div>
                                    </div>
                                    <!--投诉右边下半部分-->
                                    <div class="rootMessage-messageList-right-bottom">
                                        <div>
                                            <p><em>发送人：</em><span>{{currentError.studentName}}</span></p>
                                            <p v-if="currentError.topicType === 'zuo_ye'"><em>题目位置：</em><span>{{currentError.courseName}}-{{currentError.sectionName}}-{{currentError.lessonsName}}</span></p>
                                            <p v-if="currentError.topicType === 'shi_juan'"><em>题目位置：</em><span>试卷练习-{{currentError.relationName}}</span></p>
                                            <p><em>题目：</em><span>{{currentError.topicName}}</span></p>
                                            <p><em>错误类型：</em><span>{{currentError.errorType}}</span></p>
                                            <p><em>错误描述：</em><span>{{currentError.content}}</span></p>
                                        </div>
                                    </div>
                                </div>
                            </el-scrollbar>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import {
        getSendMessage,
        getComplaint,
        withdrawMessage,
        getSingleMsg,
        getSingleComplaint,
        getErrorCorrection,
        getUnreadErrorCorrection,
        readMessage,
        getReceiveMessage
    } from "@/services/api/systemMessage";

    export default {
        name: "rootMessage",
        data() {
            return {
                activeName: 'first',
                //  发送消息列表
                sendMessageList: [],
                type:"",
                //  接收消息列表
                receiveList: [],
                //  接收消息未读
                UnReceiveListRead: null,
                //  投诉建议列表
                complaintList: [],
                //  投诉消息未读
                ComplaintCount: null,
                //  纠错反馈列表
                errorList: [],
                //  发送消息的当前点击的内容
                currentMessage: {},
                //  投诉消息的当前点击的内容
                currentComplaint: {},
                //  纠错反馈的当前点击的内容
                currentError: {},
                //  纠错反馈的未读消息
                UnreadErrorList: null,
                //  判断当前用户是否显示纠错反馈列表
                isShow: false,
                currentIndex: null,
            };
        },
        methods: {
            //  跳转到发送消息页面
            handleGoSendMessage() {
                this.$router.push("/sendMessage");
            },
            //  发送消息当前的点击事件
            handleSendMessageCurrentList(value, index) {
                this.currentIndex = index;
                getSingleMsg(value.id).then(res => {
                    if (res.code === 0) {
                        this.currentMessage = res.data;
                    } else {
                        this.$message.error("请求数据失败");
                    }
                });
            },
            //  接收消息列表的点击事件
            handleReceiveMessageClick(value, index) {
                //  清空路由参数
                if (this.$route.query.id || this.$route.query.activeName) {
                    this.$router.push({ query: {} }).catch(() => {});
                }
                this.currentIndex = index;
                getSingleMsg(value._message.id).then(res => {
                    if (res.code === 0) {
                        this.getReceiveMessageData();
                        this.currentMessage = res.data;
                        this.$bus.$emit("systemMsg");
                    } else {
                        this.$message.error("请求数据失败");
                    }
                });
                // console.log(value);
            },
            //  投诉消息当前列表的点击事件
            handleComplaintListCurrentList(value, index) {
                //  清空路由参数
                if (this.$route.query.id || this.$route.query.activeName) {
                    this.$router.push({ query: {} }).catch(() => {});
                }
                this.currentIndex = index;
                // console.log(value);
                getSingleComplaint(value.id).then(res => {
                    if (res.code === 0) {
                        this.$bus.$emit("complaintMsg");
                        this.currentComplaint = res.data;
                        this.getComplaintMessage();
                        this.getSendMsg();
                    } else {
                        this.$message.error("获取数据失败");
                    }
                });
            },
            // 纠错反馈当前点击事件
            handleErrorListCurrentList(value, index) {
                this.currentIndex = index;
                readMessage(value.uuid).then(() => {
                    // console.log(res);
                    this.getErrorCorrectionUnread();
                    this.getErrorCorrectionMsg();
                });
                this.currentError = value;
            },
            //  撤回当前已发送的消息
            handleDelete() {
                this.$confirm('是否撤回该消息', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    withdrawMessage(this.currentMessage.id).then(() => {
                        this.getSendMsg();
                        this.currentMessage = {};
                        this.$message.success("撤回消息成功");
                    });
                    this.currentMessage = {};
                    this.getSendMsg();
                    this.currentIndex = null;
                });
            },
            //  获取已发送的消息
            getSendMsg() {
                //  获取已发送的消息
                getSendMessage(this.type).then(res => {
                    if (res.code === 0) {
                        this.sendMessageList = res.data;
                    } else {
                        console.log("请求出错");
                    }
                });
            },
            getComplaintMessage() {
                //  获取投诉建议
                getComplaint().then(res => {
                    if (res.code === 0) {
                        this.complaintList = res.data;
                        this.ComplaintCount = res.data.filter(value => !value.read_status).length;
                        //  判断未读条数是否为零
                        if (!this.ComplaintCount) {
                            this.ComplaintCount = null;
                        }
                        //  判断当前路由有没有值
                        let route = this.$route.query;
                        if (route.activeName === 'second' && route.id) {
                            //  获取当前这条数据的在列表的中下标
                            let index = this.complaintList.findIndex(value => {
                                return value.id === route.id;
                            });
                            this.currentIndex = index;
                            //  获取当前这条数据的详细信息
                            getSingleComplaint(route.id).then((res) => {
                                if (res.code != 0) {
                                    this.$message.error("获取投诉建议消息失败");
                                }
                                this.$bus.$emit("complaintMsg");
                                this.currentComplaint = res.data;
                                //  重新获取未读条数
                                getComplaint().then(res => {
                                    this.ComplaintCount = res.data.filter(value => !value.read_status).length;
                                    if (!this.ComplaintCount) {
                                        this.ComplaintCount = null;
                                    }
                                });
                            });
                        }
                    } else {
                        // console.log("请求出错");
                    }
                });
            },
            //  获取纠错反馈的消息
            getErrorCorrectionMsg() {
                //  获取纠错反馈的列表
                getErrorCorrection().then(res => {
                    if (res.code === 0) {
                        this.errorList = res.data;
                    } else {
                        this.$message.error("获取数据失败");
                    }
                });
            },
            //  获取纠错反馈的未读消息
            getErrorCorrectionUnread() {
                getUnreadErrorCorrection().then(res => {
                    if (res.code === 0) {
                        this.UnreadErrorList = res.data ? res.data : null;
                    } else {
                        this.$message.error("获取数据失败");
                    }
                });
            },
            //  获取已接收消息
            getReceiveMessageData() {
                getReceiveMessage().then(res => {
                    if (res.code === 0) {
                        this.receiveList = res.data;
                        this.UnReceiveListRead = res.data.filter(value => !value.read_status).length || null;
                        //  判断当前路由有没有值
                        let route = this.$route.query;
                        if (route.activeName === 'two' && route.id) {
                            //  获取当前这条数据的在列表的中下标
                           let index = this.receiveList.findIndex(value => {
                                return value._message.id === route.id;
                            });
                           this.currentIndex = index;
                           //  获取当前这条数据的详细信息
                            getSingleMsg(route.id).then(res => {
                                if (res.code === 0) {
                                    this.$bus.$emit("systemMsg");
                                    this.currentMessage = res.data;
                                    getReceiveMessage().then(res => {
                                        this.UnReceiveListRead = res.data.filter(value => !value.read_status).length || null;
                                    });
                                } else {
                                    this.$message.error("请求数据失败");
                                }
                            });
                        }
                    } else {
                        this.$message.error("获取已接收消息失败");
                    }
                });
            },
            //  监听路由的变化
            handleRoute(value, oldValue) {
                value.query.activeName ? this.activeName = value.query.activeName : this.activeName = oldValue.query.activeName;
                if (value.query.id) {
                    if (value.query.activeName === 'two') {
                        this.getReceiveMessageData();
                    } else if (value.query.activeName === 'second') {
                        this.getComplaintMessage();
                    }
                }
            },
            //  tab表格切换
            handleTab(tab) {
                if (this.$route.query.activeName || this.$route.query.id) {
                    this.$router.push({ query: {} });
                }
                this.currentIndex = null;
                this.activeName = tab.name;
                this.currentComplaint = {};
                this.currentMessage = {};
                this.currentError = {};
            }
        },
        //  时间过滤器
        filters: {
            timer: function (val) {
                let time = val.split("-");
                let date = time[2].split("T");
                let hours = date[1].split(":");
                return time[0] + "-" + time[1] + "-" + date[0] + " " + hours[0] + ":" + hours[1];
            }
        },
        created() {
            this.$emit('getMeteData', this.$Bre.breadCrumbs([0, 7, 71]));
            if (window.localStorage.getItem("isSchool") === 'true') {
                this.type = 'college';
            } else {
                this.type = 'system';
            }
            if (this.$route.query.activeName || this.$route.query.id) {
                this.activeName = this.$route.query.activeName;
            }
            this.getSendMsg();
            this.getComplaintMessage();
            //  判断当前的用户是否是院校
            this.isShow = window.localStorage.getItem("isSchool");
            this.getErrorCorrectionMsg();
            //  获取纠错反馈的未读消息
            this.getErrorCorrectionUnread();
            //  获取接收消息
            this.getReceiveMessageData();
        },
        watch: {
            $route: {
                handler:"handleRoute",
                deep: true
            }
        }
    };
</script>

<style lang="scss" scoped>
    .rootMessage {

        .rootMessage-content {
            .el-badge {
                position: static;
            }

            /deep/
            .el-tabs__item span {
                position: relative;
            }

            .rootMessage-background {
                height: 100%;
                background-color: #F0F2F5;
                display: flex;

                .el-scrollbar {
                    height: 100%;
                    background-color: #ffffff;

                    /deep/
                    .el-scrollbar__wrap {
                        overflow-x: hidden;
                    }
                }

                /*消息列表的公共样式*/
                .rootMessage-messageList {
                    background-color: #FFFFFF;
                    height: 700px;
                    padding: 20px;
                    margin: 30px;
                    flex: 3;

                    .rootMessage-messageList-title {
                        display: flex;
                        justify-content: space-between;
                        height: 50px;
                        align-items: center;
                        border-bottom: 1px solid #E0E7F3;

                        .el-button {
                            height: 30px;
                            line-height: 0;
                        }
                    }

                    .rootMessage-messageList-list {
                        height: 80px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        cursor: pointer;
                        border-radius: 5px;
                        padding-left: 5px;
                        &:hover {
                            background-color: #F6F9FF;
                            box-shadow: 0.5px 0.5px 20px rgba(0,0,0,0.3);
                        }

                        p {
                            flex: 3;
                            text-align: center;
                        }
                    }
                    .activeList {
                        background-color: #F6F9FF;
                        box-shadow: 0.5px 0.5px 20px rgba(0,0,0,0.3);
                    }

                    .isRead {
                        color: #9a9a9a;
                    }
                }

                .rootMessage-messageList-right {
                    margin: 30px;
                    margin-left: 0;
                    background-color: #FFFFFF;
                    padding: 20px;
                    flex: 7;
                    position: relative;

                    .el-button {
                        position: absolute;
                        bottom: 50px;
                        right: 50px;
                    }

                    em {
                        font-style: normal;
                        font-weight: 700;
                    }

                    .rootMessage-messageList-right-title {
                        padding-bottom: 25px;
                        border-bottom: 1px solid #E0E7F3;

                        div {
                            display: flex;
                        }
                    }

                    .rootMessage-messageList-right-bottom {
                        margin-top: 20px;
                        margin-bottom: 70px;
                        overflow: hidden;
                        word-wrap: break-word;
                        word-break: normal;
                    }
                }

            }
        }
    }
</style>
