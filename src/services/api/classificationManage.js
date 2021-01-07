import axios from '../axios';

// 主观题分类--列表
const subjectiveList = (params) => axios.post('/api/course/subjective/selectSubjective', params);
// 主观题分类--新增
const addSubjective = (params) => axios.post('/api/course/subjective/addSubjective', params);
// 主观题分类--修改
const updateSubjective = (params) => axios.put('/api/course/subjective/updateSubjective', params);
// 主观题分类--删除
const deleteSubjective = (params) => axios.delete(`/api/course/subjective/deleteSubjective/${params}`);

// 试卷分类--列表
const classifyList = (params) => axios.post('/api/exam/paperClassify/listPaperClassifyLimit', params);
// 试卷分类--新增
const addClassify = (params) => axios.post('/api/exam/paperClassify/savePaperClassify', params);
// 试卷分类--修改
const updateClassify = (params) => axios.put('/api/exam/paperClassify/updatePaperClassifyByUuid', params);
// 试卷分类--删除
const deleteClassify = (params) => axios.delete(`/api/exam/paperClassify/removePaperClassifyByUuid/${params}`);

// 试卷管理--列表
const paperPracticeList = (params) => axios.post('/api/exam/paperPractice/listPaperPracticeByLimit', params);
// 试卷管理--新增
const addPaperPractice = (params) => axios.post('/api/exam/paperPractice/savePaperPractice', params);
// 试卷管理--修改
const updatePaperPractice = (params) => axios.put('/api/exam/paperPractice/updatePaperPractice', params);
// 试卷管理--删除
const deletePaperPractice = (params) => axios.delete(`/api/exam/paperPractice/removePaperPracticeByUuid/${params}`);
// 试卷管理--查询
const selectPaperPractice = (params) => axios.get(`/api/exam/paperPractice/getPaperPracticeByUuid/${params}`);
export default {
    subjectiveList,
    addSubjective,
    updateSubjective,
    deleteSubjective,
    classifyList,
    addClassify,
    updateClassify,
    deleteClassify,
    paperPracticeList,
    addPaperPractice,
    updatePaperPractice,
    deletePaperPractice,
    selectPaperPractice
};