<!--平台公告-->
<template>
    <div class="platformNotice">
        <base-list ref="demoTable" :condition="condition" :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true">
            <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
                <el-button class="fr m-b-20" type="success" icon="el-icon-plus" @click="dialogVisible=true">更新版本</el-button>
            </el-form>
            <el-table slot="list" :data="demoList" stripe border>
                <el-table-column align="center" label="#" width="80">
                    <template slot-scope="scope">{{scope.$index+1}}</template>
                </el-table-column>
                <el-table-column prop="noticeTitle" align="center" label="版本号">
                    <template slot-scope="scope">{{ scope.row.version_code }}</template>
                </el-table-column>
                <el-table-column prop="createTime" align="center" label="更新说明">
                    <template slot-scope="scope">{{ scope.row.content }}</template>
                </el-table-column>
                <el-table-column prop="noticeSortNum" align="center" label="强制更新">
                    <template   template slot-scope="scope">{{ scope.row.is_update? '是' : '否' }}</template>
                </el-table-column>
                <el-table-column prop="noticeSortNum" align="center" label="更新人">
                    <template   template slot-scope="scope">{{ scope.row.operator }}</template>
                </el-table-column>
                <el-table-column prop="noticeSortNum" align="center" label="更新时间">
                    <template   template slot-scope="scope">{{ dateFormat("YYYY-mm-dd HH:MM", scope.row.created_at) }}</template>
                </el-table-column>
                <el-table-column align="center" label="操作" width="120">
                    <template slot-scope="scope" >
                        <span class="span" @click="isDel(scope.row.id)">删除</span>
                    </template>
                </el-table-column>
            </el-table>
        </base-list>
        <div class="dialog">
            <el-dialog
                title="更新版本"
                :visible.sync="dialogVisible"
                width="40%"
            >
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="版本号" prop="versionCode">
                        <el-input v-model="ruleForm.versionCode" placeholder="请输入版本号"></el-input>
                    </el-form-item>
                    <el-form-item label="更新说明" prop="content">
                        <el-input type="textarea" placeholder="请输入" v-model="ruleForm.content"></el-input>
                    </el-form-item>
                    <el-form-item label="强制更新" prop="isUpdate">
                        <el-radio-group v-model="ruleForm.isUpdate">
                            <el-radio label="false">否</el-radio>
                            <el-radio label="true">是</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="更新包" prop="file">
                        <el-upload
                            class="upload-demo"
                            action="/api/exam/upload/uploadFiles"
                            :on-success="handSuccess"
                            :limit="1">
                            <el-button size="small" icon="el-icon-download">上传文件</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="dialogVisible = false">取消</el-button>
                        <el-button type="primary"  @click="submitForm('ruleForm')">确定</el-button>

                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>

<script>
export default {
    name:'version',
    data() {
        return {
            dialogVisible: false,
            // 查询条件
            condition:{
                conditionModel:{}
            },
            // table数组
            demoList:[],
            // 分页查询api接口
            pageSearch: this.$api.upload.versionList,
            ruleForm: {
                versionCode: '',
                isUpdate: 'false',
                content: '',
                file: ''
            },
            rules: {
                versionCode: [
                    { required: true, message: '请输入版本号', trigger: 'blur' },
                ],
                isUpdate: [
                    { required: true, message: '请选择更新说明', trigger: 'change' }
                ],
                file: [
                    { required: true, message: '请上传更新包', trigger: 'change' }
                ],
                content: [
                    { required: true, message: '请填写活动形式', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
         submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let dataInfo = {
                        'version_code': this.ruleForm.versionCode,
                        content: this.ruleForm.content,
                        'is_update': this.ruleForm.isUpdate,
                        file: this.ruleForm.file,
                    };
                    this.$api.upload.versionAdd(dataInfo).then(res => {
                        console.log(res);
                        if(res.code === 0) {
                            this.$message.success('添加成功');
                            this.dialogVisible = false;
                            this.$refs.demoTable.loadData();
                            return;
                        }
                        this.$message.error('添加失败');
                    });
                }
            });
        },
        isDel(id) {
             const than = this;
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                than.loadDataDle(id);
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        loadDataDle(id) {
            this.$api.upload.deleteVersion(id).then(res => {
                if(res.code === 0) {
                    this.$refs.demoTable.loadData();
                }
            });
        },
        handSuccess(file) {
            console.log(file);
            this.ruleForm.file = file.data[0];
        },
        dateFormat(fmt, date) {
            let dateTime = new Date(date);
            let ret;
            const opt = {
                "Y+": dateTime.getFullYear().toString(),        // 年
                "m+": (dateTime.getMonth() + 1).toString(),     // 月
                "d+": dateTime.getDate().toString(),            // 日
                "H+": dateTime.getHours().toString(),           // 时
                "M+": dateTime.getMinutes().toString(),         // 分
                "S+": dateTime.getSeconds().toString()          // 秒
                // 有其他格式化字符需求可以继续添加，必须转化成字符串
            };
            for (let k in opt) {
                ret = new RegExp("(" + k + ")").exec(fmt);
                if (ret) {
                    fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")));
                }
            }
            return fmt;
        }
    },
    created() {
        this.$emit('getMeteData', this.$Bre.breadCrumbs([0, 9]));
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
.base-list .search-form{display: flex !important;}
</style>

