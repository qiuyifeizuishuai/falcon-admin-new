import Vue from 'vue';
import VueX from 'vuex';
import router from './config/PageRoutes';
import ElementUI from 'element-ui';
import VueBootstrap from 'bootstrap-vue';
import VueCustomScrollbar from 'vue-custom-scrollbar';
import 'element-ui/lib/theme-chalk/index.css';
// plugins
import VueInsProgressBar from 'vue-ins-progress-bar';
import VueRouter from 'vue-router';
// import VuePanel from './plugins/panel/';
import BaseList from '@/components/base-list/Base-list.vue';
import VueEditor from 'vue2-editor';
// plugins css
// import 'bootstrap-vue/dist/bootstrap-vue.css';
import './assets/css/common/common.scss';
// color admin css
import './assets/css/default/app.min.css';
import './scss/vue.scss';
// import 'bootstrap-social/bootstrap-social.css';
import Cookies from 'js-cookie';
import App from './App.vue';
import store from './store/index';
import './services/axios';
import axios from 'axios';
import Message from './tools/Message';
// 全局css
import './assets/css/common/common.scss';

// 引入分页全局配置
import getPage from '@/tools/page';
import api from "./services/api/index";
import BreadCrumbs from "@/config/BreadCrumbs";
import TitleName from "@/components/titleName/titleName";
//  事件总线
Vue.prototype.$bus = new Vue();
// 分页配置
Vue.use(VueInsProgressBar, {
    position: 'fixed',
    show: true,
    height: '3px'
});
Vue.prototype.$defalutPage = getPage;
Vue.prototype.$Bre= BreadCrumbs;
Vue.prototype.$api = api;
Vue.prototype.$Message = Message.MessageFuntion;
Vue.prototype.cookies = Cookies;
Vue.prototype.$axios = axios;
Vue.use(VueX);
Vue.use(ElementUI);
Vue.use(VueBootstrap);
Vue.use(VueRouter);
Vue.component('vue-custom-scrollbar', VueCustomScrollbar);
Vue.use(VueEditor);
Vue.component('TitleName', TitleName);
Vue.component(BaseList.name, BaseList);
router.beforeEach((to, from, next) => {
    if(window.localStorage.getItem('webTitle')){
        document.title = window.localStorage.getItem('webTitle');
    }else{
        document.title = '高校学习平台';
    }
    next();
});
export const vm = new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app');
