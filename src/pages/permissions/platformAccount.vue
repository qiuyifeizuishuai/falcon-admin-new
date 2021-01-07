<template>
    <div class="professionalManage">
        <base-list ref="demoTable" :condition="condition" :datas.sync="demoList" :pageSearch="pageSearch"
                   :isPaging="true">
            <el-form style="display: flex;justify-content: space-between" :inline="true" :model="condition"
                     class="search-form" slot="search" label-width="80px">
                <div>
                    <el-form-item>
                        <el-input v-model="condition.conditionModel.fieldName" placeholder="请输入关键字"></el-input>
                    </el-form-item>
                    <el-button type="primary" @click="loadData">搜索</el-button>
                </div>
                <div>
                    <el-button type="warning" icon="el-icon-plus" @click="addAccount('add')">新增账号</el-button>
                </div>
            </el-form>

            <el-table slot="list" :data="demoList" stripe border>
                <el-table-column align="center" label="序号">
                    <template slot-scope="scope">{{scope.$index+1}}</template>
                </el-table-column>
                <el-table-column prop="created_at" align="center" label="账号">
                    <template slot-scope="scope">{{ scope.row.userName }}</template>
                </el-table-column>
                <el-table-column prop="created_at" align="center" label="角色">
                    <template slot-scope="scope">{{ scope.row.roleName }}</template>
                </el-table-column>
                <el-table-column prop="created_at" align="center" label="使用人">
                    <template slot-scope="scope">{{ scope.row.useName }}</template>
                </el-table-column>
                <el-table-column prop="created_at" align="center" label="创建人">
                    <template slot-scope="scope">{{ scope.row.creatorName }}</template>
                </el-table-column>
                <el-table-column prop="created_at" align="center" label="账号类型">
                    <template slot-scope="scope">{{scope.row.isSchool | isSchool}}</template>
                </el-table-column>
                <el-table-column prop="created_at" align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="editAccount(scope.row, 'edit')">编辑/查看</el-button>
<!--                        <el-button type="text" :disabled="scope.row.isSchool" style="color: #e85f64" @click="deleteAccount(scope.row)">删除</el-button>-->
                        <el-button type="text"  style="color: #e85f64" @click="deleteAccount(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </base-list>
        <div>
            <el-dialog
                title="账号管理"
                :visible.sync="dialogVisible"
                width="40%"
            >
                <div class="dialog" style="padding:0 20% 10% 20%">
                    <div style="display: flex;align-items: center"><span style="width: 80px"><label style="color: #ff0000">*</label>账号</span><el-input style="flex: 8" class="w250" v-model="form.account" :disabled="dialogType=='edit'" placeholder="请输入账号"></el-input></div>

                    <div style="display: flex;align-items: center"><span  style="width: 80px"><label style="color: #ff0000">*</label>密码</span><el-input style="flex: 8" class="w250" v-model="form.password" show-password type="password" placeholder="请输入密码"></el-input></div>
                    <div style="display: flex;align-items: center">
                        <span  style="width: 80px"><label style="color: #ff0000">*</label>请选择角色</span>
                        <el-select style="flex: 8" class="w250" v-model="form.roleValue" placeholder="请选择角色">
                            <el-option
                                v-for="item in roleList"
                                :key="item.uuid"
                                :label="item.roleName"
                                :value="item.uuid">
                            </el-option>
                        </el-select>
                    </div>
                    <div style="display: flex;align-items: center"><span  style="width: 80px"><label style="color: #ff0000">*</label>使用人</span><el-input style="flex: 8" class="w250" v-model="form.useAccount" placeholder="请输入使用人"></el-input></div>
                </div>
                <div style="text-align: center">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submit">确 定</el-button>
                </div>

            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'professionalManage',
        data() {
            return {
                editAccountUuid: '',
                form: {
                    row:{},
                    account: '',
                    password: '',
                    roleValue: '',
                    useAccount: ''
                },
                dialogVisible: false,
                dialogType: '',
                // 查询条件
                condition: {
                    conditionModel: {}
                },
                roleList: [],
                // table数组
                demoList: [],
                // 分页查询api接口
                pageSearch: this.$api.permissions.getAdminList,
            };
        },
        mounted() {
            this.getRole();
        },
        created() {
            this.$emit('getMeteData', this.$Bre.breadCrumbs([0, 11, 112]));
        },
        filters: {
            isSchool(val) {
                if (val) return '学院账号';
                if (!val) return '学平台二级管理员院账号';
            }
        },
        methods: {
            editAccount(row, type) {
                this.dialogVisible = true;
                console.log(row);
                // this.form.row.isSchool = '';
                this.form.row = row;
                this.dialogType = type;
                this.form.useAccount = row.useName;
                this.form.password = row.password;
                this.form.roleValue = row.roleUuid;
                this.editAccountUuid = row.uuid;
                this.form.account = row.userName;
            },
            submit() {
                let data = {};
                let isSchool = this.form.row.isSchool;
                if(isSchool){
                    if (this.form.account && this.form.password) {
                        if (this.dialogType == 'add') {
                            data = {
                                userName: this.form.account,
                                password: this.form.password,
                                roleUuid: this.form.roleValue,
                                useName: this.form.useAccount
                            };
                            this.$api.permissions.createAdmin(data).then(res => {
                                console.log(res);
                                this.dialogVisible = false;
                                this.loadData();
                                this.$message.success('新建成功');
                            });
                        } else {
                            data = {
                                uuid: this.editAccountUuid,
                                userName: this.form.account,
                                password: this.form.password,
                                roleUuid: this.form.roleValue,
                                useName: this.form.useAccount
                            };
                            this.$api.permissions.UpdateAdmin(data).then(res => {
                                console.log(res);
                                this.dialogVisible = false;
                                this.loadData();
                                this.$message.success('修改成功');
                            });
                        }
                    } else {
                        this.$message.warning("内容不完整或输入错误");
                    }
                }else{
                    if (this.form.account && this.form.password && this.form.roleValue && this.form.useAccount) {
                        if (this.dialogType == 'add') {
                            data = {
                                userName: this.form.account,
                                password: this.form.password,
                                roleUuid: this.form.roleValue,
                                useName: this.form.useAccount
                            };
                            this.$api.permissions.createAdmin(data).then(res => {
                                console.log(res);
                                this.dialogVisible = false;
                                this.loadData();
                                this.$message.success('新建成功');
                            });
                        } else {
                            data = {
                                uuid: this.editAccountUuid,
                                userName: this.form.account,
                                password: this.form.password,
                                roleUuid: this.form.roleValue,
                                useName: this.form.useAccount
                            };
                            this.$api.permissions.UpdateAdmin(data).then(res => {
                                console.log(res);
                                this.dialogVisible = false;
                                this.loadData();
                                this.$message.success('修改成功');
                            });
                        }
                    } else {
                        this.$message.warning("内容不完整或输入错误");
                    }
                }

            },
            // eslint-disable-next-line no-unused-vars
            deleteAccount(row) {
                this.$api.permissions.deleteAdmin(row.uuid).then(res => {
                    console.log(res);
                    this.$message.success('删除成功');
                    this.loadData();
                });
            },
            addAccount(type) {
                this.dialogVisible = true;
                this.form.account = '';
                this.form.password = '';
                this.form.roleValue = '';
                this.form.useAccount = '';
                this.form.row.isSchool = '';
                this.dialogType = type;
            },
            loadData() {
                this.$refs.demoTable.loadData();
            },
            getRole() {
                this.$api.permissions.getRole({}).then(res => {
                    console.log(res);
                    this.roleList = res.data;
                });
            }
        },
    };
</script>

<style scoped>
    .w250 {
        width: 250px;
        margin: 10px 0;
    }
</style>
