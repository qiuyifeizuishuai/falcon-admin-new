//  发送消息接口
import ajax from '../axios';
import axios from '../axios';
//  发送给院校的接口
export const sendAcademy = () =>ajax.post("/api/user/school/selectSchool", {});

// 发送给老师接口
//  老师类型列表
export const sendTeacherType = () =>axios.get("/api/user/teacher/getTeacherTypeList");
//  获取全部老师名字
export const sendTeacherName = (data) =>axios.get(`/api/user/teacher/getAllTeacherByArrParam`, data);

//  发送给学生
//  获取所有的专业
export const sendStudentMajor = (data) =>ajax.post("/api/user/major/getMajorList", data);
// 获取所有班级
export const sendStudentClass = (data) =>ajax.post("/api/user/grade/selectGrade", data);

//  发送消息                                                         message——type必须为system 暂时写死
export const sendSubmit = (data) =>ajax.post(`/api/msg/messages?messages_type=${data.type}`, data);
