<template>
    <div>
        <el-dialog
            title="题型介绍设置"
            :visible.sync="isTopic"
            width="500px"
        >
            <p style="color: #999">换行符请用/n (比如：小王去图书管做什么/n(1)去看书/n(2)去找人)</p>
            <el-input
                type="textarea"
                :rows="10"
                placeholder="请输入内容"
                v-model="textareaTopic">
            </el-input>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="topicClick">确定</el-button>
                <el-button @click="isTopic = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "topic",
    props: {
        paperUuid: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            isTopic: false,
            textareaTopic: ''
        };
    },
    methods: {
        isTopicOpen() {
            this.isTopic = !this.isTopic;
            if( this.isTopic) {
                this.getTopicData();
            }
        },
        topicClick() {
            this.$api.homework.question({
                paperUuid: this.paperUuid,
                questionTypeIntroduction: this.textareaTopic
            }).then(res => {
                if(res.code === 0) {
                    this.isTopicOpen();
                    this.getTopicData();
                    this.$message.success('题型设置成功');
                }else  {
                    this.$message.error(res.message);
                }
            });
        },
        getTopicData() {
            this.$api.homework.questionGet(this.paperUuid).then(res => {
                this.textareaTopic = res.data.questionTypeIntroduction;
            });
        }
    }
};
</script>

<style scoped>

</style>
