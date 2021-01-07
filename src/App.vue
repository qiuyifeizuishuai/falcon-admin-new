<template>
    <div class="fade page-sidebar-fixed page-header-fixed show page-container" v-bind:class="{
		'page-sidebar-minified': pageOptions.pageSidebarMinified,
		'page-content-full-height': pageOptions.pageContentFullHeight,
		'page-without-sidebar': pageOptions.pageWithoutSidebar,
		'page-with-right-sidebar': pageOptions.pageWithRightSidebar,
		'page-with-two-sidebar': pageOptions.pageWithTwoSidebar,
		'page-with-wide-sidebar': pageOptions.pageWithWideSidebar,
		'page-with-light-sidebar': pageOptions.pageWithLightSidebar,
		'page-with-top-menu': pageOptions.pageWithTopMenu,
		'page-sidebar-toggled': pageOptions.pageMobileSidebarToggled,
		'page-right-sidebar-toggled': pageOptions.pageMobileRightSidebarToggled || pageOptions.pageRightSidebarToggled,
		'page-right-sidebar-collapsed': pageOptions.pageRightSidebarCollapsed,
		'has-scroll': pageOptions.pageBodyScrollTop
	}"
         v-if="!pageOptions.pageEmpty">
        <Header/>
<!--        <TopMenu v-if="!pageOptions.pageWithTopMenu"/>-->
        <Sidebar v-if="!pageOptions.pageWithoutSidebar"/>
<!--        <SidebarRight v-if="pageOptions.pageWithTwoSidebar"/>-->
        <div class="crumbs" v-if="metaData">
            <p class="crumbsGo" @click="isGo()" v-if="metaDataName"> <em class="el-icon-arrow-left"></em> 返回上一级 </p>
            <Breadcrumb :list="metaData" />
            <p class="crumbsName">{{ metaDataName }}</p>
        </div>
        <div class="content all_pages"  id="content" v-bind:class="{ 'content-full-width': pageOptions.pageContentFullWidth, 'content-inverse-mode': pageOptions.pageContentInverseMode }">
            <router-view @getMeteData="getMeteData" />
            <vue-ins-progress-bar />
        </div>
    </div>
    <div v-else>
        <router-view />
        <vue-ins-progress-bar />
    </div>
</template>

<script>
    import Sidebar from './components/sidebar/Sidebar.vue';
    import Header from './components/header/Header.vue';
    import PageOptions from './config/PageOptions.vue';
    import Breadcrumb from '@/components/breadcrumb/Breadcrumb';
    export default {
        name: 'app',
        components: {
            Sidebar,
            Header,
            Breadcrumb
        },
        data() {
            return {
                pageOptions: PageOptions,
                metaData: [],
                metaDataName: ''
            };
        },
        methods: {
            handleScroll: function () {
                PageOptions.pageBodyScrollTop = window.scrollY;
            },
            getMeteData(metaData, metaDataName) {
                this.metaData = metaData;
                this.metaDataName = metaDataName;
            },
            isGo() {
                this.$router.go(-1);
            }
        },
        created() {
            PageOptions.pageBodyScrollTop = window.scrollY;
            window.addEventListener('scroll', this.handleScroll);
        }
    };
</script>
<style>
@import "assets/css/modify.css";
    button:focus{
        outline: none;
    }
    .content{
        margin-left: 232px;
        margin-right: 10px;
        margin-top:10px;
    }
    .all_pages {
        background-color: #fff;
        padding: 30px 20px 30px 20px;
        height: 100%;
        border-radius: 15px;
    }
    .crumbs{background-color: #fff; margin-left: 220px;border-bottom: 1px solid #ddd;border-top: 1px solid #ddd;padding: 10px 0;}
    .crumbs .crumbsName{font-size: 25px;margin: 15px 0 0 20px;color: #333}
    .crumbs .crumbsGo{margin-left: 20px;font-size: 13px;color: #666;cursor: pointer;display: flex;align-items: center}
    .crumbs .crumbsGo em{color: #333;font-size: 15px}
    .el-breadcrumb__item:last-child .el-breadcrumb__inner{color: #909399 !important;cursor: pointer !important;}
    .el-breadcrumb__inner a, .el-breadcrumb__inner.is-link{font-weight: 500}
    @media (max-width: 767.98px){
        .content {
            margin-left: 0 !important;
            padding: 20px 20px;
        }
        .crumbs{height: 100px;background-color: #fff; margin-left: 0;border-bottom: 1px solid #ddd;border-top: 1px solid #ddd}
        .crumbs .crumbsGo{margin: 10px 0 0 20px;font-size: 13px;color: #666;cursor: pointer;display: flex;align-items: center}
        .crumbs .crumbsGo em{color: #333;font-size: 15px}
        .el-breadcrumb__item:last-child .el-breadcrumb__inner{color: #909399 !important;}
        .el-breadcrumb__inner a, .el-breadcrumb__inner.is-link{font-weight: 500}
        .all_pages {
            width: 100%;
        }
    }
.questionAsk .ql-toolbar.ql-snow .ql-picker-label{display: flex}
</style>
