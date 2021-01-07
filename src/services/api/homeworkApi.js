import ajax from '../axios';

// 作业练习
const getHomeworkList = (data) => ajax.post('/api/exam/topic/listTopic', data);//查询作业列表
const topicsGet = data => ajax.get('/api/exam/topic/topics', data);//新版查询作业列表
const topicsGetId = data => ajax.get(`/api/exam/topic/topics/${data.id}`, null);//新版更新作业列表index
const delQuestion = (data) => ajax.delete(`/api/exam/topic/removeTopicById/${data.id}`, null);//删除题目
const delTopics = data => ajax.delete(`/api/exam/topic/topics/${data.id}`, null);//新版删除题目
const settingQuestion = (data) => ajax.put('/api/exam/topic/updateChapterWork', data);//设置作业要求
const addQuestion = (data) => ajax.post('/api/exam/topic/saveTopic', data);//新增题目
const detailQuestion = (data) => ajax.get(`/api/exam/topic/getTopicById/${data.id}`, null);//题目详情
const updateQuestion = (data) => ajax.put('/api/exam/topic/updateTopic', data);//修改题目
const updateTopics = data => ajax.put(`/api/exam/topic/topics`, data);//新版修改题目
const getTopicScore = (data) => ajax.get(`/api/exam/topic/queryLessonsTopicScore/${data.id}`, null);//课题总分数
const getSubjectiveAll = (data) => ajax.get(`/api/course/subjective/selectSubjectiveAll/${data.uuid}/${data.type}`, null);//主观题类型
const questionTypes = data => ajax.get(`/api/exam/exam/question-types/${data}`, null);//主观题类型
const getPaperBasicInfo = data => ajax.get(`/api/exam/BeginExamController/getPaperBasicInfo/${data}`, null);//主观题类型
const topicNum = data => ajax.put(`/api/exam/topic/topic-num`, data);//拖拽修改题目
const question = data => ajax.put(`/api/exam/question-type-introduction/question`, data);//题型介绍修改
const questionGet = data => ajax.get(`/api/exam/question-type-introduction/question/${data}`);//题型介绍修改
const saveTopic = data => ajax.post(`/api/exam/topic/save-topic`, data);//新版新增题目
const topics = data => ajax.put(`/api/exam/topic/topics`, data);//新版修改题目
const uploadFile = data => ajax.post(`/api/exam/upload/uploadFile`, data);//新版修改题目

export default {
    getHomeworkList,
    addQuestion,
    delQuestion,
    updateQuestion,
    detailQuestion,
    settingQuestion,
    getTopicScore,
    getSubjectiveAll,
    questionTypes,
    getPaperBasicInfo,
    topicNum,
    question,
    questionGet,
    saveTopic,
    topics,
    topicsGet,
    topicsGetId,
    delTopics,
    updateTopics,
    uploadFile
};
