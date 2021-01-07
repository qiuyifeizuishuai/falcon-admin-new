<!-- 试卷分类-->
<template>
    <div class="examinationClassify">
        <base-list ref="demoTable" :condition="condition" :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true">
            <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
                <el-form-item>
                    <el-select v-model="condition.conditionModel.collageUuid" placeholder="请选择院校" clearable>
                        <el-option v-for="item in schoolList" :key="item.uuid" :label="item.schoolName" :value="item.uuid"></el-option>
                    </el-select>
                </el-form-item>
                <el-button class="mar20" type="primary"  @click="searchData">搜索</el-button>
                <el-button class="fr" type="success" icon="el-icon-plus" @click="add = true; formData = {}, paperModeOne = true, paperModeTwo = true">新增分类</el-button>
            </el-form>
            <el-table slot="list" :data="demoList" stripe border>
                <el-table-column prop="index" align="center" label="序号" width="70px">
                    <template slot-scope="scope">{{scope.$index+1}}</template>
                </el-table-column>
                <el-table-column prop="schoolName" align="center" label="院校">
                    <template slot-scope="scope">{{ scope.row.schoolName }}</template>
                </el-table-column>
                <el-table-column prop="paperClassifyName" align="center" label="分类名称">
                    <template slot-scope="scope">{{ scope.row.paperClassifyName }}</template>
                </el-table-column>
                <el-table-column align="center" label="操作" width="200px">
                    <template slot-scope="scope" v-if="!scope.row.isNationalExam">
                        <div class="box">
                            <span class="span" @click="open(scope.row)">编辑</span>
                            <em class="emClass"></em>
                            <span class="span" @click="deleteSub(scope.row.uuid)">删除</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </base-list>

        <!-- 新增弹窗 -->
        <el-dialog title="新增分类" :visible.sync="add" width="380px">
            <el-form ref="ruleForm" :inline="true" :model="formData" :rules="rules" label-width="80px">
                <el-form-item label="院校" prop="collageUuid">
                    <el-select v-model="formData.collageUuid" placeholder="请选择院校" clearable>
                        <el-option v-for="item in schoolList" :key="item.uuid" :label="item.schoolName" :value="item.uuid"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="分类名称" prop="paperClassifyName" class="wb100">
                    <el-input v-model="formData.paperClassifyName" clearable></el-input>
                </el-form-item> 
                <el-form-item label="试卷模式" class="wb100">
                    <el-checkbox label="练习模式" v-model="paperModeOne"></el-checkbox>
                    <el-checkbox label="考试模式" v-model="paperModeTwo"></el-checkbox>
                </el-form-item>
                <el-form-item label="分类展示" class="ma0 wb100">
                    <el-checkbox v-model="formData.isShowCenter" :label="true">展示到学生练习中心目录</el-checkbox>
                </el-form-item> 
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="add = false">取 消</el-button>
                <el-button type="primary" @click="addSubmit(false)" v-if="formData.uuid">确定修改</el-button>
                <el-button type="primary" @click="addSubmit(true)" v-else>提 交</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name:'examinationClassify',
        data() {
            return {
                // 查询条件
                condition:{
                    conditionModel:{
                        collageUuid:''
                    }
                },
                // table数组
                demoList:[],
                // 分页查询api接口
                pageSearch: this.$api.classificationManage.classifyList,
                add:false,
                formData:{
                    paperClassifyName:'',
                    collageUuid:'',
                    isShowCenter:false,
                    specialtyClassUuid:''
                },
                paperModeOne:'',
                paperModeTwo:'',
                rules:{
                    paperClassifyName:[{ required: true, message: '请填写分类名称', trigger: 'blur' }],
                    collageUuid:[{ required: true, message: '请选择院校', trigger: 'change' }]
                },
                schoolList:[],
                specialtyList:[]
            };
        },
        methods: {
            open(item) {
                let objData = item.paperMode.split(',');
                if (objData.length == 1) {
                    if (objData[0] == 'lianxi') this.paperModeOne = true;
                    else this.paperModeOne = false;
                    if (objData[0] == 'kaoshi') this.paperModeTwo = true;
                    else this.paperModeTwo = false;
                } else {
                    if (objData[0] == 'lianxi') this.paperModeOne = true;
                    if (objData[1] == 'kaoshi') this.paperModeTwo = true;
                }
                if(item.isShowCenter) this.formData.isShowCenter = item.isShowCenter;
                else this.formData.isShowCenter = false;
                this.formData.paperClassifyName = item.paperClassifyName;
                this.formData.specialtyClassUuid = item.specialtyClassUuid;
                this.formData.collageUuid = item.collageUuid;
                this.formData.uuid = item.uuid;
                this.add = true;
            },
            deleteSub(id) {
                this.$confirm('是否删除此项题目?', '提示', {type: 'warning'}).then(() => {
                    this.$api.classificationManage.deleteClassify(id).then(res => {
                        if (res.code == 0) {
                            if (res.code == 0) {
                                this.loadData('删除成功');
                            } else {
                                this.$message.error('删除失败,请重试!');
                            }
                        }
                    });
                }).catch(() => {
                    console.log('取消了');
                });
                
            },
            addSubmit(type) {
                let arrayData = [];
                // if (!this.formData.isShowCenter) this.formData.isShowCenter = false;
                if (this.paperModeOne) arrayData.push('lianxi');
                if (this.paperModeTwo) arrayData.push('kaoshi');
                this.formData.paperMode = arrayData.toString();
                this.$refs.ruleForm.validate((validate) => {
                    if (validate) {
                        if (type) {
                            this.$api.classificationManage.addClassify(this.formData).then(res => {
                                if (res.code == 0) {
                                    if (res.code == 0) {
                                        this.loadData('新增成功');
                                    }else {
                                        this.$message.error('新增失败,请重试!');
                                    }
                                }
                            });
                        } else {
                            this.$api.classificationManage.updateClassify(this.formData).then(res => {
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
            this.$emit('getMeteData', this.$Bre.breadCrumbs([0, 5, 52]));
        },
        mounted() {
            // 院校
            this.$api.common.schoolsList({}).then(res => {
                if (res.code == 0) this.schoolList = res.data;
            });
            // 专业课
            this.$api.studyManage.getSpecialtyList({}).then(res => {
                if (res.code == 0) this.specialtyList = res.data;
            });
        }
    };
</script>

<style lang="scss" scoped>
.examinationClassify {
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
