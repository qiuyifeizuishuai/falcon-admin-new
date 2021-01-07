import ajax from '../axios';

const getPermissions = () => ajax.get('/api/user/role/getByRoleIdJurisdictionList');// 权限列表
const getRole = () => ajax.get('/api/user/role/getRoleList');// 角色列表
const createRole = (data) => ajax.post('/api/user/role/addRole', data);// 角色新增
const editRole = (data) => ajax.put('/api/user/role/updateRole', data);// 角色名称修改
const getPermissionsList = () => ajax.get('/api/user/jurisdiction/getJurisdictionList');// 获取权限列表所以
const givePermissions = (data) => ajax.post('/api/user/role/addRoleJurisdiction', data);// 给角色赋予权限
const getPermissionsDetails = (id) => ajax.get(`/api/user/role/getByRoleIdJurisdictionLists/${id}`);// 查询uuid权限
const getAdminList = (data) => ajax.post(`/api/user/user/getUserList`, data);// 获取二级管理员列表
const createAdmin = (data) => ajax.post(`/api/user/user/addUser`, data);// 新增二级管理员
const UpdateAdmin = (data) => ajax.put(`/api/user/user/updateUser`, data);// 修改二级管理员
const deleteAdmin = (id) => ajax.delete(`/api/user/user/delete/${id}`);// 删除二级管理员(学院禁用）

export default {
    createAdmin,
    deleteAdmin,
    UpdateAdmin,
    getAdminList,
    givePermissions,
    getPermissionsDetails,
    getPermissionsList,
    getPermissions,
    createRole,
    getRole,
    editRole
};
