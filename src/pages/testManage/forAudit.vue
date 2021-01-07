<!--真人审核-->
<template>
    <div>
        <div class="flex">
            <el-input class="w350" v-model="studentName" placeholder="请输入审核学生名字搜索"></el-input>
            <el-button type="primary" @click="getList(),start=1">搜索</el-button>
        </div>
        <div>
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="id"
                    label="学号"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="studentName"
                    label="审核学生"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="examName"
                    label="考试名称">
                </el-table-column>
                <el-table-column
                    prop="createDate"
                    label="申请时间">
                </el-table-column>
                <el-table-column
                    label="审核状态">
                    <template slot-scope="scope">
                        {{scope.row.state | state}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope" >
                        <el-button type="text" :disabled="!(scope.row.state==1)"  @click="checkName(scope.row)">查看并审核</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog
            title="审核"
            :visible.sync="dialogVisible"
            width="40%"
        >
            <div>
                <p>学员身份证：</p>
                <div style="margin-bottom: 30px">
                    <img :src="frontCardImg" style="width: 50%;border-radius: 20px" alt="">
                </div>
            </div>
            <div>
                <p>学员抓拍照片：</p>
                <div>
                    <img v-for="(item, index) in imgs" :src="item" :key="index" style="width: 33%;padding: 5px;border-radius: 20px" alt="">
                </div>
            </div>
            <div>
                <p>通过或拒绝理由</p>
                <div>
                    <el-input v-model="phone" class="w350" style="margin-bottom: 10px" placeholder="联系电话 (可能后续学员会打电话询问审核结果)"></el-input>
                    <el-input
                        type="textarea"
                        :rows="10"
                        placeholder="请输入内容通过或拒绝理由"
                        v-model="reason">
                    </el-input>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                 <el-button @click="dialogVisible = false">取 消</el-button>
                 <el-button type="success" @click="checkForm(0)">通过</el-button>
                <el-button type="danger" @click="checkForm(2)">拒绝</el-button>
            </span>
        </el-dialog>
        <div class="block flex">
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="start"
                :page-size="perPage"
                layout="total, prev, pager, next"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                total: 0,
                dialogVisible: false,
                tableData: [],
                start: 1,
                phone: '',
                uuid: '',
                reason: null,
                perPage: 15,
                studentName: '',
                // dialog
                frontCardImg: '', // 身份证照片
                imgs: '', // 图片组
            };
        },
        filters: {
            state(val) {
                if (val == 0) {
                    return '审核通过';
                } else if (val == 1) {
                    return '待审核';
                } else if (val == 2) {
                    return '审核失败';
                } else {
                    return '状态异常';
                }
            }
        },
        created() {
            this.$emit('getMeteData', this.$Bre.breadCrumbs([0, 12, 65]));
        },
        mounted() {
            this.getList();
        },
        methods: {
            checkForm(result) {
                if(this.reason){
                    let data = {
                        phone:this.phone,
                        remark:this.reason,
                        state:result
                    };
                    this.$api.testManage.checkSubmit(this.uuid, data).then(res => {
                        console.log(res);
                        this.dialogVisible = false;
                        this.$message.success('操作成功');
                        this.getList();
                    });
                }else{
                    this.$message.warning('请填写审核通过/审核失败的理由');
                }
                console.log(result);

            },
            checkName(row) {
                this.uuid = row.uuid;
                this.dialogVisible = true;
                this.frontCardImg = row.frontCardImg;
                this.imgs = row.imgs.split(",");
                console.log(this.imgs);
            },
            getList() {
                let data = {
                    start: this.start,
                    perPage: this.perPage,
                    studentName: this.studentName
                };
                this.$api.testManage.realCheck(data).then(res => {
                    console.log(res);
                    this.tableData = res.data.records;
                    this.total = res.data.total;
                });
            },
            handleCurrentChange(val) {
                this.start = val;
                this.getList();
            }
        }
    };
</script>

<style scoped>
    p {
        font-weight: bold;
        font-size: 18px;
    }

    .flex {
        display: flex;
        justify-content: flex-end;
    }

    .w350 {
        width: 350px;
        margin-right: 10px;
    }
</style>
