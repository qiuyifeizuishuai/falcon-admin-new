<template>
    <div>
        <el-button v-if="typeNumber === 2" class="mar20 fr" type="success" @click="downloadTemplate">下载进度</el-button>
        <el-button v-if="typeNumber === 3" type="success" @click="downloadTemplate">下载成绩</el-button>
        <el-button v-if="typeNumber === 1" type="primary" plain @click="downloadTemplate">下载模版</el-button>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        props:{
            types: String,
            datas: {},
            typeNumber: {
                type: Number,
                default: 1
            }
        },
        data(){
            return{};
        },
        methods:{
           async downloadTemplate(){
               try {
                   let res = '';
                   let rou = this.$route.path;
                   if(this.types === 'topic' && rou === '/homeworkPractice') {
                       res = await axios.get('/api/user/down/export-template?type='+this.types+'&topicType=zuo_ye', {
                           responseType: "blob"
                       });
                   }else if(this.types === 'progress') {
                       let datas = this.datas;
                       res = await axios.get(`/api/course/down/down-study-records?ceilingSchedule=${datas.ceilingSchedule}&classUuid=${datas.classUuid}&collegeUuid=${datas.collegeUuid}&floorSchedule=${datas.floorSchedule}&majorUuid=${datas.majorUuid}&searchName=${datas.searchName}`, {
                           responseType: "blob"
                       });
                   }else if(this.types === 'results') {
                       let datas = this.datas;
                       if(datas.specialtyUuids.length === 0) datas.specialtyUuids = '';
                       res = await axios.get(`/api/exam/upload/batch-down-student-scores?gradeUuid=${datas.gradeUuid}&schoolUuid=${datas.schoolUuid}&specialtyUuids=${datas.specialtyUuids}&majorUuid=${datas.majorUuid}&searchName=${datas.searchName}`, {
                           responseType: "blob"
                       });
                   }  else {
                       res = await axios.get('/api/user/down/export-template?type='+this.types, {
                           responseType: "blob"
                       });
                   }
                   let blob = res;
                   const url = window.URL.createObjectURL(blob);
                   const link = document.createElement("a");
                   link.href = url;
                   let fileName = '';
                   if(this.types == 'topic'){
                       fileName = '题目上传模版表格.xlsx';
                   }else if(this.types == 'student'){
                       fileName = '学生上传模版表格.xlsx';
                   }else if(this.types === 'progress') {
                       fileName = '学生进度表格.xlsx';
                   }else if(this.types === 'results') {
                       fileName = '学生成绩表格.xlsx';
                   }else {
                       fileName = '老师上传模版表格.xlsx';
                   }
                   link.download = fileName;
                   document.body.appendChild(link);
                   link.click();
                   document.body.removeChild(link);
               }catch (e) {
                   console.log(e);
               }
            }
        }
    };
</script>

<style scoped>

</style>
