<!-- 专业管理 -->
<template>
  <div class="professionalManage">
    <base-list ref="demoTable" :condition="condition" :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true">
        <el-form :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
            <el-form-item>
                <el-select v-model="condition.conditionModel.schoolUuid" placeholder="请选择院校" filterable clearable>
                    <el-option v-for="item in schoolList" :key="item.uuid" :label="item.schoolName" :value="item.uuid"></el-option>
                </el-select>
            </el-form-item>
            <el-button class="fr" type="success" icon="el-icon-plus" @click="$router.push({name:'addProfessional',query:{isAdded:'use'}})">新增专业</el-button>
            <el-button class="fr mar20" type="primary"  @click="loadData">搜索</el-button>
            <el-form-item class="fr">
                <el-input v-model="condition.conditionModel.majorName" placeholder="请输入专业名称" clearable />
            </el-form-item>
        </el-form>

        <el-table slot="list" :data="demoList" stripe border>
            <el-table-column prop="schoolUuid" align="center" label="ID" width="70px">
                <template slot-scope="scope">{{ scope.row.id }}</template>
            </el-table-column>
            <el-table-column prop="created_at" align="center" label="院校">
                <template slot-scope="scope">{{ scope.row.schoolName }}</template>
            </el-table-column>
            <el-table-column prop="specialtyName" align="center" label="专业名称">
                <template   template slot-scope="scope">{{ scope.row.majorName }}</template>
            </el-table-column>
<!--            <el-table-column prop="credit" align="center" label="毕业学分要求">-->
<!--                <template slot-scope="row">-->
<!--                    {{row.row.credit | creditFotmat}}-->
<!--                </template>-->
<!--            </el-table-column>-->
            <el-table-column prop="level" align="center" label="层次">
            </el-table-column>
            <el-table-column prop="isPass" align="center" label="激活状态">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.isPass" @change="isPass(scope.row.uuid, scope.row.isPass)" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
				</template>
            </el-table-column>
            <el-table-column prop="createDate" align="center" label="创建时间">
                <template slot-scope="scope">{{ scope.row.createDate }}</template>
            </el-table-column>
            <el-table-column align="center" label="操作">
                <template slot-scope="scope">
					<span class="span" @click="$router.push({name:'addProfessional',query:{uuid:scope.row.uuid,isAdded:'see'}})">编辑/查看</span>
				</template>
            </el-table-column>
        </el-table>
    </base-list>
  </div>
</template>

<script>
export default {
    name:'professionalManage',
    data() {
        return {
            // 查询条件
            condition:{
                conditionModel:{}
            },
            // table数组
            demoList:[],
            // 分页查询api接口
            pageSearch: this.$api.common.majorList,
            ishodeen:false,
            schoolList:[]
        };
    },
    filters:{
        creditFotmat(val){
            if(val){
                return val;
            }else{
                return '暂无设置';
            }
        }
    },
	methods: {
		loadData() {
            this.$refs.demoTable.loadData();
		},
        isPass(Id, pass) {
            let params = {};
            params.uuid = Id;
            params.isPass = pass;
            this.$api.studyManage.updateMajor(params).then(res => {
                if (res.code == 0) this.$message.success('操作成功!');
            });
        }
    },
    created() {
        this.$emit('getMeteData', this.$Bre.breadCrumbs([0, 3, 32]));
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
.span {
	color: #409dff;
	cursor: pointer;
	&:hover {
		opacity: .7;
	}
}
</style>
