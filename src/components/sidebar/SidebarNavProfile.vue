<template>
    <ul class="nav">
        <li class="nav-profile">
            <a href="javascript:;" v-on:click="expand()">
                <div class="cover with-shadow"></div>
                <div class="image">
                    <img src="/assets/img/user/user-13.jpg" alt="">
                </div>
                <div class="info">
                    {{username}}
                    <small>{{permissions}}</small>
                </div>
            </a>
        </li>
    </ul>
</template>

<script>
    import PageOptions from '../../config/PageOptions.vue';

    export default {
        name: 'SidebarNavProfile',
        data() {
            return {
                stat: '',
                username:window.localStorage.getItem('username'),
                pageOptions: PageOptions,
                permissions:window.localStorage.getItem('permissions'),
            };
        },
        methods: {
            expand: function() {
                this.stat = (this.stat == 'expand') ? 'collapse' : 'expand';
            }
        }
    };
</script>
