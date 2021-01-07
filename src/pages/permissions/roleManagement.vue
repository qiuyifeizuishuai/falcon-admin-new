<!--教师管理-->
<template>
    <div class="teacherManage">
        <div>
            <el-button type="primary" @click="addRole" style="margin-bottom: 20px;">新增角色</el-button>
        </div>
        <base-list ref="demoTable" :condition="condition" :datas.sync="demoList" :pageSearch="pageSearch"
                   :isPaging="true">
            <el-table slot="list" :data="demoList" stripe border>
                <el-table-column prop="id" align="center" label="序号">
                    <template slot-scope="scope">{{scope.$index+1}}</template>
                </el-table-column>
                <el-table-column prop="createTime" align="center" label="角色名称">
                    <template slot-scope="scope">{{ scope.row.roleName }}</template>
                </el-table-column>
                <el-table-column prop="createTime" align="center" label="角色描述">
                    <template slot-scope="scope">{{ scope.row.sketch }}</template>
                </el-table-column>
                <el-table-column prop="created_at" align="center" label="操作">
                    <template slot-scope="scope"  v-if="!(scope.row.roleName=='admin'||scope.row.roleName=='学校')">
                            <el-button type="text" @click="edit(scope.row)">编辑权限</el-button>
                            <el-button type="text" @click="editRole(scope.row)">编辑角色名称</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </base-list>
        <div>
            <el-dialog
                title="角色信息"
                :visible.sync="roleDialog"
                width="30%"
            >
                <div>
                    <el-form :rules="rules">
                    <div style="display: flex;align-items: center"><span ><label style="color: #ff0000">*</label>角色名称:</span><el-input style="padding: 10px 30px;flex: 8" v-model.trim="form.roleName" placeholder="角色名称"></el-input></div>
                        <div style="display: flex;align-items: center"><span><label style="color: #ff0000">*</label>角色描述:</span><el-input style="padding: 10px 30px;flex: 8" v-model.trim="form.sketch" placeholder="角色描述"></el-input></div>
                    </el-form>
                </div>
                <div style="text-align: center">
                    <el-button @click="roleDialog = false">取 消</el-button>
                    <el-button type="primary" @click="submitRole">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                roleDialog: false,
                roleUuid: '',
                dialogType: '',
                form: {
                    roleName: '',
                    sketch: '',
                },
                // 查询条件
                condition: {
                    conditionModel: {}
                },
                // table数组
                demoList: [],
                // 分页查询api接口
                pageSearch: this.$api.permissions.getRole,
                rules: {
                    name: [
                        { required: true, message: '请输入角色名称', trigger: 'blur' }
                    ],
                    region: [
                        { required: true, message: '请输入角色描述', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitRole() {
                if (this.dialogType == 'add') {
                    // 添加角色
                    if (this.form.roleName && this.form.sketch) {
                        this.$api.permissions.createRole(this.form).then(res => {
                            console.log(res);
                            this.roleDialog = false;
                            this.loadData();
                        });
                    } else {
                        this.$message.error('信息不完善');
                    }
                } else {
                    let data = {
                        roleName: this.form.roleName,
                        sketch: this.form.sketch,
                        uuid: this.roleUuid
                    };
                    if (this.form.roleName && this.form.sketch) {
                        this.$api.permissions.editRole(data).then(res => {
                            console.log(res);
                            this.roleDialog = false;
                            this.loadData();
                        });
                    } else {
                        this.$message.error('信息不完善');
                    }
                }
            },
            addRole() {
                this.roleDialog = true;
                this.dialogType = 'add';

            },
            editRole(row) {
                // 编辑角色名称
                this.form.sketch = row.sketch;
                this.form.roleName = row.roleName;
                this.roleUuid = row.uuid;
                this.roleDialog = true;
                this.dialogType = 'edit';
                console.log(row);
            },
            edit(row) {
                // 编辑角色权限
                this.$router.push({
                    path: '/configRole', query: {
                        uuid: row.uuid
                    }
                });
                console.log(row);
            },
            loadData() {
                this.$refs.demoTable.loadData();
            },
        },
        created() {
            this.$emit('getMeteData', this.$Bre.breadCrumbs([0, 11, 111]));
        }
    };
</script>

<style lang="scss" scoped>
    .span {
        color: #409dff;
        cursor: pointer;

        &:hover {
            opacity: .7;
        }
    }
   /deep/ .base-list .bottom{
        display: none !important;
    }
</style>
