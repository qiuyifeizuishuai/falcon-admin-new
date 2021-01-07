import ajax from '../axios';

// 查询章节and课章
const getSetting = (data) => ajax.post('/api/course/section/selectSection', data);

// 批量新增
const importExcel = (data) => ajax.post('/api/exam/upload/import-excel', data);
// 新增课章
const addSection = (data) => ajax.post('/api/course/section/addSection', data);
// 删除课章
const deleteSection = (uuid) => ajax.delete(`/api/course/section/deleteSection/${uuid}`);
// 编辑章节
const updateSection = (data) => ajax.put(`/api/course/section/updateSections`, data);
// 修改章节title
const updateSectionTitle = (data) => ajax.put(`/api/course/section/updateTitle`, data);

// 新增课节
const addLessons = (data) => ajax.post(`/api/course/lessons/addLessons`, data);
// 编辑课节
const editLessons = (data) => ajax.put(`/api/course/lessons/updateLessons`, data);
// 删除课节
const deleteLessons = (uuid) => ajax.delete(`/api/course/lessons/deleteLessons/${uuid}`);
//上传视频获取凭证等
const getUploadMessage = () => ajax.get(`/api/course/video/uploadAuth`);
export default {
    getSetting,
    addLessons,
    deleteSection,
    getUploadMessage,
    addSection,
    updateSection,
    deleteLessons,
    updateSectionTitle,
    editLessons,
    importExcel
};
