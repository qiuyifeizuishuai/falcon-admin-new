import axios from '../axios';

// 新增专业
const addMajor = (params) => axios.post('/api/user/major/major', params);
// 修改专业
const updateMajor = (params) => axios.put('/api/user/major/major', params);
// 根据id查询专业
const selectMajor = (params) => axios.get(`/api/user/major/${params}`);

// 专业课列表
const getSpecialtyList = (params) => axios.post('/api/user/specialty/getSpecialtyList', params);
// 新增专业
const addSpecialty = (params) => axios.post('/api/user/specialty/specialty', params);
// 修改专业
const updateSpecialty = (params) => axios.put('/api/user/specialty/specialty', params);
// 修改专业Pass
const updateSpecialtyPass= (params)=>axios.put(`/api/user/specialty/specialtyPass/${params}`);
// 根据id查询专业课
const selectSpecialty = (params) => axios.get(`/api/user/specialty/${params}`);
// 直播课审核
/**
 *  fieldName 搜索参数
 */
const liveCheckList = (data) => axios.get(`/api/user/liveCheck/getLiveCheckList?fieldName=${data.fieldName}&majorUuid=${data.majorUuid}&perPage=${data.perPage}&schoolUuid=${data.schoolUuid}&start=${data.start}`); // 直播课审核列表
const submitLiveCheck = (uuid, data) => axios.patch(`/api/user/liveCheck/liveCheck/${uuid}`, data); // 通过or拒绝申请
const answerQuestionList = (lessonsUuid, data) => axios.get(`/api/course/questionAnswer/selectQuestionAnswers?question=${data.question}&perPage=${data.perPage}&start=${data.start}&lessonsUuid=${lessonsUuid}`); // 答疑配置列表
const addQuestionAnswerData = (data) => axios.post(`/api/course/questionAnswer/addQuestionAnswer`, data); // 添加配置答疑
const updateQuestionAnswerData = (data) => axios.put(`/api/course/questionAnswer/updateQuestionAnswer`, data); // 修改配置答疑
const deleteQuestionAnswerData = (uuid) => axios.delete(`/api/course/questionAnswer/deleteQuestionAnswer/${uuid}`); // delete配置答疑
const studentAnswerQuestionList = (lessonsUuid, data) => axios.get(`/api/course/studentAsk/selectStudentAsks?question=${data.question}&perPage=${data.perPage}&start=${data.start}&lessonsUuid=${lessonsUuid}`); // 学生提问答疑列表
const studentAnswerDisplayList = (questionId) => axios.put(`/api/course/studentAsk/addQA/${questionId}`); // 添加到答疑列表（移除未做）
const responseAnswer  = (data) => axios.put(`/api/course/studentAsk/answerAsk`, data); // 回答学生答疑
const uploadCourseware  = (specialtyUuid, data) => axios.put(`/api/user/specialty/specialtyFile/${specialtyUuid}`, data); // 上传课件
const studyRecords  = data => axios.get(`/api/course/studyRecord/study-records`, data); // 上传课件

export default {
    uploadCourseware,
    studentAnswerQuestionList,
    studentAnswerDisplayList,
    responseAnswer,
    deleteQuestionAnswerData,
    answerQuestionList,
    updateQuestionAnswerData,
    addQuestionAnswerData,
    addMajor,
    submitLiveCheck,
    liveCheckList,
    updateMajor,
    selectMajor,
    getSpecialtyList,
    addSpecialty,
    updateSpecialty,
    updateSpecialtyPass,
    selectSpecialty,
    studyRecords
};
