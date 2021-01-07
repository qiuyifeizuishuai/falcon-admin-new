<!--学院管理-->
<template>
    <div class="professionalManage">
        <base-list ref="demoTable" :condition="condition" :datas.sync="demoList" :pageSearch="pageSearch" :isPaging="true">
            <el-form style="float: right" :inline="true" :model="condition" class="search-form" slot="search" label-width="80px">
                <div>
                    <el-form-item>
                        <el-input style="width: 300px" clearable v-model="condition.conditionModel.schoolName" placeholder="院校名称/负责人"></el-input>
                    </el-form-item>
                    <el-button type="primary"  @click="loadData">搜索</el-button>
                    <el-button type="warning" icon="el-icon-plus" @click="addCollege">新增院校</el-button>
                </div>
            </el-form>

            <el-table slot="list" :data="demoList" stripe border>
                <el-table-column  align="center" label="ID" width="70px">
                    <template slot-scope="scope">{{scope.row.id}}</template>
                </el-table-column>
                <el-table-column  align="center" label="院校名称">
                    <template slot-scope="scope">{{ scope.row.schoolName }}</template>
                </el-table-column>
                <el-table-column  align="center" label="地区">
                    <template slot-scope="scope">{{ scope.row.provinceName }} / {{ scope.row.cityName }} / {{ scope.row.areaName }}</template>
                </el-table-column>
                <el-table-column  align="center" label="负责人">
                    <template slot-scope="scope">{{ scope.row.principal }}</template>
                </el-table-column>
                <el-table-column  align="center" label="联系电话">
                    <template slot-scope="scope">{{ scope.row.phone }}</template>
                </el-table-column>
                <el-table-column align="center" label="学校类型">
                    <template slot-scope="scope">{{ scope.row.type }}</template>
                </el-table-column>
                <el-table-column  align="center" label="院校性质">
                    <template   template slot-scope="scope">{{ scope.row.nature }}</template>
                </el-table-column>
                <el-table-column  align="center" label="激活状态">
                    <template slot-scope="scope">
                        <el-switch
                            v-model="scope.row.isPass"
                            active-color="#13ce66"
                            @change="changeSwitch(scope.row.isPass,scope.row.uuid)"
                            inactive-color="#ff4949">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column  align="center" label="创建时间">
                    <template slot-scope="scope">{{ scope.row.createTime }}</template>
                </el-table-column>
                <el-table-column  align="center" label="操作" >
                    <template slot-scope="scope">
                        <el-button type="text" @click="go('/addCollege',scope.row)">编辑/查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </base-list>
    </div>
</template>

<script>
    import { regionData } from "element-china-area-data";
    export default {
        name:'professionalManage',
        filters:{
            city(val){
                return val;
            }
        },
        data() {
            return {
                AddressOptions: regionData,
                // 查询条件
                condition:{
                    conditionModel:{

                    }
                },
                // table数组
                demoList:[],
                // 分页查询api接口
                pageSearch: this.$api.account.getCollegeManageList,

            };
        },
        created() {
            this.$emit('getMeteData', this.$Bre.breadCrumbs([0, 3, 31]));
        },
        methods: {
            changeSwitch(val, id){
                console.log(val);
                let data = {
                    uuid: id,
                    isPass: val,
                };
                this.$api.account.updateCollegeIspass(data).then(res=>{
                    console.log(res);
                    this.$message.success('修改成功');
                });
            },
            go(url, item){
                console.log(item.uuid);
                this.$router.push({path:url, query:{
                        id:item.uuid,
                        type:'edit'
                    }});

            },
            addCollege(){
                this.$router.push({path:'/addCollege', query:{
                    type:'add'
                    }});
            },
            loadData() {
                this.$refs.demoTable.loadData();
            },
        },
    };
</script>
