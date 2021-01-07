<script>
import VueRouter from "vue-router";
import helloWord from '@/pages/account/helloWord';

const routes = [
    {
        name: "login",
        path: "/login",
        component: (resolve) => require(["@/pages/account/login.vue"], resolve),
        mete: {
            title: "登录",
        },
    },
    // 作业练习
    {
        name: "homeworkPractice",
        path: "/homeworkPractice",
        component: (resolve) =>
            require(["@/pages/studyManage/homeworkPractice/list.vue"], resolve),
        mete: {
            title: "作业练习",
        },
    },
    // 题型集合
    {
        name: "topicEntry",
        path: "/topicEntry",
        component: (resolve) =>
            require([
                "@/pages/studyManage/homeworkPractice/topicEntry.vue",
            ], resolve),
        mete: {
            title: "题型集合",
        },
    },
    // 多选题
    {
        name: "questionChoiceMultiple",
        path: "/questionChoiceMultiple",
        component: (resolve) =>
            require([
                "@/pages/studyManage/homeworkPractice/questionChoiceMultiple.vue",
            ], resolve),
        mete: {
            title: "多选题",
        },
    },
    // 单选题
    {
        name: "questionChoiceOne",
        path: "/questionChoiceOne",
        component: (resolve) =>
            require([
                "@/pages/studyManage/homeworkPractice/questionChoiceOne.vue",
            ], resolve),
        mete: {
            title: "单选题",
        },
    },
    // 判断题
    {
        name: "questionJudge",
        path: "/questionJudge",
        component: (resolve) =>
            require([
                "@/pages/studyManage/homeworkPractice/questionJudge.vue",
            ], resolve),
        mete: {
            title: "判断题",
        },
    },
    // 填空题
    {
        name: "questionFillBlank",
        path: "/questionFillBlank",
        component: (resolve) =>
            require([
                "@/pages/studyManage/homeworkPractice/questionFillBlank.vue",
            ], resolve),
        mete: {
            title: "填空题",
        },
    },
    // 主观题
    {
        name: "questionSubjective",
        path: "/questionSubjective",
        component: (resolve) =>
            require([
                "@/pages/studyManage/homeworkPractice/questionSubjective.vue",
            ], resolve),
        mete: {
            title: "主观题",
        },
    },
    {
        path: "/homeworkPractice",
        component: (resolve) =>
            require(["@/pages/studyManage/homeworkPractice/list.vue"], resolve),
    },
    {
        path: "/addCollege",
        component: (resolve) =>
            require(["@/pages/userManage/addCollegeManage.vue"], resolve),
    },
    {
        path: "/collegeManage",
        component: (resolve) =>
            require(["@/pages/userManage/collegeManage.vue"], resolve),
    },
    {
        name: "homeworkPractice",
        path: "/homeworkPractice",
        component: (resolve) =>
            require(["@/pages/studyManage/homeworkPractice/list.vue"], resolve),
        mete: {
            title: "作业练习",
        },
    },
    {
        path: "/",
        component: (resolve) => require(["@/pages/account/login.vue"], resolve),
        mete: {
            title: "登录",
        },
    },
    {
        name: "professionalManage",
        path: "/professionalManage",
        component: (resolve) =>
            require(["@/pages/studyManage/professionalManage.vue"], resolve),
        mete: {
            title: "专业管理",
        },
    },
    {
        name: "addProfessional",
        path: "/addProfessional",
        component: (resolve) =>
            require([
                "@/pages/studyManage/professionalManagement/addProfessional.vue",
            ], resolve),
        mete: {
            title: "新增&编辑专业",
        },
    },
    {
        name: "gradeManage",
        path: "/gradeManage",
        component: (resolve) =>
            require(["@/pages/studyManage/gradeManage.vue"], resolve),
        mete: {
            title: "班级管理",
        },
    },
    {
        name: "professionalClass",
        path: "/professionalClass",
        component: (resolve) =>
            require(["@/pages/studyManage/professionalClass.vue"], resolve),
        mete: {
            title: "专业课",
        },
    },
    {
        name: "takeClass",
        path: "/takeClass",
        component: (resolve) =>
            require(["@/pages/studyManage/takeClass.vue"], resolve),
        mete: {
            title: "选修课",
        },
    },
    {
        name: "notIdentifiedClass",
        path: "/notIdentifiedClass",
        component: (resolve) =>
            require(["@/pages/studyManage/notIdentifiedClass.vue"], resolve),
        mete: {
            title: "非学分认定课",
        },
    },
    {
        name: "addCurriculum",
        path: "/addCurriculum",
        component: (resolve) =>
            require([
                "@/pages/studyManage/professionalCourses/addCurriculum.vue",
            ], resolve),
        mete: {
            title: "新增课程",
        },
    },
    {
        path: "/addGrade",
        component: (resolve) =>
            require([
                "@/pages/studyManage/gradeManageDirectory/addGrade.vue",
            ], resolve),
    },
    {
        path: "/studentManage",
        component: (resolve) =>
            require(["@/pages/userManage/studentManage.vue"], resolve),
    },
    {
        path: "/addstudent",
        component: (resolve) =>
            require(["@/pages/userManage/addStudent.vue"], resolve),
    },
    {
        name: "teacherManage",
        path: "/teacherManage",
        component: (resolve) =>
            require(["@/pages/userManage/teacherManage.vue"], resolve),
        mete: {
            title: "教师管理",
        },
    },
    {
        name: "addTeacher",
        path: "/addTeacher",
        component: (resolve) =>
            require(["@/pages/userManage/addTeacher.vue"], resolve),
        mete: {
            title: "新增教师",
        },
    },
    {
        name: "sectionManagement",
        path: "/sectionManagement",
        component: (resolve) =>
            require([
                "@/pages/studyManage/sectionManagement/sectionManagement.vue",
            ], resolve),
        mete: {
            title: "章节管理",
        },
    },
    {
        name: "gradeStudentManagement",
        path: "/gradeStudentManagement",
        component: (resolve) =>
            require([
                "@/pages/studyManage/gradeManageDirectory/gradeStudentManagement.vue",
            ], resolve),
        mete: {
            title: "班级学生管理",
        },
    },
    {
        name: "subjectiveClassify",
        path: "/subjectiveClassify",
        component: (resolve) =>
            require(["@/pages/classificationManage/subjectiveClassify.vue"], resolve),
        mete: {
            title: "主观题分类",
        },
    }, {
        name: "learningProcess",
        path: "/learningProcess",
        component: (resolve) =>
            require(["@/pages/classificationManage/learningProcess.vue"], resolve),
        mete: {
            title: "学习进度查看",
        },
    },
    {
        name: "examinationClassify",
        path: "/examinationClassify",
        component: (resolve) =>
            require([
                "@/pages/classificationManage/examinationClassify.vue",
            ], resolve),
        mete: {
            title: "试卷分类",
        },
    },
    {
        name: "examinationManagement",
        path: "/examinationManagement",
        component: (resolve) =>
            require(["@/pages/practiceManage/examinationManagement.vue"], resolve),
        mete: {
            title: "试卷列表",
        },
    },
    {
        name: "addExamination",
        path: "/addExamination",
        component: (resolve) =>
            require(["@/pages/practiceManage/addExamination.vue"], resolve),
        mete: {
            title: "试卷列表--新增",
        },
    },
    {
        name: "platformNotice",
        path: "/platformNotice",
        component: (resolve) =>
            require(["@/pages/message/platformNotice.vue"], resolve),
        mete: {
            title: "平台公告",
        },
    },
    {
        name: "addPlatform",
        path: "/addPlatform",
        component: (resolve) =>
            require(["@/pages/message/addPlatform.vue"], resolve),
        mete: {
            title: "平台公告--新增",
        },
    },
    {
        name: "gradeExpense",
        path: "/gradeExpense",
        component: (resolve) =>
            require([
                "@/pages/studyManage/gradeManageDirectory/gradeExpense.vue",
            ], resolve),
        mete: {
            title: "班费管理",
        },
    },
    {
        name: "offlineTest",
        path: "/offlineTest",
        component: (resolve) =>
            require(["@/pages/testManage/offlineTest.vue"], resolve),
        mete: {
            title: "线下考试",
        },
    },
    {
        name: "offlineTestAdd",
        path: "/offlineTestAdd",
        component: (resolve) =>
            require(["@/pages/testManage/offlineTestAdd.vue"], resolve),
        mete: {
            title: "线下考试-新增考试",
        },
    },
    {
        name: "onlineTest",
        path: "/onlineTest",
        component: (resolve) =>
            require(["@/pages/testManage/onlineTest.vue"], resolve),
        mete: {
            title: "线上考试",
        },
    },
    {
        name: "onlineTestAdd",
        path: "/onlineTestAdd",
        component: (resolve) =>
            require(["@/pages/testManage/onlineTestAdd.vue"], resolve),
        mete: {
            title: "线上考试-新增考试",
        },
    },
    {
        name: "registerStudent",
        path: "/registerStudent",
        component: (resolve) =>
            require(["@/pages/testManage/registerStudent.vue"], resolve),
        mete: {
            title: "线上考试-报名学员",
        },
    },
    {
        name: "testScoring",
        path: "/testScoring",
        component: (resolve) =>
            require(["@/pages/testManage/testScoring.vue"], resolve),
        mete: {
            title: "线上考试-考题及阅卷",
        },
    },
    {
        name: "mockTest",
        path: "/mockTest",
        component: (resolve) =>
            require(["@/pages/testManage/mockTest.vue"], resolve),
        mete: {
            title: "模拟考试",
        },
    },
    {
        name: "mockConfig",
        path: "/mockConfig",
        component: (resolve) =>
            require(["@/pages/testManage/mockConfig/mockConfig.vue"], resolve),
        mete: {
            title: "模拟考试-考试设置",
        },
    },
    {
        name: "onlineTestAdd",
        path: "/onlineTestAdd",
        component: (resolve) =>
            require(["@/pages/testManage/onlineTestAdd.vue"], resolve),
        mete: {
            title: "线上考试-新增考试",
        },
    },
    {
        name: "simulationTest",
        path: "/simulationTest",
        component: (resolve) =>
            require(["@/pages/testManage/mockTest.vue"], resolve),
        mete: {
            title: "模拟考试",
        },
    },
    {
        name: "resultList",
        path: "/resultList",
        component: (resolve) =>
            require(["@/pages/testManage/resultList.vue"], resolve),
        mete: {
            title: "成绩下载",
        },
    },
    {
        name: "mockConfig",
        path: "/mockConfig",
        component: (resolve) =>
            require(["@/pages/testManage/mockConfig/mockConfig.vue"], resolve),
        mete: {
            title: "模拟考试-考试设置",
        },
    },
    {
        name: "roleManagement",
        path: "/roleManagement",
        component: (resolve) =>
            require(["@/pages/permissions/roleManagement.vue"], resolve),
        mete: {
            title: "角色管理",
        },
    },
    {
        name: "configRole",
        path: "/configRole",
        component: (resolve) =>
            require(["@/pages/permissions/configRole.vue"], resolve),
        mete: {
            title: "角色管理-权限分配",
        },
    },
    {
        name: "platformAccount",
        path: "/platformAccount",
        component: (resolve) =>
            require(["@/pages/permissions/platformAccount.vue"], resolve),
        mete: {
            title: "角色管理-平台账号",
        },
    },
    {
        name: "onlineTestAdd",
        path: "/onlineTestAdd",
        component: (resolve) =>
            require(["@/pages/testManage/onlineTestAdd.vue"], resolve),
        mete: {
            title: "线上考试-新增考试",
        },
    },
    {
        name: "mockTest",
        path: "/mockTest",
        component: (resolve) =>
            require(["@/pages/testManage/mockTest.vue"], resolve),
        mete: {
            title: "模拟考试",
        },
    },
    {
        name: "mockConfig",
        path: "/mockConfig",
        component: (resolve) =>
            require(["@/pages/testManage/mockConfig/mockConfig.vue"], resolve),
        mete: {
            title: "模拟考试-考试设置",
        },
    },
    {
        name: "roleManagement",
        path: "/roleManagement",
        component: (resolve) =>
            require(["@/pages/permissions/roleManagement.vue"], resolve),
        mete: {
            title: "角色管理",
        },
    },
    {
        name: "tencentUpload",
        path: "/tencentUpload",
        component: (resolve) => require(["@/plugins/tencentUpload.vue"], resolve),
        mete: {
            title: "腾讯视频上传Demo",
        },
    },
    {
        name: "collegeConfig",
        path: "/collegeConfig",
        component: (resolve) =>
            require(["@/pages/collegeConfig/index.vue"], resolve),
        mete: {
            title: "学院配置管理",
        },
    },
    {
        name: "examQuestionList",
        path: "/examQuestionList",
        component: (resolve) =>
            require(["@/pages/practiceManage/list.vue"], resolve),
        mete: {
            title: "管理试卷题目",
        },
    },
    {
        name: "studentHistory",
        path: "/studentHistory",
        component: (resolve) =>
            require([
                "@/pages/studyManage/gradeManageDirectory/studentHistory.vue",
            ], resolve),
        mete: {
            title: "学习进度管理",
        },
    },
    {
        name: "rootMessage",
        path: "/rootMessage",
        component: (resolve) =>
            require(["@/pages/message/rootMessage.vue"], resolve),
        mete: {
            title: "系统消息",
        },
    },
    {
        name: "sendMessage",
        path: "/sendMessage",
        component: (resolve) =>
            require(["@/pages/message/sendMessage.vue"], resolve),
        mete: {
            title: "发送消息",
        },
    },
    {
        name: "onlineTestAddIsGeneral",
        path: "/onlineTestAddIsGeneral",
        component: (resolve) =>
            require(["@/pages/testManage/onlineTestAddIsGeneral.vue"], resolve),
        mete: {
            title: "统考考试增加",
        },
    },
    {
        name: "unifiedOnlineTest",
        path: "/unifiedOnlineTest",
        component: (resolve) =>
            require(["@/pages/testManage/unifiedOnlineTest.vue"], resolve),
        mete: {
            title: "统考考试管理",
        },
    },
    {
        name: "forAudit",
        path: "/forAudit",
        component: (resolve) =>
            require(["@/pages/testManage/forAudit.vue"], resolve),
        mete: {
            title: "真人审核",
        },
    },
    {
        name: "liveClassCheck",
        path: "/liveClassCheck",
        component: (resolve) =>
            require(["@/pages/studyManage/liveClassCheck.vue"], resolve),
        mete: {
            title: "直播课审核",
        },
    },
    {
        name: "recorded",
        path: "/recorded",
        component: (resolve) =>
            require(["@/pages/testManage/recordedGrade.vue"], resolve),
        mete: {
            title: "统考成绩录入",
        },
    },
    {
        name: "costManagement",
        path: "/costManagement",
        component: (resolve) =>
            require(["@/pages/testManage/costManagement.vue"], resolve),
        mete: {
            title: "费用管理",
        },
    }, {
        name: "sensitive",
        path: "/sensitive",
        component: (resolve) =>
            require(["@/pages/sensitive/sensitive.vue"], resolve),
        mete: {
            title: "敏感词审核管理",
        },
    },
    {
        name: "proctorVideo",
        path: "/proctorVideo",
        component: (resolve) =>
            require(["@/pages/testManage/proctorVideo.vue"], resolve),
        mete: {
            title: "监考视频管理",
        },
    },
    {
        name: "answerQuestions",
        path: "/answerQuestions",
        component: (resolve) =>
            require([
                "@/pages/studyManage/sectionManagement/answerQuestions.vue",
            ], resolve),
        mete: {
            title: "章节答疑管理",
        },
    },

    {
        name: "courseEnrollment",
        path: "/courseEnrollment",
        component: (resolve) =>
            require([
                "@/pages/dataManage/courseEnrollment.vue",
            ], resolve),
        mete: {
            title: "课程报名数据",
        },
    },
    {
        name: "dashboard",
        path: "/dashboard",
        component: (resolve) =>
            require([
                "@/pages/dataManage/dashboard.vue",
            ], resolve),
        mete: {
            title: "数据看板",
        },
    },
    {path: '/helloWord', component: helloWord},
    {
        name: "commission",
        path: "/commission",
        component: (resolve) =>
            require([
                "@/pages/dataManage/commission.vue",
            ], resolve),
        mete: {
            title: "工作台",
        },
    },
    {
        name: "version",
        path: "/Version",
        component: (resolve) =>
            require([
                "@/pages/version/version.vue",
            ], resolve),
        mete: {
            title: "安卓版本管理",
        },
    },
];

const router = new VueRouter({
    routes,
});

export default router;
</script>
