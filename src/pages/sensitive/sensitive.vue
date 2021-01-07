<!--专业课-->
<template>
    <div class="professionalManage">
        <base-list ref="demoTable" :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true">
            <el-table slot="list" :data="demoList" stripe border>
                <el-table-column type="index" align="center" label="#" width="70px"></el-table-column>
                <el-table-column prop="schoolName" align="center" label="学生姓名"></el-table-column>
                <el-table-column prop="majorName" align="center" label="手机号码"></el-table-column>
                <el-table-column prop="teacherName" align="center" label="文字内容"></el-table-column>
                <el-table-column prop="specialtyName" align="center" label="可能触线维度"></el-table-column>
                <el-table-column prop="credit" align="center" label="时间"></el-table-column>
                <el-table-column prop="period" align="center" label="操作"></el-table-column>
            </el-table>
        </base-list>
    </div>
</template>

<script>
export default {
    name: "sensitive",
    data() {
        return {
            // table数组
            demoList: [],
            // 分页查询api接口
            pageSearch: this.$api.studyManage.getSpecialtyList,
        };
    },
    created() {
        this.$emit('getMeteData', this.$Bre.breadCrumbs([0, 12, 121]));
    },
    methods: {
        loadData() {
            this.$refs.demoTable.loadData();
        },
    },
};
</script>

<style lang="scss" scoped>
.record{
    width: 100%;
    border-bottom: 1px solid #EBEEF5;margin-bottom: 20px;
    .recordIndex{
        width: 100%;text-align: center;margin-bottom: 30px;
        span{font-size: 12px;color: #999}
        p{font-size: 24px;color: #333;margin-top: 3px}
    }
    .recordIndexBor{
        border-right: 1px solid #EBEEF5;
    }
}
.box {
    display: flex;
    align-items: center;
    justify-content: center;
    .span {
        color: #409dff;
        cursor: pointer;
        &:hover {
            opacity: 0.7;
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
</style>
