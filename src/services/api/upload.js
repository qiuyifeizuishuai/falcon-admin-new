import ajax from '../axios';
const getProof = () => ajax.get('/api/course/video/getUploadAuth'); // 获取上传凭证
const versionList = data => ajax.get('/api/android/android_version', data); // 获取安卓版本
const versionAdd = data => ajax.post('/api/android/android_version', data); // 添加安卓版本
const deleteVersion = data => ajax.delete(`/api/android/android/${data}`); // 获取安卓版本

export default {
    getProof, versionList, deleteVersion, versionAdd
};
