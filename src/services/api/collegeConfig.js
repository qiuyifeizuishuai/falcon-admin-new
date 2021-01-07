//  学院配置接口
import axios from '../axios';
import ajax from "../axios";

//第一次进入页面请求
export const getCollege = () => ajax.get('/api/user/schoolConfig/getSchoolConfig');
//  修改显示设置
export const UpdateShowPort = (data) => axios.post(`/api/user/schoolConfig/updateSchoolConfig`, data);

//  其他信息添加与修改接口
export const UpdateOther = (data) => axios.post(`/api/user/schoolConfig/updateSchoolConfig`, data);

//  添加与修改告知书接口
export const UpdateNotification = (data) => axios.post(`/api/user/schoolConfig/updateSchoolConfig`, data);

//  添加与修改考试须知接口
export const UpdateExamination = (data) => axios.post(`/api/user/schoolConfig/updateSchoolConfig`, data);

//报名费接口
export const SetMoney = (data) => axios.post(`/api/user/schoolConfig/updateSchoolConfig`, data);

