<!--平台公告-->
<template>
  <div class="platformNotice">
    <base-list ref="demoTable" :condition="condition" :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true">
        <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
            <el-button class="fr" type="success" icon="el-icon-plus" @click="$router.push({name:'addPlatform',query:{isAdded:'use'}})">新增公告</el-button>
            <el-button class="fr mar20" type="primary"  @click="loadData">搜索</el-button>
            <el-form-item class="fr">
                <el-input v-model="condition.conditionModel.noticeTitle" placeholder="请输入公告标题" clearable />
            </el-form-item>
        </el-form>

        <el-table slot="list" :data="demoList" stripe border>
            <el-table-column align="center" label="序号" width="80"> 
                <template slot-scope="scope">{{scope.$index+1}}</template>
            </el-table-column>
            <el-table-column prop="noticeTitle" align="center" label="公告标题">
                <template slot-scope="scope">{{ scope.row.noticeTitle }}</template>
            </el-table-column>
            <el-table-column prop="createTime" align="center" label="发布时间">
                <template slot-scope="scope">{{ scope.row.createTime }}</template>
            </el-table-column>
            <el-table-column prop="noticeSortNum" align="center" label="排序权重" sortable>
                <template   template slot-scope="scope">{{ scope.row.noticeSortNum }}</template>
            </el-table-column>
            <el-table-column align="center" label="状态">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.isOnline" @change="isPass(scope.row.uuid)" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
				</template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="120">
                <template slot-scope="scope">
					<span class="span" @click="$router.push({name:'addPlatform',query:{uuid:scope.row.uuid,isAdded:'see'}})">编辑/查看</span>
				</template>
            </el-table-column>
        </el-table>
    </base-list>
  </div>
</template>

<script>
export default {
    name:'platformNotice',
    data() {
        return {
            // 查询条件
            condition:{
                conditionModel:{}
            },
            // table数组
            demoList:[],
            // 分页查询api接口
            pageSearch: this.$api.message.platformNoticeList,
        };
    },
	methods: {
		loadData() {
            this.$refs.demoTable.loadData();
		},
        isPass(Id) {
            this.$api.message.updatePlatformStatus(Id).then(res => {
                // if (res.code == 0) this.$message.success('操作成功!');
                console.log(res);
                // this.loadData();
            });
        }
    },
    created() {
        this.$emit('getMeteData', this.$Bre.breadCrumbs([0, 7, 72]));
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
</style>

