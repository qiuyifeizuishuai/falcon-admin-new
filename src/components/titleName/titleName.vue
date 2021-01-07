<template>
    <div class="titName">
        <h3>{{ titleName }}</h3>
    </div>
</template>

<script>
export default {
    name: "titleName",
    props: {
        titleName: {
            type: String,
            default: ''
        }
    }
};
</script>

<style scoped>
.titName{border-bottom: 1px solid #ddd;padding-bottom: 16px;margin-bottom: 25px;}
.titName h3{font-size: 15px;color: #333;margin-left: 10px;margin-bottom: 0}
</style>
