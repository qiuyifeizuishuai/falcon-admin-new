<template>
    <!-- menu with submenu -->
    <li class="has-sub" v-bind:class="{ 'active': subIsActive(menu.path) }" v-if="menu.children">
        <a href="#" v-on:click.prevent.stop="expand()">
            <i v-bind:class="menu.icon" v-if="menu.icon"></i>
            <div class="icon-img" v-if="menu.img"><img alt="" v-bind:src="menu.img"/></div>
            <span>{{ menu.title }}</span>
            <span class="badge pull-right" v-if="menu.badge">{{ menu.badge }}</span>
            <b class="caret" v-else></b>
            <i class="fa fa-paper-plane text-theme m-l-5" v-if="menu.highlight"></i>
            <span class="label label-theme m-l-5" v-if="menu.label">{{ menu.label }}</span>
        </a>
        <ul class="sub-menu" v-bind:class="{ 'd-block': this.stat == 'expand', 'd-none': this.stat == 'collapse' }"
            v-bind:style="{ marginTop: (pageOptions.pageSidebarMinified) ? - (scrollTop + 40) + 'px' : '' }">
            <template v-for="submenu in menu.children">
                <top-menu-nav-list ref="topMenuNavList" v-bind:key="submenu.path" v-bind:menu="submenu"
                                   v-on:collapse-other="handleCollapseOther(submenu)"></top-menu-nav-list>
            </template>
        </ul>
    </li>

    <!-- menu without submenu -->
    <router-link active-class="active" tag="li" v-bind:to="menu.path" v-else v-on:click.native="collapseOther()">
        <a>
            <span class="badge pull-right" v-if="menu.badge">{{ menu.badge }}</span>
            <i v-bind:class="menu.icon" v-if="menu.icon"></i>
            <div class="icon-img" v-if="menu.img"><img alt="" v-bind:src="menu.img"/></div>
            <span>{{ menu.title }}</span>
            <i class="fa fa-paper-plane text-theme m-l-5" v-if="menu.highlight"></i>
            <span class="label label-theme m-l-5" v-if="menu.label">{{ menu.label }}</span>
        </a>
    </router-link>
</template>

<script>
    import TopMenuNavList from './TopMenuNavList.vue';
    import PageOptions from '../../config/PageOptions.vue';

    export default {
        name: 'TopMenuNavList',
        props: ['menu'],
        components: {
            TopMenuNavList
        },
        data() {
            return {
                stat: '',
                pageOptions: PageOptions
            };
        },
        methods: {
            expand: function () {
                if (this.stat == '') {
                    this.stat = (this.subIsActive(this.menu.path)) ? 'collapse' : 'expand';
                } else {
                    this.stat = (this.stat == 'expand') ? 'collapse' : 'expand';
                }
                this.$emit('collapse-other', this.menu);
            },
            collapse: function (menu) {
                if (this.menu != menu) {
                    this.stat = 'collapse';
                }
            },
            collapseOther: function () {
                this.$emit('collapse-other', this.menu);
            },
            handleCollapseOther: function (menu) {
                for (var i = 0; i < this.menu.children.length; i++) {
                    this.$refs.topMenuNavList[i].collapse(menu);
                }
            },
            subIsActive(path) {
                const paths = Array.isArray(path) ? path : [path];
                return paths.some(pathCollege => {
                    return this.$route.path.indexOf(pathCollege) === 0;
                });
            }
        }
    };
</script>
