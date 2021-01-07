<template>
    <div>
        <!-- begin #header -->
        <div class="header navbar-default" id="header">
            <!-- begin navbar-header -->
            <div class="navbar-header">
                <button class="navbar-toggle pull-left" type="button" v-if="pageOptions.pageWithTwoSidebar"
                        v-on:click="toggleMobileRightSidebar">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <div class="navbar-brand" ><span class="navbar-logo"></span> <b>高校学习平台</b>

                </div>
                <button class="navbar-toggle pt-0 pb-0 mr-0 collapsed" type="button" v-if="pageOptions.pageWithTopMenu && !pageOptions.pageWithoutSidebar"
                        v-on:click="toggleMobileTopMenu">
					<span class="fa-stack fa-lg text-inverse">
						<i class="far fa-square fa-stack-2x"></i>
						<i class="fa fa-cog fa-stack-1x"></i>
					</span>
                </button>
                <button class="navbar-toggle" type="button" v-if="pageOptions.pageWithTopMenu && pageOptions.pageWithoutSidebar"
                        v-on:click="toggleMobileTopMenu">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <button class="navbar-toggle p-0 m-r-0" type="button" v-if="pageOptions.pageWithMegaMenu"
                        v-on:click="toggleMobileMegaMenu">
					<span class="fa-stack fa-lg text-inverse m-t-2">
						<i class="far fa-square fa-stack-2x"></i>
						<i class="fa fa-cog fa-stack-1x"></i>
					</span>
                </button>
                <button class="navbar-toggle" type="button" v-if="!pageOptions.pageWithoutSidebar"
                        v-on:click="toggleMobileSidebar">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
            </div>
            <!-- end navbar-header -->

            <header-mega-menu v-if="pageOptions.pageWithMegaMenu"></header-mega-menu>

            <!-- begin header-nav -->
            <ul class="navbar-nav navbar-right">

                <b-nav-item-dropdown menu-class="media-list dropdown-menu-right" toggle-class="f-s-14" no-caret>
                    <template slot="button-content">
                        <i class="fa fa-bell"></i>
                        <span class="label">{{totalMessage}}</span>
                    </template>
                    <div style="margin:5px 15px 10px 15px">
                        <el-tabs v-model="activeName" style="width: 260px;">
                            <el-tab-pane name="first" v-if="isSchool === 'true'">
                                <span slot="label">系统消息({{systemMessageList.length}})</span>
                                <div class="flex-bt" v-for="(value,index) in systemMessageList" :key="index" @click="handleMessage(value,'two')">
                                    <el-badge is-dot class="item " style="margin-right: 20px">
<!--                                        <i class="el-icon-message-solid f-s-26" ></i>-->
                                        <el-image style="width: 40px" :src="require('@/components/header/image/voice.png')"></el-image>
                                    </el-badge>
                                    <div>
                                        <b class="f-s-16">{{value._message.title}}</b>
                                        <br>
                                        <span>{{value.created_at | timer | timeDifference}}</span>
                                    </div>
                                </div>
                                <div class="flex-bt" v-if="!systemMessageList.length" style="justify-content: center;font-weight: 700">暂无未读消息</div>
                                <div class="examineMore" @click="handleMore('two')">查看更多<i class="el-icon-arrow-right"></i></div>
                            </el-tab-pane>
                            <el-tab-pane name="second">
                                <span slot="label">投诉建议({{complaintList.length}})</span>
                                <div class="flex-bt" v-for="(value,index) in complaintList" :key="index" @click="handleMessage(value,'second')">
                                    <el-badge is-dot class="item " style="margin-right: 20px">
<!--                                        <i class="el-icon-message-solid f-s-26" ></i>-->
                                        <el-image style="width: 40px;" :src="require('@/components/header/image/warn.png')"></el-image>
                                    </el-badge>
                                    <div>
                                        <b class="f-s-16">你收到一条投诉建议</b>
                                        <br>
                                        <span>{{value.created_at | timer | timeDifference}}</span>
                                    </div>
                                </div>
                                <div class="flex-bt" v-if="!complaintList.length" style="justify-content: center;font-weight: 700">暂无未读消息</div>
                                <div class="examineMore" @click="handleMore('second')">查看更多<i class="el-icon-arrow-right"></i></div>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </b-nav-item-dropdown>
                <div v-if="username==null" style="align-items: center;justify-content: center;display: flex">
                    <b style="padding: 10px;cursor: pointer;" @click="go('/')">登录</b>
                </div>
                <b-nav-item-dropdown class="dropdown navbar-user" menu-class="dropdown-menu-right" no-caret v-else>
                    <template slot="button-content">
                        <span style="font-size: 14px" class=" d-md-inline">{{username}}</span> <b class="caret"></b>
                    </template>
                    <b-dropdown-item href="javascript:;" @click=" logOut">注销</b-dropdown-item>
                </b-nav-item-dropdown>
                <li class="divider d-none d-md-block" v-if="pageOptions.pageWithTwoSidebar"></li>
                <li class="d-none d-md-block" v-if="pageOptions.pageWithTwoSidebar">
                    <a class="f-s-14" href="javascript:;" v-on:click="toggleRightSidebarCollapsed">
                        <i class="fa fa-th"></i>
                    </a>
                </li>
            </ul>
            <!-- end header navigation right -->
        </div>
        <!-- end #header -->
    </div>
</template>

<script>
    import PageOptions from '../../config/PageOptions.vue';
    import HeaderMegaMenu from './HeaderMegaMenu.vue';
    //  消息接口
    import {getReceiveMessage, getComplaint} from "../../services/api/systemMessage";

    export default {
        name: 'Header',
        components: {
            HeaderMegaMenu
        },
        data() {
            return {
                isSchool:window.localStorage.getItem('isSchool'),
                activeName:window.localStorage.getItem('isSchool') === 'true' ? 'first' : 'second',
                username:null,
                pageOptions: PageOptions,
                //  系统消息列表
                systemMessageList:[],
                //  投诉列表
                complaintList:[]
            };
        },
        mounted() {
            // console.log(this.isSchool);
            this.getUsername();
            this.getMessageData();
            //  系统消息
            this.$bus.$on("systemMsg", () => {
                this.getMessageData();
            });
            //  投诉建议
            this.$bus.$on("complaintMsg", () => {
                this.getMessageData();
            });
        },
        methods: {
            getUsername() {
                this.username = window.localStorage.getItem('username');
            },
            logOut(){
                this.$api.account.logout().then(()=>{
                    // console.log(res);
                    this.$message.success('已完成退出登陆');
                    this.$router.push({path:'/'});
                    window.localStorage.removeItem('webTitle');
                    window.localStorage.removeItem('username');
                    window.localStorage.removeItem("isSchool");
                    this.cookies.remove('token');
                });
            },
            go(url){
                this.$router.push({path:url});
            },
            toggleMobileSidebar() {
                this.pageOptions.pageMobileSidebarToggled = !this.pageOptions.pageMobileSidebarToggled;
            },
            toggleMobileRightSidebar() {
                this.pageOptions.pageMobileRightSidebarToggled = !this.pageOptions.pageMobileRightSidebarToggled;
            },
            toggleMobileTopMenu() {
                this.pageOptions.pageMobileTopMenu = !this.pageOptions.pageMobileTopMenu;
            },
            toggleMobileMegaMenu() {
                this.pageOptions.pageMobileMegaMenu = !this.pageOptions.pageMobileMegaMenu;
            },
            toggleRightSidebar() {
                this.pageOptions.pageRightSidebarToggled = !this.pageOptions.pageRightSidebarToggled;
            },
            toggleRightSidebarCollapsed() {
                this.pageOptions.pageRightSidebarCollapsed = !this.pageOptions.pageRightSidebarCollapsed;
            },
            checkForm: function (e) {
                e.preventDefault();
                this.$router.push({path: '/extra/search'});
            },
            //  获取系统消息
            getMessageData() {
                // 系统消息
                getReceiveMessage().then(res => {
                    if (res.code === 0) {
                        let arr = res.data.filter(value => !value.read_status);
                        // console.log(arr);
                        this.systemMessageList = arr.slice(0, 6);
                    } else {
                        this.$message.success("获取系统消息失败");
                        console.log("获取系统消息失败");
                    }
                });
                //  投诉建议
                getComplaint().then(res => {
                    if (res.code === 0) {
                        let arr = res.data.filter(value => !value.read_status);
                        // console.log(arr);
                        this.complaintList = arr.slice(0, 6);
                    } else {
                        this.$message.success("获取投诉建议消息失败");
                        console.log("获取投诉建议消息失败");
                    }
                });
            },
            //  查看单条消息
            handleMessage(value, name) {
                if (name === 'two') {
                    this.$router.push({
                        path:"/rootMessage",
                        query: {
                            activeName: name,
                            id: value._message.id
                        }
                    }).catch(() => {});
                } else {
                    this.$router.push({
                        path:"/rootMessage",
                        query: {
                            activeName: name,
                            id: value.id
                        }
                    }).catch(() => {});
                }
            },
            //  查看更多
            handleMore(value) {
                this.$router.push({
                    path:"/rootMessage",
                    query: {
                        activeName: value
                    }
                });
            }
        },

        //  时间过滤器
        filters: {
            timer: function (val) {
                let time = val.split("-");
                let date = time[2].split("T");
                let hours = date[1].split(":");
                return time[0] + "-" + time[1] + "-" + date[0] + " " + hours[0] + ":" + hours[1];
            },
            //  时差计算
            timeDifference: function (val) {
                let d1 = new Date(val);
                let d2 = new Date();
                // let leave1 = d3%(24*3600*1000);
                let timer = parseInt((d2 - d1) / 1000 / 60);
                // console.log(Math.floor(leave1/(3600*1000)))

                //  小于60分钟
                if (timer < 60) {
                    return `${timer}分钟前`;
                    //  日期是今天，时间大于60分钟
                } else if (new Date().getDay() === new Date(val).getDay() && timer > 60) {
                    return `${val.substring(10)}`;
                    // return `${Math.floor(leave1/(3600*1000))}小时前`;

                    //  昨天
                } else if (new Date().getDay() - new Date(val).getDay() === 1 || (new Date().getDay() === 0 && new Date(val).getDay() === 6 )) {
                    return `昨天  ${val.substring(10)}`;
                } else {
                    //  Math.floor(date3/(24*3600*1000))
                    return val;
                }
            }
        },
        computed: {
            totalMessage() {
                return this.systemMessageList.length + this.complaintList.length;
            }
        }
    };
</script>
<style scoped>
    /deep/ .el-badge__content.is-fixed{
        top:5px;
    }
    .flex-bt{
        display: flex;
        align-items: center;
        padding: 10px 0;
        border-bottom: 1px solid #E3E9F1;
        cursor: pointer;
    }
    /*.flex-bt:hover {*/
    /*    background-color: #EAEEF7;*/
    /*    border-radius: 5px;*/
    /*}*/
    .examineMore {
        line-height: 40px;
        text-align: center;
        cursor: pointer;
    }
</style>
