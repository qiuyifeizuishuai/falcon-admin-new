<!--主观题分类-->
<template>
    <div class="subjectiveClassify">
        <base-list ref="demoTable" :condition="condition" :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true">
            <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
                <el-form-item>
                    <el-select v-model="condition.conditionModel.schoolUuid" placeholder="请选择院校" clearable>
                        <el-option v-for="item in schoolList" :key="item.uuid" :label="item.schoolName" :value="item.uuid"></el-option>
                    </el-select>
                </el-form-item>
                <el-button class="mar20" type="primary"  @click="searchData">搜索</el-button>
                <el-button class="fr" type="success" icon="el-icon-plus" @click="add = true; form = {}">新增分类</el-button> 
            </el-form>
            <el-table slot="list" :data="demoList" stripe border>
                <el-table-column prop="index" align="center" label="序号" width="70px">
                    <template slot-scope="scope">{{scope.$index+1}}</template>
                </el-table-column>
                <el-table-column prop="schoolName" align="center" label="院校">
                    <template slot-scope="scope">{{ scope.row.school.schoolName }}</template>
                </el-table-column>
                <el-table-column prop="classifyName" align="center" label="分类名称">
                    <template slot-scope="scope">{{ scope.row.classifyName }}</template>
                </el-table-column>
                <el-table-column align="center" label="操作" width="200px">
                    <template slot-scope="scope">
                        <div class="box">
                            <span class="span" @click="add = true; form.classifyName = scope.row.classifyName; form.uuid = scope.row.uuid; form.schoolUuid = scope.row.school.uuid">编辑</span>
                            <em class="emClass"></em>
                            <span class="span" @click="deleteSub(scope.row.uuid)">删除</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </base-list>

        <!-- 新增弹窗 -->
        <el-dialog title="新增分类" :visible.sync="add" width="400px">
            <el-form ref="ruleForm" :inline="true" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="院校" prop="schoolUuid" >
                    <el-select v-model="form.schoolUuid" placeholder="请选择院校" clearable>
                        <el-option v-for="item in schoolList" :key="item.uuid" :label="item.schoolName" :value="item.uuid"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="分类名称" prop="classifyName" >
                    <el-input v-model="form.classifyName" clearable></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="add = false">取 消</el-button>
                <el-button type="primary" @click="addSubmit(false)" v-if="form.uuid">确定修改</el-button>
                <el-button type="primary" @click="addSubmit(true)" v-else>提 交</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>

    export default {
        name:'subjectiveClassify',
        data() {
            return {
                // 查询条件
                condition:{
                    conditionModel:{}
                },
                // table数组
                demoList:[],
                // 分页查询api接口
                pageSearch: this.$api.classificationManage.subjectiveList,
                add:false,
                form:{
                    classifyName:'',
                    schoolUuid:''
                },
                rules:{
                    classifyName:[{ required: true, message: '请填写分类名称', trigger: 'blur' }],
                    schoolUuid:[{ required: true, message: '请选择院校', trigger: 'change' }]
                },
                schoolList:[]
            };
        },
        methods: {
            deleteSub(id) {
                this.$confirm('是否删除此项题目?', '提示', {type: 'warning'}).then(() => {
                    this.$api.classificationManage.deleteSubjective(id).then(res => {
                        if (res.code == 0) {
                            if (res.code == 0) {
                                this.loadData('删除成功');
                            }else {
                                this.$message.error('删除失败,请重试!');
                            }
                        }
                    });
                }).catch(() => {
                    console.log('取消了');
                });
                
            },
            addSubmit(type) {

                this.$refs.ruleForm.validate((validate) => {
                    if (validate) {
                        let name = this.form.classifyName;
                        if(name === '单选题' || name === '多选题' || name === '判断题' || name === '填空题') {
                            this.$message.error('分类名称不能为'+ name);
                            return;
                        }
                         if (type) {
                            this.$api.classificationManage.addSubjective(this.form).then(res => {
                                if (res.code == 0) {
                                    if (res.code == 0) {
                                        this.loadData('新增成功');
                                    }else {
                                        this.$message.error('新增失败,请重试!');
                                    }
                                }
                            });
                        } else {
                            this.$api.classificationManage.updateSubjective(this.form).then(res => {
                                if (res.code == 0) {
                                    if (res.code == 0) {
                                        this.loadData('修改成功');
                                    }else {
                                        this.$message.error('修改失败,请重试!');
                                    }
                                }
                            });
                        }
                    } else {
                        return false;
                    }
                });
            },
            loadData(msg) {
                this.$message({
                    message: msg,
                    type:'success',
                    duration:1000,
                    onClose:() => {
                        this.add = false;
                        this.searchData();
                    }
                });
            },
            searchData() {
                this.$refs.demoTable.loadData();
            }
        },
        created() {
            this.$emit('getMeteData', this.$Bre.breadCrumbs([0, 5, 51]));
        },
        mounted() {
            // 院校
            this.$api.common.schoolsList({}).then(res => {
                if (res.code == 0) this.schoolList = res.data;
            });
        }
    };
</script>

<style lang="scss" scoped>
.subjectiveClassify {
    .box {
        display: flex;
        align-items: center;
        justify-content: center;
        .span {
            color: #409dff;
            cursor: pointer;
            &:hover {
                opacity: .7;
            }
            &:last-child {
                color: #F56C6C;
            }
        }
        .emClass {
            display: inline-block;
            height: 14px;
            width: 1px;
            background-color: #e5e5e5;
            margin: 0 10px;
        }
    }
}
</style>
