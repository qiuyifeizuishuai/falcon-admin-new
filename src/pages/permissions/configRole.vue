<template>
    <div>
        <el-tree
            :data="permissionsList"
            show-checkbox
            default-expand-all
            node-key="uuid"
            ref="tree"
            highlight-current
            :props="defaultProps">
        </el-tree>

        <div class="buttons" style="text-align: center;margin-top: 20px">
            <el-button @click="getCheck" type="primary">确认保存</el-button>
            <el-button @click="resetChecked">清空</el-button>
        </div>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                defaultProps: {
                    children: 'children',
                    label: 'autoName'
                },
                permissionsList: [], // 权限列表
                roleId: this.$route.query.uuid
            };
        },
        created() {
            this.$emit('getMeteData', this.$Bre.breadCrumbs([0, 11, 111]), '编辑权限');
        },
        mounted() {
            this.getPermissions();
        },
        methods: {
           async getPermissionsDetails(){
               const data =  await this.$api.permissions.getPermissionsDetails(this.roleId);
               let arr = [];
               data.data.map(i=>{
                   if(i.children.length==0){
                        arr.push(i.uuid);
                   }else{
                       i.children.map(c=>{
                          arr.push(c.uuid);
                       });
                   }
               });
               this.$refs.tree.setCheckedKeys(arr);
            },
            getCheck() {
               let arr = [];
                let arr2 = this.$refs.tree.getCheckedNodes(false, true);
                arr2.map(item=>{
                    arr.push(item.uuid);
                });
                let data = {
                    uuid:this.roleId,
                    jurisdictions:arr
                };

                // eslint-disable-next-line no-unused-vars
                this.$api.permissions.givePermissions(data).then(res=>{
                    this.$message.success('保存成功');
                   this.$router.push({path:'/roleManagement'});
                    // eslint-disable-next-line no-unused-vars
                });
            },
            getCheckedKeys() {
                console.log(this.$refs.tree.getCheckedKeys(true, false));
            },
            setCheckedNodes() {

            },
            setCheckedKeys() {
                this.$refs.tree.setCheckedKeys([3]);
            },
            resetChecked() {
                this.$refs.tree.setCheckedKeys([]);
            },
            getPermissions() {
                this.$api.permissions.getPermissionsList().then(res => {
                    this.permissionsList = res.data;
                    this.getPermissionsDetails();
                });
            },
        }
    };
</script>
