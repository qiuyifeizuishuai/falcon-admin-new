<!--班费管理-->
<template>
    <div class="professionalManage">
        <div style="display: flex;justify-content: space-between;align-items: center">
            <div class="col-xl-3 col-md-6">
                <div class="widget widget-stats bg-green">
                    <div class="stats-icon"><i class="fa fa-money-bill"></i></div>
                    <div class="stats-info">
                        <h4>余额（Balance）</h4>
                        <p>¥ {{balance}}</p>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-md-6">
                <div class="widget widget-stats bg-blue">
                    <div class="stats-icon"><i class="fa fa-money-bill"></i></div>
                    <div class="stats-info">
                        <h4>总收集（Total）</h4>
                        <p>¥ {{incometotal}}</p>
                    </div>
                </div>
            </div>

            <div class="col-xl-3 col-md-6">
                <div class="widget widget-stats bg-red">
                    <div class="stats-icon"><i class="fa fa-money-bill"></i></div>
                    <div class="stats-info">
                        <h4>总支出（Expend）</h4>
                        <p>¥ {{expendtotal}}</p>
                    </div>
                </div>
            </div>
            <div>
                <el-button type="primary" icon="el-icon-plus" @click="openDialog('expend')">班费支出</el-button>
                <el-button type="success" icon="el-icon-plus" @click="openDialog('collect')">班费收集</el-button>
            </div>
        </div>
        <base-list ref="demoTable" :condition="condition" :datas.sync="demoList" :pageSearch="pageSearch"
                   :isPaging="true">
            <el-form style="display: flex;justify-content: space-between" :inline="true" :model="condition"
                     class="search-form" slot="search" label-width="80px">
                <div>
                    <el-form-item>
                        <el-input v-model="condition.conditionModel.reasons" placeholder="输入相关事由"></el-input>
                    </el-form-item>
                    <el-button type="primary" @click="loadData">搜索</el-button>
                </div>
            </el-form>

            <el-table slot="list" :data="demoList" stripe border>
                <el-table-column prop="id" align="center" label="#" width="70px">
                    <template slot-scope="scope">{{scope.$index+1}}</template>
                </el-table-column>
                <el-table-column prop="created_at" align="center" label="班级">
                    <template slot-scope="scope">
                        <span v-for="(item, index) in scope.row.gradeName" :key="index">
                            {{item}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="created_at" align="center" label="时间">
                    <template template slot-scope="scope">
                        {{scope.row.createTime}}
                    </template>
                </el-table-column>
                <el-table-column prop="created_at" align="center" label="事由">
                    <template slot-scope="scope">{{ scope.row.reasons }}</template>
                </el-table-column>
                <el-table-column prop="created_at" align="center" label="金额(¥)">
                    <template slot-scope="scope">{{ scope.row.amount }}</template>
                </el-table-column>
                <el-table-column prop="created_at" align="center" label="班费余额(¥)">
                    <template slot-scope="scope">{{ scope.row.balance }}</template>
                </el-table-column>
                <el-table-column prop="created_at" align="center" label="备注">
                    <template slot-scope="scope">{{ scope.row.remark }}</template>
                </el-table-column>
                <el-table-column prop="created_at" align="center" label="凭证图片">
                    <template slot-scope="scope">
                        <el-button type="primary" v-if="scope.row.imagePaths"
                                   @click="openImgPreview(scope.row.imagePaths)">查看图片
                        </el-button>
                        <el-button type="text" v-else disabled>暂无图片</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </base-list>
        <div class="prw" v-if="view">
            <el-dialog
                style="height: 800px"
                title="查看图片"
                :visible.sync="view"
            >
                <el-carousel type="card" :interval="5000">
                    <el-image
                        fit="contain"
                        style="height: 200px;width: 200px;margin-right: 10px"
                        v-for="item in imgList" :key="item"
                        :src="item"
                        :preview-src-list="imgList">
                        <div slot="error" class="image-slot"></div>
                    </el-image>
                </el-carousel>
            </el-dialog>
        </div>
        <div class="dialog">
            <el-dialog
                :title="dialogTitle"
                :visible.sync="dialogVisible"
                width="40%"
            >
                <div class="dialogLayout">
                    <div>
                        <b>事由：</b>
                        <el-input style="width: 300px;" v-model="dialogData.reasons" placeholder="请输入事由"></el-input>
                    </div>
                    <div v-if="dialogTitle=='班费支出'">
                        <b>金额：</b>
                        <el-input style="width: 300px;margin-top: 20px"
                                  v-model="dialogData.expendAmount"
                                  type="number" oninput="if(value<=0) value=1"
                                  placeholder="请输入支出金额(元)"></el-input>
                    </div>
                    <div v-else>
                        <b>金额：</b>
                        <el-input style="width: 300px;margin-top: 20px" type="number" oninput="if(value<=0) value=1"
                                  v-model="dialogData.incomeAmount"
                                  placeholder="请输入收集金额(元)"></el-input>
                    </div>
                    <div>
                        <b>备注：</b>
                        <el-input style="width: 300px;margin-top: 20px" v-model="dialogData.remark"
                                  placeholder="请输入备注"></el-input>
                    </div>
                    <el-upload
                        style="margin-top: 20px"
                        class="upload-demo"
                        action="/api/exam/upload/uploadFiles"
                        :on-remove="handleRemove"
                        :on-progress="handleProgress"
                        :before-remove="beforeRemove"
                        :on-error="onError"
                        :on-change="handleChange"
                        :on-success="handSuccess"
                        :limit="99"
                        :file-list="fileList">
                        <el-button size="small" type="primary">点击上传图片凭证</el-button>
                    </el-upload>
                </div>

                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogSubmit">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loading: null,
                fileList: [],
                imgList: [],
                view: false,
                dialogData: {
                    gradeUuid: this.$route.query.id,
                    reasons: null,
                    incomeAmount: null,
                    expendAmount: null,
                    remark: null,
                    imagePaths: null
                },
                dialogTitle: '',
                dialogVisible: false,
                // 查询条件
                condition: {
                    conditionModel: {
                        collegeUuid: null,
                        majorUuid: null,
                        gradeUuid: this.$route.query.id
                    }
                },
                balance: 0,
                incometotal: 0,
                expendtotal: 0,
                // collegeOption: [],
                // majorOption: [],
                // gradeOptions: [],
                // table数组
                demoList: [],
                // 分页查询api接口
                pageSearch: this.$api.grade.gradeExpense,
            };
        },
        created() {
            this.$emit('getMeteData', this.$Bre.breadCrumbs([0, 4, 41]), '班费管理');
        },
        mounted() {
            this.getBalance();
        },
        methods: {
            openImgPreview(imgList) {
                this.imgList = imgList.split(",");
                this.view = true;
                console.log(this.imgList);
            },
            dialogSubmit() {
                if ((this.dialogData.expendAmount || this.dialogData.incomeAmount) && this.dialogData.reasons) {
                    if (this.fileList.length > 0) {
                        if (this.dialogData.imagePaths == null) {
                            this.dialogData.imagePaths = '';
                        }
                        console.log(this.fileList);
                        let arr = [];
                        this.fileList.forEach(i => {
                            arr.push(i.response.data[0]);
                        });
                        this.dialogData.imagePaths = arr.join(',');
                        console.log(this.dialogData);
                    }
                    this.$api.grade.gradeAmount(this.dialogData).then(res => {
                        console.log(res);
                        this.dialogVisible = false;
                        this.loadData();
                        this.getBalance();
                    });

                } else {
                    this.$message.warning('事由和金额不能为空哦～');
                }
            },
            handSuccess(file, fileList) {
                console.log(file);
                this.loading.close();
                console.log(fileList);
            },
            openDialog(type) {
                this.dialogVisible = true;
                this.dialogData.imagePaths = null;
                this.dialogData.reasons = null;
                this.dialogData.expendAmount = null;
                this.dialogData.incomeAmount = null;
                this.dialogData.remark = null;
                this.fileList = [];
                if (type == 'expend') {
                    this.dialogTitle = '班费支出';
                } else {
                    this.dialogTitle = '班费收集';
                }
            },
            handleProgress() {
                this.loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgb(0, 0, 0, 0.7)'
                });

            },
            handleChange(file, fileList) {
                this.fileList = fileList.slice(-3);
                console.log(this.fileList);
            },
            getBalance() {
                let data = {
                    conditionModel: this.condition.conditionModel,
                    perPage: 10,
                    start: 1
                };
                this.$api.grade.gradeExpense(data).then(res => {
                    this.balance = res.data.map.balance;
                    this.incometotal = res.data.map.incomeTotal;
                    this.expendtotal = res.data.map.expendTotal;
                });
            },
            // eslint-disable-next-line no-unused-vars
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${file.name}？`);
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            // getSelectList() {
            //     this.$api.common.schoolsList({}).then(res => {
            //         console.log(res);
            //         this.collegeOption = res.data;
            //     });
            //     this.$api.common.majorList({}).then(res => {
            //         console.log(res);
            //         this.majorOption = res.data;
            //     });
            //     this.$api.grade.selectGrade({}).then(res => {
            //         // 班级
            //         console.log(res);
            //         this.gradeOptions = res.data;
            //     });
            // },
            onError() {
                this.loading.close();
                this.$message.error('上传失败');
            },
            loadData() {

                this.$refs.demoTable.loadData();
            },
        },
    };
</script>

<style lang="scss" scoped>
    .dialogLayout {
        text-align: center;
    }

    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #FFFFFF;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #FFFFFF;
    }
    /deep/
    .el-icon-circle-close {
        color: #FFFFFF;
    }
</style>
