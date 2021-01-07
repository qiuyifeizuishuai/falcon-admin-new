<template>
    <div>
        <!-- begin login-cover -->
        <div class="login-cover">
            <div class="login-cover-image"></div>
            <div class="login-cover-bg"></div>
        </div>
        <!-- end login-cover -->

        <!-- begin login -->
        <div class="login login-v2" data-pageload-addclass="animated fadeIn">
            <!-- begin brand -->
            <div class="login-header">
                <div class="brand">
                    <b>法商教育培训管理平台</b>
                </div>
            </div>
            <!-- end brand -->
            <!-- begin login-content -->
            <div class="login-content">
                <div class="form-group m-b-20">
                    <input type="text"
                           class="form-control form-control-lg"
                           v-model="username"
                           placeholder="用户名"
                           required/>
                </div>
                <div class="form-group m-b-20">
                    <input type="password"
                           class="form-control form-control-lg"
                           v-model="password"
                           placeholder="密码"
                           @keyup.enter="login()"
                           required/>
                </div>
                <div class="login-buttons">
                    <button @click="login()" style="background-color:#409EFF;border:0px"
                            class="btn btn-success btn-block btn-lg">
                        登录
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import PageOptions from "../../config/PageOptions";

    export default {
        created() {
            PageOptions.pageEmpty = true;
            // 做登录的时候以下代码放入登录成功状态里
            // 院校
            // this.$api.studyManage.selectSchool({}).then(res => {
            //     if (res.code == 0) this.$store.commit('SET_SCHOOL', res.data.records);
            // });
            // // 专业
            // this.$api.studyManage.getMajorList({}).then(res => {
            //     if (res.code == 0) this.$store.commit('SET_MAJOR', res.data.records);
            // });
            // // 授课老师
            // // start:1, perPage:999, conditionModel:{}
            // this.$api.teacherManage.getTeacherList({}).then(res => {
            //     if (res.code == 0) this.$sotre.commit('SET_TEACHER', res.data.records);
            // });
        },
        beforeRouteLeave(to, from, next) {
            PageOptions.pageEmpty = false;
            next();
        },
        data() {
            return {
                username: '',
                password: '',
            };
        },

        methods: {
            login() {
                let data = {
                    userName: this.username,
                    password: this.password
                };
                this.$api.account.login(data).then(res => {
                    if (res.code == 0) {
                        window.localStorage.setItem('username', res.data.userName);
                        window.localStorage.setItem("isSchool", res.data.isSchool);
                        if(res.data.isSchool){
                            window.localStorage.setItem("permissions", res.data.schoolName);
                            window.localStorage.setItem("webTitle", res.data.schoolName);
                        }else{
                            window.localStorage.setItem("webTitle", '高校学习管理平台');
                            window.localStorage.setItem("permissions", '平台管理员');
                        }
                        this.cookies.set('token', res.data.token);
                        this.$router.replace({path: '/helloWord'});
                        //  让localStorage禁止修改值
                        window.addEventListener("storage", (e) => localStorage.setItem(e.key, e.oldValue));
                    } else {
                        this.cookies.remove('token');
                        window.localStorage.removeItem('webTitle');
                        window.localStorage.removeItem('username');
                        window.localStorage.removeItem("isSchool");
                        window.localStorage.removeItem("permissions");
                    }
                });
            },
        },
    };
</script>

