export const questionMethods = {
    props:{ topicStyle: String, topicSelection: String, topicSelectionTo: String, indexData: Number},
<<<<<<< HEAD
=======
    data() {
        return {
            fileList: [],
        };
    },
>>>>>>> development
    created() {
        this.getDataLink();
        if(this.topicSelectionTo) {
            this.form.topicDOS.forEach(valDOS => {
                valDOS.questionTypeName = this.topicSelectionTo;
            });
        }
    },
    mounted() {
        if (this.$route.query.id) {
            this.setDetail();
        }
    },
    watch: {
        topicSelection(val) {
            if(!val) return;
<<<<<<< HEAD
            if(this.topicStyle === '一题多问') {
=======
            if(this.topicStyle === '一题多问样式') {
>>>>>>> development
                this.form.topicFatherDO.questionTypeName = val;
                return;
            }
            this.form.topicDOS.forEach(valDOS => {
                valDOS.questionTypeName = val;
            });
        }
    },
    methods: {
        getDataLink() {
            this.form.topicDOS.forEach(val => {
                // val.id = this.$route.query.id;//题目id
                val.topicType = this.$route.query.topicType;
                val.relationId = this.$route.query.relationId;
                val.questionTypeName = this.topicSelection;
            });
<<<<<<< HEAD
            if(this.topicStyle === '一题多问') {
=======
            if(this.topicStyle === '一题多问样式') {
>>>>>>> development
                this.form.topicFatherDO.id = this.$route.query.id;//题目id
                this.form.topicFatherDO.relationId = this.$route.query.relationId;
                this.form.topicFatherDO.questionType = this.topicStyle;
                this.form.topicFatherDO.questionTypeName = this.topicSelection;
            }
        },
        // 编辑数据
        async updateTopicsData() {
            const data = await this.updateTopics();
            console.log(data);
        },
        // 表单验证
        validatePass(rule, value, callback) {
            const filed = rule.field.split(".");
            const index = Number(filed[1]);
            const name = filed[0];
            const nameTo = filed[2];
            let length1 = 0;
            if(nameTo === 'answerError' || nameTo === 'answerRight') {
                const indexTo = Number(filed[3]);
                length1 = this.form[name][index][nameTo][indexTo].path.length;
            }else if(nameTo === 'questionScore'){
                length1 = 0;
            }else {
                length1 = this.form[name][index][nameTo].path.length;
            }
            if (!value && length1 === 0) {
                callback(new Error("必填项"));
            }else {
                if(isNaN(Number(value)) && nameTo === 'questionScore') {
                    callback(new Error("必填项"));
                }
                callback();
            }
        },
        //   新增错误/正确答案
        addDomain(type, indexDos) {
            const data = type === "right" ? this.form.topicDOS[indexDos].answerRight : this.form.topicDOS[indexDos].answerError;
            const key = Date.now();
            data.push({
                name: "",
                path: [],
                key: key,
            });
        },
        // 删除错误/正确答案
        removeDomain(index, type, indexDos) {
            const data = type === "right" ? this.form.topicDOS[indexDos].answerRight : this.form.topicDOS[indexDos].answerError;
            if (index !== -1) data.splice(index, 1);
        },
        // 提交
        submitForm(formName, jump) {
            this.$refs[formName].validate(async valid => {
                if (valid) {
                    const data =
                        this.$route.query.id === undefined
                            ? await this.addQuestion() //新增
                            : await this.updateQuestion(); //修改
<<<<<<< HEAD

=======
>>>>>>> development
                    if (data) {
                        if(jump) this.$router.go(-1);
                        this.$message({
                            message: '提交成功',
                            type: 'success'
                        });
                        this.resetForm();
                    }
                }
            });
        },
        // 取消
        cancelHandler() {
            this.resetForm();
            this.$router.go(-1);
        },
        // 重置
        resetForm() {
            // 重置数据
            Object.assign(this.$data, this.$options.data());
            this.getDataLink();
        },
        // 图片上传
        imgUpload(response, key, index) {
            if (response.code === 0 && response) {
                this.form.topicDOS[index][key].path = [response.data];
            }
        },
        removeUpload(response, key, index) {
            this.form.topicDOS[index][key].path = [];
        },

<<<<<<< HEAD
=======
        audioUpload(data) {
            if(this.topicStyle === '一题多问样式') {
                this.form.topicFatherDO.questionDetail.audioPath.push(data.data);
                return;
            }
            this.form.topicDOS[0].questionDetail.audioPath.push(data.data);
        },
        removeAudio(file, fileList) {
            if(this.topicStyle === '一题多问样式') {
                this.form.topicFatherDO.questionDetail.audioPath = [];
                if(fileList != '') {
                    fileList.forEach(val => {
                        this.form.topicFatherDO.questionDetail.audioPath.push(val.url || val.response.data);
                    });
                }
                return;
            }
            this.form.topicDOS[0].questionDetail.audioPath = [];
            if(fileList != '') {
                fileList.forEach(val => {
                    this.form.topicDOS[0].questionDetail.audioPath.push(val.url || val.response.data);
                });
            }
        },
        audioBefore(file) {
            if(file.name.split('.')[1] !== 'mp3') {
                this.$message.error("上传文件必须是mp3格式");
                return false;
            }
        },
>>>>>>> development
        // 正确、错误答案上传
        imgUploads(response, indexDOS, key, index) {
            if (response.code === 0) {
                this.form.topicDOS[indexDOS][key][index].path = [response.data];
            }
        },
        removeUploads(response, indexDOS, key, index) {
            this.form.topicDOS[indexDOS][key][index].path = [];
        },
        // 新增题目
        async addQuestion() {
            const params = this.form;
            const data = await this.$api.homework.saveTopic(params);
            if (data.code === 0) {
                return data;
            } else {
                this.$message({
                    message: data.message,
                    type: "error",
                });
                return undefined;
            }
        },
        // 修改题目
        async updateQuestion() {
            const params = {
                id: this.$route.query.id,
                ...this.form,
            };
            const data = await this.$api.homework.updateTopics(params);
            if (data.code === 0) {
                return data;
            } else {
                this.$message({
                    message: data.message,
                    type: "error",
                });
                return undefined;
            }
        },
        // 表单设置详情信息
        async setDetail() {
            const data = await this.getDetail();
            if (data){
<<<<<<< HEAD
                if(this.topicStyle === '一题多问') {
=======
                if(this.topicStyle === '一题多问样式') {
>>>>>>> development
                    this.form = JSON.parse(JSON.stringify(data));
                    let fileAudioPath = this.form.topicFatherDO.questionDetail.audioPath;
                    if(fileAudioPath != '') {
                        fileAudioPath.forEach((val, index) => {
                            const data = {
<<<<<<< HEAD
                                name: '听力考试' + (index+1) + '.mp3',
=======
                                name: '音频' + (index+1) + '.mp3',
>>>>>>> development
                                url: val
                            };
                            this.fileList.push(data);
                        });
                    }
                    this.addTemplate = [];
                    this.form.topicDOS.forEach(val => {
                        const data = {templateName: val.questionType };
                        this.addTemplate.push(data);
                    });
                }
<<<<<<< HEAD
                if(this.topicStyle === '阅读判断题') {
                    this.form = JSON.parse(JSON.stringify(data));
                    if(this.isEnglish.includes(this.form.topicDOS[0].answerRight[0].name)) {
                        this.isSwitchName = '中文';
                    }else {
                        this.isSwitchName = '英文';
                    }
                }
                if(!this.topicSelectionTo) {
                    this.form = JSON.parse(JSON.stringify(data));
=======
                if(!this.topicSelectionTo) {
                    this.form = JSON.parse(JSON.stringify(data));
                    let fileAudioPath = this.form.topicDOS[0].questionDetail.audioPath;
                    if(fileAudioPath != '') {
                        fileAudioPath.forEach((val, index) => {
                            const data = {
                                name: '音频' + (index+1) + '.mp3',
                                url: val
                            };
                            this.fileList.push(data);
                        });
                    }
>>>>>>> development
                }else {
                    let topicDOSData = JSON.parse(JSON.stringify(data)).topicDOS[this.indexData];
                    if(topicDOSData) {
                        this.form.topicDOS = [];
<<<<<<< HEAD
=======
                        if(this.topicSelectionTo === '阅读判断题') {
                            if(this.isEnglish.includes(topicDOSData.answerRight[0].name)) {
                                this.isSwitchName = '中文';
                            }else {
                                this.isSwitchName = '英文';
                            }
                        }
>>>>>>> development
                        this.form.topicDOS.push(topicDOSData);
                    }

                }
            }

        },
        // 题目详情
        async getDetail() {
            const params = {
                id: this.$route.query.id,
            };
            const data = await this.$api.homework.topicsGetId(params);
            if (data.code === 0) {
                return data.data;
            } else {
                this.$message({
                    message: data.message,
                    type: "error",
                });
                return undefined;
            }
        },
    },
};
