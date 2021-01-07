<script>
// 工作台 /commission
const pathName = [
    {titleName: '首页', path: '/helloWord', number: 0},

    {titleName: '待办工作', path: '', number: 1},

    {titleName: '院校总数据', path: '/dashboard', number: 2},

    {titleName: '教务管理', path: '', number: 3},
    {titleName: '学院管理', path: '/collegeManage', number: 31},
    {titleName: '专业管理', path: '/professionalManage', number: 32},
    {titleName: '教师管理', path: '/teacherManage', number: 33},
    {titleName: '认定课程', path: '/professionalClass', number: 34},
    {titleName: '国考课程', path: '/notIdentifiedClass', number: 35},
    {titleName: '综合素质课程', path: '/takeClass', number: 36},
    {titleName: '直播课申请审核', path: '/liveClassCheck', number: 37},
    {titleName: '学习进度查看', path: '/learningProcess', number: 38},

    {titleName: '学员管理', path: '', number: 4},
    {titleName: '班级管理', path: '/gradeManage', number: 41},
    {titleName: '学生管理', path: '/studentManage', number: 42},

    {titleName: '练习中心', path: '', number: 5},
    {titleName: '主观题分类', path: '/subjectiveClassify', number: 51},
    {titleName: '试卷分类', path: '/examinationClassify', number: 52},
    {titleName: '试卷管理', path: '/examinationManagement', number: 53},

    {titleName: '考试管理', path: '', number: 6},
    {titleName: '模拟考试', path: '/simulationTest', number: 61},
    {titleName: '认定课程线上考试', path: '/onlineTest', number: 62},
    {titleName: '国考线上考试', path: '/unifiedOnlineTest', number: 63},
    {titleName: '认定课程线下考试', path: '/offlineTest', number: 64},
    {titleName: '考试人脸识别审核', path: '/forAudit', number: 65},
    {titleName: '线下转账管理', path: '/costManagement', number: 66},
    {titleName: '成绩下载', path: '/resultList', number: 67},

    {titleName: '消息中心', path: '', number: 7},
    {titleName: '系统消息', path: '/rootMessage', number: 71},
    {titleName: '平台公告', path: '/platformNotice', number: 72},

    {titleName: '报考数据', path: '', number: 8},
    {titleName: '课程报名数据', path: '/courseEnrollment', number: 81},

    {titleName: '安卓版本管理', path: '', number: 9},

    {titleName: '配置管理', path: '/collegeConfig', number: 10},

    {titleName: '账号权限管理', path: '', number: 11},
    {titleName: '角色管理', path: '/roleManagement', number: 111},
    {titleName: '平台账号', path: '/roleManagement', number: 112},

    {titleName: '审核工作', path: '', number: 12},
    {titleName: '敏感词监管审核', path: '/sensitive', number: 121},
];

const breadCrumbs = {
    breadCrumbs: rouPath => {
        let pathNameArr = [];
        if (rouPath) {
            rouPath.forEach(val => {
                pathName.forEach(valNum => {
                    if(valNum.number === val) {
                        pathNameArr.push(valNum);
                    }
                });
            });
        }
        return pathNameArr;
    }
};

export default breadCrumbs;
</script>
