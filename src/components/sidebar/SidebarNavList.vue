<template>
    <!-- menu with submenu -->
    <li class="has-sub" v-bind:class="{ 'active': subIsActive(menu.path), 'expand': this.stat =='expand', 'd-none': this.stat =='hide' }"
        v-if="menu.children">
        <a @mouseleave="hideFloatSubmenu" @mouseover="mouseOver(menu.children, $event)" href="#"
           v-on:click.prevent.stop="expand($event)">
            <span class="badge pull-right" v-if="menu.badge">{{ menu.badge }}</span>
            <b class="caret" v-else></b>
            <i v-bind:class="menu.icon" v-if="menu.icon"></i>
            <div class="icon-img" v-if="menu.img"><img alt="" v-bind:src="menu.img"/></div>
            <span>
				{{ menu.title }}
				<span class="label label-theme" v-if="menu.label">{{ menu.label }}</span>
				<i class="fa fa-paper-plane text-theme" v-if="menu.highlight"></i>
			</span>
        </a>
        <ul class="sub-menu" v-bind:class="{ 'd-block': this.stat == 'expand', 'd-none': this.stat == 'collapse' }"
            v-bind:style="{ marginTop: (pageOptions.pageSidebarMinified) ? - (scrollTop + 40) + 'px' : '' }">
            <template v-for="submenu in menu.children">
                <sidebar-nav-list ref="sidebarNavList" v-bind:key="submenu.path" v-bind:menu="submenu"
                                  v-on:calcFloatSubmenu="handleCalcFloatSubmenu"
                                  v-on:collapse-other="handleCollapseOther(submenu)"></sidebar-nav-list>
            </template>
        </ul>
    </li>

    <!-- menu without submenu -->
    <router-link active-class="active" tag="li" v-bind:class="{ 'd-none': this.stat =='hide' }" v-bind:to="menu.path"
                 v-else v-on:click.native="collapseOther()">
        <a>
            <span class="badge pull-right" v-if="menu.badge">{{ menu.badge }}</span>
            <i v-bind:class="menu.icon" v-if="menu.icon"></i>
            <div class="icon-img" v-if="menu.img"><img alt="" v-bind:src="menu.img"/></div>
            <span>
				{{ menu.title }}
				<i class="fa fa-paper-plane text-theme" v-if="menu.highlight"></i>
				<span class="label label-theme" v-if="menu.label">{{ menu.label }}</span>
			</span>
        </a>
    </router-link>
</template>

<script>
    import SidebarNavList from './SidebarNavList.vue';
    import PageOptions from '../../config/PageOptions.vue';

    export default {
        name: 'SidebarNavList',
        props: ['menu', 'scrollTop'],
        components: {
            SidebarNavList
        },
        data() {
            return {
                stat: '',
                pageOptions: PageOptions
            };
        },
        methods: {
            mouseOver: function (data, event) {
                if (this.pageOptions.pageSidebarMinified) {
                    var offset = event.target.offsetParent.getBoundingClientRect();
                    this.$emit('showFloatSubmenu', data, offset);
                }
            },
            hideFloatSubmenu: function () {
                if (this.pageOptions.pageSidebarMinified) {
                    this.$emit('hideFloatSubmenu');
                }
            },
            expand: function () {
                if (this.stat == '') {
                    this.stat = (this.subIsActive(this.menu.path)) ? 'collapse' : 'expand';
                } else {
                    this.stat = (this.stat == 'expand') ? 'collapse' : 'expand';
                }
                this.$emit('collapse-other', this.menu);

                if (this.pageOptions.pageSidebarMinified) {
                    this.$emit('calcFloatSubmenu');
                }
            },
            handleCalcFloatSubmenu: function () {
                if (this.pageOptions.pageSidebarMinified) {
                    this.$emit('calcFloatSubmenu');
                }
            },
            collapse: function (menu) {
                if (this.menu != menu) {
                    this.stat = 'collapse';
                }
            },
            hide: function () {
                this.stat = 'hide';
            },
            show: function () {
                this.stat = '';
            },
            searchExpand: function () {
                this.stat = 'expand';
            },
            collapseOther: function () {
                this.$emit('collapse-other', this.menu);
            },
            handleCollapseOther: function (menu) {
                for (var i = 0; i < this.menu.children.length; i++) {
                    this.$refs.sidebarNavList[i].collapse(menu);
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
<style scoped>
    .active-bar{
        color:#00acac !important;
    }
</style>
