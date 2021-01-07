
<!-- 新增公告 -->
<template>
  <div class="addExamination">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
        <el-form-item label="公告标题" prop="noticeTitle">
            <el-input type="text" placeholder="请输入公告标题" v-model="ruleForm.noticeTitle" class="w800px" clearable></el-input>
        </el-form-item>
        <el-form-item label="公告内容" prop="noticeContent">
            <vue-editor class="w800px" v-model="ruleForm.noticeContent" :editor-toolbar="customToolbar"></vue-editor>
        </el-form-item>
        <el-form-item label="排序权重值" prop="noticeSortNum">
            <el-input type="number" oninput = "if(value<=0) value=1" placeholder="请输入排序权重值" v-model="ruleForm.noticeSortNum" class="w800px"></el-input>
        </el-form-item>
        <el-form-item label="公告标签">
            <el-checkbox v-model="ruleForm.isNewNotice" :label="true">最新公告</el-checkbox>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submit">{{isAdded == 'see' ? '修改' : '新增'}}</el-button>
            <el-button @click="$router.go(-1)">取消</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
    name:'addExamination',
    data(){
        return{
            ruleForm:{
                uuid:this.$route.query.uuid,
                isNewNotice:false
            },
            rules:{
                noticeTitle: [{ required: true, message: '请输入公告标题', trigger: 'blur' }],
                noticeContent: [{ required: true, message: '请输入公告内容', trigger: 'blur' }],
                noticeSortNum: [{ required: true, message: '请输入排序权重值', trigger: 'blur' }],
            },
            isAdded: this.$route.query.isAdded,
            customToolbar: [
                ['bold', 'italic', 'underline'],
                [{'list': 'ordered'}, {'list': 'bullet'}],
                [{'indent': '-""'}, {'indent': '+""'}],
                [{'header': '2'}], ['clean'], [{'align': 'center'}, {'align': 'justify'}, {'align': 'right'}]
            ]
        };
    },
    methods:{
        submit() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                if (this.isAdded == 'use') {
                    console.log(this.ruleForm);
                    this.$api.message.addPlatformNotice(this.ruleForm).then(res => {
                        if (res.code == 0) {
                            this.$message({
                                message:'添加成功',
                                type:'success',
                                duration:1500,
                                onClose:() => {
                                    this.$router.go(-1);
                                }
                            });
                        }else {
                            this.$message.error('添加失败,请重试!');
                        }
                    }).catch(error=>{
                        this.$message.error(error);
                    });
                } else {
                    this.$api.message.updatePlatformNotice(this.ruleForm).then(res => {
                        if (res.code == 0) {
                            this.$message({
                                message:'修改成功',
                                type:'success',
                                duration:1500,
                                onClose:() => {
                                    this.$router.go(-1);
                                }
                            });
                        }else {
                            this.$message.error('修改失败,请重试!');
                        }
                    }).catch(error=>{
                        this.$message.error(error);
                    });
                }
                } else {
                return false;
                }
            });
        },
    },
    created() {
        let typeName = this.$route.query.isAdded === 'see'? '编辑/查看公告' : '新增公告';
        this.$emit('getMeteData', this.$Bre.breadCrumbs([0, 7, 72]), typeName);
    },
    mounted() {
        if (this.isAdded == 'see') {
            this.$api.message.selectPlatformNotice(this.$route.query.uuid).then(res => {
                if (res.code == 0) this.ruleForm = res.data;
            });
        }
    }
};
</script>
