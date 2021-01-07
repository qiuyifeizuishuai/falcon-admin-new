import axios from '../axios';
// 考试管理
const getListExamBasic = (data) => axios.post('/api/exam/exam/listExamBasic', data);//线上线下考试列表
const studentScoresParam = (data) => axios.post('/api/exam/disGeneralExamination/student-scores-param', data);//线上线下考试列表
const addOnlineTest = (data) => axios.post('/api/exam/exam/saveExamBasic', data);//添加线上考试
const updateOnlineTest = (data) => axios.put('/api/exam/exam/updateExamBasic', data);//更新线上考试
const detailOnlineTest = (data) => axios.get(`/api/exam/exam/getOneExamBasicByUuid/${data.id}`, null);//线上考试详情
const getExamStudent = (data) => axios.post(`/api/exam/examRegist/testPaperStudents`, data);//报名学员查询
const getExamMock = (data) => axios.post(`/api/exam/examBasicPractice/listExamBasicPracticeTopic`, data);// 模拟考试列表
const createSettingExamMock = (data) => axios.post(`/api/exam/examBasicPractice/saveExamBasicPractice`, data);// 新增模拟设置
const updateSettingExamMock = (data) => axios.put(`/api/exam/examBasicPractice/updateExamBasicPractice`, data);// 修改模拟设置
const getSettingExamMockDetails = (uuid) => axios.get(`/api/exam/examBasicPractice/getExamBasicPracticeByUuid/${uuid}`);// 详情查询模拟设置
const updateExamBasicStatus = (data) => axios.put(`/api/exam/exam/updateExamBasicStatusByUuid/${data.uuid}`, null);//考试上线，下线
const setSubjectiveNum = (data) => axios.put(`/api/exam/exam/setSubjectiveTopicNum`, data);//主观题选做设置
const updateTopicTeacher = (data) => axios.put(`/api/exam/topic/updateTopicTeacher`, data);//设置阅卷老师
const addUnifiedExamination = (data) => axios.post(`/api/exam/unifiedExamController/saveUnifiedExam`, data);// 统考考试新增
const getUnifiedExamination = (data) => axios.get(`/api/exam/unifiedExamController/getUnifiedExam?start=${data.start}&perPage=${data.perPage}&schoolUuid=${data.collageUuid}&majorUuid=${data.majorUuid}&name=${data.name}`);// 统考考试列表
const getUnifiedExaminationDetails = (uuid) => axios.get(`/api/exam/unifiedExamController/getUnifiedExam/${uuid}`);// 统考考试详情
const updateUnifiedExaminationDetails = (data) => axios.put(`/api/exam/unifiedExamController/updateUnifiedExam`, data);// 统考考试更新
const IsPassUnifiedExaminationDetails = (uuid) => axios.put(`/api/exam/unifiedExamController/isPassUnifiedExam/${uuid}`);// 统考考试 上下线
const uploadStudentCertificate = (studentUuid, classUuid, imgFileList) => axios.put(`/api/course/diploma/updateDiplomaByAdmin/${studentUuid}/${classUuid}/?diplomas=${imgFileList}`);// 上传学生证书
const realCheck = (data) => axios.get(`/api/user/realCheck/getRealChecks?start=${data.start}&perPage=${data.perPage}&studentName=${data.studentName}`);// 真人审核列表
const checkSubmit = (uuid, data) => axios.patch(`/api/user/realCheck/realChecks/${uuid}`, data);// 审核提交
const recordedGradeList = (data, studentName) => axios.get(`/api/exam/unifiedExamController/getStudentExam/${data.uuid}/${data.start}/${data.perPage}?studentName=${studentName}`);// get成绩录入list
const recordedGradeStudent = (uuid, data) => axios.put(`/api/exam/unifiedExamController/updateStudentScore/${uuid}/${data.studentUuid}/${data.score}`);// 统考录入成绩修改（录入）
const addProctorData = (data) => axios.post(`/api/course/monitorVideo/addMonitorVideo`, data);// 线下考试 - 新增监考视频资源
const getProctorList = (uuid) => axios.get(`/api/course/monitorVideo/selectMonitor/${uuid}`);// 线下考试 - 监考视频列表
const deleteProctor = (uuid) => axios.delete(`/api/course/monitorVideo/deleteMonitorVideo/${uuid}`);// 线下考试 - 监考视频删除
const getAuthorKey = (fileId) => axios.get(`/api/course/monitorVideo/playMonitorVideo/${fileId}`);// 线下考试 - 监考视频播放获取签名
const checkExamPost = (data) => axios.post(`/api/payment/bankPayCallback`, data);// 线下考试缴费审核（通过，拒绝）
const getAllOrder = (data) => axios.get(`/api/shopping/order?q=${data.q}&payment_channels=${data.payment_channels}&perPage=${data.perPage}&start=${data.start}&specialty=${data.specialty}&school=${data.school}`);// 线下缴费列表
const getCheckTeacherList = (examUuid) => axios.get(`/api/exam/exam/inspectorTeachers/${examUuid}`);// 考试阅卷督查列表
const setCheckTeacher = (examUuid, teacherUuid) => axios.put(`/api/exam/exam/inspectorTeachers/${examUuid}/${teacherUuid}`);// 考试设置阅卷督查
const getCheckTeacherDetails = (uuid) => axios.get(`/api/exam/exam/getOneExamBasicByUuid/${uuid}`);// 回显考试阅卷督查老师
const submitPerformance = (data) => axios.post(`/api/exam/examRegist/offline-exam-input-score`, data); // 校考线下考试-提交成绩
export default {
    checkSubmit,
    getCheckTeacherList,
    setCheckTeacher,
    getAllOrder,
    getCheckTeacherDetails,
    checkExamPost,
    getAuthorKey,
    deleteProctor,
    addProctorData,
    getProctorList,
    recordedGradeStudent,
    realCheck,
    recordedGradeList,
    uploadStudentCertificate,
    IsPassUnifiedExaminationDetails,
    getSettingExamMockDetails,
    updateSettingExamMock,
    getUnifiedExamination,
    getExamMock,
    updateUnifiedExaminationDetails,
    createSettingExamMock,
    getListExamBasic,
    studentScoresParam,
    getUnifiedExaminationDetails,
    addUnifiedExamination,
    addOnlineTest,
    detailOnlineTest,
    updateOnlineTest,
    getExamStudent,
    updateExamBasicStatus,
    setSubjectiveNum,
    updateTopicTeacher,
    submitPerformance
};
