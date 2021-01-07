<template>
    <div>
        <div class="bg-white">
            <img class="bg-img" src="@/assets/welcome.png">
            .
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{

            };
        },
        mounted() {
            this.$emit('getMeteData', false);
        }
    };
</script>

<style lang="scss" scoped>
    .bg-white{
        display: flex;
        align-items: center;
        justify-content: center;
        height: calc(100vh - 135px);
        text-align: center;
    }
    .bg-img{
        width: 714px;
        height: 491px;
    }
</style>
