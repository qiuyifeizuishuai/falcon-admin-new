import axios from '../axios';

const dashboardTop = (schoolUuid) => axios.get(`/api/user/dataLayout/getDataLayoutByFirstLine/${schoolUuid}`); //数据看板顶部数据
const dashboardMiddlePeopleNumber = (schoolUuid) => axios.get(`/api/user/dataLayout/getDataLayoutByMajorPeopleNumber/${schoolUuid}`); //数据看板中间/人数看板
const dashboardMiddleMoney = (schoolUuid, endDate, startDate) => axios.get(`/api/user/dataLayout/getMajorSignUp/${schoolUuid}?startDate=${startDate}&endDate=${endDate}`); //数据看板中间/费用看板
const dashboardPieList = (schoolUuid) => axios.get(`/api/user/dataLayout/getMajorPassRate/${schoolUuid}`); //数据看板下面/通过率 pie图
const dashboardLinePeople = (majorUuid) => axios.get(`/api/user/dataLayout/getMajorPassRateByMajorUuid/${majorUuid}`); //数据看板下面/人数表 line图
// 工作台
const checkTotal = (perPage, start) => axios.get(`/api/user/realCheck/getRealChecks?perPage=${perPage}&start=${start}&status=1`); // 真人待审核 total
const liveCheckTotal = (perPage, start) => axios.get(`/api/user/liveCheck/getLiveCheckList?perPage=${perPage}&start=${start}&status=1`); // 直播课待审核 total
const readTotal = () => axios.get(`/api/exam/check/admin-exams`); // 待阅卷total
const transferTotal = () => axios.get(`/api/shopping/order-count`); // 转账 total
const complaintsTotal = () => axios.get(`/api/msg/complaints-count`); // 投诉未读 total
const askStudentTotal = () => axios.get(`/api/course/studentAsk/getUntreatedTotal`); // 答疑total
const askStudentList = () => axios.get(`/api/course/studentAsk/getUntreatedInfo`); // 答疑列表
// 批量上传
const downLoadTemplate = (type) => axios.get(`/api/user/down/export-template`, {
    type: type
}); // 下载模版

export default {
    dashboardTop,
    downLoadTemplate,
    askStudentList,
    askStudentTotal,
    transferTotal,
    complaintsTotal,
    readTotal,
    liveCheckTotal,
    checkTotal,
    dashboardLinePeople,
    dashboardPieList,
    dashboardMiddleMoney,
    dashboardMiddlePeopleNumber,
};
