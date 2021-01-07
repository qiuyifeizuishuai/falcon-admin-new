import axios from '../axios';
import ajax from "../axios";
// log out 注销
const logout = () => axios.get('/api/user/login/logout');
// login
const login = (data) => axios.post('/api/user/user/loginUser', data);
// 新增学生
const createStudentManage = (data) => axios.post('/api/user/student/student', data);
// 修改学生
const updateStudentManage = (data) => axios.put('/api/user/student/student', data);
// 新增院校
const createCollegeManage = (data) => axios.post('/api/user/school/addSchool', data);
// 查询院校列表
const getCollegeManageList = (data) => axios.post('/api/user/school/selectSchool', data);
// 学生列表
const getStudentManageList = (data) => axios.post('/api/user/student/getStudentList', data);
// 教师列表
const getTeacherList = (params) => axios.post('/api/user/teacher/getTeacherList', params);
const putCollegeManageList = (data) => axios.put('/api/user/school/updateSchoolByUUID', data);
const updateStudentIsPass = (data) => ajax.put(`/api/user/student/updateStudentIsLeader`, data);
const getStudentDetails = (id) => ajax.get(`/api/user/student/${id}`);
const getCollegeDetails = (id) => ajax.get(`/api/user/getSchoolById/${id}`);
const updateCollegeIspass = (data) => ajax.post(`/api/user/school/updateSchoolIsPass/`, data);
const deleteStudent = (id) => ajax.delete(`/api/user/student/deleteStudentByUuid/${id}`);
const getSnapImgList = (studentUuid) => ajax.get(`/api/user/realCheck/getRealCheckByStudentUuid/${studentUuid}`); // 获取学生抓拍图片
export default {
    getStudentDetails,
    getSnapImgList,
    deleteStudent,
    logout,
    getCollegeDetails,
    createCollegeManage,
    updateCollegeIspass,
    getCollegeManageList,
    createStudentManage,
    updateStudentManage,
    getTeacherList,
    updateStudentIsPass,
    getStudentManageList,
    putCollegeManageList,
    login,
};
