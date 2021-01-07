import axios from '../axios';

const teacherList = (params) => axios.post('/api/user/teacher/getTeacherList', params);// 教师
const schoolsList = (params) => axios.post(`/api/user/school/selectSchool`, params);// 院校
const majorList = (params) => axios.post('/api/user/major/getMajorList', params);// 专业
const readTeacher = (params) => axios.get(`/api/exam/topic/queryReadTeacherByCollegeId/${params.collegeUuid}`, null);// 阅卷老师
const getExamTypes = (params) => axios.get(`/api/exam/paperClassify/colleges/${params.collegeUuid}/${params.courseUuid}/paper-classifies`, null);//试卷类型

export default {
    teacherList,
    schoolsList,
    majorList,
    readTeacher,
    getExamTypes
};
