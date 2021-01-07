import ajax from '../axios';

const creatGrade = (data) => ajax.post('/api/user/grade/addGrade', data);//新增班级
const selectGrade = (data) => ajax.post('/api/user/grade/selectGrade', data);//班级列表
const getGradeAllStudent = (data) => ajax.post('/api/user/grade/getGradeAllStudent', data);//班级学生列表
const getGradeDetails = (id) => ajax.get(`/api/user/grade/getGradeByUuid/${id}`);//班级详情
const updateGrade = (data) => ajax.put(`/api/user/grade/updateGrade/`, data);//班级修改
const updateStudentIsLeader = (studentUuid, leader, gradeUuid) => ajax.patch(`/api/user/student/update-student-leader?studentUuid=${studentUuid}&leader=${leader}&gradeUuid=${gradeUuid}`);//leader 班干部
const deleteStudent = (studentUuid, gradeUuid) => ajax.get(`/api/user/undock-grade-student/${studentUuid}/${gradeUuid}`);// 移除学生
const gradeExpense = (data) => ajax.post(`/api/user/classService/listClassServiceLimit`, data);// 班费查询
const gradeAmount = (data) => ajax.post(`/api/user/classService/saveClassService`, data);// 班费支出/收集
const getStudentHistory = (data) => ajax.get(`/api/course/studyRecord/getStudyRecordByStudentUuid`, data);// 学生学习记录进度

export default {
    getStudentHistory,
    creatGrade,
    gradeAmount,
    getGradeAllStudent,
    gradeExpense,
    deleteStudent,
    selectGrade,
    updateStudentIsLeader,
    getGradeDetails,
    updateGrade
};
