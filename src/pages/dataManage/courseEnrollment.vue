<!--考试报名费用-->
<template>
    <div class="applyCost">
        <div class="search-top">
            <div>
                <span>院校：</span>
                <el-select
                    @change="schoolChange"
                    v-model="form.collageUuid"
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
                <span>专业：</span>
                <el-select
                    v-model="form.majorUuid"
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
                <el-button type="primary" @click="handleSubmit">搜索</el-button>
                <el-button @click="handleReset">重置</el-button>
            </div>
        </div>
        <div class="center-search">
            <div style="flex: 1;width: 70%">
                <span>渠道：</span>
                <el-select v-model="form.value" clearable placeholder="请选择">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div style="flex: 2">
                <div class="block">
                    <span class="demonstration">时间：</span>
                    <el-date-picker
                        value-format="yyyy-MM-dd hh:mm:ss"
                        v-model="form.timer"
                        type="daterange"
                        @change="isGetTime"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </div>
            </div>
        </div>
        <div>
            <div class="title">
                <div>总金额:￥{{amount}}</div>
                <div style="width: 400px">
                    <el-input
                        placeholder="请输入考试名称/课程名称搜索"
                        v-model="q"
                        suffix-icon="el-icon-search"
                        @input="handleBlur">
                    </el-input>
                </div>
            </div>
            <el-table
                :data="tableData"
                align="center"
                :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                style="width: 100%">
                <el-table-column
                    label="#"
                    type="index"
                >
                </el-table-column>
                <el-table-column
                    prop="user_name"
                    label="报考学员"
                >
                </el-table-column>
                <el-table-column
                    prop="examName"
                    label="考试名称">
                    <template v-slot="scoped">
                        {{scoped.row.goods[0].goods_name}}
                    </template>
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
                    <template v-slot="scoped">
                        {{scoped.row.goods[0].course_name}}
                    </template>
                </el-table-column>
                <el-table-column
                    sortable
                    prop="total_amount"
                    label="缴费金额"
                >
                </el-table-column>
                <el-table-column
                    prop="payment_channels"
                    label="缴费渠道"
                >
                </el-table-column>
                <el-table-column
                    prop="created_at"
                    sortable
                    label="支付时间"
                >
                    <template v-slot="scoped">
                        {{scoped.row.created_at | timer}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="缴费凭证">
                    <template v-slot="scoped">
                        <el-button type="text" v-if="scoped.row.payment_voucher" @click="handleExamine(scoped.row)">查看凭证</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block" style="text-align: right;margin: 20px 0">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage3"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="perPage"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
        </div>
        <el-dialog
            title="图片"
            :visible.sync="dialogVisible">
            <el-carousel  :loop="false">
                <el-image v-for="(item,index) in imgList" :key="index" :src="item" fit="cover" :preview-src-list="imgList" />
            </el-carousel>
        </el-dialog>
    </div>
</template>

<script>
    import {mapState, mapActions} from "vuex";
    import { getOrderForm} from "../../services/api/courseEnrollment";
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
                // 总数
                total: 0,
                //  开始页
                start: 1,
                //  一页显示多少条
                perPage: 10,
                //  当前的页数
                currentPage3:1,
                //  考试名称与课程名称是搜索
                q:"",
                tableData: [],
                options: [{
                    value: '支付宝支付',
                    label: '支付宝'
                }, {
                    value:"微信支付",
                    label: "微信"
                }, {
                   value: "银行卡支付",
                   label: "银行卡"
                }],
                //  支付方式
                form: {
                    majorUuid:"",
                    collageUuid:"",
                    value:"",
                    timer:[]
                },
                //  总金额
                amount:0,
                //  凭证列表
                imgList:[],
                dialogVisible: false,
                timer:null
            };
        },
        created() {
            this.$emit('getMeteData', this.$Bre.breadCrumbs([0, 8, 81]));
            this.getSchoolListAction();
            this.getData();
        },
        methods: {
            ...mapActions("school", [
                "getSchoolListAction",
                "getMajorListAction",
                "getStudyManageAction",
                "getGradeListAction"
            ]),
            isGetTime(val) {
                this.form.timer = val;
            },
            // 页面跳转
            jump(name, id) {
                this.$router.push({
                    name: name,
                    query: {
                        id: id,
                    },
                });
            },
            //  分页事件
            handleCurrentChange(val) {
                this.start = val;
                this.getData();
            },
            //  每页显示多少条
            handleSizeChange(val) {
                this.perPage = val;
                this.getData();
            },
            // 院校改变
            schoolChange(val) {
                this.majorUuid = "";
                this.getMajorListAction({
                    schoolUuid: val,
                });
            },
            //  搜索框失去焦点事件
            handleBlur() {
                if (this.timer) clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this.currentPage3 = 1;
                    this.start = 1;
                    let data = {
                        //  专业uuid
                        specialty: null,
                        //  学校的uuid
                        school: null,
                        //  开始时间
                        createdatgte: null,
                        //  结束时间
                        createdatlte: null,
                        //  支付方式
                        paymentchannels: null,
                        q: this.q ? this.q : null,
                        perPage: this.perPage,
                        start: this.start
                    };
                    getOrderForm(data).then(res => {
                        if (res.code === 0) {
                            this.tableData = res.data;
                            this.total = res.total;
                        } else {
                            this.$message.error("获取数据失败");
                        }
                    });
                    this.getData();
                }, 500);
            },
            //  提交
            handleSubmit() {
                this.currentPage3 = 1;
                this.start = 1;
                this.getData();
            },
            //  查看凭证
            handleExamine(value) {
                // this.imgList = value.payment_voucher.split(",").map(value => {
                //    return value.substr(0, 4) + ":" + value.substr(4);
                //     // return value;
                // });
                this.imgList = value.payment_voucher.split(",");
                // console.log(this.imgList);
                this.dialogVisible = true;
            },
            //  重置
            handleReset() {
                Object.keys(this.form).forEach(value => {
                    // console.log(value);
                    if (value === "timer") {
                        this.form[value] = [];
                    } else {
                        this.form[value] = "";
                    }
                });
            },
            //  获取列表数据
            getData() {
                let that = this.form;
                let data = {
                    //  专业uuid
                    specialty: that.majorUuid ? that.majorUuid : "",
                    //  学校的uuid
                    school: that.collageUuid ? that.collageUuid : "",
                    //  开始时间
                    createdatgte: that.timer ? that.timer[0] ? that.timer[0] : "" : "",
                    //  结束时间
                    createdatlte: that.timer ? that.timer[1] ? that.timer[1] : "" : "",
                    //  支付方式
                    paymentchannels: that.value ? that.value : "",
                    q: this.q ? this.q : "",
                    perPage:this.perPage,
                    start:this.start,
                    status:"paid"
                };
                //  获取表单数据
                getOrderForm(data).then(res => {
                    if (res.code === 0) {
                        console.log(res);
                        this.tableData = res.data;
                        this.total = res.total;
                        this.amount = res.amount;
                    } else {
                        this.$message.error("获取数据失败");
                    }
                });
            }
        },
        //  时间过滤器
        filters: {
            timer: function (val) {
                let time = val.split("-");
                let date = time[2].split("T");
                // let hours = date[1].split(":");
                return time[0] + "-" + time[1] + "-" + date[0];
            }
        }
    };
</script>

<style lang="scss" scoped>
    .search-top {
        display: flex;

        div {
            margin-right: 10px;
            flex: 1;
            width: 70%;
        }
    }

    .link {
        cursor: pointer;
        display: inline-block;
        margin-right: 10px;
    }
    .applyCost {
        //padding-bottom: 30px;
        /deep/
        .el-date-editor--daterange.el-input__inner {
            width: 50%;
        }
        .center-search {
            display: flex;
            align-items: center;
            margin: 20px 0;
            .el-select {
                width: 70%;
            }
        }
        .title {
            display: flex;
            justify-content: space-between;
            margin: 10px 0;
            align-items: center;
            .el-input {
                /*width: 200%;*/
            }
        }
        ///deep/
        //.el-carousel__container {
        //    height: 100vh;
        //}
    }
</style>
