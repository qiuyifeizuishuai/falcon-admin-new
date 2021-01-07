import ajax from '../axios';

// 平台公告--列表
const platformNoticeList = (params) => ajax.post('/api/user/platform/listPlatformNotice', params);
// 平台公告--新增
const addPlatformNotice = (params) => ajax.post('/api/user/platform/savePlatformNotice', params);
// 平台公告--修改
const updatePlatformNotice = (params) => ajax.put('/api/user/platform/updatePlatformNotice', params);
// 平台公告--查询
const selectPlatformNotice = (params) => ajax.get(`/api/user/platform/getPlatformNoticeByUuid/${params}`);
// 修改线下线上状态
const updatePlatformStatus = (uuid) => ajax.patch(`/api/user/platform/platformNotice/${uuid}`);
export default {
    platformNoticeList,
    updatePlatformStatus,
    addPlatformNotice,
    updatePlatformNotice,
    selectPlatformNotice,
};
