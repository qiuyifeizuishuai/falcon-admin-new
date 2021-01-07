<template>
  <div>
    <!--弹出层-->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="50%"
      :show-close="false">
      <slot></slot>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogConfirm">确 定</el-button>
    <el-button @click="dialogVisible = false">取 消</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "Dialog",
        data() {
            return {
                dialogVisible: false
            };
        },
        methods: {
            dialogConfirm() {
                this.$emit("dialogConfirm");
            }
        },
        props: {
            dialogTitle: {
                type: String,
                default() {
                    return "";
                }
            }
        }
    };
</script>
