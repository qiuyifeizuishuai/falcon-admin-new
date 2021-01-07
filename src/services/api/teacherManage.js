import axios from '../axios';

// 新增教师
const addTeacher = (params) => axios.post('/api/user/teacher/teacher', params);
// 修改编辑老师
const updateTeacher = (params) => axios.put('/api/user/teacher/teacher', params);
// 根据id查询老师
const selectTeacher = (params) => axios.get(`/api/user/teacher/getTeacher/${params}`);
// 教师类型
const typeTeacher = () => axios.get('/api/user/teacher/getTeacherTypeList');
const updateTeacherPass = (data) => axios.post('/api/user/teacher/teacherByUuid', data);

export default {
    addTeacher,
    updateTeacherPass,
    updateTeacher,
    selectTeacher,
    typeTeacher
};
