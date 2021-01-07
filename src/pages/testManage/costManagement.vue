<!--线下缴费管理-费用管理-->
<template>
    <div style="padding-bottom: 30px;margin-top: 10px">
        <div class="search-top">
            <div>
                <el-select
                    @change="schoolChange"
                    v-model="collageUuid"
                    placeholder="请选择院校"
                    clearable
                >
                    <el-option
                        v-for="item in schoolLists"
                        :key="item.uuid"
                        :label="item.schoolName"
                        :value="item.uuid"
                    ></el-option>
                </el-select>
            </div>
            <div>
                <el-select
                    @change="majorChange"
                    v-model="majorUuid"
                    placeholder="请选择专业"
                    clearable
                >
                    <el-option
                        v-for="item in majorLists"
                        :key="item.uuid"
                        :label="item.majorName"
                        :value="item.uuid"
                    ></el-option>
                </el-select>
            </div>
            <div>
                <el-input
                    style="width: 300px"
                    v-model="search"
                    placeholder="输入考试名称/课程名称"
                ></el-input>
            </div>
            <el-button type="primary" @click="getList(),start = 1">搜索</el-button>

        </div>
        <div>
            <el-table
                :data="tableData"
                align="center"
                style="width: 100%">
                <el-table-column
                    label="#"
                    width="80">
                    <template slot-scope="row">
                        {{row.$index+1}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="user_name"
                    label="报名学员">
                </el-table-column>
                <el-table-column
                    prop="school_name"
                    label="院校">
                </el-table-column>
                <el-table-column
                    prop="specialty_name"
                    label="专业">
                </el-table-column>
                <el-table-column
                    label="课程名称">
                    <template slot-scope="row">
                        <div v-for="(item, index) in row.row.goods" :key="index">
                            {{item.course_name}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="考试名称">
                    <template slot-scope="row">
                        <div v-for="(item, index) in row.row.goods" :key="index">
                            {{item.goods_name}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="total_amount"
                    label="应缴金额（元）">
                </el-table-column>
                <el-table-column
                    label="审核状态">
                    <template slot-scope="row">
                        {{row.row.status |statusFormat}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="报名时间">
                    <template slot-scope="row">
                        {{row.row.created_at |createdFormat}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="row">
                        <el-button v-if="row.row.status=='unpaid'" type="text"  @click="openCheckDialog(row.row)" >审核</el-button>
                        <el-button v-else type="text"  @click="openImgDialog(row.row)" >查看凭证</el-button>
                    </template>
                </el-table-column>

            </el-table>
            <div class="prw">
                <el-dialog
                    style="height: 800px"
                    title="查看图片"
                    :visible.sync="viewImgsDialog"
                >
                    <el-carousel type="card" :loop="false" :interval="99999999" style="align-items: center">
                        <el-image
                            fit="contain"
                            style="width: 100%;height:100%;border-radius: 20px;"
                            v-for="item in imgList" :key="item"
                            :src="item"
                            :preview-src-list="imgList">
                            <div slot="error" class="image-slot"></div>
                        </el-image>
                    </el-carousel>
                </el-dialog>

            </div>
            <div>
                <el-dialog
                    title="请确认通过审核"
                    center
                    :visible.sync="realCheckdialog"
                    width="30%"
                >
                    <div>
                        <p class="flex-center"><b>考试名称:</b><span v-for="(item, index) in dialogData.goods" :key="index">
                        {{item.goods_name}}
                    </span> </p>
                        <p class="flex-center"><b>报名学员: </b>{{dialogData.user_name}} </p>
                        <p class="flex-center"><b>应缴金额: </b>{{dialogData.total_amount}}元 </p>
                        <p class="flex-center"><b>缴费凭证:</b></p>
                        <img v-for="(item, index) in dialogData.imgList" :src="item" class="imgList" @click="viewImgsDialog=true,imgList=dialogData.imgList" :key="index">
                    </div>
                    <span slot="footer" class="dialog-footer">
                    <el-button type="success" @click="check(true)">通 过</el-button>
                    <el-button type="danger" @click="realCheckdialog=false,refuseDialog=true">拒 绝</el-button>
                  </span>
                </el-dialog>
            </div>
            <div>
                <el-dialog
                    title="拒绝审核"
                    center
                    :visible.sync="refuseDialog"
                    width="30%"
                >
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 3, maxRows: 6}"
                        placeholder="请输入内容"
                        v-model="dialogData.remark">
                    </el-input>
                    <span slot="footer" class="dialog-footer">
                    <el-button  @click="refuseDialog=false">取 消</el-button>
                    <el-button type="danger" @click="check(false)">确 认</el-button>
                  </span>
                </el-dialog>
            </div>
            <div class="block" style="float: right">
                <el-pagination
                    layout="prev, pager, next, total"
                    :page-size="perPage"
                    @current-change="handleCurrentChange"
                    :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapState, mapActions} from "vuex";

    export default {
        name: "OnlineTest",
        computed: {
            // 院校,专业,课程
            ...mapState("school", {
                schoolLists: (state) => state.schoolLists,
                majorLists: (state) => state.majorLists,
                specialtyLists: (state) => state.specialtyLists,
            }),
        },
        data() {
            return {
                orderId:'',
                imgList:[],
                dialogData:{},
                viewImgsDialog:false,
                refuseDialog:false,
                realCheckdialog:false,
                //面包屑
                majorUuid: '',
                search: '',
                collageUuid: '',
                // table
                total: 0,
                start: 1,
                perPage: 10,
                tableData: [],
            };
        },
        created() {
            this.$emit('getMeteData', this.$Bre.breadCrumbs([0, 12, 66]));
            this.getSchoolListAction();
        },
        filters: {
            statusFormat(val){
              if(val=='close'){
                  return '审核已拒绝';
              }else if(val=='unpaid'){
                  return '待审核';
              }else{
                  return '审核已通过';
              }
            },
            createdFormat(val) {
                return val.split('T')[0];
            }
        },
        mounted() {
            this.getList();
        },
        methods: {
            ...mapActions("school", [
                "getSchoolListAction",
                "getMajorListAction",
                "getStudyManageAction",
            ]),
            openImgDialog(row){
                if(row.payment_voucher){
                    this.imgList =  row.payment_voucher.split(',');
                    this.viewImgsDialog= true;
                }else{
                    this.$message.error('没有凭证可查看');
                }
            },
            openCheckDialog(row){
                this.realCheckdialog= true;
                this.orderId=row.order_id;
                this.dialogData = row;
                let imgList = row.payment_voucher.split(',');
                console.log(imgList);
                this.dialogData.imgList = imgList;
            },
            check(status){
                console.log(status);
                let data = {
                    // eslint-disable-next-line camelcase
                    order_id:this.dialogData.trade_no,
                    operate:status,
                    remark:'',
                };
                if(!status){
                    data.remark = this.dialogData.remark;
                }
                this.$api.testManage.checkExamPost(data).then(res=>{
                   console.log(res);
                   if(status){
                       this.$message.success('已通过审核');
                       this.getList();
                       this.realCheckdialog = false;
                   }else{
                       this.$message.success('已拒绝审核');
                       this.getList();
                       this.refuseDialog = false;
                   }

                });
            },
            getList() {
                console.log(this.$data);
                let data = {
                    start: this.start,
                    perPage: this.perPage,
                    specialty: this.majorUuid,
                    q: this.search,
                    // eslint-disable-next-line camelcase
                    payment_channels: '银行卡支付',
                    school: this.collageUuid
                };
                this.$api.testManage.getAllOrder(data).then(res => {
                    console.log(res.data);
                    this.total = res.total;
                    this.tableData = res.data;
                });
            },
            handleCurrentChange(val) {
                this.start = val;
                this.getList();
            },
            // 院校改变
            schoolChange(val) {
                this.majorUuid = "";
                this.getMajorListAction({
                    schoolUuid: val,
                });
                this.start = 1;
                this.getList();

            },
            // 专业改变
            majorChange() {
                this.start = 1;
                this.getList();
            },
        },
    };
</script>

<style lang="scss" scoped>
    .search-top {
        display: flex;

        div {
            margin-right: 10px;
        }
    }
    .imgList{
        padding: 6px;
        border-radius: 6px;
        width: 50px;
    }
    .flex-center{
       margin-left: 25%;
    }
    .link {
        cursor: pointer;
        display: inline-block;
        margin-right: 10px;
    }
</style>
