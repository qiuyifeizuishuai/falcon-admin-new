import Vue from 'vue';
import Vuex from 'vuex';
import school from './school';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        school,
    },
});
