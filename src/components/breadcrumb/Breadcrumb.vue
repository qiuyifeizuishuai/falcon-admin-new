<template>
  <div>
    <el-breadcrumb  separator="/"  class="borderClass mal20 mat15">
      <el-breadcrumb-item :replace="true" :to="{path: item.path}" v-for="(item,index) in list" :key="index">{{item.titleName}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
