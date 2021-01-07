<script>
    const sidebarMenu = [
        {
            icon: 'far fa-calendar-check', title: '工作台', path: '/commission',
        },
        {
            icon: 'fas fa-chart-bar', title: '数据看板', path: '/dashboard',
        },
        {
            icon: 'far fa-building', title: '教务管理',
            children: [
                {path: '/collegeManage', title: '学院管理'},
                {path: '/professionalManage', title: '专业管理'},
                {path: '/teacherManage', title: '教师管理'},
                {path: '/professionalClass', title: '认定课程'},
                {path: '/notIdentifiedClass', title: '国考课程'},
                {path: '/takeClass', title: '选修课'},
                {path: '/liveClassCheck', title: '直播课审核'},
                {path: '/subjectiveClassify', title: '主观题分类'},
                {path: '/learningProcess', title: '学习进度查看'},
            ]
        },
        {
            icon: 'fas fa-graduation-cap', title: '学员管理',
            children: [
                {path: '/gradeManage', title: '班级管理'},
                {path: '/studentManage', title: '学生管理'},
            ]
        },
        {
            icon: 'far fa-clipboard', title: '试卷练习',
            children: [
                {path: '/examinationClassify', title: '试卷分类'},
                {path: '/examinationManagement', title: '试卷管理'}
            ]
        },
        {
            icon: 'fas fa-object-group', title: '考试管理',
            children: [
                {path: '/simulationTest', title: '模拟考试'},
                {path: '/onlineTest', title: '校考线上考试'},
                {path: '/unifiedOnlineTest', title: '国考线上考试'},
                {path: '/offlineTest', title: '校考线下考试'},
                {path: '/forAudit', title: '真人审核'},
                {path: '/costManagement', title: '线下缴费管理'}
            ]
        },
        {
            icon: 'far fa-comment', path: '/message', title: '消息中心',
            children: [
                {path: '/rootMessage', title: '系统消息'},
                {path: '/platformNotice', title: '平台公告'},
            ]
        },
        {
            icon: 'fas fa-database', title: '数据中心',
            children: [
                {path: '/courseEnrollment', title: '课程报名数据'},
            ]
        },
        {
            icon: 'fas fa-cog', title: '配置管理', path: '/collegeConfig',
        },
        {
            icon: 'fas fa-user', title: '权限管理',
            children: [
                {path: '/roleManagement', title: '角色管理'},
                {path: '/platformAccount', title: '平台账号'},
            ]
        },
        {
            icon: 'fas fa-cubes', title: '安卓版本管理', path: '/version',
        }
    ];

    export default sidebarMenu;
</script>
